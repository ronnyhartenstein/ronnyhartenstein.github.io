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
thumb: /files/2015/01/docker_vagrant-960x360.jpg
---

<p>Vagrant ist ja sowas von 2014. Naja, nicht wirklich, ist ja immernoch ein sehr cooler Ansatz um eine VM versionierbar zu provisionieren. Dies ist auch <strong>kein Rant gegen Vagrant</strong>! Ich habe ja selbst erst Ende letzten Jahres über den <a title="Es hat sich ausgeMAMPft. Vagrant ist. [Update]" href="/2014/11/11/es-hat-sich-ausgemampft-vagrant-ist/">Wechsel von MAMP zu Vagrant</a> gebloggt. Aber wenn man lokal mehrere Projekte mit mehreren verschieden bestückten VMs aufzieht und miteinander reden lässt, ist fix auch 8 GB RAM verkonsumiert. Und da springt Docker durch den anderen Ansatz in die Presche. Angefixt durch zwei Artikel im aktuellen <b>PHPMagazin 2/2015</b> hab ich das ganze auf meinen Mac mit Hilfe von <b>boot2docker</b> mal angetestet.<span id="more-572"></span></p>
<h2><b>TL;DR</b></h2>
<p>Docker ermöglicht <b>änderbare </b>Anwendungs-<b>Container</b> zu erstellen und zu betreiben, die auf <b>nicht änderbaren Images</b> basieren. Änderungen können commitet werden zu einen neuen Image. Diese werden lokal in einen Repository verwaltet.</p>
<p>Docker selbst betreibt keine VMs, sondern hat immer das Host-OS als Unterbau. Auf dem Mac ist es die &nbsp;Boot2docker VM (VirtualBox). Es ist wunderbar möglich verschiedene Linux-Distros mit verschiedenen Versionen von Diensten nebeneinander Speicherplatz-schonen zu betreiben.</p>
<p>Wenn man das Grundkonzept verstanden und ein bisschen herumprobiert hat, kommt man relativ fix auch als Nicht-Admin dahinter.</p>

<!--more-->

<h2><b>Installation boot2docker</b></h2>
<p>Flux von <a href="http://boot2docker.io/">boot2docker.io</a> heruntergeladen bekommt man nach der Installation die ersten Hinweise wie es weitergeht.</p>
<ul>
<li><i><b><i>Quick-Start:</i></b><i> Run Boot2Docker (located in Applications), which will open a terminal window. Then, start a test container with: </i><i><code> docker run hello-world</code></i></i></li>
</ul>
<ul>
<li><i>To save and share container images, automate workflows, and more sign-up for a free </i><a href="http://hub.docker.com/?utm_source=b2d&amp;utm_medium=installer&amp;utm_term=summary&amp;utm_content=osx&amp;utm_campaign=product"><i>Docker Hub account</i></a><i>.</i></li>
</ul>
<ul>
<li><i>You can upgrade your existing Boot2Docker VM without data loss by running: </i><i><code> boot2docker upgrade</code></i></li>
</ul>
<ul>
<li><i>The </i><i>docker</i><i> and </i><i>boot2docker</i><i> binaries are in </i><i><code>/usr/local/bin</code></i><i> which you can access from your terminal. For further information, please see the </i><a href="http://docs.docker.com/installation/mac"><i>Docker OS X installation documentation</i></a><i>.</i></li>
</ul>
<h3><b>boot2docker intialisieren</b></h3>
<p>boot2docker gestartet gings dessen Initialisierung los.</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">bash-3.2$ unset DYLD_LIBRARY_PATH ; unset LD_LIBRARY_PATH
bash-3.2$ mkdir -p ~/.boot2docker
bash-3.2$ if [ ! -f ~/.boot2docker/boot2docker.iso ]; then cp /usr/local/share/boot2docker/boot2docker.iso ~/.boot2docker/ ; fi
bash-3.2$ /usr/local/bin/boot2docker init
Generating public/private rsa key pair.
Your identification has been saved in /Volumes/Daten/ronny/.ssh/id_boot2docker.
Your public key has been saved in /Volumes/Daten/ronny/.ssh/id_boot2docker.pub.
The key fingerprint is:
... <a class="token email-link" href="mailto:ronny@ronny.fritz.box">ronny@ronny.fritz.box</a>
The key's randomart image is:
+--[ RSA 2048]----+
|                 |
|                 |
..
|             oo+ |
+-----------------+
/usr/local/bin/boot2docker up
$(/usr/local/bin/boot2docker shellinit)
docker version

