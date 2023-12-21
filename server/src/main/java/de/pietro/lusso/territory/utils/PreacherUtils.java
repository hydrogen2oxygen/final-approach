package de.pietro.lusso.territory.utils;

import de.pietro.lusso.territory.domain.Congregation;
import de.pietro.lusso.territory.domain.Preacher;
import org.apache.commons.lang3.StringUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class PreacherUtils {

    private PreacherUtils(){}

    public static void setShortNames(final List<Preacher> preacherList) {

        Set<String> names = new HashSet<>();
        int i = 0;
        preacherList.sort((o1, o2) -> o1.getName().compareTo(o2.getName()));

        for (Preacher preacher : preacherList) {
            if (StringUtils.isNotEmpty(preacher.getShortName())) {
                names.add(preacher.getShortName());
            }
        }

        String previousShortName = null;

        for (Preacher preacher : preacherList) {

            String shortName = getShortName(preacher);

            if (!shortName.equals(previousShortName)) {
                i = 0;
                previousShortName = shortName;
            }

            if (StringUtils.isNotEmpty(preacher.getShortName())) {
                i = 0;
                continue;
            }

            if (names.contains(shortName)) {
                i++;
                names.add(shortName + i);
                preacher.setShortName(shortName + i);
            } else {
                i = 0;
                names.add(shortName);
                preacher.setShortName(shortName);
            }
        }
    }

    private static String getShortName(Preacher preacher) {

        String [] parts = preacher.getName().split(" ");
        StringBuilder shortName = new StringBuilder();

        for (String part : parts) {
            try {
                int maxLength = 2;
                if (part.length() < maxLength) continue;
                shortName.append(part.substring(0,maxLength));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return shortName.toString();
    }
}
