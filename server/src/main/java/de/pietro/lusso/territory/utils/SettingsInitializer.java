package de.pietro.lusso.territory.utils;

import de.pietro.lusso.territory.domain.Settings;

/**
 * Init empty values so that you can edit them in the UI
 */
public class SettingsInitializer {
    private static final String NOT_SET = "NOT_SET";
    private SettingsInitializer() {}

    public static void init(final Settings settings) {
        addIfMissing(settings, "ftp.user");
        addIfMissing(settings, "ftp.password");
        addIfMissing(settings, "ftp.host");
        addIfMissing(settings, "ftp.port");
        addIfMissing(settings, "ftp.knownHosts");
        addIfMissing(settings, "ftp.rootPath");
        addIfMissing(settings, "ftp.httpHost");
        addIfMissing(settings, "ftp.sftp"); // true or false (null is false)
        addIfMissing(settings, "ftp.sync"); // true or false (null is false)
        addIfMissing(settings, "ftp.syncPassword");
    }

    private static void addIfMissing(Settings settings, String key) {
        if (!settings.getSettings().containsKey(key)) {
            settings.getSettings().put(key,NOT_SET);
        }
    }
}