bash-3.2$ /usr/local/bin/boot2docker up
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">&gt;</span></span>Waiting for VM and Docker daemon to start...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">&gt;</span></span>
............................oooooooooooooooooooo
Started.
Writing /Volumes/Daten/ronny/.boot2docker/certs/boot2docker-vm/ca.pem
Writing /Volumes/Daten/ronny/.boot2docker/certs/boot2docker-vm/cert.pem
Writing /Volumes/Daten/ronny/.boot2docker/certs/boot2docker-vm/key.pem

To connect the Docker client to the Docker daemon, please set:
export DOCKER_CERT_PATH=/Volumes/Daten/ronny/.boot2docker/certs/boot2docker-vm
export DOCKER_TLS_VERIFY=1
export DOCKER_HOST=<a class="token url-link" href="tcp://192.168.59.103:2376">tcp://192.168.59.103:2376</a>

bash-3.2$ $(/usr/local/bin/boot2docker shellinit)
Writing /Volumes/Daten/ronny/.boot2docker/certs/boot2docker-vm/ca.pem
Writing /Volumes/Daten/ronny/.boot2docker/certs/boot2docker-vm/cert.pem
Writing /Volumes/Daten/ronny/.boot2docker/certs/boot2docker-vm/key.pem
bash-3.2$ docker version
Client version: 1.4.1
Client API version: 1.16
Go version (client): go1.3.3
Git commit (client): 5bc2ff8
OS/Arch (client): darwin/amd64
Server version: 1.4.1
Server API version: 1.16
Go version (server): go1.3.3
Git commit (server): 5bc2f</code></pre>
<h3><b>Fehlermeldung “dial unix /var/run/docker.sock: no such file or directory” vermeiden</b></h3>
<p>Schnell den Anweisungen gefolgt und die obigen export DOCKER_* durchgeführt ..</p>
<pre class="prettyprint prettyprinted" style=""><span class="kwd">export</span><span class="pln"> DOCKER_CERT_PATH</span><span class="pun">=</span><span class="str">/Volumes/</span><span class="typ">Daten</span><span class="pun">/</span><span class="pln">ronny</span><span class="pun">/.</span><span class="pln">boot2docker</span><span class="pun">/</span><span class="pln">certs</span><span class="pun">/</span><span class="pln">boot2docker</span><span class="pun">-</span><span class="pln">vm
</span><span class="kwd">export</span><span class="pln"> DOCKER_TLS_VERIFY</span><span class="pun">=</span><span class="lit">1</span><span class="pln">
</span><span class="kwd">export</span><span class="pln"> DOCKER_HOST</span><span class="pun">=</span><span class="pln">tcp</span><span class="pun">:</span><span class="com">//192.168.59.103:2376</span></pre>
<p>Sofern man das unter Mac nicht in jeden Terminalfenster macht, führen Aufrufe von docker zu Fehlern wie <code>dial unix /var/run/docker.sock</code>.</p>
<h3><b>Hello World Beispiel starten</b></h3>
<p>.. und das Hello World per docker run hello-world Beispiel angetriggert.</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">bash-3.2$ docker run hello-world
Unable to find image 'hello-world:latest' locally
hello-world:latest: The image you are pulling has been verified
511136ea3c5a: Pull complete
31cbccb51277: Pull complete
e45a5af57b00: Pull complete
Status: Downloaded newer image for hello-world:latest
Hello from Docker.
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
1. The Docker client contacted the Docker daemon.
2. The Docker daemon pulled the "hello-world" image from the Docker Hub. (Assuming it was not already locally available.)
3. The Docker daemon created a new container from that image which runs the executable that produces the output you are currently reading.
4. The Docker daemon streamed that output to the Docker client, which sent it to your terminal.

