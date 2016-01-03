---
layout: post
status: publish
published: true
title: Box Backup zwischen Ubuntu 10.04 Client und 14.04 Server
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: '<p>Da ich so ein bisschen von <a href="http:&#47;&#47;duplicity.nongnu.org&#47;">Duplicity<&#47;a>
  die Nase voll hatte musste eine modernere L&ouml;sung her. Nach Pr&uuml;fung aller
  M&ouml;glichkeiten der <a href="http:&#47;&#47;wiki.ubuntuusers.de&#47;Datensicherung#Programme">Ubuntu
  Datensicherung Programmliste<&#47;a> fiel die Wahl auf <a href="http:&#47;&#47;www.boxbackup.org&#47;">Box
  Backup<&#47;a>. Das Setup verlief erstaunlich problemlos .. seht selbst. '
wordpress_id: 543
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=543
date: '2015-01-14 21:49:52 +0100'
date_gmt: '2015-01-14 19:49:52 +0100'
categories:
- DevOp
tags: []
---
<p>Da ich so ein bisschen von <a href="http:&#47;&#47;duplicity.nongnu.org&#47;">Duplicity<&#47;a> die Nase voll hatte musste eine modernere L&ouml;sung her. Nach Pr&uuml;fung aller M&ouml;glichkeiten der <a href="http:&#47;&#47;wiki.ubuntuusers.de&#47;Datensicherung#Programme">Ubuntu Datensicherung Programmliste<&#47;a> fiel die Wahl auf <a href="http:&#47;&#47;www.boxbackup.org&#47;">Box Backup<&#47;a>. Das Setup verlief erstaunlich problemlos .. seht selbst. <a id="more"></a><a id="more-543"></a><&#47;p></p>
<h2>Server Setup<&#47;h2></p>
<p>Wir folgen mal der <a href="http:&#47;&#47;www.boxbackup.org&#47;wiki&#47;ConfiguringAServer">offiziellen Anleitung<&#47;a> (englisch) und <a href="http:&#47;&#47;www.pro-linux.de&#47;artikel&#47;2&#47;283&#47;2,konfiguration-des-servers.html">einem Artikel bei Pro-Linux<&#47;a> (deutsch) so Pi*Daumen ..<&#47;p></p>
<p>Paket installieren..<&#47;p></p>
<pre><code>apt-get install boxbackup-server<br />
<&#47;code><&#47;pre></p>
<p>Service Status pr&uuml;fen ...<&#47;p></p>
<pre><code>service boxbackup-server status<br />
<&#47;code><&#47;pre></p>
<p>Nix &hellip;<&#47;p></p>
<h3>Config Dateien erzeugen<&#47;h3></p>
<p>Backup-Daten-Verzeichnis anmelden...<&#47;p></p>
<pre><code>raidfile-config &#47;etc&#47;boxbackup 4096 &#47;var&#47;backups<br />
<&#47;code><&#47;pre></p>
<p>Meldet zwar &ldquo;WARNING: userland RAID is disabled.&rdquo; aber sonst alles okay.<&#47;p></p>
<p>Servername festlegen, leere Nutzeraccount-Config und Server-Zertifikate anlegen...<&#47;p></p>
<pre><code>bbstored-config &#47;etc&#47;boxbackup backup.deinedomain.tld bbstored<br />
<&#47;code><&#47;pre></p>
<p>Hm, es wird Fehler <em>&ldquo;Checking permissions on &#47;var&#47;backups [..] doesn't appear to have the necessary permissions&rdquo;<&#47;em> gemeldet.<&#47;p></p>
<p>Also <code>&#47;var&#47;backups&#47;boxbackup<&#47;code> f&uuml;r Nutzer <code>bbstored.bbstored<&#47;code> angelegt, <code>&#47;etc&#47;boxbackup&#47;raidfile.conf<&#47;code> gel&ouml;scht und mit <code>raidfile-config<&#47;code> neu angelegt. Dann l&auml;uft obiges Kommando durch..<&#47;p></p>
<p><em>Hinweis:<&#47;em> <code>backup.deinedomain.tld<&#47;code> ist der Hostname des Backup-Servers, &uuml;ber den die Clients zugreifen.<&#47;p></p>
<p>Config hier: <code>&#47;etc&#47;boxbackup&#47;bbstored.conf<&#47;code> Nutzeraccounts hier: <code>&#47;etc&#47;boxbackup&#47;bbstored&#47;accounts.txt<&#47;code> Speicherort hier: <code>&#47;etc&#47;boxbackup&#47;raidfile.conf<&#47;code><&#47;p></p>
<h3>Zertifikate Zertifikate Zertifikate &hellip;<&#47;h3></p>
<p>Als n&auml;chstes entlang der <a href="http:&#47;&#47;www.boxbackup.org&#47;wiki&#47;CertificatesAndAccountsManagement">offiziellen Anleitung<&#47;a> und Hinweisen in den Ausgaben bei der Config-Erstellung .. das **Zertifikat **anlegen &hellip;<&#47;p></p>
<p>Der Einfachheit befinden wir uns in <code>&#47;etc&#47;boxbackup<&#47;code>, wodurch die Zertifikate in einem Verzeichnis <code>ca<&#47;code> landen.<&#47;p></p>
<pre><code>bbstored-certs ca init<br />
<&#47;code><&#47;pre></p>
<p><em>Hinweis:<&#47;em> Man kann auch seine eigenen vorhandenen Zertifikate nutzen, dazu bitte beim Pro-Linux Artikel schauen.<&#47;p></p>
<p>Jetzt das Server-Zertifikat mit dem erstellten Zertifikat signieren ..<&#47;p></p>
<pre><code>bbstored-certs ca sign-server bbstored&#47;backup.deinedomain.tld-csr.pem<br />
<&#47;code><&#47;pre></p>
<p>Noch an die richtige Stelle kopieren ..<&#47;p></p>
<pre><code>cp -a ca&#47;servers&#47;backup.deinedomain.tld-cert.pem \<br />
    &#47;etc&#47;boxbackup&#47;bbstored&#47;backup.deinedomain.tld-cert.pem<br />
