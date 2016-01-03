---
layout: post
status: publish
published: true
title: 'Elixir lernen als PHP WebDev ist .. interessant .. #myelixirstatus'
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: |+
  <p>Der Weg zum Alchemist Rookie ist lang und steinig. Aber wie alle solche Wege lohnt er sich. Und wenn nicht, wahres konsequentes Handeln zeigt man erst wenn man auch Holzwege zuende gegangen ist.<&#47;p>

wordpress_id: 731
wordpress_url: http://blog.rh-flow.de/?p=731
date: '2015-09-05 22:39:45 +0200'
date_gmt: '2015-09-05 20:39:45 +0200'
categories:
- Elixir
tags: []
---
<p>Der Weg zum Alchemist Rookie ist lang und steinig. Aber wie alle solche Wege lohnt er sich. Und wenn nicht, wahres konsequentes Handeln zeigt man erst wenn man auch Holzwege zuende gegangen ist.<&#47;p></p>
<p><a id="more"></a><a id="more-731"></a></p>
<h2>Teil 1: Warum?<&#47;h2></p>
<p>Ich hab Elixir nicht gelernt weil sie funktional ist, oder neu, oder cool, oder abgefahren. Ich bin Web-Entwickler. Ich baue Webseiten. Tolle Mathematik-Probleme elegant mit einer funktionalen Sprache zu l&ouml;sen mag f&uuml;rs Lernen toll sein. N&uuml;tzt mir nur bei meinen allt&auml;glichen Problemen nichts. Diese Probleme wollen schnell und nachhaltig gel&ouml;st werden. Aber es gibt ja das Phoenix Framework.<&#47;p></p>
<blockquote>
<p>Elixir verh&auml;lt sich zu PHP wie Phoenix zu Laravel bzw. Symfony. Und Erlang zu Elixir wie der C++-Kern von PHP zu PHP selbst.<&#47;p><br />
<&#47;blockquote></p>
<p>(Mit dem Unterschied das man in Elixir einfach auf Erlang-Funktionalit&auml;t zugreifen kann und mab bei PHP ein extern einzulinkendes Modul schreiben muss.)<&#47;p></p>
<h3>Erstkontakt<&#47;h3></p>
<p>Da war da der eine Tag im Mai, als mein Kollege Max vom Stuhl fiel. Das Phoenix Framework trendete auf Hackernews. Ein Web-Framework das im Kern auf der funktionalen Sprache Erlang basierte war was absolut revolution&auml;r Neues. Und es hielt Last aus. Sehr viel Last.<&#47;p></p>
<p>Phoenix basiert auf Elixir und ist ein Aufsatz auf Erlang. Beides stammt aus der Feder von Jos&ecirc; Valim, der auch schon das Ruby on Rails Framework mitverantwortet hat.<&#47;p></p>
<p>Elixir wiederum ist praktisch ein Aufsatz auf die Erlang VM und ist gerade mal rund 3 Jahre alt. Erlang bietet echtes Multithreating, pardon parallele Prozesse - es ist ja f&uuml;r verteilte Systeme erfunden worden. Praktisch gibt es zwar kein OOP in Form von Klassen, Interfaces und solchen Dingen, aber einen Prozess zu erzeugen ist genau so einfach wie in anderen Sprachen ein Objekt zu erzeugen. Wobei wie ich lernen durfte OOP im wahren Sinne bedeutet: &ldquo;Ich habe isolierte Entit&auml;ten, die sich untereinander Nachrichten schicken k&ouml;nnen&rdquo;. Elixir als funktionale Sprache mit der genialen Prozess-Abstraktion implementiert OOP sauberer als handels&uuml;bliche OO Sprachen, bei denen man viel zu viel imperativen Unsinn machen kann, welcher die Objektkapselung umgeht. Auch &ldquo;Klassen&rdquo; und &ldquo;Vererbung&rdquo; sind in der urspr&uuml;nglichen Definition von OOP nicht enthalten, das ist wohl weit verbreiteter Irrglaube.<&#47;p></p>
<h3>10 Jahre PHP, dann kam Javascript&#47;Coffee&#47;Typescript<&#47;h3></p>
<p>Mein erster Kontakt zu PHP war ca. 2000. Nach einen Ausflug in Perl blieb ich PHP lange treu - bis zum heutigen Tag. F&uuml;r die t&auml;gliche Arbeit als WebDev ist es total super. Viele bashen auf PHP herum. "Die Syntax ist nicht durchg&auml;ngig," - "Prozedurale Programmierung ist ja sowas von gestern." - "OOP ist nur dazugefrickelt." Naja, aber es l&auml;uft eben auch beim letzten Billig-Hoster einfach los. Und schlechter Code liegt nicht prim&auml;r an der Sprache - zu allermeist haben den aber Menschen verbrochen - ich hab bislang noch keine Maschinen programmieren sehen. Im Job arbeite ich seit rund 10 Jahren t&auml;glich mit PHP. Allerdings kam in den letzten Jahren zunehmend Javascript dazu - haupts&auml;chlich bedingt durch zunehmende Automatisierung von Build-Prozessen (Hallo Grunt!) und der anhaltende Trend zu Single-Page-Apps. Da stellt der gemeine PHP-Programmierer mit der Zeit fest: Javascript ist auch cool. Nachdem ich die prototypischen Grundkonzepte der Sprache tats&auml;chlich verstanden hatte, machte Javascript richtig Spa&szlig;. Und eine neue Sprache erweitert den Geist. Schon im "Der Pragmatische Programmierer" (auch von Dave Thomas) steht: "Lerne jedes Jahr eine neue Sprache".<&#47;p></p>
<h3>Motivation zu Neuem &uuml;ber Code for Chemnitz<&#47;h3></p>
<p>Allerdings bietet der &uuml;bliche berufliche Alltag nicht immer eine gen&uuml;gend gro&szlig;e B&uuml;hne um revolution&auml;r Neues auszuprobieren. Einfach mal Python ausprobieren in einer Firma die haupts&auml;chlich mit PHP und Java tickt? Eher schwierig. Dann kam das OK Lab Chemnitz bzw. <a href="http:&#47;&#47;codeforchemnitz.de">Code for Chemnitz<&#47;a>. Alle zwei Wochen sitzen wir also zusammen in einen kleinen Kreis Gleichgesinnter und &uuml;berlegen, welche tollen Web-Projekte man starten k&ouml;nnte um die eigene Stadt voranzubringen bzw. Tools f&uuml;r deren Bewohner zu bauen. Das sch&ouml;n dabei: freie Technikwahl und ein konkretes Ziel. Beste Voraussetzungen f&uuml;r Dev-Nerds! CVAG-Haltestellen-App mit Angular und Node.JS? Klar! Tierheimseiten-Parser in Javascript mit einem Publisher in Ruby? Warum nicht. Eine Sensor-Verwaltungs-Karten-App mit Meteor.JS? Jo! Ein einfaches Sensor-Konfigurationsprogramm mit Electron? Jupp. Einen Sensordaten-Empf&auml;nger-REST-Webservice in Python. Warum nicht? Genau letzteres wollten wir in Elixir&#47;Phoenix umsetzen. Das konnte aber noch keiner - ist aber derzeit f&uuml;r mich ein klares Ziel.<&#47;p></p>
<p>Zusammenfassend: PHP ist f&uuml;r mich nach wie vor cool - mit Frameworks wie Laravel und appserver.io sowie PHP7 hat es auch noch eine lange Zukunft vor sich. Node.JS ist an anderer Stelle cool und erg&auml;nzt den Build-Stack rund um PHP sehr gut - bzw. ist als Standalone-Appserver (z.B. mit Express-Framework) auch eine super Sache. Aber es ist wie in der DDR bzw. im Sozialismus. Solange man nicht die Westprodukte kennt ist alles cool. Sobald man aber einen Blick ins Westfernsehen oder &uuml;ber die Mauer geworfen hat, zieht einen alles genau in diese Richtung. So &auml;hnlich empfinde ich den Drang Richtung Elixir&#47;Phoenix derzeit.<&#47;p></p>
<p>Ich bin mit dem Buch "Programming Elixir" gerade mal durch den 1. Teil "Conventional Programming" durch indem die Grundlagen der Sprache vermittelt werden. Den 2. Teil "Concurrent Programming" habe ich gerade angefangem und beginne echt zu begreifen, was sich damit f&uuml;r erstaunliche M&ouml;glichkeiten bieten.<&#47;p></p>
<h2>Teil 2: PHP vs. Javascript vs. Elixir<&#47;h2></p>
<p>Wie weiter oben schon geschildert kenne ich mich haupts&auml;chlich mit PHP und Javascript aus. Fr&uuml;her hab ich noch ein paar Jahre Java programmiert. Aber das ist lange her, daher sind meine Einsch&auml;tzungen dazu eher wenig state-of-the-art. Vergleiche zu Python oder Ruby kann ich daher nicht ziehen. Nachfolgend ein paar Einsch&auml;tzungen.<&#47;p></p>
<h3>Harte Grenzen<&#47;h3></p>
<p><strong>PHP<&#47;strong> kann standardm&auml;&szlig;ig nur Singlethreading und folgt streng den Share-Nothing Prinzip. Da sto&szlig;en moderne Webanwendungen zunehmend an harte Grenzen. Bei jeder Anfrage muss das Bootstrapping durchgef&uuml;hrt werden. Caching wie z.B. mit APC lindert den Schmerz, aber es bleiben Schmerzen. Projekte wie <a href="http:&#47;&#47;appserver.io">appserver.io<&#47;a> nutzen die Erweiterung pthreads, was Multithreading in PHP erm&ouml;glicht.<&#47;p></p>
<p><strong>Node.JS<&#47;strong> schickte sich an, durch seine Callbacks und asynchrone Aufrufe die M&ouml;glichkeiten zur Programmierung zu erweitern - ja es f&uuml;hlt sich sogar ein wenig funktional an. Allerdings basiert es ja auf dem Chromium und damit auf einen Single-Thread. Echtes Multithreading - oder Prozesse sind also auch in Node.JS nicht m&ouml;glich. Die Grenzen sind absehbar. Einfach nicht rechnen lassen. Dann ist alles gut.<&#47;p></p>
<p>Mit <strong>Java<&#47;strong> kann man auch Webapps bauen - sogenannte Servlets. Die laufen auf Application-Servern die eine Menge tolle Sachen mitbringen. DB-Connection-Pooling, Load-Balancing etc. Java ist f&uuml;r ernste echte gro&szlig;e (Web-)Anwendungen f&uuml;r viele Firmen immernoch das Mittel der Wahl. Allerdings erkauft man sich den Komfort von Javas Garbage Collection und dem OOP-Wald durch massiven RAM-Einsatz. Unterhalb 1 GB l&auml;uft meines Wissens nach eine solche App nicht los. Wobei RAM heute eher kein Thema mehr ist. Aber Java kann echtes Threading - mit den &uuml;blichen Schmerzen wie Synchronisierungsprobleme und Race-Conditions. So richtig in den Griff bekommt man das wohl nur in dem die Threads alle syncron laufen. Naja, dann kann man es eigentlich auch lassen. Die durchschnittliche <em>Produktivit&auml;t<&#47;em> mit Java ist eher schwierig gemessen an heutigen Standards. Tonnenweise Boilerplate-Code, schnell ausufernde Klassenw&auml;lder die navigiert werden wollen, endlose Steuerungen in XML (selbst die Build Tools). Nicht zu vergessen: arbeiten in den sekundenschnellen Zyklen von TDD ist durch die aufw&auml;rmzeit der JVM auch nicht so sch&ouml;n.<&#47;p></p>
<p>Die Grenzen von <strong>Elixir<&#47;strong> bzw. der Erlang VM? Keine Ahnung. Im Buch gibt es ein Beispiel, in dem eine Kette von Prozessen gebildet wird, die eine Zahl jeweils um eins aufsummiert. Dieses mit 1.000.000 Prozessinstanzen gestartet dauert auf einen MacBookPro Mid 2014 knapp &uuml;ber 7 Sekunden. Prozesse k&ouml;nnen also wie Objekte verwendet werden. Und rechnen geht auch - und zwar mit beliebiger Genauigkeit. Bei Bedarf passt die VM den Datentyp selbst an. Die 1000. Fibonacci-Zahl? Irgendeine Zahl mit ca. 100 Stellen. Ach ja und dann gibts ja noch den Supervisor der fehlgeschlagene Prozesse schlicht einfach nochmal startet. Ausfall ad&eacute;.. Bzgl. <em>Performance und Belastbarkeit<&#47;em>: schon auf einem einzelnen Blech gehen Node, Java und Go vorher in die Knie: <a href="https:&#47;&#47;gist.github.com&#47;omnibs&#47;e5e72b31e6bd25caf39a">Comparative Benchmark Numbers @ Rackspace<&#47;a>. Randnotiz: im verlinkten Beispiel stand die ~CPU bei grade mal 70% bei Plug&#47;Phoenix - die Verbindung zum Server hat nicht mehr Requests durchbringen k&ouml;nnen um diesen auszulasten.<&#47;p></p>
<h3>Syntaktischer Zucker<&#47;h3></p>
<p>In <strong>PHP<&#47;strong> halten neue Sprachfeatures so nach und nach Einzug. Aber um dieses in bestehenden Legacy Anwendungen nutzen zu k&ouml;nnen, muss man diesen zu den neueren PHP-Versionen migrieren. Und den Aufwand scheuen Firmen leider.<&#47;p></p>
<p><strong>Javascript<&#47;strong> von heute wird haupts&auml;chlich nach dem ES5 Standard geschrieben. Auch in Node.JS. Damit l&auml;sst es sich schon recht h&uuml;bsch programmieren. Mit ES6, pardon ES2015, kommen viele neue Sprachfeatures hinzu.<&#47;p></p>
<p><strong>Elixir<&#47;strong> selbst ist praktisch nur ein Satz Makros, der zu Erlang-Code aufgel&ouml;st wird. Prinzipiell k&ouml;nnte man in Erlang auch seine eigene Sprache realisieren.<&#47;p></p>
<h3>Warum ; und weiterer Clutter &uuml;berfl&uuml;ssig ist<&#47;h3></p>
<p>Das Befehle mit Semikolon abgeschlossen werden, fand ich von Anfang (ca. 2000) an klasse. Ich hab vor PHP und Java eben Visual Basic und Turbo Pascal gemacht. C und C++ waren mir als Autodidakt zu spacig. Aber PHP sah ein bisschen aus wie C - und war deswegen per se cool.<&#47;p></p>
<p><strong>Javascript<&#47;strong> nutzt auch ";" als Befehlstrenner. Auch cool. Und dann kam Code for Chemnitz und Python und Meteor.JS und Coffeescript. Eines Abends in lauschiger Runde hab ich unter Anleitung ein kleines Python-Script geschrieben was eine HTML-Seite parst. Da war das Eis bei mir gebrochen und die Liebe zum Semikolon erlosch. Ich twitterte wenig sp&auml;ter "Keine Klammern sind Hipster-Kram."<&#47;p></p>
<p><strong>Coffeescript<&#47;strong> kommt auch ohne ; aus, bietet daf&uuml;r unglaublichen Syntax-Zucker. Das muss man einfach mal probiert haben. Es f&uuml;hlt sich gro&szlig;artig an. Alle &uuml;berfl&uuml;ssigen Zeichen und all der Schmutz sind weg. Es bleibt die Essenz von ausagekr&auml;ftigen Quellcode.<&#47;p></p>
<p>In Javascript beispielsweise so:<&#47;p></p>
<pre><code>var double = function(n) { return n * 2; };<br />
<&#47;code><&#47;pre></p>
<p>In Coffeescript dann so:<&#47;p></p>
<pre><code>double = (n) -> n * 2<br />
<&#47;code><&#47;pre></p>
<p>Alles da was man so braucht, ohne den ganzen Kleister drumrum.<&#47;p></p>
<p><strong>Elixir<&#47;strong> kommt ebenfalls meist ohne ";" daher. Das obige Beispiel schaut dort so aus:<&#47;p></p>
<pre><code>double = fn n -> n * 2 end<br />
<&#47;code><&#47;pre></p>
<p>Nahe dran an Coffeescript, oder?<&#47;p></p>
<p>Ein Modul mit einer Funktion schaut minimal so aus:<&#47;p></p>
<pre><code>defmodule Times do<br />
  def double(n) do<br />
    n * 2<br />
  end<br />
