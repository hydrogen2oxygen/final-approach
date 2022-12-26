package de.pietro.lusso.territory.domain.dashboard;

import java.util.Date;
import java.util.UUID;

public class TerritoryInfos {

    private UUID uuid;
    private String number;
    private String name;
    private Date assignDate;
    private Date returnDate;
    private Date registerRequest;
    private Date returnRequest;

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Date getRegisterRequest() {
        return registerRequest;
    }

    public void setRegisterRequest(Date registerRequest) {
        this.registerRequest = registerRequest;
    }

    public Date getReturnRequest() {
        return returnRequest;
    }

    public void setReturnRequest(Date returnRequest) {
        this.returnRequest = returnRequest;
    }
}
