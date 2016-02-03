---
layout: post
status: publish
published: true
title: OXID Shop Module per Bower und Grunt automatisch aktualisieren
author:
  display_name: ''
  login: ''
  email: ''
  url: ''

wordpress_id: 599
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=599
date: '2015-03-03 23:33:43 +0100'
date_gmt: '2015-03-03 21:33:43 +0100'
categories:
- OXID
- DevOp
- Grunt
- Bower
tags: []
thumb: /files/2015/03/oxid_module_grunt_bower-960x360.jpg
---
[OXID eShop CE][1] ist an sich ja ein tolles System out-of-the-box. Wie jedes moderne System bietet auch OXID Drittanbietern die Möglichkeit, dieses mit **Modulen** zu erweitern. Mittlerweile gibt es auch einige Module auf GitHub unter OpenSource-Lizenz. Mit Node.js, Bower und Grunt lässt sich ein automatischer Workflow etablieren, der Installation und Aktualisierung erleichtert.

#### TL;DR

Mittels Bower und Grunt werden die GitHub-Repos der Modulanbieter heruntergeladen und anschließend nach `modules/` kopiert. Das lässt sich mit Grunt komplett automatisieren: Bower Update mit `grunt-contrib-exec`, kopieren mit `grunt-contrib-copy`.

**Früher so:** Neues Modul herunterladen, auspacken, ins Shop-Verzeichnis kopieren. Im Explorer ist es herumgeklicke, auf der Kommandozeile einiges an Tipperei.  
**Heute so:** Neues Modul in `bower.json` eintragen, `grunt` ausführen, fertig.

<!--more-->

## Spannende Module als Übungs-Beispiele

Die GitHub Organisation [OXID Projects][2] forkt alle auf GitHub verfügbaren Module und schafft damit einen Überblick. Unter anderen sind dort folgende Perlen, die nachfolgend automatisch installiert werden sollen:

*   [vanilla-thunder/bla-tinymce][3] **TinyMCE für die CE-Edition** *Tiny MCE for OXID eShop CE 4.7 - 4.9*
*   [vanilla-thunder/vt-devutils][4] **Entwickler-Tools** *helpful functions for OXID developing*
*   [vanilla-thunder/ag-isal][5] **Endlos-Artikellisten** mit Lazy-Load *infinite scrolling articlelists*
*   [EllisV/oxid-console][6] *OXID Console is php console application for OXID Shop. It provides an API for writing various commands. We have shipped very common for every oxid shop project commands out of the box.*
*   [DSB/Oxid-Module-IDE-Helper][7] generiert Helfer-Klassen (`*_parent`) damit man in z.B. PhpStorm gut arbeiten kann *Oxid Module that creates parent classes on disk which helps IDEs to do auto completion in OXID code*
*   [druteika/oxid_module_generator][8] ein **Modul-Generator**! *Folders structure, empty classes and metadata generation for new OXID eShop modules.*
*   [OXIDCookbook/Cookbook_GER1][9] **Code-Beispiele vom OXID-Kochbuch** *All code examples from the german book. The official repo of edition 1.* (nun auch schon 2 Jahre alt)

BTW: [@vanilla_thunder][10] hat da ein paar [tolle Module auf GitHub][11] am Start!

## Installation Grunt und Bower via NPM

Ein [installiertes Node.js][12] wird vorausgesetzt. Zunächst muss **Bower**, **Grunt** und alle nötigen Module installiert werden. Dazu wird im Shop-Hauptverzeichnis eine `./package.json` platziert mit folgenden Inhalt:

    {
      "name": "oxid-shop",
      "version": "1.0.0",
      "devDependencies": {
        "bower": "*"
        "grunt": "*",
        "grunt-cli": "*",
        "grunt-contrib-exec": "*",
        "grunt-contrib-copy": "*",
        "grunt-check-modules": "*",
        "load-grunt-config": "*"
      }
    }


Die Node.js-Module `grunt-cli` und `bower` sollten global installiert werden und sind nur der Vollständigkeit halber aufgeführt. Also:

    node install -g bower
    node install -g grunt-cli


Jetzt alle Node.js Module aus der `package.json` installieren:

    node install


Als nächstes wird die Bower-Konfiguration `./bower.json` im Hauptverzeichnis platziert. Hier stehen die Module drin. Da praktisch kein Modul beim offiziellen [Bower-Package-Verzeichnis][13] angemeldet ist, muss jeweils das GitHub-Repo angemeldet werden. Ansonsten würde eine Release-Nummer oder schlicht `"*"` genügen.

    {
      "name": "oxid-shop",
      "version": "1.0.0",
      "dependencies": {
        "oxid-console": "EllisV/oxid-console#1.1.5",
        "oxid-bla-tinymce": "vanilla-thunder/bla-tinymce",
        "oxid-vt-devutils": "vanilla-thunder/vt-devutils",
        "oxid-ag-isal": "vanilla-thunder/ag-isal",
        "oxid-cookbook": "OXIDCookbook/Cookbook_GER1",
        "oxid-Module-IDE-Helper": "DSB/Oxid-Module-IDE-Helper",
        "oxid-module_generator": "druteika/oxid_module_generator"
     },
     "private": true
    }


