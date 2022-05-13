package de.pietro.lusso.territory;

import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;

public class MainJavalin {

    public static void main(String[] args) {

        Location location = Location.EXTERNAL;

        Javalin app = Javalin.create(config -> {
            if (Location.CLASSPATH.equals(location)) {
                config.addStaticFiles("html", Location.CLASSPATH);
            } else {
                config.addStaticFiles("src/main/resources/html", location);
            }
        }).start(7070);
    }
}
