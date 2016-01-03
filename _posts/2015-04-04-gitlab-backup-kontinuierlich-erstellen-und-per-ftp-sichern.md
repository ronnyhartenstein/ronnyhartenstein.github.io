---
layout: post
status: publish
published: true
title: GitLab Backup kontinuierlich erstellen und per FTP sichern
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: |+
  <p>Wie man GitLab auf Ubuntu 10.04 LTS einrichtet hab ich ja <a href="http:&#47;&#47;blog.rh-flow.de&#47;2014&#47;12&#47;19&#47;gitlab-7-6-auf-ubuntu-10-04-lts-lucid-lynx&#47;">hier<&#47;a> beschrieben. Backups sind wichtig. Deswegen muss auch eine GitLab-Instanz, bzw. die Repositories und Datenbanken gesichert werden. In der <a href="https:&#47;&#47;gitlab.com&#47;gitlab-org&#47;gitlab-ce&#47;blob&#47;master&#47;doc&#47;raketasks&#47;backup_restore.md">Anleitung<&#47;a> ist die Methode f&uuml;r Sourcecode-kompilierte GitLab-Installationen. (interessant auch <a href="http:&#47;&#47;www.icicletech.com&#47;blog&#47;gitlab-backup-made-easy">hier<&#47;a>).<&#47;p>

  <p><strong>TL;DR<&#47;strong> Backup erstellen funktioniert wie in der Anleitung beschrieben, nur der S3-Upload funktioniert nicht, weil Region Frankfurt nur mit IAM Auth v4 l&auml;uft. Geht evtl. bei einer Omnibus-Install, bei mir aber nicht. Daher erfolgt der Backup des Backups per FTP-Upload. [Update: jetzt mit Boxbackup..]<&#47;p>

