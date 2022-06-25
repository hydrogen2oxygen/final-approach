package de.pietro.lusso.territory.adapter;

import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.SftpException;
import de.pietro.lusso.territory.domain.ImportData;
import de.pietro.lusso.territory.services.DatabaseService;
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

    @GetMapping("shutdown")
    public void shutDown() {

        Executor executor = Executors.newSingleThreadExecutor();
        executor.execute(() -> {
            logger.info("received shutdown request");
            databaseService.shutdown();
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            logger.info("shutting down server");
            System.exit(0);
        });
    }

    @PostMapping("importTerritoriesFromText")
    public void importTerritoriesFromText(@RequestBody ImportData importData) throws IOException, JSchException, SftpException {
        databaseService.importTerritoriesFromText(importData.getImportPath());
    }
}
