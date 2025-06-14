package de.pietro.lusso.territory.services;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jcraft.jsch.*;
import de.pietro.lusso.territory.domain.Territory;
import de.pietro.lusso.territory.domain.TerritoryData;
import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.List;
import java.util.Map;
import java.util.Vector;

@Service
public class FtpService {

    private static final Logger logger = LogManager.getLogger(FtpService.class);

    private String ftpUser;
    private String ftpPassword;
    private String ftpHost;
    private Integer ftpPort;
    private String knownHosts;
    private String rootPath;
    private boolean useSftp;
    private boolean initialized = false;

    @Autowired
    private DatabaseService databaseService;

    @PostConstruct
    public void init() throws IOException {
        Map<String, String> s = databaseService.loadSettings().getSettings();
        ftpUser = s.get("ftp.user");
        ftpPassword = s.get("ftp.password");
        ftpHost = s.get("ftp.host");
        try {
            ftpPort = Integer.valueOf(s.get("ftp.port"));
        } catch (Exception e) {
        }
        knownHosts = s.get("ftp.knownHosts");
        rootPath = s.get("ftp.rootPath");
        useSftp = false;

        if (s.get("ftp.sftp") != null) {
            try {
                useSftp = Boolean.parseBoolean(s.get("ftp.sftp"));
                logger.info("Using SFTP " + useSftp);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if (useSftp) {
            try {
                getSftpClient().ls(".");
                initialized = true;
            } catch (Exception e) {
                logger.error("Initializing SFTP error", e);
            }
        } else {
            try {
                getFtpClient().listFiles("");
                initialized = true;
            } catch (Exception e) {
                logger.error("Initializing FTP error", e);
            }
        }

        if (initialized) {
            // start in a thread async
            new Thread(() -> cleanUpInactiveFiles()).start();
        }
    }

    public void cleanUpInactiveFiles() {
        try {
            Vector<String> fileList = list("assets/data/");
            List<Territory> territoryList = databaseService.loadCongregation().getTerritoryList();
            for (Territory territory : territoryList) {
                if (fileList.contains(territory.getUuid() + ".json")) {
                    fileList.remove(territory.getUuid() + ".json");
                }
            }

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            objectMapper.configure(JsonParser.Feature.AUTO_CLOSE_SOURCE, true);

            for (String fileName : fileList) {
                if (!fileName.startsWith("dashboard") && fileName.endsWith("json")) {
                    logger.info(fileName);
                    File jsonFile = new File(databaseService.TERRITORY_JSON_DATA + fileName);
                    if (jsonFile.exists()) {
                        logger.info("File " + jsonFile.getAbsolutePath() + " still exists!");
                        TerritoryData territoryData = objectMapper.readValue(jsonFile, TerritoryData.class);
                        if (territoryData.isActive()) {
                            logger.info("File " + jsonFile.getAbsolutePath() + " is active!");
                        } else {
                            logger.info("File " + jsonFile.getAbsolutePath() + " is inactive!");
                            delete("assets/data/" + fileName);
                            boolean deleted = jsonFile.delete();
                            if (deleted) {
                                logger.info("File " + jsonFile.getAbsolutePath() + " deleted!");
                            } else {
                                logger.info("File " + jsonFile.getAbsolutePath() + " could not be deleted!");
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            logger.error(e);
        }
    }


    public Vector<String> list(String path) throws Exception {
        Vector<String> v = new Vector<>();

        if (useSftp) {
            ChannelSftp sftp = getSftpClient();
            Vector<ChannelSftp.LsEntry> lsEntries = sftp.ls(path);

            for (ChannelSftp.LsEntry entry : lsEntries) {
                v.add(entry.getFilename());
            }
            sftp.disconnect();
        } else {
            FTPClient ftp = getFtpClient();
            FTPFile[] files = ftp.listFiles(path);
            for (FTPFile file : files) {
                String details = file.getName();
                v.add(details);
            }
            ftp.disconnect();
        }

        return v;
    }

    public void upload(File file) throws Exception {

        upload(file, "");
    }
    public void upload(File file, String path) throws Exception {
        uploadWithRootPath(file, rootPath, path);
    }
    public void uploadWithRootPath(File file, String rootPath, String path) throws Exception {

        if (!file.exists()) {
            logger.info("File " + file.getAbsolutePath() + " does not exist!");
            return;
        }

        if (useSftp) {
            ChannelSftp sftp = getSftpClient();
            if (sftp != null) {
                sftp.put(file.getAbsolutePath(), rootPath + "/" + path + file.getName());
                sftp.disconnect();
            }
        } else {
            FTPClient ftp = getFtpClient();
            if (ftp != null) {
                ftp.storeFile(rootPath + "/" + path + file.getName(), new FileInputStream(file));
                ftp.disconnect();
            }
        }
    }

    public InputStream downloadFile(String filePath) throws Exception {

        if (useSftp) {
            ChannelSftp sftp = getSftpClient();
            if (sftp != null) {
                return sftp.get(filePath);
            }
        } else {
            FTPClient ftp = getFtpClient();
            if (ftp != null) {
                return ftp.retrieveFileStream(filePath);
            }
        }

        return null;
    }

    public void initFtpFolder() throws Exception {
        if (useSftp) {
            ChannelSftp sftp = getSftpClient();
            sftp.mkdir("assets");
            sftp.mkdir("assets/data");
            sftp.mkdir("assets/data/uploads");
            sftp.disconnect();
        } else {
            FTPClient ftp = getFtpClient();
            ftp.mkd("assets");
            ftp.mkd("assets/data");
            ftp.mkd("assets/data/uploads");
            ftp.disconnect();
        }
    }

    public void delete(String path) throws Exception {

        if (useSftp) {
            ChannelSftp sftp = getSftpClient();
            sftp.rm(path);
            sftp.disconnect();
        } else {
            FTPClient ftp = getFtpClient();
            ftp.deleteFile(path);
            ftp.disconnect();
        }
    }

    private FTPClient getFtpClient() throws Exception {

        initialized = false;
        FTPClient ftp = new FTPClient();

        if ("NOT_SET" == ftpHost) return null;

        ftp.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out)));
        logger.info(" connecting to ftp " + ftpHost + ":" + ftpPort + " ... ");
        ftp.connect(ftpHost, ftpPort);
        int replyCode = ftp.getReplyCode();

        if (!FTPReply.isPositiveCompletion(replyCode)) {
            logger.error("Connect failed");
            return null;
        }
        logger.info("Connected!");
        logger.info(ftp.getReplyString());

        //after connecting to the server set the local passive mode
        ftp.enterLocalPassiveMode();

        logger.info(" login to ftp with user " + ftpUser + " and password ****** ... ");
        boolean success = ftp.login(ftpUser, ftpPassword);

        if (!success) {
            logger.error("Could not login to the server");
            return null;
        }

        logger.info("Login was successful!");

        int reply = ftp.getReplyCode();

        if (!FTPReply.isPositiveCompletion(reply)) {
            ftp.disconnect();
            logger.error("FTP server refused connection.");
        }
        initialized = true;
        return ftp;
    }

    private ChannelSftp getSftpClient() throws JSchException {

        JSch jsch = new JSch();

        jsch.setKnownHosts(knownHosts);
        Session jschSession = jsch.getSession(ftpUser, ftpHost, ftpPort);
        java.util.Properties config = new java.util.Properties();
        config.put("StrictHostKeyChecking", "no");
        jschSession.setConfig(config);
        jschSession.setPassword(ftpPassword);
        jschSession.connect();
        Channel channel = jschSession.openChannel("sftp");
        channel.connect();

        return (ChannelSftp) channel;
    }

    public void setFtpUser(String ftpUser) {
        this.ftpUser = ftpUser;
    }

    public void setFtpPassword(String ftpPassword) {
        this.ftpPassword = ftpPassword;
    }

    public void setFtpHost(String ftpHost) {
        this.ftpHost = ftpHost;
    }

    public void setFtpPort(Integer ftpPort) {
        this.ftpPort = ftpPort;
    }

    public void setKnownHosts(String knownHosts) {
        this.knownHosts = knownHosts;
    }

    public void setRootPath(String rootPath) {
        this.rootPath = rootPath;
    }

    public void setUseSftp(boolean useSftp) {
        this.useSftp = useSftp;
    }

    public boolean isInitialized() {
        return initialized;
    }
}