wordpress_id: 696
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=696
date: '2015-04-04 22:12:36 +0200'
date_gmt: '2015-04-04 20:12:36 +0200'
categories:
- DevOp
- Git
tags: []
---
<p>Wie man GitLab auf Ubuntu 10.04 LTS einrichtet hab ich ja <a href="http:&#47;&#47;blog.rh-flow.de&#47;2014&#47;12&#47;19&#47;gitlab-7-6-auf-ubuntu-10-04-lts-lucid-lynx&#47;">hier<&#47;a> beschrieben. Backups sind wichtig. Deswegen muss auch eine GitLab-Instanz, bzw. die Repositories und Datenbanken gesichert werden. In der <a href="https:&#47;&#47;gitlab.com&#47;gitlab-org&#47;gitlab-ce&#47;blob&#47;master&#47;doc&#47;raketasks&#47;backup_restore.md">Anleitung<&#47;a> ist die Methode f&uuml;r Sourcecode-kompilierte GitLab-Installationen. (interessant auch <a href="http:&#47;&#47;www.icicletech.com&#47;blog&#47;gitlab-backup-made-easy">hier<&#47;a>).<&#47;p></p>
<p><strong>TL;DR<&#47;strong> Backup erstellen funktioniert wie in der Anleitung beschrieben, nur der S3-Upload funktioniert nicht, weil Region Frankfurt nur mit IAM Auth v4 l&auml;uft. Geht evtl. bei einer Omnibus-Install, bei mir aber nicht. Daher erfolgt der Backup des Backups per FTP-Upload. [Update: jetzt mit Boxbackup..]<&#47;p></p>
<p><a id="more"></a><a id="more-696"></a></p>
<p>Zun&auml;chst der manuelle Test:<&#47;p></p>
<pre><code>&#47;home&#47;git&#47;gitlab# sudo -u git -H bundle exec rake gitlab:backup:create RAILS_ENV=production<br />
<&#47;code><&#47;pre></p>
<p>Dann f&auml;llt am Ende ein Backupfile raus: <code>&#47;home&#47;git&#47;gitlab&#47;tmp&#47;backups&#47;1427915082_gitlab_backup.tar<&#47;code> Diese sollte g&uuml;nstigerweise zu Amazon S3 &uuml;bertragen werden.<&#47;p></p>
<h2>Amazon S3 Bucket anlegen<&#47;h2></p>
<ul>
<li>bei <a href="http:&#47;&#47;aws.amazon.com&#47;de&#47;">Amazon AWS<&#47;a> anmelden (optional)<&#47;li>
<li>S3 Bucket anlegen (z.B. "dein-gitlab-backup")<&#47;li>
<li>IAM User anlegen (z.B. "backup-uploader") &amp; Credentials sichern (Access-Key-ID &amp; Secret-Access-Key)<&#47;li>
<li><code>&#47;home&#47;git&#47;gitlab&#47;config&#47;gitlab.yml<&#47;code> anpassen bei <code>backup:<&#47;code> .. Bucketname &amp; Credentials..<&#47;li><br />
<&#47;ul></p>
<h2>Backup erneut..<&#47;h2></p>
<p>AWS meldet Fehler "The authorization mechanism you have provided is not supported. Please use AWS4-HMAC-SHA256." Stackoverflow hilft nicht direkt weiter ([hier]http:&#47;&#47;stackoverflow.com&#47;questions&#47;26533245&#47;the-authorization-mechanism-you-have-provided-is-not-supported-please-use-aws4))<&#47;p></p>
<p>Wenn Gitlab mit Omnibus installiert wurde, kann man das wohl einstellen. Aber f&uuml;r das selbstkompilierte hab ich selbst in dem <a href="https:&#47;&#47;github.com&#47;gitlabhq&#47;gitlabhq&#47;issues&#47;8402">Issue<&#47;a> jetzt keine L&ouml;sung gefunden. In einer Ruby-Config soll man das wohl so schreiben:<&#47;p></p>
<pre><code>@hmac = Fog::HMAC.new('sha256', 'AWS4' + secret_key)<br />
<&#47;code><&#47;pre></p>
<p>Aber in einer <code>yml<&#47;code>? Keine Ahnung. Nun ja, also als Alternativ-L&ouml;sung der automatische <strong>FTP-Upload<&#47;strong>.<&#47;p></p>
<h2>Upload via FTP per Cronjob<&#47;h2></p>
<p>Pflege der Credentials in der &tilde;&#47;.netrc (<code>chmod 0600<&#47;code> setzen)<&#47;p></p>
<pre><code># ~&#47;.netrc<br />
machine ftp.example.com<br />
login user<br />
password secret<br />
<&#47;code><&#47;pre></p>
<p>Dann funktioniert der Upload der Backup-Datei in <code>&#47;home&#47;git&#47;gitlab&#47;tmp&#47;backup<&#47;code> problemlos. Zun&auml;chst testen:<&#47;p></p>
<pre><code> echo put datum_gitlab_backup.tar | ftp ftp.example.com<br />
<&#47;code><&#47;pre></p>
<p>Nun als komplettes Script, welches auch gleich das aktuelle Backupfile normiert und somit immer das aktuelle Backup auf dem FTP immer unter <code>current_gitlab_backup.tar<&#47;code> ablegt.<&#47;p></p>
<pre><code>#&#47;bin&#47;bash</p>
<p>domain=" ftp.example.com"<br />
curr="current_gitlab_backup.tar"<br />
daily=`find -type f -name "*_gitlab_backup.tar"`</p>
<p>rm $curr<br />
mv $daily $curr </p>
<p>echo "<br />
delete $curr<br />
put $curr<br />
bye<br />
" | ftp $domain > ftp_upload.log<br />
<&#47;code><&#47;pre></p>
<p>In der Crontab wird erst gebackupt und das hochgeladen<&#47;p></p>
<pre><code># GitLab backup<br />
0 4 * * * cd &#47;home&#47;git&#47;gitlab &amp;&amp; PATH=&#47;usr&#47;local&#47;bin:&#47;usr&#47;bin:&#47;bin bundle exec rake gitlab:backup:create RAILS_ENV=production CRON=1<br />
30 4 * * * cd &#47;home&#47;git&#47;gitlab&#47;tmp&#47;backups &amp;&amp; .&#47;upload.sh<br />
<&#47;code><&#47;pre></p>
<h2>Boxbackup statt FTP<&#47;h2></p>
<p>Wenn man ein Boxbackup-Setup hat (wie <a href="http:&#47;&#47;blog.rh-flow.de&#47;2015&#47;01&#47;14&#47;box-backup-zwischen-ubuntu-10-04-client-und-14-04-server&#47;">hier<&#47;a> beschrieben) kann man auch das Backupverzeichnis einfach synchronisieren lassen. Also einfach in die <code>&#47;etc&#47;boxbackup&#47;bbackup.conf<&#47;code> eintragen:<&#47;p></p>
<pre><code>...<br />
gitlab-backups<br />
{<br />
Path = &#47;home&#47;git&#47;gitlab&#47;tmp&#47;backups<br />
}<br />
...<br />
<&#47;code><&#47;pre></p>
<h2>Configdateien sichern!<&#47;h2></p>
<p>Leider sind beim Backup die Configdateien nicht dabei, daher empfiehlt die Anleitung:<&#47;p></p>
<ul>
<li><em>backing up your gitlab.yml file,<&#47;em> -> <code>tar cvfz gitlab_config.tgz &#47;home&#47;git&#47;gitlab&#47;config<&#47;code> -> muss nur bei &Auml;nderungen erneut gesichert werden, am besten auf den FTP-Backupspace hochladen<&#47;li>
<li><em>any SSL keys and certificates,<&#47;em> -> <code>tar cvfz gitlab_ssl_keys.tgz &#47;home&#47;git&#47;.ssh<&#47;code><&#47;li>
<li><em>and your SSH host keys.<&#47;em> -> <code>tar cvfz gitlab_ssh_host_keys.tgz &#47;etc&#47;ssh<&#47;code> (<a href="https:&#47;&#47;superuser.com&#47;questions&#47;532040&#47;copy-ssh-keys-from-one-server-to-another-server&#47;532079#532079">stackoverflow<&#47;a>)<&#47;li><br />
<&#47;ul></p>
<p>Die <code>tar<&#47;code>s sollten g&uuml;nstigerweise sofort auf den lokalen Rechner runtergeladen und gleich wieder gel&ouml;scht werden.<&#47;p></p>
<h2>Cronjob anlegen<&#47;h2></p>
<p><code>crontab -e<&#47;code> aufrufen und eintragen:<&#47;p></p>
<pre><code>0 4 * * * cd &#47;home&#47;git&#47;gitlab &amp;&amp; PATH=&#47;usr&#47;local&#47;bin:&#47;usr&#47;bin:&#47;bin bundle exec rake gitlab:backup:create RAILS_ENV=production CRON=1<br />
<&#47;code><&#47;pre></p>
<h1>Restore aus Backup<&#47;h1></p>
<p>Sofern der Server komplett abschmiert und alles weg ist bleibt nix anderes &uuml;brig, als<&#47;p></p>
<ul>
<li>Configs und SSH-Keys wieder auswickeln<&#47;li>
<li>Backup einspielen lt. <a href="https:&#47;&#47;gitlab.com&#47;gitlab-org&#47;gitlab-ce&#47;blob&#47;master&#47;doc&#47;raketasks&#47;backup_restore.md#restore-a-previously-created-backup">Anleitung "Restore a previously created backup"<&#47;a><&#47;li><br />
<&#47;ul></p>
<p>Aufruf:<&#47;p></p>
<pre><code>bundle exec rake gitlab:backup:restore RAILS_ENV=production<br />
<&#47;code><&#47;pre></p>
<p><strong>That's it.<&#47;strong><&#47;p></p>
<p><em>Backup und Restore sind nun also auch eruiert. Bleibt zu hoffen, dass man die niemals braucht. Niemals.<&#47;em><&#47;p></p>
