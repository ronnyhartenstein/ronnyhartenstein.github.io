---
layout: post
status: publish
published: true
title: Es hat sich ausgeMAMPft. Vagrant ist. [Update]
author:
  display_name: ''
  login: ''
  email: ''
  url: ''

wordpress_id: 463
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=463
date: '2014-11-11 11:52:24 +0100'
date_gmt: '2014-11-11 09:52:24 +0100'
categories:
- DevOp
- Vagrant
tags: []
thumb: /files/2014/11/vagrant-960x360.png
---
<p>Schon mit dem Update auf Maverick durfte ich meinen gesamten MacPort <a href="http://en.wikipedia.org/wiki/MAMP">MAMP-Stack</a> neubauen, mich wieder in die <code>/usr/opt/irgendwas</code> Ubuntu-fremde Pfadstruktur einarbeiten. Jetzt nach Yosemite war wieder ein Komplettupdate nötig. Da ich zunehmend seltener lokal entwickle, sollte der Stack schon irgendwie bekannten Mustern folgen, also Configs in <code>/etc</code>, Webkram in <code>/var/www</code> usw. Lokal läuft ja alles über VHosts, und eine <code>/vhosts</code> Verzeichnis, das sind recht viele.</p>
<p>Da stolpere ich über die Unterstützung von Vagrant in PHPStorm. Was ist das? Automatisch konfigurierte VirtualBoxen, extern konfigurierbar? Und das noch Quellcode-verwaltbar ohne GUI? Das ist doch bestimmt ganz schön komplex? Ja und nein. Ein Erfahrungsbericht mit Versuch und viel Irrtum.<span id="more-463"></span></p>
<p>Es gibt reichlich vorkonfigurierte Boxen bei <a href="https://github.com/search?utf8=%E2%9C%93&amp;q=vagrant+box&amp;type=Repositories&amp;ref=searchresults">Github</a> und <a href="https://vagrantcloud.com/discover/featured">Vagrant Cloud</a>. Ich hab mit <a href="https://github.com/sapienza/vagrant-php-box">vagrant-php-box</a> und <a href="https://github.com/Mayflower/vagrant-percona">vagrant-percona</a> gestartet bzw. inspirieren lassen.</p>
<p>Als Out-of-the-box-Lösung für PHP-Webdev-Stacks gibts mit <a href="https://puphpet.com/">PhPHPet</a> eine supergeile GUI die am Ende eine Box-Konfiguration ausspuckt. Aber ich will ja ganz spezielle Boxen selber aufsetzen. (“Framework? Nö, da schreib ich mir lieber ein eigenes, muhaha”). Speziell einen Apache-PHP-Box ohne MySQL und ggf. eine MySQL-Box.</p>

<!--more-->

