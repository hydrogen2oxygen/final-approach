package de.pietro.lusso.territory.utils;

/**
 * FIXME if you really need to, because this is old stuff, but good for importing old data
 */
public class Territory2Pdf {

    /*static float fntSize, lineSpacing;
    static Font font;
    static Font fontBold;

    public static void main(String[] args) throws Exception {

        initFonts();
        String fileLocation = args[0];

        Map<Integer, String> territoryMap = readTerritoryMap();
        List<RegistryEntry> registryEntryList = readExcel(fileLocation);
        Map<Integer, List<RegistryEntry>> territoryLists = sortTerritoryData(registryEntryList);
        writePdf(territoryMap, territoryLists);
    }

    private static void initFonts() {
        fntSize = 9f;
        lineSpacing = 10f;
        font = FontFactory.getFont(FontFactory.COURIER, fntSize);
        fontBold = FontFactory.getFont(FontFactory.COURIER, fntSize, 1);
    }

    private static Map<Integer, List<RegistryEntry>> sortTerritoryData(List<RegistryEntry> registryEntryList) {

        Map<Integer, List<RegistryEntry>> territoryLists = new HashMap<>();

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

        return territoryLists;
    }

    public static void writePdf(Congregation congregation) throws IOException, URISyntaxException, DocumentException {
        initFonts();
        Map<Integer, String> territoryMap = readTerritoryMap();
        List<RegistryEntry> registryEntryList = getAllRegistryEntries(congregation);
        Map<Integer, List<RegistryEntry>> territoryLists = sortTerritoryData(registryEntryList);
        //TODO
        writePdf(territoryMap,null);
    }

    private static List<RegistryEntry> getAllRegistryEntries(Congregation congregation) {

        List<RegistryEntry> registryEntryList = new ArrayList<>();

        for (Territory territory : congregation.getTerritoryList()) {

        }

        return registryEntryList;
    }

    public static void writePdf(Map<Integer, String> territoryMap, Map<Integer, List<RegistryEntry>> territoryLists) throws DocumentException, URISyntaxException, IOException {

        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yy");
        Document document = new Document(PageSize.A4, 10f, 10f, 10f, 10f);
        document.addTitle("IMPORTED DATA");

        PdfWriter.getInstance(document, new FileOutputStream("target/territories.pdf"));

        document.open();
        document.setPageCount(territoryLists.size() / 5);

        List<RegistryEntry> sortedList = new ArrayList<>();

        for (List<RegistryEntry> list : territoryLists.values()) {
            if (list.size() == 0) continue;
            sortedList.add(list.get(list.size() - 1));
        }

        Collections.sort(sortedList, new Comparator<RegistryEntry>() {
            @Override
            public int compare(RegistryEntry o1, RegistryEntry o2) {
                if (o1.getReturnDate() != null && o2.getReturnDate() != null) {
                    return o1.getReturnDate().compareTo(o2.getReturnDate());
                } else if (o1.getAssignDate() != null && o2.getAssignDate() != null) {
                    return o1.getAssignDate().compareTo(o2.getAssignDate());
                } else return 1;
            }
        });

        Map<Integer,Integer> countTerritoriesRegistries = new HashMap<>();

        List<Integer> territoryNumbers = new ArrayList<>(territoryLists.keySet());
        Collections.sort(territoryNumbers);

        List<List<Integer>> subSets = ListUtils.partition(territoryNumbers, 5);

        for (List<Integer> subSet : subSets) {

            PdfPTable table = new PdfPTable(subSet.size());
            table.setWidthPercentage(100f);

            for (Integer territoryNumber : subSet) {

                PdfPCell header = new PdfPCell();
                header.setBackgroundColor(new BaseColor(153, 231, 255));
                header.setPhrase(new Phrase(lineSpacing, territoryNumber + " " + territoryMap.get(territoryNumber), fontBold));
                table.addCell(header);
            }

            boolean continueToAddRows = true;

            while (continueToAddRows) {

                boolean cellAdded = false;

                for (Integer territoryNumber : subSet) {

                    System.out.println(territoryNumber + " " + territoryMap.get(territoryNumber));

                    List<RegistryEntry> territoryList = territoryLists.get(territoryNumber);

                    if (territoryList.size() > 0) {
                        RegistryEntry entry = territoryList.remove(0);
                        StringBuilder entryLine = new StringBuilder(entry.getPreacher().getName());
                        entryLine.append("\n");

                        if (countTerritoriesRegistries.get(territoryNumber) == null) {
                            countTerritoriesRegistries.put(territoryNumber,1);
                        } else {
                            Integer counter = countTerritoriesRegistries.get(territoryNumber);
                            countTerritoriesRegistries.put(territoryNumber, (counter + 1));
                        }

                        if (entry.getAssignDate() != null) {
                            entryLine.append(sdf.format(entry.getAssignDate()));
                        }

                        if (entry.getReturnDate() != null) {
                            entryLine.append(" - ");
                            entryLine.append(sdf.format(entry.getReturnDate()));
                        }

                        table.addCell(new Phrase(lineSpacing, entryLine.toString(), font));
                        cellAdded = true;
                    } else {
                        table.addCell("");
                    }
                }

                continueToAddRows = cellAdded;
            }

            document.add(table);
        }

        PdfPTable table = new PdfPTable(3);
        table.setWidthPercentage(100f);

        setTableHeader(table, "Territorio");
        setTableHeader(table, "Proclamatore");
        setTableHeader(table, "Data");

        ZonedDateTime oneYearAgo = ZonedDateTime.now(ZoneOffset.UTC).minusYears(1);
        ZonedDateTime twoYearsAgo = ZonedDateTime.now(ZoneOffset.UTC).minusYears(2);

        int countInCongregation = 0;
        int countOverOneYear = 0;
        int countOverTwoYears = 0;
        Set<String> preachers = new TreeSet<>();
        Map<String,Preacher> preachersMap = new HashMap<>();

        for (RegistryEntry entry : sortedList) {

            // collect names of preachers
            preachers.add(entry.getPreacher().getName());

            ZonedDateTime entryDate = null;
            Date date = entry.getAssignDate();

            if (entry.getReturnDate() != null) date = entry.getReturnDate();

            if (date != null) {
                entryDate = ZonedDateTime.ofInstant(date.toInstant(),
                        ZoneId.systemDefault());
            }

            String territoryName = entry.getTerritoryNumber() + " " + territoryMap.get(entry.getTerritoryNumber());

            if (entry.getReturnDate() != null || entry.getPreacher().getName().toLowerCase().trim().equals("congregazione")) {
                setTableValue(table,territoryName, new BaseColor(167, 255, 94));
                countInCongregation++;
            } else if (entryDate != null && entryDate.toInstant().compareTo(oneYearAgo.toInstant()) < 0) {

                setTableValue(table,territoryName, new BaseColor(255, 167, 94));

                if (entryDate.toInstant().compareTo(twoYearsAgo.toInstant()) < 0) {
                    countOverTwoYears++;
                } else if (entryDate.toInstant().compareTo(oneYearAgo.toInstant()) < 0) {
                    countOverOneYear++;
                }
            } else {
                setTableValue(table,territoryName);
            }

            if (preachersMap.get(entry.getPreacher().getName()) == null) {
                Preacher preacher = entry.getPreacher();
                Territory territory = generateTerritoryFromData(territoryMap, entry);
                preacher.getTerritoryListNumbers().add(territory.getNumber());
                preacher.setName(entry.getPreacher().getName());
                preachersMap.put(entry.getPreacher().getName(), preacher);
            } else {
                Preacher preacher = preachersMap.get(entry.getPreacher().getName());
                Territory territory = generateTerritoryFromData(territoryMap, entry);
                preacher.getTerritoryListNumbers().add(territory.getNumber());
            }

            setTableValue(table,entry.getPreacher().getName());

            StringBuilder entryLine = new StringBuilder();

            if (entry.getAssignDate() != null) {
                entryLine.append(sdf.format(entry.getAssignDate()));
            }

            if (entry.getReturnDate() != null) {
                entryLine.append(" - ");
                entryLine.append(sdf.format(entry.getReturnDate()));
            }

            setTableValue(table,entryLine.toString());
        }

        List<String> preachersList = new ArrayList<>(preachers);
        FileUtils.writeLines(new File("preachers.txt"),"UTF-8", preachersList);

        document.add(table);

        Paragraph p = new Paragraph();
        p.setSpacingBefore(20f);
        StringBuilder statistics = new StringBuilder("STATISTICA\n")
                .append("Quantità territori: ")
                .append(sortedList.size())
                .append("\nTerritori in mano della congregazione: ")
                .append(countInCongregation)
                .append("\nTerritori oltre due anni: ")
                .append(countOverTwoYears)
                .append("\nTerritori oltre un anno: ")
                .append(countOverOneYear)
                .append("\nLegenda:\n- arancione = si deve registrare\n- verde = si può ridistribuire\n------------");
        p.add(new Phrase(lineSpacing, statistics.toString(), fontBold));
        document.add(p);

        table = new PdfPTable(1);
        table.setWidthPercentage(100f);
        setTableHeader(table, "Territori lavorati di raro (Top 10)");
        //setTableHeader(table, "Territori TOP 20");
        //setTableHeader(table, "Proclamatori senza un territorio");

        LinkedHashMap<Integer, Integer> sortedCountTerritories = sortHashMapByValues(countTerritoriesRegistries);
        int y = 0;
        for (Integer territoryNumber : sortedCountTerritories.keySet()) {
            String territoryName = territoryNumber + " " + territoryMap.get(territoryNumber);
            setTableValue(table, territoryName + " - " + sortedCountTerritories.get(territoryNumber), new BaseColor(255, 167, 94));

            y++;

            if (y > 10) break;
        }

        document.add(table);

        table = new PdfPTable(2);
        table.setWidthPercentage(100f);
        setTableHeader(table, "Proclamatore");
        setTableHeader(table, "Territori");

        List<Preacher> preacherList = new ArrayList<>();
        preacherList.addAll(preachersMap.values());
        Collections.sort(preacherList, new Comparator<Preacher>() {
            @Override
            public int compare(Preacher o1, Preacher o2) {
                return o1.getName().compareTo(o2.getName());
            }
        });

        for (Preacher preacher : preacherList) {
            setTableValue(table, preacher.getName(), new BaseColor(255, 255, 255));

            StringBuilder territories = new StringBuilder();

            List<Territory> territoryList = getTerritoryListFromPreacher(congregation,preacher);

            for (Territory territory : preacher.getTerritoryList()) {

                if (territories.length() > 0) territories.append(", ");

                territories.append(territory.getNumber() + " " + territory.getName());
            }

            TerritoryImageGenerator.generateTerritoryImage(preacher);

            setTableValue(table, territories.toString(), new BaseColor(255, 255, 255));
        }
        document.add(table);

        document.close();
    }

    private List<Territory> getTerritoryListFromPreacher(Congregation congregation, Preacher preacher) {

        List<Territory> territoryList = new ArrayList<>();

        for (Territory territory : congregation.getTerritoryList()) {

            if (preacher.getTerritoryListNumbers().contains(territory.getNumber())) {
                territoryList.add(territory);
            }
        }

        return  territoryList;
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

    private static void setTableHeader(PdfPTable table, String columnHeader) {
        PdfPCell header = new PdfPCell();
        header.setBackgroundColor(new BaseColor(255, 231, 153));
        header.setPhrase(new Phrase(lineSpacing, columnHeader, fontBold));
        table.addCell(header);
    }

    private static void setTableValue(PdfPTable table, String value) {
        setTableValue(table, value, null);
    }

    private static void setTableValue(PdfPTable table, String value, BaseColor backgroundColor) {

        PdfPCell cell = new PdfPCell();

        if (backgroundColor != null) {
            cell.setBackgroundColor(backgroundColor);
        }

        cell.setPhrase(new Phrase(lineSpacing, value, font));
        table.addCell(cell);
    }

    private static void addCustomRows(PdfPTable table)
            throws URISyntaxException, BadElementException, IOException {

        PdfPCell imageCell = new PdfPCell();
        table.addCell(imageCell);

        PdfPCell horizontalAlignCell = new PdfPCell(new Phrase("row 2, col 2"));
        horizontalAlignCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(horizontalAlignCell);

        PdfPCell verticalAlignCell = new PdfPCell(new Phrase("row 2, col 3"));
        verticalAlignCell.setVerticalAlignment(Element.ALIGN_BOTTOM);
        table.addCell(verticalAlignCell);
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
        Integer territoryNumber = 0;

        for (Row row : sheet) {

            if (row.getRowNum() == 0) continue;

            int column = 1;

            RegistryEntry entry = new RegistryEntry();

            for (Cell cell : row) {

                if (cell.getCellTypeEnum().equals(CellType.NUMERIC) && cell.getColumnIndex() == 0) {
                    if (cell.getNumericCellValue() == 328) {
                        System.out.println("sdsds");
                    }

                    if (cell.getNumericCellValue() > 0) {
                        territoryNumber = (int) cell.getNumericCellValue();
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

     */
}
