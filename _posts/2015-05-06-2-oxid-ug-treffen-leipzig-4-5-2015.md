---
layout: post
status: publish
published: true
title: 2. OXID UG Treffen Leipzig 4.5.2015
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
wordpress_id: 712
wordpress_url: http://blog.rh-flow.de/?p=712
date: '2015-05-06 21:21:07 +0200'
date_gmt: '2015-05-06 19:21:07 +0200'
categories:
- OXID
- PHP
- Docker
tags: []
---

Das 2. OXID UG Treffen war mein Erstes. In der heimeligen Atmosphäre des neuen pixi* Büro-Dachstuhls fand dieses statt. Mit dabei waren sogar zwei Hunde, ein Blindenhund und meine Tammi. Als Agenturen waren D3 und Marmalade vor Ort und haben jeweils zwei ihrer Module vorgestellt. Ich hab zum Schluss noch ein kleines Azure-Responsive-Experiment und Docker vorgestellt. Da Marmalade u.a. neue Kollegen aus Litauen dabei wurde zum Teil auch Englisch gesprochen.

<!--more-->

## D3 Development

Die Agentur ist bei GitHub unter [d3datadevelopment][1] zu finden. Vorgestellt wurden TPL Develop Tool und der Auftragsmanager.

### TPL Develop Tool

Dieses Modul ermöglicht eine schnelle Entwicklung von Formular-Abschluss-Templates (Thankyou-Seite) und Bestell-Email-Templates, indem diese Schritte per Parameter direkt aufgerufen wird. Dann wird die letzte abgeschlossene Bestellung direkt nochmal angezeit. Das Modul ist Opensource bei GitHub [d3datadevelopment/TPL-development-helper][2]. Ich finde das eine super Sache, da das genau die Workflow-Schritte sind, deren Entwicklung nervig ist und enorm Zeit frisst.

### Auftragsmanager

Dieses Modul kann lästige Routineaufgaben automatisieren und ist damit ideal für Kunden ohne ERP-Backend. Damit lässt sich z.B. ein automatisches Umsortieren von Bestellungen in Ordnern realisieren. Verschiedene Cronjob-Zyklen werden per Cron-IDs realisiert. Jeder Cronjob-Aufruf startet mit einer ID. Nur Aufgaben mit dieser ID werden dann geprüft und abgearbeitet. Netter Kniff! Weitere Aufgaben-Ideen werden schon mitgeliefert, um die Möglichkeiten zu verstehen - u.a. Umsortieren von Kunden in andere Gruppen, z.B. wenn Rechnungen nach einer bestimmten Zeit noch nicht bezahlt wurden (um Rabatte automatisch zu deaktivieren). Das Modul ist nicht Opensource, kann aber für bis zu 5 Aufgaben kostenfrei verwendet werden. Mehr Infos [hier][3].

## Marmalade

Die Agentur ist bei GitHub unter [marmaladeDE][4] zu finden. Vorgestellt wurden yamm und der Filial-Finder.

### yamm (Jet another Meta Module) Modulkonfig

Bei Shops mit sehr vielen Modulen ist die Reihenfolge der Modulaktivierung wichtig. Beim Crash hilft manchmal nur, in der DB die Modulliste und Vererbungsliste zu reseten und die Module nacheinander wieder zu aktivieren. Bei Shops mit 50+ Modulen ein Herkulesakt. Abhilfe schafft eine versionierbare Konfigdatei, die beim Deployment für die korrekte Aktivierung sorgt. Das Modul ist auf GitHub [marmaladeDE/yamm][5] zu finden. Die Erzeugung der initialen Konfigdatei kann bequem per Backend erfolgen, ist aber wohl noch nicht 100% stabil. Spannend ist das Ganze schon, wenn man Module hat, die andere Module erweitern - z.B. das Paypal-Modul. Denn dann muss das Modul tatsächlich *nach* Paypal aktiviert werden.

### Filial-Finder / Storelocator

Damit ist es möglich, im Bestellprozess den Zielort der Lieferung auszuwählen - optional per Google-Karte in Lightbox. Die Pflege der Stores erfolgt im Backend - mit Geolocation und Adresse. Im Einsatz ist das Modul u.a. bei [Schindelhauer Bikes][6].

## Responsive Azure Experiment

Basierend auf den Erfahrungen aus [OXID Azure ins Responsive Zeitalter katapultieren][7] hab ich mal versucht, Azure mit per LESS injizierten Bootstrap responsiv zu machen. Übungsbeispiel ist die Startseite. Das Repo befindet sich [hier][8] (Branch responsive-azure). So schaut es aktuell aus:

