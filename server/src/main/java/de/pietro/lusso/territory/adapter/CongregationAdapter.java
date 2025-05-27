package de.pietro.lusso.territory.adapter;


import de.pietro.lusso.territory.domain.*;
import de.pietro.lusso.territory.services.DatabaseService;
import de.pietro.lusso.territory.services.PrintService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("congregation/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CongregationAdapter {

    private static final Logger logger = LogManager.getLogger(CongregationAdapter.class);

    @Autowired
    private DatabaseService databaseService;

    @Autowired
    private PrintService printService;

    @GetMapping("status")
    public String status() {
        logger.info("status ok");
        return "ok";
    }

    @GetMapping("version")
    public Version version() throws IOException {
        return databaseService.readVersionInfos();
    }

    @GetMapping
    public Congregation getCongregation() throws IOException {
        return databaseService.loadCongregation();
    }

    @GetMapping("printPDF")
    public void printPDF() throws Exception {
        printService.printCongregation(databaseService.loadCongregation());
    }

    @GetMapping("search/{text}")
    public List<String> search(@PathVariable String text) throws Exception {
        return databaseService.search(text);
    }

    @RequestMapping(value = "image/{preacherName}", method = RequestMethod.GET)
    public void getImageAsByteArray(@PathVariable String preacherName, HttpServletResponse response) throws IOException {

        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        printService.generatePreacherImage(databaseService.loadCongregation(), preacherName, response.getOutputStream());
    }

    @RequestMapping(value = "territoryImage/{number}", method = RequestMethod.GET)
    public void getTerritoryImageAsByteArray(@PathVariable String number, HttpServletResponse response) throws IOException {

        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        BufferedImage image = ImageIO.read(new File("Cartine/" + number + ".jpg"));
        ImageIO.write(image, "PNG", response.getOutputStream());
    }

    @PostMapping("registerTerritory/{number}")
    public Message registerTerritory(@PathVariable String number) throws Exception {
        databaseService.registerTerritory(number);
        Message msg = new Message();
        msg.setMsg("Territory " + number + " registered!");
        return msg;
    }

    @PostMapping("exportDatabase")
    public void exportDatabase() {
        databaseService.exportDatabase();
    }

    @PostMapping("exportTerritoryData/{number}")
    public Message exportTerritoryData(@PathVariable String number) throws Exception {
        databaseService.exportTerritoryData(databaseService.getTerritoryByNumber(number));
        Message msg = new Message();
        msg.setMsg("Territory " + number + " exported!");
        return msg;
    }

    @PostMapping("reexportTerritoryData/{number}")
    public Message reexportTerritoryData(@PathVariable String number) throws Exception {
        databaseService.exportTerritoryData(databaseService.getTerritoryByNumber(number), true);
        Message msg = new Message();
        msg.setMsg("Territory " + number + " reexported!");
        return msg;
    }

    @PostMapping("reexportTerritoryData")
    public Message reexportTerritoryData() throws Exception {
        databaseService.reexportFailedTerritoryData();
        Message msg = new Message();
        msg.setMsg("Failed territories data reexported!");
        return msg;
    }

    @PostMapping("exportTerritoryData")
    public void exportTerritoryData() throws Exception {
        databaseService.exportTerritoryData();
    }

    @PostMapping("exportAllTerritoryData")
    public void exportAllTerritoryData() throws Exception {
        databaseService.exportAllTerritoryData();
    }

    @PutMapping
    public Congregation saveCongregation(@RequestBody Congregation congregation) throws IOException {

        return databaseService.saveCongregation(congregation);
    }

    @PutMapping("reset")
    public void resetCongregation() throws Exception {
        databaseService.resetCongregation();
    }

    @PutMapping("fake8Months/{number}/{months}")
    public void fake8Months(@PathVariable String number,@PathVariable Integer months) throws Exception {
        databaseService.fakeMonths(number, months);
    }

    @PutMapping("territory")
    public Territory saveTerritory(@RequestBody Territory territory) throws IOException {

        return databaseService.saveTerritory(territory);
    }

    @GetMapping("territory")
    public List<Territory> getTerritoryList() throws Exception {
        return databaseService.getTerritoryList();
    }

    @DeleteMapping("territory/{number}")
    public void deleteTerritory(@PathVariable String number) throws Exception {
        databaseService.deleteTerritory(number);
    }

    @GetMapping("backup")
    public List<BackupFile> getBackupsOverview() {
        return databaseService.getBackupsOverview();
    }

    @PutMapping("backup")
    public void restoreBackup(@RequestBody BackupFile backupFile) throws IOException {
        databaseService.restoreBackup(backupFile);
    }

    @PutMapping("backup/delete")
    public void deleteBackupFile(@RequestBody BackupFile backupFile) throws IOException {
        databaseService.deleteBackupFile(backupFile);
    }

    @PutMapping("returnTerritory/{number}")
    public void returnTerritory(@PathVariable String number) throws IOException {
        databaseService.returnTerritory(number);
    }
}