<h2>MySQL Datenbank Server</h2>
<p>Da ich alle Datenbanken lokal in einen Server bündele, möchte ich das auch weiterhin so handhaben für die Bestandsprojekte.</p>
<p>PHP-Entwicklungsserver (ohne MySQL): Da ja die DB ohnehin in einer eigenen Box stecken, braucht die PHP-Box diesen Server nicht.</p>
<p>Erste Idee: Mysql Server in einer einzelnen Box starten. Blöde Idee, scheitert an Rechten auf die gemountete /var/lib/mysql Datenbank-Ordner. Hat einer auch schon <a href="http://stackoverflow.com/questions/22796386/pre-existing-mysql-data-with-vagrant-virtualbox">bei StackOverflow gefragt</a>, Tipp war dann Impor/Export-Scripte. Ich habe mich dafür entschieden, dass der Mac die Mysql weiter betreiben darf, aber nicht über Mac Port, sondern als Paket direkt von MySQL.</p>
<p>Anleitungen von MySQL:<br>
<a href="http://dev.mysql.com/doc/mysql-macosx-excerpt/5.6/en/macosx-installation-pkg.html">Howto install Native Package</a><br>
<a href="http://dev.mysql.com/doc/mysql-macosx-excerpt/5.6/en/macosx-installation-prefpane.html">Installation Systemsteuerung Panel</a><br>
<a href="http://stackoverflow.com/questions/100948/how-do-you-stop-mysql-on-a-mac-os-install">Bestehenden MySQL-Dienst stoppen</a></p>
<p>Nach einem Neustart des Dienstes funktionierte es dann auch ganz ordentlich. Bei Zweifeln ob der MySQL überhaupt läuft, kann man in <code>/usr/local/mysql/bin: sudo -u _mysql ./mysqld</code> ausführen.</p>
<h2>MySQL doch in ein Vagrant umziehen</h2>
<p>Jeff auf Stackoverflow hat mit seiner Frage <a href="http://stackoverflow.com/questions/22796386/pre-existing-mysql-data-with-vagrant-virtualbox">„Pre-existing MySQL data with Vagrant / VirtualBox“</a> die gleiche Anforderung gehabt, wurde aber dort auf bessere Varianten verwiesen. Ich möchte es trotzdem in einer eigenen Box. Eine Box mit MySQL als einzigen relevanten Dienst ist mit Puppet-Unterstützung recht fix aufgesetzt, das Daten-Verzeichnis noch nach <code>/var/mysql</code> gemountet und los gehts. Der Start <code>sudo service mysql start</code> scheitert. Bei Boot-Problemen einfach mal ins upstart-Log schauen: <code>sudo less /var/log/upstart/mysql.log</code>. Per <code>sudo -u vagrant mysqld</code> meldet er komische Datei-Zugriffsprobleme. Obwohl die Gruppenschreibrechte auf <code>/var/mysql</code> korrekt sind und er mit dem Nutzer <code>vagrant</code> ganz normal alles machen könnte, meldet MySQL es könne keine Testdatei anlegen.</p>
<p>Generell gestaltete sich die Paketinstallation schwierig, die Post-Install-Scripte (<code>apt-get install ...</code> während der Provisionierung) sind immer wieder ohne erkennbaren Grund abgeschmiert. Eine kurze Recherche ergab, dass es wohl am RAM der Box liegt. Standardmäßig sind 512 MB verordnet, also flux auf 1024 MB angehoben in der <code>Vagrantfile</code> ..</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">config.vm.provider "virtualbox" do |vm|
  vm.memory = 1024
end</code></pre>
<p>Siehe da, funktioniert besser. Die Einstellung bietet sich auch für die späteren Apaches an, da reagieren die zügiger, gerade auch im Debugging. Aber weiter mit MySQL.</p>
<p>Da der Vagrant unter dem eigenen Nutzeraccount läuft, muss zunächst der eigene Nutzer in die Gruppe <code>_mysql</code>, da das <code>mysql/data</code> Verzeichnis vom Mac MySQL den Besitzer <code>_mysql:_mysql</code> hat. Klar, kann man für das folgende umbiegen, muss man aber nicht. Ich nehme meinen Nutzer in die Gruppe <code>_mysql</code> auf.</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">sudo dseditgroup -o edit -a ronny -t user _mysql</code></pre>
<p>User <code>mysql</code> wird Mitglied in Gruppe <code>vagrant</code> und umgekehrt:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">sudo usermod -a -G mysql vagrant
sudo usermod -a -G vagrant mysql</code></pre>
<p>Und <code>vagrant</code> soll auf <code>/var/log</code> schreiben können, was der Gruppe <code>syslog</code> gehört.</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">sudo usermod -a -G syslog vagrant
sudo usermod -a -G syslog mysql</code></pre>
<p>Funktioniert leider nicht, immer noch Permission Fehler.</p>
<p>Der Tipp dass evtl. <code>/etc/apparmor.d/local/usr.bin.mysqld</code> fehlen würde, brachte auch nix. Also mal anders probieren. Kann man <code>/var/mysql</code> nicht als User <code>mysql</code> mounten? Ja geht mit VirtualBox als Provider:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">config.vm.synced_folder "/Volumes/Daten/mysql", "/var/mysql", id: "mysql",
  owner: "mysql", group: "mysql",
  mount_options: ["dmode=775,fmode=664"]</code></pre>
