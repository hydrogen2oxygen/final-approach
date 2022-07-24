package de.pietro.lusso.territory.domain;

public class Version {

    private String revision;
    private int counterTerritories = 0;
    private int counterPreachers = 0;
    private int counterPreacherWithTerritories = 0;
    private boolean uploading = false;
    private boolean downloading = false;

    public String getRevision() {
        return revision;
    }

    public void setRevision(String revision) {
        this.revision = revision;
    }

    public int getCounterTerritories() {
        return counterTerritories;
    }

    public void setCounterTerritories(int counterTerritories) {
        this.counterTerritories = counterTerritories;
    }

    public int getCounterPreachers() {
        return counterPreachers;
    }

    public void setCounterPreachers(int counterPreachers) {
        this.counterPreachers = counterPreachers;
    }

    public int getCounterPreacherWithTerritories() {
        return counterPreacherWithTerritories;
    }

    public void setCounterPreacherWithTerritories(int counterPreacherWithTerritories) {
        this.counterPreacherWithTerritories = counterPreacherWithTerritories;
    }

    public boolean isUploading() {
        return uploading;
    }

    public void setUploading(boolean uploading) {
        this.uploading = uploading;
    }

    public boolean isDownloading() {
        return downloading;
    }

    public void setDownloading(boolean downloading) {
        this.downloading = downloading;
    }
}