To try something more ambitious, you can run an Ubuntu container with:

$ docker run -it ubuntu bash

For more examples and ideas, visit:

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span><a class="token url-link" href="http://docs.docker.com/userguide/">http://docs.docker.com/userguide/</a><span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><a class="token url-link" href="http://docs.docker.com/userguide/">http://docs.docker.com/userguide/</a><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span></code></pre>
<p>Scheint zu klappen</p>
<h3><b>Ubuntu mit Bash starten</b></h3>
<p>Also gleich der nächsten Empfehlung gefolgt und <code>docker run -it ubuntu bash</code> ausgeführt.</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">bash-3.2$ docker run -it ubuntu bash
Unable to find image 'ubuntu:latest' locally
ubuntu:latest: The image you are pulling has been verified
53f858aaaf03: Pull complete
837339b91538: Pull complete
615c102e2290: Pull complete
b39b81afc8ca: Pull complete
511136ea3c5a: Already exists
Status: Downloaded newer image for ubuntu:latest
<a class="token email-link" href="mailto:root@066df">root@066df</a>2385c5a:/#</code></pre>
<p>Schon <b>blinkt der Cursor </b>in einer Bash innerhalb eines Ubuntu-Docker-Containers! Damit ist die Ausgangsbasis für alle weiteren Docker-Versuche geschaffen. &nbsp;Mensch mensch, das sind echt Profis am Werk, wenn sogar einer wie ich das ans Laufen bekommt.</p>
<h2><b>Grundlagen anlesen</b></h2>
<p>Bevor ich selber losgelegt habe, hab ich erstmal ein bisschen herumgelesen – zusätzlich zum PHP Magazin Artikeln…</p>
<ul>
<li><a href="http://www.linux-magazin.de/Ausgaben/2013/08/Docker">http://www.linux-magazin.de/Ausgaben/2013/08/Docker</a></li>
<li><a href="http://stackoverflow.com/questions/24928772/docker-how-to-dockerize-and-deploy-multiple-instances-of-a-lamp-application">http://stackoverflow.com/questions/24928772/docker-how-to-dockerize-and-deploy-multiple-instances-of-a-lamp-application</a></li>
<li><a href="https://docs.docker.com/userguide/dockerlinks/">https://docs.docker.com/userguide/dockerlinks/</a></li>
<li><a href="http://play.thinkcube.com/development-environment-on-docker">http://play.thinkcube.com/development-environment-on-docker</a></li>
<li><a href="https://medium.com/@bulgr0z/deploy-a-ready-to-use-consistent-lamp-stack-anywhere-with-docker-eaf669283f31">https://medium.com/@bulgr0z/deploy-a-ready-to-use-consistent-lamp-stack-anywhere-with-docker-eaf669283f31</a></li>
<li><a href="http://viget.com/extend/how-to-use-docker-on-os-x-the-missing-guide">http://viget.com/extend/how-to-use-docker-on-os-x-the-missing-guide</a></li>
<li><a href="http://www.codefest.at/post/2014/11/25/Erste-Schritte-mit-Docker-Teil-1.aspx">http://www.codefest.at/post/2014/11/25/Erste-Schritte-mit-Docker-Teil-1.aspx</a></li>
<li><a href="http://t3n.de/news/docker-cloud-computing-steroiden-550165/">http://t3n.de/news/docker-cloud-computing-steroiden-550165/</a></li>
<li><a href="http://de.slideshare.net/ruoshiling/how-to-deploy-php-projects-with-docker">http://de.slideshare.net/ruoshiling/how-to-deploy-php-projects-with-docker</a></li>
</ul>
<p>Verstanden hab ich die ganze Geschichte über die Use-Cases-Bilder in der <a href="http://de.slideshare.net/ruoshiling/how-to-deploy-php-projects-with-docker">Slideshare-Präsentation <strong>„How to deploy PHP projects with docker“</strong> von Ruoshi Ling</a>.</p>
<p><a href="/files/2015/01/image02.png"><img class="alignnone wp-image-575 size-full" src="/files/2015/01/image02.png" alt="image02" width="634" height="471"></a></p>
<p><a href="/files/2015/01/image03.png"><img class="alignnone wp-image-576 size-full" src="/files/2015/01/image03.png" alt="image03" width="631" height="472"></a></p>
<p><a href="/files/2015/01/image05.png"><img class="alignnone wp-image-578 size-full" src="/files/2015/01/image05.png" alt="image05" width="630" height="469"></a></p>
<p><a href="/files/2015/01/image04.png"><img class="alignnone wp-image-577 size-full" src="/files/2015/01/image04.png" alt="image04" width="630" height="470"></a></p>
<p><a href="/files/2015/01/image00.png"><img class="alignnone wp-image-573 size-full" src="/files/2015/01/image00.png" alt="image00" width="633" height="472"></a></p>
<p>Alles klar? Nicht? Dann den ganzen Vortrag durcharbeiten und die Artikel nochmal lesen.</p>
<h2><b>Mounten von Verzeichnissen: Mac OSX &gt; Boot2docker VM &gt; Docker-Container</b></h2>
<p>Bevor ich irgendwelche MySQL oder Apache hochziehen kann, muss erstmal geklärt werden, wie überhaupt die Daten sauber in die Docker-Container reinkommen. Läuft Docker nativ auf der eigenen Linux-Büchse, sind alle Verzeichnisse ja (im Rahmen von SELinux) erreichbar. Aber auf Mac gibt es mit der Boot2docker VM noch eine weitere Schicht dazwischen.</p>
<p>Seit <a href="https://blog.docker.com/2014/10/docker-1-3-signed-images-process-injection-security-options-mac-shared-directories/">Docker 1.3 und “signed images”</a> ist zumindest das nicht mehr so schwer. Das Verzeichnis /Users ist standardmäßig eingebunden, siehe auch <a href="https://github.com/boot2docker/boot2docker#folder-sharing">boot2docker Hilfe</a>.<br>
Bei mir liegen aber die Vhosts und Mysql-Daten auf einer anderen Festplatte und damit unterhalb von <code>/Volumes/Daten</code>. Eigentlich könnten diese ganz bequem über die VirtualBox Oberfläche dem laufenden boot2docker-vm hinzugefügt werden.</p>
<p><a href="/files/2015/01/image01.png"><img class="alignnone size-full wp-image-574" src="/files/2015/01/image01.png" alt="image01" width="617" height="377"></a></p>
<p>Danach <code>boot2docker restart</code> durchführen und per <code>boot2docker ssh</code> schauen ob die Daten nun dort auch verfügbar sind. <b>Funktioniert leider nicht. </b>Aber in den <a href="https://blog.docker.com/2014/10/docker-1-3-signed-images-process-injection-security-options-mac-shared-directories/">Release-Infos von Docker 1.3</a> ist ja auch davon die Rede, dass nur <code>/Users</code> funktioniert. Naja, künftig vielleicht irgendwann mal. Ich hab dann einfach meine Daten nach <code>/Users</code> verschoben – Platz ist genug gewesen.</p>
<h2><b>MySQL</b></h2>
<p>Ich habe als Grundlage <a href="https://registry.hub.docker.com/u/tutum/mysql/">tutum/mysql</a> verwendet.</p>
<p>Mysql Server versuchsweise starten:</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker run </span><span class="pun">-</span><span class="pln">d </span><span class="pun">--</span><span class="pln">name </span><span class="kwd">my</span><span class="pun">-</span><span class="pln">mysql </span><span class="pun">-</span><span class="pln">p </span><span class="lit">3306</span><span class="pun">:</span><span class="lit">3306</span><span class="pln"> </span><span class="pun">-</span><span class="pln">v </span><span class="pun">/</span><span class="typ">Users</span><span class="pun">/</span><span class="pln">mysql</span><span class="pun">:</span><span class="str">/var/</span><span class="pln">lib</span><span class="pun">/</span><span class="pln">mysql \
   tutum</span><span class="pun">/</span><span class="pln">mysql</span><span class="pun">:</span><span class="lit">5.6</span></pre>
