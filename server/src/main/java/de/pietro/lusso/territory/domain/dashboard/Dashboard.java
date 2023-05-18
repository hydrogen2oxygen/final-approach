package de.pietro.lusso.territory.domain.dashboard;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Anonym dashboard
 */
public class Dashboard {

    private String finalApproachVersion = "";
    private UUID uuid;
    private List<TerritoryInfos> territories = new ArrayList<>();

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public List<TerritoryInfos> getTerritories() {
        return territories;
    }

    public void setTerritories(List<TerritoryInfos> territories) {
        this.territories = territories;
    }

    public String getFinalApproachVersion() {
        return finalApproachVersion;
    }

    public void setFinalApproachVersion(String finalApproachVersion) {
        this.finalApproachVersion = finalApproachVersion;
    }
}
