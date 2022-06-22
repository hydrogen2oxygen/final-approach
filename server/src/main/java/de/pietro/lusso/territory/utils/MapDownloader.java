package de.pietro.lusso.territory.utils;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.net.URL;

public class MapDownloader {

    public static void main(String [] aarrggghhh) throws Exception {

        int startX = 5679;
        int startY = 3310;
        int targetX = 5714;
        int targetY = 3281;

        int tileSizeX = 200;
        int tileSizeY = 200;

        int width = tileSizeX * (targetX - startX);
        int height = tileSizeY * (startY - targetY);

        String urlPattern = "https://www.stadtplandienst.de/mappaint.aspx?sid=074EC1D894D6B0062AEB90AA522428AE&ix=#X#&iy=#Y#&grid=dedatlas10";
        //download(urlPattern, startX,startY,targetX,targetY,width,height);
        //System.exit(0);

        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics g = image.createGraphics();

        int x = startX;
        int y = targetY;

        int posX = 0;
        int posY = 0;
        int imageCounter = 0;

        while (x != targetX) {
            while (y != targetY) {
                try {
                    Image img = ImageIO.read(new File("images/map_" + imageCounter + ".png"));
                    g.drawImage(img,posX,posY,null);
                    posY += 200;
                    imageCounter++;
                } catch (Exception e) {
                    e.printStackTrace();
                }
                y--;
            }

            x++;
            posX += 200;
            posY = 0;
            y = startY;
        }

        ImageIO.write(image, "png", new File("target/territory_overview.png"));
    }

    private static void download(String urlPattern, int startX, int startY, int targetX, int targetY, int width, int height) {

        int x = startX;
        int y = startY;

        File folder = new File("images");
        if (!folder.exists()) folder.mkdirs();

        int imageCounter = 0;

        while (x != targetX) {
            while (y != targetY) {
                try {
                    URL url = new URL(urlPattern.replace("#X#",String.valueOf(x)).replace("#Y#",String.valueOf(y)));
                    Image image = ImageIO.read(url);
                    ImageIO.write(toBufferedImage(image), "png", new File("images/map_" + imageCounter + ".png"));
                    imageCounter++;
                } catch (Exception e) {
                    e.printStackTrace();
                }
                y--;
            }

            x++;
            y = startY;
        }
    }

    public static BufferedImage toBufferedImage(Image img)
    {
        if (img instanceof BufferedImage)
        {
            return (BufferedImage) img;
        }

        // Create a buffered image with transparency
        BufferedImage bimage = new BufferedImage(img.getWidth(null), img.getHeight(null), BufferedImage.TYPE_INT_ARGB);

        // Draw the image on to the buffered image
        Graphics2D bGr = bimage.createGraphics();
        bGr.drawImage(img, 0, 0, null);
        bGr.dispose();

        // Return the buffered image
        return bimage;
    }
}
