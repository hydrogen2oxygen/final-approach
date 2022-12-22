package de.pietro.lusso.territory.services;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.pietro.lusso.territory.domain.osm.OsmDownload;
import de.pietro.lusso.territory.domain.osm.OsmElement;
import de.pietro.lusso.territory.domain.osm.ResidentialUnit;
import org.apache.commons.io.FileUtils;
import org.locationtech.proj4j.*;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.xml.bind.DatatypeConverter;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;


@Service
public class OsmService {

    private ObjectMapper objectMapper = new ObjectMapper();
    private CoordinateTransform wgsToOpenlayers;
    private File cacheDataFolder = new File("data/cache");
    private MessageDigest md;

    @PostConstruct
    public void init() throws NoSuchAlgorithmException {

        cacheDataFolder.mkdirs();
        md = MessageDigest.getInstance("MD5");

        CRSFactory crsFactory = new CRSFactory();
        CoordinateReferenceSystem WGS84 = crsFactory.createFromName("epsg:4326");
        CoordinateReferenceSystem OPENLAYERS = crsFactory.createFromName("epsg:3857");
        CoordinateTransformFactory ctFactory = new CoordinateTransformFactory();
        wgsToOpenlayers = ctFactory.createTransform(WGS84, OPENLAYERS);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    /**
     * Main for testing purpose, just run it and see what happens
     * @param args
     * @throws IOException
     * @throws NoSuchAlgorithmException
     */
    public static void main(String[] args) throws IOException, NoSuchAlgorithmException {

        OsmService osmService = new OsmService();
        osmService.init();
        Collection<ResidentialUnit> list = osmService.extractResidentialUnitsFromOsmDownload(FileUtils.readFileToString(new File("data/cache/ADCF5DBDE890D7583FCEA5AA7DEF0443.json"), "UTF-8"));//osmService.downloadResidantialUnits(48.68142617714386,9.14840702937828,48.6846638187896,9.153609596804264);
        for (ResidentialUnit unit : list) {
            System.out.println(unit);
        }
    }

    public Collection<ResidentialUnit> downloadResidantialUnits(Double lon1, Double lat1, Double lon2, Double lat2) throws IOException, NoSuchAlgorithmException {

        String url = "https://overpass-api.de/api/interpreter?data=" + URLEncoder.encode("[out:json];nwr("+ lon1 + "," + lat1 + "," + lon2 + "," + lat2 + ");out;", "UTF-8");
        md.update(url.getBytes());
        byte[] md5Digest = md.digest();
        String md5Hash = DatatypeConverter.printHexBinary(md5Digest).toUpperCase();
        String json = null;
        File cacheFile = new File(cacheDataFolder.getAbsolutePath() + File.separator + md5Hash + ".json");

        if (cacheFile.exists()) {
            json = FileUtils.readFileToString(cacheFile, "UTF-8");
        } else {
            json = performHttpGetRequest(url);
            // Cache the file, so we don't need to stress the API so much
            if (json != null) {
                FileUtils.writeStringToFile(cacheFile, json);
            }
        }

        if (json != null) {
            return extractResidentialUnitsFromOsmDownload(json);
        } else {
            return new ArrayList<>();
        }
    }

    private String performHttpGetRequest(String urlText) throws IOException {

        StringBuilder result = new StringBuilder();
        URL url = new URL(urlText);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(conn.getInputStream()))) {
            for (String line; (line = reader.readLine()) != null; ) {
                result.append(line);
            }
        }
        return result.toString();
    }

    public Collection<ResidentialUnit> extractResidentialUnitsFromOsmDownload(String osmJson) throws IOException {

        Map<String, OsmElement> nodesMap = new HashMap<>();
        Map<String, ResidentialUnit> residentialMap = new HashMap<>();

        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        OsmDownload osmDownload = objectMapper.readValue(osmJson, OsmDownload.class);

        // general extraction
        for (OsmElement o : osmDownload.getElements()) {

            if (o.getLon() != null) {
                nodesMap.put(o.getId(), o);
            }

            // could be a node or a way, does not matter
            if (o.getTags() != null && o.getTags().get("addr:housenumber") != null) {

                ResidentialUnit unit = new ResidentialUnit();
                unit.setStreet(o.getTags().get("addr:street"));
                unit.setHouseNumber(o.getTags().get("addr:housenumber"));
                unit.setPostalCode(o.getTags().get("addr:postcode"));
                unit.setCity(o.getTags().get("addr:city"));
                unit.setCountry(o.getTags().get("addr:country"));

                if (o.getLat() != null && o.getLon() != null) {
                    ProjCoordinate result = new ProjCoordinate();
                    wgsToOpenlayers.transform(new ProjCoordinate(o.getLon(), o.getLat()), result);
                    unit.setLon(result.x);
                    unit.setLat(result.y);
                }

                unit.setTags(o.getTags());
                unit.setNodes(o.getNodes());

                residentialMap.put(o.getId(), unit);
            }
        }

        // extract polygon for residential units with nodes data
        for (String id : residentialMap.keySet()) {

            ResidentialUnit unit = residentialMap.get(id);

            if (unit.getNodes() != null) {
                extractPolygon(nodesMap, residentialMap, unit, unit.getTags(), unit.getNodes());
            }
        }

        // extract polygon data for each relevant node
        for (OsmElement o : osmDownload.getElements()) {

            if (o.getType().equals("way") && o.getNodes() != null && o.getNodes().size() > 0 && o.getTags() != null
                    && o.getTags().get("building") != null) {

                for (String id : residentialMap.keySet()) {

                    ResidentialUnit unit = residentialMap.get(id);

                    if (unit.getPolygon() != null) continue;

                    if (o.getNodes().contains(id)) {

                        extractPolygon(nodesMap, residentialMap, unit, o.getTags(), o.getNodes());
                    }
                }
            }
        }

        return residentialMap.values();
    }

    private void extractPolygon(Map<String, OsmElement> nodesMap, Map<String, ResidentialUnit> residentialMap, ResidentialUnit unit, Map<String, String> tags, List<String> nodes) {

        String polygon = "POLYGON((";

        if (tags.get("building:levels") != null) {
            try {
                unit.setUnits(Integer.parseInt(tags.get("building:levels")));
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }
        }

        if (tags.get("roof:levels") != null) {
            try {
                unit.setUnits(unit.getUnits() + Integer.parseInt(tags.get("roof:levels")));
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }
        }

        // (x, y) (longitude, latitude)
        boolean firstNodeId = true;
        for (String nodeId : nodes) {

            OsmElement node = nodesMap.get(nodeId);
            ProjCoordinate result = new ProjCoordinate();
            if (node == null) {
                continue;
            }
            wgsToOpenlayers.transform(new ProjCoordinate(node.getLon(), node.getLat()), result);

            if (!firstNodeId) {
                polygon += ",";
            }
            polygon += result.x + " " + result.y;
            firstNodeId = false;
        }

        polygon += "))";
        unit.setPolygon(polygon);
    }
}
