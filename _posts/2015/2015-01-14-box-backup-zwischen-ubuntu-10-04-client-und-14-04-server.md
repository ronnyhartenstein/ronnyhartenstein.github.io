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

wordpress_id: 543
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=543
date: '2015-01-14 21:49:52 +0100'
date_gmt: '2015-01-14 19:49:52 +0100'
categories:
- DevOp
tags: []
---
<p>Da ich so ein bisschen von <a href="http://duplicity.nongnu.org/">Duplicity</a> die Nase voll hatte musste eine modernere Lösung her. Nach Prüfung aller Möglichkeiten der <a href="http://wiki.ubuntuusers.de/Datensicherung#Programme">Ubuntu Datensicherung Programmliste</a> fiel die Wahl auf <a href="http://www.boxbackup.org/">Box Backup</a>. Das Setup verlief erstaunlich problemlos .. seht selbst. </p>

<!--more-->

<h2>Server Setup</h2>
<p>Wir folgen mal der <a href="http://www.boxbackup.org/wiki/ConfiguringAServer">offiziellen Anleitung</a> (englisch) und <a href="http://www.pro-linux.de/artikel/2/283/2,konfiguration-des-servers.html">einem Artikel bei Pro-Linux</a> (deutsch) so Pi*Daumen ..</p>
<p>Paket installieren..</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">apt</span><span class="pun">-</span><span class="kwd">get</span><span class="pln"> install boxbackup</span><span class="pun">-</span><span class="pln">server</span></code></pre>
<p>Service Status prüfen …</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">service boxbackup</span><span class="pun">-</span><span class="pln">server status</span></code></pre>
<p>Nix …</p>
<h3>Config Dateien erzeugen</h3>
<p>Backup-Daten-Verzeichnis anmelden…</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">raidfile</span><span class="pun">-</span><span class="pln">config </span><span class="pun">/</span><span class="pln">etc</span><span class="pun">/</span><span class="pln">boxbackup </span><span class="lit">4096</span><span class="pln"> </span><span class="pun">/</span><span class="kwd">var</span><span class="pun">/</span><span class="pln">backups</span></code></pre>
<p>Meldet zwar “WARNING: userland RAID is disabled.” aber sonst alles okay.</p>
<p>Servername festlegen, leere Nutzeraccount-Config und Server-Zertifikate anlegen…</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">bbstored</span><span class="pun">-</span><span class="pln">config </span><span class="pun">/</span><span class="pln">etc</span><span class="pun">/</span><span class="pln">boxbackup backup</span><span class="pun">.</span><span class="pln">deinedomain</span><span class="pun">.</span><span class="pln">tld bbstored</span></code></pre>
<p>Hm, es wird Fehler <em>“Checking permissions on /var/backups [..] doesn’t appear to have the necessary permissions”</em> gemeldet.</p>
<p>Also <code>/var/backups/boxbackup</code> für Nutzer <code>bbstored.bbstored</code> angelegt, <code>/etc/boxbackup/raidfile.conf</code> gelöscht und mit <code>raidfile-config</code> neu angelegt. Dann läuft obiges Kommando durch..</p>
<p><em>Hinweis:</em> <code>backup.deinedomain.tld</code> ist der Hostname des Backup-Servers, über den die Clients zugreifen.</p>
<p>Config hier: <code>/etc/boxbackup/bbstored.conf</code> Nutzeraccounts hier: <code>/etc/boxbackup/bbstored/accounts.txt</code> Speicherort hier: <code>/etc/boxbackup/raidfile.conf</code></p>
<h3>Zertifikate Zertifikate Zertifikate …</h3>
<p>Als nächstes entlang der <a href="http://www.boxbackup.org/wiki/CertificatesAndAccountsManagement">offiziellen Anleitung</a> und Hinweisen in den Ausgaben bei der Config-Erstellung .. das **Zertifikat **anlegen …</p>
<p>Der Einfachheit befinden wir uns in <code>/etc/boxbackup</code>, wodurch die Zertifikate in einem Verzeichnis <code>ca</code> landen.</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">bbstored</span><span class="pun">-</span><span class="pln">certs ca init</span></code></pre>
<p><em>Hinweis:</em> Man kann auch seine eigenen vorhandenen Zertifikate nutzen, dazu bitte beim Pro-Linux Artikel schauen.</p>
<p>Jetzt das Server-Zertifikat mit dem erstellten Zertifikat signieren ..</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">bbstored</span><span class="pun">-</span><span class="pln">certs ca sign</span><span class="pun">-</span><span class="pln">server bbstored</span><span class="pun">/</span><span class="pln">backup</span><span class="pun">.</span><span class="pln">deinedomain</span><span class="pun">.</span><span class="pln">tld</span><span class="pun">-</span><span class="pln">csr</span><span class="pun">.</span><span class="pln">pem</span></code></pre>
<p>Noch an die richtige Stelle kopieren ..</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">cp </span><span class="pun">-</span><span class="pln">a ca</span><span class="pun">/</span><span class="pln">servers</span><span class="pun">/</span><span class="pln">backup</span><span class="pun">.</span><span class="pln">deinedomain</span><span class="pun">.</span><span class="pln">tld</span><span class="pun">-</span><span class="pln">cert</span><span class="pun">.</span><span class="pln">pem \
    </span><span class="pun">/</span><span class="pln">etc</span><span class="pun">/</span><span class="pln">boxbackup</span><span class="pun">/</span><span class="pln">bbstored</span><span class="pun">/</span><span class="pln">backup</span><span class="pun">.</span><span class="pln">deinedomain</span><span class="pun">.</span><span class="pln">tld</span><span class="pun">-</span><span class="pln">cert</span><span class="pun">.</span><span class="pln">pem
