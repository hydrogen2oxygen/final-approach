package de.pietro.lusso.territory.utils;

import de.pietro.lusso.territory.domain.Congregation;
import de.pietro.lusso.territory.domain.Preacher;
import de.pietro.lusso.territory.domain.RegistryEntry;
import de.pietro.lusso.territory.domain.Territory;
import de.pietro.lusso.territory.services.DatabaseService;
import org.apache.commons.codec.CharEncoding;
import org.apache.commons.io.FileUtils;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

public class ImportFromExcel {

    public static Map<Integer, String> territoryMap;

    public static void main(String[] args) throws Exception {

        DatabaseService databaseService = new DatabaseService();
        databaseService.initService();

        territoryMap = readTerritoryMap();
        List<RegistryEntry> registryEntryList = readExcel(args[0]);
        List<Territory> territoryLists = sortTerritoryData(registryEntryList);

        for (Territory territory : territoryLists) {
            System.out.println(territory.getNumber() + " " + territory.getRegistryEntryList().size());
        }

        Set<String> names = new TreeSet<>();

        for (RegistryEntry entry : registryEntryList) {
            names.add(entry.getPreacher().getName().replaceAll("  ", " ").trim());
        }

        Congregation congregation = databaseService.loadCongregation();
        congregation.getPreacherList().clear();
        congregation.getTerritoryList().clear();

        for (String name : names) {
            System.out.println(name);
            congregation.getPreacherList().add(new Preacher(name));
        }

        congregation.getTerritoryList().addAll(territoryLists);
        congregation.setLastUpdate(Calendar.getInstance());

        databaseService.saveCongregation(congregation);
    }

    private static List<Territory> sortTerritoryData(List<RegistryEntry> registryEntryList) {

        Map<String, List<RegistryEntry>> territoryLists = new HashMap<>();

        for (RegistryEntry entry : registryEntryList) {
            if (territoryLists.get(entry.getTerritoryNumber()) == null) {
                List<RegistryEntry> list = new ArrayList<>();
                list.add(entry);
                territoryLists.put(entry.getTerritoryNumber(), list);
            } else {
                List<RegistryEntry> list = territoryLists.get(entry.getTerritoryNumber());
                list.add(entry);
                territoryLists.put(entry.getTerritoryNumber(), list);
            }
        }

        List<Territory> territories = new ArrayList<>();

        for (String territoryNumber : territoryLists.keySet()) {
            Territory territory = new Territory();
            territory.setNumber(territoryNumber);
            territory.setName(territoryMap.get(territoryNumber));
            territory.setRegistryEntryList(territoryLists.get(territoryNumber));
            territories.add(territory);
        }

        return territories;
    }

    private static Territory generateTerritoryFromData(Map<Integer, String> territoryMap, RegistryEntry entry) {
        Territory territory = new Territory();
        territory.setNumber(entry.getTerritoryNumber());
        territory.setName(territoryMap.get(entry.getTerritoryNumber()));
        territory.setDate(entry.getAssignDate());
        return territory;
    }

    public static LinkedHashMap<Integer, Integer> sortHashMapByValues(
            Map<Integer, Integer> passedMap) {
        List<Integer> mapKeys = new ArrayList<>(passedMap.keySet());
        List<Integer> mapValues = new ArrayList<>(passedMap.values());
        Collections.sort(mapValues);
        Collections.sort(mapKeys);

        LinkedHashMap<Integer, Integer> sortedMap =
                new LinkedHashMap<>();

        Iterator<Integer> valueIt = mapValues.iterator();
        while (valueIt.hasNext()) {
            Integer val = valueIt.next();
            Iterator<Integer> keyIt = mapKeys.iterator();

            while (keyIt.hasNext()) {
                Integer key = keyIt.next();
                Integer comp1 = passedMap.get(key);
                Integer comp2 = val;

                if (comp1.equals(comp2)) {
                    keyIt.remove();
                    sortedMap.put(key, val);
                    break;
                }
            }
        }
        return sortedMap;
    }

    private static Map<Integer, String> readTerritoryMap() throws IOException {

        List<String> lines = FileUtils.readLines(new File("territory.txt"), CharEncoding.UTF_8);
        Map<Integer, String> territoryMap = new HashMap<>();

        for (String line : lines) {

            String parts[] = line.split(" ");
            territoryMap.put(Integer.valueOf(parts[0]), stringFromArray(parts));
        }

        return territoryMap;
    }

    private static String stringFromArray(String[] parts) {

        StringBuilder str = new StringBuilder();

        int i = 0;

        for (String part : parts) {

            i++;
            if (i == 1) continue;
            if (str.length() > 0) str.append(" ");
            str.append(part);
        }

        return str.toString();
    }

    private static List<RegistryEntry> readExcel(String fileLocation) throws Exception {

        FileInputStream file = new FileInputStream(new File(fileLocation));
        Workbook workbook = new XSSFWorkbook(file);
        Sheet sheet = workbook.getSheetAt(0);

        List<RegistryEntry> registryEntryList = new ArrayList<>();
        String territoryNumber = "";

        for (Row row : sheet) {

            if (row.getRowNum() == 0) continue;

            int column = 1;

            RegistryEntry entry = new RegistryEntry();

            for (Cell cell : row) {

                if (cell.getCellTypeEnum().equals(CellType.NUMERIC) && cell.getColumnIndex() == 0) {

                    if (cell.getNumericCellValue() > 0) {
                        territoryNumber = cell.getStringCellValue();
                    }
                } else if (cell.getCellTypeEnum().equals(CellType.STRING) && cell.getColumnIndex() == 1) {
                    Preacher preacher = new Preacher();
                    preacher.setName(cell.getStringCellValue());
                    entry.setPreacher(preacher);
                } else if (cell.getCellTypeEnum().equals(CellType.NUMERIC) && cell.getColumnIndex() == 2) {
                    entry.setAssignDate(cell.getDateCellValue());
                } else if (cell.getCellTypeEnum().equals(CellType.NUMERIC) && cell.getColumnIndex() == 3) {
                    entry.setReturnDate(cell.getDateCellValue());
                }

                column++;
            }
            entry.setTerritoryNumber(territoryNumber);

            if (entry.getPreacher() == null) continue;
            if (entry.getPreacher().getName() == null) continue;

            registryEntryList.add(entry);
        }

        return registryEntryList;
    }
}
