package de.pietro.lusso.territory.utils;

import java.io.File;

/**
 * Make corrections to imported images file names
 */
public class RenameImageFiles {

    public static void main(String [] args) {
        File folder = new File(args[0]);

        for (File file : folder.listFiles()) {
            String newName = file.getName();
            if (newName.contains("(") && newName.endsWith("jpg")) {
                newName = newName.substring(0,newName.indexOf("(")).trim() + ".jpg";
                System.err.println(file.getName() + " --> " + newName);
                file.renameTo(new File(args[0] + "/" + newName));
                //System.out.println(new File(args[0] + "/" + newName).getAbsolutePath());
            } else {
                // System.out.println(newName);
            }

        }
    }
}
