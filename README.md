# Final-Approach
One of many JW Territory Manager based on Spring Boot, Angular, Openlayers and NitriteDB.

The application is intended to be run *"offline"*, not as a server, because it lacks user management and security functionality.

## Features
- Draw territories on a OpenStreetMap layer, assign number and name
- Assign territory to a preacher
- Upload the assigned territory via FTP (SFTP) to your private hosted webpage
- Send a Whatsapp message with a list of assigned territories to a preacher
- Print statistics and tables (PDF)

## Install and setup
A note for a future version: I try to get rid of Spring and NPM / Angular and use Javalin and Vue instead, because of problems with higher NPM versions that just does not justify the higher amount of bugfixing.

### NPM version
``` json
{ 'territory-map': '0.0.0',
npm: '6.4.1',
ares: '1.15.0',
cldr: '33.1',
http_parser: '2.8.0',
icu: '62.1',
modules: '64',
napi: '3',
nghttp2: '1.34.0',
node: '10.14.2',
openssl: '1.1.0j',
tz: '2018e',
unicode: '11.0',
uv: '1.23.2',
v8: '6.8.275.32-node.45',
zlib: '1.2.11' }
```

### Angular CLI

    Angular CLI: 11.0.7
    Node: 10.14.2
