package de.pietro.lusso.territory.services;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.pietro.lusso.territory.domain.*;
import de.pietro.lusso.territory.domain.dashboard.Dashboard;
import de.pietro.lusso.territory.domain.dashboard.TerritoryInfos;
import de.pietro.lusso.territory.domain.mapDesign.MapDesign;
import de.pietro.lusso.territory.domain.mapDesign.TerritoryMap;
import de.pietro.lusso.territory.domain.osm.OsmStreet;
import de.pietro.lusso.territory.services.mapDesign.MapDesignService;
import de.pietro.lusso.territory.utils.EncryptionTool;
import de.pietro.lusso.territory.utils.SettingsInitializer;
import de.pietro.lusso.territory.utils.ZipUtility;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.dizitart.no2.Nitrite;
import org.dizitart.no2.exceptions.NitriteIOException;
import org.dizitart.no2.objects.ObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.attribute.FileTime;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;

@Service
@DependsOn("ftpService")
public class DatabaseService {

    private static final Logger logger = LogManager.getLogger(DatabaseService.class);
    private static final String TERRITORY_JSON_DATA = "data/";

    final File congregationFolder = new File("data/congregation");
    final File congregationFile = new File("data/congregation/congregation.json");
    public final File mapDesignFile = new File("data/congregation/mapDesign.json");
    final File settingsFile = new File("data/congregation/settings.json");

    @Autowired
    private FtpService ftpService;
    @Autowired
    private MapDesignService mapDesignService;
    private ObjectMapper objectMapper;
    private EncryptionTool encryptionTool;
    private String databaseName = "territory.db";
    public Version version = new Version();
    private boolean updated = false;
    public boolean uploading = false;
    private boolean downloading = false;

    @PostConstruct
    public void initService() throws Exception {

        System.out.println(Charset.defaultCharset());

        objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(JsonParser.Feature.AUTO_CLOSE_SOURCE, true);

        congregationFolder.mkdirs();
        new File("data/congregation/").mkdirs();
        encryptionTool = new EncryptionTool();

        openDatabase(databaseName);
        makeCopyOfDatabase();
        databaseCorrection001_translateCongregationName();
    }

    private void openDatabase(String databaseName) throws IOException {

        if (congregationFile.exists()) return;

        Nitrite db = Nitrite.builder()
                .filePath(databaseName)
                .autoCommitBufferSize(1)
                .openOrCreate("user", "password");

        ObjectRepository<Congregation> congregationOR = db.getRepository(Congregation.class);
        ObjectRepository<MapDesign> mapDesignOR = db.getRepository(MapDesign.class);
        ObjectRepository<Settings> settingsOR = db.getRepository(Settings.class);
        objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        // Transfering data from NitriteDB into plain JSON
        if (!congregationFile.exists() && congregationOR.find().size() > 0) {
            Congregation congregation = congregationOR.find().firstOrDefault();
            objectMapper.writeValue(congregationFile, congregation);
        }

        if (!mapDesignFile.exists() && mapDesignOR.find().size() > 0) {
            MapDesign mapDesign = mapDesignOR.find().firstOrDefault();
            objectMapper.writeValue(mapDesignFile, mapDesign);
        }

        if (!settingsFile.exists() && settingsOR.find().size() > 0) {
            Settings settings = settingsOR.find().firstOrDefault();
            objectMapper.writeValue(settingsFile, settings);
        }

        db.close();
    }

    private void databaseCorrection001_translateCongregationName() {
        try {
            Congregation congregation = loadCongregation();
            resetTerritoryList(congregation);

            for (Territory territory : congregation.getTerritoryList()) {
                for (RegistryEntry registryEntry : territory.getRegistryEntryList()) {
                    if ("Congregazione".equals(registryEntry.getPreacher().getName())) {
                        registryEntry.getPreacher().setName(Congregation.CONGREGATION);
                    }
                }
            }

            for (Preacher preacher : congregation.getPreacherList()) {
                if ("Congregazione".equals(preacher.getName())) {
                    preacher.setName(Congregation.CONGREGATION);
                }
            }

            saveCongregation(congregation);
        } catch (Exception e) {
            logger.error(e);
        }
    }