end<br />
<&#47;code><&#47;pre></p>
<p>Kurz und knackig.<&#47;p></p>
<h3>Phoenix Framework: ein Killerframework?<&#47;h3></p>
<p>Jos&eacute; Valim hat seinerzeit Ruby on Rails ma&szlig;geblich entwickelt. Ein Framework womit sich komplexe Anwendungen in k&uuml;rzester Zeit realisieren lassen. M&ouml;glich wird das wohl durch das Konvention-vor-Konfiguration-Paradigma. Es gibt Routen, Templates, Controller, Models, ORM etc. - aber alles wird genau an einen Platz erwartet. Damit spart man sich viel &Uuml;berlegung ala "Wo pack ich denn nun dies oder jenes hin?". In Meteor.JS gibt es das nicht. Das vereinfacht den Einstieg, erschwert aber das Projektwachstum wenn man keine sinnvolle Verzeichnisstruktur schonmal gesehen hat. Phoenix verfolgt den selben Ansatz wie Ruby on Rails und gibt vieles vor - und erwartet vieles an genau einer Stelle. Daf&uuml;r gibt es aber eine F&uuml;lle an Tools die das Generieren von neuen Controllern, Routen, Modellen etc. zum Kinderspiel macht. Bislang habe ich noch kein Phoenix-Projekt selbst angegangen sondern mich nach den Lesen der hervorragenden Dokumentation zun&auml;chst voll auf Elixir konzentriert. Ohne Grundlagen in der Sprache ists halt schwierig. Aber was ich bislang zu Phoenix gelesen habe, hat mich ziemlich aus den Schuhen gehauen.<&#47;p></p>
<p>Ich muss dazu anmerken, dass ich in meiner t&auml;glichen Arbeit bislang stets mit firmenspezifischen Frameworks gearbeitet habe (= arbeiten musste). Das ist nicht schlimm, aber Stackoverflow und Google fallen bei Problemen einfach weg - man ist auf die Hilfe von Kollegen angewiesen.<&#47;p></p>
<p>Phoenix schickt sich an ein Fullstack-Framework zu sein. Leider kann der Browser (noch) kein Erlang&#47;Elixir, daher kann es per Definition nicht so Fullstack sein wie Meteor. Aber es deckt alle Bereiche einer Webanwendung ab. Und sogar noch mehr: &ldquo;Channels&rdquo; abstrahieren Verbindungsprotokolle aller Art, <em>inklusive<&#47;em> Websockets. Man kann also seine iPhone-App &uuml;ber Phoenix mit seinem Toaster in Echtzeit verbinden - die Zukunft ist Internet of Things - und nur Phoenix ist daf&uuml;r wirklich optimiert! Meteor ist am Anfang f&uuml;r reines Browser-Server schneller zum Entwickeln, Phoenix ist aber ungleich m&auml;chtiger.<&#47;p></p>
<h3>Anwortzeiten<&#47;h3></p>
<p>Achtung! Folgender Vergleich hinkt gewaltig, zeigt aber ungef&auml;hr die Richtung an.<&#47;p></p>
<p>Bei <strong>PHP<&#47;strong> erfolgt immer erst das Bootstrapping. Eine Produktivantwortzeit von 200ms ist f&uuml;r ein gro&szlig;es Framework schon recht gut.<&#47;p></p>
<p>In <strong>Node.JS<&#47;strong> findet das Bootstrapping beim Start statt. Die Antwortzeiten sind also entsprechend k&uuml;rzer. (<100ms?)<&#47;p></p>
<p>In <strong>Java<&#47;strong> habe ich mal an einer Websphere Application mitgewirkt. Diese Anwendung hat mehrere GB RAM verschluckt und mit einer Oracle-DB gesprochen. Dort waren Antwortzeiten von 10ms auf dem Testsystem sehr gut.<&#47;p></p>
<p>Bei Webseiten-Aufrufen in <strong>Phoenix<&#47;strong> werden Antwortzeiten im Log in &micro;s angegeben. In <strong>&micro;s<&#47;strong>!!1elf! Klar ist das das Helloworld Beispiel da es so richtig gro&szlig;e Anwendungen noch nicht gibt, aber es zeigt die Richtung schon recht gut an.<&#47;p></p>
<h2>Teil 3: Elixir tats&auml;chlich lernen<&#47;h2></p>
<p>So, nun sind alle motiviert, doch tats&auml;chlich was neues zu lernen, ja? Das ist alles ganz furchtbar viel besser als alles dagewesene. Ja, richtig, aber es gibt wie immer einen Preis zu zahlen:<&#47;p></p>
<h3>Funktionale Programmierung: unfassbar anders<&#47;h3></p>
<ol>
<li>Funktionale Progammierung != Imperative Programmierung .. einen Haufen Funkti&ouml;nchen zu programmieren ist schon sehr anders als in PHP zu coden. Tannenbaum-artigen Code zu programmieren ist praktisch nicht m&ouml;glich. Die Prinzipen von Clean Code befolgen ist damit wesentlich naheliegender.<&#47;li>
<li>In Erlang und damit Elixir sind alle Variablen per Definition unver&auml;nderlich (immutable). Elixir erlaubt zumindest Dinge wie x = x + 1 -- Erlang selbst nicht. Selbst beim hinzuf&uuml;gen von neuen Elementen in riesengro&szlig;e Listen wird stets eine neue erzeugt. Allerdings in der Form [ item | tail ] - d.h. die neue Variable hat den neuen Eintrag und einen Verweis auf den Rest der Liste.<&#47;li>
<li>"=" weist keine Werte zu sondern "macht gleich". Das ist ein riesen Unterschied, Stichwort "Pattern Matching". Im Buch so "I do not think it means what you think it means." Es ist unfassbar, was f&uuml;r abgefahrene Konstrukte damit m&ouml;glich sind.<&#47;li>
<li>Wenn eine Funktion mehr als 10 Zeilen hat und diese nicht per |> verbunden sind macht definitiv was falsch. Siehe 1.<&#47;li><br />
<&#47;ol></p>
<h3>Naturgesetze wanken<&#47;h3></p>
<p>Aber Elixir beweist auch folgendes: (zitiert nach "Programming Elixir" S.9) 1. OOP ist nicht der einzige Weg um Code zu designen 2. Funktionale Programmierung muss nicht komplex oder mathematisch sein 3. Die Grundlagen von Programmierung sind nicht Zuweisungen, ifungen und Schleifen 4. Parallelit&auml;t braucht keine Locks, Semaphoren, Monitors und sowas 5. Prozesse sind nicht notwendigerweise teure Ressourcen 6. Auch wenn es Arbeit ist, programmieren sollte Spa&szlig; machen 7. M&uuml;hsam erlernte OOP &ldquo;Patterns&rdquo; im Enterprise-Bereich sind nahezu alle komplett hinf&auml;llig, dadurch dass man in einer h&ouml;heren Abstraktionsebene arbeitet. Allgemein gilt: immer wenn man beim t&auml;glichen Coden entfernt an &ldquo;Pattern&rdquo; denkt f&uuml;r das was man grade tut, ist das ein sicheres Zeichen f&uuml;r eine Schwachstelle meiner Programmiersprache. Nur Sprachen mit &ldquo;hygienix&#47;homoiconic macros&rdquo; sind gegen diese Schw&auml;che Immun, das w&auml;ren Lisp (-> Clojure, Scheme) und Elixir soweit als bekannte Vertreter.<&#47;p></p>
<p>Elixir ist nicht der helige Gral, aber es gibt auch nicht den einen wahren Weg zu programmieren - genau wie es nicht den einen Gott gibt. Aber es ist anders genug als der Mainstream um dir eine andere Perspektive zu geben - also deinen Geist zu &ouml;ffnen und neue Wege einzuschlagen &uuml;ber Programmierung nachzudenken.<&#47;p></p>
<blockquote>
<p>Funktionale Programmierung bricht verkrustete Denkstrukturen auf.<&#47;p><br />
<&#47;blockquote></p>
<h3>Buch "Programming Elixir" von Dave Thomas<&#47;h3></p>
<p>Es gibt derzeit noch kein deutsches Buch zum Thema Elixir. Aber es gibt schon ein paar sehr gute englische B&uuml;cher zum Thema. Den besten Einstieg f&uuml;r fortgeschrittene Anf&auml;nger bietet wohl "Programming Elixir" von Dave Thomas.<&#47;p></p>
<p>Auf heise developer gibt es einen Einsteiger-Artikel zu Elixir, der allerdings etwas ungenau ist (vornehm ausgedr&uuml;ckt).<&#47;p></p>
<p>Wie oben beschrieben habe ich den 1. Teil mittlerweile durchgearbeitet (wichtig! lesen geht schneller als verstehen und selber machen!) und kratze den 2. Teil an. Aber der ist Stand heute fakultativ wenn man mit Phoenix anfangen will.<&#47;p></p>
<p>Mithilfe dieses Buches habe ich mir das erste Mal strukturiert eine Sprache autodidaktisch erschlossen. Die "You turn" &Uuml;bungen sind zumeist bekannte mathematische&#47;programmiertechnische Probleme wie Primzahlen, Fibonacci-Zahlen, Map&amp;Reduce nachbauen, String-Operationen nachbauen usw. Nicht sehr sehr schwer aber fordernd.<&#47;p></p>
<h3>Mein Aufwand f&uuml;rs Lernen<&#47;h3></p>
<p>Ich schreibe diesen Blog-Artikel am Ende meines zweiw&ouml;chigen Urlaubs in den &Ouml;sterreicher Alpen - genauer im Asten-Tal auf 2050m H&ouml;he. Ein Urlaub ist m.E. die perfekte Grundlage um sich mit fundamental Neuem zu besch&auml;ftigen. Nicht dass man seinen ganzen Urlaub vor dem Laptop verbringen soll, ganz bestimmt nicht. Aber nach einer ausgiebigen Wanderung kann man abends a) bei Obstler und Wein vorm Fernseher versacken oder b) den erfrischten und befreiten Geist nutzen und sich Dinge belesen die einen interessieren. In einen Winterurlaub vor ca. 5 Jahren habe ich "Der Pragmatische Programmierer" gelesen. Ein Buch f&uuml;r das ich im Alltag wohl Monate gebraucht h&auml;tte. So aber war es innerhalb einer Woche inkl. Hin- und R&uuml;ckfahrt durchgelesen. Im Urlaub gilt die Maxime: kein Bock = chillen, viel Bock = lesen &amp; probieren. So hab<&#47;p></p>
<p>Ich habe so 1-2 Stunden am Abend gelesen und&#47;oder probiert. Einmal auch den ganzen Abend (5h). Die Woche vor dem Urlaub so 2-3 Abende mal reinlesen. Insgesamt l&auml;sst sich der Aufwand nur schlecht sch&auml;tzen. Vielleicht so 40h bislang? Vielleicht 50h?<&#47;p></p>
<p>Egal, am Ende z&auml;hlt vor allem eins: der Spa&szlig; und der Kick des "Aha" Erlebnisses - und die "Energie des Verstehens" (Zitat: Stefan M&uuml;nz, SelfHTML)<&#47;p></p>
<h3>Beispiele zur Motivation<&#47;h3></p>
<p>Folgende Beispiele sollen Lust zum Probieren machen.<&#47;p></p>
<h4>Primzahlen berechnen<&#47;h4></p>
<p>Meine erste Variante mit einen guten Beispiel f&uuml;r Pattern-Matching:<&#47;p></p>
<pre><code>defmodule Prime do<br />
  def search(from, to) do<br />
    for n <- from .. to, _isprime?(n, n-1), into: [], do: n<br />
  end</p>
