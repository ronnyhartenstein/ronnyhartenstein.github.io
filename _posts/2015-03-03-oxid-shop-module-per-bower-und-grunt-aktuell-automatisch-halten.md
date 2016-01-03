---
layout: post
status: publish
published: true
title: OXID Shop Module per Bower und Grunt automatisch aktualisieren
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: |+
  <p><a href="http:&#47;&#47;www.oxid-esales.com&#47;en&#47;products&#47;facts&#47;oxid-eshop-community-edition&#47;product-information.html">OXID eShop CE<&#47;a> ist an sich ja ein tolles System out-of-the-box. Wie jedes moderne System bietet auch OXID Drittanbietern die M&ouml;glichkeit, dieses mit <strong>Modulen<&#47;strong> zu erweitern. Mittlerweile gibt es auch einige Module auf GitHub unter OpenSource-Lizenz. Mit Node.js, Bower und Grunt l&auml;sst sich ein automatischer Workflow etablieren, der Installation und Aktualisierung erleichtert.<&#47;p>

  <h4>TL;DR<&#47;h4>

  <p>Mittels Bower und Grunt werden die GitHub-Repos der Modulanbieter heruntergeladen und anschlie&szlig;end nach <code>modules&#47;<&#47;code> kopiert. Das l&auml;sst sich mit Grunt komplett automatisieren: Bower Update mit <code>grunt-contrib-exec<&#47;code>, kopieren mit <code>grunt-contrib-copy<&#47;code>.<&#47;p>

  <p><strong>Fr&uuml;her so:<&#47;strong> Neues Modul herunterladen, auspacken, ins Shop-Verzeichnis kopieren. Im Explorer ist es herumgeklicke, auf der Kommandozeile einiges an Tipperei.<br &#47;>
  <strong>Heute so:<&#47;strong> Neues Modul in <code>bower.json<&#47;code> eintragen, <code>grunt<&#47;code> ausf&uuml;hren, fertig.<&#47;p>