<p>Funktioniert nicht lt. <code>docker logs mysql</code>. Rechteprobleme, da das gemountete Verzeichnis „1000:staff“ gehört, Mysql wird aber über Nutzer „mysql“ gestartet. Hilfe habe ich <a href="https://github.com/boot2docker/boot2docker/issues/581">hier</a> gefunden.</p>
<p>Also bash im Image starten</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker run </span><span class="pun">-</span><span class="pln">it </span><span class="pun">-</span><span class="pln">v </span><span class="pun">/</span><span class="typ">Users</span><span class="pun">/</span><span class="pln">mysql</span><span class="pun">:</span><span class="str">/var/</span><span class="pln">lib</span><span class="pun">/</span><span class="pln">mysql tutum</span><span class="pun">/</span><span class="pln">mysql</span><span class="pun">:</span><span class="lit">5.6</span><span class="pln"> bash</span></pre>
<p>.. und darin dann ausführen ..</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">usermod </span><span class="pun">-</span><span class="pln">u </span><span class="lit">1000</span><span class="pln"> mysql
chown mysql</span><span class="pun">.</span><span class="pln">staff </span><span class="pun">/</span><span class="kwd">var</span><span class="pun">/</span><span class="pln">run</span><span class="pun">/</span><span class="pln">mysqld</span></pre>
<p>.. das commiten als neues Image zu deinnutzer/mysql</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker commit </span><span class="pun">[</span><span class="pln">container</span><span class="pun">-</span><span class="pln">id</span><span class="pun">]</span><span class="pln"> deinnutzer</span><span class="pun">/</span><span class="pln">mysql</span></pre>
<p>.. nun Image nochmal starten – jetzt allerdings mit „mysqld“ Aufruf damit der Server startet</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker run </span><span class="pun">-</span><span class="pln">d </span><span class="pun">--</span><span class="pln">name mysql </span><span class="pun">-</span><span class="pln">p </span><span class="lit">3306</span><span class="pun">:</span><span class="lit">3306</span><span class="pln"> </span><span class="pun">-</span><span class="pln">v </span><span class="pun">/</span><span class="typ">Users</span><span class="pun">/</span><span class="pln">mysql</span><span class="pun">:</span><span class="str">/var/</span><span class="pln">lib</span><span class="pun">/</span><span class="pln">mysql \
  deinnutzer</span><span class="pun">/</span><span class="pln">mysql mysqld</span></pre>
