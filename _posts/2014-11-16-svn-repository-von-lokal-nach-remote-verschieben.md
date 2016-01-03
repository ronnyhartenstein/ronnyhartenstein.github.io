---
layout: post
status: publish
published: true
title: SVN Repository von Lokal nach Remote verschieben
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: "<p>So ein lokales SVN-Repository kann man sicher leicht auf einen Remote-Server
  verschieben, sollte man denken. Geht so, vor allem wenn man lokal nur EIN Repo hat
  mit Projekt-Unterverzeichnissen, und Remote dann (gl&uuml;cklicherweise) je Projekt
  ein Repo erstellt hat. Nun ja .. so gehts. "
wordpress_id: 468
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=468
date: '2014-11-16 16:00:23 +0100'
date_gmt: '2014-11-16 14:00:23 +0100'
categories:
- DevOp
tags: []
---
<p>So ein lokales SVN-Repository kann man sicher leicht auf einen Remote-Server verschieben, sollte man denken. Geht so, vor allem wenn man lokal nur EIN Repo hat mit Projekt-Unterverzeichnissen, und Remote dann (gl&uuml;cklicherweise) je Projekt ein Repo erstellt hat. Nun ja .. so gehts. <a id="more"></a><a id="more-468"></a><&#47;p></p>
<h2>Lokale Arbeiten<&#47;h2></p>
<p>Lokales Repo: <code>&#47;SVNROOT<&#47;code><br />
Projektpfad im SVN: <code>&#47;CrmZeiterfassung<&#47;code> (gibt es so nicht unterhalb SVNROOT)<br />
ggf. lokale &Auml;nderungen einchecken!<&#47;p></p>
<p>[code language="bash"]<br />
svnadmin dump &#47;SVNROOT > svnroot.svn_dump<br />
svndumpfilter include CrmZeiterfassung < svnroot.svn_dump > zeiterfassung.svn_dump<br />
[&#47;code]<&#47;p></p>
<h2>Remote Arbeiten<&#47;h2></p>
<p>[code language="bash"]<br />
svnadmin create &#47;SVNROOT&#47;zeiterfassung&#47;<br />
svnadmin load &#47;SVNROOT&#47;zeiterfassung >&#47;var&#47;www&#47;vhosts&#47;test.rh-flow.de&#47;zeiterfassung.svn_dump<br />
[&#47;code]<&#47;p></p>
<p>Da ich mit root importiert habe, werden nun noch paar Rechte gefixt:<&#47;p></p>
<p>[code language="bash"]<br />
chown -R www-data.subversion zeiterfassung&#47;<br />
chmod -R g+w zeiterfassung&#47;<br />
[&#47;code]<&#47;p></p>
<p>Ist nicht die feine englische Art, aber ist bei den anderen Repos auch so, und da wei&szlig; ich nicht mehr wie ich die angelegt und importiert habe.<&#47;p></p>
<h2>Checkout<&#47;h2></p>
<p>[code language="bash"]<br />
cd &#47;var&#47;www&#47;vhosts&#47;zeiterfassung<br />
svn co &#47;SVNROOT&#47;zeiterfassung<br />
[&#47;code]<&#47;p></p>
<p>oder halt per SSH von Remote Server:<&#47;p></p>
<p>[code language="bash"]<br />
svn co svn+ssh:&#47;&#47;username@andererrechner.tld&#47;SVNROOT&#47;zeiterfassung<br />
[&#47;code]<&#47;p></p>
<p>Die Verzeichnisstruktur wird jetzt <code>zeiterfassung&#47;CrmZeiterfassung&#47;branches<&#47;code> o.&auml;. sein, also eine doppelte Struktur. Per <code>svn move<&#47;code> und <code>svn delete<&#47;code> und anschlie&szlig;endes <code>svn commit<&#47;code> bekommt man das aber hin. Bei mir ist nun aus <code>zeiterfassung&#47;CrmZeiterfassung&#47;branches&#47;prod<&#47;code> einfach <code>zeiterfassung&#47;trunk<&#47;code> geworden.<&#47;p></p>
<p><i>F&uuml;r Tipps wie es besser geht, gerade die Rechte-Sache, gerne per Twitter <a href="&#47;&#47;twitter.com&#47;rhflow_de" target="_new">@rhflow_de<&#47;a> oder hier als Kommentar.<&#47;i><&#47;p></p>
<h3>Quellen:<&#47;h3></p>
<p><a href="http:&#47;&#47;www.petefreitag.com&#47;item&#47;665.cfm">Pete Freitag: Moving a Subversion Repository to Another Server<&#47;a><br />
<a href="http:&#47;&#47;svnbook.red-bean.com&#47;en&#47;1.5&#47;svn.reposadmin.maint.html#svn.reposadmin.maint.filtering">Repository Maintenance: Dump &amp; Filtering<&#47;a><br />
<a href="http:&#47;&#47;www.cs.columbia.edu&#47;~crf&#47;crf-guide&#47;resources&#47;software&#47;svn-ssh.html">SVN over ssh HOWTO<&#47;a><&#47;p></p>
