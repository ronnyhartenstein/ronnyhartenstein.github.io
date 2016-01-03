---
layout: post
status: publish
published: true
title: 'Docker statt Vagrant: dank Boot2docker auch auf dem Mac'
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: Vagrant ist ja sowas von 2014. Naja, nicht wirklich, ist ja immernoch ein
  sehr cooler Ansatz um eine VM versionierbar zu provisionieren. Dies ist auch <strong>kein
  Rant gegen Vagrant<&#47;strong>! Ich habe ja selbst erst Ende letzten Jahres &uuml;ber
  den <a title="Es hat sich ausgeMAMPft. Vagrant ist. [Update]" href="http:&#47;&#47;blog.rh-flow.de&#47;2014&#47;11&#47;11&#47;es-hat-sich-ausgemampft-vagrant-ist&#47;">Wechsel
  von MAMP zu Vagrant<&#47;a> gebloggt. Aber wenn man lokal mehrere Projekte mit mehreren
  verschieden best&uuml;ckten VMs aufzieht und miteinander reden l&auml;sst, ist fix
  auch 8 GB RAM verkonsumiert. Und da springt Docker durch den anderen Ansatz in die
  Presche. Angefixt durch zwei Artikel im aktuellen <b>PHPMagazin 2&#47;2015<&#47;b>
  hab ich das ganze auf meinen Mac mit Hilfe von <b>boot2docker<&#47;b> mal angetestet.
