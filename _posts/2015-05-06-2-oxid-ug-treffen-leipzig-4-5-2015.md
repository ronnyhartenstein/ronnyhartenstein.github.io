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
excerpt: |+
  <p>Das 2. OXID UG Treffen war mein Erstes. In der heimeligen Atmosph&auml;re des neuen pixi* B&uuml;ro-Dachstuhls fand dieses statt. Mit dabei waren sogar zwei Hunde, ein Blindenhund und meine Tammi. Als Agenturen waren D3 und Marmalade vor Ort und haben jeweils zwei ihrer Module vorgestellt. Ich hab zum Schluss noch ein kleines Azure-Responsive-Experiment und Docker vorgestellt. Da Marmalade u.a. neue Kollegen aus Litauen dabei wurde zum Teil auch Englisch gesprochen.<&#47;p>

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
<p>Das 2. OXID UG Treffen war mein Erstes. In der heimeligen Atmosph&auml;re des neuen pixi* B&uuml;ro-Dachstuhls fand dieses statt. Mit dabei waren sogar zwei Hunde, ein Blindenhund und meine Tammi. Als Agenturen waren D3 und Marmalade vor Ort und haben jeweils zwei ihrer Module vorgestellt. Ich hab zum Schluss noch ein kleines Azure-Responsive-Experiment und Docker vorgestellt. Da Marmalade u.a. neue Kollegen aus Litauen dabei wurde zum Teil auch Englisch gesprochen.<&#47;p></p>
<p><a id="more"></a><a id="more-712"></a></p>
<h2>D3 Development<&#47;h2></p>
<p>Die Agentur ist bei GitHub unter <a href="http:&#47;&#47;github.com&#47;d3datadevelopment">d3datadevelopment<&#47;a> zu finden. Vorgestellt wurden TPL Develop Tool und der Auftragsmanager.<&#47;p></p>
<h3>TPL Develop Tool<&#47;h3></p>
<p>Dieses Modul erm&ouml;glicht eine schnelle Entwicklung von Formular-Abschluss-Templates (Thankyou-Seite) und Bestell-Email-Templates, indem diese Schritte per Parameter direkt aufgerufen wird. Dann wird die letzte abgeschlossene Bestellung direkt nochmal angezeit. Das Modul ist Opensource bei GitHub <a href="https:&#47;&#47;github.com&#47;d3datadevelopment&#47;TPL-development-helper">d3datadevelopment&#47;TPL-development-helper<&#47;a>. Ich finde das eine super Sache, da das genau die Workflow-Schritte sind, deren Entwicklung nervig ist und enorm Zeit frisst.<&#47;p></p>
<h3>Auftragsmanager<&#47;h3></p>
<p>Dieses Modul kann l&auml;stige Routineaufgaben automatisieren und ist damit ideal f&uuml;r Kunden ohne ERP-Backend. Damit l&auml;sst sich z.B. ein automatisches Umsortieren von Bestellungen in Ordnern realisieren. Verschiedene Cronjob-Zyklen werden per Cron-IDs realisiert. Jeder Cronjob-Aufruf startet mit einer ID. Nur Aufgaben mit dieser ID werden dann gepr&uuml;ft und abgearbeitet. Netter Kniff!<br />
Weitere Aufgaben-Ideen werden schon mitgeliefert, um die M&ouml;glichkeiten zu verstehen - u.a. Umsortieren von Kunden in andere Gruppen, z.B. wenn Rechnungen nach einer bestimmten Zeit noch nicht bezahlt wurden (um Rabatte automatisch zu deaktivieren).<br />
Das Modul ist nicht Opensource, kann aber f&uuml;r bis zu 5 Aufgaben kostenfrei verwendet werden. Mehr Infos <a href="http:&#47;&#47;www.oxidmodule.com&#47;OXID-Professional-Community&#47;Module-PE&#47;Auftragsmanager-fuer-Oxid-PE.html">hier<&#47;a>.<&#47;p></p>
<h2>Marmalade<&#47;h2></p>
<p>Die Agentur ist bei GitHub unter <a href="https:&#47;&#47;github.com&#47;marmaladeDE">marmaladeDE<&#47;a> zu finden. Vorgestellt wurden yamm und der Filial-Finder.<&#47;p></p>
<h3>yamm (Jet another Meta Module) Modulkonfig<&#47;h3></p>
<p>Bei Shops mit sehr vielen Modulen ist die Reihenfolge der Modulaktivierung wichtig. Beim Crash hilft manchmal nur, in der DB die Modulliste und Vererbungsliste zu reseten und die Module nacheinander wieder zu aktivieren. Bei Shops mit 50+ Modulen ein Herkulesakt. Abhilfe schafft eine versionierbare Konfigdatei, die beim Deployment f&uuml;r die korrekte Aktivierung sorgt. Das Modul ist auf GitHub <a href="http:&#47;&#47;github.com&#47;marmaladeDE&#47;yamm">marmaladeDE&#47;yamm<&#47;a> zu finden. Die Erzeugung der initialen Konfigdatei kann bequem per Backend erfolgen, ist aber wohl noch nicht 100% stabil.<br />
Spannend ist das Ganze schon, wenn man Module hat, die andere Module erweitern - z.B. das Paypal-Modul. Denn dann muss das Modul tats&auml;chlich <em>nach<&#47;em> Paypal aktiviert werden.<&#47;p></p>
<h3>Filial-Finder &#47; Storelocator<&#47;h3></p>
<p>Damit ist es m&ouml;glich, im Bestellprozess den Zielort der Lieferung auszuw&auml;hlen - optional per Google-Karte in Lightbox. Die Pflege der Stores erfolgt im Backend - mit Geolocation und Adresse. Im Einsatz ist das Modul u.a. bei <a href="https:&#47;&#47;www.schindelhauerbikes.com&#47;haendler&#47;">Schindelhauer Bikes<&#47;a>.<&#47;p></p>
<h2>Responsive Azure Experiment<&#47;h2></p>
<p>Basierend auf den Erfahrungen aus <a href="http:&#47;&#47;blog.rh-flow.de&#47;2015&#47;03&#47;06&#47;oxid-azure-ins-responsive-zeitalter-katapultieren-mit-bootstrap-sass-und-grunt&#47;">OXID Azure ins Responsive Zeitalter katapultieren<&#47;a> hab ich mal versucht, Azure mit per LESS injizierten Bootstrap responsiv zu machen. &Uuml;bungsbeispiel ist die Startseite. Das Repo befindet sich <a href="https:&#47;&#47;github.com&#47;ronnyhartenstein&#47;oxideshop_ce&#47;tree&#47;responsive-azure">hier<&#47;a> (Branch responsive-azure). So schaut es aktuell aus:<&#47;p></p>
<p>[caption id="attachment_714" align="alignnone" width="1034"]<a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;05&#47;oxid-responsive-comp.gif"><img src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;05&#47;oxid-responsive-comp.gif" alt="OXID Responsive Vorschau" width="1034" height="855" class="size-full wp-image-714" &#47;><&#47;a> OXID Responsive Vorschau[&#47;caption]<&#47;p></p>
<p>Die Idee dabei ist, per <a href="http:&#47;&#47;lesscss.org&#47;">LESS<&#47;a> die <a href="https:&#47;&#47;github.com&#47;twbs&#47;bootstrap&#47;blob&#47;master&#47;less&#47;mixins.less">Mixins von Bootstrap<&#47;a> einzubinden und damit die einzelnen Bl&ouml;cke um Grid-Spalten-Styledefinitionen zu erweitern. Die Less(CSS)-Dateien befinden sich <a href="https:&#47;&#47;github.com&#47;ronnyhartenstein&#47;oxideshop_ce&#47;tree&#47;responsive-azure&#47;source&#47;out&#47;azure-bootstrap&#47;src&#47;css">out&#47;azure-bootstrap&#47;src&#47;css<&#47;a> und verdeutlichen das Vorgehen.<&#47;p></p>
<p>Nach dem Test bin ich mir nicht so recht sicher, ob dass ein Weg ist, um die bestehenden Azure-basierenden Shops per Fingerschnipp (=Update) responsiv zu machen. Grund ist, das man st&auml;ndig an die Grenzen der Zur&uuml;cksetzbarkeit von bestehenden Azure-CSS-Styles st&ouml;&szlig;t und das &uuml;berschreiben von zahlreichen Styles eine unheimlich langatmige Arbeit ist, die kaum Spa&szlig; macht. Bitte ber&uuml;cksichtig, dass meine Meinung auf nur zwei Abenden Arbeit und ein paar Spielereien basiert und zudem annimmt, das bestehende Azure-CSS genau so zu lassen.<&#47;p></p>
<p>Der Weg wird wohl eher sein, dass man ein neues responsives Standard-Theme startet und Azure wie seinerzeit Basic eine zeitlang weiterpflegt um den bestehenden Shops einen sanften &Uuml;bergang zu erm&ouml;glichen.<&#47;p></p>
<p>BTW: Bei der Vorstellung gab mir Thomas Dartsch den Tipp, dass man zum <em>parallelen Test von verschiedenen Viewports<&#47;em> auch die  Firefox Web Dev Toolbar genutzt werden kann: Men&uuml; "Gr&ouml;&szlig;e &auml;ndern" -> "Angepasste Layouts anzeigen". Einfach mal probieren!<&#47;p></p>
<h2>Docker<&#47;h2></p>
<p>Da ich lokal auf meinem Mac nach <a href="http:&#47;&#47;blog.rh-flow.de&#47;2014&#47;11&#47;11&#47;es-hat-sich-ausgemampft-vagrant-ist&#47;">Vagrant<&#47;a> komplett auf <a href="http:&#47;&#47;blog.rh-flow.de&#47;2015&#47;01&#47;25&#47;docker-statt-vagrant-dank-boot2docker-auch-auf-dem-mac&#47;">Docker<&#47;a> setze, hab ich mir f&uuml;r die OXID Tests ein Dockerfile aufgebaut. Der aktuelle Stand findet sich <a href="https:&#47;&#47;github.com&#47;ronnyhartenstein&#47;oxideshop_ce&#47;tree&#47;responsive-azure&#47;docker">hier auf GitHub<&#47;a>. Allerdings gibt es noch kein sch&ouml;nes sauberes <code>Dockerfile<&#47;code> wo alle ben&ouml;tigten PHP-Module und der Apache nach und nach installiert werden, sondern "nur" ein fertiges DockerHub-Image <a href="https:&#47;&#47;registry.hub.docker.com&#47;u&#47;gpayer&#47;apache-php53-oxid-i386&#47;">gpayer&#47;apache-php53-oxid-i386<&#47;a> Geht erstmal auch, wie in der <a href="https:&#47;&#47;github.com&#47;ronnyhartenstein&#47;oxideshop_ce&#47;blob&#47;responsive-azure&#47;docker&#47;rebuild.sh"><code>rebuild.sh<&#47;code><&#47;a>  zu sehen ist, ist aber nicht sch&ouml;n. Als Abh&auml;ngigkeit wird ein laufender Mysql-Docker-Container angenommen. Sofern man eine externe DB hat, die Docker bzw. das OXID darin erreichen kann, kann man den Link weglassen. Mehr dazu folgt noch in einen separaten Blogpost.<&#47;p></p>
<h2>Fazit<&#47;h2></p>
<p>F&uuml;r mich war es spannend, mal wieder aus der eigenen Welt (FinTech) herauszublicken und zu schauen wie andere so arbeiten und mit welchen Problemen sie sich so herumschlagen m&uuml;ssen. Geben und neben - sch&ouml;n wars!<&#47;p></p>
