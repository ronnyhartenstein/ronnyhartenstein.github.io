---
layout: post
title: 'NW.js vs Electron'
date: '2016-02-10'
---

Im Rahmen des [Code for Chemnitz](http://codeforchemnitz.de) [Sensor-Projektes](http://codeforchemnitz.de/projects/sensor/) entstand die [Sensor-Provisionierungs-App](https://github.com/CodeforChemnitz/SensorProvisioning). Diese sollte eine Standalone-Desktop-App sein und in Javascript geschrieben sein. Also haben wir Jungs uns ein wenig zu den verfügbaren Node-Webkit-Frameworks informiert. Zur Auswahl standen [Electron](https://github.com/atom/electron) und [NW.js](https://github.com/nwjs/nw.js). Dieser Post basiert auf den Slack-Chat-Log vom 23. Oktober 2015. Hauptsächlich ging es um ...  

<!--more-->

## Wie funktioniert die Kommunikation zw. Frontend (Browser) und Backend (NodeJS/V8)

**Electron**: Kommunikation zw. renderer-Thread (Frontend Chrome V8) und main-Thread (Backend, NodeJS) ist schon echt tricky. Die Kommunikation läuft über das Modul [`remote`](https://github.com/atom/electron/blob/master/docs/api/remote.md).
Als Duplex-Stream gibt es dort das IPC-Modul [`electron-ipc-stream`](https://github.com/jprichardson/electron-ipc-stream) .

Aber da wir ja gerade für NW.js bauen, haben wir das Problem eher nicht. Hier mal aus dem Wiki ["About Node.js server side script in nw.js"](https://github.com/nwjs/nw.js/wiki/About-Node.js-server-side-script-in-nw.js):

> One of the founding nature of node-webkit is that you can call any Node modules you want from DOM directly.  'directly' means the Javascript objects of Node and DOM reside in the same V8 heap. So variables references are made directly like a pointer, and function calls don't need to come across any kind of JSON marshalling/unmarshalling bridge between processes, or even threads.“

So wie ich das verstehe hat man mit NW.js damit keinen Stress im Kopf „renderer“ Kontext (Window) und „main“ Kontext (Server).

Mir gehts momentan darum zu begreifen..

## Was ist der echte Unterschied zw. NW.js und Electron?

Aus dem Artikel ["Electron vs nwjs"](http://www.akawebdesign.com/2015/05/06/electron-vs-nwjs/):

> Electron would require you to use IPC semantics and pipe/stream the data between contexts. This separation is due to the fact that Electron uses an unmodified CEF build (the custom build means rebuilding NW.JS requires expertise and a lot of computing power to build) which results in things being as expected in normal NodeJS programs. This is a good thing for modularity and code re-use outside of Electron. The shared context of NW.JS introduces the need to reference which context you are addressing during programming.

Spannend auch wo NW.js herkommt:

> Node-Webkit began as a project for and with Intel, for the Intel XDK IDE (Cordova/Phonegap based HTML5 authoring environment) which is a very nice visual IDE for interface building and cross platform/mobile development in general. The project however sponsored by Intel was undertaken as a personal project of Roger Wang (the Webkit Ninja) who works at Intel in Japan

Microsofts Visual Code hat bis auf die V8-Engine nichts  mit Atom-Shell aka Electron und NW.js gemein, sondern kochen komplett ihr eigenes Süppchen.

> Microsoft Code is based on CEF and a rumor went around that it **was** based on Atom-Shell because an old build prototype of it (before its release) had been based on it, this meta-information found it’s way in the non-Atom binary release and thus everyone made this conclusion. Microsoft Code **shares nothing in common with Atom or Electron**, except that they are both based on the same Chromium runtime.

Ich interpretiere das alles so: Willst du nur ne kleine schnelle App bauen, ist NW.js definitiv besser. Willst du mehr systemnähe und SoC (separation of concerns) dann ist Electron besser (und der Build ist schneller, und es muss den Chrome nicht patchen). So wie es sich entwickelt dürfte Electron die Zukunft gehören, auch aufgrund der vielen Apps die es mittlerweile gibt. Aber für das was wir <del>aktuell</del> seinerzeit vor <del>haben</del> hatten ist NW.js richtig.

## Electron auf Mobilen Geräten?

Statement dazu in [issue/562](https://github.com/atom/electron/issues/562)

> For mobile platform, nearly all of atom-shell's APIs don't apply, so I don't think we will ever support mobile platforms.

Wäre aber cool wenn es gehen würde. Wobei, Meteor kompiliert doch auch zu einer verflixten installierbaren App. Also technisch sollte es ja gehen. Auch wenn der Durchgriff zum z.B. Dateisystem natürlich eher schwierig sein dürfte - sind die Rechte für Kamerazugriff etc. doch eher im Cordova/PhoneGap-Container verzeichnet. Und der beinhaltet dann den Chrome Webview etc.
Also ​_eigentlich_​ müsste es gehen.

Allerdings ist das ja nix was wir brauchten :wink: Die [Sensor-Karte](https://github.com/CodeforChemnitz/SensorKarte) als Meteor-App kann es ja :simple_smile:.

## App fertig und trägt

Mitterweile ist die Sensor-Provisionierungs-App recht fertig und einsatzbereit. Die Annahmen haben sich bestätigt und wir konnten unsere eigenen Anforderungen gut umsetzen.
