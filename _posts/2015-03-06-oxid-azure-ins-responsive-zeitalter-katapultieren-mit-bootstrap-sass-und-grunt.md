---
layout: post
status: publish
published: true
title: 'OXID Azure ins Responsive Zeitalter katapultieren: mit Bootstrap + SASS und
  Grunt'
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: |+
  Viele OXID eShops laufen mit auf Azure basierenden Templates. Dieses ist nicht responsive und sieht auf Smartphones nicht gut aus. Dieser Artikel erkl&auml;rt wie das CSS-Grid der Seite auf Bootstrap umgestellt werden kann, sowie gibt Tipps und Ausblicke f&uuml;r die Entwickler-TODOs. Der hier vorgestellte Grunt+Bower-Workflow wird durch Sass erweitert zu einem modernen CSS-Workflow und bildet die Grundlage f&uuml;r die genannten Anpassungen.

wordpress_id: 626
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=626
date: '2015-03-06 23:12:46 +0100'
date_gmt: '2015-03-06 21:12:46 +0100'
categories:
- OXID
- PHP
- Grunt
- Bower
- Sass
tags: []
---
<p>Viele OXID eShops laufen mit auf Azure basierenden Templates. Dieses ist nicht responsive und sieht auf Smartphones nicht gut aus. Dieser Artikel erkl&auml;rt wie das CSS-Grid der Seite auf <a href="http:&#47;&#47;getbootstrap.com&#47;">Bootstrap<&#47;a> umgestellt werden kann, sowie gibt Tipps und Ausblicke f&uuml;r die Entwickler-TODOs. Der <a href="http:&#47;&#47;blog.rh-flow.de&#47;2015&#47;03&#47;03&#47;oxid-shop-module-per-bower-und-grunt-aktuell-automatisch-halten&#47;">hier<&#47;a> vorgestellte Grunt+Bower-Workflow wird durch <a href="http:&#47;&#47;sass-lang.com&#47;">Sass<&#47;a> erweitert zu einem modernen CSS-Workflow und bildet die Grundlage f&uuml;r die genannten Anpassungen.<&#47;p></p>
<p><a id="more"></a><a id="more-626"></a></p>
<h2>Vorgeschichte<&#47;h2></p>
<p>Da ist er also, der tolle OXID Shop in der CE-Edition, der jahrelang schon treu seinen Dienst verrichtet. Das Theme basiert auf Azure und biegt dieses an verschiedenen Stellen etwas zurecht. Leider ist Azure nicht responsive, weder progressive enhanced, noch mobile first oder sonstwas. OXID eShop CE bietet bringt von Haus aus ein <a href="https:&#47;&#47;exchange.oxid-esales.com&#47;Shopping-experience&#47;Mobile&#47;OXID-eShop-mobile-theme-1-3-0-for-5-2-0-Stable-EE-PE-4-7-x-5-2-x.html">Mobile Theme<&#47;a> an.<&#47;p></p>
<p>Ich bin ehrlich, mir gef&auml;llt das Mobile Theme nicht. Auch m&uuml;sste ich ja auch in diesen Mobile Theme die paar Sonderlocken einbauen die es nunmal in einen leicht angepassten Shop so gibt. Doppelpflege, Device-Weiche, Nein danke!<&#47;p></p>
<p>In 2015 ist schon l&auml;nger <strong>Responsive Webdesign<&#47;strong> Trend. Wobei man von Trend nicht mehr sprechen kann. Google hat unl&auml;ngst Warnungen herumgeschickt an Betreiber von Nicht-Smartphone-kompatiblen Webseiten. Man m&uuml;sste sich darauf einstellen, demn&auml;chst im Suchindex (auf Handys) kaum bis gar nicht mehr wiederzufinden. Nett formuliert hei&szlig;t das <em>"Beheben Sie Probleme der mobilen Nutzerfreundlichkeit"<&#47;em>.<&#47;p></p>
<p><img src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;03&#47;google_probleme_mobile_nutzerfreundlichkeit.png" alt="Google Mail Beispiel" &#47;><&#47;p></p>
<p><strong>Zeit aktiv zu werden!<&#47;strong><&#47;p></p>
<h2>Screenshots zum Warmwerden<&#47;h2></p>
<p><strong>Flechtie vorher:<&#47;strong> <a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;03&#47;flechtie_alt.png"><img src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;03&#47;flechtie_alt-1024x690.png" alt="flechtie_alt" width="820" height="553" class="alignnone size-large wp-image-656" &#47;><&#47;a><&#47;p></p>
<p><strong>Flechtie nachher:<&#47;strong><&#47;p></p>
<p>Desktop <a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;03&#47;flechtie_neu_desktop.png"><img src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;03&#47;flechtie_neu_desktop-1024x631.png" alt="flechtie_neu_desktop" width="820" height="505" class="alignnone size-large wp-image-657" &#47;><&#47;a><&#47;p></p>
<p>Smartphone <a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;03&#47;flechtie_neu_smartphone.png"><img src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;03&#47;flechtie_neu_smartphone-133x300.png" alt="flechtie_neu_smartphone" width="133" height="300" class="alignnone size-medium wp-image-658" &#47;><&#47;a><&#47;p></p>
<h2>Build Workflow in a nutshell<&#47;h2></p>
<p><a href="http:&#47;&#47;bower.io&#47;"><strong>Bower<&#47;strong><&#47;a> besorgt alle im Frontend ben&ouml;tigen Komponenten: Bootstrap, JS-Libs, OXID-Module<br &#47;><br />
<a href="http:&#47;&#47;gruntjs.com&#47;"><strong>Grunt<&#47;strong><&#47;a> kopiert OXID Azure CSS als SCSS in unser eigenes Theme-Verzeichnis<br &#47;><br />
<a href="http:&#47;&#47;sass-lang.com&#47;"><strong>Sass<&#47;strong><&#47;a> baut alle in SCSS programmierten Styles zu <strong>einer<&#47;strong> CSS zusammen, inkl. adaptierter Bootstrap-Komponenten und Azure-Style<&#47;p></p>
<h2>Node.js und Bower Pakete<&#47;h2></p>
<p>Die ben&ouml;tigen Node.JS Module werden in der <code>.&#47;package.json<&#47;code> konfiguriert:<&#47;p></p>
<pre>[gist id=1dae4330ae3bc1c237ae]<&#47;pre></p>
<p><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;1dae4330ae3bc1c237ae">(Gist)<&#47;a><&#47;p></p>
<p>Die Bower-Komponenten in der <code>.&#47;bower.json<&#47;code>:<&#47;p></p>
<pre>[gist id=ebf6b1b7d27a8b883161]<&#47;pre></p>
<p><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;ebf6b1b7d27a8b883161">(Gist)<&#47;a><&#47;p></p>
<p>Und Install ..<&#47;p></p>
<pre><code>npm install -g bower<br />
npm install -g grunt-cli<br />
npm install<br />
<&#47;code><&#47;pre></p>
<h2>Grunt Module<&#47;h2></p>
<p>Insofern noch nie mit Grunt gearbeitet sei die <a href="http:&#47;&#47;gruntjs.com&#47;getting-started"><strong>Getting Started<&#47;strong><&#47;a> empfohlen. Grundlegend wird das <a href="http:&#47;&#47;blog.rh-flow.de&#47;2015&#47;03&#47;03&#47;oxid-shop-module-per-bower-und-grunt-aktuell-automatisch-halten&#47;">hier<&#47;a> beschriebene Setup erweitert.<&#47;p></p>
<h3>Initfile <code>Gruntfile.js<&#47;code><&#47;h3></p>
<p>Initial sucht sich Grunt die <code>Gruntfile.js<&#47;code>, wobei mittels des Moduls <code>load-grunt-config<&#47;code> bequem die Modulkonfigs in einzelne <code>.js<&#47;code>-Dateien im Unterverzeichnis <code>.&#47;grunt&#47;<&#47;code>.<&#47;p></p>
<p><code>.&#47;Gruntfile.js<&#47;code><&#47;p></p>
<pre>[gist id=d62f92fb1da1ec732566]<&#47;pre></p>
<p><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;d62f92fb1da1ec732566">(Gist)<&#47;a><&#47;p></p>
<h3>Task-Liste <code>aliases.yaml<&#47;code><&#47;h3></p>
<p>Darin werden alle Grunt-Tasks definiert. Sp&auml;ter gen&uuml;gt z.B. <code>grunt css<&#47;code> und es werden alle CSS gebaut. Sollen die Bower-Komponenten aktualisiert werden? <code>grunt update_components<&#47;code> und fertig.<&#47;p></p>
<p><code>.&#47;grunt&#47;aliases.yaml<&#47;code><&#47;p></p>
<pre>[gist id=c521d892dcaa207edd6e]<&#47;pre></p>
<p><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;c521d892dcaa207edd6e">(Gist)<&#47;a><&#47;p></p>
<h3>Bower: JS-Komponenten einbinden mit <a href="https:&#47;&#47;www.npmjs.com&#47;package&#47;grunt-bower-concat"><code>grunt-bower-concat<&#47;code><&#47;a><&#47;h3></p>
<p>Kopiert die n&ouml;tigen JS-Libs, welche als Bower-Komponenten vorliegen, zusammengefasst ins Theme-<code>src<&#47;code>-Verzeichnis. In <code>layout&#47;base.tpl<&#47;code> wird diese dann eingebunden. Vorteil vom Zusammenfassen ist, dass nur noch ein Request statt zig n&ouml;tig sind.<&#47;p></p>
<p><code>.&#47;grunt&#47;bower_concat.js<&#47;code><&#47;p></p>
<pre>[gist id=ba460dada2b16d812924]<&#47;pre></p>
<p><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;ba460dada2b16d812924">(Gist)<&#47;a><&#47;p></p>
<h3>Dateien kopieren mit <a href="https:&#47;&#47;github.com&#47;gruntjs&#47;grunt-contrib-copy"><code>grunt-contrib-copy<&#47;code><&#47;a><&#47;h3></p>
<p>Kopiert die Azure CSS als SCSS ins eigene Theme-Verzeichnis. Kopiert die Fontawesome-Schriften ins Theme-<code>src<&#47;code>-Verzeichnis f&uuml;r einfachen Include in <code>layout&#47;base.tpl<&#47;code>. Damit ist die Grundlage f&uuml;r die Sass-Integration gelegt.<&#47;p></p>
<p>Weiterhin werden die OXID-Module wie bereits <a href="http:&#47;&#47;blog.rh-flow.de&#47;2015&#47;03&#47;03&#47;oxid-shop-module-per-bower-und-grunt-aktuell-automatisch-halten&#47;">hier<&#47;a> beschrieben ins Module-Verzeichnis kopiert.<&#47;p></p>
<p><code>.&#47;grunt&#47;copy.js<&#47;code><&#47;p></p>
<pre>[gist id=c46723fe0556397c8922]<&#47;pre></p>
<p><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;c46723fe0556397c8922">(Gist)<&#47;a><&#47;p></p>
<h3>CSS zusammendampfen mit <a href="https:&#47;&#47;www.npmjs.com&#47;package&#47;grunt-csswring"><code>grunt-csswring<&#47;code><&#47;a><&#47;h3></p>
<p>CSSwring entfernt Kommentare und Zeilenumbr&uuml;che, sodass am Ende ein einzeiliges CSS &uuml;brig bleibt. Wenn das der Webserver noch gzipped ausliefert ist die Optimierung perfekt. Zumindest technisch. Fachlich geht sicher noch so einiges ;)<&#47;p></p>
<p><code>.&#47;grunt&#47;csswring.js<&#47;code><&#47;p></p>
<pre>[gist id=7d592e9174a5ed412e15]<&#47;pre></p>
<p><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;7d592e9174a5ed412e15">(Gist)<&#47;a><&#47;p></p>
<h3>Bower-Komponenten aktualisieren mit <a href="https:&#47;&#47;github.com&#47;jharding&#47;grunt-exec"><code>grunt-exec<&#47;code><&#47;a><&#47;h3></p>
<p>Um die Bower-Aktualisierung anzustarten wird einfach <code>bower update<&#47;code> ausgef&uuml;hrt.<&#47;p></p>
<p><code>.&#47;grunt&#47;exec.js<&#47;code><&#47;p></p>
<pre>[gist id=b2173b5832aa645cbca8]<&#47;pre></p>
<p><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;b2173b5832aa645cbca8">(Gist)<&#47;a><&#47;p></p>
<h3>Sass starten und CSS generieren mit <a href="https:&#47;&#47;github.com&#47;gruntjs&#47;grunt-contrib-sass"><code>grunt-contrib-sass<&#47;code><&#47;a><&#47;h3></p>
<p>Die Generierung unseres Theme-CSS wird mittels Sass durchgef&uuml;hrt. Da Sass selbst in Ruby geschrieben ist, also kein natives Node.JS-Modul verf&uuml;gbar ist, ruft das Modul <code>sass<&#47;code> mit entsprechenden Parametern auf.<&#47;p></p>
<p><code>.&#47;grunt&#47;sass.js<&#47;code><&#47;p></p>
<pre>[gist id=ddab26eb08cc8577301a]<&#47;pre></p>
<p><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;ddab26eb08cc8577301a">(Gist)<&#47;a><&#47;p></p>
<h3>Kontinuierlicher Sass-Build mit <a href="https:&#47;&#47;github.com&#47;gruntjs&#47;grunt-contrib-watch"><code>grunt-contrib-watch<&#47;code><&#47;a><&#47;h3></p>
<p>Sobald mal in der IDE &#47; im Editor speichert, m&ouml;chte man nat&uuml;rlich dass das CSS neu gebaut wird, sodass man anschlie&szlig;end die &Auml;nderung sofort im Browser sieht. Durch die Trennung in <code>aliases.yaml<&#47;code> nach <code>css<&#47;code> f&uuml;r alle CSS und <code>css_sass<&#47;code> f&uuml;r das Theme-SCSS ist es m&ouml;glich, gezielt nur das eigene Theme-Style neuzubauen.<&#47;p></p>
<p><code>.&#47;grunt&#47;watch.js<&#47;code><&#47;p></p>
<pre>[gist id=aa7ffb3b3a1bbf690864]<&#47;pre></p>
<p><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;aa7ffb3b3a1bbf690864">(Gist)<&#47;a><&#47;p></p>
<h2>Generierte Komponenten in <code>layout&#47;base.tpl<&#47;code> einbinden<&#47;h2></p>
<p>In das im eigenen Theme-Verzeichnis liegende <code>base.tpl<&#47;code> werden die kombinierten CSS und JS nun eingebunden.<&#47;p></p>
<p><strong>Vorher:<&#47;strong> (bei mir, kein Azure-Standard!)<&#47;p></p>
<pre><code>[{block name="base_style"}]<br />
    [{oxstyle include="css&#47;reset.css"}]<br />
    [{oxstyle include="css&#47;oxid.css"}]<br />
    [{oxstyle include="css&#47;ie7.css" if="IE 7"}]<br />
    [{oxstyle include="css&#47;ie8.css" if="IE 8"}]<br />
    [{oxstyle include="css&#47;libs&#47;jscrollpane.css"}]<br />
