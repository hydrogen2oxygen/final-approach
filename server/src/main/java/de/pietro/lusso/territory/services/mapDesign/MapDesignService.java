package de.pietro.lusso.territory.services.mapDesign;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.pietro.lusso.territory.domain.mapDesign.MapDataFile;
import de.pietro.lusso.territory.domain.mapDesign.MapDesign;
import de.pietro.lusso.territory.services.DatabaseService;
import de.pietro.lusso.territory.services.FtpService;
import de.pietro.lusso.territory.utils.EncryptionTool;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Service
@DependsOn("ftpService")
public class MapDesignService {

    private static final Logger logger = LogManager.getLogger(MapDesignService.class);

    @Autowired
    private FtpService ftpService;

    @Autowired
    private DatabaseService databaseService;
    private ObjectMapper objectMapper;
    private EncryptionTool encryptionTool = new EncryptionTool();

    @PostConstruct
    public void init() {
        objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public void uploadMapDesign(MapDesign mapDesign) {

        if (databaseService.uploading) return;

        databaseService.uploading = true;

        (new Thread() {
            public void run() {
                try {
                    String json = objectMapper.writeValueAsString(mapDesign);
                    File localUploadFolder = new File("uploads");
                    localUploadFolder.mkdirs();
                    String encryptedJSON = encryptionTool.encrypt("871a5c07-5c2d-41bd-98af-bb8cbdb06519cd185d47-bd50-4325-a599-a1a80d91924a", json);
                    String date = DateFormatUtils.format(Calendar.getInstance().getTime(), "yyyyMMddHHmmSS");
                    File uploadFile = new File("uploads/mapDesign_" + date + ".db");
                    FileUtils.writeStringToFile(uploadFile, encryptedJSON, "UTF-8");
                    ftpService.upload(uploadFile, "uploads/");
                    databaseService.uploading = false;
                    logger.info("Uploading mapDesign success!");
                } catch (Exception e) {
                    logger.error("Uploading mapDesign data failed", e);
                }
            }
        }).start();
    }

    public void downloadMapDesign() throws Exception {

        Vector<String> fileList = ftpService.list("assets/data/uploads/");
        List<MapDataFile> mapDataFiles = new ArrayList<>();

        for (String fileName : fileList) {
            System.out.println(fileName);
            if (fileName.startsWith("mapDesign")) {
                mapDataFiles.add(new MapDataFile(fileName));
            }
        }

        mapDataFiles.sort(new Comparator<MapDataFile>() {
            @Override
            public int compare(MapDataFile o1, MapDataFile o2) {
                return o2.getUploadDate().compareTo(o1.getUploadDate());
            }
        });

        String fileName = mapDataFiles.get(0).getName();
        System.out.println(" ==> " + fileName);

        InputStream inputStream = ftpService.downloadFile("assets/data/uploads/" + fileName);

        String encryptedJson = new BufferedReader(
                new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                .lines()
                .collect(Collectors.joining("\n"));

        String decryptedJson = encryptionTool.decrypt("871a5c07-5c2d-41bd-98af-bb8cbdb06519cd185d47-bd50-4325-a599-a1a80d91924a", encryptedJson);

        MapDesign mapDesign = objectMapper.readValue(decryptedJson, MapDesign.class);

        // BACKUP first!
        databaseService.makeCopyOfDatabase();

        // overwrite local one (don't use saveMapDesign function, because it would upload the current one)
        objectMapper.writeValue(databaseService.mapDesignFile, mapDesign);

        // delete old backups on ftp
        if (mapDataFiles.size() > 5) {

            mapDataFiles.sort(new Comparator<MapDataFile>() {
                @Override
                public int compare(MapDataFile o1, MapDataFile o2) {
                    return o1.getUploadDate().compareTo(o2.getUploadDate());
                }
            });

            int toDeleteCounter = mapDataFiles.size() - 5;

            for (int i = 0; i < toDeleteCounter; i++) {
                ftpService.delete("assets/data/uploads/" + mapDataFiles.get(i).getName());
            }
        }

    }

}
