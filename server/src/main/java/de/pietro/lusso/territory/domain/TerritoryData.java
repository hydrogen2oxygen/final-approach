package de.pietro.lusso.territory.domain;

import de.pietro.lusso.territory.domain.osm.OsmStreet;

import java.util.*;

/**
 * JSON representation of one or many territories
 * <p><b>https://{baseUrlToMapService}/{UUID}</b></p>
 * <p>One territory json has also links to the other ones belonging to one preacher.</p>
 * <p>The data is anonym, it will not contain the name of the preacher, just a UUID.</p>
 */
public class TerritoryData {

    private UUID uuid;
    private String simpleFeatureData;
    private String number;
    private String name;
    private String notes;
    private Calendar lastUpdate;
    private Date assignDate;
    private Date returnDate;
    private List<OsmStreet> streetList = new ArrayList<>();
    private List<TerritoryData> territories = new ArrayList<>();
    private boolean active = true;

    /**
     * Map with
     * key = Number and name of the territory
     * value = UUID of the other territory
     */
    private Map<String, UUID> linkedTerritories = new HashMap<>();

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getSimpleFeatureData() {
        return simpleFeatureData;
    }

    public void setSimpleFeatureData(String simpleFeatureData) {
        this.simpleFeatureData = simpleFeatureData;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Calendar getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Calendar lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Date getAssignDate() {
        return assignDate;
    }

    public void setAssignDate(Date assignDate) {
        this.assignDate = assignDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public List<OsmStreet> getStreetList() {
        return streetList;
    }

    public void setStreetList(List<OsmStreet> streetList) {
        this.streetList = streetList;
    }

    public Map<String, UUID> getLinkedTerritories() {
        return linkedTerritories;
    }

    public void setLinkedTerritories(Map<String, UUID> linkedTerritories) {
        this.linkedTerritories = linkedTerritories;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<TerritoryData> getTerritories() {
        return territories;
    }

    public void setTerritories(List<TerritoryData> territories) {
        this.territories = territories;
    }
}