cp -a ca&#47;roots&#47;clientCA.pem &#47;etc&#47;boxbackup&#47;bbstored&#47;clientCA.pem<br />
<&#47;code><&#47;pre></p>
<p>Nochmal ins <strong>Config<&#47;strong> <code>&#47;etc&#47;boxbackup&#47;bbstored.conf<&#47;code> gelugt ..<&#47;p></p>
<p><code>TimeBetweenHousekeeping<&#47;code> steht auf 15 Minuten .. d.h. gel&ouml;schte Dateien auf dem Client sind noch 15 Minuten vom Server abrufbar. <code>ExtendedLogging<&#47;code> hab ich f&uuml;r erste Test angeschalten.<&#47;p></p>
<h3>Nutzeraccounts anlegen<&#47;h3></p>
<p>Wieder weiter in der <a href="http:&#47;&#47;www.boxbackup.org&#47;wiki&#47;CertificatesAndAccountsManagement">Anleitung<&#47;a> &hellip;<&#47;p></p>
<p>Anlegen eines Nutzers mit ID 1000000A (Beispiel, kann auch &ldquo;4C3A5B6A&rdquo; oder &ldquo;1&rdquo; f&uuml;r &ldquo;00000001&rdquo; sein) f&uuml;r den Default-Speicherort 0 mit Softlimit 20GB und Hardlimit 25GB an.<&#47;p></p>
<pre><code>bbstoreaccounts create 1000000A 0 20G 25G<br />
<&#47;code><&#47;pre></p>
<p>Die IDs k&ouml;nnen sich ausgedacht werden, zusammen mit dem Zertifikat authentifizieren sie einen Nutzeraccount am Server.<&#47;p></p>
<p>Das kann &uuml;brigens noch nachtr&auml;glich angepasst werden.<&#47;p></p>
<pre><code>bbstoreaccounts setlimit 1000000A 3000M 4000M<br />
<&#47;code><&#47;pre></p>
<p>Mit folgenden Kommando bekommt man &uuml;brigens den noch freien Speicher angezeigt<&#47;p></p>
<pre><code>bbstoreaccounts info 1000000A<br />
<&#47;code><&#47;pre></p>
<p>Und nun endlich den <strong>Server starten<&#47;strong> &hellip;<&#47;p></p>
<pre><code>service boxbackup-server start<br />
<&#47;code><&#47;pre></p>
<p>L&auml;uft!<&#47;p></p>
<p>Das erweiterte Logging ist &uuml;brigens in <code>&#47;var&#47;log&#47;syslog<&#47;code> zu sehen.<&#47;p></p>
<h2>Client Setup<&#47;h2></p>
<p>Wieder sch&ouml;n die <a href="http:&#47;&#47;www.pro-linux.de&#47;artikel&#47;2&#47;283&#47;3,konfiguration-der-clients.html">deutsche Anleitung<&#47;a> entlang ...<&#47;p></p>
<p>Zun&auml;chst das Paket installieren ..<&#47;p></p>
<pre><code>apt-get install boxbackup-client<br />
<&#47;code><&#47;pre></p>
<p>Jetzt die <strong>Configs erzeugen<&#47;strong> im Snapshot-Modus (per Cron getriggert statt kontiunierlich im &ldquo;lazy&rdquo; Modus) .. und zwar f&uuml;r die Vhosts und das home-Verzeichnis ..<&#47;p></p>
<pre><code>bbackupd-config &#47;etc&#47;boxbackup snapshot 1000000A backup.deinedomain.tld &#47;var&#47;lib&#47;bbackup &#47;var&#47;www&#47;vhosts &#47;home<br />
<&#47;code><&#47;pre></p>
<p>Client-ID ist die Nutzer-ID auf dem Server: 1000000A Backup-Domain ist <code>backup.deinedomain.tld<&#47;code> Arbeitsverzeichnis von bbackup ist <code>&#47;var&#47;lib&#47;bbackup<&#47;code> zu sichernde Verzeichnisse: <code>&#47;var&#47;www&#47;vhosts<&#47;code> und <code>&#47;home<&#47;code><&#47;p></p>
<p><strong>Backup des Wiederherstellungs-Schl&uuml;ssels<&#47;strong> machen irgendwo **Extern **(Dropbox?)<&#47;p></p>
<p>Die hier: <code>&#47;etc&#47;boxbackup&#47;bbackupd&#47;1000000A-FileEncKeys.raw<&#47;code><&#47;p></p>
<h3>Zertifikat signieren<&#47;h3></p>
<p>Und nun das <strong>Client-Zertifikat vom Server signieren<&#47;strong> lassen.<&#47;p></p>
<p>Dazu die 100000A-csr.pem zum Backup-Server senden per scp.<&#47;p></p>
<pre><code>scp &#47;etc&#47;boxbackup&#47;bbackupd&#47;1000000A-csr.pem root@backup.deinedomain.tld:&#47;tmp&#47;1000000A-csr.pem<br />
<&#47;code><&#47;pre></p>
<p>Und dort signieren, wobei man im Verzeichnis mit den Server-Zertifikaten sein muss.<&#47;p></p>
<pre><code>bbstored-certs ca sign &#47;tmp&#47;1000000A-csr.pem<br />
<&#47;code><&#47;pre></p>
<p>Dann zum Client zur&uuml;ckkopieren (hier vom Client aus holen):<&#47;p></p>
<pre><code>scp root@backup.meinedomain.tld:&#47;etc&#47;boxbackup&#47;ca&#47;clients&#47;1000000A-cert.pem &#47;etc&#47;boxbackup&#47;bbackupd&#47;1000000A-cert.pem<br />
scp root@backup.meinedomain.tld:&#47;etc&#47;boxbackup&#47;ca&#47;roots&#47;serverCA.pem &#47;etc&#47;boxbackup&#47;bbackupd&#47;serverCA.pem<br />
<&#47;code><&#47;pre></p>
<h3>Konfiguration checken<&#47;h3></p>
<p>Jetzt noch kurz die <strong>Config checken<&#47;strong> &#47;etc&#47;boxbackup&#47;bbackupd.conf &hellip; ist aber f&uuml;r unseren Snapshot-Modus v&ouml;llig okay.<&#47;p></p>
<p><code>ExtendedLogging<&#47;code> hab ich f&uuml;r erste Test auch hier angeschalten.<&#47;p></p>
<p>Noch das <strong>Admin-Benachrichtigung-Script<&#47;strong> <code>&#47;etc&#47;boxbackup&#47;bbackupd&#47;NotifySysadmin.sh<&#47;code> querlesen .. die Emails gehen lt Variable SENDTO an &ldquo;root&rdquo; .. ist f&uuml;rs erste Okay.<&#47;p></p>
<p>Weiter in der <a href="http:&#47;&#47;www.pro-linux.de&#47;artikel&#47;2&#47;283&#47;4,konfiguration-der-clients-teil-2.html">Client-Anleitung bei Pro-Linux Seite 2<&#47;a> ..<&#47;p></p>
<p>Jetzt den <strong>Client starten<&#47;strong> ..<&#47;p></p>
<pre><code>service boxbackup-client start<br />
<&#47;code><&#47;pre></p>
<p>L&auml;uft!<&#47;p></p>
<p>Noch den Cron einrichten .. soll 2 Uhr nachts laufen .. per crontab -e editieren<&#47;p></p>
<pre><code>0 2 * * * &#47;usr&#47;sbin&#47;bbackupctl -q sync<br />
<&#47;code><&#47;pre></p>
<h3>Backup starten<&#47;h3></p>
<p>Und das erste Backup initiieren ..<&#47;p></p>
<pre><code>bbackupctl sync<br />
<&#47;code><&#47;pre></p>
<p>Das meldet ein paar Statusinfos und ist fix fertig.<&#47;p></p>
<p>Im Hintergrund beginnt der Backup-Client mit der Arbeit. Diese kann man im &#47;var&#47;log&#47;syslog verfolgen. Da steht dann z.B.<&#47;p></p>
<pre><code>bbackupctl[26050]: Control command sent: sync bbackupd[26046]: NOTICE: Beginning scan of local files<br />
<&#47;code><&#47;pre></p>
<p>.. und sp&auml;ter ...<&#47;p></p>
<pre><code>NOTICE: Finished scan of local files NOTICE: File statistics: total file size uploaded [gr&ouml;&szlig;e lokal], bytes already on server 0, encoded size [gr&ouml;&szlig;e remote]<br />
<&#47;code><&#47;pre></p>
<p>Mit folgenden Kommando bekommt man &uuml;brigens den noch freien Speicher angezeigt<&#47;p></p>
<pre><code>bbackupquery -q usage quit<br />
<&#47;code><&#47;pre></p>
<p>Und mit <code>bbackupquery<&#47;code> kann man bequem im Remote-Backup-Repository herumsurfen und auch ggf. Dateien wiederherstellen. Siehe dazu bei <a href="http:&#47;&#47;www.pro-linux.de&#47;artikel&#47;2&#47;283&#47;6,restore.html">Pro-Linux<&#47;a> (deutsch) und in der <a href="http:&#47;&#47;www.boxbackup.org&#47;wiki&#47;VerifyAndRestoreBackups">offiziellen Doku<&#47;a> (englisch).<&#47;p></p>
<h3>Verzeichnisse ausschlie&szlig;en<&#47;h3></p>
<p>Mittels <code>ExcludeDir<&#47;code> und <code>ExcludeFile<&#47;code> (und weiteren) kann man einzelne Verzeichnisse und&#47;oder Dateien ausschlie&szlig;en, die man nicht im Backup haben will - oder die Fehler in der <code>&#47;var&#47;syslog<&#47;code> werfen. <code>&#47;dev&#47;null<&#47;code> ist so ein Kandidat, und Foto-Verzeichnisse bei mir, welches ich lokal ohnehin zigfach sichere.<&#47;p></p>
<pre><code>BackupLocations { &nbsp;&nbsp;&nbsp;<br />
    var-www-vhosts &nbsp;&nbsp;&nbsp; { &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
        Path = &#47;var&#47;www&#47;vhosts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
        ExcludeDir = &#47;var&#47;www&#47;vhosts&#47;fotos.rh-flow.de&#47;httpdocs&#47;gallery&#47;var&#47;albums &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
        ExcludeDir = &#47;var&#47;www&#47;vhosts&#47;fotos.rh-flow.de&#47;httpdocs&#47;gallery&#47;var&#47;thumbs &nbsp;&nbsp;&nbsp;<br />
        } &nbsp;&nbsp;&nbsp;<br />
    ..<br />
}<br />
<&#47;code><&#47;pre></p>
<p>Insofern man die Verzeichnisse nach dem ersten Backup exkludiert, braucht man sich nicht zu wundern, wenn die Backup-Space-Usage nicht am n&auml;chsten Tag abnimmt. Die Dateien werden erst ber&auml;umt, wenn das Softlimit &uuml;berschritten wurde.<&#47;p></p>
<h3>CPU-Last reduzieren (Update)<&#47;h3></p>
<p>Im Snapshot-Modus ist der Backupclient bzgl. Ressourcen Festplattenzugriffe und CPU nicht knauserig. Wer allerdings einen Monitoring-Dienst einsetzt, den werden die Mails nerven die zeigen dass der Backup-Dienst l&auml;uft. Leider bringt Box Backup wohl von Haus aus keine Bremse mit (max. Dateien pro Sekunde, max. CPU-Last o.&auml;.) - also keine Parameter die man in der bbackup.conf einstellen k&ouml;nnte. Bleibt noch der <a href="http:&#47;&#47;manpages.ubuntu.com&#47;manpages&#47;lucid&#47;en&#47;man1&#47;nice.1posix.html"><code>nice<&#47;code><&#47;a>-Level des Daemons (<a href="http:&#47;&#47;manpages.ubuntu.com&#47;manpages&#47;dapper&#47;de&#47;man8&#47;start-stop-daemon.8.html"><code>start-stop-daemon<&#47;code><&#47;a>). Mittels Anpassung der <code>&#47;etc&#47;init.d&#47;boxbackup-client<&#47;code><&#47;p></p>
<pre><code>echo -n "Starting $DESC: " &nbsp;&nbsp;&nbsp;<br />
start-stop-daemon --start --quiet --nicelevel 19 --pidfile $PIDFILE \<br />
    --exec $DAEMON -- $CONF &nbsp;&nbsp;&nbsp; .. stop) .. reload|force-reload) .. restart) &nbsp;&nbsp;&nbsp;<br />
