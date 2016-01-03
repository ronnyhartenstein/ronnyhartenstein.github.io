---
layout: post
status: publish
published: true
title: DKIM, PTR, SPF? Replacing your MTA with MSMTP (+PHP, +System, +Apache)
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: "<p>Fuck you fuckin spammer! Because of the arms race it started that getting
  those message some days ago:<&#47;p>\n\n<blockquote>\n  <p>Undelivered Mail Returned
  to Sender<&#47;p>\n  \n  <p>gmail-smtp-in.l.google.com[2a00:1450:4013:c00::1a] said:
  550-5.7.1 [2a01:488:66:1000:5bfa:7407:0:1] Our system has detected that this 550-5.7.1
  message does not meet IPv6 sending guidelines regarding PTR records 550-5.7.1 and
  authentication. Please review 550-5.7.1 https:&#47;&#47;support.google.com&#47;mail&#47;?p=ipv6_authentication_error
  for more 550 5.7.1 information. m131si2394453wmb.65 - gsmtp (in reply to end of
  DATA command)<&#47;p>\n<&#47;blockquote>\n\n<p><strong>TL;DR<&#47;strong> MSMTP
  is a beyond edge of plate tip when I ran into the DKIM issue. Nothing what follows
  is really new or surprising.<&#47;p>\n\n"
