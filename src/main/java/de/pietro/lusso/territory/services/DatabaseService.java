package de.pietro.lusso.territory.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.SftpException;
import de.pietro.lusso.territory.domain.*;
import de.pietro.lusso.territory.utils.SettingsInitializer;
import org.apache.commons.io.FileUtils;
import org.dizitart.no2.Nitrite;
import org.dizitart.no2.objects.ObjectRepository;
import org.dizitart.no2.tool.Exporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.attribute.FileTime;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@DependsOn("ftpService")
public class DatabaseService {

    @Autowired
    private FtpService ftpService;

    private Nitrite db;
    private ObjectRepository<Congregation> congregationOR;
    private ObjectRepository<MapDesign> mapDesignOR;
    private ObjectRepository<Settings> settingsOR;
    private ObjectMapper objectMapper;
    private String databaseName = "territory.db";

    @PostConstruct
    public void initService() throws Exception{

        makeCopyOfDatabase();

        db = Nitrite.builder()
                .compressed()
                .filePath(databaseName)
                .openOrCreate("user", "password");

        congregationOR = db.getRepository(Congregation.class);
        mapDesignOR = db.getRepository(MapDesign.class);
        settingsOR = db.getRepository(Settings.class);
        objectMapper = new ObjectMapper();
    }

