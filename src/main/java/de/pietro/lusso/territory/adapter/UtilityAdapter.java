package de.pietro.lusso.territory.adapter;

import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.SftpException;
import de.pietro.lusso.territory.domain.ImportData;
import de.pietro.lusso.territory.services.DatabaseService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("utility/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UtilityAdapter {

    private static final Logger logger = LogManager.getLogger(UtilityAdapter.class);

    @Autowired
    private DatabaseService databaseService;

    @PostMapping("importTerritoriesFromText")
    public void importTerritoriesFromText(@RequestBody ImportData importData) throws IOException, JSchException, SftpException {
        databaseService.importTerritoriesFromText(importData.getImportPath());
    }
}
