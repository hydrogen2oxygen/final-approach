package de.pietro.lusso.updater.domain;

import java.util.ArrayList;
import java.util.List;

public class VersionInfo {

    private String downloadPath;
    private String currentVersion;
    private String currentVersionInfo;
    private List<VersionInfoDetail> versionInfoDetailList = new ArrayList<>();

    public String getDownloadPath() {
        return downloadPath;
    }

    public void setDownloadPath(String downloadPath) {
        this.downloadPath = downloadPath;
    }

    public String getCurrentVersion() {
        return currentVersion;
    }

    public void setCurrentVersion(String currentVersion) {
        this.currentVersion = currentVersion;
    }

    public String getCurrentVersionInfo() {
        return currentVersionInfo;
    }

    public void setCurrentVersionInfo(String currentVersionInfo) {
        this.currentVersionInfo = currentVersionInfo;
    }

    public List<VersionInfoDetail> getVersionInfoDetailList() {
        return versionInfoDetailList;
    }

    public void setVersionInfoDetailList(List<VersionInfoDetail> versionInfoDetailList) {
        this.versionInfoDetailList = versionInfoDetailList;
    }

    @Override
    public String toString() {
        return "{" +
                "\n\tcurrentVersion=" + currentVersion +
                "\n\tcurrentVersionInfo=" + currentVersionInfo +
                "\n\tversionInfoDetailList=" + versionInfoDetailList +
                "\n}";
    }
}
