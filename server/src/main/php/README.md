# Experimental PHP online application for territory management

Use MD5 HASH as names recognition for the users and a password.

Final-Approach writes JSON maps and they can be distributed to different groups.

Der Diener gibt Gebiete für eine Gruppe frei die sich im Pool der Versammlung befinden.
Es wird eine JSON Datei geschrieben, wie immer mit Hilfe einer UUID.
Mit dieser UUID verbindet man sich im Web auf eine PHP Seite, die im selben Ordner liegt wie die Angular Anwendung.
Dort sieht man eine Liste der Gebiete, inclusive Links zu den Karten um diese auszuprobieren.
Der Gruppendiener kann einige auswählen und vergeben. Dazu muss er den Namen des Verkündigers eingeben, welches aber nur als HASH gespeichert wurde.
Per PHP wird dies notiert. Final-Approach liest diese Notiz aus und gleicht diese mit der eigenen DB an.
Der Gebietsdiener und sein Assistent bekommen eine komplette Übersicht.

