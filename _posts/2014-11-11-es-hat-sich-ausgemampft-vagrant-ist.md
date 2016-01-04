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
excerpt: |-
  Schon mit dem Update auf Maverick durfte ich meinen gesamten MacPort MAMP-Stack neubauen, mich wieder in die /usr/opt/irgendwas Ubuntu-fremde Pfadstruktur einarbeiten. Jetzt nach Yosemite war wieder ein Komplettupdate n&ouml;tig. Da ich zunehmend seltener lokal entwickle, sollte der Stack schon irgendwie bekannten Mustern folgen, also Configs in /etc, Webkram in /var/www usw. Lokal l&auml;uft ja alles &uuml;ber VHosts, und eine /vhosts Verzeichnis, das sind recht viele.

  Da stolpere ich &uuml;ber die Unterst&uuml;tzung von Vagrant in PHPStorm. Was ist das? Automatisch konfigurierte VirtualBoxen, extern konfigurierbar? Und das noch Quellcode-verwaltbar ohne GUI? Das ist doch bestimmt ganz sch&ouml;n komplex? Ja und nein. Ein Erfahrungsbericht mit Versuch und viel Irrtum.
wordpress_id: 463
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=463
date: '2014-11-11 11:52:24 +0100'
date_gmt: '2014-11-11 09:52:24 +0100'
categories:
- DevOp
- Vagrant
tags: []
---
<p>Schon mit dem Update auf Maverick durfte ich meinen gesamten MacPort <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;MAMP">MAMP-Stack<&#47;a> neubauen, mich wieder in die <code>&#47;usr&#47;opt&#47;irgendwas<&#47;code> Ubuntu-fremde Pfadstruktur einarbeiten. Jetzt nach Yosemite war wieder ein Komplettupdate n&ouml;tig. Da ich zunehmend seltener lokal entwickle, sollte der Stack schon irgendwie bekannten Mustern folgen, also Configs in <code>&#47;etc<&#47;code>, Webkram in <code>&#47;var&#47;www<&#47;code> usw. Lokal l&auml;uft ja alles &uuml;ber VHosts, und eine <code>&#47;vhosts<&#47;code> Verzeichnis, das sind recht viele.<&#47;p></p>
<p>Da stolpere ich &uuml;ber die Unterst&uuml;tzung von Vagrant in PHPStorm. Was ist das? Automatisch konfigurierte VirtualBoxen, extern konfigurierbar? Und das noch Quellcode-verwaltbar ohne GUI? Das ist doch bestimmt ganz sch&ouml;n komplex? Ja und nein. Ein Erfahrungsbericht mit Versuch und viel Irrtum.<a id="more"></a><a id="more-463"></a><&#47;p></p>
<p>Es gibt reichlich vorkonfigurierte Boxen bei <a href="https:&#47;&#47;github.com&#47;search?utf8=%E2%9C%93&amp;q=vagrant+box&amp;type=Repositories&amp;ref=searchresults">Github<&#47;a> und <a href="https:&#47;&#47;vagrantcloud.com&#47;discover&#47;featured">Vagrant Cloud<&#47;a>. Ich hab mit <a href="https:&#47;&#47;github.com&#47;sapienza&#47;vagrant-php-box">vagrant-php-box<&#47;a> und <a href="https:&#47;&#47;github.com&#47;Mayflower&#47;vagrant-percona">vagrant-percona<&#47;a> gestartet bzw. inspirieren lassen.<&#47;p></p>
<p>Als Out-of-the-box-L&ouml;sung f&uuml;r PHP-Webdev-Stacks gibts mit <a href="https:&#47;&#47;puphpet.com&#47;">PhPHPet<&#47;a> eine supergeile GUI die am Ende eine Box-Konfiguration ausspuckt. Aber ich will ja ganz spezielle Boxen selber aufsetzen. (&ldquo;Framework? N&ouml;, da schreib ich mir lieber ein eigenes, muhaha&rdquo;). Speziell einen Apache-PHP-Box ohne MySQL und ggf. eine MySQL-Box.<&#47;p></p>
<h2>MySQL Datenbank Server<&#47;h2></p>
<p>Da ich alle Datenbanken lokal in einen Server b&uuml;ndele, m&ouml;chte ich das auch weiterhin so handhaben f&uuml;r die Bestandsprojekte.<&#47;p></p>
<p>PHP-Entwicklungsserver (ohne MySQL): Da ja die DB ohnehin in einer eigenen Box stecken, braucht die PHP-Box diesen Server nicht.<&#47;p></p>
<p>Erste Idee: Mysql Server in einer einzelnen Box starten. Bl&ouml;de Idee, scheitert an Rechten auf die gemountete &#47;var&#47;lib&#47;mysql Datenbank-Ordner. Hat einer auch schon <a href="http:&#47;&#47;stackoverflow.com&#47;questions&#47;22796386&#47;pre-existing-mysql-data-with-vagrant-virtualbox">bei StackOverflow gefragt<&#47;a>, Tipp war dann Impor&#47;Export-Scripte. Ich habe mich daf&uuml;r entschieden, dass der Mac die Mysql weiter betreiben darf, aber nicht &uuml;ber Mac Port, sondern als Paket direkt von MySQL.<&#47;p></p>
<p>Anleitungen von MySQL:<br />
<a href="http:&#47;&#47;dev.mysql.com&#47;doc&#47;mysql-macosx-excerpt&#47;5.6&#47;en&#47;macosx-installation-pkg.html">Howto install Native Package<&#47;a><br />
<a href="http:&#47;&#47;dev.mysql.com&#47;doc&#47;mysql-macosx-excerpt&#47;5.6&#47;en&#47;macosx-installation-prefpane.html">Installation Systemsteuerung Panel<&#47;a><br />
<a href="http:&#47;&#47;stackoverflow.com&#47;questions&#47;100948&#47;how-do-you-stop-mysql-on-a-mac-os-install">Bestehenden MySQL-Dienst stoppen<&#47;a><&#47;p></p>
<p>Nach einem Neustart des Dienstes funktionierte es dann auch ganz ordentlich. Bei Zweifeln ob der MySQL &uuml;berhaupt l&auml;uft, kann man in <code>&#47;usr&#47;local&#47;mysql&#47;bin: sudo -u _mysql .&#47;mysqld<&#47;code> ausf&uuml;hren.<&#47;p></p>
<h2>MySQL doch in ein Vagrant umziehen<&#47;h2></p>
<p>Jeff auf Stackoverflow hat mit seiner Frage <a href="http:&#47;&#47;stackoverflow.com&#47;questions&#47;22796386&#47;pre-existing-mysql-data-with-vagrant-virtualbox">"Pre-existing MySQL data with Vagrant &#47; VirtualBox"<&#47;a> die gleiche Anforderung gehabt, wurde aber dort auf bessere Varianten verwiesen. Ich m&ouml;chte es trotzdem in einer eigenen Box. Eine Box mit MySQL als einzigen relevanten Dienst ist mit Puppet-Unterst&uuml;tzung recht fix aufgesetzt, das Daten-Verzeichnis noch nach <code>&#47;var&#47;mysql<&#47;code> gemountet und los gehts. Der Start <code>sudo service mysql start<&#47;code> scheitert. Bei Boot-Problemen einfach mal ins upstart-Log schauen: <code>sudo less &#47;var&#47;log&#47;upstart&#47;mysql.log<&#47;code>. Per <code>sudo -u vagrant mysqld<&#47;code> meldet er komische Datei-Zugriffsprobleme. Obwohl die Gruppenschreibrechte auf <code>&#47;var&#47;mysql<&#47;code> korrekt sind und er mit dem Nutzer <code>vagrant<&#47;code> ganz normal alles machen k&ouml;nnte, meldet MySQL es k&ouml;nne keine Testdatei anlegen.<&#47;p></p>
<p>Generell gestaltete sich die Paketinstallation schwierig, die Post-Install-Scripte (<code>apt-get install ...<&#47;code> w&auml;hrend der Provisionierung) sind immer wieder ohne erkennbaren Grund abgeschmiert. Eine kurze Recherche ergab, dass es wohl am RAM der Box liegt. Standardm&auml;&szlig;ig sind 512 MB verordnet, also flux auf 1024 MB angehoben in der <code>Vagrantfile<&#47;code> ..<&#47;p></p>
<p>[code language="ruby"]<br />
config.vm.provider "virtualbox" do |vm|<br />
  vm.memory = 1024<br />
end<br />
[&#47;code]<&#47;p></p>
<p>Siehe da, funktioniert besser. Die Einstellung bietet sich auch f&uuml;r die sp&auml;teren Apaches an, da reagieren die z&uuml;giger, gerade auch im Debugging. Aber weiter mit MySQL.<&#47;p></p>
<p>Da der Vagrant unter dem eigenen Nutzeraccount l&auml;uft, muss zun&auml;chst der eigene Nutzer in die Gruppe <code>_mysql<&#47;code>, da das <code>mysql&#47;data<&#47;code> Verzeichnis vom Mac MySQL den Besitzer <code>_mysql:_mysql<&#47;code> hat. Klar, kann man f&uuml;r das folgende umbiegen, muss man aber nicht. Ich nehme meinen Nutzer in die Gruppe <code>_mysql<&#47;code> auf.<&#47;p></p>
<p>[code language="bash"]<br />
sudo dseditgroup -o edit -a ronny -t user _mysql<br />
[&#47;code]<&#47;p></p>
<p>User <code>mysql<&#47;code> wird Mitglied in Gruppe <code>vagrant<&#47;code> und umgekehrt:<&#47;p></p>
<p>[code language="bash"]<br />
sudo usermod -a -G mysql vagrant<br />
sudo usermod -a -G vagrant mysql<br />
[&#47;code]<&#47;p></p>
<p>Und <code>vagrant<&#47;code> soll auf <code>&#47;var&#47;log<&#47;code> schreiben k&ouml;nnen, was der Gruppe <code>syslog<&#47;code> geh&ouml;rt.<&#47;p></p>
<p>[code language="bash"]<br />
sudo usermod -a -G syslog vagrant<br />
sudo usermod -a -G syslog mysql<br />
[&#47;code]<&#47;p></p>
<p>Funktioniert leider nicht, immer noch Permission Fehler.<&#47;p></p>
<p>Der Tipp dass evtl. <code>&#47;etc&#47;apparmor.d&#47;local&#47;usr.bin.mysqld<&#47;code> fehlen w&uuml;rde, brachte auch nix. Also mal anders probieren. Kann man <code>&#47;var&#47;mysql<&#47;code> nicht als User <code>mysql<&#47;code> mounten? Ja geht mit VirtualBox als Provider:<&#47;p></p>
<p>[code language="ruby"]<br />
config.vm.synced_folder "&#47;Volumes&#47;Daten&#47;mysql", "&#47;var&#47;mysql", id: "mysql",<br />
  owner: "mysql", group: "mysql",<br />
  mount_options: ["dmode=775,fmode=664"]<br />
[&#47;code]<&#47;p></p>
<p>Bl&ouml;derweise ermittelt Vagrant beim Boot f&uuml;r Mount die User-ID und Gruppen-ID. Aber die gibts ja vor der Provisionierung nicht. Henne-Ei-Problem - aber in wiederkehrenden Umgebungen ists ja jedes mal gleich, also fixe IDs festgelegt (innerhalb der laufenden Box mit <code>id mysql<&#47;code> ermittelt):<&#47;p></p>
<p>[code language="ruby"]<br />
config.vm.synced_folder "&#47;Volumes&#47;Daten&#47;mysql", "&#47;var&#47;mysql", id: "mysql",<br />
  owner: 108, group: 113,<br />
  mount_options: ["dmode=775,fmode=664"]<br />
[&#47;code]<&#47;p></p>
<p>Joar, geht auch vor Provisioning!<br />
MySQL startet nat&uuml;rlich immer noch nicht - selber Senf mit Zugriffsrechten :(<&#47;p></p>
<p>Die L&ouml;sung fand ich dann <a href="http:&#47;&#47;ubuntuforums.org&#47;showthread.php?t=782224">hier<&#47;a> - es war doch Apparmor, was verbietet, dass der Nutzer <code>mysql<&#47;code> ausserhalb von <code>&#47;var&#47;lib&#47;mysql<&#47;code> agieren kann. Jetzt startet der MySQL im Vagrant! Meine <a href="https:&#47;&#47;github.com&#47;ronnyhartenstein&#47;vagrant-mysql-shared-folder&#47;blob&#47;master&#47;modules&#47;mysql&#47;files&#47;my.cnf"><code>my.cnf<&#47;code><&#47;a> schaut nun so aus:<&#47;p></p>
<p>[code]<br />
[mysqld]<br />
user = mysql<br />
port = 3306<br />
datadir = &#47;var&#47;lib&#47;mysql&#47;vagrant<br />
..<br />
[&#47;code]<&#47;p></p>
<p>Noch flux den Zugriff von aussen f&uuml;r root eingerichtet:<&#47;p></p>
<p>[code language="mysql"]<br />
GRANT ALL ON <em>.<&#47;em> to root@'10.0.2.2';<br />
FLUSH PRIVILEGES;<br />
[&#47;code]<&#47;p></p>
<p>10.0.2.2 ist bekanntlich die Gateway-IP, also die des Hosts (<code>netstat -rn<&#47;code>)<br />
Nice!<&#47;p></p>
<p>SSH muss nat&uuml;rlich auf einen anderen Port nach aussen funken, als bei den PHP-Kisten. Die d&uuml;rfen auf 2222 mappen, der MySQL aber auf 3322. Im <code>Vagrantfile<&#47;code> so:<&#47;p></p>
<p>[code]<br />
config.vm.network :forwarded_port, guest: 22, host: 3322, id: "ssh"<br />
[&#47;code]<&#47;p></p>
<p>Das <code>id:"ssh"<&#47;code> sorgt daf&uuml;r, dass er SSH nicht doch per Default wieder auf 2222 mappt.<&#47;p></p>
<p>Die momentane Box-Konfiguration inkl. <code>my.cnf<&#47;code> ist bei Github im Projekt <a href="https:&#47;&#47;github.com&#47;ronnyhartenstein&#47;vagrant-mysql-shared-folder">vagrant-mysql-shared-folder<&#47;a> verf&uuml;gbar.<&#47;p></p>
<p><em>[Update 16.11.2014]<&#47;em> MySQL startete beim Boot nicht automatisch, bzw. wurde nach 3x mit "<code>init: mysql respawning too fast, stopped<&#47;code>" vom Start ausgenommen. Ein <code>dpkg-reconfigure mysql-server-5.5<&#47;code> behob allerdings das Problem.<&#47;p></p>
<h2>Apache<&#47;h2></p>
<p>Weiter gehts mit Webserver. Auf Basis der Vagrant-Puppets-Configs von jas0nkim&rsquo;s <a href="https:&#47;&#47;github.com&#47;jas0nkim&#47;my-vagrant-puppet-lamp&#47;">my-vagrant-puppet-lamp<&#47;a> gehts daran, Flechtie und dessen <a href="https:&#47;&#47;www.oxid-esales.com&#47;de&#47;community&#47;oxid-eshop-herunterladen.html">OXID-Onlineshop<&#47;a> fitt zu machen. Das Modul <code>mysql<&#47;code> hab ich dabei entfernt (<code>manifests&#47;default.pp + modules&#47;mysql<&#47;code>).<&#47;p></p>
<p>Der MySQL ist vom Guest &uuml;ber dessen Gateway erreichbar (<code>netstat -rn<&#47;code>), bei mir 10.0.2.2. <code>mysql -uroot -h10.0.2.2<&#47;code> zeigt das es funktioniert. Also dies flux in OXIDs-config eingetragen. Der Aufruf von <code>localhost:8080<&#47;code> zeigt dann schonmal ein funktionierenden Shop, inkl. DB-Verbindung zum Host.<&#47;p></p>
<p>Nun muss noch der Aufruf von <code>http:&#47;&#47;dev.flechtie.de&#47;<&#47;code> direkt in die Vagrant-Box durchschlagen. Problem ist, dass man leider als Nicht-root-Nutzer unter Mac keinen Port >1024 forwarden darf.<&#47;p></p>
<p><a href="http:&#47;&#47;www.dmuth.org&#47;node&#47;1404&#47;web-development-port-80-and-443-vagrant">Anleitung f&uuml;r Mac bis inkl. Maverick (ipfw)<&#47;a><br />
<a href="https:&#47;&#47;github.com&#47;basecamp&#47;pow&#47;issues&#47;452">Anleitung f&uuml;r Mac ab Yosemite (pf)<&#47;a><&#47;p></p>
<p>Bei mir mit Yosemite also so:<br />
Datei <code>&#47;etc&#47;pf.anchors&#47;com.vagrant<&#47;code><&#47;p></p>
<p>[code]<br />
rdr pass on lo0 inet proto tcp from any to any port 80 -> 127.0.0.1 port 8080<br />
<leerzeile><br />
[&#47;code]<&#47;p></p>
<p>(Leerzeile am Schluss beachten, <code><leerzeile> weglassen!)<&#47;code><&#47;p></p>
<p>Datei <code>&#47;etc&#47;pf.conf<&#47;code>:<&#47;p></p>
<p>[code]<br />
rdr-anchor "com.apple&#47;*"<br />
rdr-anchor "vagrant"<br />
...<br />
load anchor "com.apple" from "&#47;etc&#47;pf.anchors&#47;com.apple"<br />
load anchor "vagrant" from "&#47;etc&#47;pf.anchors&#47;com.vagrant"<br />
<leerzeile><br />
[&#47;code]<&#47;p></p>
<p>Und aktivieren:<&#47;p></p>
<p>[code language="bash"]<br />
sudo pfctl -f &#47;etc&#47;pf.conf<br />
sudo pfctl -e<br />
[&#47;code]<&#47;p></p>
<p>Schon zeigt <a href="http:&#47;&#47;dev.flechtie.de&#47;">http:&#47;&#47;dev.flechtie.de&#47;<&#47;a> alles i.O. an.<&#47;p></p>
<p><strong><em>[Update 19.11.2014]<&#47;em> <&#47;strong>Leider k&uuml;mmert das Mac beim Boot einen Sch**. Man muss mind. einmal manuell <code>sudo pfctl -e<&#47;code> nochmal ausf&uuml;hren damit es wieder klappt. &Uuml;ber Vagrant Trigger kann man das Port-Forwarding aber in die <code>Vagrantfile<&#47;code> aufnehmen und somit automatisieren - was Salvatore Garbesi in seinen Blogpost <a href="http:&#47;&#47;salvatore.garbesi.com&#47;vagrant-port-forwarding-on-mac&#47;">"Vagrant Port Forwarding On Mac"<&#47;a> aufgeschrieben hat.<&#47;p></p>
<p>Diese Eintr&auml;ge sorgen daf&uuml;r:<&#47;p></p>
<p>[code language="ruby"]<br />
config.trigger.after [:provision, :up, :reload] do<br />
  system('echo "<br />
rdr pass on lo0 inet proto tcp from any to 127.0.0.1 port 80 -> 127.0.0.1 port 8080<br />
rdr pass on lo0 inet proto tcp from any to 127.0.0.1 port 443 -> 127.0.0.1 port 8443<br />
" | sudo pfctl -f - > &#47;dev&#47;null 2>&amp;1; echo "==> Fowarding Ports: 80 -> 8080, 443 -> 8443"')<br />
end<&#47;p></p>
<p>config.trigger.after [:halt, :destroy] do<br />
  system("sudo pfctl -f &#47;etc&#47;pf.conf > &#47;dev&#47;null 2>&amp;1; echo '==> Removing Port Forwarding'")<br />
end<br />
[&#47;code]<&#47;p></p>
<p>Voraussetzung ist das Modul trigger - installiert mit <code>vagrant plugin install vagrant-triggers<&#47;code>. Dann k&ouml;nnen die Anpassungen an der pf.conf &uuml;brigens entfallen - schaden aber auch nicht.<&#47;p></p>
<p><b>Mounting als www-data mit Schreibrechten<&#47;b><&#47;p></p>
<p>So recht gef&auml;llt mir es nicht, dass das Verz. in der Box komplett <code>vagrant:vagrant<&#47;code> geh&ouml;rt. Besser w&auml;re <code>www-data:www-data<&#47;code>, dann kann der Hack der <code>&#47;etc&#47;apache&#47;envvars<&#47;code> in der <code>vagrant&#47;modules&#47;apache&#47;manifests&#47;init.pp<&#47;code> auch entfallen. Also getan und Box neu provisioniert (ggf. <code>vagrant destroy<&#47;code> &amp; <code>vagrant up<&#47;code>)<&#47;p></p>
<p>Allerdings ist das www-Verzeichnis auf meiner Hostmaschine noch <code>_www:_www<&#47;code>, dem Standard-Apache-Nutzer auf dem Mac. So kann man leider innerhalb der Box dann nicht in die folder_sync-Dateien schreiben. Also flux meinen Nutzer mit in die Gruppe <code>_www<&#47;code> aufgenommen:<&#47;p></p>
<p>[code language="bash"]<br />
sudo dseditgroup -o edit -a ronny -t user _www<br />
[&#47;code]<&#47;p></p>
<p>Sollten Dateien auf dem Host mit Recht 644 bzw. 755 und <code>_www:_www<&#47;code> vorhanden sein (gern z.B. tmp-Dateien bei OXID), dann <code>chmod -R g+w tmp<&#47;code><&#47;p></p>
<h2>Debugging mit xDebug<&#47;h2></p>
<p>Damit das Debuggen mit PHPStorm wie vorher klappt war bissl basteln angesagt, und haupts&auml;chlich die <a href="http:&#47;&#47;www.neuendorf-online.de&#47;blog&#47;softwareentwicklung&#47;tools&#47;php-entwicklung-mit-vagrant-und-netbeans&#47;">Erkenntnis<&#47;a>, dass man den Host als Gateway-IP in den <code>remote_host<&#47;code> eintragen muss.<&#47;p></p>
<p>Folgende Zeilen in der php.ini m&uuml;ssen in der Box landen:<&#47;p></p>
<p>[code]<br />
[xdebug]<br />
xdebug.remote_enable = 1<br />
xdebug.remote_host = "10.0.2.2"<br />
xdebug.remote_port = 9000<br />
xdebug.remote_handler = "dbgp"<br />
xdebug.profiler_enable = 0<br />
xdebug.profiler_enable_trigger = 1<br />
xdebug.idekey = "vagrant"<br />
[&#47;code]<&#47;p></p>
<p>Dann kann man im FF via Plugin <a href="https:&#47;&#47;addons.mozilla.org&#47;en-US&#47;firefox&#47;addon&#47;easy-xdebug&#47;">easyXdebug<&#47;a> das Debugging antriggern und im PHPStorm das Debugging einfach aktiveren (Telefonsymbol auf gr&uuml;n schalten).<&#47;p></p>
<h3>Vagrant Manager<&#47;h3></p>
<p><em>[Update 27.11.2014]<&#47;em><br />
Vagrant bringt zwar ein paar Kommandozeilentools, aber so ein h&uuml;bsches Klicki-Bunti-Tool f&uuml;r die Mac Systemzeile ist doch auch was. So sieht man gleich was es f&uuml;r Vagrant-Boxen gibt, und ob sie laufen, ob sie pausiert worden sind u.&auml;. ... <strong><a href="http:&#47;&#47;vagrantmanager.com&#47;">Vagrant Manager<&#47;a><&#47;strong> ist genau das! Das ganze ist Opensource <a href="https:&#47;&#47;github.com&#47;lanayotech&#47;vagrant-manager&#47;">auf GitHub verf&uuml;gbar<&#47;a> und die Leute da freuen sich &uuml;ber ein mittelkleine Spende.<&#47;p></p>
<h2>Fazit<&#47;h2></p>
<p>Insgesamt hat mich die Sache bislang einige Abende und einen ganzen Sonntag "gekostet". Aber die M&ouml;glichkeiten der Verzinsung sind enorm! Die lokale Entwicklung nun endlich abgekoppelt vom Host-Betriebssystem ist - Windows statt Mac ist ohne Probleme m&ouml;glich. Und ohne weiteres k&ouml;nnen neue Boxen zum Spielen und Lernen aufgesetzt werden. Da sind das fantastische PHP-Framework Laravel mit seiner <a>offiziellen lokalen Entwicklungsumgebung Homestead<&#47;a> (Projekt bei <a href="https:&#47;&#47;github.com&#47;laravel&#47;homestead">Github<&#47;a>), oder auch ein <a href="https:&#47;&#47;github.com&#47;irmantas&#47;symfony2-vagrant">Symfony<&#47;a> (oder <a href="http:&#47;&#47;nater1067.github.io&#47;blog&#47;2014&#47;08&#47;25&#47;spinning-up-symfony-2-development-environments-with-vagrant&#47;">hier<&#47;a>), <a href="https:&#47;&#47;github.com&#47;onddo&#47;owncloud-cookbook&#47;blob&#47;master&#47;Vagrantfile">ownCloud<&#47;a>, ein <a href="https:&#47;&#47;github.com&#47;joaquimserafim&#47;vagrant-nodejs-redis-mongodb">NodeJS mit Redis und MongoDB<&#47;a> (oder auch <a href="https:&#47;&#47;github.com&#47;semmypurewal&#47;node-dev-bootstrap">hier<&#47;a>), oder auch Facebooks <a href="https:&#47;&#47;github.com&#47;javer&#47;hhvm-vagrant-vm">HHVM<&#47;a>. Leider hab ich f&uuml;r <a href="http:&#47;&#47;www.appserver.io&#47;home.html">appserver.io<&#47;a> noch keine Vagrant Box gefunden, <i>challenge accepted<&#47;i>!<&#47;p></p>
<p>Fragen und Anregungen gerne via <a href="https:&#47;&#47;twitter.com&#47;rhflow_de">@rhflow_de<&#47;a> oder als Kommentar hier.<&#47;p></p>
<h3>Rausschmei&szlig;er<&#47;h3></p>
<p>Lesespa&szlig; gibts noch hier beim PHPmagazin: <a href="http:&#47;&#47;phpmagazin.de&#47;artikel&#47;PHP-5455-mit-Vagrant-Chef-virtualisieren">PHP 5.4 und 5.5 mit Vagrant und Chef virtualisieren<&#47;a>.<&#47;p></p>
