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
thumb: /files/2015/03/oxid_responsive-960x360.jpg
---
Viele OXID eShops laufen mit auf Azure basierenden Templates. Dieses ist nicht responsive und sieht auf Smartphones nicht gut aus. Dieser Artikel erklärt wie das CSS-Grid der Seite auf [Bootstrap][1] umgestellt werden kann, sowie gibt Tipps und Ausblicke für die Entwickler-TODOs. Der [hier][2] vorgestellte Grunt+Bower-Workflow wird durch [Sass][3] erweitert zu einem modernen CSS-Workflow und bildet die Grundlage für die genannten Anpassungen.

<!--more-->

## Vorgeschichte

Da ist er also, der tolle OXID Shop in der CE-Edition, der jahrelang schon treu seinen Dienst verrichtet. Das Theme basiert auf Azure und biegt dieses an verschiedenen Stellen etwas zurecht. Leider ist Azure nicht responsive, weder progressive enhanced, noch mobile first oder sonstwas. OXID eShop CE bietet bringt von Haus aus ein [Mobile Theme][4] an.

Ich bin ehrlich, mir gefällt das Mobile Theme nicht. Auch müsste ich ja auch in diesen Mobile Theme die paar Sonderlocken einbauen die es nunmal in einen leicht angepassten Shop so gibt. Doppelpflege, Device-Weiche, Nein danke!

In 2015 ist schon länger **Responsive Webdesign** Trend. Wobei man von Trend nicht mehr sprechen kann. Google hat unlängst Warnungen herumgeschickt an Betreiber von Nicht-Smartphone-kompatiblen Webseiten. Man müsste sich darauf einstellen, demnächst im Suchindex (auf Handys) kaum bis gar nicht mehr wiederzufinden. Nett formuliert heißt das *"Beheben Sie Probleme der mobilen Nutzerfreundlichkeit"*.

![Google Mail Beispiel][5]

**Zeit aktiv zu werden!**

## Screenshots zum Warmwerden

**Flechtie vorher:** [<img src="http://rhflow.wp-root.rh-flow.de/files/2015/03/flechtie_alt-1024x690.png" alt="flechtie_alt" width="820" height="553" class="alignnone size-large wp-image-656" />][6]

**Flechtie nachher:**

Desktop [<img src="http://rhflow.wp-root.rh-flow.de/files/2015/03/flechtie_neu_desktop-1024x631.png" alt="flechtie_neu_desktop" width="820" height="505" class="alignnone size-large wp-image-657" />][7]

Smartphone [<img src="http://rhflow.wp-root.rh-flow.de/files/2015/03/flechtie_neu_smartphone-133x300.png" alt="flechtie_neu_smartphone" width="133" height="300" class="alignnone size-medium wp-image-658" />][8]

## Build Workflow in a nutshell

[**Bower**][9] besorgt alle im Frontend benötigen Komponenten: Bootstrap, JS-Libs, OXID-Module  
[**Grunt**][10] kopiert OXID Azure CSS als SCSS in unser eigenes Theme-Verzeichnis  
[**Sass**][3] baut alle in SCSS programmierten Styles zu **einer** CSS zusammen, inkl. adaptierter Bootstrap-Komponenten und Azure-Style

## Node.js und Bower Pakete

Die benötigen Node.JS Module werden in der `./package.json` konfiguriert:

<script src="https://gist.github.com/ronnyhartenstein/1dae4330ae3bc1c237ae.js"> </script>

Die Bower-Komponenten in der `./bower.json`:

<script src="https://gist.github.com/ronnyhartenstein/ebf6b1b7d27a8b883161.js"> </script>

Und Install ..

    npm install -g bower
    npm install -g grunt-cli
    npm install


## Grunt Module

Insofern noch nie mit Grunt gearbeitet sei die [**Getting Started**][13] empfohlen. Grundlegend wird das [hier][2] beschriebene Setup erweitert.

### Initfile `Gruntfile.js`

Initial sucht sich Grunt die `Gruntfile.js`, wobei mittels des Moduls `load-grunt-config` bequem die Modulkonfigs in einzelne `.js`-Dateien im Unterverzeichnis `./grunt/`.

`./Gruntfile.js`

<script src="https://gist.github.com/ronnyhartenstein/d62f92fb1da1ec732566.js"> </script>

### Task-Liste `aliases.yaml`

