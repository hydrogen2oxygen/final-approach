package de.pietro.lusso.territory.services;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import de.pietro.lusso.territory.domain.OsmStreet;
import de.pietro.lusso.territory.domain.TerritoryMap;
import de.pietro.lusso.territory.geometry.GeometryUtility;
import de.pietro.lusso.territory.geometry.IProjectionsConstants;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.bind.annotation.adapters.HexBinaryAdapter;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.StringWriter;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OsmService {

    public static void main(String args[]) throws Exception {

        TerritoryMap territoryMap = new TerritoryMap();
        territoryMap.setSimpleFeatureData("POLYGON((1021261.1429116816 6222666.22770077,1021546.4014522693 6222483.117443947,1021538.8349127312 6222199.372211266,1021057.6029981056 6222262.931143387,1021072.5756564257 6222459.542059218,1021069.7094613666 6222527.003373268,1021139.3346752867 6222552.030913943,1021202.4347449084 6222594.2964949,1021234.5440047069 6222620.58378534,1021261.1429116816 6222666.22770077))");

        OsmService osmService = new OsmService();
        osmService.extractStreetsForTerritory(territoryMap);
    }

    public void extractStreetsForTerritory(final TerritoryMap territoryMap) throws Exception {

        File cacheFolder = new File("cache");

        if (!cacheFolder.exists()) {
            cacheFolder.mkdirs();
        }

        Geometry geometry = GeometryUtility.getGeometryFromString(territoryMap.getSimpleFeatureData(), IProjectionsConstants.OPENLAYERS_WEB_MERCATOR_SRID);
        geometry = GeometryUtility.transformGeometry(geometry, IProjectionsConstants.OPENLAYERS_WEB_MERCATOR_SRID, IProjectionsConstants.WGS_84_SRID);

        Map<String, OsmStreet> osmStreetMap = new HashMap<>();
        // NODE ID = REF, COORDINATE PAIRS
        Map<String,Node> nodes = new HashMap<>();

        DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
        Coordinate [] bounderies = geometry.getEnvelope().getCoordinates();
        String url = "https://www.openstreetmap.org/api/0.6/map?bbox=" + bounderies[0].y + "," + bounderies[0].x + "," + bounderies[2].y + "," + bounderies[2].x;

        MessageDigest md5 = MessageDigest.getInstance("MD5");
        String hex = (new HexBinaryAdapter()).marshal(md5.digest(url.getBytes()));
        File cachedOsmData = new File("cache/OSM_" + hex + ".xml");

        if (!cachedOsmData.exists()) {
            Document doc = dBuilder.parse(url);
            String xml = getStringFromDocument(doc);
            FileUtils.write(cachedOsmData, xml, "UTF-8");
        }

        Document doc = dBuilder.parse(cachedOsmData);
        doc.getDocumentElement().normalize();

        NodeList nodesList = doc.getElementsByTagName("node");

        for (int i=0; i<nodesList.getLength(); i++) {
            Node coordinateNode = nodesList.item(i);
            NamedNodeMap attributes = coordinateNode.getAttributes();
            String id = attributes.getNamedItem("id").getNodeValue();

            nodes.put(id,coordinateNode);
        }

        NodeList wayList = doc.getElementsByTagName("way");

        for (int i=0; i<wayList.getLength(); i++) {

            Node way = wayList.item(i);
            List<String> refs = new ArrayList<>();
            OsmStreet osmStreet = null;
            String houseNumber = null;

            for (int y=0; y< way.getChildNodes().getLength(); y++) {

                Node tag = way.getChildNodes().item(y);

                if (!tag.hasAttributes()) continue;
                if (tag.getAttributes().getLength() < 1) continue;

                if(tag.getAttributes().getNamedItem("ref") != null) {
                    refs.add(tag.getAttributes().getNamedItem("ref").getNodeValue());
                }

                if(tag.getAttributes().getNamedItem("k") != null &&
                        "addr:housenumber".equals(tag.getAttributes().getNamedItem("k").getNodeValue())) {
                    houseNumber = tag.getAttributes().getNamedItem("v").getNodeValue();
                }

                if(tag.getAttributes().getNamedItem("k") != null &&
                        "addr:street".equals(tag.getAttributes().getNamedItem("k").getNodeValue())) {

                    String street = tag.getAttributes().getNamedItem("v").getNodeValue();
                    osmStreet = osmStreetMap.get(street);

                    if (osmStreet == null) {
                        osmStreet = new OsmStreet();
                        osmStreet.setStreetName(street);
                        osmStreetMap.put(street,osmStreet);
                    }

                    if (houseNumber != null) {
                        osmStreet.getHouseNumbers().add(houseNumber);
                    }
                }
            }

            if (osmStreet == null) continue;

            for (String ref : refs) {

                Node node = nodes.get(ref);

                if (node == null)  continue;

                NamedNodeMap attributes = node.getAttributes();
                String lat = attributes.getNamedItem("lat").getNodeValue();
                String lon = attributes.getNamedItem("lon").getNodeValue();
                osmStreet.getCoordinates().add(new String[]{lat,lon});
            }
        }

        List<OsmStreet> streetsContainedByPolygon = new ArrayList<>();

        for (OsmStreet street : osmStreetMap.values()) {
            for (String[] coordinates : street.getCoordinates()) {
                Geometry point = GeometryUtility.getGeometryFromString("POINT (" + coordinates[0] + " " + coordinates[1] + ")", IProjectionsConstants.WGS_84_SRID);
                if (geometry.contains(point)) {
                    streetsContainedByPolygon.add(street);
                    System.out.println(street.getStreetName());
                    break;
                }
            }
        }

        territoryMap.setStreetList(streetsContainedByPolygon);
    }

    public String getStringFromDocument(Document doc)
    {
        try
        {
            DOMSource domSource = new DOMSource(doc);
            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);
            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer transformer = tf.newTransformer();
            transformer.transform(domSource, result);
            return writer.toString();
        }
        catch(TransformerException ex)
        {
            ex.printStackTrace();
            return null;
        }
    }
}
