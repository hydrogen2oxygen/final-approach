package de.pietro.lusso.territory.services.territoryMap;

import de.pietro.lusso.territory.services.DatabaseService;
import de.pietro.lusso.territory.services.FtpService;
import de.pietro.lusso.territory.utils.ResourceUtil;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@DependsOn("ftpService")
public class TerritoryMapService {

    @Autowired
    private FtpService ftpService;
    @Autowired
    private DatabaseService databaseService;

    public void uploadTerritoryMapApplication() throws Exception {

        // Prepare
        File websiteUpload = new File("data/websiteUpload");
        websiteUpload.mkdirs();

        for (File file : websiteUpload.listFiles()) {
            if (file.isFile()) {
                file.delete();
            }
        }

        List<File> files = new ArrayList<>();

        try (
                InputStream in = ResourceUtil.getResourceAsStream("territoryMap");
                BufferedReader br = new BufferedReader(new InputStreamReader(in))) {

            String resource;

            while ((resource = br.readLine()) != null) {
                System.out.println(resource);
                String fileContent = new BufferedReader(
                        new InputStreamReader(ResourceUtil.getResourceAsStream("territoryMap/" + resource), StandardCharsets.UTF_8))
                        .lines()
                        .collect(Collectors.joining("\n"));
                File file = new File("data/websiteUpload/" + resource);
                FileUtils.writeStringToFile(file, fileContent, StandardCharsets.UTF_8);
                files.add(file);
            }
        }

        String httpHost = databaseService.loadSettings().getSettings().get("ftp.httpHost");

        ftpService.initFtpFolder();

        for (File file : files) {

            if ("index.html".equals(file.getName())) {
                String indexStr = FileUtils.readFileToString(file, "UTF-8");
                indexStr += "\n<!-- Version: " + databaseService.version.getRevision() + " -->";
                FileUtils.writeStringToFile(file, indexStr.replace("/baseHrefPlaceHolder/", httpHost));
            }

            ftpService.uploadWithRootPath(file, "", "");
        }
    }
}
