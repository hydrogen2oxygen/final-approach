package de.pietro.lusso.territory.domain.mapDesign;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * MapDesign uploaded to FTP, used for sorting by date
 */
public class MapDataFile {

    private String name;
    private Date uploadDate;

    public MapDataFile(String name) throws ParseException {
        this.name = name;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmSS");
        uploadDate = sdf.parse(name.replace("mapDesign_","").replace(".db",""));
    }

    public String getName() {
        return name;
    }

    public Date getUploadDate() {
        return uploadDate;
    }
}
