package de.pietro.lusso.territory.utils;

import de.pietro.lusso.territory.domain.Congregation;
import de.pietro.lusso.territory.domain.Territory;
import de.pietro.lusso.territory.services.DatabaseService;

public class GetAllNotes {

    public static void main(String[] args) throws Exception {

        DatabaseService databaseService = new DatabaseService();
        databaseService.initService();
        Congregation congregation = databaseService.loadCongregation();
        databaseService.resetTerritoryList(congregation);
        congregation.getTerritoryList().sort((o1, o2) -> {
            return o1.getNumber().compareTo(o2.getNumber());
        });
        for (Territory territory : congregation.getTerritoryList()) {
            for (String note : territory.getNotes()) {
                System.out.println(territory.getNumber() + " " + territory.getName() + " -> " + note);
            }
        }
    }
}
