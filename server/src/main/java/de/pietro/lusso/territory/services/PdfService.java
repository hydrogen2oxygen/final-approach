package de.pietro.lusso.territory.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import de.pietro.lusso.territory.domain.*;
import de.pietro.lusso.territory.domain.osm.OsmStreet;
import de.pietro.lusso.territory.utils.AlphaNumericalComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.*;

@Service
public class PdfService {

    @Autowired
    public DatabaseService databaseService;

    public static void main(String args[]) throws Exception {
        PdfService pdfService = new PdfService();
        pdfService.initForTest();
        Congregation congregation = pdfService.databaseService.loadCongregation();

        for (Preacher preacher : congregation.getPreacherList()) {
            if (preacher.getName().contains("Pietro")) {

                System.out.println(preacher);

                pdfService.generatePreacherPdf(congregation, preacher);

                break;
            }
        }
    }

    public void initForTest() throws Exception {
        databaseService = new DatabaseService();
        databaseService.initService();
    }

    public void generatePreacherPdf(Congregation congregation, Preacher preacher) throws Exception {

        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yy");
        Document document = new Document(PageSize.A4, 10f, 10f, 10f, 10f);

        if (congregation.getName() == null) {
            congregation.setName("CONGREGATION NEEDS NAME");
        }

        document.addTitle(congregation.getName());
        PdfWriter.getInstance(document, new FileOutputStream("export/" + preacher.getName() + ".pdf"));
        document.setMargins(20f,20f,20f,20f);
        document.open();
        document.setPageCount(1);
        document.add( Chunk.NEWLINE );

        document.add(addParagraph(preacher.getName(), FontFactory.HELVETICA,40f, Font.BOLD));

        List<Territory> territoryList = getTerritoryListFromPreacher(congregation,preacher);

        for (Territory territory : territoryList) {

            if (territory.isArchive()) continue;

            Date date = getLastDate(territory.getRegistryEntryList());
            document.add(addParagraph(territory.getNumber() + " " + territory.getName() +
                    " (" + sdf.format(date) + ")", FontFactory.HELVETICA,30f, Font.BOLD));

            File imageFile = new File("Cartine/" + territory.getNumber() + ".jpg");

            if (imageFile.exists()) {
                Image image = Image.getInstance(imageFile.getAbsolutePath());
                document.add(image);
                document.newPage();
            }

            TerritoryMap territoryMap = databaseService.getTerritoryMapByNumber(territory.getNumber());

            if (territoryMap != null && territoryMap.getStreetList().size() > 0) {

                StringBuilder houseNumbers = new StringBuilder();

                Collections.sort(territoryMap.getStreetList(), new Comparator<OsmStreet>() {
                    @Override
                    public int compare(OsmStreet o1, OsmStreet o2) {
                        return o1.getStreetName().compareTo(o2.getStreetName());
                    }
                });

                document.add(addParagraph("", FontFactory.HELVETICA,10f, Font.BOLD));

                PdfPTable table = new PdfPTable(3);
                table.setWidthPercentage(new float[]{290f,40f,290f},document.getPageSize());
                addHeader(table, "Strada", FontFactory.getFont(FontFactory.HELVETICA, 14f, Font.BOLD));
                addHeader(table, "OK", FontFactory.getFont(FontFactory.HELVETICA, 14f, Font.BOLD));
                addHeader(table, "Numeri", FontFactory.getFont(FontFactory.HELVETICA, 14f, Font.BOLD));

                for (OsmStreet street : territoryMap.getStreetList()) {

                    setTableValue(table, street.getStreetName(), FontFactory.getFont(FontFactory.HELVETICA, 12f, Font.NORMAL));
                    addCheckBox(table);

                    Collections.sort(street.getHouseNumbers(), new AlphaNumericalComparator());

                    for (String houseNumber : street.getHouseNumbers()) {

                        houseNumbers.append(houseNumber);
                        houseNumbers.append(",");
                    }

                    setTableValue(table, houseNumbers.toString(), FontFactory.getFont(FontFactory.HELVETICA, 9f, Font.NORMAL));
                    houseNumbers.append("\n");
                }
                document.add(table);
            }
        }

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

    private void addHeader(PdfPTable table, String text, Font font) {
        PdfPCell header = new PdfPCell();
        header.setBackgroundColor(new BaseColor(153, 231, 255));
        header.setPhrase(new Phrase(10f, text, font));
        table.addCell(header);
    }

    private Date getLastDate(List<RegistryEntry> registryEntryList) {
        RegistryEntry registryEntry = registryEntryList.get(registryEntryList.size() - 1);

        if (registryEntry.getReturnDate() != null) return  registryEntry.getReturnDate();

        return registryEntry.getAssignDate();
    }

    private Paragraph addParagraph(String text, String fontName,  float fontSize, int fontStyle) {

        Font font = FontFactory.getFont(fontName, fontSize, Font.BOLD);
        Paragraph p = new Paragraph();
        p.setSpacingBefore(fontSize);
        p.add(new Phrase(fontSize, text, font));

        return p;
    }

    private void addCheckBox(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setPhrase(new Phrase(30f, "[_]", FontFactory.getFont(FontFactory.HELVETICA, 12f, Font.NORMAL)));
        table.addCell(cell);
    }

    private void setTableValue(PdfPTable table, String text, Font font) {

        PdfPCell cell = new PdfPCell();
        cell.setPhrase(new Phrase(10f, text, font));
        table.addCell(cell);
    }
}
