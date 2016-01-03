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
  <p>Wie man GitLab auf Ubuntu 10.04 LTS einrichtet hab ich ja hier beschrieben. Backups sind wichtig. Deswegen muss auch eine GitLab-Instanz, bzw. die Repositories und Datenbanken gesichert werden. In der Anleitung ist die Methode für Sourcecode-kompilierte GitLab-Installationen.</p>

  <p><strong>TL;DR</strong> Backup erstellen funktioniert wie in der Anleitung beschrieben, nur der S3-Upload funktioniert nicht, weil Region Frankfurt nur mit IAM Auth v4 läuft. Geht evtl. bei einer Omnibus-Install, bei mir aber nicht. Daher erfolgt der Backup des Backups per FTP-Upload. [Update: jetzt mit Boxbackup..]</p>

wordpress_id: 696
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=696
date: '2015-04-04 22:12:36 +0200'
date_gmt: '2015-04-04 20:12:36 +0200'
categories:
- DevOp
- Git
tags: []
---
Wie man GitLab auf Ubuntu 10.04 LTS einrichtet hab ich ja [hier][1] beschrieben. Backups sind wichtig. Deswegen muss auch eine GitLab-Instanz, bzw. die Repositories und Datenbanken gesichert werden. In der [Anleitung][2] ist die Methode für Sourcecode-kompilierte GitLab-Installationen. (interessant auch [hier][3]).

**TL;DR** Backup erstellen funktioniert wie in der Anleitung beschrieben, nur der S3-Upload funktioniert nicht, weil Region Frankfurt nur mit IAM Auth v4 läuft. Geht evtl. bei einer Omnibus-Install, bei mir aber nicht. Daher erfolgt der Backup des Backups per FTP-Upload. [Update: jetzt mit Boxbackup..]

<!--more-->

Zunächst der manuelle Test:

    /home/git/gitlab# sudo -u git -H bundle exec rake gitlab:backup:create RAILS_ENV=production


Dann fällt am Ende ein Backupfile raus: `/home/git/gitlab/tmp/backups/1427915082_gitlab_backup.tar` Diese sollte günstigerweise zu Amazon S3 übertragen werden.

## Amazon S3 Bucket anlegen

*   bei [Amazon AWS][4] anmelden (optional)
*   S3 Bucket anlegen (z.B. "dein-gitlab-backup")
*   IAM User anlegen (z.B. "backup-uploader") & Credentials sichern (Access-Key-ID & Secret-Access-Key)
*   `/home/git/gitlab/config/gitlab.yml` anpassen bei `backup:` .. Bucketname & Credentials..

## Backup erneut..

AWS meldet Fehler "The authorization mechanism you have provided is not supported. Please use AWS4-HMAC-SHA256." Stackoverflow hilft nicht direkt weiter ([hier]http://stackoverflow.com/questions/26533245/the-authorization-mechanism-you-have-provided-is-not-supported-please-use-aws4))

Wenn Gitlab mit Omnibus installiert wurde, kann man das wohl einstellen. Aber für das selbstkompilierte hab ich selbst in dem [Issue][5] jetzt keine Lösung gefunden. In einer Ruby-Config soll man das wohl so schreiben:

    @hmac = Fog::HMAC.new('sha256', 'AWS4' + secret_key)


Aber in einer `yml`? Keine Ahnung. Nun ja, also als Alternativ-Lösung der automatische **FTP-Upload**.

## Upload via FTP per Cronjob

Pflege der Credentials in der ˜/.netrc (`chmod 0600` setzen)

    # ~/.netrc
    machine ftp.example.com
    login user
    password secret


Dann funktioniert der Upload der Backup-Datei in `/home/git/gitlab/tmp/backup` problemlos. Zunächst testen:

     echo put datum_gitlab_backup.tar | ftp ftp.example.com


Nun als komplettes Script, welches auch gleich das aktuelle Backupfile normiert und somit immer das aktuelle Backup auf dem FTP immer unter `current_gitlab_backup.tar` ablegt.

    #/bin/bash

    domain=" ftp.example.com"
    curr="current_gitlab_backup.tar"
    daily=`find -type f -name "*_gitlab_backup.tar"`

    rm $curr
    mv $daily $curr

    echo "
    delete $curr
    put $curr
    bye
    " | ftp $domain > ftp_upload.log


In der Crontab wird erst gebackupt und das hochgeladen

    # GitLab backup
    0 4 * * * cd /home/git/gitlab && PATH=/usr/local/bin:/usr/bin:/bin bundle exec rake gitlab:backup:create RAILS_ENV=production CRON=1
    30 4 * * * cd /home/git/gitlab/tmp/backups && ./upload.sh


## Boxbackup statt FTP

Wenn man ein Boxbackup-Setup hat (wie [hier][6] beschrieben) kann man auch das Backupverzeichnis einfach synchronisieren lassen. Also einfach in die `/etc/boxbackup/bbackup.conf` eintragen:

    ...
    gitlab-backups
    {
    Path = /home/git/gitlab/tmp/backups
    }
    ...


## Configdateien sichern!

Leider sind beim Backup die Configdateien nicht dabei, daher empfiehlt die Anleitung:

*   *backing up your gitlab.yml file,* -> `tar cvfz gitlab_config.tgz /home/git/gitlab/config` -> muss nur bei Änderungen erneut gesichert werden, am besten auf den FTP-Backupspace hochladen
*   *any SSL keys and certificates,* -> `tar cvfz gitlab_ssl_keys.tgz /home/git/.ssh`
*   *and your SSH host keys.* -> `tar cvfz gitlab_ssh_host_keys.tgz /etc/ssh` ([stackoverflow][7])

Die `tar`s sollten günstigerweise sofort auf den lokalen Rechner runtergeladen und gleich wieder gelöscht werden.

## Cronjob anlegen

`crontab -e` aufrufen und eintragen:

    0 4 * * * cd /home/git/gitlab && PATH=/usr/local/bin:/usr/bin:/bin bundle exec rake gitlab:backup:create RAILS_ENV=production CRON=1


# Restore aus Backup

Sofern der Server komplett abschmiert und alles weg ist bleibt nix anderes übrig, als

*   Configs und SSH-Keys wieder auswickeln
*   Backup einspielen lt. [Anleitung "Restore a previously created backup"][8]

Aufruf:

    bundle exec rake gitlab:backup:restore RAILS_ENV=production


**That's it.**

*Backup und Restore sind nun also auch eruiert. Bleibt zu hoffen, dass man die niemals braucht. Niemals.*

 [1]: http://blog.rh-flow.de/2014/12/19/gitlab-7-6-auf-ubuntu-10-04-lts-lucid-lynx/
 [2]: https://gitlab.com/gitlab-org/gitlab-ce/blob/master/doc/raketasks/backup_restore.md
 [3]: http://www.icicletech.com/blog/gitlab-backup-made-easy
 [4]: http://aws.amazon.com/de/
 [5]: https://github.com/gitlabhq/gitlabhq/issues/8402
 [6]: http://blog.rh-flow.de/2015/01/14/box-backup-zwischen-ubuntu-10-04-client-und-14-04-server/
 [7]: https://superuser.com/questions/532040/copy-ssh-keys-from-one-server-to-another-server/532079#532079
 [8]: https://gitlab.com/gitlab-org/gitlab-ce/blob/master/doc/raketasks/backup_restore.md#restore-a-previously-created-backup
