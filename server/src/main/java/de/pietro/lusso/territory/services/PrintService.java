package de.pietro.lusso.territory.services;

import com.itextpdf.text.Font;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import de.pietro.lusso.territory.domain.Congregation;
import de.pietro.lusso.territory.domain.Preacher;
import de.pietro.lusso.territory.domain.RegistryEntry;
import de.pietro.lusso.territory.domain.Territory;
import org.apache.commons.collections4.ListUtils;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.*;

@Service
public class PrintService {

    private float fntSize, lineSpacing;
    private Font font;
    private Font fontBold;

    @Autowired
    private DatabaseService databaseService;

    public static String note[] = {"Cara sorella, caro fratello, per favore osserva la data del territorio.",
            "Se si avvicina a 4 mesi per favore ritorna il territorio al fratello responsabile.",
            "Il colore giallo già segnala che è oltre 4 mesi."};

    @PostConstruct
    private void init() {
        fntSize = 9f;
        lineSpacing = 10f;
        font = FontFactory.getFont(FontFactory.COURIER, fntSize);
        fontBold = FontFactory.getFont(FontFactory.COURIER, fntSize, 1);
    }

    public static void main(String args[]) throws Exception {

        DatabaseService databaseService = new DatabaseService();
        databaseService.initService();
        PrintService printService = new PrintService();
        printService.init();
        Congregation congregation = databaseService.loadCongregation();

        printService.printCongregation(congregation);
    }

    public void generatePreacherImage(Congregation congregation, String preacherName, final OutputStream out) throws IOException {

        Preacher preacher = null;

        for (Preacher p : congregation.getPreacherList()) {
            if (p.getName().equals(preacherName)) {
                preacher = p;
                break;
            }
        }

        if (preacher == null) return;

        List<Territory> territoryList = getTerritoryListFromPreacher(congregation,preacher);
        int width = 10;
        int height = 160;
        int x = 50;
        int y = 120;
        int spaceBetweenImages = 20;
        int maxWidth = 0;
        java.awt.Font fontBig = new java.awt.Font("Arial", java.awt.Font.BOLD, 70);
        java.awt.Font fontMedium = new java.awt.Font("Arial", java.awt.Font.BOLD, 40);
        java.awt.Font fontSmall = new java.awt.Font("Arial", java.awt.Font.BOLD, 20);
        java.awt.Font fontSmaller = new java.awt.Font("Arial", java.awt.Font.BOLD, 16);

        height += fontBig.getSize();
        height += fontMedium.getSize() * preacher.getTerritoryListNumbers().size();

        Graphics graphics = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB).createGraphics();
        graphics.setFont(fontSmall);

        for (String text : note) {
            if (maxWidth < graphics.getFontMetrics().stringWidth(text)) {
                maxWidth = graphics.getFontMetrics().stringWidth(text);
            }

            height += fontSmall.getSize();
        }

        width = maxWidth + (x*2);

        System.out.println(preacher.getName());

        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yy");
        File territoryImagesFolder = new File("target/territoryImages");

        if (!territoryImagesFolder.exists()) territoryImagesFolder.mkdirs();

        List<BufferedImage> territoryImages = new ArrayList<>();

        for (Territory territory : territoryList) {
            File imageFile = new File("Cartine/" + territory.getNumber() + ".jpg");
            if (!imageFile.exists()) continue;
            BufferedImage bufferedImage = ImageIO.read(imageFile);
            territoryImages.add(bufferedImage);
            height += bufferedImage.getHeight() + spaceBetweenImages;

            if (width < (bufferedImage.getWidth() + (x*2))) width = bufferedImage.getWidth() + (x*2);

            if (territory.getNotes().size() > 0) {

                height += fontSmaller.getSize();

                for (String note : territory.getNotes()) {
                    height += fontSmaller.getSize();
                }
            }
        }

        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics g = image.createGraphics();

        // background
        g.setColor(new Color(255,255,255));
        g.fillRect(0, 0,  width, height );

        // info
        g.setColor(new Color(44, 58, 89));
        g.setFont(fontSmall);
        g.drawString("Informazioni attuali dei tuoi territori (data " + sdf.format(Calendar.getInstance().getTime()) + ")", x,y - fontBig.getSize());

        // name
        g.setColor(new Color(0,0,0));
        g.setFont(fontBig);
        g.drawString(preacher.getName(), x,y);
        maxWidth = g.getFontMetrics().stringWidth(preacher.getName());

        // territoryList
        y += fontMedium.getSize();

        for (Territory territory : territoryList) {

            RegistryEntry lastRegistryEntry = territory.getRegistryEntryList().get(territory.getRegistryEntryList().size() -1);
            territory.setDate(lastRegistryEntry.getAssignDate());

            if (lastRegistryEntry.getReturnDate() != null) {
                territory.setDate(lastRegistryEntry.getReturnDate());
            }

        }