wordpress_id: 599
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=599
date: '2015-03-03 23:33:43 +0100'
date_gmt: '2015-03-03 21:33:43 +0100'
categories:
- OXID
- DevOp
- Grunt
- Bower
tags: []
---
<p><a href="http:&#47;&#47;www.oxid-esales.com&#47;en&#47;products&#47;facts&#47;oxid-eshop-community-edition&#47;product-information.html">OXID eShop CE<&#47;a> ist an sich ja ein tolles System out-of-the-box. Wie jedes moderne System bietet auch OXID Drittanbietern die M&ouml;glichkeit, dieses mit <strong>Modulen<&#47;strong> zu erweitern. Mittlerweile gibt es auch einige Module auf GitHub unter OpenSource-Lizenz. Mit Node.js, Bower und Grunt l&auml;sst sich ein automatischer Workflow etablieren, der Installation und Aktualisierung erleichtert.<&#47;p></p>
<h4>TL;DR<&#47;h4></p>
<p>Mittels Bower und Grunt werden die GitHub-Repos der Modulanbieter heruntergeladen und anschlie&szlig;end nach <code>modules&#47;<&#47;code> kopiert. Das l&auml;sst sich mit Grunt komplett automatisieren: Bower Update mit <code>grunt-contrib-exec<&#47;code>, kopieren mit <code>grunt-contrib-copy<&#47;code>.<&#47;p></p>
<p><strong>Fr&uuml;her so:<&#47;strong> Neues Modul herunterladen, auspacken, ins Shop-Verzeichnis kopieren. Im Explorer ist es herumgeklicke, auf der Kommandozeile einiges an Tipperei.<br &#47;><br />
<strong>Heute so:<&#47;strong> Neues Modul in <code>bower.json<&#47;code> eintragen, <code>grunt<&#47;code> ausf&uuml;hren, fertig.<&#47;p></p>
<p><a id="more"></a><a id="more-599"></a></p>
<h2>Spannende Module als &Uuml;bungs-Beispiele<&#47;h2></p>
<p>Die GitHub Organisation <a href="https:&#47;&#47;github.com&#47;OXIDprojects">OXID Projects<&#47;a> forkt alle auf GitHub verf&uuml;gbaren Module und schafft damit einen &Uuml;berblick. Unter anderen sind dort folgende Perlen, die nachfolgend automatisch installiert werden sollen:<&#47;p></p>
<ul>
<li><a href="https:&#47;&#47;github.com&#47;vanilla-thunder&#47;bla-tinymce&#47;">vanilla-thunder&#47;bla-tinymce<&#47;a> <strong>TinyMCE f&uuml;r die CE-Edition<&#47;strong> <em>Tiny MCE for OXID eShop CE 4.7 - 4.9<&#47;em><&#47;li>
<li><a href="https:&#47;&#47;github.com&#47;vanilla-thunder&#47;vt-devutils">vanilla-thunder&#47;vt-devutils<&#47;a> <strong>Entwickler-Tools<&#47;strong> <em>helpful functions for OXID developing<&#47;em><&#47;li>
<li><a href="https:&#47;&#47;github.com&#47;vanilla-thunder&#47;ag-isal">vanilla-thunder&#47;ag-isal<&#47;a> <strong>Endlos-Artikellisten<&#47;strong> mit Lazy-Load <em>infinite scrolling articlelists<&#47;em><&#47;li>
<li><a href="https:&#47;&#47;github.com&#47;EllisV&#47;oxid-console">EllisV&#47;oxid-console<&#47;a> <em>OXID Console is php console application for OXID Shop. It provides an API for writing various commands. We have shipped very common for every oxid shop project commands out of the box.<&#47;em><&#47;li>
<li><a href="https:&#47;&#47;github.com&#47;DSB&#47;Oxid-Module-IDE-Helper">DSB&#47;Oxid-Module-IDE-Helper<&#47;a> generiert Helfer-Klassen (<code>*_parent<&#47;code>) damit man in z.B. PhpStorm gut arbeiten kann <em>Oxid Module that creates parent classes on disk which helps IDEs to do auto completion in OXID code<&#47;em><&#47;li>
<li><a href="https:&#47;&#47;github.com&#47;druteika&#47;oxid_module_generator">druteika&#47;oxid_module_generator<&#47;a> ein <strong>Modul-Generator<&#47;strong>! <em>Folders structure, empty classes and metadata generation for new OXID eShop modules.<&#47;em><&#47;li>
<li><a href="https:&#47;&#47;github.com&#47;OXIDCookbook&#47;Cookbook_GER1">OXIDCookbook&#47;Cookbook_GER1<&#47;a> <strong>Code-Beispiele vom OXID-Kochbuch<&#47;strong> <em>All code examples from the german book. The official repo of edition 1.<&#47;em> (nun auch schon 2 Jahre alt)<&#47;li><br />
<&#47;ul></p>
<p>BTW: <a href="http:&#47;&#47;forum.oxid-esales.com&#47;member.php?u=10337">@vanilla_thunder<&#47;a> hat da ein paar <a href="https:&#47;&#47;twitter.com&#47;vanilla">tolle Module auf GitHub<&#47;a> am Start!<&#47;p></p>
<h2>Installation Grunt und Bower via NPM<&#47;h2></p>
<p>Ein <a href="http:&#47;&#47;nodejs.org&#47;download&#47;">installiertes Node.js<&#47;a> wird vorausgesetzt. Zun&auml;chst muss <strong>Bower<&#47;strong>, <strong>Grunt<&#47;strong> und alle n&ouml;tigen Module installiert werden. Dazu wird im Shop-Hauptverzeichnis eine <code>.&#47;package.json<&#47;code> platziert mit folgenden Inhalt:<&#47;p></p>
<pre><code>{<br />
  "name": "oxid-shop",<br />
  "version": "1.0.0",<br />
  "devDependencies": {<br />
    "bower": "*"<br />
    "grunt": "*",<br />
    "grunt-cli": "*",<br />
    "grunt-contrib-exec": "*",<br />
    "grunt-contrib-copy": "*",<br />
    "grunt-check-modules": "*",<br />
    "load-grunt-config": "*"<br />
  }<br />
}<br />
<&#47;code><&#47;pre></p>
<p>Die Node.js-Module <code>grunt-cli<&#47;code> und <code>bower<&#47;code> sollten global installiert werden und sind nur der Vollst&auml;ndigkeit halber aufgef&uuml;hrt. Also:<&#47;p></p>
<pre><code>node install -g bower<br />
node install -g grunt-cli<br />
<&#47;code><&#47;pre></p>
<p>Jetzt alle Node.js Module aus der <code>package.json<&#47;code> installieren:<&#47;p></p>
<pre><code>node install<br />
<&#47;code><&#47;pre></p>
<p>Als n&auml;chstes wird die Bower-Konfiguration <code>.&#47;bower.json<&#47;code> im Hauptverzeichnis platziert. Hier stehen die Module drin. Da praktisch kein Modul beim offiziellen <a href="http:&#47;&#47;bower.io&#47;search&#47;">Bower-Package-Verzeichnis<&#47;a> angemeldet ist, muss jeweils das GitHub-Repo angemeldet werden. Ansonsten w&uuml;rde eine Release-Nummer oder schlicht <code>"*"<&#47;code> gen&uuml;gen.<&#47;p></p>
<pre><code>{<br />
  "name": "oxid-shop",<br />
  "version": "1.0.0",<br />
  "dependencies": {<br />
    "oxid-console": "EllisV&#47;oxid-console#1.1.5",<br />
    "oxid-bla-tinymce": "vanilla-thunder&#47;bla-tinymce",<br />
    "oxid-vt-devutils": "vanilla-thunder&#47;vt-devutils",<br />
    "oxid-ag-isal": "vanilla-thunder&#47;ag-isal",<br />
    "oxid-cookbook": "OXIDCookbook&#47;Cookbook_GER1",<br />
    "oxid-Module-IDE-Helper": "DSB&#47;Oxid-Module-IDE-Helper",<br />
    "oxid-module_generator": "druteika&#47;oxid_module_generator"<br />
 },<br />
 "private": true<br />
}<br />
<&#47;code><&#47;pre></p>
<p>Bei <code>oxid-console<&#47;code> wurden Releases erstellt, daher ist hier exemplarisch das aktuelle gepinnt.<&#47;p></p>
<p>Theoretisch k&ouml;nnten wir jetzt <code>bower install<&#47;code> ausf&uuml;hren und es w&uuml;rden alle Module aus GitHub nach <code>.&#47;bower_components<&#47;code> geklont werden. Das wird sp&auml;ter Grunt f&uuml;r uns machen.<&#47;p></p>
<h2>Grunt Einrichtung<&#47;h2></p>
<p>Wer Grunt nicht kennt m&ouml;ge bitte die <a href="http:&#47;&#47;gruntjs.com&#47;getting-started">Einleitung<&#47;a> lesen. Grunt ist ein Task-Runner wie Java Ant. Wer dieses kennt, wird Grunt wegen seiner einfachen Konfiguration lieben!<&#47;p></p>
<p>Wir legen also eine <code>.&#47;Gruntfile.js<&#47;code> im Shop-Hauptverzeichnis an.<&#47;p></p>
<pre><code>module.exports = function(grunt) {<br />
    var path = require('path');</p>
<p>    &#47;&#47; Zeitmessung und Auswertung<br />
    require('time-grunt')(grunt);</p>
<p>    &#47;&#47; Verteilung der Grunt-Konfiguration auf einzelne Dateien<br />
    require('load-grunt-config')(grunt);<br />
};<br />
<&#47;code><&#47;pre></p>
<p>Das Modul <code>load-grunt-config<&#47;code> erm&ouml;glicht es eine saubere und wartbare Grunt-Konfiguration aufzubauen. <a href="http:&#47;&#47;www.html5rocks.com&#47;en&#47;tutorials&#47;tooling&#47;supercharging-your-gruntfile&#47;">Ohne das ist alles doof! <em>"Supercharge your Gruntfile!"<&#47;em><&#47;a><&#47;p></p>
<p>Die Tasks werden nun in <code>.&#47;grunt&#47;aliases.yml<&#47;code> definiert.<&#47;p></p>
<pre><code>default:<br />
- update_components</p>
<p>update_components:<br />
  - exec:bower_update<br />
  - copy:oxid_modules<br />
