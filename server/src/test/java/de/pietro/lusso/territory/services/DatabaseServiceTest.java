package de.pietro.lusso.territory.services;

import de.pietro.lusso.territory.domain.Congregation;
import de.pietro.lusso.territory.domain.Preacher;
import de.pietro.lusso.territory.domain.Territory;
import org.junit.Assert;
import org.junit.Test;

import java.io.File;

public class DatabaseServiceTest {

    @Test
    public void testCongregationCRUD() throws Exception {

        new File("target/test.db").delete();
        DatabaseService databaseService = new DatabaseService();
        databaseService.setDatabaseName("target/test.db");
        databaseService.initService();

        Congregation congregation = databaseService.loadCongregation();

        Assert.assertTrue(congregation.getTerritoryList().size() == 0);
        Assert.assertTrue(congregation.getPreacherList().size() == 0);

        congregation.getPreacherList().add(addPreacher("firstname","lastname"));
        congregation.getTerritoryList().add(new Territory());

        databaseService.saveCongregation(congregation);

        congregation = databaseService.loadCongregation();
        Assert.assertTrue(congregation.getTerritoryList().size() == 1);
        Assert.assertTrue(congregation.getPreacherList().size() == 1);

        congregation.getPreacherList().get(0).setSoftdelete(true);
        databaseService.saveCongregation(congregation);
        congregation = databaseService.loadCongregation();
        Assert.assertTrue(congregation.getPreacherList().get(0).getSoftdelete());

    }

    private Preacher addPreacher(String firstname, String lastname) {
        Preacher preacher = new Preacher();
        preacher.setName(lastname + " " + firstname);
        return preacher;
    }
}