        for (Territory territory : territoryList) {
            y += fontMedium.getSize();

            ZonedDateTime entryDate = ZonedDateTime.ofInstant(territory.getDate().toInstant(),
                    ZoneId.systemDefault());

            String dateString =  sdf.format(territory.getDate());
            String text = territory.getNumber() + " - " + territory.getName() + " - " + dateString;

            if (entryDate.toInstant().compareTo(ZonedDateTime.now(ZoneOffset.UTC).minusMonths(4).toInstant()) < 0) {
                g.setColor(new Color(255, 239, 0));
                g.fillRect(x,y - fontMedium.getSize() + 5,g.getFontMetrics().stringWidth(text),fontMedium.getSize());
            }

            if (entryDate.toInstant().compareTo(ZonedDateTime.now(ZoneOffset.UTC).minusMonths(6).toInstant()) < 0) {
                g.setColor(new Color(255, 153, 0));
                g.fillRect(x,y - fontMedium.getSize() + 5,g.getFontMetrics().stringWidth(text),fontMedium.getSize());
            }

            if (entryDate.toInstant().compareTo(ZonedDateTime.now(ZoneOffset.UTC).minusMonths(10).toInstant()) < 0) {
                g.setColor(new Color(255, 104, 31));
                g.fillRect(x,y - fontMedium.getSize() + 5,g.getFontMetrics().stringWidth(text),fontMedium.getSize());
            }

            if (maxWidth < g.getFontMetrics().stringWidth(text)) maxWidth = g.getFontMetrics().stringWidth(text);

            g.setColor(new Color(0,0,0));
            g.setFont(fontMedium);
            g.drawString(text, x,y);
        }


        g.setColor(new Color(0, 65, 139));
        g.setFont(fontSmall);
        y+= fontSmall.getSize();

        for (String text : note) {
            y+= fontSmall.getSize();
            g.drawString(text, x,y);
        }

        g.setColor(new Color(0,0,0));
        g.drawRect(x - 10, 30, width - (x*2) + fontSmall.getSize(), y);

        y += 40;
        int i = 0;


        for (BufferedImage territoryImage : territoryImages) {

            g.drawImage(territoryImage,x,y,territoryImage.getWidth(), territoryImage.getHeight(), null);

            Territory territory = getTerritoryListFromPreacher(congregation,preacher).get(i);
            g.setColor(new Color(255, 255, 255));
            g.drawString(territory.getNumber() + " " + territory.getName(),x+ 2,y + fontSmall.getSize()+ 2);
            g.setColor(new Color(45, 140, 255));
            g.drawString(territory.getNumber() + " " + territory.getName(),x ,y + fontSmall.getSize() );

            y += territoryImage.getHeight() + spaceBetweenImages;

            if (territory.getNotes().size() > 0) {

                g.setFont(fontSmaller);
                g.setColor(new Color(165, 1, 1));
                g.drawString("NON VISITARE / NON CONTATTARE", x, y);
                y += fontSmaller.getSize();

                for (String note : territory.getNotes()) {
                    g.drawString(note, x, y);
                    y += fontSmaller.getSize();
                }
            }

            i++;
        }