<p>  defp _isprime?(_, 0), do: false<br />
  defp _isprime?(n, 1) when n > 2, do: true<br />
  defp _isprime?(_, 1), do: false # f&uuml;r 2 :(<br />
  defp _isprime?(n, num) when rem(n, num) == 0, do: false<br />
  defp _isprime?(n, num), do: _isprime?(n, num - 1)</p>
<p>end<br />
<&#47;code><&#47;pre></p>
<p>Meine finale und gef&uuml;hlt beste L&ouml;sung in der 4. Iteration mit einer zweifach gefilterten List Comprehension:<&#47;p></p>
<pre><code>defmodule Prime do<br />
  def search(from, to) do<br />
    alle = Enum.to_list(from .. to)<br />
    teilbar = for n <- from .. to, m <- from .. to,<br />
      m < n &amp;&amp; n > 1, # Filter 1<br />
      m > 1 &amp;&amp; rem(n,m) == 0, # Filter 2<br />
      into: [], do: n<br />
    alle -- teilbar<br />
  end<br />
end<br />
<&#47;code><&#47;pre></p>
<p>Aufruf in <code>iex<&#47;code> jeweils mit:<&#47;p></p>
<pre><code>Prime.search(1,10)<br />
<&#47;code><&#47;pre></p>
<h4>Fibonacci Zahlen berechnen<&#47;h4></p>
<p>Als einfaches Modul:<&#47;p></p>
<pre><code>defmodule FibSolver do</p>
<p>  def fib(anzahl) do<br />
    liste = for n <- 1..anzahl, into: [], do: fib_calc(n)<br />
    IO.inspect liste<br />
  end</p>
