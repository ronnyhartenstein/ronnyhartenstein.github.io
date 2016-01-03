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
excerpt: |+
  <p>Und pl&ouml;tzlich froh der Laptop ein. Das hat er ja noch nie gemacht. Beim Reset startete Windows auch nicht mehr. Automatische Reparaturversuche schlugen fehl, das Fehlerbild ist uneinheitlich.<&#47;p>

  <p>Bei n&auml;herer Betrachtung der dann ausgebauten SSD zeigten sich Blasen im Aufkleber. Wird sie nicht etwa zu hei&szlig; gelaufen sein? Bl&ouml;d, aber ist ja nur das Betriebssystem drauf und die Programme. Regelm&auml;&szlig;ige Datenbackups gibt es, alle relevanten Daten liegen eh auf einer HDD. Aber das letzte Vollbackup stammt leider aus Anfang 2014, regelm&auml;&szlig;ige automatische Vollbackups (Hot Snapshots) a la Apples Timemachine hat Microsoft ja bis heute wohl noch nicht hinbekommen. Woran liegt das blo&szlig;? Gibts das bei Windows 10? Wei&szlig; das wer?<&#47;p>

  <p>Da der Laptop eh verkauft werden soll, und die SSD bereits seit immerhin 6 Monaten aus der Gew&auml;hrleistung ist, hab ich kurzerhand eine neue bei Amazon bestellt. Laptops mit SSD verkaufen sich besser, sagt man. Laptops ohne SSD w&uuml;rde ich gar nicht mehr kaufen.<&#47;p>

  <p>Mein total waghalsiger Plan ist es nun, Windows 8.1 clean drauf zu installieren. Zur Verf&uuml;gung hab ich <em>kein<&#47;em> Installationsmedium und <em>keinen<&#47;em> funktionierenden Windows PC&#47;Laptop, sondern nur mein Macbook. Herzlichen Gl&uuml;ckwunsch.<&#47;p>

  <h2>TL;DR<&#47;h2>

  <p>Das ISO f&uuml;r eine Clean-Install l&auml;sst sich am Mac nur aus einer laufenden Windows VirtualBox herunterladen. Booten und installieren vom Stick geht super. Aber mit nur einen Windows 8 Upgrade-Key l&auml;sst sich keine Clean-Install aktivieren. L&ouml;sung lt. Microsoft Hotline w&auml;re Windows 7 Clean Install mit Windows 7 Key, dann normales Upgrade mit Upgrade-Key. Den Windows 7 Key hab ich nicht mehr. Das Systembackup l&auml;sst sich auf eine aktuelle eigentlich baugleiche SSD auch nicht wiederherstellen, da die neue SSD kleiner ist (120 GB statt 126 GB). Ende. Aus. Mir fehlen weitere Ideen und v&ouml;llig das Verst&auml;ndnis f&uuml;r diese Lizenzpolitik. Betteln an der Hotline wollte ich nun auch nicht.<&#47;p>