wordpress_id: 572
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=572
date: '2015-01-25 14:47:39 +0100'
date_gmt: '2015-01-25 12:47:39 +0100'
categories:
- PHP
- DevOp
- Docker
- Vagrant
tags: []
---
<p>Vagrant ist ja sowas von 2014. Naja, nicht wirklich, ist ja immernoch ein sehr cooler Ansatz um eine VM versionierbar zu provisionieren. Dies ist auch <strong>kein Rant gegen Vagrant<&#47;strong>! Ich habe ja selbst erst Ende letzten Jahres &uuml;ber den <a title="Es hat sich ausgeMAMPft. Vagrant ist. [Update]" href="http:&#47;&#47;blog.rh-flow.de&#47;2014&#47;11&#47;11&#47;es-hat-sich-ausgemampft-vagrant-ist&#47;">Wechsel von MAMP zu Vagrant<&#47;a> gebloggt. Aber wenn man lokal mehrere Projekte mit mehreren verschieden best&uuml;ckten VMs aufzieht und miteinander reden l&auml;sst, ist fix auch 8 GB RAM verkonsumiert. Und da springt Docker durch den anderen Ansatz in die Presche. Angefixt durch zwei Artikel im aktuellen <b>PHPMagazin 2&#47;2015<&#47;b> hab ich das ganze auf meinen Mac mit Hilfe von <b>boot2docker<&#47;b> mal angetestet.<a id="more"></a><a id="more-572"></a></p>
<h2><b>TL;DR<&#47;b><&#47;h2><br />
Docker erm&ouml;glicht <b>&auml;nderbare <&#47;b>Anwendungs-<b>Container<&#47;b> zu erstellen und zu betreiben, die auf <b>nicht &auml;nderbaren Images<&#47;b> basieren. &Auml;nderungen k&ouml;nnen commitet werden zu einen neuen Image. Diese werden lokal in einen Repository verwaltet.</p>
<p>Docker selbst betreibt keine VMs, sondern hat immer das Host-OS als Unterbau. Auf dem Mac ist es die &nbsp;Boot2docker VM (VirtualBox). Es ist wunderbar m&ouml;glich verschiedene Linux-Distros mit verschiedenen Versionen von Diensten nebeneinander Speicherplatz-schonen zu betreiben.</p>
<p>Wenn man das Grundkonzept verstanden und ein bisschen herumprobiert hat, kommt man relativ fix auch als Nicht-Admin dahinter.</p>
<h2><b>Installation boot2docker<&#47;b><&#47;h2><br />
Flux von <a href="http:&#47;&#47;boot2docker.io&#47;">boot2docker.io<&#47;a> heruntergeladen bekommt man nach der Installation die ersten Hinweise wie es weitergeht.</p>
<ul>
<li><i><b><i>Quick-Start:<&#47;i><&#47;b><i> Run Boot2Docker (located in Applications), which will open a terminal window. Then, start a test container with: <&#47;i><i><code> docker run hello-world<&#47;code><&#47;i><&#47;i><&#47;li><br />
<&#47;ul></p>
<ul>
<li><i>To save and share container images, automate workflows, and more sign-up for a free <&#47;i><a href="http:&#47;&#47;hub.docker.com&#47;?utm_source=b2d&amp;utm_medium=installer&amp;utm_term=summary&amp;utm_content=osx&amp;utm_campaign=product"><i>Docker Hub account<&#47;i><&#47;a><i>.<&#47;i><&#47;li><br />
<&#47;ul></p>
<ul>
<li><i>You can upgrade your existing Boot2Docker VM without data loss by running: <&#47;i><i><code> boot2docker upgrade<&#47;code><&#47;i><&#47;li><br />
<&#47;ul></p>
<ul>
<li><i>The <&#47;i><i>docker<&#47;i><i> and <&#47;i><i>boot2docker<&#47;i><i> binaries are in <&#47;i><i><code>&#47;usr&#47;local&#47;bin<&#47;code><&#47;i><i> which you can access from your terminal.  For further information, please see the <&#47;i><a href="http:&#47;&#47;docs.docker.com&#47;installation&#47;mac"><i>Docker OS X installation documentation<&#47;i><&#47;a><i>.<&#47;i><&#47;li><br />
<&#47;ul></p>
<h3><b>boot2docker intialisieren<&#47;b><&#47;h3><br />
boot2docker gestartet gings dessen Initialisierung los.</p>
<p>[code language="bash" collapse="true" title="boot2docker Initialisierung"]<br />
bash-3.2$ unset DYLD_LIBRARY_PATH ; unset LD_LIBRARY_PATH<br />
bash-3.2$ mkdir -p ~&#47;.boot2docker<br />
bash-3.2$ if [ ! -f ~&#47;.boot2docker&#47;boot2docker.iso ]; then cp &#47;usr&#47;local&#47;share&#47;boot2docker&#47;boot2docker.iso ~&#47;.boot2docker&#47; ; fi<br />
bash-3.2$ &#47;usr&#47;local&#47;bin&#47;boot2docker init<br />
Generating public&#47;private rsa key pair.<br />
Your identification has been saved in &#47;Volumes&#47;Daten&#47;ronny&#47;.ssh&#47;id_boot2docker.<br />
Your public key has been saved in &#47;Volumes&#47;Daten&#47;ronny&#47;.ssh&#47;id_boot2docker.pub.<br />
The key fingerprint is:<br />
... ronny@ronny.fritz.box<br />
The key's randomart image is:<br />
+--[ RSA 2048]----+<br />
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />
..<br />
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; oo+ |<br />
+-----------------+<br />
&#47;usr&#47;local&#47;bin&#47;boot2docker up<br />
$(&#47;usr&#47;local&#47;bin&#47;boot2docker shellinit)<br />
docker version</p>
<p>bash-3.2$ &#47;usr&#47;local&#47;bin&#47;boot2docker up<br />
<b>Waiting for VM and Docker daemon to start...<&#47;b><br />
............................oooooooooooooooooooo<br />
Started.<br />
Writing &#47;Volumes&#47;Daten&#47;ronny&#47;.boot2docker&#47;certs&#47;boot2docker-vm&#47;ca.pem<br />
Writing &#47;Volumes&#47;Daten&#47;ronny&#47;.boot2docker&#47;certs&#47;boot2docker-vm&#47;cert.pem<br />
Writing &#47;Volumes&#47;Daten&#47;ronny&#47;.boot2docker&#47;certs&#47;boot2docker-vm&#47;key.pem</p>
<p>To connect the Docker client to the Docker daemon, please set:<br />
export DOCKER_CERT_PATH=&#47;Volumes&#47;Daten&#47;ronny&#47;.boot2docker&#47;certs&#47;boot2docker-vm<br />
export DOCKER_TLS_VERIFY=1<br />
export DOCKER_HOST=tcp:&#47;&#47;192.168.59.103:2376</p>
<p>bash-3.2$ $(&#47;usr&#47;local&#47;bin&#47;boot2docker shellinit)<br />
Writing &#47;Volumes&#47;Daten&#47;ronny&#47;.boot2docker&#47;certs&#47;boot2docker-vm&#47;ca.pem<br />
Writing &#47;Volumes&#47;Daten&#47;ronny&#47;.boot2docker&#47;certs&#47;boot2docker-vm&#47;cert.pem<br />
Writing &#47;Volumes&#47;Daten&#47;ronny&#47;.boot2docker&#47;certs&#47;boot2docker-vm&#47;key.pem<br />
bash-3.2$ docker version<br />
Client version: 1.4.1<br />
Client API version: 1.16<br />
Go version (client): go1.3.3<br />
Git commit (client): 5bc2ff8<br />
OS&#47;Arch (client): darwin&#47;amd64<br />
Server version: 1.4.1<br />
Server API version: 1.16<br />
Go version (server): go1.3.3<br />
Git commit (server): 5bc2f<br />
[&#47;code]</p>
<h3><b>Fehlermeldung &ldquo;dial unix &#47;var&#47;run&#47;docker.sock: no such file or directory&rdquo; vermeiden<&#47;b><&#47;h3><br />
Schnell den Anweisungen gefolgt und die obigen export DOCKER_* durchgef&uuml;hrt ..</p>
<pre>export DOCKER_CERT_PATH=&#47;Volumes&#47;Daten&#47;ronny&#47;.boot2docker&#47;certs&#47;boot2docker-vm<br />
export DOCKER_TLS_VERIFY=1<br />
export DOCKER_HOST=tcp:&#47;&#47;192.168.59.103:2376<&#47;pre><br />
Sofern man das unter Mac nicht in jeden Terminalfenster macht, f&uuml;hren Aufrufe von docker zu Fehlern wie <code>dial unix &#47;var&#47;run&#47;docker.sock<&#47;code>.</p>
<h3><b>Hello World Beispiel starten<&#47;b><&#47;h3><br />
.. und das Hello World per docker run hello-world Beispiel angetriggert.</p>
<p>[code language="bash" collapse="true" title="Docker hello-world"]<br />
bash-3.2$ docker run hello-world<br />
Unable to find image 'hello-world:latest' locally<br />
hello-world:latest: The image you are pulling has been verified<br />
511136ea3c5a: Pull complete<br />
31cbccb51277: Pull complete<br />
e45a5af57b00: Pull complete<br />
Status: Downloaded newer image for hello-world:latest<br />
Hello from Docker.<br />
This message shows that your installation appears to be working correctly.</p>
<p>To generate this message, Docker took the following steps:<br />
1. The Docker client contacted the Docker daemon.<br />
2. The Docker daemon pulled the "hello-world" image from the Docker Hub. (Assuming it was not already locally available.)<br />
3. The Docker daemon created a new container from that image which runs the executable that produces the output you are currently reading.<br />
4. The Docker daemon streamed that output to the Docker client, which sent it to your terminal.</p>
<p>To try something more ambitious, you can run an Ubuntu container with:</p>
<p>$ docker run -it ubuntu bash</p>
<p>For more examples and ideas, visit:</p>
<p><a href="http:&#47;&#47;docs.docker.com&#47;userguide&#47;">http:&#47;&#47;docs.docker.com&#47;userguide&#47;<&#47;a><br />
[&#47;code]</p>
<p>Scheint zu klappen</p>
<h3><b>Ubuntu mit Bash starten<&#47;b><&#47;h3><br />
Also gleich der n&auml;chsten Empfehlung gefolgt und <code>docker run -it ubuntu bash<&#47;code> ausgef&uuml;hrt.</p>
<p>[code language="bash"]<br />
bash-3.2$ docker run -it ubuntu bash<br />
Unable to find image 'ubuntu:latest' locally<br />
ubuntu:latest: The image you are pulling has been verified<br />
53f858aaaf03: Pull complete<br />
837339b91538: Pull complete<br />
615c102e2290: Pull complete<br />
b39b81afc8ca: Pull complete<br />
511136ea3c5a: Already exists<br />
Status: Downloaded newer image for ubuntu:latest<br />
root@066df2385c5a:&#47;#<br />
[&#47;code]</p>
<p>Schon <b>blinkt der Cursor <&#47;b>in einer Bash innerhalb eines Ubuntu-Docker-Containers! Damit ist die Ausgangsbasis f&uuml;r alle weiteren Docker-Versuche geschaffen. &nbsp;Mensch mensch, das sind echt Profis am Werk, wenn sogar einer wie ich das ans Laufen bekommt.</p>
<h2><b>Grundlagen anlesen<&#47;b><&#47;h2><br />
Bevor ich selber losgelegt habe, hab ich erstmal ein bisschen herumgelesen - zus&auml;tzlich zum PHP Magazin Artikeln...</p>
<ul>
<li><a href="http:&#47;&#47;www.linux-magazin.de&#47;Ausgaben&#47;2013&#47;08&#47;Docker">http:&#47;&#47;www.linux-magazin.de&#47;Ausgaben&#47;2013&#47;08&#47;Docker<&#47;a><&#47;li>
<li><a href="http:&#47;&#47;stackoverflow.com&#47;questions&#47;24928772&#47;docker-how-to-dockerize-and-deploy-multiple-instances-of-a-lamp-application">http:&#47;&#47;stackoverflow.com&#47;questions&#47;24928772&#47;docker-how-to-dockerize-and-deploy-multiple-instances-of-a-lamp-application<&#47;a><&#47;li>
<li><a href="https:&#47;&#47;docs.docker.com&#47;userguide&#47;dockerlinks&#47;">https:&#47;&#47;docs.docker.com&#47;userguide&#47;dockerlinks&#47;<&#47;a><&#47;li>
<li><a href="http:&#47;&#47;play.thinkcube.com&#47;development-environment-on-docker">http:&#47;&#47;play.thinkcube.com&#47;development-environment-on-docker<&#47;a><&#47;li>
<li><a href="https:&#47;&#47;medium.com&#47;@bulgr0z&#47;deploy-a-ready-to-use-consistent-lamp-stack-anywhere-with-docker-eaf669283f31">https:&#47;&#47;medium.com&#47;@bulgr0z&#47;deploy-a-ready-to-use-consistent-lamp-stack-anywhere-with-docker-eaf669283f31<&#47;a><&#47;li>
<li><a href="http:&#47;&#47;viget.com&#47;extend&#47;how-to-use-docker-on-os-x-the-missing-guide">http:&#47;&#47;viget.com&#47;extend&#47;how-to-use-docker-on-os-x-the-missing-guide<&#47;a><&#47;li>
<li><a href="http:&#47;&#47;www.codefest.at&#47;post&#47;2014&#47;11&#47;25&#47;Erste-Schritte-mit-Docker-Teil-1.aspx">http:&#47;&#47;www.codefest.at&#47;post&#47;2014&#47;11&#47;25&#47;Erste-Schritte-mit-Docker-Teil-1.aspx<&#47;a><&#47;li>
<li><a href="http:&#47;&#47;t3n.de&#47;news&#47;docker-cloud-computing-steroiden-550165&#47;">http:&#47;&#47;t3n.de&#47;news&#47;docker-cloud-computing-steroiden-550165&#47;<&#47;a><&#47;li>
<li><a href="http:&#47;&#47;de.slideshare.net&#47;ruoshiling&#47;how-to-deploy-php-projects-with-docker">http:&#47;&#47;de.slideshare.net&#47;ruoshiling&#47;how-to-deploy-php-projects-with-docker<&#47;a><&#47;li><br />
<&#47;ul><br />
Verstanden hab ich die ganze Geschichte &uuml;ber die Use-Cases-Bilder in der <a href="http:&#47;&#47;de.slideshare.net&#47;ruoshiling&#47;how-to-deploy-php-projects-with-docker">Slideshare-Pr&auml;sentation <strong>"How to deploy PHP projects with docker"<&#47;strong> von Ruoshi Ling<&#47;a>.</p>
<p><a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;image02.png"><img class="alignnone wp-image-575 size-full" src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;image02.png" alt="image02" width="634" height="471" &#47;><&#47;a></p>
<p><a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;image03.png"><img class="alignnone wp-image-576 size-full" src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;image03.png" alt="image03" width="631" height="472" &#47;><&#47;a></p>
<p><a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;image05.png"><img class="alignnone wp-image-578 size-full" src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;image05.png" alt="image05" width="630" height="469" &#47;><&#47;a></p>
<p><a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;image04.png"><img class="alignnone wp-image-577 size-full" src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;image04.png" alt="image04" width="630" height="470" &#47;><&#47;a></p>
<p><a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;image00.png"><img class="alignnone wp-image-573 size-full" src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;image00.png" alt="image00" width="633" height="472" &#47;><&#47;a></p>
<p>Alles klar? Nicht? Dann den ganzen Vortrag durcharbeiten und die Artikel nochmal lesen.</p>
<h2><b>Mounten von Verzeichnissen: Mac OSX > Boot2docker VM > Docker-Container<&#47;b><&#47;h2><br />
Bevor ich irgendwelche MySQL oder Apache hochziehen kann, muss erstmal gekl&auml;rt werden, wie &uuml;berhaupt die Daten sauber in die Docker-Container reinkommen. L&auml;uft Docker nativ auf der eigenen Linux-B&uuml;chse, sind alle Verzeichnisse ja (im Rahmen von SELinux) erreichbar. Aber auf Mac gibt es mit der Boot2docker VM noch eine weitere Schicht dazwischen.</p>
<p>Seit <a href="https:&#47;&#47;blog.docker.com&#47;2014&#47;10&#47;docker-1-3-signed-images-process-injection-security-options-mac-shared-directories&#47;">Docker 1.3 und &ldquo;signed images&rdquo;<&#47;a> ist zumindest das nicht mehr so schwer. Das Verzeichnis &#47;Users ist standardm&auml;&szlig;ig eingebunden, siehe auch <a href="https:&#47;&#47;github.com&#47;boot2docker&#47;boot2docker#folder-sharing">boot2docker Hilfe<&#47;a>.<br />
Bei mir liegen aber die Vhosts und Mysql-Daten auf einer anderen Festplatte und damit unterhalb von <code>&#47;Volumes&#47;Daten<&#47;code>. Eigentlich k&ouml;nnten diese ganz bequem &uuml;ber die VirtualBox Oberfl&auml;che dem laufenden boot2docker-vm hinzugef&uuml;gt werden.</p>
<p><a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;image01.png"><img class="alignnone size-full wp-image-574" src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;image01.png" alt="image01" width="617" height="377" &#47;><&#47;a></p>
<p>Danach <code>boot2docker restart<&#47;code> durchf&uuml;hren und per <code>boot2docker ssh<&#47;code> schauen ob die Daten nun dort auch verf&uuml;gbar sind. <b>Funktioniert leider nicht. <&#47;b>Aber in den <a href="https:&#47;&#47;blog.docker.com&#47;2014&#47;10&#47;docker-1-3-signed-images-process-injection-security-options-mac-shared-directories&#47;">Release-Infos von Docker 1.3<&#47;a> ist ja auch davon die Rede, dass nur <code>&#47;Users<&#47;code> funktioniert. Naja, k&uuml;nftig vielleicht irgendwann mal. Ich hab dann einfach meine Daten nach <code>&#47;Users<&#47;code> verschoben - Platz ist genug gewesen.</p>
<h2><b>MySQL<&#47;b><&#47;h2><br />
Ich habe als Grundlage <a href="https:&#47;&#47;registry.hub.docker.com&#47;u&#47;tutum&#47;mysql&#47;">tutum&#47;mysql<&#47;a> verwendet.</p>
<p>Mysql Server versuchsweise starten:</p>
<pre>docker run -d --name my-mysql -p 3306:3306 -v &#47;Users&#47;mysql:&#47;var&#47;lib&#47;mysql \<br />
   tutum&#47;mysql:5.6<&#47;pre><br />
Funktioniert nicht lt. <code>docker logs mysql<&#47;code>. Rechteprobleme, da das gemountete Verzeichnis "1000:staff" geh&ouml;rt, Mysql wird aber &uuml;ber Nutzer "mysql" gestartet. Hilfe habe ich <a href="https:&#47;&#47;github.com&#47;boot2docker&#47;boot2docker&#47;issues&#47;581">hier<&#47;a> gefunden.</p>
<p>Also bash im Image starten</p>
<pre>docker run -it -v &#47;Users&#47;mysql:&#47;var&#47;lib&#47;mysql tutum&#47;mysql:5.6 bash<&#47;pre><br />
.. und darin dann ausf&uuml;hren ..</p>
<pre>usermod -u 1000 mysql<br />
chown mysql.staff &#47;var&#47;run&#47;mysqld<&#47;pre><br />
.. das commiten als neues Image zu deinnutzer&#47;mysql</p>
<pre>docker commit [container-id] deinnutzer&#47;mysql<&#47;pre><br />
.. nun Image nochmal starten - jetzt allerdings mit "mysqld" Aufruf damit der Server startet</p>
<pre>docker run -d --name mysql -p 3306:3306 -v &#47;Users&#47;mysql:&#47;var&#47;lib&#47;mysql \<br />
  deinnutzer&#47;mysql mysqld<&#47;pre><br />
Per <code>docker logs mysql<&#47;code> sollte nun ein vor sich hin schnurrender Mysql-Server-Daemon zu sehen sein.</p>
<p>Als <strong><code>Dockerfile<&#47;code><&#47;strong> sieht obiges dann so aus:</p>
<p>[code]<br />
FROM tutum&#47;mysql:5.6<br />
MAINTAINER Ronny Hartenstein <rha@gmx.li></p>
<p># https:&#47;&#47;github.com&#47;boot2docker&#47;boot2docker&#47;issues&#47;581<br />
RUN usermod -u 1000 mysql<br />
RUN chown mysql.staff &#47;var&#47;run&#47;mysqld</p>
<p>EXPOSE 3306</p>
<p>CMD ["&#47;usr&#47;sbin&#47;mysqld"]<br />
[&#47;code]</p>
<h2><b>Apache + www + PHP<&#47;b><&#47;h2><br />
Zun&auml;chst habe ich das Image <a href="https:&#47;&#47;registry.hub.docker.com&#47;u&#47;eboraas&#47;apache-php&#47;">eboraas&#47;apache-php<&#47;a> verwendet. Als Beispiel dient meine Auslandsreisen-Homepage (basiert auf <a href="https:&#47;&#47;github.com&#47;slackero&#47;phpwcms">phpwcms<&#47;a>, allerdings in einer sehr alten Version)</p>
<pre>docker run -p 80:80 --name vhost-ausland -v &#47;Users&#47;vhosts&#47;ausland:&#47;var&#47;www \<br />
  -d eboraas&#47;apache-php<&#47;pre><br />
L&auml;uft wacker einfach los. Toll. Ein Aufruf der Seite &uuml;ber http:&#47;&#47;[boot2docker ip]&#47; schl&auml;gt aber fehl, da die MySQL nicht erreicht werden kann.</p>
<p>Leider ist meine Auslands-Webseite so alt, dass sie noch <code>mysql_connect<&#47;code> etc. verwendet und damit nicht mit PHP 5.4 out-of-the-box losl&auml;uft. Weiteres dazu siehe weiter unten bei <a href="#ubuntu10">&ldquo;Ubuntu 10.04 + PHP 5.3&rdquo;<&#47;a></p>
<h2><b>Heirat von MySQL und Apache<&#47;b><&#47;h2><br />
Innerhalb der boot2docker VirtualBox Instanz sind die Ports 80 und 3306 offen und k&ouml;nnen untereinander reden. Allerdings wei&szlig; ja der eine Container nicht welche IP der andere hat. Und meist braucht man auch die Ports von MySQL nicht nach au&szlig;en geben, wenn nur der Apache&#47;PHP zugreifen soll. Daf&uuml;r ist Verlinkung gut. Eine <a href="https:&#47;&#47;docs.docker.com&#47;userguide&#47;dockerlinks&#47;">gute Anleitung<&#47;a> zum Verlinken von Containern gibts in der offiziellen Docker-Doku.</p>
<p>Verlinken von vhost mit mysql:</p>
<pre>docker run -p 80:80 --name vhost-ausland -v &#47;Users&#47;vhosts&#47;ausland:&#47;var&#47;www \<br />
   --link mysql:mysql -d eboraas&#47;apache-php<&#47;pre><br />
Testen per Bash</p>
<pre>docker exec -it vhost-ausland bash<&#47;pre><br />
Die hosts:</p>
<p>[code]<br />
root@0d9b36837ab2:&#47;# <b>cat &#47;etc&#47;hosts<&#47;b><br />
172.17.0.22 &nbsp;&nbsp;&nbsp;0d9b36837ab2<br />
127.0.0.1 &nbsp;&nbsp;&nbsp;localhost<br />
::1 &nbsp;&nbsp;&nbsp;localhost ip6-localhost ip6-loopback<br />
fe00::0 &nbsp;&nbsp;&nbsp;ip6-localnet<br />
ff00::0 &nbsp;&nbsp;&nbsp;ip6-mcastprefix<br />
ff02::1 &nbsp;&nbsp;&nbsp;ip6-allnodes<br />
ff02::2 &nbsp;&nbsp;&nbsp;ip6-allrouters<br />
172.17.0.14 &nbsp;&nbsp;&nbsp;mysql<br />
[&#47;code]</p>
<p>Ein "ping mysql" w&uuml;rde also zu 172.17.0.14 aufl&ouml;sen. Super!</p>
<p>Die Environments:</p>
<p>[code language="bash"]<br />
root@0d9b36837ab2:&#47;# <b>set|grep MYSQL<&#47;b><br />
..<br />
MYSQL_PORT=tcp:&#47;&#47;172.17.0.14:3306<br />
MYSQL_PORT_3306_TCP=tcp:&#47;&#47;172.17.0.14:3306<br />
MYSQL_PORT_3306_TCP_ADDR=172.17.0.14<br />
MYSQL_PORT_3306_TCP_PORT=3306<br />
MYSQL_PORT_3306_TCP_PROTO=tcp<br />
[&#47;code]</p>
<p>Und diese Werte sind im PHP mittels <code>$_ENV<&#47;code> verf&uuml;gbar, wobei <code>$db_host="mysql"<&#47;code> v&ouml;llig reicht.</p>
<h2>Ports von Mac OSX erreichbar?<&#47;h2><br />
Blo&szlig; wie die Ports nach au&szlig;en zu OSX bringen? <a href="https:&#47;&#47;github.com&#47;boot2docker&#47;boot2docker#container-port-redirection">boot2docker gibt Antworten<&#47;a>: Gar nicht, die Ports sind an der laufenden boot2docker-VirtualBox erreichbar.</p>
<pre>mysql -h$(boot2docker ip 2>&#47;dev&#47;null) -uroot<&#47;pre><br />
Voraussetzung ist, dass f&uuml;r root Zugriff von jeder IP m&ouml;glich ist, also "<code>root@%<&#47;code>". In abgeschlossenen Netzen auf Entwickler-Rechnern eher kein Problem.<br />
<a name="ubuntu10"><&#47;a></p>
<h2>Legacy-LAMP-Stack: Ubuntu 10.04 + PHP 5.3<&#47;h2><br />
Da das Auslands-Projekt schon sehr alt ist, soll es weiter auf Ubuntu Lucid und PHP 5.3 laufen. Auch daf&uuml;r ist Docker gut - nicht nur den neuesten Hipsterkram antesten, sondern auch hornaltes zum laufen bringen!</p>
<p><b>Dockerfile<&#47;b><b> f&uuml;r Apache2 unter Ubuntu 10.04:<&#47;b></p>
<p>[code language="bash"]<br />
FROM ubuntu:lucid<br />
MAINTAINER Ronny Hartenstein <rha@gmx.li></p>
<p>RUN apt-get update &amp;&amp; apt-get -y install apache2 apache2-utils apache2.2-bin apache2.2-common apache2-mpm-prefork &amp;&amp; apt-get clean</p>
<p>ENV APACHE_RUN_USER www-data<br />
ENV APACHE_RUN_GROUP www-data<br />
ENV APACHE_LOG_DIR &#47;var&#47;log&#47;apache2</p>
<p>#RUN &#47;bin&#47;ln -sf ..&#47;sites-available&#47;default-ssl &#47;etc&#47;apache2&#47;sites-enabled&#47;001-default-ssl<br />
#RUN &#47;bin&#47;ln -sf ..&#47;mods-available&#47;ssl.conf &#47;etc&#47;apache2&#47;mods-enabled&#47;<br />
#RUN &#47;bin&#47;ln -sf ..&#47;mods-available&#47;ssl.load &#47;etc&#47;apache2&#47;mods-enabled&#47;</p>
<p>EXPOSE 80<br />
#EXPOSE 443</p>
<p>CMD ["&#47;usr&#47;sbin&#47;apache2ctl", "-D", "FOREGROUND"]<br />
[&#47;code]</p>
<p>Build:</p>
<pre>docker build ronnyhartenstein&#47;lucid-apache<&#47;pre><br />
<b>Dockerfile<&#47;b><b> f&uuml;r PHP-Aufsatz<&#47;b></p>
<p>[code language="bash"]<br />
FROM ronnyhartenstein&#47;lucid-apache<br />
MAINTAINER Ronny Hartenstein <rha@gmx.li></p>
<p>RUN apt-get update &amp;&amp; apt-get -y install php-pear php5 php5-cgi php5-cli php5-common php5-curl php5-gd php5-imap php5-mcrypt php5-mysql php5-sqlite php5-xdebug php5-xsl mysql-client &amp;&amp; apt-get clean</p>
<p>EXPOSE 80<br />
#EXPOSE 443</p>
<p>CMD ["&#47;usr&#47;sbin&#47;apache2ctl", "-D", "FOREGROUND"]<br />
[&#47;code]</p>
<p>Build:</p>
<pre>docker build ronnyhartenstein&#47;lucid-apache-php .<&#47;pre><br />
Wie zu sehen ist, ist SSH zwar vorgesehen, aber nicht aktiviert. Ich brauche es daf&uuml;r derzeit schlicht nicht.</p>
<p>Gestartet und verlinkt gegen MySQL ...</p>
<pre>docker run -p 80:80 --name vhost-ausland -v &#47;Users&#47;vhosts&#47;ausland:&#47;var&#47;www \<br />
   --link mysql:mysql -d ronnyhartenstein&#47;lucid-apache-php<&#47;pre><br />
.. l&auml;uft das ganze los und bringt sogar korrekte Ergebnisse. Toll!</p>
<h2><b>Ein paar hilfreiche Docker-Kommandos f&uuml;r den Alltag<&#47;b><&#47;h2><br />
Alle Container auflisten - inklusive der bereits beendeten - gut zum aufr&auml;umen</p>
<pre>docker ps --all<&#47;pre><br />
Container anhalten</p>
<pre>docker stop [hash|name]<&#47;pre><br />
Container l&ouml;schen</p>
<pre>docker rm [hash|name]<&#47;pre><br />
Lokal vorhandenen Images listen</p>
<pre>docker images<&#47;pre><br />
Image l&ouml;schen</p>
<pre>docker rmi [name]<&#47;pre><br />
bash starten in laufenden container mit Namen &ldquo;vhost-ausland&rdquo;</p>
<pre>docker exec -it vhost-auslandbash<&#47;pre></p>
<h2>&nbsp;Fazit<&#47;h2><br />
Wie schon der Wechsel zu Vagrant ein Game-Changer war, ist Docker noch ein ganzes St&uuml;ck mehr fetzig. Super ist, dass man alte Linux-Distros zusammen mit den neuesten Distros laufen lassen kann, sorgt f&uuml;r insgesamt geringere Schmerzen in der Wartung. Man muss f&uuml;r "Privatzwecke" ja noch nicht mal Dockerfiles bauen oder selber zum Docker Hub pushen. Es gen&uuml;gt auch einfach ein Ubuntu (o.&auml;.) zu starten und mittels bash darin herumzuinstallieren. Am Ende ein commit zu einen eigenen Image und gut. Das kann dann f&uuml;r verschiedene Projekte isoliert aufgerufen werden.</p>
<p>Die ganze Recherche und Probiererei hat mich die letzten beiden Wochen abends und am Wochenende vor den Bildschirm gefesselt. Anfangs ist die Lernkurve flach, aber sobald man das Konzept von Containern und Images grundlegend verstanden hat, kann man sich den Rest durch Herumprobieren erschlie&szlig;en. Da auch keine VMs ewig booten m&uuml;ssen, ist man tats&auml;chlich viel mit Doing besch&auml;ftigt und weniger mit warten.</p>
<p>Ich kann euch nur empfehlen, wenn ihr als Devs eure Admins oder DevOps verstehen wollt, oder aber als Dev eure Fullstack skills leveln wollt (oh mann...) - schauts euch an, macht Spa&szlig;!</p>
