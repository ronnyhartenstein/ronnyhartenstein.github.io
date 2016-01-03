---
layout: post
status: publish
published: true
title: PHPmagazine 2014 quergelesen
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: Am Wochenende war ich mit Jenny bei der <a href="http:&#47;&#47;www.agility-german-classics.de&#47;">Agility
  German Classics<&#47;a>. W&auml;hrend sich Jenny einen hervorragenden 8 Platz von
  80 Teilnehmern - immerhin die Top-Starter in Deutschland - blieb mir gen&uuml;gend
  Zeit um einen Stapel PHP-Magazine nach wichtigen Trends und Aha-Erlebnissen zu durchst&ouml;bern...
wordpress_id: 477
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=477
date: '2014-11-24 19:41:15 +0100'
date_gmt: '2014-11-24 17:41:15 +0100'
categories:
- Entwicklung
- Paradigmen
- PHP
tags: []
---
<p>Am Wochenende war ich mit Jenny bei der <a href="http:&#47;&#47;www.agility-german-classics.de&#47;">Agility German Classics<&#47;a>. W&auml;hrend sich Jenny einen hervorragenden 8 Platz von 80 Teilnehmern - immerhin die Top-Starter in Deutschland - blieb mir gen&uuml;gend Zeit um einen Stapel PHP-Magazine nach wichtigen Trends und Aha-Erlebnissen zu durchst&ouml;bern...<a id="more"></a><a id="more-477"></a></p>
<h2>Wartbares Design mit CQRS<&#47;h2><br />
In PHPmagazin 5.2014 wird ab S.11 &uuml;ber die Probleme von OOP und den Balast von Kapselung bei schnellen Lesezugriffen berichtet. Als L&ouml;sungsansatz wird hier CQRS "Command Query Responsibility Segregation" vorgestellt. Ansatz ist, Schreiben und Lesen komplett voneinander zu trennen - unterschiedliche Klassen und Interfaces. Beim Schreiben werden ordentliche Value- und Model-Klassen verwerden; hingegeben beim Lesen direkt aus der Quelle gelesen und ins View ausgegeben - ohne OOP-Value-Objekte o.&auml;. Weitergedacht wird ein Schreib-Aufruf als POST initiert und dann bei Erfolg zum lesenden GET-Aufruf weitergeleitet. Die CQRS Idee stammt aus ca. 2011.</p>
<ul>
<li><a href="http:&#47;&#47;martinfowler.com&#47;bliki&#47;CQRS.html">Martin Fowler: CQRS<&#47;a><&#47;li>
<li><a href="http:&#47;&#47;www.heise.de&#47;developer&#47;artikel&#47;CQRS-neues-Architekturprinzip-zur-Trennung-von-Befehlen-und-Abfragen-1797489.html">heise dev: CQRS &ndash; neues Architekturprinzip zur Trennung von Befehlen und Abfragen<&#47;a><&#47;li><br />
<&#47;ul><br />
In PHPmag 6.14 ab S.30ff gibts dann noch ein gro&szlig;es Praxisbeispiel mit Pizzas und so - damit wird die Sache fassbarer.</p>
<h2>Zweckentfremdete Frameworks<&#47;h2><br />
In PHPmagazin 5.2014 ab S.22 wird vom <strong>OXID-Webshop<&#47;strong> berichtet, der statt <strong>Artikel<&#47;strong> nun <strong>Reisen<&#47;strong> vertickt - und dabei das gesamte Backend nutzt. Interessant, wenn man vor der Wahl eines Frameworks steht und sich nicht zwischen Symfony und Zend entscheiden mag - evtl. ist die Frage dann noch nicht richtig formuliert.</p>
<h2>Weltweites Shopping<&#47;h2><br />
In einer in PHPmag 6.2014 S.18ff gestarteten Artikelserie erz&auml;hlt Goodgame-Studios von der Herausforderung einen Online-Shop auf 3 Kontinenten mit zig Millionen Nutzern in Echtzeit zu reagieren und syncron zu halten - und das mit Couchbase (NoSQL-DB) und PHP (in PHPmag 1.2015 S.40ff). Spannend zu erfahren, wie heute richtig gro&szlig;e Anwendungen arbeiten.</p>
<h2>Browsers Trickkiste: Javascript Debugging<&#47;h2><br />
Firefox Firebug und Chrome Dev Tools kennen wir ja alle. Breakpoints in JS-Dateien und Step-by-Step-Debugging mit Stack-Trace-Analyse und einen Watches hat sicher auch schon der eine oder andere gemacht. Aber kennt ihr den <strong>Timeline<&#47;strong>-Tab im Chrome der u.a. Speicherauslastung und Event-Statistiken zeigt? Ich bislang nicht. Javascript-Profiling und M&ouml;glichkeit Haltepunkte an Dom-Elemente zu binden, wenn ein bestimmtes Event gefeuert wird eventuell auch nicht. Im PHPmag 1.2015 S.79ff wird reichlich kernige Infos dazu geliefert. Zeit Chrome Dev Tools statt Firebug zu verwenden...</p>
<h2>BDD mit Behat<&#47;h2><br />
Beim Plausch am Abend mit unseren Unterkunfts-Gastgebern (er, nicht sie ;)) kam in einen Nebensatz Behat zur Sprache.<br />
<a href="http:&#47;&#47;de.wikipedia.org&#47;wiki&#47;Behavior_Driven_Development">Behaviour Driven Development<&#47;a> mit Testf&auml;llen, die in einfachen Schulenglisch ohne Programmierkenntnisse formuliert werden k&ouml;nnen. <strong>Game Changer!<&#47;strong></p>
<ul>
<li><a href="http:&#47;&#47;behat.readthedocs.org&#47;en&#47;v2.5&#47;quick_intro.html">Behat: Schnelleinstieg<&#47;a><&#47;li>
<li><a href="http:&#47;&#47;behat.readthedocs.org&#47;en&#47;v2.5&#47;cookbook&#47;behat_and_mink.html">Web Apps mit Behat und Mink testen<&#47;a><&#47;li>
<li><a href="http:&#47;&#47;behat.readthedocs.org&#47;en&#47;v2.5&#47;cookbook&#47;behat_and_mink.html">Integration von Behat in PHPStorm<&#47;a><&#47;li><br />
<&#47;ul></p>
<h2>Willkommen im Jetzt<&#47;h2><br />
In PHPmagazin 1.2015 ist eine Artikelreihe zum Thema Agile Softwareentwicklung und Projektmanagement. Ergr&uuml;ndet wird, warum manche Firmen damit erfolgreich sind und manche nicht. Und warum Wasserfall und Agil sich nicht wiedersprechen sondern erg&auml;nzen.</p>
<p><i>Hinweise und Kommentare gerne per Twitter <a href="https:&#47;&#47;twitter.com&#47;rhflow_de">@rhflow_de<&#47;a> oder hier als Kommentar. Wie immer gilt, wenn euch selber was tolles &uuml;ber den Weg l&auml;uft oder ihr ausprobiert habt, bloggt auch selbst dar&uuml;ber, lasst andere teilhaben!<&#47;i></p>