wordpress_id: 719
wordpress_url: http://blog.rh-flow.de/?p=719
date: '2015-06-14 21:46:59 +0200'
date_gmt: '2015-06-14 19:46:59 +0200'
categories:
- Allgemein
tags: []
---
<p>Und pl&ouml;tzlich froh der Laptop ein. Das hat er ja noch nie gemacht. Beim Reset startete Windows auch nicht mehr. Automatische Reparaturversuche schlugen fehl, das Fehlerbild ist uneinheitlich.<&#47;p></p>
<p>Bei n&auml;herer Betrachtung der dann ausgebauten SSD zeigten sich Blasen im Aufkleber. Wird sie nicht etwa zu hei&szlig; gelaufen sein? Bl&ouml;d, aber ist ja nur das Betriebssystem drauf und die Programme. Regelm&auml;&szlig;ige Datenbackups gibt es, alle relevanten Daten liegen eh auf einer HDD. Aber das letzte Vollbackup stammt leider aus Anfang 2014, regelm&auml;&szlig;ige automatische Vollbackups (Hot Snapshots) a la Apples Timemachine hat Microsoft ja bis heute wohl noch nicht hinbekommen. Woran liegt das blo&szlig;? Gibts das bei Windows 10? Wei&szlig; das wer?<&#47;p></p>
<p>Da der Laptop eh verkauft werden soll, und die SSD bereits seit immerhin 6 Monaten aus der Gew&auml;hrleistung ist, hab ich kurzerhand eine neue bei Amazon bestellt. Laptops mit SSD verkaufen sich besser, sagt man. Laptops ohne SSD w&uuml;rde ich gar nicht mehr kaufen.<&#47;p></p>
<p>Mein total waghalsiger Plan ist es nun, Windows 8.1 clean drauf zu installieren. Zur Verf&uuml;gung hab ich <em>kein<&#47;em> Installationsmedium und <em>keinen<&#47;em> funktionierenden Windows PC&#47;Laptop, sondern nur mein Macbook. Herzlichen Gl&uuml;ckwunsch.<&#47;p></p>
<h2>TL;DR<&#47;h2></p>
<p>Das ISO f&uuml;r eine Clean-Install l&auml;sst sich am Mac nur aus einer laufenden Windows VirtualBox herunterladen. Booten und installieren vom Stick geht super. Aber mit nur einen Windows 8 Upgrade-Key l&auml;sst sich keine Clean-Install aktivieren. L&ouml;sung lt. Microsoft Hotline w&auml;re Windows 7 Clean Install mit Windows 7 Key, dann normales Upgrade mit Upgrade-Key. Den Windows 7 Key hab ich nicht mehr. Das Systembackup l&auml;sst sich auf eine aktuelle eigentlich baugleiche SSD auch nicht wiederherstellen, da die neue SSD kleiner ist (120 GB statt 126 GB). Ende. Aus. Mir fehlen weitere Ideen und v&ouml;llig das Verst&auml;ndnis f&uuml;r diese Lizenzpolitik. Betteln an der Hotline wollte ich nun auch nicht.<&#47;p></p>
<p><a id="more"></a><a id="more-719"></a></p>
<h2>Installationsmedium besorgen<&#47;h2></p>
<p>Aber nun der Reihe nach. Recherchen ergeben, dass man die Windows 8 ISO tats&auml;chlich mittlerweile herunterladen kann, allerdings nur per Spezialprogamm <a href="http:&#47;&#47;windows.microsoft.com&#47;de-de&#47;windows-8&#47;create-reset-refresh-media">mediacreationtool<&#47;a> . Aber auf, Mac? VirtualBox ist ja vorhanden, aber deswegen ein Windows installieren nur f&uuml;r den Download? Ach ja ich hab ja kein ISO. Aber es gibt gottseidank <a href="https:&#47;&#47;www.modern.ie&#47;de-de&#47;virtualization-tools#downloads">modern.ie<&#47;a> - dort bekommt man fertige VirtualBox-Container. Flux die 3,7GB heruntergeladen (Win7+IE10), Download-Verzeichnis gemountet (lesen+schreiben!), gestartet, Downloadtool gestartet, Windows 8.1 Pro DE ausgew&auml;hlt und Download gestartet .. und gewartet bis nochmal knapp 3,8GB gelden waren. (Danke an modernes Internet mit 8 MBit!). Mittels <a href="http:&#47;&#47;unetbootin.sourceforge.net&#47;">Unetbootin f&uuml;r Mac<&#47;a> l&auml;sst sich dieses ISO dann auf einen 4GB Memorystick installieren. Puh.<&#47;p></p>
<h2>Installation mit Hindernissen<&#47;h2></p>
<p>Stick in Laptop rein, Security-Modus im BIOS ausschalten und Boot-Reihenfolge ge&auml;ndert, dann vom Stick gestartet. L&auml;uft! SSD als Zielmedium gew&auml;hlt und dann Seriennummer eingeben. Ich hab ja meine original gekaufte vom Windpws 8 Pro Upgrade. Funktioniert bestimmt. Dachte ich.<&#47;p></p>
<p>Leider nicht, ich habe dann mit einen offiziellen <a href="https:&#47;&#47;social.technet.microsoft.com&#47;Forums&#47;windows&#47;de-DE&#47;4cfcfa8d-57bf-48a9-be77-7c4227637378&#47;windows-8-auf-8-1-von-7-aus?forum=windows8de">generischen Key<&#47;a> (Eingest&auml;ndnis eigenen Key-Wahnsinns seitens MS?) die Installation durchf&uuml;hren k&ouml;nnen. Die Aktivierung in Windows sp&auml;ter mit dem (wohlgemerkt gekauften) Upgrade-Key sollte ja m&ouml;glich sein. Nope, Geht nicht. Ratlos rief ich die Hotline an.<&#47;p></p>
<h2>Spa&szlig; mit der Microsoft-Hotline<&#47;h2></p>
<p>Die Hotline ist nur von 8-18 Uhr erreichbar. Was macht man wenn man Abends nicht weiterkommt .. so mit einen eigenen gekauften Key der von Windows abgelehnt wird? Nix, warten auf den n&auml;chsten Tag. Es gibt keinen Plan B bei MS.<&#47;p></p>
<p>Am n&auml;chsten Tag, nachdem ich m&uuml;hsam gelernt hatte wie ich durch die Hotline tats&auml;chlich zu einen Menschen gelange (1142 wenn ich mich recht erinnere) hatte ich dann einen Mann am Telefon, der wohl schon so einiges erlebt hat am Telefon. Er hat mir erkl&auml;rt, das ich mit meinen Upgrad-Key nur eine Windows 7 Installation mit Windows 8 bespielen kann. Ich m&uuml;sste also erst Windows 7 mit meinen Original-Key installieren. Bl&ouml;derweise hab ich den nicht mehr, und beim auslesen des OEM-Keys vom Laptop (ja, ich hab eigentlich sogar noch einen g&uuml;ltigen Key) wurde wohl nur der Key vom Mediacenter ausgegeben (Warum eigentlich einer extra?). Er konnte (wollte?) mir leider leider auch nicht meinen Windows-Key zum Mediacenter-Key nennen, die w&auml;ren wohl nicht gekoppelt (w&uuml;rde micht wundern wenn nicht). Da war ich dann doch etwas ungehalten geworden. Meine Zusammenfassung der Sachlage hat er dann nur eher wiederwillig best&auml;tigt .. nach 5 Sekunden Pause. Vermutlich weil die Gesp&auml;che aufgezeichnet werden. Nun gut, ich hab ja noch das alte Vollbackup.<&#47;p></p>
<h2>Vollbackup wiederherstellen<&#47;h2></p>
<p>Eigentlich wollte ich es vermeiden, alte Daten vor dem Verkauf einzuspielen. Aber so ohne g&uuml;ltige Windows-Installation ist ja auch bl&ouml;d. Ok, also Windows im Reparaturmodus booten. Ist doch eigentlich F8 oder? Naja, <code>shutdown &#47;r &#47;o<&#47;code> tuts auch. Im dritten Untermen&uuml; dann "Systemimage-Wiederherstellung" gew&auml;hlt und los ging es. Fast. Wiederherstellen geht nicht auf die aktuell ausgef&uuml;hrte Systemumgebung. Man muss von einen Installationsmedium booten und daraus dann machen. Was. F&uuml;r. Eine. Schei&szlig;e.<&#47;p></p>
<p>Also wieder den Bootstick reingesteckt und davon gebootet. Leider ist die neue SSD - auch eine 128GB, auch von SanDisk, auch das kleinste g&uuml;nstigste Modell, also eigentlich nur 2 Jahre j&uuml;nger - wohl ein paar GB zu klein. Damit bricht die Wiederherstellung mit einen Fehler ab: "Es wurde kein Datentr&auml;ger gefunden der zur Wiederherstellung verwendet werden kann."<&#47;p></p>
<p>Auch die Anleitung von caschy <a href="http:&#47;&#47;stadt-bremerhaven.de&#47;windows-8-1-iso-erstellen-mit-upgrade-key-installieren-und-aktivieren&#47;">"Windows 8.1 [..] mit Upgrade-Key installieren und aktivieren"<&#47;a> wobei &uuml;ber die Kommandozeile das Tool <code>slmgr.vbs<&#47;code> der Key eingeimpft wird, scheitert. Hier endet mein Latein. Ich werde den Key einfach beim Verkauf mitgeben.<&#47;p></p>
<h2>Vergleich: System-Wiederherstellung beim Mac<&#47;h2></p>
<p>Mal abgesehen von den Gr&ouml;&szlig;enproblem.. nennt mich Fanboy oder nicht, Backup k&ouml;nnen die Jungs bei Apple. Backup-Festplatte ran, beim Booten eine Tastenkombination dr&uuml;cken, "machen" ausw&auml;hlen, fertig. Kein Bootmedium. Geht einfach. Liebe Jungs von Microsoft, gut euch TimeMachine an und kopiert es. Wenigstens f&uuml;r Europa. Es gibt bei uns keine Software-Patente. Die L&ouml;sung von Apple ist gut und einfach dabei. Was allerdings bei einer kleineren SSD nun passiert w&auml;re, wei&szlig; ich nicht.<&#47;p></p>
<h2>Ratlos.<&#47;h2></p>
<p>Ich m&ouml;chte nicht noch Windows 7 installieren und das Upgrade dann durchf&uuml;hren. Auch weil ich die Seriennummer nicht mehr habe. Ich m&ouml;chte das abk&uuml;rzen. Das Endergebnis ist das gleiche, ein Windows 8.1 Pro im aktuellen Zustand. Warum kann nicht einfach der Upgrade-Key verwenden? Ich bin das Opfer von billigen SSDs und einer rigiden Lizenzpolitik. Wir wechseln nun komplett zu Apple, da ist das Betriebssystem schlicht kostenlos weil die Hardware schon schweineteuer genug ist. Aber daf&uuml;r funktioniert der Kram auch einfach.<&#47;p></p>
<p><em>Mag sein das mein Szenario recht exotisch ist. Was habt ihr so an haarstr&auml;ubenden Geschichten mit Systembackup-Restore und&#47;oder der MS Hotline gemacht?<&#47;em><&#47;p></p>
