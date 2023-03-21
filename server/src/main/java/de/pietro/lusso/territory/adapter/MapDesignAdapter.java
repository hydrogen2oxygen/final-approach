package de.pietro.lusso.territory.adapter;


import de.pietro.lusso.territory.domain.mapDesign.MapDesign;
import de.pietro.lusso.territory.domain.mapDesign.TerritoryMap;
import de.pietro.lusso.territory.domain.osm.ResidentialUnit;
import de.pietro.lusso.territory.services.DatabaseService;
import de.pietro.lusso.territory.services.OsmService;
import de.pietro.lusso.territory.services.mapDesign.MapDesignService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Collection;

@RestController
@RequestMapping("map/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MapDesignAdapter {

    private static final Logger logger = LogManager.getLogger(MapDesignAdapter.class);

    @Autowired
    private DatabaseService databaseService;
    @Autowired
    private OsmService osmService;
    @Autowired
    private MapDesignService mapDesignService;

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

    @GetMapping("downloadMapDesign")
    public void downloadMapDesign() throws Exception {
        mapDesignService.downloadMapDesign();
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

    @GetMapping("downloadResidantialUnits/{lon1}/{lat1}/{lon2}/{lat2}")
    public Collection<ResidentialUnit> downloadResidantialUnits(@PathVariable Double lon1, @PathVariable Double lat1,
                                                                @PathVariable Double lon2, @PathVariable Double lat2) throws IOException, NoSuchAlgorithmException {

        return osmService.downloadResidantialUnits(lon1,lat1,lon2,lat2);
    }

}
