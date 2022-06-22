package de.pietro.lusso.territory.domain;

import org.dizitart.no2.objects.Id;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Settings {

    @Id
    private UUID uuid = UUID.randomUUID();
    private Map<String,String> settings = new HashMap<>();
    private Map<String,String> translations = new HashMap<>();

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public Map<String, String> getSettings() {
        return settings;
    }

    public void setSettings(Map<String, String> settings) {
        this.settings = settings;
    }

    public Map<String, String> getTranslations() {
        return translations;
    }

    public void setTranslations(Map<String, String> translations) {
        this.translations = translations;
    }
}
