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
excerpt: |+
  Inspiriert durch eine langsam Fahrt aufnehmende Umstellung meines Arbeitgebers hab ich dran gemacht, die Quellcode-Verwaltung meiner Nicht-Opensource-Projekte vom in die Jahre gekommenen Subversion zu Git zu migrieren. Erster Schritt: GitLab einrichten!

wordpress_id: 523
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=523
date: '2014-12-19 08:49:01 +0100'
date_gmt: '2014-12-19 06:49:01 +0100'
categories:
- DevOp
- Git
tags: []
---
<p>Inspiriert durch eine langsam Fahrt aufnehmende Umstellung meines Arbeitgebers hab ich dran gemacht, die Quellcode-Verwaltung meiner Nicht-Opensource-Projekte vom in die Jahre gekommenen Subversion zu Git zu migrieren. Erster Schritt: <a href="https:&#47;&#47;about.gitlab.com&#47;">GitLab<&#47;a> einrichten!<&#47;p></p>
<p><a id="more"></a><a id="more-523"></a></p>
<p>Da mein Hoster HostEurope bis dato noch nicht imstande war, VServer mit Ubuntu 14.04 LTS anzubieten, ich aber nicht jetzt erst noch auf 12.04 LTS umschwenken will, blieb mir nur GitLab auf 10.04 zum Laufen zu bringen. Leider gibt es f&uuml;r dessen aktuelle Version keine gezielte Anleitung, sondern nur eine <a href="http:&#47;&#47;www.andmarios.com&#47;2012&#47;06&#47;gitlab-on-an-ubuntu-10-04-server-with-apache&#47;">veraltete Anleitung<&#47;a> aus 2012.<&#47;p></p>
<p>Ich folgte also der der <a href="https:&#47;&#47;github.com&#47;gitlabhq&#47;gitlabhq&#47;blob&#47;7-6-stable&#47;doc&#47;install&#47;installation.md">offiziellen Anleitung zu GitLab 7.6<&#47;a> so gut es geht..<&#47;p></p>
<h2><strong>Ruby 2.x installieren<&#47;strong><&#47;h2></p>
<p>Einfach der <a href="https:&#47;&#47;github.com&#47;gitlabhq&#47;gitlabhq&#47;blob&#47;7-6-stable&#47;doc&#47;install&#47;installation.md#2-ruby">Anleitung<&#47;a> folgen und aus den Quellen kompilieren.. <code>make<&#47;code> &amp; <code>make install<&#47;code> dauert bissl.<&#47;p></p>
<h2><strong>MySQL Datenbank aufsetzen<&#47;strong><&#47;h2></p>
<p>Einfach der Anleitung folgen.. bei mir recht einfach &uuml;ber die Plesk 12 Oberfl&auml;che..<&#47;p></p>
<h2><strong>Redis 2.x installieren<&#47;strong><&#47;h2></p>
<p>Ubuntu 10.04 liefert nur Redis 1.x mit, GitLab braucht diesen aber f&uuml;r Zugriff via Socketfile statt Port. Aber auf <a href="https:&#47;&#47;launchpad.net&#47;~tsuru&#47;+archive&#47;ubuntu&#47;redis-server">Launchpad gibt ein nutzergepflegtes Paket<&#47;a>.<&#47;p></p>
<pre><code>sudo add-apt-repository ppa:tsuru&#47;redis-server<br />
sudo apt-get update<br />
sudo apt-get install redis-server<br />
<&#47;code><&#47;pre></p>
<p>oder falls bereits installiert<&#47;p></p>
<pre><code>sudo apt-get upgrade<br />
<&#47;code><&#47;pre></p>
<p>und dann der <a href="https:&#47;&#47;github.com&#47;gitlabhq&#47;gitlabhq&#47;blob&#47;7-6-stable&#47;doc&#47;install&#47;installation.md#5-redis">Anleitung<&#47;a> folgen...<&#47;p></p>
<h2><strong>User einrichten<&#47;strong><&#47;h2></p>
<p>Einfach der <a href="https:&#47;&#47;github.com&#47;gitlabhq&#47;gitlabhq&#47;blob&#47;7-6-stable&#47;doc&#47;install&#47;installation.md#3-system-users">Anleitung<&#47;a> folgen..<&#47;p></p>
<h2><strong>GitLab selbst einrichten<&#47;strong><&#47;h2></p>
<p>Jetzt wirds ernst.. munter gehts durch die <a href="https:&#47;&#47;github.com&#47;gitlabhq&#47;gitlabhq&#47;blob&#47;7-6-stable&#47;doc&#47;install&#47;installation.md#6-gitlab">Anleitung<&#47;a> ... Source clonen &amp; Konfig war kein Hit. <code>bundle install<&#47;code> wirft als User git leider Passwort-Abfragen, also versuch ichs als root. Dann weiter der Anleitung folgen, sodass am Schluss beim <a href="https:&#47;&#47;github.com&#47;gitlabhq&#47;gitlabhq&#47;blob&#47;7-6-stable&#47;doc&#47;install&#47;installation.md#check-application-status">Check Application Status<&#47;a> ordentliche Werte gezeigt werden. Und nach der Assert-Erstellung, wobei die JS-Erstellung ewig gedauert hat, startete <code>sudo service gitlab start<&#47;code> tats&auml;chlich den Server.<&#47;p></p>
<p>Da ich statt Apache2 einsetze gings dann weiter mit dieser Anleitung:<&#47;p></p>
<p><a href="https:&#47;&#47;gitlab.com&#47;gitlab-org&#47;gitlab-recipes&#47;tree&#47;script_to_bin&#47;web-server&#47;apache">https:&#47;&#47;gitlab.com&#47;gitlab-org&#47;gitlab-recipes&#47;tree&#47;script_to_bin&#47;web-server&#47;apache<&#47;a><&#47;p></p>
<p>Beim <a href="https:&#47;&#47;github.com&#47;gitlabhq&#47;gitlabhq&#47;blob&#47;7-6-stable&#47;doc&#47;install&#47;installation.md#double-check-application-status">Double Check App-Status<&#47;a> werden noch ein paar Issues gemeldet. Also ...<&#47;p></p>
<p><strong>Git auf aktuelle Version<&#47;strong> aktualisieren<&#47;p></p>
<p><a href="http:&#47;&#47;askubuntu.com&#47;questions&#47;333095&#47;install-a-more-recent-version-of-git-on-a-lts">http:&#47;&#47;askubuntu.com&#47;questions&#47;333095&#47;install-a-more-recent-version-of-git-on-a-lts<&#47;a><&#47;p></p>
<pre><code>sudo add-apt-repository ppa:git-core&#47;ppa<br />
sudo apt-get install git-core<br />
<&#47;code><&#47;pre></p>
<p>ersetzt dann auch git<&#47;p></p>
<p><strong>Sidekiq<&#47;strong> anschalten<&#47;p></p>
<pre><code>sudo -u git -H RAILS_ENV=production bin&#47;background_jobs start<br />
<&#47;code><&#47;pre></p>
<p>Nach einen <code>service gitlab restart<&#47;code> ist auch Unicorn gestartet.<&#47;p></p>
<p>Falls bei <code>&#47;home&#47;git&#47;gitlab-shell&#47;bin&#47;check<&#47;code> trotzdem noch die git-shell &uuml;ber mangelnden API Zugriff meckert, liegt es evtl. daran, dass die gew&auml;hlte Domain noch nicht auf den Server zeigt. So war es bei mir, da die Domains extern verwaltet werden.<&#47;p></p>
<h2><strong>HTTPS&#47;SSL aktivieren<&#47;strong><&#47;h2></p>
<p>Da das ganze ja praktisch Produktiv und drau&szlig;en l&auml;uft muss noch bissl Sicherheit her. Also der <a href="https:&#47;&#47;github.com&#47;gitlabhq&#47;gitlabhq&#47;blob&#47;7-6-stable&#47;doc&#47;install&#47;installation.md#using-https">Anleitung<&#47;a> folgen und die <a href="https:&#47;&#47;gitlab.com&#47;gitlab-org&#47;gitlab-recipes&#47;tree&#47;script_to_bin&#47;web-server&#47;apache">Apache Config Vorlage<&#47;a> nutzen..<&#47;p></p>
<p><code>&#47;etc&#47;apache2&#47;apache2.conf<&#47;code>:<&#47;p></p>
<pre><code>ServerTokens Prod<br />
ServerSignature Off<br />
TraceEnable Off<br />
SSLCompression Off<br />
<&#47;code><&#47;pre></p>
<p>Und dann ...<&#47;p></p>
<pre><code>sudo a2dismod suexec<br />
sudo a2dismod deflate<br />
<&#47;code><&#47;pre></p>
<p>Und dann vhost-Konfig anpassen..<&#47;p></p>
<p><a href="https:&#47;&#47;gitlab.com&#47;gitlab-org&#47;gitlab-recipes&#47;blob&#47;script_to_bin&#47;web-server&#47;apache&#47;gitlab-ssl.conf">https:&#47;&#47;gitlab.com&#47;gitlab-org&#47;gitlab-recipes&#47;blob&#47;script_to_bin&#47;web-server&#47;apache&#47;gitlab-ssl.conf<&#47;a><&#47;p></p>
<p>Und die <code>gitlab-shell&#47;config.yml<&#47;code> sowie die <code>gitlab&#47;config.yml<&#47;code> entsprechend der Anleitung anpassen.<&#47;p></p>
<p>Noch ein <code>service apache2 restart<&#47;code> und schon funktionierts! zumindest bei mir jetzt :)<&#47;p></p>
<p><strong>Riesen Dank an die Jungs und M&auml;dels der GitLab Community. Die Anleitung ist gro&szlig;artig!<&#47;strong><&#47;p></p>
<p><em>Wie immer, Anregungen, Tipps wie es besser geht, was falsch ist, gern hier als Kommentar oder per Twitter<&#47;em>. <a href="https:&#47;&#47;twitter.com&#47;rhflow_de">@rhflow_de<&#47;a><&#47;p></p>
