package de.pietro.lusso.territory.adapter;


import de.pietro.lusso.territory.domain.MapDesign;
import de.pietro.lusso.territory.domain.TerritoryMap;
import de.pietro.lusso.territory.services.DatabaseService;
import de.pietro.lusso.territory.services.KmlService;
import de.pietro.lusso.territory.services.OsmService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("map/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MapDesignAdapter {

    private static final Logger logger = LogManager.getLogger(MapDesignAdapter.class);

    @Autowired
    private DatabaseService databaseService;

    @Autowired
    private KmlService kmlService;

    @Autowired
    private OsmService osmService;

    @GetMapping("status")
    public String status() {
        logger.info("status ok");
        return "ok";
    }

    @GetMapping
    public MapDesign getMapDesign() {
        return databaseService.loadMapDesign();
    }

    @PutMapping
    public MapDesign saveMapDesign(@RequestBody MapDesign mapDesign) {

        return databaseService.saveMapDesign(mapDesign);
    }

    @GetMapping("exportKml")
    public void exportKML() throws Exception {
        kmlService.exportMapDesign(databaseService.loadMapDesign());
    }

    @GetMapping("importStreetNames")
    public void importStreetNames() throws Exception {

        final MapDesign mapDesign = databaseService.loadMapDesign();

        for (TerritoryMap territoryMap : mapDesign.getTerritoryMapList()) {
            osmService.extractStreetsForTerritory(territoryMap);
        }

        databaseService.saveMapDesign(mapDesign);
    }

    @GetMapping("setActiveTerritory/{number}/{name}")
    public void setActiveTerritory(@PathVariable String number, @PathVariable String name) throws Exception {

        databaseService.setActiveTerritory(number,name);
    }

    @DeleteMapping("territoryMap/{number}")
    public void deleteTerritoryMap(@PathVariable Integer number) {

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
    }

}
