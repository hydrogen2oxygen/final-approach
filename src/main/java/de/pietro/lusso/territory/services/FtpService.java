package de.pietro.lusso.territory.services;

import com.jcraft.jsch.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Vector;

@Service
public class FtpService {

    @Value("${ftp.user}")
    private String ftpUser;

    @Value("${ftp.password}")
    private String ftpPassword;

    @Value("${ftp.host}")
    private String ftpHost;

    @Value("${ftp.port}")
    private Integer ftpPort;

    @Value("${ssh.knownHosts}")
    private String knownHosts;

    @Value("${ftp.rootPath}")
    private String rootPath;

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
        Session jschSession = jsch.getSession(ftpUser, ftpHost);
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
}
