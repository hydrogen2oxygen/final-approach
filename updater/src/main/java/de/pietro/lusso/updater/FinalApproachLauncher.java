package de.pietro.lusso.updater;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.pietro.lusso.updater.domain.VersionInfo;
import de.pietro.lusso.updater.domain.VersionInfoDetail;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class FinalApproachLauncher {

    private String revision;
    private String versionInfoText;
    private ObjectMapper objectMapper;

    public static void main(String [] args) throws IOException {
        System.out.println("FinalApproachLauncher ...");
        FinalApproachLauncher finalApproachLauncher = new FinalApproachLauncher();
        finalApproachLauncher.run();
    }

    public void run() throws IOException {
        objectMapper = new ObjectMapper();
        readVersionInfos();

        System.out.println("Version = " + revision);
        System.out.println("Info = " + versionInfoText);

        File versionInfoFile = new File("versionInfo.json");
        VersionInfo versionInfo = null;

        if (versionInfoFile.exists()) {
            versionInfo = objectMapper.readValue(versionInfoFile, VersionInfo.class);
        } else {
            versionInfo = new VersionInfo();
            versionInfo.setCurrentVersion(revision);
            versionInfo.setCurrentVersionInfo(versionInfoText);
            versionInfo.getVersionInfoDetailList().add(new VersionInfoDetail(revision, versionInfoText));
            objectMapper.writeValue(versionInfoFile, versionInfo);
        }
    }

    private void readVersionInfos() throws IOException {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        InputStream is = classloader.getResourceAsStream("info.properties");
        if (is == null) throw new IOException("info.properties not found inside classpath");
        Properties p = new Properties();
        p.load(is);
        revision = p.getProperty("revision");
        versionInfoText = p.getProperty("version.info");
    }
}
