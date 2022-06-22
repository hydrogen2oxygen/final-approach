package de.pietro.lusso.territory.services;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockftpserver.fake.FakeFtpServer;
import org.mockftpserver.fake.UserAccount;
import org.mockftpserver.fake.filesystem.DirectoryEntry;
import org.mockftpserver.fake.filesystem.FileEntry;
import org.mockftpserver.fake.filesystem.FileSystem;
import org.mockftpserver.fake.filesystem.UnixFakeFileSystem;

import java.io.File;
import java.io.IOException;
import java.util.Vector;

public class FtpServiceTest {

    private FakeFtpServer fakeFtpServer;
    private FtpService ftpService;

    @Before
    public void setup() throws IOException {
        fakeFtpServer = new FakeFtpServer();
        fakeFtpServer.addUserAccount(new UserAccount("user", "password", "/data"));

        FileSystem fileSystem = new UnixFakeFileSystem();
        fileSystem.add(new DirectoryEntry("/data"));
        fileSystem.add(new FileEntry("/data/foobar.txt", "abcdef 1234567890"));
        fakeFtpServer.setFileSystem(fileSystem);
        fakeFtpServer.setServerControlPort(0);

        fakeFtpServer.start();

        ftpService = new FtpService();
        ftpService.setFtpHost("localhost");
        ftpService.setFtpPort(fakeFtpServer.getServerControlPort());
        ftpService.setFtpUser("user");
        ftpService.setFtpPassword("password");
        ftpService.setKnownHosts("~/.ssh/blu_hosts");
        ftpService.setUseSftp(false);
        ftpService.setRootPath("");
    }

    @After
    public void teardown() throws IOException {
        fakeFtpServer.stop();
    }

    @Test
    public void testProofOfConcept() throws Exception {

        if (!new File("target").exists()) {
            new File("target").mkdir();
        }

        File testFile = new File("target/t.json");

        if (!testFile.exists()) {
            testFile.createNewFile();
        }

        ftpService.upload(new File("target/t.json"));

        Vector<String> vector = ftpService.list(".");

        for (String entry : vector) {
            System.out.println(entry);
        }
    }
}
