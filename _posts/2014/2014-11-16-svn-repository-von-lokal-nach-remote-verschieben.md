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
wordpress_id: 468
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=468
date: '2014-11-16 16:00:23 +0100'
date_gmt: '2014-11-16 14:00:23 +0100'
categories:
- DevOp
tags: []
thumb: /files/2014/11/subversion-apache1.jpg
---
<p>So ein lokales SVN-Repository kann man sicher leicht auf einen Remote-Server verschieben, sollte man denken. Geht so, vor allem wenn man lokal nur EIN Repo hat mit Projekt-Unterverzeichnissen, und Remote dann (glücklicherweise) je Projekt ein Repo erstellt hat. Nun ja .. so gehts.</p>

<!--more-->

<h2>Lokale Arbeiten</h2>
<p>Lokales Repo: <code>/SVNROOT</code><br>
Projektpfad im SVN: <code>/CrmZeiterfassung</code> (gibt es so nicht unterhalb SVNROOT)<br>
ggf. lokale Änderungen einchecken!</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">svnadmin dump /SVNROOT &gt; svnroot.svn_dump
svndumpfilter include CrmZeiterfassung &lt; svnroot.svn_dump &gt; zeiterfassung.svn_dump</code></pre>
<h2>Remote Arbeiten</h2>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">svnadmin create /SVNROOT/zeiterfassung/
svnadmin load /SVNROOT/zeiterfassung &gt;/var/www/vhosts/test.rh-flow.de/zeiterfassung.svn_dump</code></pre>
<p>Da ich mit root importiert habe, werden nun noch paar Rechte gefixt:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">chown -R www-data.subversion zeiterfassung/
chmod -R g+w zeiterfassung/</code></pre>
<p>Ist nicht die feine englische Art, aber ist bei den anderen Repos auch so, und da weiß ich nicht mehr wie ich die angelegt und importiert habe.</p>
<h2>Checkout</h2>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">cd /var/www/vhosts/zeiterfassung
svn co /SVNROOT/zeiterfassung</code></pre>
<p>oder halt per SSH von Remote Server:</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">svn co svn+<a class="token url-link" href="ssh://username">ssh://username</a>@andererrechner.tld/SVNROOT/zeiterfassung</code></pre>
<p>Die Verzeichnisstruktur wird jetzt <code>zeiterfassung/CrmZeiterfassung/branches</code> o.ä. sein, also eine doppelte Struktur. Per <code>svn move</code> und <code>svn delete</code> und anschließendes <code>svn commit</code> bekommt man das aber hin. Bei mir ist nun aus <code>zeiterfassung/CrmZeiterfassung/branches/prod</code> einfach <code>zeiterfassung/trunk</code> geworden.</p>
<p><i>Für Tipps wie es besser geht, gerade die Rechte-Sache, gerne per Twitter <a href="//twitter.com/rhflow_de" target="_new">@rhflow_de</a> oder hier als Kommentar.</i></p>
<h3>Quellen:</h3>
<p><a href="http://www.petefreitag.com/item/665.cfm">Pete Freitag: Moving a Subversion Repository to Another Server</a><br>
<a href="http://svnbook.red-bean.com/en/1.5/svn.reposadmin.maint.html#svn.reposadmin.maint.filtering">Repository Maintenance: Dump &amp; Filtering</a><br>
<a href="http://www.cs.columbia.edu/~crf/crf-guide/resources/software/svn-ssh.html">SVN over ssh HOWTO</a></p>
