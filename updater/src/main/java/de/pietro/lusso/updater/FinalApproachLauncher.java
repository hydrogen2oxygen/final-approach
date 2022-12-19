package de.pietro.lusso.updater;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.pietro.lusso.updater.domain.Version;
import de.pietro.lusso.updater.domain.VersionInfo;
import de.pietro.lusso.updater.domain.VersionInfoDetail;
import de.pietro.lusso.updater.utils.Downloader;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Calendar;
import java.util.Properties;
import java.util.Scanner;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class FinalApproachLauncher extends JFrame {

    private String revision;
    private String versionInfoText;
    private VersionInfo versionInfo;
    private ObjectMapper objectMapper;
    private Process proc;
    private boolean stop = false;
    private static String jarStarterCommand = "java -Dfile.encoding=UTF-8 -jar server.jar";;

    public static void main(String [] args) throws IOException, InterruptedException {
        System.out.println("FinalApproachLauncher 1.1.1 ...");
        if (args.length > 0) {
            jarStarterCommand = "";
            for (String arg : args) {
                jarStarterCommand += arg + " ";
            }
        }
        new FinalApproachLauncher();
    }

    public FinalApproachLauncher() {
        objectMapper = new ObjectMapper();

        setTitle("Final-Approach Launcher");
        setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        setLayout(null);
        setBounds(0,0,500,200);

        JButton checkForUpdatesButton = new JButton("UPDATE");
        checkForUpdatesButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                checkForUpdates();
            }
        });
        checkForUpdatesButton.setBounds(0,0,250,200);
        add(checkForUpdatesButton);

        JButton closeButton = new JButton("EXIT");
        closeButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                stop = true;
                shutdownServer();
                shutdownLauncher();
            }
        });
        closeButton.setBounds(250,0,250,200);
        add(closeButton);

        setVisible(true);
        addWindowListener(new WindowAdapter()
        {
            @Override
            public void windowClosing(WindowEvent e)
            {
                shutdownServer();
                shutdownLauncher();
            }
        });

        final FinalApproachLauncher that = this;

        Executor executor = Executors.newSingleThreadExecutor();
        executor.execute(() -> {
            try {
                runServer();
                sleep(2);

                while (!stop) {
                    sleep(60);

                    if (checkForUpdates()) {
                        shutdownServer();
                        unzipUpdate();
                        runServer();
                        sleep(300); // wait longer now
                    }
                }

                shutdownServer();
                shutdownLauncher();
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

    }

    private void sleep(long seconds) {

        try {
            Thread.sleep(seconds * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private void shutdownLauncher() {
        stop = true;
        System.err.println("... done. Good bye!");
        System.exit(0);
    }

    private void unzipUpdate() {
        try {
            String fileZip = "newVersion" + versionInfo.getCurrentVersion() + ".zip";
            byte[] buffer = new byte[1024];
            ZipInputStream zis = new ZipInputStream(new FileInputStream(fileZip));

            ZipEntry zipEntry = zis.getNextEntry();

            while (zipEntry != null) {
                File newFile = new File(zipEntry.getName());
                if (zipEntry.isDirectory()) {
                    if (!newFile.isDirectory() && !newFile.mkdirs()) {
                        throw new IOException("Failed to create directory " + newFile);
                    }
                } else {
                    // write file content
                    System.out.println(newFile.getName());
                    FileOutputStream fos = new FileOutputStream(newFile);
                    int len;
                    while ((len = zis.read(buffer)) > 0) {
                        fos.write(buffer, 0, len);
                    }
                    fos.close();
                }
                zipEntry = zis.getNextEntry();
            }
            zis.closeEntry();
            zis.close();

            new File(fileZip).delete();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void downloadUpdate(VersionInfo remoteVersion) {
        System.out.println("Downloading update ...");
        Downloader.download(remoteVersion.getDownloadPath(),"newVersion" + remoteVersion.getCurrentVersion() + ".zip");
    }

    private boolean checkForUpdates() {

        System.out.print("checking for updates ... ");

        try {
            readVersionInfos();
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            File versionInfoFile = new File("versionInfo.json");

            if (versionInfoFile.exists()) {
                versionInfo = objectMapper.readValue(versionInfoFile, VersionInfo.class);
            } else {
                versionInfo = new VersionInfo();
                versionInfo.setDownloadPath("https://github.com/hydrogen2oxygen/final-approach/releases/download/v" + revision + "/final-approach-" + revision + ".zip");
                versionInfo.setCurrentVersion(revision);
                versionInfo.setCurrentVersionInfo(versionInfoText);
                versionInfo.getVersionInfoDetailList().add(new VersionInfoDetail(revision, versionInfoText));
                objectMapper.writeValue(versionInfoFile, versionInfo);
            }

            Version currentVersion = new Version(versionInfo.getCurrentVersion());
            System.out.println(" current version is " + currentVersion);
            VersionInfo remoteVersion = objectMapper.readValue(new URL("https://raw.githubusercontent.com/hydrogen2oxygen/final-approach/main/versionInfo.json"), VersionInfo.class);
            Version newVersion = new Version(remoteVersion.getCurrentVersion());
            System.out.println(" new version is " + currentVersion);

            if (newVersion.compareTo(currentVersion) > 0 ) {
                System.out.println("NEW VERSION FOUND!");
                downloadUpdate(remoteVersion);
                objectMapper.writeValue(versionInfoFile, remoteVersion);
                versionInfo = remoteVersion;
                setTitle("Final-Approach Launcher - Version " + versionInfo);
                return true;
            } else {
                System.out.println("same old version");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    private void runServer() throws IOException, InterruptedException {
        System.out.println("Starting server ...");
        Executor executor = Executors.newSingleThreadExecutor();
        executor.execute(() -> {
            try {
                proc = Runtime.getRuntime().exec(jarStarterCommand);
                System.out.println("... running ...");
                try {
                    Runtime rt = Runtime.getRuntime();
                    rt.exec("rundll32 url.dll,FileProtocolHandler " + "http://localhost?avoidCache=" + Calendar.getInstance().getTimeInMillis());
                } catch (Exception e) {
                    e.printStackTrace();
                }
                Thread err = consume(proc.getErrorStream(), System.err);
                Thread std = consume(proc.getInputStream(), System.out);
                err.join();
                std.join();
                proc.waitFor();
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    private void shutdownServer() {
        callServerShutdown();
        try {
            if (proc != null) proc.destroy();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void callServerShutdown() {
        try {

            URL url = new URL("http://localhost/utility/shutdown");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP Error code : "
                        + conn.getResponseCode());
            }
            InputStreamReader in = new InputStreamReader(conn.getInputStream());
            BufferedReader br = new BufferedReader(in);
            String output;
            while ((output = br.readLine()) != null) {
                System.out.println(output);
            }
            conn.disconnect();

        } catch (Exception e) {
            System.out.println("Exception in NetClientGet:- " + e);
        }
    }

    private Thread consume(final InputStream stream, final OutputStream out) {
        Thread result = new Thread() {
            public void run() {
                PrintWriter pw = new PrintWriter(out, true);
                try (Scanner sc = new Scanner(stream)) {
                    while (sc.hasNext()) {
                        pw.println(sc.nextLine());
                    }
                }
            }
        };
        result.start();
        return result;
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