<p>Per <code>docker logs mysql</code> sollte nun ein vor sich hin schnurrender Mysql-Server-Daemon zu sehen sein.</p>
<p>Als <strong><code>Dockerfile</code></strong> sieht obiges dann so aus:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">FROM tutum/mysql:5.6
MAINTAINER Ronny Hartenstein &lt;<a class="token email-link" href="mailto:rha@gmx.li">rha@gmx.li</a>&gt;

# <a class="token url-link" href="https://github.com/boot2docker/boot2docker/issues/581">https://github.com/boot2docker/boot2docker/issues/581</a>
RUN usermod -u 1000 mysql
RUN chown mysql.staff /var/run/mysqld

EXPOSE 3306

CMD ["/usr/sbin/mysqld"]</code></pre>
<h2><b>Apache + www + PHP</b></h2>
<p>Zunächst habe ich das Image <a href="https://registry.hub.docker.com/u/eboraas/apache-php/">eboraas/apache-php</a> verwendet. Als Beispiel dient meine Auslandsreisen-Homepage (basiert auf <a href="https://github.com/slackero/phpwcms">phpwcms</a>, allerdings in einer sehr alten Version)</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker run </span><span class="pun">-</span><span class="pln">p </span><span class="lit">80</span><span class="pun">:</span><span class="lit">80</span><span class="pln"> </span><span class="pun">--</span><span class="pln">name vhost</span><span class="pun">-</span><span class="pln">ausland </span><span class="pun">-</span><span class="pln">v </span><span class="pun">/</span><span class="typ">Users</span><span class="pun">/</span><span class="pln">vhosts</span><span class="pun">/</span><span class="pln">ausland</span><span class="pun">:</span><span class="str">/var/</span><span class="pln">www \
  </span><span class="pun">-</span><span class="pln">d eboraas</span><span class="pun">/</span><span class="pln">apache</span><span class="pun">-</span><span class="pln">php</span></pre>
