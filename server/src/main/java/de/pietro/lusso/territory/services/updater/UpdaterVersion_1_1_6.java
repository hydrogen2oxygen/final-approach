package de.pietro.lusso.territory.services.updater;

import de.pietro.lusso.territory.domain.Congregation;
import de.pietro.lusso.territory.domain.Territory;
import de.pietro.lusso.territory.domain.mapDesign.MapDesign;
import de.pietro.lusso.territory.services.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class UpdaterVersion_1_1_6 {

    @Autowired
    private DatabaseService databaseService;

    public void update() {
        // does the congregation folder exist already?
        File congregationFolder = new File("data/congregation");
        if (congregationFolder.exists() && congregationFolder.isDirectory()) {
            // does the version file exist
            File versionFile = new File("data/congregation/version.1.1.6.txt");
            if (versionFile.exists() && versionFile.isFile()) {
                System.out.println("Version >= 1.1.6");
                return;
            }
        }

        try {
            System.out.println("Updating data for version 1.1.6");
            Congregation congregation = databaseService.loadCongregation();
            MapDesign mapDesign = databaseService.loadMapDesign();

            File territoriesFolder = new File("data/congregation/territories");
            territoriesFolder.mkdirs();

            File mapDesignFolder = new File("data/congregation/mapDesign");
            mapDesignFolder.mkdirs();

            databaseService.resetTerritoryList(congregation);
            for (Territory territory : congregation.getTerritoryList()) {
                System.out.println(territory.getNumber());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * For test purpose
     * @param databaseService
     */
    public void setDatabaseService(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }
}
