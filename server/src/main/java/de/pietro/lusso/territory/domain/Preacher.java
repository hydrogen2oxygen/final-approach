package de.pietro.lusso.territory.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Preacher implements Serializable  {

    private UUID uuid;

    private String name;

    private String shortName;

    private Boolean softdelete = false;

    private Boolean harddelete = false;

    private List<String> territoryListNumbers = new ArrayList<>();

    /**
     * At the moment when a preacher has one group member, he is a group leader
     */
    private List<String> group = new ArrayList<>();

    public Preacher(){}

    public Preacher(String name) {
        this.name = name;
    }

    public Boolean getSoftdelete() {
        return softdelete;
    }

    public void setSoftdelete(Boolean softdelete) {
        this.softdelete = softdelete;
    }

    public Boolean getHarddelete() {
        return harddelete;
    }

    public void setHarddelete(Boolean harddelete) {
        this.harddelete = harddelete;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public List<String> getGroup() {
        return group;
    }

    public void setGroup(List<String> group) {
        this.group = group;
    }

    public List<String> getTerritoryListNumbers() {
        return territoryListNumbers;
    }

    public void setTerritoryListNumbers(List<String> territoryListNumbers) {
        this.territoryListNumbers = territoryListNumbers;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    @Override
    public String toString() {
        return "Preacher{" +
                "name='" + name + '\'' +
                '}';
    }
}
