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

wordpress_id: 477
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=477
date: '2014-11-24 19:41:15 +0100'
date_gmt: '2014-11-24 17:41:15 +0100'
categories:
- Entwicklung
- Paradigmen
- PHP
tags: []
thumb: /files/2014/11/php-magazin-2014.jpg
---

<p>Am Wochenende war ich mit Jenny bei der <a href="http://www.agility-german-classics.de/">Agility German Classics</a>. Während sich Jenny einen hervorragenden 8 Platz von 80 Teilnehmern – immerhin die Top-Starter in Deutschland – blieb mir genügend Zeit um einen Stapel PHP-Magazine nach wichtigen Trends und Aha-Erlebnissen zu durchstöbern…</p>

<!--more-->

<h2>Wartbares Design mit CQRS</h2>
<p>In PHPmagazin 5.2014 wird ab S.11 über die Probleme von OOP und den Balast von Kapselung bei schnellen Lesezugriffen berichtet. Als Lösungsansatz wird hier CQRS „Command Query Responsibility Segregation“ vorgestellt. Ansatz ist, Schreiben und Lesen komplett voneinander zu trennen – unterschiedliche Klassen und Interfaces. Beim Schreiben werden ordentliche Value- und Model-Klassen verwerden; hingegeben beim Lesen direkt aus der Quelle gelesen und ins View ausgegeben – ohne OOP-Value-Objekte o.ä. Weitergedacht wird ein Schreib-Aufruf als POST initiert und dann bei Erfolg zum lesenden GET-Aufruf weitergeleitet. Die CQRS Idee stammt aus ca. 2011.</p>
<ul>
<li><a href="http://martinfowler.com/bliki/CQRS.html">Martin Fowler: CQRS</a></li>
<li><a href="http://www.heise.de/developer/artikel/CQRS-neues-Architekturprinzip-zur-Trennung-von-Befehlen-und-Abfragen-1797489.html">heise dev: CQRS – neues Architekturprinzip zur Trennung von Befehlen und Abfragen</a></li>
</ul>
<p>In PHPmag 6.14 ab S.30ff gibts dann noch ein großes Praxisbeispiel mit Pizzas und so – damit wird die Sache fassbarer.</p>
<h2>Zweckentfremdete Frameworks</h2>
<p>In PHPmagazin 5.2014 ab S.22 wird vom <strong>OXID-Webshop</strong> berichtet, der statt <strong>Artikel</strong> nun <strong>Reisen</strong> vertickt – und dabei das gesamte Backend nutzt. Interessant, wenn man vor der Wahl eines Frameworks steht und sich nicht zwischen Symfony und Zend entscheiden mag – evtl. ist die Frage dann noch nicht richtig formuliert.</p>
<h2>Weltweites Shopping</h2>
<p>In einer in PHPmag 6.2014 S.18ff gestarteten Artikelserie erzählt Goodgame-Studios von der Herausforderung einen Online-Shop auf 3 Kontinenten mit zig Millionen Nutzern in Echtzeit zu reagieren und syncron zu halten – und das mit Couchbase (NoSQL-DB) und PHP (in PHPmag 1.2015 S.40ff). Spannend zu erfahren, wie heute richtig große Anwendungen arbeiten.</p>
<h2>Browsers Trickkiste: Javascript Debugging</h2>
<p>Firefox Firebug und Chrome Dev Tools kennen wir ja alle. Breakpoints in JS-Dateien und Step-by-Step-Debugging mit Stack-Trace-Analyse und einen Watches hat sicher auch schon der eine oder andere gemacht. Aber kennt ihr den <strong>Timeline</strong>-Tab im Chrome der u.a. Speicherauslastung und Event-Statistiken zeigt? Ich bislang nicht. Javascript-Profiling und Möglichkeit Haltepunkte an Dom-Elemente zu binden, wenn ein bestimmtes Event gefeuert wird eventuell auch nicht. Im PHPmag 1.2015 S.79ff wird reichlich kernige Infos dazu geliefert. Zeit Chrome Dev Tools statt Firebug zu verwenden…</p>
<h2>BDD mit Behat</h2>
<p>Beim Plausch am Abend mit unseren Unterkunfts-Gastgebern (er, nicht sie ;)) kam in einen Nebensatz Behat zur Sprache.<br>
<a href="http://de.wikipedia.org/wiki/Behavior_Driven_Development">Behaviour Driven Development</a> mit Testfällen, die in einfachen Schulenglisch ohne Programmierkenntnisse formuliert werden können. <strong>Game Changer!</strong></p>
<ul>
<li><a href="http://behat.readthedocs.org/en/v2.5/quick_intro.html">Behat: Schnelleinstieg</a></li>
<li><a href="http://behat.readthedocs.org/en/v2.5/cookbook/behat_and_mink.html">Web Apps mit Behat und Mink testen</a></li>
<li><a href="http://behat.readthedocs.org/en/v2.5/cookbook/behat_and_mink.html">Integration von Behat in PHPStorm</a></li>
</ul>
<h2>Willkommen im Jetzt</h2>
<p>In PHPmagazin 1.2015 ist eine Artikelreihe zum Thema Agile Softwareentwicklung und Projektmanagement. Ergründet wird, warum manche Firmen damit erfolgreich sind und manche nicht. Und warum Wasserfall und Agil sich nicht wiedersprechen sondern ergänzen.</p>
<p><i>Hinweise und Kommentare gerne per Twitter <a href="https://twitter.com/rhflow_de">@rhflow_de</a> oder hier als Kommentar. Wie immer gilt, wenn euch selber was tolles über den Weg läuft oder ihr ausprobiert habt, bloggt auch selbst darüber, lasst andere teilhaben!</i></p>