        try {
            ImageIO.write(image, "PNG", out);
        } catch (IndexOutOfBoundsException e) {
            // happens when the image is opened inside a browser tab and it uses its internal cache instead of the stream
        }
    }

    private List<Territory> getTerritoryListFromPreacher(Congregation congregation, Preacher preacher) throws IOException {

        List<Territory> territoryList = new ArrayList<>();

        for (Territory territory : databaseService.getTerritoryList()) {

            if (preacher.getTerritoryListNumbers().contains(territory.getNumber())) {
                territoryList.add(territory);
            }
        }

        return  territoryList;
    }

    public void printCongregation(Congregation congregation) throws Exception {

        databaseService.resetTerritoryList(congregation);
        Map<String, String> territoryMap = readTerritoryMap();
        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yy");
        Document document = new Document(PageSize.A4, 10f, 10f, 10f, 10f);

        if (congregation.getName() == null) {
            congregation.setName("CONGREGATION NEEDS NAME");
        }

        document.addTitle(congregation.getName());

        PdfWriter.getInstance(document, new FileOutputStream("territories.pdf"));

        document.open();
        Map<String,List<RegistryEntry>> registryEntriesMap = new HashMap<>();

        for (Territory territory : databaseService.getTerritoryList()) {
            if (territory.isArchive()) continue;
            registryEntriesMap.put(territory.getNumber(),extractNewEntries(territory.getRegistryEntryList()));
        }

        document.setPageCount(registryEntriesMap.size() / 5);

        List<RegistryEntry> sortedList = new ArrayList<>();

        for (List<RegistryEntry> list : registryEntriesMap.values()) {
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

        Map<String,Integer> countTerritoriesRegistries = new HashMap<>();

        List<String> territoryNumbers = new ArrayList<>(registryEntriesMap.keySet());
        Collections.sort(territoryNumbers);

        List<List<String>> subSets = ListUtils.partition(territoryNumbers, 5);

        for (List<String> subSet : subSets) {

            PdfPTable table = new PdfPTable(subSet.size());
            table.setWidthPercentage(100f);

            for (String territoryNumber : subSet) {

                PdfPCell header = new PdfPCell();
                header.setBackgroundColor(new BaseColor(153, 231, 255));
                header.setPhrase(new Phrase(lineSpacing, territoryNumber + " " + territoryMap.get(territoryNumber), fontBold));
                table.addCell(header);
            }

            boolean continueToAddRows = true;

            while (continueToAddRows) {

                boolean cellAdded = false;

                for (String territoryNumber : subSet) {

                    System.out.println(territoryNumber + " " + territoryMap.get(territoryNumber));

                    List<RegistryEntry> territoryList = registryEntriesMap.get(territoryNumber);

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
        Map<String, Preacher> preachersMap = new HashMap<>();

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

            if (entry.getTerritoryNumber() == null) {
                continue;
            }

            String territoryName = entry.getTerritoryNumber() + " " + territoryMap.get(entry.getTerritoryNumber());

            if (entry.getReturnDate() != null || entry.getPreacher().getName().toLowerCase().trim().equals(Congregation.CONGREGATION.toLowerCase())) {
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

        LinkedHashMap<String, Integer> sortedCountTerritories = sortHashMapByValues(countTerritoriesRegistries);
        int y = 0;
        for (String territoryNumber : sortedCountTerritories.keySet()) {
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

            for (Territory territory : territoryList) {

                if (territories.length() > 0) territories.append(", ");

                territories.append(territory.getNumber() + " " + territory.getName());
            }

            //TerritoryImageGenerator.generateTerritoryImage(preacher);

            setTableValue(table, territories.toString(), new BaseColor(255, 255, 255));
        }
        document.add(table);

        document.close();
    }

    private List<RegistryEntry> extractNewEntries(List<RegistryEntry> registryEntryList) {

        List<RegistryEntry> newEntryList = new ArrayList<>();

        if (registryEntryList.size() <= 2) return registryEntryList;

        Calendar calendarThreeYearsAgo = Calendar.getInstance();
        calendarThreeYearsAgo.add(Calendar.YEAR, -3);

        for (RegistryEntry entry : registryEntryList) {

            if (entry.getReturnDate() != null && calendarThreeYearsAgo.getTime().after(entry.getReturnDate())) {
                continue;
            }

            if (entry.getAssignDate() != null && calendarThreeYearsAgo.getTime().after(entry.getAssignDate())) {
                continue;
            }

            newEntryList.add(entry);
        }

        return newEntryList;
    }

    private Territory generateTerritoryFromData(Map<String, String> territoryMap, RegistryEntry entry) {
        Territory territory = new Territory();
        territory.setNumber(entry.getTerritoryNumber());
        territory.setName(territoryMap.get(entry.getTerritoryNumber()));
        territory.setDate(entry.getAssignDate());
        return territory;
    }

    private LinkedHashMap<String, Integer> sortHashMapByValues(
            Map<String, Integer> passedMap) {
        List<String> mapKeys = new ArrayList<>(passedMap.keySet());
        List<Integer> mapValues = new ArrayList<>(passedMap.values());
        Collections.sort(mapValues);
        Collections.sort(mapKeys);

        LinkedHashMap<String, Integer> sortedMap =
                new LinkedHashMap<>();

        Iterator<Integer> valueIt = mapValues.iterator();
        while (valueIt.hasNext()) {
            Integer val = valueIt.next();
            Iterator<String> keyIt = mapKeys.iterator();

            while (keyIt.hasNext()) {
                String key = keyIt.next();
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

    private void setTableHeader(PdfPTable table, String columnHeader) {
        PdfPCell header = new PdfPCell();
        header.setBackgroundColor(new BaseColor(255, 231, 153));
        header.setPhrase(new Phrase(lineSpacing, columnHeader, fontBold));
        table.addCell(header);
    }

    private void setTableValue(PdfPTable table, String value) {
        setTableValue(table, value, null);
    }

    private void setTableValue(PdfPTable table, String value, BaseColor backgroundColor) {

        PdfPCell cell = new PdfPCell();

        if (backgroundColor != null) {
            cell.setBackgroundColor(backgroundColor);
        }

        cell.setPhrase(new Phrase(lineSpacing, value, font));
        table.addCell(cell);
    }

    /*private Map<Integer, String> readTerritoryMap() throws IOException {

        List<String> lines = FileUtils.readLines(new File("territory.txt"), CharEncoding.UTF_8);
        Map<Integer, String> territoryMap = new HashMap<>();

        for (String line : lines) {

            String parts[] = line.split(" ");
            territoryMap.put(Integer.valueOf(parts[0]), stringFromArray(parts));
        }

        return territoryMap;
    }*/

    private Map<String, String> readTerritoryMap() throws IOException {

        Map<String, String> territoryMap = new HashMap<>();

        for (Territory territory : databaseService.getTerritoryList()) {

            territoryMap.put(territory.getNumber(), territory.getName());
        }

        return territoryMap;
    }

    private String stringFromArray(String[] parts) {

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
}