[caption id="attachment_714" align="alignnone" width="1034"][<img src="http://rhflow.wp-root.rh-flow.de/files/2015/05/oxid-responsive-comp.gif" alt="OXID Responsive Vorschau" width="1034" height="855" class="size-full wp-image-714" />][9] OXID Responsive Vorschau[/caption]

Die Idee dabei ist, per [LESS][10] die [Mixins von Bootstrap][11] einzubinden und damit die einzelnen Blöcke um Grid-Spalten-Styledefinitionen zu erweitern. Die Less(CSS)-Dateien befinden sich [out/azure-bootstrap/src/css][12] und verdeutlichen das Vorgehen.

Nach dem Test bin ich mir nicht so recht sicher, ob dass ein Weg ist, um die bestehenden Azure-basierenden Shops per Fingerschnipp (=Update) responsiv zu machen. Grund ist, das man ständig an die Grenzen der Zurücksetzbarkeit von bestehenden Azure-CSS-Styles stößt und das überschreiben von zahlreichen Styles eine unheimlich langatmige Arbeit ist, die kaum Spaß macht. Bitte berücksichtig, dass meine Meinung auf nur zwei Abenden Arbeit und ein paar Spielereien basiert und zudem annimmt, das bestehende Azure-CSS genau so zu lassen.

Der Weg wird wohl eher sein, dass man ein neues responsives Standard-Theme startet und Azure wie seinerzeit Basic eine zeitlang weiterpflegt um den bestehenden Shops einen sanften Übergang zu ermöglichen.

BTW: Bei der Vorstellung gab mir Thomas Dartsch den Tipp, dass man zum *parallelen Test von verschiedenen Viewports* auch die Firefox Web Dev Toolbar genutzt werden kann: Menü "Größe ändern" -> "Angepasste Layouts anzeigen". Einfach mal probieren!

## Docker

Da ich lokal auf meinem Mac nach [Vagrant][13] komplett auf [Docker][14] setze, hab ich mir für die OXID Tests ein Dockerfile aufgebaut. Der aktuelle Stand findet sich [hier auf GitHub][15]. Allerdings gibt es noch kein schönes sauberes `Dockerfile` wo alle benötigten PHP-Module und der Apache nach und nach installiert werden, sondern "nur" ein fertiges DockerHub-Image [gpayer/apache-php53-oxid-i386][16] Geht erstmal auch, wie in der [`rebuild.sh`][17] zu sehen ist, ist aber nicht schön. Als Abhängigkeit wird ein laufender Mysql-Docker-Container angenommen. Sofern man eine externe DB hat, die Docker bzw. das OXID darin erreichen kann, kann man den Link weglassen. Mehr dazu folgt noch in einen separaten Blogpost.

## Fazit

Für mich war es spannend, mal wieder aus der eigenen Welt (FinTech) herauszublicken und zu schauen wie andere so arbeiten und mit welchen Problemen sie sich so herumschlagen müssen. Geben und neben - schön wars!

 [1]: http://github.com/d3datadevelopment
 [2]: https://github.com/d3datadevelopment/TPL-development-helper
 [3]: http://www.oxidmodule.com/OXID-Professional-Community/Module-PE/Auftragsmanager-fuer-Oxid-PE.html
 [4]: https://github.com/marmaladeDE
 [5]: http://github.com/marmaladeDE/yamm
 [6]: https://www.schindelhauerbikes.com/haendler/
 [7]: http://blog.rh-flow.de/2015/03/06/oxid-azure-ins-responsive-zeitalter-katapultieren-mit-bootstrap-sass-und-grunt/
 [8]: https://github.com/ronnyhartenstein/oxideshop_ce/tree/responsive-azure
 [9]: http://rhflow.wp-root.rh-flow.de/files/2015/05/oxid-responsive-comp.gif
 [10]: http://lesscss.org/
 [11]: https://github.com/twbs/bootstrap/blob/master/less/mixins.less
 [12]: https://github.com/ronnyhartenstein/oxideshop_ce/tree/responsive-azure/source/out/azure-bootstrap/src/css
 [13]: http://blog.rh-flow.de/2014/11/11/es-hat-sich-ausgemampft-vagrant-ist/
 [14]: http://blog.rh-flow.de/2015/01/25/docker-statt-vagrant-dank-boot2docker-auch-auf-dem-mac/
 [15]: https://github.com/ronnyhartenstein/oxideshop_ce/tree/responsive-azure/docker
 [16]: https://registry.hub.docker.com/u/gpayer/apache-php53-oxid-i386/
 [17]: https://github.com/ronnyhartenstein/oxideshop_ce/blob/responsive-azure/docker/rebuild.sh
