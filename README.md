# Final-Approach
One of many JW Territory Manager based on Spring Boot, Angular, Openlayers and NitriteDB.

The application is intended to be run *"offline"*, not as a server, because it lacks user management and security functionality.

## Features
- Draw territories on a OpenStreetMap layer, assign number and name
- Assign territory to a preacher
- Register territory (as processed again by the preacher)
- Upload the assigned territory via FTP (SFTP) to your private hosted webpage
- Send a Whatsapp message with a list of assigned territories to a preacher
- Download maps as KML file
- Print statistics and tables (PDF)

## Development Environment
1) Download XAMPP (or set up your own Apache/PHP/FakeSftp)
2) Set the port in Apache to 90, at least not 80 as FM (Listen 90)
3) Change Setting in FinalApproach accordingly (FTP, User, PW, etc)