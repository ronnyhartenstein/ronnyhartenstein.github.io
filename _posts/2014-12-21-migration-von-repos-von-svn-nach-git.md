---
layout: post
status: publish
published: true
title: Migration von Repos von SVN nach GIT
author:
  display_name: ''
  login: ''
  email: ''
  url: ''

wordpress_id: 530
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=530
date: '2014-12-21 00:23:59 +0100'
date_gmt: '2014-12-20 22:23:59 +0100'
categories:
- DevOp
- Git
tags: []
---
<p>Nachdem nun GitLab funktioniert muss der Git-Server gefüllt werden. Dazu gibts die fantastische GIT-SVN-Bridge. Aber bevor es richtig los geht, sollte bisschen <a href="http://git-scm.com/book/zh/v2/Git-and-Other-Systems-Git-as-a-Client">Vorgeplänkel</a> gelesen werden. Dann gehts ans <a href="http://git-scm.com/book/zh/v2/Git-and-Other-Systems-Migrating-to-Git">Eingemachte</a>..</p>

<!--more-->

<h2>Migrations-Tool git-svn installieren</h2>
<p>Install git-svn auf Mac Ports</p>
<p><code class=" language-markup">sudo port install git +svn</code></p>
<p>Install auf Ubuntu 10.04</p>
<p><code class=" language-markup">sudo apt-get install git-svn</code></p>
<h2>Arbeitsliste erstellen</h2>
<p><a href="//stackoverflow.com/questions/1693638/how-to-display-list-of-repositories-from-subversion-server">Liste aller SVN-Repos</a></p>
<p><code class=" language-markup">svn list -v <a class="token url-link" href="svn://localhost/">svn://localhost/</a></code></p>
<p>Liste aller Branches eines Repos</p>
<p><code class=" language-markup">svn list -v <a class="token url-link" href="svn://localhost/Projektname">svn://localhost/Projektname</a></code></p>
<p>zeigt branches, trunk etc…</p>
<p><code class=" language-markup">svn list -v <a class="token url-link" href="svn://localhost/Projektname/trunk">svn://localhost/Projektname/trunk</a></code></p>
<p>zeigt Dateien im trunk</p>
<h2>Migration selbst</h2>
<p>Nun gehts immer schön der <a href="http://git-scm.com/book/zh/v2/Git-and-Other-Systems-Migrating-to-Git">offiziellen Anleitung</a> entlang.</p>
<p>Zunächst das vorhandene SVN Repo ins Git clonen und auschecken</p>
<p><code class=" language-markup">git svn clone <a class="token url-link" href="svn://localhost/Projektname">svn://localhost/Projektname</a> -T trunk -b branches -t tags</code></p>
<p>Dann prüfen ob die Branches ordnungsgemäß angelegt wurden</p>
<p><code class=" language-markup">git branch -a</code></p>
<p>Dann die Branches korrigieren. also remotes/origin/trunk zu /origin/trunk (oder besser master)</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">cp -Rf .git/refs/remotes/* .git/refs/heads/
rm -Rf .git/refs/remotes</code></pre>
<p>bzw. wenn die Branches <code>remotes/origin/*</code> lauten..</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">cp -Rf .git/refs/remotes/origin/* .git/refs/heads/
rm -Rf .git/refs/remotes/origin</code></pre>
<p>Dann im GitLab ein neues Projekt und ggf. Gruppe anlegen. Vermutlich muss dann noch einmalig überhaupt der SSH-Key hinzugefügt werden. Also</p>
<p><code class=" language-markup">ssh-keygen -t rsa -C "[deine email]"</code></p>
<p>und den Inhalt von <code>~/.ssh/.id_rsa.pub</code> im eigenen GitLab eintragen https://gitlab.domain.tld/profile/keys/</p>
<p>Dann das Projekt im lokal ausgecheckten Verzeichnis anmelden</p>
<p><code class=" language-markup">git remote add origin <a class="token email-link" href="mailto:git@scm.domain.tld">git@scm.domain.tld</a>:Projektname/projektname.git</code></p>
<p>Und nun der finale Push von allen Branches</p>
<p><code class=" language-markup">git push origin --all</code></p>
<p>Falls Fehler gemeldet werden, dass im Branch remote noch neuere Änderungen vorhanden sind, weil das Repo schon erstellt war o.ä., dann</p>
<p><code class=" language-markup">git merge origin/master</code></p>
<p>und anschließend der push</p>
<h2>Migration hornalter CVS-Repos</h2>
<p>Zunächst muss das CVSROOT-Verzeichnis festgelegt werden, sofern nicht geschehen</p>
<p><code class=" language-markup">export CVSROOT=/CVSROOT</code></p>
<p>Dann der Migrationsbefehl:</p>
<p><code class=" language-markup">git cvsimport -a -p x -v -C projektname Projektname</code></p>
<p>projektname = Verzeichnis mit neuem lokalem git-Repo<br>
Projektname = CVS-Modulname</p>
<p>Falls Fehler „.. unexpected ‚\x0‘ reading revision number in RCS ..“ auftritt, hilft <code>tr -d ''</code>, also wenn z.B. <code>CVSROOT/meinprojekt/datei.txt,v</code> kaputt ist, dann</p>
<pre class=" prettyprint prettyprinted language-markup" style=""><code class=" language-markup">tr -d '\0' &lt; CVSROOT/meinprojekt/datei.txt,v &gt; CVSROOT/meinprojekt/datei.txt,v</code></pre>
<p>Das GIT-Projekt anmelden</p>
<p><code class=" language-markup">git remote add origin <a class="token email-link" href="mailto:git@gitlab.domain.tld">git@gitlab.domain.tld</a>:dein/projekt.git</code></p>
<p>Schauen welche Braches aktiv sind – dürfte master &amp; origin sein.</p>
<p><code class=" language-markup">git branch -a</code></p>
<p>Und ins Remote-Git pushen</p>
<p><code class=" language-markup">git push origin -a</code></p>
<h2>Fazit</h2>
<p>Nach 3 Tagen Arbeit sind 21 Repositories umgezogen, wobei manche aus CVS-Altbeständen stammen und einige noch gar nicht verwaltet waren. Na ich will mal nicht mit informationslosen Zeuch langweilen. Bleibt festzustellen: die Arbeit hat sich gelohnt und GIT ist ein zuverlässiges, wenn auch anfangs nicht leicht verständlich ob der Vielfalt der Möglichkeiten und des verteilten Workflows.</p>
