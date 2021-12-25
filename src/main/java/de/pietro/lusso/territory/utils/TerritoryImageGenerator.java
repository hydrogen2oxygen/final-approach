package de.pietro.lusso.territory.utils;

import de.pietro.lusso.territory.domain.Congregation;
import de.pietro.lusso.territory.domain.Preacher;
import de.pietro.lusso.territory.domain.Territory;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class TerritoryImageGenerator {

    public static String note[] = {"Cara sorella, caro fratello, per favore osserva la data del territorio.",
            "Se si avvicina a 4 mesi per favore ritorna il territorio al fratello responsabile.",
            "Il colore giallo già segnala che è oltre 4 mesi."};

    public static void generateTerritoryImage(Congregation congregation, Preacher preacher) throws IOException {

        int width = 10;
        int height = 160;
        int x = 50;
        int y = 120;
        int spaceBetweenImages = 20;
        int maxWidth = 0;
        Font fontBig = new Font("Arial", Font.BOLD, 70);
        Font fontMedium = new Font("Arial", Font.BOLD, 40);
        Font fontSmall = new Font("Arial", Font.BOLD, 20);

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

        List<Territory> territoryList = getTerritoryListFromPreacher(congregation,preacher);

        for (Territory territory : territoryList) {
            BufferedImage bufferedImage = ImageIO.read(new File("Cartine/" + territory.getNumber() + ".jpg"));
            territoryImages.add(bufferedImage);
            height += bufferedImage.getHeight() + spaceBetweenImages;

            if (width < (bufferedImage.getWidth() + (x*2))) width = bufferedImage.getWidth() + (x*2);
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
        g.setFont(fontMedium);
        y += fontMedium.getSize();


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

            Territory territory = territoryList.get(i);
            g.setColor(new Color(255, 255, 255));
            g.drawString(territory.getNumber() + " " + territory.getName(),x+ 2,y + fontSmall.getSize()+ 2);
            g.setColor(new Color(45, 140, 255));
            g.drawString(territory.getNumber() + " " + territory.getName(),x ,y + fontSmall.getSize() );

            y += territoryImage.getHeight() + spaceBetweenImages;
            i++;
        }

        ImageIO.write(image, "png", new File(territoryImagesFolder.getAbsolutePath() + "/" + preacher.getName() + ".png"));
    }

    private static List<Territory> getTerritoryListFromPreacher(Congregation congregation, Preacher preacher) {

        List<Territory> territoryList = new ArrayList<>();

        for (Territory territory : congregation.getTerritoryList()) {

            if (preacher.getTerritoryListNumbers().contains(territory.getNumber())) {
                territoryList.add(territory);
            }
        }

        return  territoryList;
    }
}

