package de.pietro.lusso.territory.adapter;

import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.SftpException;
import de.pietro.lusso.territory.domain.ImportData;
import de.pietro.lusso.territory.services.DatabaseService;
import de.pietro.lusso.territory.services.territoryMap.TerritoryMapService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("utility/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UtilityAdapter {

    private static final Logger logger = LogManager.getLogger(UtilityAdapter.class);

    @Autowired
    private DatabaseService databaseService;
    @Autowired
    private TerritoryMapService territoryMapService;

    @GetMapping("shutdown")
    public void shutDown() {

        System.exit(0);
    }

    @PostMapping("importTerritoriesFromText")
    public void importTerritoriesFromText(@RequestBody ImportData importData) throws IOException, JSchException, SftpException {
        databaseService.importTerritoriesFromText(importData.getImportPath());
    }

    @PutMapping("uploadTerritoryMapApplication")
    public void uploadTerritoryMapApplication() throws Exception {
        territoryMapService.uploadTerritoryMapApplication();
    }

    @PutMapping({"repairDashBoardsAndTerritoryData", "/repairDashBoardsAndTerritoryData/{repairAll}"})
    public void repairDashBoardsAndTerritoryData(@PathVariable(required = false) Boolean repairAll) throws Exception {
        boolean repairEverything = (repairAll != null) && repairAll;
        Executor executor = Executors.newSingleThreadExecutor();
        executor.execute(() -> {
            try {
                territoryMapService.repairDashBoardsAndTerritoryData(repairEverything);
            } catch (Exception e) {
                logger.error("Error repairing dashboards and territory data", e);
            }
        });
    }
}
