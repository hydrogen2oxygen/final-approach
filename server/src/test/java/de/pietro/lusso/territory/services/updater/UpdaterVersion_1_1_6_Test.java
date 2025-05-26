package de.pietro.lusso.territory.services.updater;

import de.pietro.lusso.territory.services.DatabaseService;
import org.junit.Test;

public class UpdaterVersion_1_1_6_Test {

    @Test
    public void test() throws Exception {
        UpdaterVersion_1_1_6 updater = new UpdaterVersion_1_1_6();
        DatabaseService databaseService = new DatabaseService();
        databaseService.initService();
        updater.setDatabaseService(databaseService);
        updater.update();
    }
}
