package de.pietro.lusso.territory.domain.mapDesign;

import de.pietro.lusso.territory.domain.osm.OsmStreet;
import de.pietro.lusso.territory.domain.osm.ResidentialUnit;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class TerritoryMap {

    private boolean draft = true;
    private String territoryNumber;
    private String territoryName;
    private String formerTerritoryNumber;
    private String simpleFeatureData;
    private String simpleFeatureType;
    private String note;
    private String url;
    private Calendar lastUpdate;
    private List<OsmStreet> streetList = new ArrayList<>();

    private List<ResidentialUnit> residentialUnits = new ArrayList<>();

    public String getTerritoryNumber() {
        return territoryNumber;
    }

    public void setTerritoryNumber(String territoryNumber) {
        this.territoryNumber = territoryNumber;
    }

    public String getTerritoryName() {
        return territoryName;
    }

    public void setTerritoryName(String territoryName) {
        this.territoryName = territoryName;
    }

    public String getFormerTerritoryNumber() {
        return formerTerritoryNumber;
    }

    public void setFormerTerritoryNumber(String formerTerritoryNumber) {
        this.formerTerritoryNumber = formerTerritoryNumber;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getSimpleFeatureData() {
        return simpleFeatureData;
    }

    public void setSimpleFeatureData(String simpleFeatureData) {
        this.simpleFeatureData = simpleFeatureData;
    }

    public String getSimpleFeatureType() {
        return simpleFeatureType;
    }

    public void setSimpleFeatureType(String simpleFeatureType) {
        this.simpleFeatureType = simpleFeatureType;
    }

    public Calendar getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Calendar lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public boolean isDraft() {
        return draft;
    }

    public void setDraft(boolean draft) {
        this.draft = draft;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<OsmStreet> getStreetList() {
        return streetList;
    }

    public void setStreetList(List<OsmStreet> streetList) {
        this.streetList = streetList;
    }

    public List<ResidentialUnit> getResidentialUnits() {
        return residentialUnits;
    }

    public void setResidentialUnits(List<ResidentialUnit> residentialUnits) {
        this.residentialUnits = residentialUnits;
    }
}