Darin werden alle Grunt-Tasks definiert. Später genügt z.B. `grunt css` und es werden alle CSS gebaut. Sollen die Bower-Komponenten aktualisiert werden? `grunt update_components` und fertig.

`./grunt/aliases.yaml`

<script src="https://gist.github.com/ronnyhartenstein/c521d892dcaa207edd6e.js"> </script>

### Bower: JS-Komponenten einbinden mit [`grunt-bower-concat`][16]

Kopiert die nötigen JS-Libs, welche als Bower-Komponenten vorliegen, zusammengefasst ins Theme-`src`-Verzeichnis. In `layout/base.tpl` wird diese dann eingebunden. Vorteil vom Zusammenfassen ist, dass nur noch ein Request statt zig nötig sind.

`./grunt/bower_concat.js`

<script src="https://gist.github.com/ronnyhartenstein/ba460dada2b16d812924.js"> </script>

### Dateien kopieren mit [`grunt-contrib-copy`][18]

Kopiert die Azure CSS als SCSS ins eigene Theme-Verzeichnis. Kopiert die Fontawesome-Schriften ins Theme-`src`-Verzeichnis für einfachen Include in `layout/base.tpl`. Damit ist die Grundlage für die Sass-Integration gelegt.

Weiterhin werden die OXID-Module wie bereits [hier][2] beschrieben ins Module-Verzeichnis kopiert.

`./grunt/copy.js`

<script src="https://gist.github.com/ronnyhartenstein/c46723fe0556397c8922.js"> </script>

### CSS zusammendampfen mit [`grunt-csswring`][20]

CSSwring entfernt Kommentare und Zeilenumbrüche, sodass am Ende ein einzeiliges CSS übrig bleibt. Wenn das der Webserver noch gzipped ausliefert ist die Optimierung perfekt. Zumindest technisch. Fachlich geht sicher noch so einiges ;)

`./grunt/csswring.js`

<script src="https://gist.github.com/ronnyhartenstein/7d592e9174a5ed412e15.js"> </script>

### Bower-Komponenten aktualisieren mit [`grunt-exec`][22]

Um die Bower-Aktualisierung anzustarten wird einfach `bower update` ausgeführt.

`./grunt/exec.js`

<script src="https://gist.github.com/ronnyhartenstein/b2173b5832aa645cbca8.js"> </script>

### Sass starten und CSS generieren mit [`grunt-contrib-sass`][24]

Die Generierung unseres Theme-CSS wird mittels Sass durchgeführt. Da Sass selbst in Ruby geschrieben ist, also kein natives Node.JS-Modul verfügbar ist, ruft das Modul `sass` mit entsprechenden Parametern auf.

`./grunt/sass.js`

<script src="https://gist.github.com/ronnyhartenstein/ddab26eb08cc8577301a.js"> </script>

### Kontinuierlicher Sass-Build mit [`grunt-contrib-watch`][26]

Sobald mal in der IDE / im Editor speichert, möchte man natürlich dass das CSS neu gebaut wird, sodass man anschließend die Änderung sofort im Browser sieht. Durch die Trennung in `aliases.yaml` nach `css` für alle CSS und `css_sass` für das Theme-SCSS ist es möglich, gezielt nur das eigene Theme-Style neuzubauen.

`./grunt/watch.js`

<script src="https://gist.github.com/ronnyhartenstein/aa7ffb3b3a1bbf690864.js"> </script>

## Generierte Komponenten in `layout/base.tpl` einbinden

In das im eigenen Theme-Verzeichnis liegende `base.tpl` werden die kombinierten CSS und JS nun eingebunden.

**Vorher:** (bei mir, kein Azure-Standard!)

    [{block name="base_style"}]
        [{oxstyle include="css/reset.css"}]
        [{oxstyle include="css/oxid.css"}]
        [{oxstyle include="css/ie7.css" if="IE 7"}]
        [{oxstyle include="css/ie8.css" if="IE 8"}]
        [{oxstyle include="css/libs/jscrollpane.css"}]
    [{/block}]
    ...
    [{oxstyle include="css/flechtie.css"}]
    ...
    [{oxscript include="js/libs/jquery.min.js" priority=1*}]
    [{oxscript include="js/libs/jquery-ui.min.js" priority=1*}]
    [{oxscript include="js/libs/cookie/jquery.cookie.js" priority=2}]
    ...
    [{block name="base_js"}]
        [{oxscript include="js/libs/es5-shim.min.js" priority=1}]
        [{oxscript include="js/libs/featuredetection.js"}]
        [{oxscript include='js/libs/superfish/hoverIntent.js'}]
        [{oxscript include='js/libs/superfish/supersubs.js'}]
        [{oxscript include='js/libs/superfish/superfish.js'}]
    [{/block}]


