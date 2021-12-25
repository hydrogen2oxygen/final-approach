package de.pietro.lusso.territory.domain;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class RegistryEntry implements Serializable {

    private String territoryNumber;
    private Preacher preacher;
    private Date assignDate;
    private Date returnDate;

    public String getTerritoryNumber() {
        return territoryNumber;
    }

    public void setTerritoryNumber(String territoryNumber) {
        this.territoryNumber = territoryNumber;
    }

    public Preacher getPreacher() {
        return preacher;
    }

    public void setPreacher(Preacher preacher) {
        this.preacher = preacher;
    }

    public Date getAssignDate() {
        return assignDate;
    }

    public void setAssignDate(Date assignDate) {
        this.assignDate = assignDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    @Override
    public String toString() {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        String assignDateFormatted = "";
        String returnDateFormatted = "";

        if (assignDate != null) assignDateFormatted = sdf.format(assignDate);
        if (returnDate != null) returnDateFormatted = sdf.format(returnDate);

        return "RegistryEntry{" +
                "territoryNumber=" + territoryNumber +
                ", preacher=" + preacher +
                ", assignDate=" + assignDateFormatted +
                ", returnDate=" + returnDateFormatted +
                '}';
    }
}
