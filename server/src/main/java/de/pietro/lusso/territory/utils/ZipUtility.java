package de.pietro.lusso.territory.utils;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

public class ZipUtility {

    public static void zipBackup(String backupFile, File [] files) throws IOException {

        ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(new File(backupFile)));

        for (File file : files) {
            writeZipEntry(zos, file);
        }

        zos.close();
    }

    private static void writeZipEntry(ZipOutputStream zos, File file) throws IOException {
        zos.putNextEntry(new ZipEntry(file.getName()));
        zos.write(FileUtils.readFileToString(file, "UTF-8").getBytes());
        zos.closeEntry();
    }

    public static void unzipBackup(String backupFile) {
        try {
            byte[] buffer = new byte[1024];
            ZipInputStream zis = new ZipInputStream(new FileInputStream(backupFile));

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
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
