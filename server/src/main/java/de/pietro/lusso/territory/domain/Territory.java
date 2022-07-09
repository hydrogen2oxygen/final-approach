package de.pietro.lusso.territory.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class Territory implements Serializable  {

    /**
     * UUID of the territory, also linked to the territory data JSON for the online map.
     * This UUID will regenerated when the territory is reassigned to another preacher.
     * The old JSON will be set to inactive.
     */
    private UUID uuid;
    private String number;
    private String name;
    private int entryCounts = 0;
    private Date date;
    private boolean noContacts = false;
    private boolean archive = false;
    private boolean ftpExported = false;
    private boolean ftpDeactived = false;
    private boolean mapExist = false;
    private String url;

    private List<String> notes = new ArrayList<>();

    private List<RegistryEntry> registryEntryList = new ArrayList<>();

    public List<String> getNotes() {
        return notes;
    }

    public void setNotes(List<String> notes) {
        this.notes = notes;
    }

    public List<RegistryEntry> getRegistryEntryList() {
        return registryEntryList;
    }

    public void setRegistryEntryList(List<RegistryEntry> registryEntryList) {
        this.registryEntryList = registryEntryList;
    }

    public int getEntryCounts() {
        return entryCounts;
    }

    public void setEntryCounts(int entryCounts) {
        this.entryCounts = entryCounts;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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

    public boolean isNoContacts() {
        return noContacts;
    }

    public void setNoContacts(boolean noContacts) {
        this.noContacts = noContacts;
    }

    public boolean isArchive() {
        return archive;
    }

    public void setArchive(boolean archive) {
        this.archive = archive;
    }

    public boolean isFtpExported() {
        return ftpExported;
    }

    public void setFtpExported(boolean ftpExported) {
        this.ftpExported = ftpExported;
    }

    public boolean isFtpDeactived() {
        return ftpDeactived;
    }

    public void setFtpDeactived(boolean ftpDeactived) {
        this.ftpDeactived = ftpDeactived;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public boolean isMapExist() {
        return mapExist;
    }

    public void setMapExist(boolean mapExist) {
        this.mapExist = mapExist;
    }

    @Override
    public String toString() {
        return "Territory{" +
                "number=" + number +
                ", name='" + name + '\'' +
                '}';
    }
}
