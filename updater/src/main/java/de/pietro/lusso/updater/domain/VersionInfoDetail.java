package de.pietro.lusso.updater.domain;

public class VersionInfoDetail {

    private String version;
    private String text;

    public VersionInfoDetail(){}

    public VersionInfoDetail(String version, String text) {
        this.version = version;
        this.text = text;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
