/**
 * 
 */
package de.pietro.lusso.territory.geometry;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.PrecisionModel;
import com.vividsolutions.jts.io.WKTReader;
import org.geotools.geometry.jts.JTS;
import org.geotools.referencing.CRS;
import org.opengis.referencing.crs.CoordinateReferenceSystem;
import org.opengis.referencing.operation.MathTransform;

/**
 * Whatever you need for geometry operation, you will find it here inside the
 * GeometryUtility
 * 
 * @author Peter
 *
 */
public class GeometryUtility {

	/**
	 * Retrieves a geometry object from the string representation
	 * 
	 * @param simpleFeatureString
	 * @param SRID
	 * @return Geometry
	 * @throws Exception
	 */
	public static Geometry getGeometryFromString(String simpleFeatureString, int SRID) throws Exception {

		GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), SRID);
		WKTReader wktReader = new WKTReader(geometryFactory);
		Geometry geometry = wktReader.read(simpleFeatureString);

		return geometry;
	}

	/**
	 * Retrieves a geometry object from a 4326 encoded string representation
	 * 
	 * @param simpleFeatureString
	 * @return Geometry
	 * @throws Exception
	 */
	public static Geometry getGeometryFromString4326(String simpleFeatureString) throws Exception {

		return getGeometryFromString(simpleFeatureString, 4326);
	}

	/**
	 * Gets the string representation of that geometry object
	 * 
	 * @param geometry
	 * @return
	 */
	public static String getStringFromGeometry(Geometry geometry) {

		return geometry.toText();
	}

	/**
	 * Transforms a geometry object from one SRID into another projection form
	 * 
	 * @param sourceGeometry
	 * @param sourceSRID
	 * @param targetSRID
	 * @return Geometry
	 * @throws Exception
	 */
	public static Geometry transformGeometry(Geometry sourceGeometry, int sourceSRID, int targetSRID) throws Exception {

		CoordinateReferenceSystem sourceCRS = CRS.decode("EPSG:" + sourceSRID);
		CoordinateReferenceSystem targetCRS = CRS.decode("EPSG:" + targetSRID);

		MathTransform transform = CRS.findMathTransform(sourceCRS, targetCRS, true);

		Geometry converted = JTS.transform(sourceGeometry, transform);

		return converted;
	}

	/**
	 * Transforms a string into a geometry object from one SRID into another
	 * projection form
	 * 
	 * @param sourceGeometry
	 * @param sourceSRID
	 * @param targetSRID
	 * @return Geometry
	 * @throws Exception
	 */
	public static Geometry transformGeometryFromString(String sourceGeometry, int sourceSRID, int targetSRID)
	        throws Exception {

		return transformGeometry(getGeometryFromString(sourceGeometry, sourceSRID), sourceSRID, targetSRID);
	}

	public static String cleanWKTPolygon(String polygon) {
		return polygon.replaceAll(" \\(\\(", "((").replaceAll(", ", ",");
	}
}
