package de.pietro.lusso.territory.services;

import com.jcraft.jsch.*;
import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
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

    @Autowired
    private DatabaseService databaseService;

    @PostConstruct
    public void init() {
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
            FTPFile[] files = ftp.listFiles();
            for (FTPFile file : files) {
                String details = file.getName();
                v.add(details);
            }
            ftp.disconnect();
        }

        return v;
    }

    public void upload(File file) throws Exception {

        if (!file.exists()) {
            logger.info("File " + file.getAbsolutePath() + " does not exist!");
            return;
        }

        if (useSftp) {
            ChannelSftp sftp = getSftpClient();
            sftp.put(file.getAbsolutePath(), rootPath + "/" + file.getName());
            sftp.disconnect();
        } else {
            FTPClient ftp = getFtpClient();
            ftp.storeFile(rootPath + "/" + file.getName(), new FileInputStream(file));
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

        FTPClient ftp = new FTPClient();

        try {
            ftp.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out)));
            System.out.print(" connecting to ftp " + ftpHost + ":" + ftpPort + " ... ");
            ftp.connect(ftpHost, ftpPort);
            int replyCode = ftp.getReplyCode();

            if (!FTPReply.isPositiveCompletion(replyCode)) {
                logger.error("Connect failed");
                return null;
            }
            logger.info("Connected!");
            System.out.print(ftp.getReplyString());

            //after connecting to the server set the local passive mode
            ftp.enterLocalPassiveMode();

            System.out.print(" login to ftp with user " + ftpUser + " and password ****** ... ");
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

            return ftp;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
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
}
