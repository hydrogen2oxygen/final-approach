package de.pietro.lusso.territory.adapter;

import de.pietro.lusso.territory.domain.Settings;
import de.pietro.lusso.territory.services.DatabaseService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("settings/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SettingsAdapter {

    private static final Logger logger = LogManager.getLogger(SettingsAdapter.class);

    @Autowired
    private DatabaseService databaseService;

    @GetMapping("status")
    public String status() {
        logger.info("status ok");
        return "ok";
    }

    @GetMapping
    public Settings getSettings() throws IOException {
        return databaseService.loadSettings();
    }

    @PutMapping
    public Settings saveMapDesign(@RequestBody Settings settings) throws IOException {
        databaseService.saveSettings(settings);
        return settings;
    }
}
