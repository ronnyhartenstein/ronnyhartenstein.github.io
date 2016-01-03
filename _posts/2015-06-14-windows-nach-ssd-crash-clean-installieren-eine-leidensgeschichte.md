---
layout: post
status: publish
published: true
title: Windows nach SSD Crash clean installieren. Eine Leidensgeschichte.
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
wordpress_id: 719
wordpress_url: http://blog.rh-flow.de/?p=719
date: '2015-06-14 21:46:59 +0200'
date_gmt: '2015-06-14 19:46:59 +0200'
categories:
- Allgemein
tags: []
---
Und plötzlich froh der Laptop ein. Das hat er ja noch nie gemacht. Beim Reset startete Windows auch nicht mehr. Automatische Reparaturversuche schlugen fehl, das Fehlerbild ist uneinheitlich.

Bei näherer Betrachtung der dann ausgebauten SSD zeigten sich Blasen im Aufkleber. Wird sie nicht etwa zu heiß gelaufen sein? Blöd, aber ist ja nur das Betriebssystem drauf und die Programme. Regelmäßige Datenbackups gibt es, alle relevanten Daten liegen eh auf einer HDD. Aber das letzte Vollbackup stammt leider aus Anfang 2014, regelmäßige automatische Vollbackups (Hot Snapshots) a la Apples Timemachine hat Microsoft ja bis heute wohl noch nicht hinbekommen. Woran liegt das bloß? Gibts das bei Windows 10? Weiß das wer?

Da der Laptop eh verkauft werden soll, und die SSD bereits seit immerhin 6 Monaten aus der Gewährleistung ist, hab ich kurzerhand eine neue bei Amazon bestellt. Laptops mit SSD verkaufen sich besser, sagt man. Laptops ohne SSD würde ich gar nicht mehr kaufen.

Mein total waghalsiger Plan ist es nun, Windows 8.1 clean drauf zu installieren. Zur Verfügung hab ich *kein* Installationsmedium und *keinen* funktionierenden Windows PC/Laptop, sondern nur mein Macbook. Herzlichen Glückwunsch.

## TL;DR

Das ISO für eine Clean-Install lässt sich am Mac nur aus einer laufenden Windows VirtualBox herunterladen. Booten und installieren vom Stick geht super. Aber mit nur einen Windows 8 Upgrade-Key lässt sich keine Clean-Install aktivieren. Lösung lt. Microsoft Hotline wäre Windows 7 Clean Install mit Windows 7 Key, dann normales Upgrade mit Upgrade-Key. Den Windows 7 Key hab ich nicht mehr. Das Systembackup lässt sich auf eine aktuelle eigentlich baugleiche SSD auch nicht wiederherstellen, da die neue SSD kleiner ist (120 GB statt 126 GB). Ende. Aus. Mir fehlen weitere Ideen und völlig das Verständnis für diese Lizenzpolitik. Betteln an der Hotline wollte ich nun auch nicht.

<!--more-->

## Installationsmedium besorgen

Aber nun der Reihe nach. Recherchen ergeben, dass man die Windows 8 ISO tatsächlich mittlerweile herunterladen kann, allerdings nur per Spezialprogamm [mediacreationtool][1] . Aber auf, Mac? VirtualBox ist ja vorhanden, aber deswegen ein Windows installieren nur für den Download? Ach ja ich hab ja kein ISO. Aber es gibt gottseidank [modern.ie][2] - dort bekommt man fertige VirtualBox-Container. Flux die 3,7GB heruntergeladen (Win7+IE10), Download-Verzeichnis gemountet (lesen+schreiben!), gestartet, Downloadtool gestartet, Windows 8.1 Pro DE ausgewählt und Download gestartet .. und gewartet bis nochmal knapp 3,8GB gelden waren. (Danke an modernes Internet mit 8 MBit!). Mittels [Unetbootin für Mac][3] lässt sich dieses ISO dann auf einen 4GB Memorystick installieren. Puh.

## Installation mit Hindernissen

Stick in Laptop rein, Security-Modus im BIOS ausschalten und Boot-Reihenfolge geändert, dann vom Stick gestartet. Läuft! SSD als Zielmedium gewählt und dann Seriennummer eingeben. Ich hab ja meine original gekaufte vom Windpws 8 Pro Upgrade. Funktioniert bestimmt. Dachte ich.

Leider nicht, ich habe dann mit einen offiziellen [generischen Key][4] (Eingeständnis eigenen Key-Wahnsinns seitens MS?) die Installation durchführen können. Die Aktivierung in Windows später mit dem (wohlgemerkt gekauften) Upgrade-Key sollte ja möglich sein. Nope, Geht nicht. Ratlos rief ich die Hotline an.

## Spaß mit der Microsoft-Hotline