<&#47;code><&#47;pre></p>
<p>Die Konfiguration zu den Modulen erfolgt in separaten Dateien:<&#47;p></p>
<p>Die f&uuml;r <code>grunt-contrib-exec<&#47;code> in <code>.&#47;grunt&#47;exec.js<&#47;code>:<&#47;p></p>
<pre><code>module.exports = function (grunt, options) {<br />
    return {<br />
        bower_update: 'bower update'<br />
    };<br />
};<br />
<&#47;code><&#47;pre></p>
<p>Der Task <code>exec:bower_update<&#47;code> f&uuml;hrt also <code>bower update<&#47;code> durch, welches die Bower-Module installiert.<&#47;p></p>
<p>Die zu <code>grunt-contrib-copy<&#47;code> in <code>.&#47;grunt&#47;copy.js<&#47;code>:<&#47;p></p>
<pre><code>module.exports = function (grunt, options) {<br />
    return {<br />
        oxid_modules: {<br />
            files: [<br />
                {expand: true, cwd: 'bower_components&#47;oxid-ag-isal&#47;copy_this&#47;', src: ['**'], dest: 'shop&#47;'},<br />
                {expand: true, cwd: 'bower_components&#47;oxid-bla-tinymce&#47;copy_this&#47;', src: ['**'], dest: 'shop&#47;'},<br />
                {expand: true, cwd: 'bower_components&#47;oxid-console&#47;copy_this&#47;', src: ['**'], dest: 'shop&#47;'},<br />
                {expand: true, cwd: 'bower_components&#47;oxid-module_generator&#47;copy_this&#47;', src: ['**'], dest: 'shop&#47;'},<br />
                {expand: true, cwd: 'bower_components&#47;oxid-vt-devutils&#47;copy_this&#47;', src: ['**'], dest: 'shop&#47;'},<br />
                {expand: true, cwd: 'bower_components&#47;oxid-Module-IDE-Helper&#47;modules&#47;', src: ['**'], dest: 'shop&#47;modules&#47;'}<br />
            ]<br />
        }<br />
    };<br />
};<br />
<&#47;code><&#47;pre></p>
<p>Der Task <code>copy:oxid_modules<&#47;code> kopiert also aus den verschiedenen Bower-Komponenten-Verzeichnissen die ben&ouml;tigten Dateien ins Shop-Module-Verzeichnis.<&#47;p></p>
<p>Damit ist nun alles fertig konfiguriert!<&#47;p></p>
<h2>Task starten<&#47;h2></p>
<p>Jetzt starten wir Grunt:<&#47;p></p>
<pre><code>grunt<br />
<&#47;code><&#47;pre></p>
<p>Durch die entsprechende Task-Konfigration startet er nun Bower und kopiert anschlie&szlig;end alles ins OXID-Module-Verzeichnis.<&#47;p></p>
<h2>Was haben wir nun damit gewonnen?<&#47;h2></p>
<p>Wie eingangs schon erw&auml;hnt bei Installation eines neuen Moduls...<&#47;p></p>
<p><strong>Fr&uuml;her so:<&#47;strong> Neues Modul herunterladen, auspacken, ins Shop-Verzeichnis kopieren. Im Explorer ist es herumgeklicke, auf der Kommandozeile einiges an Tipperei.<br &#47;><br />
<strong>Heute so:<&#47;strong> Neues Modul in <code>bower.json<&#47;code> eintragen, <code>grunt<&#47;code> ausf&uuml;hren , fertig.<&#47;p></p>
<p>Beim Update vom bestehenden Modul-Zoo - und das werden ja &uuml;ber die Jahre naturgem&auml;&szlig; meist mehr denn weniger - wird das ganze dann l&auml;stig. Dann ist der manuelle Updateprozess f&uuml;r jedes Modul zu wiederholen.<&#47;p></p>
<p><strong>Fr&uuml;her so:<&#47;strong> zig mal URL eintippen im Browser, herunterladen, auspacken, kopieren.<br &#47;><br />
<strong>Heute so:<&#47;strong> <code>grunt<&#47;code> ausf&uuml;hren, fertig.<&#47;p></p>
<p><em>Anregungen und Kommentare wie immer gerne hier oder auf Twitter.<&#47;em> <a href="https:&#47;&#47;twitter.com&#47;rhflow_de">@rhflow_de<&#47;a><&#47;p></p>
