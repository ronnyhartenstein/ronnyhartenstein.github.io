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
excerpt: <p>Nachdem nun GitLab funktioniert muss der Git-Server gef&uuml;llt werden.
  Dazu gibts die fantastische GIT-SVN-Bridge. Aber bevor es richtig los geht, sollte
  bisschen <a href="http:&#47;&#47;git-scm.com&#47;book&#47;zh&#47;v2&#47;Git-and-Other-Systems-Git-as-a-Client">Vorgepl&auml;nkel<&#47;a>
  gelesen werden. Dann gehts ans <a href="http:&#47;&#47;git-scm.com&#47;book&#47;zh&#47;v2&#47;Git-and-Other-Systems-Migrating-to-Git">Eingemachte<&#47;a>..
wordpress_id: 530
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=530
date: '2014-12-21 00:23:59 +0100'
date_gmt: '2014-12-20 22:23:59 +0100'
categories:
- DevOp
- Git
tags: []
---
<p>Nachdem nun GitLab funktioniert muss der Git-Server gef&uuml;llt werden. Dazu gibts die fantastische GIT-SVN-Bridge. Aber bevor es richtig los geht, sollte bisschen <a href="http:&#47;&#47;git-scm.com&#47;book&#47;zh&#47;v2&#47;Git-and-Other-Systems-Git-as-a-Client">Vorgepl&auml;nkel<&#47;a> gelesen werden. Dann gehts ans <a href="http:&#47;&#47;git-scm.com&#47;book&#47;zh&#47;v2&#47;Git-and-Other-Systems-Migrating-to-Git">Eingemachte<&#47;a>..<a id="more"></a><a id="more-530"></a><&#47;p></p>
<h2>Migrations-Tool git-svn installieren<&#47;h2></p>
<p>Install git-svn auf Mac Ports<&#47;p></p>
<p>[code lang="bash"]sudo port install git +svn[&#47;code]<&#47;p></p>
<p>Install auf Ubuntu 10.04<&#47;p></p>
<p>[code lang="bash"]sudo apt-get install git-svn[&#47;code]<&#47;p></p>
<h2>Arbeitsliste erstellen<&#47;h2></p>
<p><a href="&#47;&#47;stackoverflow.com&#47;questions&#47;1693638&#47;how-to-display-list-of-repositories-from-subversion-server">Liste aller SVN-Repos<&#47;a><&#47;p></p>
<p>[code language="bash"]svn list -v svn:&#47;&#47;localhost&#47;[&#47;code]<&#47;p></p>
<p>Liste aller Branches eines Repos<&#47;p></p>
<p>[code lang="bash"]svn list -v svn:&#47;&#47;localhost&#47;Projektname[&#47;code]<&#47;p></p>
<p>zeigt branches, trunk etc&hellip;<&#47;p></p>
<p>[code lang="bash"]svn list -v svn:&#47;&#47;localhost&#47;Projektname&#47;trunk[&#47;code]<&#47;p></p>
<p>zeigt Dateien im trunk<&#47;p></p>
<h2>Migration selbst<&#47;h2></p>
<p>Nun gehts immer sch&ouml;n der <a href="http:&#47;&#47;git-scm.com&#47;book&#47;zh&#47;v2&#47;Git-and-Other-Systems-Migrating-to-Git">offiziellen Anleitung<&#47;a> entlang.<&#47;p></p>
<p>Zun&auml;chst das vorhandene SVN Repo ins Git clonen und auschecken<&#47;p></p>
<p>[code lang="bash"]git svn clone svn:&#47;&#47;localhost&#47;Projektname -T trunk -b branches -t tags[&#47;code]<&#47;p></p>
<p>Dann pr&uuml;fen ob die Branches ordnungsgem&auml;&szlig; angelegt wurden<&#47;p></p>
<p>[code lang="bash"]git branch -a[&#47;code]<&#47;p></p>
<p>Dann die Branches korrigieren. also remotes&#47;origin&#47;trunk zu &#47;origin&#47;trunk (oder besser master)<&#47;p></p>
<p>[code lang="bash"]<br />
cp -Rf .git&#47;refs&#47;remotes&#47;* .git&#47;refs&#47;heads&#47;<br />
rm -Rf .git&#47;refs&#47;remotes<br />
[&#47;code]<&#47;p></p>
<p>bzw. wenn die Branches <code>remotes&#47;origin&#47;*<&#47;code> lauten..<&#47;p></p>
<p>[code lang="bash"]<br />
cp -Rf .git&#47;refs&#47;remotes&#47;origin&#47;* .git&#47;refs&#47;heads&#47;<br />
rm -Rf .git&#47;refs&#47;remotes&#47;origin<br />
[&#47;code]<&#47;p></p>
<p>Dann im GitLab ein neues Projekt und ggf. Gruppe anlegen. Vermutlich muss dann noch einmalig &uuml;berhaupt der SSH-Key hinzugef&uuml;gt werden. Also<&#47;p></p>
<p>[code lang="bash"]ssh-keygen -t rsa -C "[deine email]"[&#47;code]<&#47;p></p>
<p>und den Inhalt von <code>~&#47;.ssh&#47;.id_rsa.pub<&#47;code> im eigenen GitLab eintragen https:&#47;&#47;gitlab.domain.tld&#47;profile&#47;keys&#47;<&#47;p></p>
<p>Dann das Projekt im lokal ausgecheckten Verzeichnis anmelden<&#47;p></p>
<p>[code lang="bash"]git remote add origin git@scm.domain.tld:Projektname&#47;projektname.git[&#47;code]<&#47;p></p>
<p>Und nun der finale Push von allen Branches<&#47;p></p>
<p>[code lang="bash"]git push origin --all[&#47;code]<&#47;p></p>
<p>Falls Fehler gemeldet werden, dass im Branch remote noch neuere &Auml;nderungen vorhanden sind, weil das Repo schon erstellt war o.&auml;., dann<&#47;p></p>
<p>[code lang="bash"]git merge origin&#47;master[&#47;code]<&#47;p></p>
<p>und anschlie&szlig;end der push<&#47;p></p>
<h2>Migration hornalter CVS-Repos<&#47;h2></p>
<p>Zun&auml;chst muss das CVSROOT-Verzeichnis festgelegt werden, sofern nicht geschehen<&#47;p></p>
<p>[code lang="bash"]export CVSROOT=&#47;CVSROOT[&#47;code]<&#47;p></p>
<p>Dann der Migrationsbefehl:<&#47;p></p>
<p>[code lang="bash"]git cvsimport -a -p x -v -C projektname Projektname[&#47;code]<&#47;p></p>
<p>projektname = Verzeichnis mit neuem lokalem git-Repo<br />
Projektname = CVS-Modulname<&#47;p></p>
<p>Falls Fehler ".. unexpected '\x0' reading revision number in RCS .." auftritt, hilft <code>tr -d ''<&#47;code>, also wenn z.B. <code>CVSROOT&#47;meinprojekt&#47;datei.txt,v<&#47;code> kaputt ist, dann<&#47;p></p>
<p>[code lang="bash"]<br />
tr -d '&#092;&#048;' < CVSROOT&#47;meinprojekt&#47;datei.txt,v > CVSROOT&#47;meinprojekt&#47;datei.txt,v<br />
[&#47;code]<&#47;p></p>
<p>Das GIT-Projekt anmelden<&#47;p></p>
<p>[code lang="bash"]git remote add origin git@gitlab.domain.tld:dein&#47;projekt.git[&#47;code]<&#47;p></p>
<p>Schauen welche Braches aktiv sind - d&uuml;rfte master &amp; origin sein.<&#47;p></p>
<p>[code lang="bash"]git branch -a[&#47;code]<&#47;p></p>
<p>Und ins Remote-Git pushen<&#47;p></p>
<p>[code lang="bash"]git push origin -a[&#47;code]<&#47;p></p>
<h2>Fazit<&#47;h2></p>
<p>Nach 3 Tagen Arbeit sind 21 Repositories umgezogen, wobei manche aus CVS-Altbest&auml;nden stammen und einige noch gar nicht verwaltet waren. Na ich will mal nicht mit informationslosen Zeuch langweilen. Bleibt festzustellen: die Arbeit hat sich gelohnt und GIT ist ein zuverl&auml;ssiges, wenn auch anfangs nicht leicht verst&auml;ndlich ob der Vielfalt der M&ouml;glichkeiten und des verteilten Workflows.<&#47;p></p>