<p>Blöderweise ermittelt Vagrant beim Boot für Mount die User-ID und Gruppen-ID. Aber die gibts ja vor der Provisionierung nicht. Henne-Ei-Problem – aber in wiederkehrenden Umgebungen ists ja jedes mal gleich, also fixe IDs festgelegt (innerhalb der laufenden Box mit <code>id mysql</code> ermittelt):</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">config.vm.synced_folder "/Volumes/Daten/mysql", "/var/mysql", id: "mysql",
  owner: 108, group: 113,
  mount_options: ["dmode=775,fmode=664"]</code></pre>
<p>Joar, geht auch vor Provisioning!<br>
MySQL startet natürlich immer noch nicht – selber Senf mit Zugriffsrechten <img src="http://blog.rh-flow.de/wp-includes/images/smilies/frownie.png" alt=":(" class="wp-smiley" style="height: 1em; max-height: 1em;"></p>
<p>Die Lösung fand ich dann <a href="http://ubuntuforums.org/showthread.php?t=782224">hier</a> – es war doch Apparmor, was verbietet, dass der Nutzer <code>mysql</code> ausserhalb von <code>/var/lib/mysql</code> agieren kann. Jetzt startet der MySQL im Vagrant! Meine <a href="https://github.com/ronnyhartenstein/vagrant-mysql-shared-folder/blob/master/modules/mysql/files/my.cnf"><code>my.cnf</code></a> schaut nun so aus:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">[mysqld]
user = mysql
port = 3306
datadir = /var/lib/mysql/vagrant
..</code></pre>
<p>Noch flux den Zugriff von aussen für root eingerichtet:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">GRANT ALL ON . to root@'10.0.2.2';
FLUSH PRIVILEGES;</code></pre>
<p>10.0.2.2 ist bekanntlich die Gateway-IP, also die des Hosts (<code>netstat -rn</code>)<br>
Nice!</p>
<p>SSH muss natürlich auf einen anderen Port nach aussen funken, als bei den PHP-Kisten. Die dürfen auf 2222 mappen, der MySQL aber auf 3322. Im <code>Vagrantfile</code> so:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">config.vm.network :forwarded_port, guest: 22, host: 3322, id: "ssh"</code></pre>
<p>Das <code>id:"ssh"</code> sorgt dafür, dass er SSH nicht doch per Default wieder auf 2222 mappt.</p>
<p>Die momentane Box-Konfiguration inkl. <code>my.cnf</code> ist bei Github im Projekt <a href="https://github.com/ronnyhartenstein/vagrant-mysql-shared-folder">vagrant-mysql-shared-folder</a> verfügbar.</p>
<p><em>[Update 16.11.2014]</em> MySQL startete beim Boot nicht automatisch, bzw. wurde nach 3x mit „<code>init: mysql respawning too fast, stopped</code>“ vom Start ausgenommen. Ein <code>dpkg-reconfigure mysql-server-5.5</code> behob allerdings das Problem.</p>
<h2>Apache</h2>
<p>Weiter gehts mit Webserver. Auf Basis der Vagrant-Puppets-Configs von jas0nkim’s <a href="https://github.com/jas0nkim/my-vagrant-puppet-lamp/">my-vagrant-puppet-lamp</a> gehts daran, Flechtie und dessen <a href="https://www.oxid-esales.com/de/community/oxid-eshop-herunterladen.html">OXID-Onlineshop</a> fitt zu machen. Das Modul <code>mysql</code> hab ich dabei entfernt (<code>manifests/default.pp + modules/mysql</code>).</p>
<p>Der MySQL ist vom Guest über dessen Gateway erreichbar (<code>netstat -rn</code>), bei mir 10.0.2.2. <code>mysql -uroot -h10.0.2.2</code> zeigt das es funktioniert. Also dies flux in OXIDs-config eingetragen. Der Aufruf von <code>localhost:8080</code> zeigt dann schonmal ein funktionierenden Shop, inkl. DB-Verbindung zum Host.</p>
<p>Nun muss noch der Aufruf von <code>http://dev.flechtie.de/</code> direkt in die Vagrant-Box durchschlagen. Problem ist, dass man leider als Nicht-root-Nutzer unter Mac keinen Port &gt;1024 forwarden darf.</p>
<p><a href="http://www.dmuth.org/node/1404/web-development-port-80-and-443-vagrant">Anleitung für Mac bis inkl. Maverick (ipfw)</a><br>
<a href="https://github.com/basecamp/pow/issues/452">Anleitung für Mac ab Yosemite (pf)</a></p>
<p>Bei mir mit Yosemite also so:<br>
Datei <code>/etc/pf.anchors/com.vagrant</code></p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">rdr pass on lo0 inet proto tcp from any to any port 80 -&gt; 127.0.0.1 port 8080
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>leerzeile</span><span class="token punctuation">&gt;</span></span></code></pre>
<p>(Leerzeile am Schluss beachten, <code>&lt;leerzeile&gt; weglassen!)</code></p>
<p>Datei <code>/etc/pf.conf</code>:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">rdr-anchor "com.apple/*"
rdr-anchor "vagrant"
...
load anchor "com.apple" from "/etc/pf.anchors/com.apple"
load anchor "vagrant" from "/etc/pf.anchors/com.vagrant"
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>leerzeile</span><span class="token punctuation">&gt;</span></span></code></pre>
<p>Und aktivieren:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">sudo pfctl -f /etc/pf.conf
sudo pfctl -e</code></pre>
<p>Schon zeigt <a href="http://dev.flechtie.de/">http://dev.flechtie.de/</a> alles i.O. an.</p>
<p><strong><em>[Update 19.11.2014]</em> </strong>Leider kümmert das Mac beim Boot einen Sch**. Man muss mind. einmal manuell <code>sudo pfctl -e</code> nochmal ausführen damit es wieder klappt. Über Vagrant Trigger kann man das Port-Forwarding aber in die <code>Vagrantfile</code> aufnehmen und somit automatisieren – was Salvatore Garbesi in seinen Blogpost <a href="http://salvatore.garbesi.com/vagrant-port-forwarding-on-mac/">„Vagrant Port Forwarding On Mac“</a> aufgeschrieben hat.</p>
<p>Diese Einträge sorgen dafür:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">config.trigger.after [:provision, :up, :reload] do
  system('echo "
rdr pass on lo0 inet proto tcp from any to 127.0.0.1 port 80 -&gt; 127.0.0.1 port 8080
rdr pass on lo0 inet proto tcp from any to 127.0.0.1 port 443 -&gt; 127.0.0.1 port 8443
" | sudo pfctl -f - &gt; /dev/null 2&gt;<span class="token entity" title="&amp;1;">&amp;1;</span> echo "==&gt; Fowarding Ports: 80 -&gt; 8080, 443 -&gt; 8443"')
end

config.trigger.after [:halt, :destroy] do
  system("sudo pfctl -f /etc/pf.conf &gt; /dev/null 2&gt;<span class="token entity" title="&amp;1;">&amp;1;</span> echo '==&gt; Removing Port Forwarding'")
end</code></pre>
<p>Voraussetzung ist das Modul trigger – installiert mit <code>vagrant plugin install vagrant-triggers</code>. Dann können die Anpassungen an der pf.conf übrigens entfallen – schaden aber auch nicht.</p>
<p><b>Mounting als www-data mit Schreibrechten</b></p>
<p>So recht gefällt mir es nicht, dass das Verz. in der Box komplett <code>vagrant:vagrant</code> gehört. Besser wäre <code>www-data:www-data</code>, dann kann der Hack der <code>/etc/apache/envvars</code> in der <code>vagrant/modules/apache/manifests/init.pp</code> auch entfallen. Also getan und Box neu provisioniert (ggf. <code>vagrant destroy</code> &amp; <code>vagrant up</code>)</p>
<p>Allerdings ist das www-Verzeichnis auf meiner Hostmaschine noch <code>_www:_www</code>, dem Standard-Apache-Nutzer auf dem Mac. So kann man leider innerhalb der Box dann nicht in die folder_sync-Dateien schreiben. Also flux meinen Nutzer mit in die Gruppe <code>_www</code> aufgenommen:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">sudo dseditgroup -o edit -a ronny -t user _www</code></pre>
<p>Sollten Dateien auf dem Host mit Recht 644 bzw. 755 und <code>_www:_www</code> vorhanden sein (gern z.B. tmp-Dateien bei OXID), dann <code>chmod -R g+w tmp</code></p>
<h2>Debugging mit xDebug</h2>
<p>Damit das Debuggen mit PHPStorm wie vorher klappt war bissl basteln angesagt, und hauptsächlich die <a href="http://www.neuendorf-online.de/blog/softwareentwicklung/tools/php-entwicklung-mit-vagrant-und-netbeans/">Erkenntnis</a>, dass man den Host als Gateway-IP in den <code>remote_host</code> eintragen muss.</p>
<p>Folgende Zeilen in der php.ini müssen in der Box landen:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">[xdebug]
xdebug.remote_enable = 1
xdebug.remote_host = "10.0.2.2"
xdebug.remote_port = 9000
xdebug.remote_handler = "dbgp"
xdebug.profiler_enable = 0
xdebug.profiler_enable_trigger = 1
xdebug.idekey = "vagrant"</code></pre>
<p>Dann kann man im FF via Plugin <a href="https://addons.mozilla.org/en-US/firefox/addon/easy-xdebug/">easyXdebug</a> das Debugging antriggern und im PHPStorm das Debugging einfach aktiveren (Telefonsymbol auf grün schalten).</p>
<h3>Vagrant Manager</h3>
<p><em>[Update 27.11.2014]</em><br>
Vagrant bringt zwar ein paar Kommandozeilentools, aber so ein hübsches Klicki-Bunti-Tool für die Mac Systemzeile ist doch auch was. So sieht man gleich was es für Vagrant-Boxen gibt, und ob sie laufen, ob sie pausiert worden sind u.ä. … <strong><a href="http://vagrantmanager.com/">Vagrant Manager</a></strong> ist genau das! Das ganze ist Opensource <a href="https://github.com/lanayotech/vagrant-manager/">auf GitHub verfügbar</a> und die Leute da freuen sich über ein mittelkleine Spende.</p>
<h2>Fazit</h2>
<p>Insgesamt hat mich die Sache bislang einige Abende und einen ganzen Sonntag „gekostet“. Aber die Möglichkeiten der Verzinsung sind enorm! Die lokale Entwicklung nun endlich abgekoppelt vom Host-Betriebssystem ist – Windows statt Mac ist ohne Probleme möglich. Und ohne weiteres können neue Boxen zum Spielen und Lernen aufgesetzt werden. Da sind das fantastische PHP-Framework Laravel mit seiner <a>offiziellen lokalen Entwicklungsumgebung Homestead</a> (Projekt bei <a href="https://github.com/laravel/homestead">Github</a>), oder auch ein <a href="https://github.com/irmantas/symfony2-vagrant">Symfony</a> (oder <a href="http://nater1067.github.io/blog/2014/08/25/spinning-up-symfony-2-development-environments-with-vagrant/">hier</a>), <a href="https://github.com/onddo/owncloud-cookbook/blob/master/Vagrantfile">ownCloud</a>, ein <a href="https://github.com/joaquimserafim/vagrant-nodejs-redis-mongodb">NodeJS mit Redis und MongoDB</a> (oder auch <a href="https://github.com/semmypurewal/node-dev-bootstrap">hier</a>), oder auch Facebooks <a href="https://github.com/javer/hhvm-vagrant-vm">HHVM</a>. Leider hab ich für <a href="http://www.appserver.io/home.html">appserver.io</a> noch keine Vagrant Box gefunden, <i>challenge accepted</i>!</p>
<p>Fragen und Anregungen gerne via <a href="https://twitter.com/rhflow_de">@rhflow_de</a> oder als Kommentar hier.</p>
<h3>Rausschmeißer</h3>
<p>Lesespaß gibts noch hier beim PHPmagazin: <a href="http://phpmagazin.de/artikel/PHP-5455-mit-Vagrant-Chef-virtualisieren">PHP 5.4 und 5.5 mit Vagrant und Chef virtualisieren</a>.</p>
