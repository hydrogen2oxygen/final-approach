package de.pietro.lusso.territory.services;

import de.micromata.opengis.kml.v_2_2_0.*;
import de.pietro.lusso.territory.domain.MapDesign;
import de.pietro.lusso.territory.domain.TerritoryMap;
import de.pietro.lusso.territory.geometry.GeometryUtility;
import de.pietro.lusso.territory.geometry.IProjectionsConstants;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class KmlService {

    public static void main(String arg[]) throws Exception {
        KmlService kmlService = new KmlService();
        kmlService.exportMap(new File("target/test.kml"), "1000 Echterdingen","POLYGON((1021261.1429116816 6222666.22770077,1021546.4014522693 6222483.117443947,1021538.8349127312 6222199.372211266,1021057.6029981056 6222262.931143387,1021072.5756564257 6222459.542059218,1021069.7094613666 6222527.003373268,1021139.3346752867 6222552.030913943,1021202.4347449084 6222594.2964949,1021234.5440047069 6222620.58378534,1021261.1429116816 6222666.22770077))");
    }

    public void exportMap(File file, String name, String simpleFeature) throws Exception {

        final Kml kml = new Kml();
        Document doc = kml.createAndSetDocument().withName(name).withOpen(true);

        // create a style
        Style style = getStyle(doc, "territoryStyle", "ff5b18c2", "125b18c2");
        Style styleHighlight = getStyle(doc, "territoryStyleHighlight", "ff2dc0fb", "122dc0fb");
        StyleMap styleMap = doc.createAndAddStyleMap();
        Pair pair = styleMap.createAndAddPair();
        pair.setKey(StyleState.NORMAL);
        pair.setStyleUrl("#" + style.getId());
        Pair pairHighlight = styleMap.createAndAddPair();
        pairHighlight.setKey(StyleState.HIGHLIGHT);
        pairHighlight.setStyleUrl("#" + styleHighlight.getId());

        // create a Folder
        Folder folder = doc.createAndAddFolder();
        folder.withName(name).withOpen(true);

        Placemark placemark = folder.createAndAddPlacemark();
        placemark.setName(name);
        placemark.setStyleUrl("#" + style.getId());
        Polygon polygon = placemark.createAndSetPolygon();
        Boundary boundary = polygon.createAndSetOuterBoundaryIs();
        LinearRing linearRing = boundary.createAndSetLinearRing();
        linearRing.setTessellate(true);
        com.vividsolutions.jts.geom.Geometry geometry = GeometryUtility.getGeometryFromString(simpleFeature, IProjectionsConstants.OPENLAYERS_WEB_MERCATOR_SRID);
        geometry = GeometryUtility.transformGeometry(geometry, IProjectionsConstants.OPENLAYERS_WEB_MERCATOR_SRID, IProjectionsConstants.WGS_84_SRID);

        for (com.vividsolutions.jts.geom.Coordinate coordinate : geometry.getCoordinates()) {
            linearRing.addToCoordinates(coordinate.y + "," +coordinate.x + ",0");
        }

        kml.marshal(file);

        String kmlContent = FileUtils.readFileToString(file, "UTF-8");
        kmlContent = kmlContent.replaceAll("ns2:","").replace("<kml xmlns:ns2=\"http://www.opengis.net/kml/2.2\" xmlns:ns3=\"http://www.w3.org/2005/Atom\" xmlns:ns4=\"urn:oasis:names:tc:ciq:xsdschema:xAL:2.0\" xmlns:ns5=\"http://www.google.com/kml/ext/2.2\">", "<kml>");
        FileUtils.write(file, kmlContent, "UTF-8");
    }

    private Style getStyle(Document doc, String id, String lineColor, String polyColor) {
        Style style = doc.createAndAddStyle();
        style.setId(id);
        LineStyle lineStyle = style.createAndSetLineStyle();
        lineStyle.setColor(lineColor);
        lineStyle.setWidth(3.757);
        PolyStyle polyStyle = style.createAndSetPolyStyle();
        polyStyle.setColor(polyColor);
        polyStyle.setFill(true);
        BalloonStyle balloonStyle = style.createAndSetBalloonStyle();
        balloonStyle.setText("<![CDATA[<h3>$[name]</h3>]]>");
        return style;
    }

    public void exportMapDesign(MapDesign mapDesign) throws Exception {

        for (TerritoryMap territoryMap : mapDesign.getTerritoryMapList()) {
            exportMap(new File("export/" + territoryMap.getTerritoryNumber() + ".kml"),
                    territoryMap.getTerritoryNumber() + " " + territoryMap.getTerritoryName(),
                    territoryMap.getSimpleFeatureData());
        }
    }
}
