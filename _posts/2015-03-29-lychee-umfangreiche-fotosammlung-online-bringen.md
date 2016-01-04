---
layout: post
status: publish
published: true
title: 'Lychee: Umfangreiche Fotosammlung online bringen'
author:
  display_name: ''
  login: ''
  email: ''
  url: ''

wordpress_id: 668
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=668
date: '2015-03-29 20:22:59 +0200'
date_gmt: '2015-03-29 18:22:59 +0200'
categories:
- Allgemein
- Fotografie
- DevOp
tags: []
---

Schon Jahre habe ich das Problem, dass ich meine sehr umfangreiche Fotosammlung gerne auf Smartphone, iPad und Computer online abrufen möchten. Und das bitte selbst gehostet. Diese umfasst mittlerweile rund **61\.000 Bilder** in rd. **1500 Alben** und bringt in der Die Thumbnail-Version (runterskaliert auf max. 2048x2048) immerhin rund **13 GB** auf die Waage.

Der Shootingstar [**Lychee**][1] ist nun die Lösung. t3n [berichtete][2] Ende 2014 darüber und jetzt hat es auch noch - wie heise.de [berichtet][3] - den Open-Source-Preis 2014 von buch7.de gewonnen (neben Bloonix und CiviCRM). Zeit sich das ganze anzuschauen.

**TL;DR** Leider funktionieren diese Bildermassen derzeit nicht über eine Lychee-Instanz, sodass ich je Jahr eine separate DB angelegt habe. Der Import läuft per `lycheesync` je Jahr-Ordner. Die Umschaltung der DB erfolgt über Erkennung des Unterverzeichnisses in der `data/config.php`.

<!--more-->

Lychee läuft mit PHP 5.3 und ist [fix installiert][4]. Meine bestehende Fotosammlung sollte natürlich automatisch importiert werden. Dazu gibt es [**Lycheesync**][5]. Dieses benötigt Python 2.7 - Ubuntu 10.04 LTS bringt aber nur 2.6 mit. Der Sport bestand also, Python 2.6 als systemweite Version (inkl. Module) zu behalten und nur für das Importscript 2.7 zu nutzen - inkl. notwendiger Module.

## PyEnv: andere Python Version parallel installieren

Nach einiger Tests mit [Virtualenv][6] bin ich auf [**PyEnv**][7] was für meine Zwecke einfacher einzusetzen ist.

Installiert hab ich es unter `root/.pyenv` lt. [Anleitung (GitHub-Checkout)][8]. Dann so:

    pyenv install 2.7.8
    pyenv global 2.7.8


Nunmehr auf Python 2.7.8 gewechselt (ggf. `exec $SHELL` durchführen um `.bashrc` neu zu laden) nun noch nötige Module mit Pip installieren.

Erst ein paar Pakete ..

    apt-get install libjpeg libjpeg-dev libfreetype6 libfreetype6-dev zlib1g-dev
    apt-get install python-imaging
    apt-get install libjpeg-dev libfreetype6-dev zlib1g-dev libpng12-dev
    apt-get install libmysqlclient-dev


Dann die Python-Module ..

    pip install dateutils
    pip install MySQL-python
    pip install PIL --allow-external PIL --allow-unverified PIL


## Import vom Album-Ordner

Struktur der Ordner bei mir:

    httpdocs/albums
    httpdocs/lychee
    lycheesync
    sync.sh


**Regelmäßige Aktualisierung nach Upload: `sync.sh`**

Ich lade unregelmäßig gleich einen Berg Fotos per SSH hoch die dann synchronisiert werden soll..

    #!/bin/bash
    cd lycheesync
    nohup python main.py ../httpdocs/albums ../httpdocs/lychee conf.json


In der `conf.json` muss die Datenbankverbindung zur bereits bestehenden Lychee-DD konfiguriert werden.. Per `nohup` wird der Sync-Prozess in den Hintergrund gedrückt. Gut, da es seeehr seehr lange dauern kann.

## Zwischenfazit: Sammlung "sprengt" Lychee

Der Umfang meiner Sammlung sprengt momentan die Möglichkeiten von Lychee. Da noch keine Unterordner in jeglicher Form unterstütz werden, landen natürlich alle Alben in Ebene 1. Und da die Startseite wohl auch kein Lazy-Load oder sonstwelche Optimierungen hat, werden halt dann 1500 Alben angezeigt - was das ganze damit leider unbenutzbar macht.

# Vertikale Unterteilung

Da alles in einer Lychee-DB derzeit nicht geht, ist die Idee, es vertikal in eine DB je Jahr aufzuteilen. Die Verteilung der Massen ist derzeit wie folgt:

*   Jahr / Alben / Fotos / Größe in MB
*   **1970-1990** / 22 / 345 / 48 MB
*   **1990-2001** / 17 / 139 / 17 MB
*   **2002** / 16 / 340 / 44 MB
*   **2003** / 33 / 724 / 107 MB
*   **2004** / 76 / 1784 / 243 MB
*   **2005** / 374 / 18127 / 2754 MB
*   **2006** / 80 / 1142 / 187 MB
*   **2007** / 41 / 1614 / 276 MB
*   **2008** / 51 / 2369 / 539 MB
*   **2009** / 338 / 11632 / 2773 MB
*   **2010** / 267 / 9436 / 2175 MB
*   **2011** / 168 / 6637 / 5084 MB
*   **2012** / 80 / 2462 / 3581 MB
*   **2013** / 64 / 2729 / 3895 MB
*   **2014** / 35 / 1885 / 2924 MB