<p>  defp fib_calc(0), do: 0<br />
  defp fib_calc(1), do: 1<br />
  defp fib_calc(n), do: fib_calc(n-1) + fib_calc(n-2)</p>
<p>end<br />
<&#47;code><&#47;pre></p>
<p>Die 37 Fibonacci-Zahlen werden dann wie folgt berechnet (nach rd. 5 Sek.):<&#47;p></p>
<pre><code>FibSolver.fib(37)<br />
<&#47;code><&#47;pre></p>
<p>Ergebnis:<&#47;p></p>
<pre><code>[1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817]<br />
<&#47;code><&#47;pre></p>
<p>Mangels Caching dauert die Berechnung gr&ouml;&szlig;erer Zahlen ewig. Max hat das Beispiel unter Nutzung von Listen noch etwas beschleunigt, inklusive Doc und Spec: <a href="http:&#47;&#47;elixirplayground.com&#47;?gist=1dfd7f1d8dbc6afb1f3d">elixirplayground.com&#47;?gist=1dfd7f1d8dbc6afb1f3d<&#47;a><&#47;p></p>
<p>Und nun noch als Prozess-Agent, der zudem einzelne Ergebnisse cacht.<&#47;p></p>
<pre><code>defmodule FibAgent do</p>
<p>  def start_link do<br />
    cache = Enum.into([{0, 0}, {1, 1}], HashDict.new)<br />
    Agent.start_link(fn -> cache end)<br />
  end</p>