**Nachher:**

    [{oxstyle include="css/vendor.css"}]
    [{oxstyle include="css/meinshop.css"}]
    ...    
    [{oxscript include="js/vendor-libs.min.js" priority=1}]


Gut, die IE7+8 Hacks sind auch gleich über Bord geflogen, aber prinzipiell sollte die Entschlackung erkennbar sein. Das wichtigste ist mir aber, dass ich nicht mehr Azure `reset.css` und `oxid.css` **vor** den eigenen Theme-Styles einbinden muss, sondern dass es nur noch genau **ein** Customize-CSS gibt und ein gebündeltes Drittanbieter-CSS. Bei **voller Update-Fähigkeit zum Azure-CSS**.

## Bootstrap Grid einbinden

Spätestens jetzt sollte man sich erstmal mit den Komponenten des Bootstrap-Frameworks vertraut machen. Dazu sollte man am besten [**Getting Started**][28], [**CSS**][29] (vor allem Grid, Forms, Buttons, Responsive Utilities) und [**Components**][30] (vor allem Navs, Badges, Jumbotrons, Wells) mindestens querlesen um die Begrifflichkeiten und Konzepte zu kennen.

Prinzipiell sind die Bootstrap-CSS-Klassen und JS nun vorhanden. Um das Grundlayout auf das [Bootstrap-Grid][31] umzustellen, muss das Azure-Grundlayout auf die CSS-Klassen `container`, `row` und `col-*-*` umgestellt werden Dazu sind die Templates in `layout/` komplett anzupassen. Hier die Gists am Beispiel von [Flechtie][32]:

*   `layout/header.tpl`: Kopfbereich, Login, Kategorieliste / Menü [(Gist)][33]
*   `layout/footer.tpl`: Service-Links, Impressum, Seitenabschluss [(Gist)][34]
*   `layout/page.tpl`: Seiten-Grundlayout mit Sidebar-Ausrichtung [(Gist)][35]
*   `widget/sidebar/categorytree.tpl`: Kategorieliste in Artikelliste (u.a.) [(Gist)][36]

Damit ist der Grundstein für weitere Anpassungen gelegt.

## Sass `meinshop.scss`

Die zentrale Theme-SASS-Datei `out/meinshop/src/css/meinshop.scss` wird in einzelne Sass-Include-Dateien aufgegliedert, die günstigerweise mit der Tpl-Struktur korrelieren. Ein mittelschwer angepasster Shop schaut also z.B. so aus:

<script src="https://gist.github.com/ronnyhartenstein/40df7c5612a787588a3a.js"> </script>

Am Anfang werden die Azure-CSS eingebunden (die ja mittels Grunt als SCSS vorliegen). Dann werden alle in den SCSS-Modulen angesprochenen Bootstrap-Module inkludiert. Kommt was neues hinzu muss man hier ggf. noch nachsteuern.

**Halt moment,** Boostrap wird doch schon in der `css/vendor.css` eingebunden, die durch Grund `csswring:vendor` erstellt wird? Ja, sicher, hier wird es ein wenig kritisch. Prinzipiell müsste man alle CSS aus der `vendor.css` gleich mit in die `meinshop.scss` aufnehmen und nur noch eine einzige `meinshop.css` haben. Aber dann dauert der Sass-Build ewig. Für das entgültige Deployment-CSS kann man das machen, soll aber hier keine Berücksichtigung finden.

**Warum muss Bootstrap überhaupt in `meinshop.scss` eingebunden werden?** Ha! Das ist der Trick!

### DER TRICK! OXID-spezifische CSS-Klassen auf Bootstrap-Klassen umbiegen

Folgendes Beispiel:

    .submitButton {
      @extend .btn;
      @extend .btn-primary;
      text-transform: none;
      text-shadow: none;
      height: auto;
    }


Mittels Sass `@extend` wird der OXID-übliche Submit-Button auf Bootstrap umgebogen. Sass rechnet die Bootstrap-Klasse .btn mit der Klasse `.submitButton` zusammen. Da das ganze nach dem Azure-SCSS ausgeführt wird, überschreibt dieses die CSS-Eigenschaften vom Original-`submitButton`. Dadurch muss man nicht jedes Template ableiten und `submitButton` in `btn btn-primary` umbauen.