Bei `oxid-console` wurden Releases erstellt, daher ist hier exemplarisch das aktuelle gepinnt.

Theoretisch könnten wir jetzt `bower install` ausführen und es würden alle Module aus GitHub nach `./bower_components` geklont werden. Das wird später Grunt für uns machen.

## Grunt Einrichtung

Wer Grunt nicht kennt möge bitte die [Einleitung][14] lesen. Grunt ist ein Task-Runner wie Java Ant. Wer dieses kennt, wird Grunt wegen seiner einfachen Konfiguration lieben!

Wir legen also eine `./Gruntfile.js` im Shop-Hauptverzeichnis an.

    module.exports = function(grunt) {
        var path = require('path');

        // Zeitmessung und Auswertung
        require('time-grunt')(grunt);

        // Verteilung der Grunt-Konfiguration auf einzelne Dateien
        require('load-grunt-config')(grunt);
    };


Das Modul `load-grunt-config` ermöglicht es eine saubere und wartbare Grunt-Konfiguration aufzubauen. [Ohne das ist alles doof! *"Supercharge your Gruntfile!"*][15]

Die Tasks werden nun in `./grunt/aliases.yml` definiert.

    default:
    - update_components

    update_components:
      - exec:bower_update
      - copy:oxid_modules


Die Konfiguration zu den Modulen erfolgt in separaten Dateien:

Die für `grunt-contrib-exec` in `./grunt/exec.js`:

    module.exports = function (grunt, options) {
        return {
            bower_update: 'bower update'
        };
    };


Der Task `exec:bower_update` führt also `bower update` durch, welches die Bower-Module installiert.

Die zu `grunt-contrib-copy` in `./grunt/copy.js`:

    module.exports = function (grunt, options) {
        return {
            oxid_modules: {
                files: [
                    {expand: true, cwd: 'bower_components/oxid-ag-isal/copy_this/', src: ['**'], dest: 'shop/'},
                    {expand: true, cwd: 'bower_components/oxid-bla-tinymce/copy_this/', src: ['**'], dest: 'shop/'},
                    {expand: true, cwd: 'bower_components/oxid-console/copy_this/', src: ['**'], dest: 'shop/'},
                    {expand: true, cwd: 'bower_components/oxid-module_generator/copy_this/', src: ['**'], dest: 'shop/'},
                    {expand: true, cwd: 'bower_components/oxid-vt-devutils/copy_this/', src: ['**'], dest: 'shop/'},
                    {expand: true, cwd: 'bower_components/oxid-Module-IDE-Helper/modules/', src: ['**'], dest: 'shop/modules/'}
                ]
            }
        };
    };


Der Task `copy:oxid_modules` kopiert also aus den verschiedenen Bower-Komponenten-Verzeichnissen die benötigten Dateien ins Shop-Module-Verzeichnis.

Damit ist nun alles fertig konfiguriert!

## Task starten

Jetzt starten wir Grunt:

    grunt


Durch die entsprechende Task-Konfigration startet er nun Bower und kopiert anschließend alles ins OXID-Module-Verzeichnis.

## Was haben wir nun damit gewonnen?

Wie eingangs schon erwähnt bei Installation eines neuen Moduls...

**Früher so:** Neues Modul herunterladen, auspacken, ins Shop-Verzeichnis kopieren. Im Explorer ist es herumgeklicke, auf der Kommandozeile einiges an Tipperei.  
**Heute so:** Neues Modul in `bower.json` eintragen, `grunt` ausführen , fertig.

Beim Update vom bestehenden Modul-Zoo - und das werden ja über die Jahre naturgemäß meist mehr denn weniger - wird das ganze dann lästig. Dann ist der manuelle Updateprozess für jedes Modul zu wiederholen.

**Früher so:** zig mal URL eintippen im Browser, herunterladen, auspacken, kopieren.  
**Heute so:** `grunt` ausführen, fertig.

*Anregungen und Kommentare wie immer gerne hier oder auf Twitter.* [@rhflow_de][16]

 [1]: http://www.oxid-esales.com/en/products/facts/oxid-eshop-community-edition/product-information.html
 [2]: https://github.com/OXIDprojects
 [3]: https://github.com/vanilla-thunder/bla-tinymce/
 [4]: https://github.com/vanilla-thunder/vt-devutils
 [5]: https://github.com/vanilla-thunder/ag-isal
 [6]: https://github.com/EllisV/oxid-console
 [7]: https://github.com/DSB/Oxid-Module-IDE-Helper
 [8]: https://github.com/druteika/oxid_module_generator
 [9]: https://github.com/OXIDCookbook/Cookbook_GER1
 [10]: http://forum.oxid-esales.com/member.php?u=10337
 [11]: https://twitter.com/vanilla
 [12]: http://nodejs.org/download/
 [13]: http://bower.io/search/
 [14]: http://gruntjs.com/getting-started
 [15]: http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/
 [16]: https://twitter.com/rhflow_de
