package de.pietro.lusso.territory.domain;

import java.util.Calendar;

public class BackupFile {

    private String filePath;
    private boolean alreadyOpen = false;
    private Calendar lastUpdate = Calendar.getInstance();
    private Integer territoryCount = 0;
    private Integer preacherCount = 0;

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public boolean isAlreadyOpen() {
        return alreadyOpen;
    }

    public void setAlreadyOpen(boolean alreadyOpen) {
        this.alreadyOpen = alreadyOpen;
    }

    public Calendar getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Calendar lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Integer getTerritoryCount() {
        return territoryCount;
    }

    public void setTerritoryCount(Integer territoryCount) {
        this.territoryCount = territoryCount;
    }

    public Integer getPreacherCount() {
        return preacherCount;
    }

    public void setPreacherCount(Integer preacherCount) {
        this.preacherCount = preacherCount;
    }
}