Ein weiteres Beispiel: Formular-Eingabefelder um `form-control` erweitern und so das Bootstrap-Layout für alle `.form` Felder ausrollen:

    .form {
      input[type=password], input[type=text], select, textarea {
        @extend .form-control;
      }
      ..
    }


Und der oft verwendete `.largeButton`:

    .largeButton {
      @extend .btn-lg;
      text-transform: none;
      text-shadow: none;
      height: auto;
    }


Ein `@extend .btn` ist hier nicht nötig, da diese Klasse nur zusammen mit `.submitButton` verwendet.

### Fleißarbeit: Anpassung des restlichen Layouts

Nachdem die Basics nun klar sind - **a)** Templates ableiten und anpassen und **b)** Bootstrap-Klassen per SCSS anflanschen - geht die Fleißarbeit los. Und die hängt vom konkreten Layout ab, was der Shop fährt. Hier noch ein paar Auszüge aus dem Flechtie-Layout:

*   [Formulare responsiv][38]
*   [Checkout responsiv][39]
*   [Navigation responsiv und angepasst][40]

## Fazit

Einen responsiven OXID eShop bekommt man derzeit nicht geschenkt. Schon gar nicht wenn man es ein wenig individueller haben möchte oder über die Jahre entwickelt hat. Aber es gibt Mittel und Wege um bestehende Responsive CSS-Frameworks, wie Bootstrap eins ist, transparent und gezielt einzubauen, ohne alle auf einmal über den Haufen zu werfen. Prinzipiell kann man das Ganze auch auf Basis von [Semantic UI][41] oder [Pure CSS][42] bauen.

Belohnt wird man mit einer auf jahre hin tauglichen CSS-Basis, die noch dazu automatisch mit dem aktuellen Stand des Azure-Templates verschmolzen wird.

*Mich würde brennend interessieren wie das OXID-Agenturen machen. Vielleicht plaudert mal jemand aus dem Nähkästchen. Kommentare und Anregungen gerne hier oder via Twitter.* [@rhflow_de][43].

 [1]: http://getbootstrap.com/
 [2]: http://blog.rh-flow.de/2015/03/03/oxid-shop-module-per-bower-und-grunt-aktuell-automatisch-halten/
 [3]: http://sass-lang.com/
 [4]: https://exchange.oxid-esales.com/Shopping-experience/Mobile/OXID-eShop-mobile-theme-1-3-0-for-5-2-0-Stable-EE-PE-4-7-x-5-2-x.html
 [5]: /files/2015/03/google_probleme_mobile_nutzerfreundlichkeit.png
 [6]: /files/2015/03/flechtie_alt.png
 [7]: /files/2015/03/flechtie_neu_desktop.png
 [8]: /files/2015/03/flechtie_neu_smartphone.png
 [9]: http://bower.io/
 [10]: http://gruntjs.com/
 [13]: http://gruntjs.com/getting-started
 [16]: https://www.npmjs.com/package/grunt-bower-concat
 [18]: https://github.com/gruntjs/grunt-contrib-copy
 [20]: https://www.npmjs.com/package/grunt-csswring
 [22]: https://github.com/jharding/grunt-exec
 [24]: https://github.com/gruntjs/grunt-contrib-sass
 [26]: https://github.com/gruntjs/grunt-contrib-watch
 [28]: http://getbootstrap.com/getting-started/
 [29]: http://getbootstrap.com/css/
 [30]: http://getbootstrap.com/components/
 [31]: http://getbootstrap.com/css/#grid
 [32]: http://test.flechtie.de
 [33]: https://gist.github.com/ronnyhartenstein/f490444b562dab19edca
 [34]: https://gist.github.com/ronnyhartenstein/d085ccdbc2d54169290a
 [35]: https://gist.github.com/ronnyhartenstein/a9581017121f88389612
 [36]: https://gist.github.com/ronnyhartenstein/0e344335a332e135e966
 [38]: https://gist.github.com/ronnyhartenstein/f6b9b371d5e843238999
 [39]: https://gist.github.com/ronnyhartenstein/d774bee8dbac81960322
 [40]: https://gist.github.com/ronnyhartenstein/e9ad3ff27ea4c95bfd83
 [41]: http://semantic-ui.com/
 [42]: http://purecss.io/
 [43]: https://twitter.com/rhflow_de
