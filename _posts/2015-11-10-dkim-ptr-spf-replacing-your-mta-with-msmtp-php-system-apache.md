---
layout: post
comments: true
something: "blafasel"
status: publish
published: true
title: DKIM, PTR, SPF? Replacing your MTA with MSMTP (+PHP, +System, +Apache)
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
wordpress_id: 764
wordpress_url: http://blog.rh-flow.de/?p=764
date: '2015-11-10 00:24:37 +0100'
date_gmt: '2015-11-09 22:24:37 +0100'
categories: DevOp
tags: []
---
Fuck you fuckin spammer! Because of the arms race it started that getting those message some days ago:

> Undelivered Mail Returned to Sender
>
> gmail-smtp-in.l.google.com[2a00:1450:4013:c00::1a] said: 550-5.7.1 [2a01:488:66:1000:5bfa:7407:0:1] Our system has detected that this 550-5.7.1 message does not meet IPv6 sending guidelines regarding PTR records 550-5.7.1 and authentication. Please review 550-5.7.1 https://support.google.com/mail/?p=ipv6_authentication_error for more 550 5.7.1 information. m131si2394453wmb.65 - gsmtp (in reply to end of DATA command)

**TL;DR** MSMTP is a beyond edge of plate tip when I ran into the DKIM issue. Nothing what follows is really new or surprising.

<!--more-->

You can have a look at the [Google Support page][1] and this helpfull [Serverfault][2] answer.

Well, it seems that its nowadays finally necessary, to have DKIM, SPF and other fancy stuff alive to just send emails from you goddamned own server. I run Ubuntu 14.04 with Plesk and found [this][3] and [this][4] easy going tutorials. Well, I made some bad experience with MTAs and the other parts of the mail chain. So I really guess it won't be easy. And maybe it wouldn't be the final step but an ongoing process of an never ending arms race.

## So is there a plan B?

After a little bit of chat (well, mostly complaining) @MorrisJbk told me about [msmtp][5]. With this tiny little tool an external provider could be used as the system MTA. Its transparent and also PHP could use it. That's it!

Here is what I did to ship it.

## Installing Msmtp and inital configuration

I followed the [Archlinux msmtp Guide][5]

    apt-get install msmtp


Create a separate Google Account. You probably don't want to use your main private account when your server went to a zombie spammer robot.

Configure the new credentials in `/etc/msmtp`

    # Defauls for all accounts
    defaults
    auth           on
    tls            on
    tls_trust_file /etc/ssl/certs/ca-certificates.crt
    logfile        /var/log/mail.msmtp.log

    # Gmail
    account        gmail
    host           smtp.gmail.com
    port           587
    from           your.mailer@gmail.com
    user           your.mailer
    password       [secret but plain!]

    # Set a default account
    account default : gmail


It's also possible to use GPG instead of the plain password. Have a look at the Guide for that.

Next: Activate "Allow access from less secure apps" in [Google's Security Settings][6].

Add this to your `/etc/mail.rc` to have a transparent sendmail integration for CLI.

    set sendmail=/usr/bin/msmtp


Now you can try sending a test email via command line:

    mail -s "test subject" your@email.tld <<< "test message"


## Enable MSMTP for PHP

I found [this tutorial][7] which describes it in detail.

First duplicate the msmtp config with Apache access right

    cp /etc/msmtp /etc/msmtp_php
    chown www-data:www-data /etc/msmtp_php
    chmod 600 /etc/msmtp_php


Then start a separate logfile with appropriate Apache rights.

    touch /var/log/mail.msmtp_php.log
    chown www-data:www-data /var/log/mail.msmtp_php.log


Then activate it in `php.ini`:

    sendmail_path = "/usr/bin/msmtp -C /etc/msmtp_php --logfile /var/log/mail.msmtp_php.log -a gmail -t"


Finally restart your Apache.

Voilá! There u go!

Why I write this post? First because I can. Second because I hate people who make other people more work than necessary!

 [1]: https://support.google.com/mail/?p=ipv6_authentication_error
 [2]: http://serverfault.com/questions/532298/why-is-google-rejecting-mails-forwarded-from-my-postfix-server
 [3]: http://blog.matoski.com/articles/spf-dk-dkim-plesk-debian/
 [4]: https://www.exratione.com/2014/07/setting-up-spf-and-dkim-for-an-ubuntu-1404-mail-server/
 [5]: https://wiki.archlinux.org/index.php/Msmtp
 [6]: https://www.google.com/settings/security/lesssecureapps
 [7]: https://www.digitalocean.com/community/tutorials/how-to-use-gmail-or-yahoo-with-php-mail-function