<p>  def fib(pid, n) when n >= 0 do<br />
    Agent.get_and_update(pid, &amp;do_fib(&amp;1, n))<br />
  end</p>
<p>  defp do_fib(cache, n) do<br />
    if cached = cache[n] do<br />
      {cached, cache}<br />
    else<br />
      {val, cache} = do_fib(cache, n - 1)<br />
      result = val + cache[n - 2]<br />
      {result, Dict.put(cache, n, result)}<br />
    end<br />
  end<br />
end<br />
<&#47;code><&#47;pre></p>
<p>In <code>iex<&#47;code>dann so:<&#47;p></p>
<pre><code>{:ok, agent} = FibAgent.start_link()<br />
for n <- 1900 .. 2000, do: IO.puts "#{n} -> #{FibAgent.fib(agent, n)}"<br />
<&#47;code><&#47;pre></p>
<p>Die Ausgabe dann nach rd. 3 Sekunden so:<&#47;p></p>
<pre><code>...<br />
2000 -> 4224696333392304878706725602341482782579852840250681098010280137314308584370130707224123599639141511088446087538909603607640194711643596029271983312598737326253555802606991585915229492453904998722256795316982874482472992263901833716778060607011615497886719879858311468870876264597369086722884023654422295243347964480139515349562972087652656069529806499841977448720155612802665404554171717881930324025204312082516817125<br />
<&#47;code><&#47;pre></p>
<p>Elixir kann also richtig ordentlich rechnen.<&#47;p></p>
<h2>Fazit<&#47;h2></p>
<p>Die Lernkurve von Funktionaler Programmierung und Elixir hat sich f&uuml;r mich erst flach, dann zunehmend steiler angef&uuml;hlt. Am meisten hab ich beim Probieren rund um die "Your turn" gelernt. Bis so ein Primzahl-Algorithmus l&auml;uft, den kann man schon auf rund 4 Arten und Geschmacksrichtungen implementieren.<&#47;p></p>
<p>Elixir Programmierer nennen sich selbst Alchemisten. Ich nenn mich derzeit Alchemist Rookie, da ich immernoch am Anfang der M&ouml;glichkeiten von Elixir, Erlang OTP und Phoenix stehe. Aber konsequentes Lernen ebnet den Weg zum Alchemisten. Wom&ouml;glich l&ouml;st Elixir demn&auml;chst PHP und Javascript (im Backend) im Tagesgesch&auml;ft ab.<&#47;p></p>
<p>Also, los gehts! Lasst Elixir und Phoenix Mainstream werden!<&#47;p></p>
<p>Vielen Dank auch an @Hisako1337 f&uuml;r Denkanst&ouml;&szlig;e, das Review und einige Fachliche Korrekturen und Anmerkungen!<&#47;p></p>
