package de.pietro.lusso.territory.domain.osm;

import java.util.ArrayList;
import java.util.List;

public class OsmStreet {

    private List<String[]> coordinates = new ArrayList<>();
    private List<String> houseNumbers = new ArrayList<>();
    private String streetName;

    public List<String[]> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<String[]> coordinates) {
        this.coordinates = coordinates;
    }

    public List<String> getHouseNumbers() {
        return houseNumbers;
    }

    public void setHouseNumbers(List<String> houseNumbers) {
        this.houseNumbers = houseNumbers;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    @Override
    public String toString() {
        return "OsmStreet{" +
                "coordinates=" + coordinates +
                ", houseNumbers=" + houseNumbers +
                ", streetName='" + streetName + '\'' +
                '}';
    }
}