wordpress_id: 764
wordpress_url: http://blog.rh-flow.de/?p=764
date: '2015-11-10 00:24:37 +0100'
date_gmt: '2015-11-09 22:24:37 +0100'
categories:
- Allgemein
tags: []
---
<p>Fuck you fuckin spammer! Because of the arms race it started that getting those message some days ago:<&#47;p></p>
<blockquote>
<p>Undelivered Mail Returned to Sender<&#47;p></p>
<p>gmail-smtp-in.l.google.com[2a00:1450:4013:c00::1a] said: 550-5.7.1 [2a01:488:66:1000:5bfa:7407:0:1] Our system has detected that this 550-5.7.1 message does not meet IPv6 sending guidelines regarding PTR records 550-5.7.1 and authentication. Please review 550-5.7.1 https:&#47;&#47;support.google.com&#47;mail&#47;?p=ipv6_authentication_error for more 550 5.7.1 information. m131si2394453wmb.65 - gsmtp (in reply to end of DATA command)<&#47;p><br />
<&#47;blockquote></p>
<p><strong>TL;DR<&#47;strong> MSMTP is a beyond edge of plate tip when I ran into the DKIM issue. Nothing what follows is really new or surprising.<&#47;p></p>
<p><a id="more"></a><a id="more-764"></a></p>
<p>You can have a look at the <a href="https:&#47;&#47;support.google.com&#47;mail&#47;?p=ipv6_authentication_error">Google Support page<&#47;a> and this helpfull <a href="http:&#47;&#47;serverfault.com&#47;questions&#47;532298&#47;why-is-google-rejecting-mails-forwarded-from-my-postfix-server">Serverfault<&#47;a> answer.<&#47;p></p>
<p>Well, it seems that its nowadays finally necessary, to have DKIM, SPF and other fancy stuff alive to just send emails from you goddamned own server. I run Ubuntu 14.04 with Plesk and found <a href="http:&#47;&#47;blog.matoski.com&#47;articles&#47;spf-dk-dkim-plesk-debian&#47;">this<&#47;a> and <a href="https:&#47;&#47;www.exratione.com&#47;2014&#47;07&#47;setting-up-spf-and-dkim-for-an-ubuntu-1404-mail-server&#47;">this<&#47;a> easy going tutorials. Well, I made some bad experience with MTAs and the other parts of the mail chain. So I really guess it won't be easy. And maybe it wouldn't be the final step but an ongoing process of an never ending arms race.<&#47;p></p>
<h2>So is there a plan B?<&#47;h2></p>
<p>After a little bit of chat (well, mostly complaining) @MorrisJbk told me about <a href="https:&#47;&#47;wiki.archlinux.org&#47;index.php&#47;Msmtp">msmtp<&#47;a>. With this tiny little tool an external provider could be used as the system MTA. Its transparent and also PHP could use it. That's it!<&#47;p></p>
<p>Here is what I did to ship it.<&#47;p></p>
<h2>Installing Msmtp and inital configuration<&#47;h2></p>
<p>I followed the <a href="https:&#47;&#47;wiki.archlinux.org&#47;index.php&#47;Msmtp">Archlinux msmtp Guide<&#47;a><&#47;p></p>
<pre><code>apt-get install msmtp<br />
<&#47;code><&#47;pre></p>
<p>Create a separate Google Account. You probably don't want to use your main private account when your server went to a zombie spammer robot.<&#47;p></p>
<p>Configure the new credentials in <code>&#47;etc&#47;msmtp<&#47;code><&#47;p></p>
<pre><code># Defauls for all accounts<br />
defaults<br />
auth           on<br />
tls            on<br />
tls_trust_file &#47;etc&#47;ssl&#47;certs&#47;ca-certificates.crt<br />
logfile        &#47;var&#47;log&#47;mail.msmtp.log</p>
<p># Gmail<br />
account        gmail<br />
host           smtp.gmail.com<br />
port           587<br />
from           your.mailer@gmail.com<br />
user           your.mailer<br />
password       [secret but plain!]</p>
<p># Set a default account<br />
account default : gmail<br />
<&#47;code><&#47;pre></p>
<p>It's also possible to use GPG instead of the plain password. Have a look at the Guide for that.<&#47;p></p>
<p>Next: Activate "Allow access from less secure apps" in <a href="https:&#47;&#47;www.google.com&#47;settings&#47;security&#47;lesssecureapps">Google's Security Settings<&#47;a>.<&#47;p></p>
<p>Add this to your <code>&#47;etc&#47;mail.rc<&#47;code> to have a transparent sendmail integration for CLI.<&#47;p></p>
<pre><code>set sendmail=&#47;usr&#47;bin&#47;msmtp<br />
<&#47;code><&#47;pre></p>
<p>Now you can try sending a test email via command line:<&#47;p></p>
<pre><code>mail -s "test subject" your@email.tld <<< "test message"<br />
<&#47;code><&#47;pre></p>
<h2>Enable MSMTP for PHP<&#47;h2></p>
<p>I found <a href="https:&#47;&#47;www.digitalocean.com&#47;community&#47;tutorials&#47;how-to-use-gmail-or-yahoo-with-php-mail-function">this tutorial<&#47;a> which describes it in detail.<&#47;p></p>
<p>First duplicate the msmtp config with Apache access right<&#47;p></p>
<pre><code>cp &#47;etc&#47;msmtp &#47;etc&#47;msmtp_php<br />
chown www-data:www-data &#47;etc&#47;msmtp_php<br />
chmod 600 &#47;etc&#47;msmtp_php<br />
<&#47;code><&#47;pre></p>
<p>Then start a separate logfile with appropriate Apache rights.<&#47;p></p>
<pre><code>touch &#47;var&#47;log&#47;mail.msmtp_php.log<br />
chown www-data:www-data &#47;var&#47;log&#47;mail.msmtp_php.log<br />
<&#47;code><&#47;pre></p>
<p>Then activate it in <code>php.ini<&#47;code>:<&#47;p></p>
<pre><code>sendmail_path = "&#47;usr&#47;bin&#47;msmtp -C &#47;etc&#47;msmtp_php --logfile &#47;var&#47;log&#47;mail.msmtp_php.log -a gmail -t"<br />
<&#47;code><&#47;pre></p>
<p>Finally restart your Apache.<&#47;p></p>
<p>Voil&aacute;! There u go!<&#47;p></p>
<p>Why I write this post? First because I can. Second because I hate people who make other people more work than necessary!<&#47;p></p>
