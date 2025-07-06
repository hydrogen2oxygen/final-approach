package de.pietro.lusso.territory.services.territoryMap;

import de.pietro.lusso.territory.domain.*;
import de.pietro.lusso.territory.services.DatabaseService;
import de.pietro.lusso.territory.services.FtpService;
import de.pietro.lusso.territory.utils.ResourceUtil;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

    public void repairDashBoardsAndTerritoryData(boolean repairEverything) throws Exception {
        List<Territory> territories = databaseService.getTerritoryList();
        Settings settings = databaseService.loadSettings();
        RestTemplate restTemplate = new RestTemplate();
        Congregation congregation = databaseService.loadCongregation();

        for (Territory territory: territories) {
            String dataUrl = settings.getSettings().get("ftp.httpHost") + "assets/data/" + territory.getUuid() + ".json";
            System.out.print(dataUrl + " ");
            try {
                ResponseEntity<byte[]> response = restTemplate.getForEntity(dataUrl, byte[].class);
                System.out.println(response.getStatusCode());
                if (!territory.getRegistryEntryList().isEmpty()) {
                    Preacher preacher = territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() - 1).getPreacher();
                    TerritoryData territoryData = databaseService.getObjectMapper().readValue(response.getBody(), TerritoryData.class);
                    if (territoryData.getPreacherUUID() == null || repairEverything) {
                        System.err.println("- Preacher UUID is null for territory " + territory.getNumber() + ", setting it now.");
                        territoryData.setPreacherUUID(preacher.getUuid());
                        File jsonFile = new File(databaseService.TERRITORY_JSON_DATA + territory.getUuid().toString() + ".json");
                        databaseService.getObjectMapper().writeValue(jsonFile, territoryData);
                        ftpService.upload(jsonFile);
                    }
                }
                if (repairEverything) {
                    databaseService.exportTerritoryData(territory, true);
                }
            } catch (Exception e) {
                System.out.println("- Error fetching data for territory " + territory.getNumber());

                if (territory.getUuid() == null) {
                    System.err.println(" - Territory UUID is null, generating new UUID for territory " + territory.getNumber());
                    break;
                }

                databaseService.exportTerritoryData(territory, true);
            }
        }

        for (Preacher preacher : congregation.getPreacherList()) {
            String dashboardUrl = settings.getSettings().get("ftp.httpHost") + "assets/data/dashboard-" + preacher.getUuid() + ".json";
            System.out.print(dashboardUrl + " ");
            try {
                ResponseEntity<byte[]> response = restTemplate.getForEntity(dashboardUrl, byte[].class);
                System.out.println(response.getStatusCode());
                if (repairEverything) {
                    databaseService.exportDashboard(preacher);
                }
            } catch (Exception e) {
                System.out.println("- Error fetching dashboard for preacher " + preacher.getName());
                databaseService.exportDashboard(preacher);
            }
        }
    }
}