<p>Läuft wacker einfach los. Toll. Ein Aufruf der Seite über http://[boot2docker ip]/ schlägt aber fehl, da die MySQL nicht erreicht werden kann.</p>
<p>Leider ist meine Auslands-Webseite so alt, dass sie noch <code>mysql_connect</code> etc. verwendet und damit nicht mit PHP 5.4 out-of-the-box losläuft. Weiteres dazu siehe weiter unten bei <a href="#ubuntu10">“Ubuntu 10.04 + PHP 5.3”</a></p>
<h2><b>Heirat von MySQL und Apache</b></h2>
<p>Innerhalb der boot2docker VirtualBox Instanz sind die Ports 80 und 3306 offen und können untereinander reden. Allerdings weiß ja der eine Container nicht welche IP der andere hat. Und meist braucht man auch die Ports von MySQL nicht nach außen geben, wenn nur der Apache/PHP zugreifen soll. Dafür ist Verlinkung gut. Eine <a href="https://docs.docker.com/userguide/dockerlinks/">gute Anleitung</a> zum Verlinken von Containern gibts in der offiziellen Docker-Doku.</p>
<p>Verlinken von vhost mit mysql:</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker run </span><span class="pun">-</span><span class="pln">p </span><span class="lit">80</span><span class="pun">:</span><span class="lit">80</span><span class="pln"> </span><span class="pun">--</span><span class="pln">name vhost</span><span class="pun">-</span><span class="pln">ausland </span><span class="pun">-</span><span class="pln">v </span><span class="pun">/</span><span class="typ">Users</span><span class="pun">/</span><span class="pln">vhosts</span><span class="pun">/</span><span class="pln">ausland</span><span class="pun">:</span><span class="str">/var/</span><span class="pln">www \
   </span><span class="pun">--</span><span class="pln">link mysql</span><span class="pun">:</span><span class="pln">mysql </span><span class="pun">-</span><span class="pln">d eboraas</span><span class="pun">/</span><span class="pln">apache</span><span class="pun">-</span><span class="pln">php</span></pre>
