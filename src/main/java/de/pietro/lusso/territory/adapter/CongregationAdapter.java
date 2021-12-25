package de.pietro.lusso.territory.adapter;


import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.SftpException;
import de.pietro.lusso.territory.domain.Congregation;
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

    @GetMapping
    public Congregation getCongregation() {
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

    @PostMapping("exportDatabase")
    public void exportDatabase() {
        databaseService.exportDatabase();
    }

    @PostMapping("exportTerritoryData/{number}")
    public void exportTerritoryData(@PathVariable String number) throws IOException, JSchException, SftpException {
        databaseService.exportTerritoryData(number);
    }

    @PostMapping("exportTerritoryData")
    public void exportTerritoryData() throws IOException, SftpException, JSchException {
        databaseService.exportTerritoryData();
    }

    @PostMapping("exportAllTerritoryData")
    public void exportAllTerritoryData() throws IOException, SftpException, JSchException {
        databaseService.exportAllTerritoryData();
    }

    @PostMapping("repairExports")
    public void repairExports() throws Exception {
        databaseService.repairExports();
    }

    @PutMapping
    public Congregation saveCongregation(@RequestBody Congregation congregation) {

        return databaseService.saveCongregation(congregation);
    }


}