cp </span><span class="pun">-</span><span class="pln">a ca</span><span class="pun">/</span><span class="pln">roots</span><span class="pun">/</span><span class="pln">clientCA</span><span class="pun">.</span><span class="pln">pem </span><span class="pun">/</span><span class="pln">etc</span><span class="pun">/</span><span class="pln">boxbackup</span><span class="pun">/</span><span class="pln">bbstored</span><span class="pun">/</span><span class="pln">clientCA</span><span class="pun">.</span><span class="pln">pem</span></code></pre>
<p>Nochmal ins <strong>Config</strong> <code>/etc/boxbackup/bbstored.conf</code> gelugt ..</p>
<p><code>TimeBetweenHousekeeping</code> steht auf 15 Minuten .. d.h. gelöschte Dateien auf dem Client sind noch 15 Minuten vom Server abrufbar. <code>ExtendedLogging</code> hab ich für erste Test angeschalten.</p>
<h3>Nutzeraccounts anlegen</h3>
<p>Wieder weiter in der <a href="http://www.boxbackup.org/wiki/CertificatesAndAccountsManagement">Anleitung</a> …</p>
<p>Anlegen eines Nutzers mit ID 1000000A (Beispiel, kann auch “4C3A5B6A” oder “1” für “00000001” sein) für den Default-Speicherort 0 mit Softlimit 20GB und Hardlimit 25GB an.</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">bbstoreaccounts create </span><span class="lit">1000000A</span><span class="pln"> </span><span class="lit">0</span><span class="pln"> </span><span class="lit">20G</span><span class="pln"> </span><span class="lit">25G</span></code></pre>
<p>Die IDs können sich ausgedacht werden, zusammen mit dem Zertifikat authentifizieren sie einen Nutzeraccount am Server.</p>
<p>Das kann übrigens noch nachträglich angepasst werden.</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">bbstoreaccounts setlimit </span><span class="lit">1000000A</span><span class="pln"> </span><span class="lit">3000M</span><span class="pln"> </span><span class="lit">4000M</span></code></pre>
<p>Mit folgenden Kommando bekommt man übrigens den noch freien Speicher angezeigt</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">bbstoreaccounts info </span><span class="lit">1000000A</span></code></pre>
<p>Und nun endlich den <strong>Server starten</strong> …</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">service boxbackup</span><span class="pun">-</span><span class="pln">server start</span></code></pre>
<p>Läuft!</p>
<p>Das erweiterte Logging ist übrigens in <code>/var/log/syslog</code> zu sehen.</p>
<h2>Client Setup</h2>
<p>Wieder schön die <a href="http://www.pro-linux.de/artikel/2/283/3,konfiguration-der-clients.html">deutsche Anleitung</a> entlang …</p>
<p>Zunächst das Paket installieren ..</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">apt</span><span class="pun">-</span><span class="kwd">get</span><span class="pln"> install boxbackup</span><span class="pun">-</span><span class="pln">client</span></code></pre>
<p>Jetzt die <strong>Configs erzeugen</strong> im Snapshot-Modus (per Cron getriggert statt kontiunierlich im “lazy” Modus) .. und zwar für die Vhosts und das home-Verzeichnis ..</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">bbackupd</span><span class="pun">-</span><span class="pln">config </span><span class="pun">/</span><span class="pln">etc</span><span class="pun">/</span><span class="pln">boxbackup snapshot </span><span class="lit">1000000A</span><span class="pln"> backup</span><span class="pun">.</span><span class="pln">deinedomain</span><span class="pun">.</span><span class="pln">tld </span><span class="pun">/</span><span class="kwd">var</span><span class="pun">/</span><span class="pln">lib</span><span class="pun">/</span><span class="pln">bbackup </span><span class="pun">/</span><span class="kwd">var</span><span class="pun">/</span><span class="pln">www</span><span class="pun">/</span><span class="pln">vhosts </span><span class="pun">/</span><span class="pln">home</span></code></pre>
<p>Client-ID ist die Nutzer-ID auf dem Server: 1000000A Backup-Domain ist <code>backup.deinedomain.tld</code> Arbeitsverzeichnis von bbackup ist <code>/var/lib/bbackup</code> zu sichernde Verzeichnisse: <code>/var/www/vhosts</code> und <code>/home</code></p>
<p><strong>Backup des Wiederherstellungs-Schlüssels</strong> machen irgendwo **Extern **(Dropbox?)</p>
<p>Die hier: <code>/etc/boxbackup/bbackupd/1000000A-FileEncKeys.raw</code></p>
<h3>Zertifikat signieren</h3>
<p>Und nun das <strong>Client-Zertifikat vom Server signieren</strong> lassen.</p>
<p>Dazu die 100000A-csr.pem zum Backup-Server senden per scp.</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">scp </span><span class="pun">/</span><span class="pln">etc</span><span class="pun">/</span><span class="pln">boxbackup</span><span class="pun">/</span><span class="pln">bbackupd</span><span class="pun">/</span><span class="lit">1000000A</span><span class="pun">-</span><span class="pln">csr</span><span class="pun">.</span><span class="pln">pem root@backup</span><span class="pun">.</span><span class="pln">deinedomain</span><span class="pun">.</span><span class="pln">tld</span><span class="pun">:</span><span class="str">/tmp/</span><span class="lit">1000000A</span><span class="pun">-</span><span class="pln">csr</span><span class="pun">.</span><span class="pln">pem</span></code></pre>
<p>Und dort signieren, wobei man im Verzeichnis mit den Server-Zertifikaten sein muss.</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">bbstored</span><span class="pun">-</span><span class="pln">certs ca sign </span><span class="pun">/</span><span class="pln">tmp</span><span class="pun">/</span><span class="lit">1000000A</span><span class="pun">-</span><span class="pln">csr</span><span class="pun">.</span><span class="pln">pem</span></code></pre>
<p>Dann zum Client zurückkopieren (hier vom Client aus holen):</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">scp root@backup</span><span class="pun">.</span><span class="pln">meinedomain</span><span class="pun">.</span><span class="pln">tld</span><span class="pun">:</span><span class="str">/etc/</span><span class="pln">boxbackup</span><span class="pun">/</span><span class="pln">ca</span><span class="pun">/</span><span class="pln">clients</span><span class="pun">/</span><span class="lit">1000000A</span><span class="pun">-</span><span class="pln">cert</span><span class="pun">.</span><span class="pln">pem </span><span class="pun">/</span><span class="pln">etc</span><span class="pun">/</span><span class="pln">boxbackup</span><span class="pun">/</span><span class="pln">bbackupd</span><span class="pun">/</span><span class="lit">1000000A</span><span class="pun">-</span><span class="pln">cert</span><span class="pun">.</span><span class="pln">pem
scp root@backup</span><span class="pun">.</span><span class="pln">meinedomain</span><span class="pun">.</span><span class="pln">tld</span><span class="pun">:</span><span class="str">/etc/</span><span class="pln">boxbackup</span><span class="pun">/</span><span class="pln">ca</span><span class="pun">/</span><span class="pln">roots</span><span class="pun">/</span><span class="pln">serverCA</span><span class="pun">.</span><span class="pln">pem </span><span class="pun">/</span><span class="pln">etc</span><span class="pun">/</span><span class="pln">boxbackup</span><span class="pun">/</span><span class="pln">bbackupd</span><span class="pun">/</span><span class="pln">serverCA</span><span class="pun">.</span><span class="pln">pem</span></code></pre>
<h3>Konfiguration checken</h3>
<p>Jetzt noch kurz die <strong>Config checken</strong> /etc/boxbackup/bbackupd.conf … ist aber für unseren Snapshot-Modus völlig okay.</p>
<p><code>ExtendedLogging</code> hab ich für erste Test auch hier angeschalten.</p>
<p>Noch das <strong>Admin-Benachrichtigung-Script</strong> <code>/etc/boxbackup/bbackupd/NotifySysadmin.sh</code> querlesen .. die Emails gehen lt Variable SENDTO an “root” .. ist fürs erste Okay.</p>
<p>Weiter in der <a href="http://www.pro-linux.de/artikel/2/283/4,konfiguration-der-clients-teil-2.html">Client-Anleitung bei Pro-Linux Seite 2</a> ..</p>
<p>Jetzt den <strong>Client starten</strong> ..</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">service boxbackup</span><span class="pun">-</span><span class="pln">client start</span></code></pre>
<p>Läuft!</p>
<p>Noch den Cron einrichten .. soll 2 Uhr nachts laufen .. per crontab -e editieren</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="lit">0</span><span class="pln"> </span><span class="lit">2</span><span class="pln"> </span><span class="pun">*</span><span class="pln"> </span><span class="pun">*</span><span class="pln"> </span><span class="pun">*</span><span class="pln"> </span><span class="str">/usr/</span><span class="pln">sbin</span><span class="pun">/</span><span class="pln">bbackupctl </span><span class="pun">-</span><span class="pln">q sync</span></code></pre>
<h3>Backup starten</h3>
<p>Und das erste Backup initiieren ..</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">bbackupctl sync</span></code></pre>
<p>Das meldet ein paar Statusinfos und ist fix fertig.</p>
<p>Im Hintergrund beginnt der Backup-Client mit der Arbeit. Diese kann man im /var/log/syslog verfolgen. Da steht dann z.B.</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">bbackupctl</span><span class="pun">[</span><span class="lit">26050</span><span class="pun">]:</span><span class="pln"> </span><span class="typ">Control</span><span class="pln"> command sent</span><span class="pun">:</span><span class="pln"> sync bbackupd</span><span class="pun">[</span><span class="lit">26046</span><span class="pun">]:</span><span class="pln"> NOTICE</span><span class="pun">:</span><span class="pln"> </span><span class="typ">Beginning</span><span class="pln"> scan of </span><span class="kwd">local</span><span class="pln"> files</span></code></pre>
<p>.. und später …</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">NOTICE</span><span class="pun">:</span><span class="pln"> </span><span class="typ">Finished</span><span class="pln"> scan of </span><span class="kwd">local</span><span class="pln"> files NOTICE</span><span class="pun">:</span><span class="pln"> </span><span class="typ">File</span><span class="pln"> statistics</span><span class="pun">:</span><span class="pln"> total file size uploaded </span><span class="pun">[</span><span class="pln">gr</span><span class="pun">öß</span><span class="pln">e lokal</span><span class="pun">],</span><span class="pln"> bytes already on server </span><span class="lit">0</span><span class="pun">,</span><span class="pln"> encoded size </span><span class="pun">[</span><span class="pln">gr</span><span class="pun">öß</span><span class="pln">e remote</span><span class="pun">]</span></code></pre>
<p>Mit folgenden Kommando bekommt man übrigens den noch freien Speicher angezeigt</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">bbackupquery </span><span class="pun">-</span><span class="pln">q usage quit</span></code></pre>
<p>Und mit <code>bbackupquery</code> kann man bequem im Remote-Backup-Repository herumsurfen und auch ggf. Dateien wiederherstellen. Siehe dazu bei <a href="http://www.pro-linux.de/artikel/2/283/6,restore.html">Pro-Linux</a> (deutsch) und in der <a href="http://www.boxbackup.org/wiki/VerifyAndRestoreBackups">offiziellen Doku</a> (englisch).</p>
<h3>Verzeichnisse ausschließen</h3>
<p>Mittels <code>ExcludeDir</code> und <code>ExcludeFile</code> (und weiteren) kann man einzelne Verzeichnisse und/oder Dateien ausschließen, die man nicht im Backup haben will – oder die Fehler in der <code>/var/syslog</code> werfen. <code>/dev/null</code> ist so ein Kandidat, und Foto-Verzeichnisse bei mir, welches ich lokal ohnehin zigfach sichere.</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="typ">BackupLocations</span><span class="pln"> </span><span class="pun">{</span><span class="pln"> &nbsp;&nbsp;&nbsp;
    </span><span class="kwd">var</span><span class="pun">-</span><span class="pln">www</span><span class="pun">-</span><span class="pln">vhosts &nbsp;&nbsp;&nbsp; </span><span class="pun">{</span><span class="pln"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span><span class="typ">Path</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> </span><span class="str">/var/</span><span class="pln">www</span><span class="pun">/</span><span class="pln">vhosts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span><span class="typ">ExcludeDir</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> </span><span class="str">/var/</span><span class="pln">www</span><span class="pun">/</span><span class="pln">vhosts</span><span class="pun">/</span><span class="pln">fotos</span><span class="pun">.</span><span class="pln">rh</span><span class="pun">-</span><span class="pln">flow</span><span class="pun">.</span><span class="pln">de</span><span class="pun">/</span><span class="pln">httpdocs</span><span class="pun">/</span><span class="pln">gallery</span><span class="pun">/</span><span class="kwd">var</span><span class="pun">/</span><span class="pln">albums &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span><span class="typ">ExcludeDir</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> </span><span class="str">/var/</span><span class="pln">www</span><span class="pun">/</span><span class="pln">vhosts</span><span class="pun">/</span><span class="pln">fotos</span><span class="pun">.</span><span class="pln">rh</span><span class="pun">-</span><span class="pln">flow</span><span class="pun">.</span><span class="pln">de</span><span class="pun">/</span><span class="pln">httpdocs</span><span class="pun">/</span><span class="pln">gallery</span><span class="pun">/</span><span class="kwd">var</span><span class="pun">/</span><span class="pln">thumbs &nbsp;&nbsp;&nbsp;
        </span><span class="pun">}</span><span class="pln"> &nbsp;&nbsp;&nbsp;
    </span><span class="pun">..</span><span class="pln">
</span><span class="pun">}</span><span class="pln">   </span></code></pre>
<p>Insofern man die Verzeichnisse nach dem ersten Backup exkludiert, braucht man sich nicht zu wundern, wenn die Backup-Space-Usage nicht am nächsten Tag abnimmt. Die Dateien werden erst beräumt, wenn das Softlimit überschritten wurde.</p>
<h3>CPU-Last reduzieren (Update)</h3>
<p>Im Snapshot-Modus ist der Backupclient bzgl. Ressourcen Festplattenzugriffe und CPU nicht knauserig. Wer allerdings einen Monitoring-Dienst einsetzt, den werden die Mails nerven die zeigen dass der Backup-Dienst läuft. Leider bringt Box Backup wohl von Haus aus keine Bremse mit (max. Dateien pro Sekunde, max. CPU-Last o.ä.) – also keine Parameter die man in der bbackup.conf einstellen könnte. Bleibt noch der <a href="http://manpages.ubuntu.com/manpages/lucid/en/man1/nice.1posix.html"><code>nice</code></a>-Level des Daemons (<a href="http://manpages.ubuntu.com/manpages/dapper/de/man8/start-stop-daemon.8.html"><code>start-stop-daemon</code></a>). Mittels Anpassung der <code>/etc/init.d/boxbackup-client</code></p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">echo </span><span class="pun">-</span><span class="pln">n </span><span class="str">"Starting $DESC: "</span><span class="pln"> &nbsp;&nbsp;&nbsp;
start</span><span class="pun">-</span><span class="pln">stop</span><span class="pun">-</span><span class="pln">daemon </span><span class="pun">--</span><span class="pln">start </span><span class="pun">--</span><span class="pln">quiet </span><span class="pun">--</span><span class="pln">nicelevel </span><span class="lit">19</span><span class="pln"> </span><span class="pun">--</span><span class="pln">pidfile $PIDFILE \
    </span><span class="pun">--</span><span class="kwd">exec</span><span class="pln"> $DAEMON </span><span class="pun">--</span><span class="pln"> $CONF &nbsp;&nbsp;&nbsp; </span><span class="pun">..</span><span class="pln"> stop</span><span class="pun">)</span><span class="pln"> </span><span class="pun">..</span><span class="pln"> reload</span><span class="pun">|</span><span class="pln">force</span><span class="pun">-</span><span class="pln">reload</span><span class="pun">)</span><span class="pln"> </span><span class="pun">..</span><span class="pln"> restart</span><span class="pun">)</span><span class="pln"> &nbsp;&nbsp;&nbsp;