echo -n "Restarting $DESC: " &nbsp;&nbsp;&nbsp; .. &nbsp;&nbsp;&nbsp;<br />
start-stop-daemon --start --quiet --nicelevel 19 --pidfile \<br />
    $PIDFILE --exec $DAEMON -- $CONF &nbsp;&nbsp;&nbsp; .. *)<br />
<&#47;code><&#47;pre></p>
<p>Anschlie&szlig;end den Dienst mittels <code>service boxbackup-client restart<&#47;code> neustarten und gleich mit <code>bbackupctl sync<&#47;code> zum Test antriggern.<&#47;p></p>
<h2>Fazit<&#47;h2></p>
<p>Mittels der tollen aber teilweise veralteten deutschen Anleitung und den super TODOs die die Config-Generatoren ausspucken, kommt man recht schnell und zuverl&auml;ssig voran. Das Backup tut aus den Stand heraus und l&ouml;st bei mir das in die Jahre gekommende Duplicity ab.<&#47;p></p>
<p>Schon alleine die Config-Dateien und das ein Dienst l&auml;uft der nur von Zeit zu Zeit angetriggert wird, statt eines ollen selber zusammengefrickelten Scriptes welches Duplicity steuert - schon allein daf&uuml;r ist es der Aufwand wert!<&#47;p></p>
<p>Leider leider kann man nicht einfach externen FTP-Backup-Space als Ziel angeben, sodass man im VServer-Umfeld einen echten anderen Server ben&ouml;tigt - oder schlicht die NAS zuhause.<&#47;p></p>
<p><em>Was setzt ihr als Backup-L&ouml;sungen ein? Welche Erfahrungen habt ihr so gemacht? Gerne als Kommentare hier oder per Twitter <a href="https:&#47;&#47;twitter.com&#47;rhflow_de">@rhflow_de<&#47;a>.<&#47;em><&#47;p></p>