[{&#47;block}]<br />
...<br />
[{oxstyle include="css&#47;flechtie.css"}]<br />
...<br />
[{oxscript include="js&#47;libs&#47;jquery.min.js" priority=1*}]<br />
[{oxscript include="js&#47;libs&#47;jquery-ui.min.js" priority=1*}]<br />
[{oxscript include="js&#47;libs&#47;cookie&#47;jquery.cookie.js" priority=2}]<br />
...<br />
[{block name="base_js"}]<br />
    [{oxscript include="js&#47;libs&#47;es5-shim.min.js" priority=1}]<br />
    [{oxscript include="js&#47;libs&#47;featuredetection.js"}]<br />
    [{oxscript include='js&#47;libs&#47;superfish&#47;hoverIntent.js'}]<br />
    [{oxscript include='js&#47;libs&#47;superfish&#47;supersubs.js'}]<br />
    [{oxscript include='js&#47;libs&#47;superfish&#47;superfish.js'}]<br />
[{&#47;block}]<br />
<&#47;code><&#47;pre></p>
<p><strong>Nachher:<&#47;strong><&#47;p></p>
<pre><code>[{oxstyle include="css&#47;vendor.css"}]<br />
[{oxstyle include="css&#47;meinshop.css"}]<br />
...<br />
[{oxscript include="js&#47;vendor-libs.min.js" priority=1}]<br />
<&#47;code><&#47;pre></p>
<p>Gut, die IE7+8 Hacks sind auch gleich &uuml;ber Bord geflogen, aber prinzipiell sollte die Entschlackung erkennbar sein. Das wichtigste ist mir aber, dass ich nicht mehr Azure <code>reset.css<&#47;code> und <code>oxid.css<&#47;code> <strong>vor<&#47;strong> den eigenen Theme-Styles einbinden muss, sondern dass es nur noch genau <strong>ein<&#47;strong> Customize-CSS gibt und ein geb&uuml;ndeltes Drittanbieter-CSS. Bei <strong>voller Update-F&auml;higkeit zum Azure-CSS<&#47;strong>.<&#47;p></p>
<h2>Bootstrap Grid einbinden<&#47;h2></p>
<p>Sp&auml;testens jetzt sollte man sich erstmal mit den Komponenten des Bootstrap-Frameworks vertraut machen. Dazu sollte man am besten <a href="http:&#47;&#47;getbootstrap.com&#47;getting-started&#47;"><strong>Getting Started<&#47;strong><&#47;a>, <a href="http:&#47;&#47;getbootstrap.com&#47;css&#47;"><strong>CSS<&#47;strong><&#47;a> (vor allem Grid, Forms, Buttons, Responsive Utilities) und <a href="http:&#47;&#47;getbootstrap.com&#47;components&#47;"><strong>Components<&#47;strong><&#47;a> (vor allem Navs, Badges, Jumbotrons, Wells) mindestens querlesen um die Begrifflichkeiten und Konzepte zu kennen.<&#47;p></p>
<p>Prinzipiell sind die Bootstrap-CSS-Klassen und JS nun vorhanden. Um das Grundlayout auf das <a href="http:&#47;&#47;getbootstrap.com&#47;css&#47;#grid">Bootstrap-Grid<&#47;a> umzustellen, muss das Azure-Grundlayout auf die CSS-Klassen <code>container<&#47;code>, <code>row<&#47;code> und <code>col-*-*<&#47;code> umgestellt werden Dazu sind die Templates in <code>layout&#47;<&#47;code> komplett anzupassen. Hier die Gists am Beispiel von <a href="http:&#47;&#47;test.flechtie.de">Flechtie<&#47;a>:<&#47;p></p>
<ul>
<li><code>layout&#47;header.tpl<&#47;code>: Kopfbereich, Login, Kategorieliste &#47; Men&uuml; <a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;f490444b562dab19edca">(Gist)<&#47;a><&#47;li>
<li><code>layout&#47;footer.tpl<&#47;code>: Service-Links, Impressum, Seitenabschluss <a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;d085ccdbc2d54169290a">(Gist)<&#47;a><&#47;li>
<li><code>layout&#47;page.tpl<&#47;code>: Seiten-Grundlayout mit Sidebar-Ausrichtung <a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;a9581017121f88389612">(Gist)<&#47;a><&#47;li>
<li><code>widget&#47;sidebar&#47;categorytree.tpl<&#47;code>: Kategorieliste in Artikelliste (u.a.) <a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;0e344335a332e135e966">(Gist)<&#47;a><&#47;li><br />
<&#47;ul></p>
<p>Damit ist der Grundstein f&uuml;r weitere Anpassungen gelegt.<&#47;p></p>
<h2>Sass <code>meinshop.scss<&#47;code><&#47;h2></p>
<p>Die zentrale Theme-SASS-Datei <code>out&#47;meinshop&#47;src&#47;css&#47;meinshop.scss<&#47;code> wird in einzelne Sass-Include-Dateien aufgegliedert, die g&uuml;nstigerweise mit der Tpl-Struktur korrelieren. Ein mittelschwer angepasster Shop schaut also z.B. so aus:<&#47;p></p>
<pre>[gist id=40df7c5612a787588a3a]<&#47;pre></p>
<p><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;40df7c5612a787588a3a">(Gist)<&#47;a><&#47;p></p>
<p>Am Anfang werden die Azure-CSS eingebunden (die ja mittels Grunt als SCSS vorliegen). Dann werden alle in den SCSS-Modulen angesprochenen Bootstrap-Module inkludiert. Kommt was neues hinzu muss man hier ggf. noch nachsteuern.<&#47;p></p>
<p><strong>Halt moment,<&#47;strong> Boostrap wird doch schon in der <code>css&#47;vendor.css<&#47;code> eingebunden, die durch Grund <code>csswring:vendor<&#47;code> erstellt wird? Ja, sicher, hier wird es ein wenig kritisch. Prinzipiell m&uuml;sste man alle CSS aus der <code>vendor.css<&#47;code> gleich mit in die <code>meinshop.scss<&#47;code> aufnehmen und nur noch eine einzige <code>meinshop.css<&#47;code> haben. Aber dann dauert der Sass-Build ewig. F&uuml;r das entg&uuml;ltige Deployment-CSS kann man das machen, soll aber hier keine Ber&uuml;cksichtigung finden.<&#47;p></p>
<p><strong>Warum muss Bootstrap &uuml;berhaupt in <code>meinshop.scss<&#47;code> eingebunden werden?<&#47;strong> Ha! Das ist der Trick!<&#47;p></p>
<h3>DER TRICK! OXID-spezifische CSS-Klassen auf Bootstrap-Klassen umbiegen<&#47;h3></p>
<p>Folgendes Beispiel:<&#47;p></p>
<pre><code>.submitButton {<br />
  @extend .btn;<br />
  @extend .btn-primary;<br />
  text-transform: none;<br />
  text-shadow: none;<br />
  height: auto;<br />
}<br />
<&#47;code><&#47;pre></p>
<p>Mittels Sass <code>@extend<&#47;code> wird der OXID-&uuml;bliche Submit-Button auf Bootstrap umgebogen. Sass rechnet die Bootstrap-Klasse .btn mit der Klasse <code>.submitButton<&#47;code> zusammen. Da das ganze nach dem Azure-SCSS ausgef&uuml;hrt wird, &uuml;berschreibt dieses die CSS-Eigenschaften vom Original-<code>submitButton<&#47;code>. Dadurch muss man nicht jedes Template ableiten und <code>submitButton<&#47;code> in <code>btn btn-primary<&#47;code> umbauen.<&#47;p></p>
<p>Ein weiteres Beispiel: Formular-Eingabefelder um <code>form-control<&#47;code> erweitern und so das Bootstrap-Layout f&uuml;r alle <code>.form<&#47;code> Felder ausrollen:<&#47;p></p>
<pre><code>.form {<br />
  input[type=password], input[type=text], select, textarea {<br />
    @extend .form-control;<br />
  }<br />
  ..<br />
}<br />
<&#47;code><&#47;pre></p>
<p>Und der oft verwendete <code>.largeButton<&#47;code>:<&#47;p></p>
<pre><code>.largeButton {<br />
  @extend .btn-lg;<br />
  text-transform: none;<br />
  text-shadow: none;<br />
  height: auto;<br />
}<br />
<&#47;code><&#47;pre></p>
<p>Ein <code>@extend .btn<&#47;code> ist hier nicht n&ouml;tig, da diese Klasse nur zusammen mit <code>.submitButton<&#47;code> verwendet.<&#47;p></p>
<h3>Flei&szlig;arbeit: Anpassung des restlichen Layouts<&#47;h3></p>
<p>Nachdem die Basics nun klar sind - <strong>a)<&#47;strong> Templates ableiten und anpassen und <strong>b)<&#47;strong> Bootstrap-Klassen per SCSS anflanschen - geht die Flei&szlig;arbeit los. Und die h&auml;ngt vom konkreten Layout ab, was der Shop f&auml;hrt. Hier noch ein paar Ausz&uuml;ge aus dem Flechtie-Layout:<&#47;p></p>
<ul>
<li><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;f6b9b371d5e843238999">Formulare responsiv<&#47;a><&#47;li>
<li><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;d774bee8dbac81960322">Checkout responsiv<&#47;a><&#47;li>
<li><a href="https:&#47;&#47;gist.github.com&#47;ronnyhartenstein&#47;e9ad3ff27ea4c95bfd83">Navigation responsiv und angepasst<&#47;a><&#47;li><br />
<&#47;ul></p>
<h2>Fazit<&#47;h2></p>
<p>Einen responsiven OXID eShop bekommt man derzeit nicht geschenkt. Schon gar nicht wenn man es ein wenig individueller haben m&ouml;chte oder &uuml;ber die Jahre entwickelt hat. Aber es gibt Mittel und Wege um bestehende Responsive CSS-Frameworks, wie Bootstrap eins ist, transparent und gezielt einzubauen, ohne alle auf einmal &uuml;ber den Haufen zu werfen. Prinzipiell kann man das Ganze auch auf Basis von <a href="http:&#47;&#47;semantic-ui.com&#47;">Semantic UI<&#47;a> oder <a href="http:&#47;&#47;purecss.io&#47;">Pure CSS<&#47;a> bauen.<&#47;p></p>
<p>Belohnt wird man mit einer auf jahre hin tauglichen CSS-Basis, die noch dazu automatisch mit dem aktuellen Stand des Azure-Templates verschmolzen wird.<&#47;p></p>
<p><em>Mich w&uuml;rde brennend interessieren wie das OXID-Agenturen machen. Vielleicht plaudert mal jemand aus dem N&auml;hk&auml;stchen. Kommentare und Anregungen gerne hier oder via Twitter.<&#47;em> <a href="https:&#47;&#47;twitter.com&#47;rhflow_de">@rhflow_de<&#47;a>.<&#47;p></p>