<p>Testen per Bash</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker </span><span class="kwd">exec</span><span class="pln"> </span><span class="pun">-</span><span class="pln">it vhost</span><span class="pun">-</span><span class="pln">ausland bash</span></pre>
<p>Die hosts:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup"><a class="token email-link" href="mailto:root@0d9b36837ab">root@0d9b36837ab</a>2:/# <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">&gt;</span></span>cat /etc/hosts<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">&gt;</span></span>
172.17.0.22    0d9b36837ab2
127.0.0.1    localhost
::1    localhost ip6-localhost ip6-loopback
fe00::0    ip6-localnet
ff00::0    ip6-mcastprefix
ff02::1    ip6-allnodes
ff02::2    ip6-allrouters
172.17.0.14    mysql</code></pre>
<p>Ein „ping mysql“ würde also zu 172.17.0.14 auflösen. Super!</p>
<p>Die Environments:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup"><a class="token email-link" href="mailto:root@0d9b36837ab">root@0d9b36837ab</a>2:/# <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">&gt;</span></span>set|grep MYSQL<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">&gt;</span></span>
..
MYSQL_PORT=<a class="token url-link" href="tcp://172.17.0.14:3306">tcp://172.17.0.14:3306</a>
MYSQL_PORT_3306_TCP=<a class="token url-link" href="tcp://172.17.0.14:3306">tcp://172.17.0.14:3306</a>
MYSQL_PORT_3306_TCP_ADDR=172.17.0.14
MYSQL_PORT_3306_TCP_PORT=3306
MYSQL_PORT_3306_TCP_PROTO=tcp</code></pre>
<p>Und diese Werte sind im PHP mittels <code>$_ENV</code> verfügbar, wobei <code>$db_host="mysql"</code> völlig reicht.</p>
<h2>Ports von Mac OSX erreichbar?</h2>
<p>Bloß wie die Ports nach außen zu OSX bringen? <a href="https://github.com/boot2docker/boot2docker#container-port-redirection">boot2docker gibt Antworten</a>: Gar nicht, die Ports sind an der laufenden boot2docker-VirtualBox erreichbar.</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">mysql </span><span class="pun">-</span><span class="pln">h$</span><span class="pun">(</span><span class="pln">boot2docker ip </span><span class="lit">2</span><span class="pun">&gt;</span><span class="str">/dev/</span><span class="kwd">null</span><span class="pun">)</span><span class="pln"> </span><span class="pun">-</span><span class="pln">uroot</span></pre>
<p>Voraussetzung ist, dass für root Zugriff von jeder IP möglich ist, also „<code>root@%</code>„. In abgeschlossenen Netzen auf Entwickler-Rechnern eher kein Problem.<br>
<a name="ubuntu10"></a></p>
<h2>Legacy-LAMP-Stack: Ubuntu 10.04 + PHP 5.3</h2>
<p>Da das Auslands-Projekt schon sehr alt ist, soll es weiter auf Ubuntu Lucid und PHP 5.3 laufen. Auch dafür ist Docker gut – nicht nur den neuesten Hipsterkram antesten, sondern auch hornaltes zum laufen bringen!</p>
<p><b>Dockerfile</b><b> für Apache2 unter Ubuntu 10.04:</b></p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">FROM ubuntu:lucid
MAINTAINER Ronny Hartenstein &lt;<a class="token email-link" href="mailto:rha@gmx.li">rha@gmx.li</a>&gt;

RUN apt-get update &amp;&amp; apt-get -y install apache2 apache2-utils apache2.2-bin apache2.2-common apache2-mpm-prefork &amp;&amp; apt-get clean

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2

#RUN /bin/ln -sf ../sites-available/default-ssl /etc/apache2/sites-enabled/001-default-ssl
#RUN /bin/ln -sf ../mods-available/ssl.conf /etc/apache2/mods-enabled/
#RUN /bin/ln -sf ../mods-available/ssl.load /etc/apache2/mods-enabled/

EXPOSE 80
#EXPOSE 443

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]</code></pre>
<p>Build:</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker build ronnyhartenstein</span><span class="pun">/</span><span class="pln">lucid</span><span class="pun">-</span><span class="pln">apache</span></pre>
<p><b>Dockerfile</b><b> für PHP-Aufsatz</b></p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">FROM ronnyhartenstein/lucid-apache
MAINTAINER Ronny Hartenstein &lt;<a class="token email-link" href="mailto:rha@gmx.li">rha@gmx.li</a>&gt;

RUN apt-get update &amp;&amp; apt-get -y install php-pear php5 php5-cgi php5-cli php5-common php5-curl php5-gd php5-imap php5-mcrypt php5-mysql php5-sqlite php5-xdebug php5-xsl mysql-client &amp;&amp; apt-get clean