Es bietet sich also an, für 1970-2003 eine DB zu machen, dann je Jahr eine weitere DB. Die Lychee-Installation soll dann abhängig vom Unterverzeichnis, z.B. `/2010`, die entsprechende DB kontaktieren. Updates dazu folgen.

## eine DB je Jahr

Leider kann man `lycheesync` kein Tabellen-Prefix mitgeben, daher lege ich pro Jahr eine DB an - also z.B. DB `lychee_2014` mit Nutzer `lychee_2014`.

Lychee-DB anlegen (Stand Version 2.7)

    CREATE TABLE `lychee_albums` (  `id` int(11) NOT NULL AUTO_INCREMENT,  `title` varchar(50) NOT NULL,  `description` varchar(1000) DEFAULT '',  `sysstamp` int(11) NOT NULL,  `public` tinyint(1) NOT NULL DEFAULT '0',  `visible` tinyint(1) NOT NULL DEFAULT '1',  `downloadable` tinyint(1) NOT NULL DEFAULT '0',  `password` varchar(100) DEFAULT NULL,  PRIMARY KEY (`id`)) ENGINE=MyISAM AUTO_INCREMENT=1146 DEFAULT CHARSET=utf8;
    CREATE TABLE `lychee_log` (  `id` int(11) NOT NULL AUTO_INCREMENT,  `time` int(11) NOT NULL,  `type` varchar(11) NOT NULL,  `function` varchar(100) NOT NULL,  `line` int(11) NOT NULL,  `text` text,  PRIMARY KEY (`id`)) ENGINE=MyISAM DEFAULT CHARSET=utf8;
    CREATE TABLE `lychee_photos` (  `id` bigint(14) NOT NULL,  `title` varchar(50) NOT NULL,  `description` varchar(1000) DEFAULT '',  `url` varchar(100) NOT NULL,  `tags` varchar(1000) NOT NULL DEFAULT '',  `public` tinyint(1) NOT NULL,  `type` varchar(10) NOT NULL,  `width` int(11) NOT NULL,  `height` int(11) NOT NULL,  `size` varchar(20) NOT NULL,  `iso` varchar(15) NOT NULL,  `aperture` varchar(20) NOT NULL,  `make` varchar(50) DEFAULT NULL,  `model` varchar(50) NOT NULL,  `shutter` varchar(30) NOT NULL,  `focal` varchar(20) NOT NULL,  `takestamp` int(11) DEFAULT NULL,  `star` tinyint(1) NOT NULL,  `thumbUrl` varchar(50) NOT NULL,  `album` varchar(30) NOT NULL DEFAULT '0',  `checksum` varchar(100) DEFAULT NULL,  `medium` tinyint(1) NOT NULL DEFAULT '0',  PRIMARY KEY (`id`)) ENGINE=MyISAM DEFAULT CHARSET=utf8;
    CREATE TABLE `lychee_settings` (  `key` varchar(50) NOT NULL DEFAULT '',  `value` varchar(200) DEFAULT '') ENGINE=MyISAM DEFAULT CHARSET=utf8;


Lychee-Einstellungen kopieren aus Original-DB `lychee`:

    INSERT INTO lychee_settings SELECT * FROM lychee.lychee_settings


Mein Sync-Script:

    #!/bin/bash
    # ggf. exec $SHELL ausführen

    pyenv global 2.7.8

    cd lycheesync

    JAHR=$1
    ALBUMS=/media/fotos-thumbs/$JAHR
    LYCHEE=../httpdocs/lychee
    CONF=conf_$JAHR.json
    LOG=../logs/sync_$JAHR.log

    nohup python main.py $ALBUMS $LYCHEE $CONF > $LOG &


Per Kommandozeile dann pro Jahr dann so:

    ./sync.sh 2014


So nach und nach können damit alle Jahre sauber importiert werden. Die `nohup` Logs werden ebenfalls jeweils separat geschrieben und später auf Fehler geprüft werden.

## Lychee erkennt Unterverzeichnisse

Der Webaufruf eines Jahres soll z.B. `/2014` sein. Intern soll natürlich alles über eine Lychee-Instanz funktionieren. Die Umschaltung erfolgt direkt in der Lychee-Konfiguration `data/config.php`.

.. $tmp = explode('/',$*SERVER['SCRIPT_NAME']); .. $dbName = 'lychee*'.$tmp[1][1]; ..

## Fazit

Mit dieser Unterteilung funktioniert es für mich derzeit gut. Es bleibt abzuwarten wie sich Lychee weiterentwickelt. Da es Opensource ist, kann man natürlich auch selbst die fehlenden Features ergänzen. Mal schauen..

 [1]: http://lychee.electerious.com/
 [2]: http://t3n.de/news/foto-management-lychee-schick-einfach-open-source-578992/
 [3]: http://www.heise.de/open/meldung/Auszeichnungen-fuer-Open-Source-Projekte-2584459.html
 [4]: https://github.com/electerious/Lychee/blob/master/docs/Installation.md
 [5]: https://github.com/GustavePate/lycheesync
 [6]: http://docs.python-guide.org/en/latest/dev/virtualenvs/
 [7]: https://github.com/yyuu/pyenv
 [8]: https://github.com/yyuu/pyenv#basic-github-checkout
