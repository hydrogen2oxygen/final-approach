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
}