Die Hotline ist nur von 8-18 Uhr erreichbar. Was macht man wenn man Abends nicht weiterkommt .. so mit einen eigenen gekauften Key der von Windows abgelehnt wird? Nix, warten auf den nächsten Tag. Es gibt keinen Plan B bei MS.

Am nächsten Tag, nachdem ich mühsam gelernt hatte wie ich durch die Hotline tatsächlich zu einen Menschen gelange (1142 wenn ich mich recht erinnere) hatte ich dann einen Mann am Telefon, der wohl schon so einiges erlebt hat am Telefon. Er hat mir erklärt, das ich mit meinen Upgrad-Key nur eine Windows 7 Installation mit Windows 8 bespielen kann. Ich müsste also erst Windows 7 mit meinen Original-Key installieren. Blöderweise hab ich den nicht mehr, und beim auslesen des OEM-Keys vom Laptop (ja, ich hab eigentlich sogar noch einen gültigen Key) wurde wohl nur der Key vom Mediacenter ausgegeben (Warum eigentlich einer extra?). Er konnte (wollte?) mir leider leider auch nicht meinen Windows-Key zum Mediacenter-Key nennen, die wären wohl nicht gekoppelt (würde micht wundern wenn nicht). Da war ich dann doch etwas ungehalten geworden. Meine Zusammenfassung der Sachlage hat er dann nur eher wiederwillig bestätigt .. nach 5 Sekunden Pause. Vermutlich weil die Gespäche aufgezeichnet werden. Nun gut, ich hab ja noch das alte Vollbackup.

## Vollbackup wiederherstellen

Eigentlich wollte ich es vermeiden, alte Daten vor dem Verkauf einzuspielen. Aber so ohne gültige Windows-Installation ist ja auch blöd. Ok, also Windows im Reparaturmodus booten. Ist doch eigentlich F8 oder? Naja, `shutdown /r /o` tuts auch. Im dritten Untermenü dann "Systemimage-Wiederherstellung" gewählt und los ging es. Fast. Wiederherstellen geht nicht auf die aktuell ausgeführte Systemumgebung. Man muss von einen Installationsmedium booten und daraus dann machen. Was. Für. Eine. Scheiße.

Also wieder den Bootstick reingesteckt und davon gebootet. Leider ist die neue SSD - auch eine 128GB, auch von SanDisk, auch das kleinste günstigste Modell, also eigentlich nur 2 Jahre jünger - wohl ein paar GB zu klein. Damit bricht die Wiederherstellung mit einen Fehler ab: "Es wurde kein Datenträger gefunden der zur Wiederherstellung verwendet werden kann."

Auch die Anleitung von caschy ["Windows 8.1 [..] mit Upgrade-Key installieren und aktivieren"][5] wobei über die Kommandozeile das Tool `slmgr.vbs` der Key eingeimpft wird, scheitert. Hier endet mein Latein. Ich werde den Key einfach beim Verkauf mitgeben.

## Vergleich: System-Wiederherstellung beim Mac

Mal abgesehen von den Größenproblem.. nennt mich Fanboy oder nicht, Backup können die Jungs bei Apple. Backup-Festplatte ran, beim Booten eine Tastenkombination drücken, "machen" auswählen, fertig. Kein Bootmedium. Geht einfach. Liebe Jungs von Microsoft, gut euch TimeMachine an und kopiert es. Wenigstens für Europa. Es gibt bei uns keine Software-Patente. Die Lösung von Apple ist gut und einfach dabei. Was allerdings bei einer kleineren SSD nun passiert wäre, weiß ich nicht.

## Ratlos.

Ich möchte nicht noch Windows 7 installieren und das Upgrade dann durchführen. Auch weil ich die Seriennummer nicht mehr habe. Ich möchte das abkürzen. Das Endergebnis ist das gleiche, ein Windows 8.1 Pro im aktuellen Zustand. Warum kann nicht einfach der Upgrade-Key verwenden? Ich bin das Opfer von billigen SSDs und einer rigiden Lizenzpolitik. Wir wechseln nun komplett zu Apple, da ist das Betriebssystem schlicht kostenlos weil die Hardware schon schweineteuer genug ist. Aber dafür funktioniert der Kram auch einfach.

*Mag sein das mein Szenario recht exotisch ist. Was habt ihr so an haarsträubenden Geschichten mit Systembackup-Restore und/oder der MS Hotline gemacht?*

 [1]: http://windows.microsoft.com/de-de/windows-8/create-reset-refresh-media
 [2]: https://www.modern.ie/de-de/virtualization-tools#downloads
 [3]: http://unetbootin.sourceforge.net/
 [4]: https://social.technet.microsoft.com/Forums/windows/de-DE/4cfcfa8d-57bf-48a9-be77-7c4227637378/windows-8-auf-8-1-von-7-aus?forum=windows8de
 [5]: http://stadt-bremerhaven.de/windows-8-1-iso-erstellen-mit-upgrade-key-installieren-und-aktivieren/
