package de.pietro.lusso.territory.domain;

import org.dizitart.no2.objects.Id;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

public class Congregation {

    @Id
    private UUID uuid = UUID.randomUUID();
    private String name;
    private Calendar lastUpdate = Calendar.getInstance();
    private List<Preacher> preacherList = new ArrayList<>();
    private List<Territory> territoryList = new ArrayList<>();
    private List<Territory> territoriesNoContacts = new ArrayList<>();
    private List<Territory> territoriesOlder8Months = new ArrayList<>();
    private List<Territory> territoriesOlder4Months = new ArrayList<>();
    private List<Territory> territoriesAssigned = new ArrayList<>();
    private List<Territory> territoriesToBeAssigned = new ArrayList<>();

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Calendar getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Calendar lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public List<Preacher> getPreacherList() {
        return preacherList;
    }

    public void setPreacherList(List<Preacher> preacherList) {
        this.preacherList = preacherList;
    }

    public List<Territory> getTerritoryList() {
        return territoryList;
    }

    public void setTerritoryList(List<Territory> territoryList) {
        this.territoryList = territoryList;
    }

    public List<Territory> getTerritoriesNoContacts() {
        return territoriesNoContacts;
    }

    public void setTerritoriesNoContacts(List<Territory> territoriesNoContacts) {
        this.territoriesNoContacts = territoriesNoContacts;
    }

    public List<Territory> getTerritoriesOlder8Months() {
        return territoriesOlder8Months;
    }

    public void setTerritoriesOlder8Months(List<Territory> territoriesOlder8Months) {
        this.territoriesOlder8Months = territoriesOlder8Months;
    }

    public List<Territory> getTerritoriesOlder4Months() {
        return territoriesOlder4Months;
    }

    public void setTerritoriesOlder4Months(List<Territory> territoriesOlder4Months) {
        this.territoriesOlder4Months = territoriesOlder4Months;
    }

    public List<Territory> getTerritoriesAssigned() {
        return territoriesAssigned;
    }

    public void setTerritoriesAssigned(List<Territory> territoriesAssigned) {
        this.territoriesAssigned = territoriesAssigned;
    }

    public List<Territory> getTerritoriesToBeAssigned() {
        return territoriesToBeAssigned;
    }

    public void setTerritoriesToBeAssigned(List<Territory> territoriesToBeAssigned) {
        this.territoriesToBeAssigned = territoriesToBeAssigned;
    }
}