EXPOSE 80
#EXPOSE 443

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]</code></pre>
<p>Build:</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker build ronnyhartenstein</span><span class="pun">/</span><span class="pln">lucid</span><span class="pun">-</span><span class="pln">apache</span><span class="pun">-</span><span class="pln">php </span><span class="pun">.</span></pre>
<p>Wie zu sehen ist, ist SSH zwar vorgesehen, aber nicht aktiviert. Ich brauche es dafür derzeit schlicht nicht.</p>
<p>Gestartet und verlinkt gegen MySQL …</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker run </span><span class="pun">-</span><span class="pln">p </span><span class="lit">80</span><span class="pun">:</span><span class="lit">80</span><span class="pln"> </span><span class="pun">--</span><span class="pln">name vhost</span><span class="pun">-</span><span class="pln">ausland </span><span class="pun">-</span><span class="pln">v </span><span class="pun">/</span><span class="typ">Users</span><span class="pun">/</span><span class="pln">vhosts</span><span class="pun">/</span><span class="pln">ausland</span><span class="pun">:</span><span class="str">/var/</span><span class="pln">www \
   </span><span class="pun">--</span><span class="pln">link mysql</span><span class="pun">:</span><span class="pln">mysql </span><span class="pun">-</span><span class="pln">d ronnyhartenstein</span><span class="pun">/</span><span class="pln">lucid</span><span class="pun">-</span><span class="pln">apache</span><span class="pun">-</span><span class="pln">php</span></pre>
<p>.. läuft das ganze los und bringt sogar korrekte Ergebnisse. Toll!</p>
<h2><b>Ein paar hilfreiche Docker-Kommandos für den Alltag</b></h2>
<p>Alle Container auflisten – inklusive der bereits beendeten – gut zum aufräumen</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker ps </span><span class="pun">--</span><span class="pln">all</span></pre>
<p>Container anhalten</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker stop </span><span class="pun">[</span><span class="pln">hash</span><span class="pun">|</span><span class="pln">name</span><span class="pun">]</span></pre>
<p>Container löschen</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker rm </span><span class="pun">[</span><span class="pln">hash</span><span class="pun">|</span><span class="pln">name</span><span class="pun">]</span></pre>
<p>Lokal vorhandenen Images listen</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker images</span></pre>
<p>Image löschen</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker rmi </span><span class="pun">[</span><span class="pln">name</span><span class="pun">]</span></pre>
<p>bash starten in laufenden container mit Namen “vhost-ausland”</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">docker </span><span class="kwd">exec</span><span class="pln"> </span><span class="pun">-</span><span class="pln">it vhost</span><span class="pun">-</span><span class="pln">auslandbash</span></pre>
<h2>&nbsp;Fazit</h2>
<p>Wie schon der Wechsel zu Vagrant ein Game-Changer war, ist Docker noch ein ganzes Stück mehr fetzig. Super ist, dass man alte Linux-Distros zusammen mit den neuesten Distros laufen lassen kann, sorgt für insgesamt geringere Schmerzen in der Wartung. Man muss für „Privatzwecke“ ja noch nicht mal Dockerfiles bauen oder selber zum Docker Hub pushen. Es genügt auch einfach ein Ubuntu (o.ä.) zu starten und mittels bash darin herumzuinstallieren. Am Ende ein commit zu einen eigenen Image und gut. Das kann dann für verschiedene Projekte isoliert aufgerufen werden.</p>
<p>Die ganze Recherche und Probiererei hat mich die letzten beiden Wochen abends und am Wochenende vor den Bildschirm gefesselt. Anfangs ist die Lernkurve flach, aber sobald man das Konzept von Containern und Images grundlegend verstanden hat, kann man sich den Rest durch Herumprobieren erschließen. Da auch keine VMs ewig booten müssen, ist man tatsächlich viel mit Doing beschäftigt und weniger mit warten.</p>
<p>Ich kann euch nur empfehlen, wenn ihr als Devs eure Admins oder DevOps verstehen wollt, oder aber als Dev eure Fullstack skills leveln wollt (oh mann…) – schauts euch an, macht Spaß!</p>