echo </span><span class="pun">-</span><span class="pln">n </span><span class="str">"Restarting $DESC: "</span><span class="pln"> &nbsp;&nbsp;&nbsp; </span><span class="pun">..</span><span class="pln"> &nbsp;&nbsp;&nbsp;
start</span><span class="pun">-</span><span class="pln">stop</span><span class="pun">-</span><span class="pln">daemon </span><span class="pun">--</span><span class="pln">start </span><span class="pun">--</span><span class="pln">quiet </span><span class="pun">--</span><span class="pln">nicelevel </span><span class="lit">19</span><span class="pln"> </span><span class="pun">--</span><span class="pln">pidfile \
    $PIDFILE </span><span class="pun">--</span><span class="kwd">exec</span><span class="pln"> $DAEMON </span><span class="pun">--</span><span class="pln"> $CONF &nbsp;&nbsp;&nbsp; </span><span class="pun">..</span><span class="pln"> </span><span class="pun">*)</span></code></pre>
<p>Anschließend den Dienst mittels <code>service boxbackup-client restart</code> neustarten und gleich mit <code>bbackupctl sync</code> zum Test antriggern.</p>
<h2>Fazit</h2>
<p>Mittels der tollen aber teilweise veralteten deutschen Anleitung und den super TODOs die die Config-Generatoren ausspucken, kommt man recht schnell und zuverlässig voran. Das Backup tut aus den Stand heraus und löst bei mir das in die Jahre gekommende Duplicity ab.</p>
<p>Schon alleine die Config-Dateien und das ein Dienst läuft der nur von Zeit zu Zeit angetriggert wird, statt eines ollen selber zusammengefrickelten Scriptes welches Duplicity steuert – schon allein dafür ist es der Aufwand wert!</p>
<p>Leider leider kann man nicht einfach externen FTP-Backup-Space als Ziel angeben, sodass man im VServer-Umfeld einen echten anderen Server benötigt – oder schlicht die NAS zuhause.</p>
<p><em>Was setzt ihr als Backup-Lösungen ein? Welche Erfahrungen habt ihr so gemacht? Gerne als Kommentare hier oder per Twitter <a href="https://twitter.com/rhflow_de">@rhflow_de</a>.</em></p>
