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
excerpt: |+
  <p>Schon Jahre habe ich das Problem, dass ich meine sehr umfangreiche Fotosammlung gerne auf Smartphone, iPad und Computer online abrufen m&ouml;chten. Und das bitte selbst gehostet. Diese umfasst mittlerweile rund <strong>61&#046;000 Bilder<&#47;strong> in rd. <strong>1500 Alben<&#47;strong> und bringt in der Die Thumbnail-Version (runterskaliert auf max. 2048x2048) immerhin rund <strong>13 GB<&#47;strong> auf die Waage.<&#47;p>

  <p>Der Shootingstar <a href="http:&#47;&#47;lychee.electerious.com&#47;"><strong>Lychee<&#47;strong><&#47;a> ist nun die L&ouml;sung. t3n <a href="http:&#47;&#47;t3n.de&#47;news&#47;foto-management-lychee-schick-einfach-open-source-578992&#47;">berichtete<&#47;a> Ende 2014 dar&uuml;ber und jetzt hat es auch noch - wie heise.de <a href="http:&#47;&#47;www.heise.de&#47;open&#47;meldung&#47;Auszeichnungen-fuer-Open-Source-Projekte-2584459.html">berichtet<&#47;a> - den Open-Source-Preis 2014 von buch7.de gewonnen (neben Bloonix und CiviCRM). Zeit sich das ganze anzuschauen.<&#47;p>

  <p><strong>TL;DR<&#47;strong> Leider funktionieren diese Bildermassen derzeit nicht &uuml;ber eine Lychee-Instanz, sodass ich je Jahr eine separate DB angelegt habe. Der Import l&auml;uft per <code>lycheesync<&#47;code> je Jahr-Ordner. Die Umschaltung der DB erfolgt &uuml;ber Erkennung des Unterverzeichnisses in der <code>data&#47;config.php<&#47;code>.<&#47;p>

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
<p>Schon Jahre habe ich das Problem, dass ich meine sehr umfangreiche Fotosammlung gerne auf Smartphone, iPad und Computer online abrufen m&ouml;chten. Und das bitte selbst gehostet. Diese umfasst mittlerweile rund <strong>61&#046;000 Bilder<&#47;strong> in rd. <strong>1500 Alben<&#47;strong> und bringt in der Die Thumbnail-Version (runterskaliert auf max. 2048x2048) immerhin rund <strong>13 GB<&#47;strong> auf die Waage.<&#47;p></p>
<p>Der Shootingstar <a href="http:&#47;&#47;lychee.electerious.com&#47;"><strong>Lychee<&#47;strong><&#47;a> ist nun die L&ouml;sung. t3n <a href="http:&#47;&#47;t3n.de&#47;news&#47;foto-management-lychee-schick-einfach-open-source-578992&#47;">berichtete<&#47;a> Ende 2014 dar&uuml;ber und jetzt hat es auch noch - wie heise.de <a href="http:&#47;&#47;www.heise.de&#47;open&#47;meldung&#47;Auszeichnungen-fuer-Open-Source-Projekte-2584459.html">berichtet<&#47;a> - den Open-Source-Preis 2014 von buch7.de gewonnen (neben Bloonix und CiviCRM). Zeit sich das ganze anzuschauen.<&#47;p></p>
<p><strong>TL;DR<&#47;strong> Leider funktionieren diese Bildermassen derzeit nicht &uuml;ber eine Lychee-Instanz, sodass ich je Jahr eine separate DB angelegt habe. Der Import l&auml;uft per <code>lycheesync<&#47;code> je Jahr-Ordner. Die Umschaltung der DB erfolgt &uuml;ber Erkennung des Unterverzeichnisses in der <code>data&#47;config.php<&#47;code>.<&#47;p></p>
<p><a id="more"></a><a id="more-668"></a></p>
<p>Lychee l&auml;uft mit PHP 5.3 und ist <a href="https:&#47;&#47;github.com&#47;electerious&#47;Lychee&#47;blob&#47;master&#47;docs&#47;Installation.md">fix installiert<&#47;a>. Meine bestehende Fotosammlung sollte nat&uuml;rlich automatisch importiert werden. Dazu gibt es <a href="https:&#47;&#47;github.com&#47;GustavePate&#47;lycheesync"><strong>Lycheesync<&#47;strong><&#47;a>. Dieses ben&ouml;tigt Python 2.7 - Ubuntu 10.04 LTS bringt aber nur 2.6 mit. Der Sport bestand also, Python 2.6 als systemweite Version (inkl. Module) zu behalten und nur f&uuml;r das Importscript 2.7 zu nutzen - inkl. notwendiger Module.<&#47;p></p>
<h2>PyEnv: andere Python Version parallel installieren<&#47;h2></p>
<p>Nach einiger Tests mit <a href="http:&#47;&#47;docs.python-guide.org&#47;en&#47;latest&#47;dev&#47;virtualenvs&#47;">Virtualenv<&#47;a> bin ich auf <a href="https:&#47;&#47;github.com&#47;yyuu&#47;pyenv"><strong>PyEnv<&#47;strong><&#47;a> was f&uuml;r meine Zwecke einfacher einzusetzen ist.<&#47;p></p>
<p>Installiert hab ich es unter <code>root&#47;.pyenv<&#47;code> lt. <a href="https:&#47;&#47;github.com&#47;yyuu&#47;pyenv#basic-github-checkout">Anleitung (GitHub-Checkout)<&#47;a>. Dann so:<&#47;p></p>
<pre><code>pyenv install 2.7.8<br />
pyenv global 2.7.8<br />
<&#47;code><&#47;pre></p>
<p>Nunmehr auf Python 2.7.8 gewechselt (ggf. <code>exec $SHELL<&#47;code> durchf&uuml;hren um <code>.bashrc<&#47;code> neu zu laden) nun noch n&ouml;tige Module mit Pip installieren.<&#47;p></p>
<p>Erst ein paar Pakete ..<&#47;p></p>
<pre><code>apt-get install libjpeg libjpeg-dev libfreetype6 libfreetype6-dev zlib1g-dev<br />
apt-get install python-imaging<br />
apt-get install libjpeg-dev libfreetype6-dev zlib1g-dev libpng12-dev<br />
apt-get install libmysqlclient-dev<br />
<&#47;code><&#47;pre></p>
<p>Dann die Python-Module ..<&#47;p></p>
<pre><code>pip install dateutils<br />
pip install MySQL-python<br />
pip install PIL --allow-external PIL --allow-unverified PIL<br />
<&#47;code><&#47;pre></p>
<h2>Import vom Album-Ordner<&#47;h2></p>
<p>Struktur der Ordner bei mir:<&#47;p></p>
<pre><code>httpdocs&#47;albums<br />
httpdocs&#47;lychee<br />
lycheesync<br />
sync.sh<br />
<&#47;code><&#47;pre></p>
<p><strong>Regelm&auml;&szlig;ige Aktualisierung nach Upload: <code>sync.sh<&#47;code><&#47;strong><&#47;p></p>
<p>Ich lade unregelm&auml;&szlig;ig gleich einen Berg Fotos per SSH hoch die dann synchronisiert werden soll..<&#47;p></p>
<pre><code>#!&#47;bin&#47;bash<br />
cd lycheesync<br />
nohup python main.py ..&#47;httpdocs&#47;albums ..&#47;httpdocs&#47;lychee conf.json<br />
<&#47;code><&#47;pre></p>
<p>In der <code>conf.json<&#47;code> muss die Datenbankverbindung zur bereits bestehenden Lychee-DD konfiguriert werden.. Per <code>nohup<&#47;code> wird der Sync-Prozess in den Hintergrund gedr&uuml;ckt. Gut, da es seeehr seehr lange dauern kann.<&#47;p></p>
<h2>Zwischenfazit: Sammlung "sprengt" Lychee<&#47;h2></p>
<p>Der Umfang meiner Sammlung sprengt momentan die M&ouml;glichkeiten von Lychee. Da noch keine Unterordner in jeglicher Form unterst&uuml;tz werden, landen nat&uuml;rlich alle Alben in Ebene 1. Und da die Startseite wohl auch kein Lazy-Load oder sonstwelche Optimierungen hat, werden halt dann 1500 Alben angezeigt - was das ganze damit leider unbenutzbar macht.<&#47;p></p>
<h1>Vertikale Unterteilung<&#47;h1></p>
<p>Da alles in einer Lychee-DB derzeit nicht geht, ist die Idee, es vertikal in eine DB je Jahr aufzuteilen. Die Verteilung der Massen ist derzeit wie folgt:<&#47;p></p>
<ul>
<li>Jahr &#47; Alben &#47; Fotos &#47; Gr&ouml;&szlig;e in MB<&#47;li>
<li><strong>1970-1990<&#47;strong> &#47; 22 &#47; 345 &#47; 48 MB<&#47;li>
<li><strong>1990-2001<&#47;strong> &#47; 17 &#47; 139 &#47; 17 MB<&#47;li>
<li><strong>2002<&#47;strong> &#47; 16 &#47; 340 &#47; 44 MB<&#47;li>
<li><strong>2003<&#47;strong> &#47; 33 &#47; 724 &#47; 107 MB<&#47;li>
<li><strong>2004<&#47;strong> &#47; 76 &#47; 1784 &#47; 243 MB<&#47;li>
<li><strong>2005<&#47;strong> &#47; 374 &#47; 18127 &#47; 2754 MB<&#47;li>
<li><strong>2006<&#47;strong> &#47; 80 &#47; 1142 &#47; 187 MB<&#47;li>
<li><strong>2007<&#47;strong> &#47; 41 &#47; 1614 &#47; 276 MB<&#47;li>
<li><strong>2008<&#47;strong> &#47; 51 &#47; 2369 &#47; 539 MB<&#47;li>
<li><strong>2009<&#47;strong> &#47; 338 &#47; 11632 &#47; 2773 MB<&#47;li>
<li><strong>2010<&#47;strong> &#47; 267 &#47; 9436 &#47; 2175 MB<&#47;li>
<li><strong>2011<&#47;strong> &#47; 168 &#47; 6637 &#47; 5084 MB<&#47;li>
<li><strong>2012<&#47;strong> &#47; 80 &#47; 2462 &#47; 3581 MB<&#47;li>
<li><strong>2013<&#47;strong> &#47; 64 &#47; 2729 &#47; 3895 MB<&#47;li>
<li><strong>2014<&#47;strong> &#47; 35 &#47; 1885 &#47; 2924 MB<&#47;li><br />
<&#47;ul></p>
<p>Es bietet sich also an, f&uuml;r 1970-2003 eine DB zu machen, dann je Jahr eine weitere DB. Die Lychee-Installation soll dann abh&auml;ngig vom Unterverzeichnis, z.B. <code>&#47;2010<&#47;code>, die entsprechende DB kontaktieren. Updates dazu folgen.<&#47;p></p>
<h2>eine DB je Jahr<&#47;h2></p>
<p>Leider kann man <code>lycheesync<&#47;code> kein Tabellen-Prefix mitgeben, daher lege ich pro Jahr eine DB an - also z.B. DB <code>lychee_2014<&#47;code> mit Nutzer <code>lychee_2014<&#47;code>.<&#47;p></p>
<p>Lychee-DB anlegen (Stand Version 2.7)<&#47;p></p>
<pre><code>CREATE TABLE `lychee_albums` (  `id` int(11) NOT NULL AUTO_INCREMENT,  `title` varchar(50) NOT NULL,  `description` varchar(1000) DEFAULT '',  `sysstamp` int(11) NOT NULL,  `public` tinyint(1) NOT NULL DEFAULT '0',  `visible` tinyint(1) NOT NULL DEFAULT '1',  `downloadable` tinyint(1) NOT NULL DEFAULT '0',  `password` varchar(100) DEFAULT NULL,  PRIMARY KEY (`id`)) ENGINE=MyISAM AUTO_INCREMENT=1146 DEFAULT CHARSET=utf8;<br />
CREATE TABLE `lychee_log` (  `id` int(11) NOT NULL AUTO_INCREMENT,  `time` int(11) NOT NULL,  `type` varchar(11) NOT NULL,  `function` varchar(100) NOT NULL,  `line` int(11) NOT NULL,  `text` text,  PRIMARY KEY (`id`)) ENGINE=MyISAM DEFAULT CHARSET=utf8;<br />
CREATE TABLE `lychee_photos` (  `id` bigint(14) NOT NULL,  `title` varchar(50) NOT NULL,  `description` varchar(1000) DEFAULT '',  `url` varchar(100) NOT NULL,  `tags` varchar(1000) NOT NULL DEFAULT '',  `public` tinyint(1) NOT NULL,  `type` varchar(10) NOT NULL,  `width` int(11) NOT NULL,  `height` int(11) NOT NULL,  `size` varchar(20) NOT NULL,  `iso` varchar(15) NOT NULL,  `aperture` varchar(20) NOT NULL,  `make` varchar(50) DEFAULT NULL,  `model` varchar(50) NOT NULL,  `shutter` varchar(30) NOT NULL,  `focal` varchar(20) NOT NULL,  `takestamp` int(11) DEFAULT NULL,  `star` tinyint(1) NOT NULL,  `thumbUrl` varchar(50) NOT NULL,  `album` varchar(30) NOT NULL DEFAULT '0',  `checksum` varchar(100) DEFAULT NULL,  `medium` tinyint(1) NOT NULL DEFAULT '0',  PRIMARY KEY (`id`)) ENGINE=MyISAM DEFAULT CHARSET=utf8;<br />
CREATE TABLE `lychee_settings` (  `key` varchar(50) NOT NULL DEFAULT '',  `value` varchar(200) DEFAULT '') ENGINE=MyISAM DEFAULT CHARSET=utf8;<br />
<&#47;code><&#47;pre></p>
<p>Lychee-Einstellungen kopieren aus Original-DB <code>lychee<&#47;code>:<&#47;p></p>
<pre><code>INSERT INTO lychee_settings SELECT * FROM lychee.lychee_settings<br />
<&#47;code><&#47;pre></p>
<p>Mein Sync-Script:<&#47;p></p>
<pre><code>#!&#47;bin&#47;bash<br />
# ggf. exec $SHELL ausf&uuml;hren</p>
<p>pyenv global 2.7.8</p>
<p>cd lycheesync</p>
<p>JAHR=$1<br />
ALBUMS=&#47;media&#47;fotos-thumbs&#47;$JAHR<br />
LYCHEE=..&#47;httpdocs&#47;lychee<br />
CONF=conf_$JAHR.json<br />
LOG=..&#47;logs&#47;sync_$JAHR.log</p>
<p>nohup python main.py $ALBUMS $LYCHEE $CONF > $LOG &amp;<br />
<&#47;code><&#47;pre></p>
<p>Per Kommandozeile dann pro Jahr dann so:<&#47;p></p>
<pre><code>.&#47;sync.sh 2014<br />
<&#47;code><&#47;pre></p>
<p>So nach und nach k&ouml;nnen damit alle Jahre sauber importiert werden. Die <code>nohup<&#47;code> Logs werden ebenfalls jeweils separat geschrieben und sp&auml;ter auf Fehler gepr&uuml;ft werden.<&#47;p></p>
<h2>Lychee erkennt Unterverzeichnisse<&#47;h2></p>
<p>Der Webaufruf eines Jahres soll z.B. <code>&#47;2014<&#47;code> sein. Intern soll nat&uuml;rlich alles &uuml;ber eine Lychee-Instanz funktionieren. Die Umschaltung erfolgt direkt in der Lychee-Konfiguration <code>data&#47;config.php<&#47;code>.<&#47;p></p>
<p>..<br />
   $tmp = explode('&#47;',$<em>SERVER['SCRIPT_NAME']);<br />
   ..<br />
   $dbName = 'lychee<&#47;em>'.$tmp<a href="http:&#47;&#47;lychee.electerious.com&#47;">1<&#47;a>;<br />
   ..<&#47;p></p>
<h2>Fazit<&#47;h2></p>
<p>Mit dieser Unterteilung funktioniert es f&uuml;r mich derzeit gut. Es bleibt abzuwarten wie sich Lychee weiterentwickelt. Da es Opensource ist, kann man nat&uuml;rlich auch selbst die fehlenden Features erg&auml;nzen. Mal schauen..<&#47;p></p>
