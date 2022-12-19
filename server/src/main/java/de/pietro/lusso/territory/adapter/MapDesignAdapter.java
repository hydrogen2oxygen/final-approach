package de.pietro.lusso.territory.adapter;


import de.pietro.lusso.territory.domain.MapDesign;
import de.pietro.lusso.territory.domain.TerritoryMap;
import de.pietro.lusso.territory.services.DatabaseService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("map/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MapDesignAdapter {

    private static final Logger logger = LogManager.getLogger(MapDesignAdapter.class);

    @Autowired
    private DatabaseService databaseService;

    @GetMapping("status")
    public String status() {
        logger.info("status ok");
        return "ok";
    }

    @GetMapping
    public MapDesign getMapDesign() throws IOException {
        return databaseService.loadMapDesign();
    }

    @PutMapping
    public MapDesign saveMapDesign(@RequestBody MapDesign mapDesign) throws IOException {

        return databaseService.saveMapDesign(mapDesign);
    }

    @PutMapping("territoryMap")
    public TerritoryMap saveTerritoryMap(@RequestBody TerritoryMap territoryMap) throws IOException {

        return databaseService.saveTerritoryMap(territoryMap);
    }

    @GetMapping("setActiveTerritory/{number}/{name}")
    public MapDesign setActiveTerritory(@PathVariable String number, @PathVariable String name) throws Exception {

        return databaseService.setActiveTerritory(number,name);
    }

    @DeleteMapping("territoryMap/{number}")
    public MapDesign deleteTerritoryMap(@PathVariable String number) throws IOException {

        MapDesign mapDesign = databaseService.loadMapDesign();
        TerritoryMap territoryMap = null;

        for (TerritoryMap t : mapDesign.getTerritoryMapList()) {
            if (t.getTerritoryNumber().equals(number)) {
                territoryMap = t;
                break;
            }
        }

        if (territoryMap != null) {
            mapDesign.getTerritoryMapList().remove(territoryMap);
            databaseService.saveMapDesign(mapDesign);
        }

        return mapDesign;
    }

}