    public void makeCopyOfDatabase() {

        if (congregationFile.exists()) {

            File backupFolder = new File("backup");

            if (!backupFolder.exists()) {
                backupFolder.mkdirs();
            }

            try {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-hh-mm-ss");
                ZipUtility.zipBackup("backup/congregation_" + sdf.format(Calendar.getInstance().getTime()) + ".zip", new File[]{congregationFile, mapDesignFile, settingsFile});
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }



    public Settings loadSettings() throws IOException {

        Settings settings = null;

        if (settingsFile.exists()) {
            settings = objectMapper.readValue(settingsFile, Settings.class);
        } else {
            settings = new Settings();
            objectMapper.writeValue(settingsFile, settings);
        }

        SettingsInitializer.init(settings);
        return settings;
    }

    public void saveSettings(Settings settings) throws IOException {
        objectMapper.writeValue(settingsFile, settings);
        ftpService.init();
    }

    public Congregation loadCongregation() throws IOException {

        Congregation congregation = null;

        if (congregationFile.exists()) {
            congregation = objectMapper.readValue(congregationFile, Congregation.class);
        } else {
            congregation = new Congregation();
        }

        resetTerritoryList(congregation);

        version.setCounterTerritories(congregation.getTerritoryList().size());
        version.setCounterPreachers(congregation.getPreacherList().size());

        enhanceCongregationData(congregation);
        splitTerritories(congregation);

        return congregation;
    }

    private void splitTerritories(Congregation congregation) {

        List<Territory> toBeRemoved = new ArrayList<>();

        Calendar old8Cal = Calendar.getInstance();
        old8Cal.add(Calendar.MONTH, -8);

        Calendar old4Cal = Calendar.getInstance();
        old4Cal.add(Calendar.MONTH, -4);

        for (Territory territory : congregation.getTerritoryList()) {

            int registrySize = territory.getRegistryEntryList().size();

            if (registrySize == 0) {
                congregation.getTerritoriesToBeAssigned().add(territory);
                toBeRemoved.add(territory);
                continue;
            }

            if (territory.isNoContacts() && !territory.isArchive()) {
                congregation.getTerritoriesNoContacts().add(territory);
                toBeRemoved.add(territory);
                continue;
            }

            if (territory.isArchive()) {
                congregation.getTerritoriesArchived().add(territory);
                toBeRemoved.add(territory);
                continue;
            }

            // set last assigned date from registry
            setLastAssignedDate(territory);

            if (territory.getRegistryEntryList().get(registrySize - 1).getPreacher().getName().equals(Congregation.CONGREGATION)) {
                congregation.getTerritoriesToBeAssigned().add(territory);
                toBeRemoved.add(territory);
                continue;
            }

            if (territory.getDate().before(old8Cal.getTime())) {
                congregation.getTerritoriesOlder8Months().add(territory);
                toBeRemoved.add(territory);
                continue;
            }

            if (territory.getDate().before(old4Cal.getTime())) {
                congregation.getTerritoriesOlder4Months().add(territory);
                toBeRemoved.add(territory);
                continue;
            }

            congregation.getTerritoriesAssigned().add(territory);
            toBeRemoved.add(territory);
        }

        sortTerritoriesByDateAsc(congregation.getTerritoriesToBeAssigned());
        congregation.getTerritoryList().removeAll(toBeRemoved);
    }

    public void resetTerritoryList(Congregation congregation) {
        congregation.getTerritoryList().addAll(congregation.getTerritoriesArchived());
        congregation.getTerritoryList().addAll(congregation.getTerritoriesAssigned());
        congregation.getTerritoryList().addAll(congregation.getTerritoriesToBeAssigned());
        congregation.getTerritoryList().addAll(congregation.getTerritoriesNoContacts());
        congregation.getTerritoryList().addAll(congregation.getTerritoriesOlder4Months());
        congregation.getTerritoryList().addAll(congregation.getTerritoriesOlder8Months());

        congregation.getTerritoriesArchived().clear();
        congregation.getTerritoriesAssigned().clear();
        congregation.getTerritoriesToBeAssigned().clear();
        congregation.getTerritoriesNoContacts().clear();
        congregation.getTerritoriesOlder4Months().clear();
        congregation.getTerritoriesOlder8Months().clear();
    }

    private void sortTerritoriesByDateAsc(List<Territory> territories) {
        Collections.sort(territories, new Comparator<Territory>() {
            @Override
            public int compare(Territory o1, Territory o2) {
                return o1.getDate().compareTo(o2.getDate());
            }
        });
    }

    private void setLastAssignedDate(final Territory territory) {
        int registrySize = territory.getRegistryEntryList().size();
        if (registrySize == 0) return;

        // set the last assignment, but not the last registration
        AtomicReference<Date> date = new AtomicReference<>();
        territory.getRegistryEntryList().forEach(registryEntry -> {
            if (!registryEntry.getRegistration()) {
                date.set(registryEntry.getAssignDate());
            }
        });
                //territory.getRegistryEntryList().get(registrySize - 1).getAssignDate();
        territory.setDate(date.get());
    }

    private Congregation enhanceCongregationData(Congregation congregation) throws IOException {

        Map<String, Preacher> preacherMap = new HashMap<>();

        boolean congregationExist = false;

        for (Preacher preacher : congregation.getPreacherList()) {

            if (Congregation.CONGREGATION.equals(preacher.getName())) {
                congregationExist = true;
            }

            preacher.getTerritoryListNumbers().clear();
            if (preacher.getName() == null || preacher.getName().trim().length() == 0) continue;
            preacherMap.put(preacher.getName(), preacher);
        }

        if (!congregationExist) {
            Preacher congregationPool = new Preacher();
            congregationPool.setName(Congregation.CONGREGATION);
            congregationPool.setUuid(UUID.randomUUID());
            congregation.getPreacherList().add(congregationPool);
            preacherMap.put(congregationPool.getName(), congregationPool);
        }

        MapDesign mapDesign = loadMapDesign();
        Set<String> mapsActive = new HashSet<>();
        Settings settings = loadSettings();

        for (TerritoryMap territoryMap : mapDesign.getTerritoryMapList()) {
            if (!territoryMap.isDraft()) {
                mapsActive.add(territoryMap.getTerritoryNumber());
            }
        }

        for (Territory territory : congregation.getTerritoryList()) {

            if (mapsActive.contains(territory.getNumber())) {
                territory.setMapExist(true);
                territory.setUrl(settings.getSettings().get("ftp.httpHost") + "?id=" + territory.getUuid());
            } else {
                territory.setMapExist(false);
            }

            if (territory.getRegistryEntryList() == null || territory.getRegistryEntryList().size() == 0) continue;

            RegistryEntry lastEntry = territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() - 1);

            if (preacherMap.get(lastEntry.getPreacher().getName()) == null) continue;

            preacherMap.get(lastEntry.getPreacher().getName()).getTerritoryListNumbers().add(territory.getNumber());
        }

        return congregation;
    }

    public Congregation saveCongregation(Congregation congregation) throws IOException {

        Set<String> preacherNamesUpdated = new HashSet<>();
        Preacher preacherForHardDelete = null;
        resetTerritoryList(congregation);
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

            setLastAssignedDate(territory);

            // limit the registry entries to 20
            while (territory.getRegistryEntryList().size() > 20) {
                territory.getRegistryEntryList().remove(0);
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

        congregation.setLastUpdate(Calendar.getInstance());
        objectMapper.writeValue(congregationFile, congregation);
        updated = true;

        // Export all territories assigned to a new preacher
        for (Territory territory : congregation.getTerritoryList()) {
            if (territory.isNewPreacherAssigned()) {
                try {
                    exportTerritoryData(territory.getNumber());
                    String preacherName = territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() - 1).getPreacher().getName();
                    preacherNamesUpdated.add(preacherName);
                    // update both, the current user and the previous one
                    if (territory.getRegistryEntryList().size() > 1) {
                        preacherNamesUpdated.add(territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() - 2).getPreacher().getName());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        Map<String, Preacher> preacherMap = new HashMap<>();
        congregation = objectMapper.readValue(congregationFile, Congregation.class);

        for (Preacher preacher : congregation.getPreacherList()) {

            preacher.getTerritoryListNumbers().clear();
            if (preacher.getName() == null || preacher.getName().trim().length() == 0) continue;
            preacherMap.put(preacher.getName(), preacher);
        }

        for (Territory territory : congregation.getTerritoryList()) {

            RegistryEntry lastEntry = territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() - 1);
            if (preacherMap.get(lastEntry.getPreacher().getName()) == null) continue;
            preacherMap.get(lastEntry.getPreacher().getName()).getTerritoryListNumbers().add(territory.getNumber());
        }

        for (String preacherName : preacherNamesUpdated) {
            try {
                Preacher preacher = loadPreacher(congregation, preacherName);
                Dashboard dashboard = new Dashboard();
                dashboard.setFinalApproachVersion(readVersionInfos().getRevision());
                dashboard.setUuid(preacher.getUuid());

                for (String territoryNumber : preacher.getTerritoryListNumbers()) {
                    Territory territory = getTerritoryByNumber(congregation, territoryNumber);
                    RegistryEntry lastRegistryEntry = territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() - 1);
                    TerritoryInfos territoryInfos = new TerritoryInfos();
                    territoryInfos.setUuid(territory.getUuid());
                    territoryInfos.setNumber(territoryNumber);
                    territoryInfos.setName(territory.getName());
                    territoryInfos.setAssignDate(lastRegistryEntry.getAssignDate());
                    territoryInfos.setReturnDate(lastRegistryEntry.getReturnDate());
                    TerritoryMap territoryMap = getTerritoryMapByNumber(territoryNumber);
                    territoryInfos.setSimpleFeatureData(territoryMap.getSimpleFeatureData());
                    dashboard.getTerritories().add(territoryInfos);
                }

                File jsonFile = new File(TERRITORY_JSON_DATA + "dashboard-" + dashboard.getUuid().toString() + ".json");
                objectMapper.writeValue(jsonFile, dashboard);

                if (ftpService.isInitialized()) {
                    ftpService.upload(jsonFile);
                }
            } catch (Exception e) {
                logger.error(e);
            }
        }

        return enhanceCongregationData(loadCongregation());
    }

    private void uploadCongregation(Congregation congregation) {

        if (uploading) return;

        uploading = true;

        (new Thread() {
            public void run() {
                try {
                    String json = objectMapper.writeValueAsString(congregation);
                    File localUploadFolder = new File("uploads");
                    localUploadFolder.mkdirs();
                    String encryptedJSON = encryptionTool.encrypt("871a5c07-5c2d-41bd-98af-bb8cbdb06519cd185d47-bd50-4325-a599-a1a80d91924a", json);
                    String date = DateFormatUtils.format(Calendar.getInstance().getTime(), "yyyyMMddHHmmSS");
                    File uploadFile = new File("uploads/congregation_" + date + ".db");
                    FileUtils.writeStringToFile(uploadFile, encryptedJSON, "UTF-8");
                    ftpService.upload(uploadFile, "uploads/");
                    uploading = false;
                } catch (Exception e) {
                    logger.error("Uploading congregation data failed", e);
                }
            }
        }).start();
    }



    public MapDesign loadMapDesign() throws IOException {

        MapDesign mapDesign = null;

        if (mapDesignFile.exists()) {
            mapDesign = objectMapper.readValue(mapDesignFile, MapDesign.class);
        } else {
            mapDesign = new MapDesign();
            mapDesign.setUuid(UUID.randomUUID());
        }

        if (mapDesign.getZoom() == null) {
            mapDesign.setZoom(12);
        }

        List<TerritoryMap> toBeRemovedFaultyMaps = new ArrayList<>();

        for (TerritoryMap territoryMap : mapDesign.getTerritoryMapList()) {
            if (StringUtils.isEmpty(territoryMap.getTerritoryNumber())) {
                toBeRemovedFaultyMaps.add(territoryMap);
            }
            territoryMap.setFormerTerritoryNumber(null);
        }

        mapDesign.getTerritoryMapList().removeAll(toBeRemovedFaultyMaps);

        Collections.sort(mapDesign.getTerritoryMapList(), new Comparator<TerritoryMap>() {
            @Override
            public int compare(TerritoryMap o1, TerritoryMap o2) {

                return o1.getTerritoryNumber().compareTo(o2.getTerritoryNumber());
            }
        });

        return mapDesign;
    }

    public MapDesign saveMapDesign(MapDesign mapDesign) throws IOException {

        List<TerritoryMap> territoryMapsToRemove = new ArrayList<>();
        TerritoryMap newMap = null;

        for (TerritoryMap t : mapDesign.getTerritoryMapList()) {
            if (StringUtils.isNotEmpty(t.getFormerTerritoryNumber())) {
                newMap = t;
                break;
            }
        }

        for (TerritoryMap t : mapDesign.getTerritoryMapList()) {
            if (newMap != null && t.getTerritoryNumber().equals(newMap.getFormerTerritoryNumber())) {
                territoryMapsToRemove.add(t);
                newMap = null;
            }

            // Clean Map from territories without feature data
            if (!t.getSimpleFeatureData().startsWith("POLYGON")) {
                territoryMapsToRemove.add(t);
            }

            t.setFormerTerritoryNumber(null);
        }

        mapDesign.getTerritoryMapList().removeAll(territoryMapsToRemove);

        objectMapper.writeValue(mapDesignFile, mapDesign);
        updated = true;
        mapDesignService.uploadMapDesign(mapDesign);

        return loadMapDesign();
    }

    /**
     * A method to save fast one single TerritoryMap
     *
     * @param territoryMap
     * @return
     */
    public TerritoryMap saveTerritoryMap(TerritoryMap territoryMap) throws IOException {

        MapDesign mapDesign = loadMapDesign();

        if (StringUtils.isEmpty(territoryMap.getTerritoryNumber())) {
            territoryMap.setTerritoryNumber(String.valueOf(Calendar.getInstance().getTimeInMillis()));
            mapDesign.getTerritoryMapList().add(territoryMap);
            saveMapDesign(mapDesign);
        }

        return territoryMap;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public void exportDatabase() {
        /* OBSOLETE
        Exporter exporter = Exporter.of(db);
        File schemaFile = new File("export/" + Calendar.getInstance().getTimeInMillis() + ".db");
        exporter.exportTo(schemaFile);*/
    }

    public MapDesign setActiveTerritory(String number, String name) throws IOException {

        Congregation congregation = loadCongregation();
        Territory territory = getTerritoryByNumber(congregation, number);

        if (territory != null) {
            return setTerritoryMapActive(number);
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
        registryEntry.setPreacher(new Preacher(Congregation.CONGREGATION));
        territory.getRegistryEntryList().add(registryEntry);

        congregation.getTerritoryList().add(territory);
        saveCongregation(congregation);

        return loadMapDesign();
    }

    private MapDesign setTerritoryMapActive(String number) throws IOException {

        MapDesign mapDesign = loadMapDesign();

        for (TerritoryMap territoryMap : mapDesign.getTerritoryMapList()) {
            if (territoryMap.getTerritoryNumber().equals(number)) {
                territoryMap.setDraft(false);
            }
        }

        return saveMapDesign(mapDesign);
    }

    private Territory getTerritoryByNumber(final Congregation congregation, String number) {

        resetTerritoryList(congregation);

        for (Territory territory : congregation.getTerritoryList()) {
            if (territory.getNumber().equals(number)) return territory;
        }

        return null;
    }

    private Territory getTerritoryByNumber(String number) throws IOException {

        Congregation congregation = loadCongregation();
        resetTerritoryList(congregation);

        for (Territory territory : congregation.getTerritoryList()) {
            if (territory.getNumber() == number) return territory;
        }

        return null;
    }

    public TerritoryMap getTerritoryMapByNumber(String number) throws IOException {

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
     *
     * @param number
     */
    public void exportTerritoryData(String number, boolean onlyRepair) throws Exception {

        logger.info("Export territory " + number + (onlyRepair ? " onlyRepair" : ""));
        // Load the territory and the preacher assigned to it
        Map<String, UUID> linkedTerritories = new HashMap<>();
        Congregation congregation = loadCongregation();
        Territory territory = getTerritoryByNumber(congregation, number);
        TerritoryMap territoryMap = getTerritoryMapByNumber(number);

        if (territory == null) {
            logger.info("territory was null");
            return;
        }

        if (territory.getRegistryEntryList() == null || territory.getRegistryEntryList().size() == 0) {
            logger.info("territory without registry entries");
            return;
        }

        if (territoryMap == null || territory.isArchive()) {
            logger.info("territory with no map or archived");
            return;
        }

        RegistryEntry registryEntry = territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() - 1);
        Preacher preacher = loadPreacher(congregation, registryEntry.getPreacher().getName());

        if (territory.getUuid() == null) {
            UUID uuid = UUID.randomUUID();
            logger.info("territory new UUID is " + uuid.toString());
            territory.setUuid(uuid);
        }

        territory.setNewPreacherAssigned(false);
        File jsonFile = new File(TERRITORY_JSON_DATA + territory.getUuid().toString() + ".json");

        // Set the old JSON to inactive (with the returnDate = TODAY and maybe some text inside the note)
        // this happens only if "onlyRepair" mode is not active
        if (jsonFile.exists() && !onlyRepair) {
            logger.info("jsonFile.exists, therefore deactivate first old territory (set active = false)");
            TerritoryData territoryData = objectMapper.readValue(jsonFile, TerritoryData.class);
            territoryData.setActive(false);
            territoryData.setPreacherUUID(null);
            territoryData.setReturnDate(Calendar.getInstance().getTime());
            objectMapper.writeValue(jsonFile, territoryData);
            try {
                ftpService.upload(jsonFile);
                territory.setFtpDeactived(true);
            } catch (Exception e) {
                logger.error("FTP deactivation failed", e);
            }
        }

        logger.info("Create a new JSON (inside a local folder)");
        TerritoryData territoryData = new TerritoryData();
        territoryData.setUuid(territory.getUuid());
        territoryData.setPreacherUUID(preacher.getUuid());
        territoryData.setActive(true);
        territoryData.setName(territory.getName());
        territoryData.setNumber(String.valueOf(territory.getNumber()));
        territoryData.setSimpleFeatureData(territoryMap.getSimpleFeatureData());
        territoryData.setStreetList(territoryMap.getStreetList());
        territoryData.setAssignDate(registryEntry.getAssignDate());
        territoryData.setReturnDate(null);

        // if onlyRepair mode, the territory does not receive a new UUID
        if (!onlyRepair) {
            UUID uuid = UUID.randomUUID();
            logger.info("set a new UUID for the territory: " + uuid.toString());
            territory.setUuid(uuid);
            territoryData.setUuid(uuid);
        }

        // TODO Link the JSON to the other territories of the preacher and relink the other JSONs to this one (n to n)

        logger.info("Upload the changes (including the old JSON with new status) via FTP to the online service");
        jsonFile = new File(TERRITORY_JSON_DATA + territory.getUuid().toString() + ".json");
        objectMapper.writeValue(jsonFile, territoryData);

        // here you can test it locally
        // ...
        // Upload via FTP
        try {
            ftpService.upload(jsonFile);
            territory.setFtpExported(true);
        } catch (Exception e) {
            logger.error("FTP Upload of new territory failed", e);
        }

        saveCongregation(congregation);

        logger.info("Check the local folder for JSONs older than two years and delete them (inside the local folder and also on the remote server)");
        File dataFolder = new File(TERRITORY_JSON_DATA);

        Calendar twoYearsAgo = Calendar.getInstance();
        twoYearsAgo.add(Calendar.YEAR, -2);

        // Delete older files
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

    public void exportTerritoryData(String number) throws Exception {
        exportTerritoryData(number, false);
    }

    public void exportTerritoryData() throws Exception {

        MapDesign mapDesign = loadMapDesign();

        for (TerritoryMap territoryMap : mapDesign.getTerritoryMapList()) {
            exportTerritoryData(territoryMap.getTerritoryNumber());
        }
    }

    private Preacher loadPreacher(Congregation congregation, String name) {
        for (Preacher preacher : congregation.getPreacherList()) {
            if (name.equals(preacher.getName())) return preacher;
        }
        return null;
    }

    public void exportAllTerritoryData() throws Exception {

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

    public void exportGroupTerritoryData(String groupLeaderName) throws Exception {

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

        File jsonFile = new File(TERRITORY_JSON_DATA + groupLeader.getUuid().toString() + ".json");
        objectMapper.writeValue(jsonFile, territoryData);
        ftpService.upload(jsonFile);
    }

    private Preacher getPreacherByName(String name) throws IOException {

        Congregation congregation = loadCongregation();

        for (Preacher preacher : congregation.getPreacherList()) {
            if (name.equals(preacher.getName())) {
                return preacher;
            }
        }

        return null;
    }

    public List<String> search(String text) throws IOException {

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

            for (int i = 1; i < parts.length; i++) {
                name = name + " " + parts[i];
            }

            Territory territory = new Territory();
            territory.setNumber(number);
            territory.setName(name.trim());
            // First entry assign to congregation
            RegistryEntry registryEntry = new RegistryEntry();
            registryEntry.setAssignDate(Calendar.getInstance().getTime());
            Preacher preacher = new Preacher();
            preacher.setName(Congregation.CONGREGATION);
            registryEntry.setPreacher(preacher);
            territory.getRegistryEntryList().add(registryEntry);

            congregation.getTerritoryList().add(territory);
        }

        saveCongregation(congregation);
    }

    public Congregation deleteTerritory(String number) throws IOException {

        Congregation congregation = loadCongregation();
        Territory toBeRemoved = getTerritoryByNumber(congregation, number);

        congregation.getTerritoryList().remove(toBeRemoved);
        return saveCongregation(congregation);
    }

    public void resetCongregation() throws IOException {

        Congregation congregation = loadCongregation();
        resetCongregation(congregation);

        saveCongregation(congregation);
    }

    private void resetCongregation(Congregation congregation) {

        List<Territory> archivedTerritories = new ArrayList<>();

        for (Preacher preacher : congregation.getPreacherList()) {
            preacher.getTerritoryListNumbers().clear();
        }

        for (Territory territory : congregation.getTerritoryList()) {
            territory.getRegistryEntryList().clear();
            if (territory.isArchive()) {
                archivedTerritories.add(territory);
            }
        }

        congregation.getTerritoryList().removeAll(archivedTerritories);

        for (Territory territory : congregation.getTerritoryList()) {

            RegistryEntry registryEntry = new RegistryEntry();
            registryEntry.setAssignDate(Calendar.getInstance().getTime());
            Preacher preacher = new Preacher();
            preacher.setName(Congregation.CONGREGATION);
            registryEntry.setPreacher(preacher);
            territory.getRegistryEntryList().add(registryEntry);
        }
    }

    public void fakeMonths(String number, Integer months) throws IOException {

        Congregation congregation = loadCongregation();
        Territory territory = getTerritoryByNumber(congregation, number);

        if (territory == null) return;

        RegistryEntry registryEntry = territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() - 1);
        Calendar olderDate = Calendar.getInstance();
        olderDate.add(Calendar.MONTH, -months);
        registryEntry.setAssignDate(olderDate.getTime());

        saveCongregation(congregation);
    }

    public boolean isClosed() {
        return true; //db.isClosed();
    }

    public Version readVersionInfos() throws IOException {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        InputStream is = classloader.getResourceAsStream("info.properties");
        if (is == null) throw new IOException("info.properties not found inside classpath");
        Properties p = new Properties();
        p.load(is);

        version.setRevision(p.getProperty("revision"));
        version.setUploading(uploading);
        version.setDownloading(downloading);

        return version;
    }

    public List<BackupFile> getBackupsOverview() {

        List<BackupFile> backupFiles = new ArrayList<>();

        File backupFolder = new File("backup");

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-hh-mm-ss");

        int count = 0;

        for (File file : backupFolder.listFiles()) {

            if (count >= 20) break;

            if (file.isFile() && file.getName().startsWith("congregation") && file.getName().endsWith("zip")) {

                Calendar cal2022 = Calendar.getInstance();
                cal2022.set(Calendar.YEAR, 2022);
                cal2022.set(Calendar.MONTH, 7);
                cal2022.set(Calendar.DAY_OF_MONTH, 10);

                BackupFile backupFile = new BackupFile();
                backupFile.setFilePath(file.getAbsolutePath());

                String fileName = file.getName();
                String datePart = fileName.substring(fileName.indexOf("_") + 1, fileName.lastIndexOf("."));
                Calendar newDate = Calendar.getInstance();

                try {
                    newDate.setTime(sdf.parse(datePart));
                    backupFile.setLastUpdate(newDate);
                } catch (ParseException e) {
                    e.printStackTrace();
                }

                try {
                    ZipFile zipFile = new ZipFile(file);
                    ZipEntry zipEntry = zipFile.getEntry("congregation.json");

                    final Congregation congregation = objectMapper.readValue(zipFile.getInputStream(zipEntry), Congregation.class);

                    if (cal2022.before(congregation.getLastUpdate())) {
                        backupFile.setLastUpdate(congregation.getLastUpdate());
                    }

                    backupFile.setPreacherCount(congregation.getPreacherList().size()
                            + congregation.getTerritoriesToBeAssigned().size()
                            + congregation.getTerritoriesAssigned().size()
                            + congregation.getTerritoriesOlder4Months().size()
                            + congregation.getTerritoriesOlder8Months().size()
                            + congregation.getTerritoriesNoContacts().size()
                            + congregation.getTerritoriesArchived().size());
                    backupFile.setTerritoryCount(congregation.getTerritoryList().size());

                } catch (NitriteIOException e) {
                    backupFile.setAlreadyOpen(true);
                } catch (FileNotFoundException e) {
                    throw new RuntimeException(e);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                backupFiles.add(backupFile);
                count++;
            }
        }

        backupFiles.sort(new Comparator<BackupFile>() {
            @Override
            public int compare(BackupFile o1, BackupFile o2) {
                return o2.getLastUpdate().compareTo(o1.getLastUpdate());
            }
        });

        return backupFiles;
    }

    public void deleteBackupFile(BackupFile backupFile) {

        File file = new File(backupFile.getFilePath());

        if (file.exists()) {
            file.delete();
        }
    }

    public void restoreBackup(BackupFile backupFile) throws IOException {

        if (updated) {
            makeCopyOfDatabase();
        }

        ZipInputStream zis = new ZipInputStream(new FileInputStream(new File(backupFile.getFilePath())));
        ZipEntry zipEntry;
        byte[] buffer = new byte[1024];

        while ((zipEntry = zis.getNextEntry()) != null) {

            FileOutputStream fos = new FileOutputStream(congregationFolder.getAbsoluteFile() + File.separator + zipEntry.getName());
            int len;
            while ((len = zis.read(buffer)) > 0) {
                fos.write(buffer, 0, len);
            }
            fos.close();
        }

        databaseCorrection001_translateCongregationName();
    }

    public Congregation returnTerritory(String number) throws IOException {

        Congregation congregation = loadCongregation();

        if (StringUtils.isEmpty(number)) return congregation;

        Territory territory = getTerritoryByNumber(congregation, number);

        if (territory == null) return congregation;

        RegistryEntry registryEntry = new RegistryEntry();
        registryEntry.setAssignDate(Calendar.getInstance().getTime());
        Preacher preacher = new Preacher();
        preacher.setName(Congregation.CONGREGATION);
        registryEntry.setPreacher(preacher);

        Date now = new Date();
        Instant current = now.toInstant();
        LocalDateTime ldt = LocalDateTime.ofInstant(current,
                ZoneId.systemDefault());

        congregation.getProtocol().add(ldt + " Territory " + number + " - " + territory.getName() + " returned to " + Congregation.CONGREGATION);

        if (territory.getRegistryEntryList().size() > 0) {
            RegistryEntry lastEntry = territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() - 1);
            lastEntry.setReturnDate(Calendar.getInstance().getTime());
        }

        territory.setNewPreacherAssigned(true);
        territory.getRegistryEntryList().add(registryEntry);

        return saveCongregation(congregation);
    }

    public void registerTerritory(String number) throws IOException {
        Congregation congregation = loadCongregation();
        Territory territory = getTerritoryByNumber(congregation, number);
        RegistryEntry registryEntry = territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() -1);
        RegistryEntry registration = new RegistryEntry();
        registration.setAssignDate(Calendar.getInstance().getTime());
        registration.setPreacher(getPreacherByName(registryEntry.getPreacher().getName()));
        registration.setTerritoryNumber(registryEntry.getTerritoryNumber());
        registration.setRegistration(true); // this is the difference!
        territory.getRegistryEntryList().add(registration);
        saveCongregation(congregation);
    }
}
