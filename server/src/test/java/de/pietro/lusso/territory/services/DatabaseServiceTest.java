package de.pietro.lusso.territory.services;

import de.pietro.lusso.territory.domain.Congregation;
import de.pietro.lusso.territory.domain.Preacher;
import de.pietro.lusso.territory.domain.RegistryEntry;
import de.pietro.lusso.territory.domain.Territory;
import org.junit.Assert;
import org.junit.Test;

import java.io.File;
import java.util.Calendar;
import java.util.Date;

public class DatabaseServiceTest {

    @Test
    public void testSortRegistryEntryList() {
        DatabaseService databaseService = new DatabaseService();
        Territory territory = new Territory();
        territory.getRegistryEntryList().add(createRegistryEntry(createDate(2023, Calendar.OCTOBER, 1), createDate(2023, Calendar.NOVEMBER, 1)));
        territory.getRegistryEntryList().add(createRegistryEntry(createDate(2023, Calendar.NOVEMBER, 1), createDate(2024, Calendar.JANUARY, 1)));
        territory.getRegistryEntryList().add(createRegistryEntry(createDate(2024, Calendar.JANUARY, 1), null));
        territory.getRegistryEntryList().add(createRegistryEntry(createDate(2024, Calendar.FEBRUARY, 1), null));
        territory.getRegistryEntryList().add(createRegistryEntry(createDate(2025, Calendar.AUGUST, 22), createDate(2026, Calendar.JANUARY, 14)));
        databaseService.sortRegistryEntryList(territory);
        Assert.assertEquals(5, territory.getRegistryEntryList().size());
        Assert.assertEquals(createDate(2023, Calendar.OCTOBER, 1).getTime(), territory.getRegistryEntryList().get(0).getAssignDate().getTime());
        Assert.assertEquals(createDate(2023, Calendar.NOVEMBER, 1).getTime(), territory.getRegistryEntryList().get(1).getAssignDate().getTime());
        Assert.assertEquals(createDate(2024, Calendar.JANUARY, 1).getTime(), territory.getRegistryEntryList().get(2).getAssignDate().getTime());
        Assert.assertEquals(createDate(2024, Calendar.FEBRUARY, 1).getTime(), territory.getRegistryEntryList().get(3).getAssignDate().getTime());
        Assert.assertEquals(createDate(2025, Calendar.AUGUST, 22).getTime(), territory.getRegistryEntryList().get(4).getAssignDate().getTime());
        Assert.assertEquals(createDate(2026, Calendar.JANUARY, 14).getTime(), territory.getRegistryEntryList().get(4).getReturnDate().getTime());
        Assert.assertNull(territory.getRegistryEntryList().get(2).getReturnDate());
        Assert.assertNull(territory.getRegistryEntryList().get(3).getReturnDate());
    }

    RegistryEntry createRegistryEntry(Date assignDate, Date returnDate) {
        RegistryEntry registryEntry = new RegistryEntry();
        registryEntry.setAssignDate(assignDate);
        registryEntry.setReturnDate(returnDate);
        return registryEntry;
    }

    Date createDate(int year, int month, int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(0);
        calendar.set(year, month, day, 0, 0, 0);
        return calendar.getTime();
    }

    @Test
    public void testCongregationCRUD() throws Exception {

        new File("target/test.db").delete();
        DatabaseService databaseService = new DatabaseService();
        databaseService.setDatabaseName("target/test.db");
        databaseService.initService();

        Congregation congregation = databaseService.loadCongregation();

        Assert.assertTrue(congregation.getTerritoryList().size() == 0);
        Assert.assertTrue(congregation.getPreacherList().size() == 0);

        congregation.getPreacherList().add(addPreacher("firstname", "lastname"));
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
