package de.pietro.lusso.territory.services;

import com.jcraft.jsch.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Map;
import java.util.Vector;

@Service
public class FtpService {

    private String ftpUser;
    private String ftpPassword;
    private String ftpHost;
    private Integer ftpPort;
    private String knownHosts;
    private String rootPath;

    @Autowired
    private DatabaseService databaseService;

    @PostConstruct
    public void init() {
        Map<String,String> s = databaseService.loadSettings().getSettings();
        ftpUser = s.get("ftp.user");
        ftpPassword = s.get("ftp.password");
        ftpHost = s.get("ftp.host");
        try {
            ftpPort = Integer.valueOf(s.get("ftp.port"));
        } catch (Exception e) {}
        knownHosts = s.get("ftp.knownHosts");
        rootPath = s.get("ftp.rootPath");
    }

    public Vector list(String path) throws JSchException, SftpException {

        ChannelSftp ftp = getFtpsClient();

        Vector v = ftp.ls(path);
        ftp.disconnect();

        return v;
    }

    public void upload(File file) throws JSchException, SftpException, FileNotFoundException {

        if (!file.exists()) {
            System.out.println("File " + file.getAbsolutePath() + " does not exist!");
            return;
        }

        ChannelSftp ftp = getFtpsClient();
        ftp.put(file.getAbsolutePath(),rootPath + "/" + file.getName());
        ftp.disconnect();
    }

    public void delete(String path) throws JSchException, SftpException {

        ChannelSftp ftp = getFtpsClient();
        ftp.rm(path);
        ftp.disconnect();
    }

    private ChannelSftp getFtpsClient() throws JSchException {

        JSch jsch = new JSch();

        jsch.setKnownHosts(knownHosts);
        Session jschSession = jsch.getSession(ftpUser, ftpHost, ftpPort);
        java.util.Properties config = new java.util.Properties();
        config.put("StrictHostKeyChecking", "no");
        jschSession.setConfig(config);
        jschSession.setPassword(ftpPassword);
        jschSession.connect();
        Channel channel=jschSession.openChannel("sftp");
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
}