    private void makeCopyOfDatabase() {

        File dbFile = new File(databaseName);

        if (dbFile.exists() && dbFile.isFile()) {

            File backupFolder = new File("backup");

            if (!backupFolder.exists()) {
                backupFolder.mkdirs();
            }

            try {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-hh-mm-ss");
                FileUtils.copyFile(dbFile, new File("backup/" + databaseName + "." + sdf.format(Calendar.getInstance().getTime())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public Settings loadSettings() {

        if (settingsOR.find().size() == 0) {
            Settings settings = new Settings();
            settingsOR.insert(settings);
        }

        Settings settings = settingsOR.find().firstOrDefault();
        SettingsInitializer.init(settings);

        return settings;
    }

    public void saveSettings(Settings settings) {
        settingsOR.update(settings);
    }

    public Congregation loadCongregation() {

        if (congregationOR.find().size() == 0) {
            Congregation congregation = new Congregation();
            congregationOR.insert(congregation);
        }

        Congregation congregation = congregationOR.find().firstOrDefault();

        List<Territory> territoryList = congregation.getTerritoryList();

        Collections.sort(territoryList, new Comparator<Territory>() {
            @Override
            public int compare(Territory o1, Territory o2) {
                return o1.getNumber().compareTo(o2.getNumber());
            }
        });

        return enhancePreacherList(congregation);
    }

    private Congregation enhancePreacherList(Congregation congregation) {

        Map<String,Preacher> preacherMap = new HashMap<>();

        for (Preacher preacher : congregation.getPreacherList()) {
            preacher.getTerritoryListNumbers().clear();
            if (preacher.getName() == null || preacher.getName().trim().length() == 0 ) continue;
            preacherMap.put(preacher.getName(),preacher);
        }

        for (Territory territory : congregation.getTerritoryList()) {

            if (territory.getRegistryEntryList() == null || territory.getRegistryEntryList().size() == 0) continue;

            RegistryEntry lastEntry = territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() -1);

            if (preacherMap.get(lastEntry.getPreacher().getName()) == null) continue;

            preacherMap.get(lastEntry.getPreacher().getName()).getTerritoryListNumbers().add(territory.getNumber());
        }

        return congregation;
    }

    public Congregation saveCongregation(Congregation congregation) {

        Preacher preacherForHardDelete = null;

        for (Preacher preacher : congregation.getPreacherList()) {

            if (preacher.getUuid() == null) {
                preacher.setUuid(UUID.randomUUID());
            }

            if (preacher.getHarddelete()) {
                preacherForHardDelete = preacher;
                break;
            }
        }

        // repair stuff
        for (Territory territory : congregation.getTerritoryList()) {
            if (territory.getUuid() == null) {
                territory.setUuid(UUID.randomUUID());
            }
        }

        if (preacherForHardDelete != null) {
            congregation.getPreacherList().remove(preacherForHardDelete);
        }

        Collections.sort(congregation.getPreacherList(), new Comparator<Preacher>() {
            @Override
            public int compare(Preacher o1, Preacher o2) {
                return o1.getName().compareTo(o2.getName());
            }
        });

        congregationOR.update(congregation);
        return enhancePreacherList(loadCongregation());
    }

    public MapDesign loadMapDesign() {

        if (mapDesignOR.find().size() == 0) {
            MapDesign mapDesign = new MapDesign();
            mapDesign.setUuid(UUID.randomUUID());
            mapDesignOR.insert(mapDesign);
        }

        MapDesign mapDesign = mapDesignOR.find().firstOrDefault();

        List<TerritoryMap> territoryList = mapDesign.getTerritoryMapList();

        Collections.sort(territoryList, new Comparator<TerritoryMap>() {
            @Override
            public int compare(TerritoryMap o1, TerritoryMap o2) {

                return o1.getTerritoryNumber().compareTo(o2.getTerritoryNumber());
            }
        });

        return mapDesign;
    }

    public MapDesign saveMapDesign(MapDesign mapDesign) {

        // Clean Map from territories without feature data
        List<TerritoryMap> territoryMapsToRemove = new ArrayList<>();

        for (TerritoryMap t : mapDesign.getTerritoryMapList()) {
            if (!t.getSimpleFeatureData().startsWith("POLYGON")) {
                territoryMapsToRemove.add(t);
            }
        }

        mapDesign.getTerritoryMapList().removeAll(territoryMapsToRemove);

        mapDesignOR.update(mapDesign);
        return loadMapDesign();
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public void exportDatabase() {
        Exporter exporter = Exporter.of(db);
        File schemaFile = new File("export/" + Calendar.getInstance().getTimeInMillis() + ".db");
        exporter.exportTo(schemaFile);
    }

    public void setActiveTerritory(String number, String name) {

        Congregation congregation = loadCongregation();
        Territory territory = getTerritoryByNumber(number);

        if (territory != null) {
            setTerritoryMapActive(number);
            return;
        }

        territory = new Territory();
        territory.setDate(Calendar.getInstance().getTime());
        territory.setNumber(number);
        territory.setName(name);
        territory.setUuid(UUID.randomUUID());

        // First registry entry is for the congregation
        RegistryEntry registryEntry = new RegistryEntry();
        registryEntry.setTerritoryNumber(number);
        registryEntry.setAssignDate(Calendar.getInstance().getTime());
        registryEntry.setPreacher(new Preacher("Congregazione"));
        territory.getRegistryEntryList().add(registryEntry);

        congregation.getTerritoryList().add(territory);
        saveCongregation(congregation);
    }

    private void setTerritoryMapActive(String number) {

        MapDesign mapDesign = loadMapDesign();

        for (TerritoryMap territoryMap : mapDesign.getTerritoryMapList()) {
            if (territoryMap.getTerritoryNumber().equals(number)) {
                territoryMap.setDraft(false);
            }
        }

        saveMapDesign(mapDesign);
    }

    private Territory getTerritoryByNumber(final Congregation congregation, String number) {

        for (Territory territory : congregation.getTerritoryList()) {
            if (territory.getNumber().equals(number)) return territory;
        }

        return null;
    }

    private Territory getTerritoryByNumber(String number) {

        Congregation congregation = loadCongregation();

        for (Territory territory : congregation.getTerritoryList()) {
            if (territory.getNumber() == number) return territory;
        }

        return null;
    }

    public TerritoryMap getTerritoryMapByNumber(String number) {

        MapDesign mapDesign = loadMapDesign();

        for (TerritoryMap territoryMap : mapDesign.getTerritoryMapList()) {
            if (territoryMap.getTerritoryNumber().equals(number)) return territoryMap;
        }

        return null;
    }

    private List<String> getTerritoryNumbers(Congregation congregation) {

        List<String> territoryNumbers = new ArrayList<>();

        for (Territory territory : congregation.getTerritoryList()) {
            territoryNumbers.add(territory.getNumber());
        }

        return territoryNumbers;
    }

    /**
     * These are the necessary steps:
     * <ul>
     *     <li>Load the territory and the preacher assigned to it</li>
     *     <li>Set the old JSON to active = false (with the returnDate = TODAY and maybe some text inside the note)</li>
     *     <li>Create a new JSON (inside a local folder)</li>
     *     <li>Link the JSON to the other territories of the preacher and relink the other JSONs to this one (n to n)</li>
     *     <li>Upload the changes (including the old JSON with new status) via FTP to the online service</li>
     *     <li>Check the local folder for JSONs older than two years and delete them (inside the local folder and also on the remote server)</li>
     *     <li>Save details in Congregation repo</li>
     * </ul>
     * <p>If something goes wrong with the upload, the local folder has a copy of all data.</p>
     * @param number
     */
    public void exportTerritoryData(String number, boolean onlyRepair) throws IOException, SftpException, JSchException {
        // Load the territory and the preacher assigned to it
        Map<String, UUID> linkedTerritories = new HashMap<>();
        Congregation congregation = loadCongregation();
        Territory territory = getTerritoryByNumber(congregation,number);
        TerritoryMap territoryMap = getTerritoryMapByNumber(number);

        if (territory == null) {
            return;
        }

        if (territory.getRegistryEntryList() == null || territory.getRegistryEntryList().size() == 0) {
            return;
        }

        if (territoryMap == null || territory.isArchive()) {
            return;
        }

        RegistryEntry registryEntry = territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() - 1);

        if (territory.getUuid() == null) {
            territory.setUuid(UUID.randomUUID());
        }

        File jsonFile = new File("src/main/territoryMap/src/assets/data/" + territory.getUuid().toString() + ".json");

        // Set the old JSON to inactive (with the returnDate = TODAY and maybe some text inside the note)
        if (jsonFile.exists() && !onlyRepair) {
            // deactivate old territory
            TerritoryData territoryData = objectMapper.readValue(jsonFile, TerritoryData.class);
            territoryData.setActive(false);
            territoryData.setReturnDate(Calendar.getInstance().getTime());
            objectMapper.writeValue(jsonFile, territoryData);
            ftpService.upload(jsonFile);
        }

        // Create a new JSON (inside a local folder)
        TerritoryData territoryData = new TerritoryData();
        territoryData.setActive(true);
        territoryData.setName(territory.getName());
        territoryData.setNumber(String.valueOf(territory.getNumber()));
        territoryData.setSimpleFeatureData(territoryMap.getSimpleFeatureData());
        territoryData.setStreetList(territoryMap.getStreetList());
        territoryData.setAssignDate(registryEntry.getAssignDate());
        territoryData.setReturnDate(null);

        if (!onlyRepair) {
            // set a new UUID for the territory
            territory.setUuid(UUID.randomUUID());

            for (Territory t : congregation.getTerritoryList()) {
                if (t.getNumber() == territory.getNumber()) {
                    t.setUuid(territory.getUuid());
                    break;
                }
            }
        }

        saveCongregation(congregation);

        // TODO Link the JSON to the other territories of the preacher and relink the other JSONs to this one (n to n)

        // Upload the changes (including the old JSON with new status) via FTP to the online service
        jsonFile = new File("src/main/territoryMap/src/assets/data/" + territory.getUuid().toString() + ".json");
        objectMapper.writeValue(jsonFile, territoryData);

        // here you can test it locally
        // ...
        // Upload via FTP
        ftpService.upload(jsonFile);

        // Check the local folder for JSONs older than two years and delete them (inside the local folder and also on the remote server)
        File dataFolder = new File("src/main/territoryMap/src/assets/data/");

        Calendar twoYearsAgo = Calendar.getInstance();
        twoYearsAgo.add(Calendar.YEAR, -2);

        for (File file : dataFolder.listFiles()) {
            if (file.isFile() && file.getName().endsWith("json")) {
                FileTime creationTime = (FileTime) Files.getAttribute(file.toPath(), "creationTime");
                if (creationTime.compareTo(FileTime.fromMillis(twoYearsAgo.getTimeInMillis())) < 0) {
                    // TODO delete it also on FTP
                    file.delete();
                }
            }
        }
    }

    public void exportTerritoryData(String number) throws IOException, SftpException, JSchException {
        exportTerritoryData(number,false);
    }

    public void exportTerritoryData() throws IOException, JSchException, SftpException {

        MapDesign mapDesign = loadMapDesign();

        for (TerritoryMap territoryMap : mapDesign.getTerritoryMapList()) {
            exportTerritoryData(territoryMap.getTerritoryNumber());
        }
    }

    private Preacher loadPreacher(Congregation congregation, String name) {
        for (Preacher preacher : congregation.getPreacherList()) {
            if (name.equals(preacher.getName())) return  preacher;
        }
        return  null;
    }

    public void exportAllTerritoryData() throws IOException, SftpException, JSchException {

        TerritoryData territoryData = new TerritoryData();
        territoryData.setName("LE");
        MapDesign mapDesign = loadMapDesign();

        for (TerritoryMap territoryMap : mapDesign.getTerritoryMapList()) {
            TerritoryData subMap = new TerritoryData();
            subMap.setNumber(territoryMap.getTerritoryNumber().toString());
            subMap.setName(territoryMap.getTerritoryName());
            subMap.setSimpleFeatureData(territoryMap.getSimpleFeatureData());
            territoryData.getTerritories().add(subMap);
        }

        File jsonFile = new File("src/main/territoryMap/src/assets/data/le.json");
        objectMapper.writeValue(jsonFile, territoryData);
        ftpService.upload(jsonFile);
    }

    public void exportGroupTerritoryData(String groupLeaderName) throws IOException, SftpException, JSchException {

        Congregation congregation = loadCongregation();
        Preacher groupLeader = getPreacherByName(groupLeaderName);

        TerritoryData territoryData = new TerritoryData();
        territoryData.setName("LE");
        MapDesign mapDesign = loadMapDesign();

        for (TerritoryMap territoryMap : mapDesign.getTerritoryMapList()) {
            TerritoryData subMap = new TerritoryData();
            subMap.setNumber(territoryMap.getTerritoryNumber().toString());
            subMap.setName(territoryMap.getTerritoryName());
            subMap.setSimpleFeatureData(territoryMap.getSimpleFeatureData());
            territoryData.getTerritories().add(subMap);
        }

        File jsonFile = new File("src/main/territoryMap/src/assets/data/" + groupLeader.getUuid().toString() + ".json");
        objectMapper.writeValue(jsonFile, territoryData);
        ftpService.upload(jsonFile);
    }

    private Preacher getPreacherByName(String name) {

        Congregation congregation = loadCongregation();

        for (Preacher preacher : congregation.getPreacherList()) {
            if (name.equals(preacher.getName())) {
                return preacher;
            }
        }

        return null;
    }

    public List<String> search(String text) {

        text = text.toLowerCase();

        Congregation congregation = loadCongregation();
        MapDesign mapDesign = loadMapDesign();

        List<String> result = new ArrayList<>();

        for (Territory territory : congregation.getTerritoryList()) {

            String data = territory.getNumber() + " " + territory.getName();

            if (data.toLowerCase().contains(text)) {
                result.add(data);
            }
        }

        for (Preacher preacher : congregation.getPreacherList()) {

            if (preacher.getName().toLowerCase().contains(text)) {

                String preacherData = preacher.getName();

                if (preacher.getTerritoryListNumbers().size() == 0) {
                    result.add(preacherData);
                    continue;
                }

                StringBuilder territoryList = new StringBuilder();

                for (String number : preacher.getTerritoryListNumbers()) {
                    if (territoryList.length() > 0) {
                        territoryList.append(",");
                    }
                    territoryList.append(number);
                }

                result.add(preacherData + " (" + territoryList.toString() + ")");
            }
        }

        for (TerritoryMap territoryMap : mapDesign.getTerritoryMapList()) {

            for (OsmStreet street : territoryMap.getStreetList()) {

                String streetName = street.getStreetName() + " ";

                for (String houseNumber : street.getHouseNumbers()) {
                    String streetComplete = streetName + houseNumber;

                    if (streetComplete.toLowerCase().contains(text)) {
                        result.add(streetComplete + " [" + territoryMap.getTerritoryNumber() + " " + territoryMap.getTerritoryName() + "]");
                    }
                }
            }
        }

        return result;
    }

    public void importTerritoriesFromText(String filePath) throws IOException {

        Congregation congregation = loadCongregation();
        File file = new File(filePath);

        List<String> lines = FileUtils.readLines(file, "UTF-8");

        for (String line : lines) {

            if (line == null || line.trim().length() == 0) continue;

            String parts[] = line.split(" ");

            if (parts.length < 2) continue;

            String number = parts[0];
            String name = "";

            for (int i = 1; i< parts.length; i++) {
                name = name + " " + parts[i];
            }

            Territory territory = new Territory();
            territory.setNumber(number);
            territory.setName(name.trim());
            // First entry assign to congregation
            RegistryEntry registryEntry = new RegistryEntry();
            registryEntry.setAssignDate(Calendar.getInstance().getTime());
            Preacher preacher = new Preacher();
            preacher.setName("Congregazione");
            registryEntry.setPreacher(preacher);
            territory.getRegistryEntryList().add(registryEntry);

            congregation.getTerritoryList().add(territory);
        }

        saveCongregation(congregation);
    }
}
