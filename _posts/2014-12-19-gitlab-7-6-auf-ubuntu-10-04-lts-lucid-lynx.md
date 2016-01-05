---
layout: post
status: publish
published: true
title: GitLab 7.6 auf Ubuntu 10.04 LTS Lucid Lynx
author:
  display_name: ''
  login: ''
  email: ''
  url: ''

wordpress_id: 523
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=523
date: '2014-12-19 08:49:01 +0100'
date_gmt: '2014-12-19 06:49:01 +0100'
categories:
- DevOp
- Git
tags: []
thumb: /files/2014/12/gitlab1.jpg
---
<p>Inspiriert durch eine langsam Fahrt aufnehmende Umstellung meines Arbeitgebers hab ich dran gemacht, die Quellcode-Verwaltung meiner Nicht-Opensource-Projekte vom in die Jahre gekommenen Subversion zu Git zu migrieren. Erster Schritt: <a href="https://about.gitlab.com/">GitLab</a> einrichten!</p>

<!--more-->

<p>Da mein Hoster HostEurope bis dato noch nicht imstande war, VServer mit Ubuntu 14.04 LTS anzubieten, ich aber nicht jetzt erst noch auf 12.04 LTS umschwenken will, blieb mir nur GitLab auf 10.04 zum Laufen zu bringen. Leider gibt es für dessen aktuelle Version keine gezielte Anleitung, sondern nur eine <a href="http://www.andmarios.com/2012/06/gitlab-on-an-ubuntu-10-04-server-with-apache/">veraltete Anleitung</a> aus 2012.</p>
<p>Ich folgte also der der <a href="https://github.com/gitlabhq/gitlabhq/blob/7-6-stable/doc/install/installation.md">offiziellen Anleitung zu GitLab 7.6</a> so gut es geht..</p>
<h2><strong>Ruby 2.x installieren</strong></h2>
<p>Einfach der <a href="https://github.com/gitlabhq/gitlabhq/blob/7-6-stable/doc/install/installation.md#2-ruby">Anleitung</a> folgen und aus den Quellen kompilieren.. <code>make</code> &amp; <code>make install</code> dauert bissl.</p>
<h2><strong>MySQL Datenbank aufsetzen</strong></h2>
<p>Einfach der Anleitung folgen.. bei mir recht einfach über die Plesk 12 Oberfläche..</p>
<h2><strong>Redis 2.x installieren</strong></h2>
<p>Ubuntu 10.04 liefert nur Redis 1.x mit, GitLab braucht diesen aber für Zugriff via Socketfile statt Port. Aber auf <a href="https://launchpad.net/~tsuru/+archive/ubuntu/redis-server">Launchpad gibt ein nutzergepflegtes Paket</a>.</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">sudo add</span><span class="pun">-</span><span class="pln">apt</span><span class="pun">-</span><span class="pln">repository ppa</span><span class="pun">:</span><span class="pln">tsuru</span><span class="pun">/</span><span class="pln">redis</span><span class="pun">-</span><span class="pln">server
sudo apt</span><span class="pun">-</span><span class="kwd">get</span><span class="pln"> update
sudo apt</span><span class="pun">-</span><span class="kwd">get</span><span class="pln"> install redis</span><span class="pun">-</span><span class="pln">server</span></code></pre>
<p>oder falls bereits installiert</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">sudo apt</span><span class="pun">-</span><span class="kwd">get</span><span class="pln"> upgrade</span></code></pre>
<p>und dann der <a href="https://github.com/gitlabhq/gitlabhq/blob/7-6-stable/doc/install/installation.md#5-redis">Anleitung</a> folgen…</p>
<h2><strong>User einrichten</strong></h2>
<p>Einfach der <a href="https://github.com/gitlabhq/gitlabhq/blob/7-6-stable/doc/install/installation.md#3-system-users">Anleitung</a> folgen..</p>
<h2><strong>GitLab selbst einrichten</strong></h2>
<p>Jetzt wirds ernst.. munter gehts durch die <a href="https://github.com/gitlabhq/gitlabhq/blob/7-6-stable/doc/install/installation.md#6-gitlab">Anleitung</a> … Source clonen &amp; Konfig war kein Hit. <code>bundle install</code> wirft als User git leider Passwort-Abfragen, also versuch ichs als root. Dann weiter der Anleitung folgen, sodass am Schluss beim <a href="https://github.com/gitlabhq/gitlabhq/blob/7-6-stable/doc/install/installation.md#check-application-status">Check Application Status</a> ordentliche Werte gezeigt werden. Und nach der Assert-Erstellung, wobei die JS-Erstellung ewig gedauert hat, startete <code>sudo service gitlab start</code> tatsächlich den Server.</p>
<p>Da ich statt Apache2 einsetze gings dann weiter mit dieser Anleitung:</p>
<p><a href="https://gitlab.com/gitlab-org/gitlab-recipes/tree/script_to_bin/web-server/apache">https://gitlab.com/gitlab-org/gitlab-recipes/tree/script_to_bin/web-server/apache</a></p>
<p>Beim <a href="https://github.com/gitlabhq/gitlabhq/blob/7-6-stable/doc/install/installation.md#double-check-application-status">Double Check App-Status</a> werden noch ein paar Issues gemeldet. Also …</p>
<p><strong>Git auf aktuelle Version</strong> aktualisieren</p>
<p><a href="http://askubuntu.com/questions/333095/install-a-more-recent-version-of-git-on-a-lts">http://askubuntu.com/questions/333095/install-a-more-recent-version-of-git-on-a-lts</a></p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">sudo add</span><span class="pun">-</span><span class="pln">apt</span><span class="pun">-</span><span class="pln">repository ppa</span><span class="pun">:</span><span class="pln">git</span><span class="pun">-</span><span class="pln">core</span><span class="pun">/</span><span class="pln">ppa
sudo apt</span><span class="pun">-</span><span class="kwd">get</span><span class="pln"> install git</span><span class="pun">-</span><span class="pln">core</span></code></pre>
<p>ersetzt dann auch git</p>
<p><strong>Sidekiq</strong> anschalten</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">sudo </span><span class="pun">-</span><span class="pln">u git </span><span class="pun">-</span><span class="pln">H RAILS_ENV</span><span class="pun">=</span><span class="pln">production bin</span><span class="pun">/</span><span class="pln">background_jobs start</span></code></pre>
<p>Nach einen <code>service gitlab restart</code> ist auch Unicorn gestartet.</p>
<p>Falls bei <code>/home/git/gitlab-shell/bin/check</code> trotzdem noch die git-shell über mangelnden API Zugriff meckert, liegt es evtl. daran, dass die gewählte Domain noch nicht auf den Server zeigt. So war es bei mir, da die Domains extern verwaltet werden.</p>
<h2><strong>HTTPS/SSL aktivieren</strong></h2>
<p>Da das ganze ja praktisch Produktiv und draußen läuft muss noch bissl Sicherheit her. Also der <a href="https://github.com/gitlabhq/gitlabhq/blob/7-6-stable/doc/install/installation.md#using-https">Anleitung</a> folgen und die <a href="https://gitlab.com/gitlab-org/gitlab-recipes/tree/script_to_bin/web-server/apache">Apache Config Vorlage</a> nutzen..</p>
<p><code>/etc/apache2/apache2.conf</code>:</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="typ">ServerTokens</span><span class="pln"> </span><span class="typ">Prod</span><span class="pln">
</span><span class="typ">ServerSignature</span><span class="pln"> </span><span class="typ">Off</span><span class="pln">
</span><span class="typ">TraceEnable</span><span class="pln"> </span><span class="typ">Off</span><span class="pln">
</span><span class="typ">SSLCompression</span><span class="pln"> </span><span class="typ">Off</span></code></pre>
<p>Und dann …</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">sudo a2dismod suexec
sudo a2dismod deflate</span></code></pre>
<p>Und dann vhost-Konfig anpassen..</p>
<p><a href="https://gitlab.com/gitlab-org/gitlab-recipes/blob/script_to_bin/web-server/apache/gitlab-ssl.conf">https://gitlab.com/gitlab-org/gitlab-recipes/blob/script_to_bin/web-server/apache/gitlab-ssl.conf</a></p>
<p>Und die <code>gitlab-shell/config.yml</code> sowie die <code>gitlab/config.yml</code> entsprechend der Anleitung anpassen.</p>
<p>Noch ein <code>service apache2 restart</code> und schon funktionierts! zumindest bei mir jetzt <img src="http://blog.rh-flow.de/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;"></p>
<p><strong>Riesen Dank an die Jungs und Mädels der GitLab Community. Die Anleitung ist großartig!</strong></p>
<p><em>Wie immer, Anregungen, Tipps wie es besser geht, was falsch ist, gern hier als Kommentar oder per Twitter</em>. <a href="https://twitter.com/rhflow_de">@rhflow_de</a></p>
