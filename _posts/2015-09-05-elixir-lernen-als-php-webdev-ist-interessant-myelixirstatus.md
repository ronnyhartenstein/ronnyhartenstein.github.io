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
  Der Weg zum Alchemist Rookie ist lang und steinig. Aber wie alle solche Wege lohnt er sich. Und wenn nicht, wahres konsequentes Handeln zeigt man erst wenn man auch Holzwege zuende gegangen ist.

wordpress_id: 731
wordpress_url: http://blog.rh-flow.de/?p=731
date: '2015-09-05 22:39:45 +0200'
date_gmt: '2015-09-05 20:39:45 +0200'
categories:
- Elixir
tags: []
comments: true
---
Der Weg zum Alchemist Rookie ist lang und steinig. Aber wie alle solche Wege lohnt er sich. Und wenn nicht, wahres konsequentes Handeln zeigt man erst wenn man auch Holzwege zuende gegangen ist.

<!--more-->

## Teil 1: Warum?

Ich hab Elixir nicht gelernt weil sie funktional ist, oder neu, oder cool, oder abgefahren. Ich bin Web-Entwickler. Ich baue Webseiten. Tolle Mathematik-Probleme elegant mit einer funktionalen Sprache zu lösen mag fürs Lernen toll sein. Nützt mir nur bei meinen alltäglichen Problemen nichts. Diese Probleme wollen schnell und nachhaltig gelöst werden. Aber es gibt ja das Phoenix Framework.

> Elixir verhält sich zu PHP wie Phoenix zu Laravel bzw. Symfony. Und Erlang zu Elixir wie der C++-Kern von PHP zu PHP selbst.

(Mit dem Unterschied das man in Elixir einfach auf Erlang-Funktionalität zugreifen kann und mab bei PHP ein extern einzulinkendes Modul schreiben muss.)

### Erstkontakt

Da war da der eine Tag im Mai, als mein Kollege Max vom Stuhl fiel. Das Phoenix Framework trendete auf Hackernews. Ein Web-Framework das im Kern auf der funktionalen Sprache Erlang basierte war was absolut revolutionär Neues. Und es hielt Last aus. Sehr viel Last.

Phoenix basiert auf Elixir und ist ein Aufsatz auf Erlang. Beides stammt aus der Feder von Josê Valim, der auch schon das Ruby on Rails Framework mitverantwortet hat.

Elixir wiederum ist praktisch ein Aufsatz auf die Erlang VM und ist gerade mal rund 3 Jahre alt. Erlang bietet echtes Multithreating, pardon parallele Prozesse - es ist ja für verteilte Systeme erfunden worden. Praktisch gibt es zwar kein OOP in Form von Klassen, Interfaces und solchen Dingen, aber einen Prozess zu erzeugen ist genau so einfach wie in anderen Sprachen ein Objekt zu erzeugen. Wobei wie ich lernen durfte OOP im wahren Sinne bedeutet: “Ich habe isolierte Entitäten, die sich untereinander Nachrichten schicken können”. Elixir als funktionale Sprache mit der genialen Prozess-Abstraktion implementiert OOP sauberer als handelsübliche OO Sprachen, bei denen man viel zu viel imperativen Unsinn machen kann, welcher die Objektkapselung umgeht. Auch “Klassen” und “Vererbung” sind in der ursprünglichen Definition von OOP nicht enthalten, das ist wohl weit verbreiteter Irrglaube.

### 10 Jahre PHP, dann kam Javascript/Coffee/Typescript

Mein erster Kontakt zu PHP war ca. 2000. Nach einen Ausflug in Perl blieb ich PHP lange treu - bis zum heutigen Tag. Für die tägliche Arbeit als WebDev ist es total super. Viele bashen auf PHP herum. "Die Syntax ist nicht durchgängig," - "Prozedurale Programmierung ist ja sowas von gestern." - "OOP ist nur dazugefrickelt." Naja, aber es läuft eben auch beim letzten Billig-Hoster einfach los. Und schlechter Code liegt nicht primär an der Sprache - zu allermeist haben den aber Menschen verbrochen - ich hab bislang noch keine Maschinen programmieren sehen. Im Job arbeite ich seit rund 10 Jahren täglich mit PHP. Allerdings kam in den letzten Jahren zunehmend Javascript dazu - hauptsächlich bedingt durch zunehmende Automatisierung von Build-Prozessen (Hallo Grunt!) und der anhaltende Trend zu Single-Page-Apps. Da stellt der gemeine PHP-Programmierer mit der Zeit fest: Javascript ist auch cool. Nachdem ich die prototypischen Grundkonzepte der Sprache tatsächlich verstanden hatte, machte Javascript richtig Spaß. Und eine neue Sprache erweitert den Geist. Schon im "Der Pragmatische Programmierer" (auch von Dave Thomas) steht: "Lerne jedes Jahr eine neue Sprache".

### Motivation zu Neuem über Code for Chemnitz

Allerdings bietet der übliche berufliche Alltag nicht immer eine genügend große Bühne um revolutionär Neues auszuprobieren. Einfach mal Python ausprobieren in einer Firma die hauptsächlich mit PHP und Java tickt? Eher schwierig. Dann kam das OK Lab Chemnitz bzw. [Code for Chemnitz][1]. Alle zwei Wochen sitzen wir also zusammen in einen kleinen Kreis Gleichgesinnter und überlegen, welche tollen Web-Projekte man starten könnte um die eigene Stadt voranzubringen bzw. Tools für deren Bewohner zu bauen. Das schön dabei: freie Technikwahl und ein konkretes Ziel. Beste Voraussetzungen für Dev-Nerds! CVAG-Haltestellen-App mit Angular und Node.JS? Klar! Tierheimseiten-Parser in Javascript mit einem Publisher in Ruby? Warum nicht. Eine Sensor-Verwaltungs-Karten-App mit Meteor.JS? Jo! Ein einfaches Sensor-Konfigurationsprogramm mit Electron? Jupp. Einen Sensordaten-Empfänger-REST-Webservice in Python. Warum nicht? Genau letzteres wollten wir in Elixir/Phoenix umsetzen. Das konnte aber noch keiner - ist aber derzeit für mich ein klares Ziel.

Zusammenfassend: PHP ist für mich nach wie vor cool - mit Frameworks wie Laravel und appserver.io sowie PHP7 hat es auch noch eine lange Zukunft vor sich. Node.JS ist an anderer Stelle cool und ergänzt den Build-Stack rund um PHP sehr gut - bzw. ist als Standalone-Appserver (z.B. mit Express-Framework) auch eine super Sache. Aber es ist wie in der DDR bzw. im Sozialismus. Solange man nicht die Westprodukte kennt ist alles cool. Sobald man aber einen Blick ins Westfernsehen oder über die Mauer geworfen hat, zieht einen alles genau in diese Richtung. So ähnlich empfinde ich den Drang Richtung Elixir/Phoenix derzeit.

Ich bin mit dem Buch "Programming Elixir" gerade mal durch den 1. Teil "Conventional Programming" durch indem die Grundlagen der Sprache vermittelt werden. Den 2. Teil "Concurrent Programming" habe ich gerade angefangem und beginne echt zu begreifen, was sich damit für erstaunliche Möglichkeiten bieten.

## Teil 2: PHP vs. Javascript vs. Elixir

Wie weiter oben schon geschildert kenne ich mich hauptsächlich mit PHP und Javascript aus. Früher hab ich noch ein paar Jahre Java programmiert. Aber das ist lange her, daher sind meine Einschätzungen dazu eher wenig state-of-the-art. Vergleiche zu Python oder Ruby kann ich daher nicht ziehen. Nachfolgend ein paar Einschätzungen.

### Harte Grenzen

**PHP** kann standardmäßig nur Singlethreading und folgt streng den Share-Nothing Prinzip. Da stoßen moderne Webanwendungen zunehmend an harte Grenzen. Bei jeder Anfrage muss das Bootstrapping durchgeführt werden. Caching wie z.B. mit APC lindert den Schmerz, aber es bleiben Schmerzen. Projekte wie [appserver.io][2] nutzen die Erweiterung pthreads, was Multithreading in PHP ermöglicht.

**Node.JS** schickte sich an, durch seine Callbacks und asynchrone Aufrufe die Möglichkeiten zur Programmierung zu erweitern - ja es fühlt sich sogar ein wenig funktional an. Allerdings basiert es ja auf dem Chromium und damit auf einen Single-Thread. Echtes Multithreading - oder Prozesse sind also auch in Node.JS nicht möglich. Die Grenzen sind absehbar. Einfach nicht rechnen lassen. Dann ist alles gut.

Mit **Java** kann man auch Webapps bauen - sogenannte Servlets. Die laufen auf Application-Servern die eine Menge tolle Sachen mitbringen. DB-Connection-Pooling, Load-Balancing etc. Java ist für ernste echte große (Web-)Anwendungen für viele Firmen immernoch das Mittel der Wahl. Allerdings erkauft man sich den Komfort von Javas Garbage Collection und dem OOP-Wald durch massiven RAM-Einsatz. Unterhalb 1 GB läuft meines Wissens nach eine solche App nicht los. Wobei RAM heute eher kein Thema mehr ist. Aber Java kann echtes Threading - mit den üblichen Schmerzen wie Synchronisierungsprobleme und Race-Conditions. So richtig in den Griff bekommt man das wohl nur in dem die Threads alle syncron laufen. Naja, dann kann man es eigentlich auch lassen. Die durchschnittliche *Produktivität* mit Java ist eher schwierig gemessen an heutigen Standards. Tonnenweise Boilerplate-Code, schnell ausufernde Klassenwälder die navigiert werden wollen, endlose Steuerungen in XML (selbst die Build Tools). Nicht zu vergessen: arbeiten in den sekundenschnellen Zyklen von TDD ist durch die aufwärmzeit der JVM auch nicht so schön.

Die Grenzen von **Elixir** bzw. der Erlang VM? Keine Ahnung. Im Buch gibt es ein Beispiel, in dem eine Kette von Prozessen gebildet wird, die eine Zahl jeweils um eins aufsummiert. Dieses mit 1.000.000 Prozessinstanzen gestartet dauert auf einen MacBookPro Mid 2014 knapp über 7 Sekunden. Prozesse können also wie Objekte verwendet werden. Und rechnen geht auch - und zwar mit beliebiger Genauigkeit. Bei Bedarf passt die VM den Datentyp selbst an. Die 1000. Fibonacci-Zahl? Irgendeine Zahl mit ca. 100 Stellen. Ach ja und dann gibts ja noch den Supervisor der fehlgeschlagene Prozesse schlicht einfach nochmal startet. Ausfall adé.. Bzgl. *Performance und Belastbarkeit*: schon auf einem einzelnen Blech gehen Node, Java und Go vorher in die Knie: [Comparative Benchmark Numbers @ Rackspace][3]. Randnotiz: im verlinkten Beispiel stand die ~CPU bei grade mal 70% bei Plug/Phoenix - die Verbindung zum Server hat nicht mehr Requests durchbringen können um diesen auszulasten.

### Syntaktischer Zucker

In **PHP** halten neue Sprachfeatures so nach und nach Einzug. Aber um dieses in bestehenden Legacy Anwendungen nutzen zu können, muss man diesen zu den neueren PHP-Versionen migrieren. Und den Aufwand scheuen Firmen leider.

**Javascript** von heute wird hauptsächlich nach dem ES5 Standard geschrieben. Auch in Node.JS. Damit lässt es sich schon recht hübsch programmieren. Mit ES6, pardon ES2015, kommen viele neue Sprachfeatures hinzu.

**Elixir** selbst ist praktisch nur ein Satz Makros, der zu Erlang-Code aufgelöst wird. Prinzipiell könnte man in Erlang auch seine eigene Sprache realisieren.

### Warum ; und weiterer Clutter überflüssig ist

Das Befehle mit Semikolon abgeschlossen werden, fand ich von Anfang (ca. 2000) an klasse. Ich hab vor PHP und Java eben Visual Basic und Turbo Pascal gemacht. C und C++ waren mir als Autodidakt zu spacig. Aber PHP sah ein bisschen aus wie C - und war deswegen per se cool.

**Javascript** nutzt auch ";" als Befehlstrenner. Auch cool. Und dann kam Code for Chemnitz und Python und Meteor.JS und Coffeescript. Eines Abends in lauschiger Runde hab ich unter Anleitung ein kleines Python-Script geschrieben was eine HTML-Seite parst. Da war das Eis bei mir gebrochen und die Liebe zum Semikolon erlosch. Ich twitterte wenig später "Keine Klammern sind Hipster-Kram."

**Coffeescript** kommt auch ohne ; aus, bietet dafür unglaublichen Syntax-Zucker. Das muss man einfach mal probiert haben. Es fühlt sich großartig an. Alle überflüssigen Zeichen und all der Schmutz sind weg. Es bleibt die Essenz von ausagekräftigen Quellcode.

In Javascript beispielsweise so:

    var double = function(n) { return n * 2; };


In Coffeescript dann so:

    double = (n) -> n * 2


Alles da was man so braucht, ohne den ganzen Kleister drumrum.

**Elixir** kommt ebenfalls meist ohne ";" daher. Das obige Beispiel schaut dort so aus:

    double = fn n -> n * 2 end


Nahe dran an Coffeescript, oder?

Ein Modul mit einer Funktion schaut minimal so aus:

    defmodule Times do
      def double(n) do
        n * 2
      end
    end


Kurz und knackig.

### Phoenix Framework: ein Killerframework?

José Valim hat seinerzeit Ruby on Rails maßgeblich entwickelt. Ein Framework womit sich komplexe Anwendungen in kürzester Zeit realisieren lassen. Möglich wird das wohl durch das Konvention-vor-Konfiguration-Paradigma. Es gibt Routen, Templates, Controller, Models, ORM etc. - aber alles wird genau an einen Platz erwartet. Damit spart man sich viel Überlegung ala "Wo pack ich denn nun dies oder jenes hin?". In Meteor.JS gibt es das nicht. Das vereinfacht den Einstieg, erschwert aber das Projektwachstum wenn man keine sinnvolle Verzeichnisstruktur schonmal gesehen hat. Phoenix verfolgt den selben Ansatz wie Ruby on Rails und gibt vieles vor - und erwartet vieles an genau einer Stelle. Dafür gibt es aber eine Fülle an Tools die das Generieren von neuen Controllern, Routen, Modellen etc. zum Kinderspiel macht. Bislang habe ich noch kein Phoenix-Projekt selbst angegangen sondern mich nach den Lesen der hervorragenden Dokumentation zunächst voll auf Elixir konzentriert. Ohne Grundlagen in der Sprache ists halt schwierig. Aber was ich bislang zu Phoenix gelesen habe, hat mich ziemlich aus den Schuhen gehauen.

Ich muss dazu anmerken, dass ich in meiner täglichen Arbeit bislang stets mit firmenspezifischen Frameworks gearbeitet habe (= arbeiten musste). Das ist nicht schlimm, aber Stackoverflow und Google fallen bei Problemen einfach weg - man ist auf die Hilfe von Kollegen angewiesen.

Phoenix schickt sich an ein Fullstack-Framework zu sein. Leider kann der Browser (noch) kein Erlang/Elixir, daher kann es per Definition nicht so Fullstack sein wie Meteor. Aber es deckt alle Bereiche einer Webanwendung ab. Und sogar noch mehr: “Channels” abstrahieren Verbindungsprotokolle aller Art, *inklusive* Websockets. Man kann also seine iPhone-App über Phoenix mit seinem Toaster in Echtzeit verbinden - die Zukunft ist Internet of Things - und nur Phoenix ist dafür wirklich optimiert! Meteor ist am Anfang für reines Browser-Server schneller zum Entwickeln, Phoenix ist aber ungleich mächtiger.

### Anwortzeiten

Achtung! Folgender Vergleich hinkt gewaltig, zeigt aber ungefähr die Richtung an.

Bei **PHP** erfolgt immer erst das Bootstrapping. Eine Produktivantwortzeit von 200ms ist für ein großes Framework schon recht gut.

In **Node.JS** findet das Bootstrapping beim Start statt. Die Antwortzeiten sind also entsprechend kürzer. (<100ms?)

In **Java** habe ich mal an einer Websphere Application mitgewirkt. Diese Anwendung hat mehrere GB RAM verschluckt und mit einer Oracle-DB gesprochen. Dort waren Antwortzeiten von 10ms auf dem Testsystem sehr gut.

Bei Webseiten-Aufrufen in **Phoenix** werden Antwortzeiten im Log in µs angegeben. In **µs**!!1elf! Klar ist das das Helloworld Beispiel da es so richtig große Anwendungen noch nicht gibt, aber es zeigt die Richtung schon recht gut an.

## Teil 3: Elixir tatsächlich lernen

So, nun sind alle motiviert, doch tatsächlich was neues zu lernen, ja? Das ist alles ganz furchtbar viel besser als alles dagewesene. Ja, richtig, aber es gibt wie immer einen Preis zu zahlen:

### Funktionale Programmierung: unfassbar anders

1.  Funktionale Progammierung != Imperative Programmierung .. einen Haufen Funktiönchen zu programmieren ist schon sehr anders als in PHP zu coden. Tannenbaum-artigen Code zu programmieren ist praktisch nicht möglich. Die Prinzipen von Clean Code befolgen ist damit wesentlich naheliegender.
2.  In Erlang und damit Elixir sind alle Variablen per Definition unveränderlich (immutable). Elixir erlaubt zumindest Dinge wie x = x + 1 -- Erlang selbst nicht. Selbst beim hinzufügen von neuen Elementen in riesengroße Listen wird stets eine neue erzeugt. Allerdings in der Form [ item | tail ] - d.h. die neue Variable hat den neuen Eintrag und einen Verweis auf den Rest der Liste.
3.  "=" weist keine Werte zu sondern "macht gleich". Das ist ein riesen Unterschied, Stichwort "Pattern Matching". Im Buch so "I do not think it means what you think it means." Es ist unfassbar, was für abgefahrene Konstrukte damit möglich sind.
4.  Wenn eine Funktion mehr als 10 Zeilen hat und diese nicht per |> verbunden sind macht definitiv was falsch. Siehe 1.

### Naturgesetze wanken

Aber Elixir beweist auch folgendes: (zitiert nach "Programming Elixir" S.9) 1. OOP ist nicht der einzige Weg um Code zu designen 2. Funktionale Programmierung muss nicht komplex oder mathematisch sein 3. Die Grundlagen von Programmierung sind nicht Zuweisungen, ifungen und Schleifen 4. Parallelität braucht keine Locks, Semaphoren, Monitors und sowas 5. Prozesse sind nicht notwendigerweise teure Ressourcen 6. Auch wenn es Arbeit ist, programmieren sollte Spaß machen 7. Mühsam erlernte OOP “Patterns” im Enterprise-Bereich sind nahezu alle komplett hinfällig, dadurch dass man in einer höheren Abstraktionsebene arbeitet. Allgemein gilt: immer wenn man beim täglichen Coden entfernt an “Pattern” denkt für das was man grade tut, ist das ein sicheres Zeichen für eine Schwachstelle meiner Programmiersprache. Nur Sprachen mit “hygienix/homoiconic macros” sind gegen diese Schwäche Immun, das wären Lisp (-> Clojure, Scheme) und Elixir soweit als bekannte Vertreter.

Elixir ist nicht der helige Gral, aber es gibt auch nicht den einen wahren Weg zu programmieren - genau wie es nicht den einen Gott gibt. Aber es ist anders genug als der Mainstream um dir eine andere Perspektive zu geben - also deinen Geist zu öffnen und neue Wege einzuschlagen über Programmierung nachzudenken.

> Funktionale Programmierung bricht verkrustete Denkstrukturen auf.

### Buch "Programming Elixir" von Dave Thomas

Es gibt derzeit noch kein deutsches Buch zum Thema Elixir. Aber es gibt schon ein paar sehr gute englische Bücher zum Thema. Den besten Einstieg für fortgeschrittene Anfänger bietet wohl "Programming Elixir" von Dave Thomas.

Auf heise developer gibt es einen Einsteiger-Artikel zu Elixir, der allerdings etwas ungenau ist (vornehm ausgedrückt).

Wie oben beschrieben habe ich den 1. Teil mittlerweile durchgearbeitet (wichtig! lesen geht schneller als verstehen und selber machen!) und kratze den 2. Teil an. Aber der ist Stand heute fakultativ wenn man mit Phoenix anfangen will.

Mithilfe dieses Buches habe ich mir das erste Mal strukturiert eine Sprache autodidaktisch erschlossen. Die "You turn" Übungen sind zumeist bekannte mathematische/programmiertechnische Probleme wie Primzahlen, Fibonacci-Zahlen, Map&Reduce nachbauen, String-Operationen nachbauen usw. Nicht sehr sehr schwer aber fordernd.

### Mein Aufwand fürs Lernen

Ich schreibe diesen Blog-Artikel am Ende meines zweiwöchigen Urlaubs in den Österreicher Alpen - genauer im Asten-Tal auf 2050m Höhe. Ein Urlaub ist m.E. die perfekte Grundlage um sich mit fundamental Neuem zu beschäftigen. Nicht dass man seinen ganzen Urlaub vor dem Laptop verbringen soll, ganz bestimmt nicht. Aber nach einer ausgiebigen Wanderung kann man abends a) bei Obstler und Wein vorm Fernseher versacken oder b) den erfrischten und befreiten Geist nutzen und sich Dinge belesen die einen interessieren. In einen Winterurlaub vor ca. 5 Jahren habe ich "Der Pragmatische Programmierer" gelesen. Ein Buch für das ich im Alltag wohl Monate gebraucht hätte. So aber war es innerhalb einer Woche inkl. Hin- und Rückfahrt durchgelesen. Im Urlaub gilt die Maxime: kein Bock = chillen, viel Bock = lesen & probieren. So hab

Ich habe so 1-2 Stunden am Abend gelesen und/oder probiert. Einmal auch den ganzen Abend (5h). Die Woche vor dem Urlaub so 2-3 Abende mal reinlesen. Insgesamt lässt sich der Aufwand nur schlecht schätzen. Vielleicht so 40h bislang? Vielleicht 50h?

Egal, am Ende zählt vor allem eins: der Spaß und der Kick des "Aha" Erlebnisses - und die "Energie des Verstehens" (Zitat: Stefan Münz, SelfHTML)

### Beispiele zur Motivation

Folgende Beispiele sollen Lust zum Probieren machen.

#### Primzahlen berechnen

Meine erste Variante mit einen guten Beispiel für Pattern-Matching:

    defmodule Prime do
      def search(from, to) do
        for n <- from .. to, _isprime?(n, n-1), into: [], do: n
      end

      defp _isprime?(_, 0), do: false
      defp _isprime?(n, 1) when n > 2, do: true
      defp _isprime?(_, 1), do: false # für 2 :(
      defp _isprime?(n, num) when rem(n, num) == 0, do: false
      defp _isprime?(n, num), do: _isprime?(n, num - 1)

    end


Meine finale und gefühlt beste Lösung in der 4. Iteration mit einer zweifach gefilterten List Comprehension:

    defmodule Prime do
      def search(from, to) do
        alle = Enum.to_list(from .. to)
        teilbar = for n <- from .. to, m <- from .. to,
          m < n && n > 1, # Filter 1
          m > 1 && rem(n,m) == 0, # Filter 2
          into: [], do: n
        alle -- teilbar
      end
    end


Aufruf in `iex` jeweils mit:

    Prime.search(1,10)


#### Fibonacci Zahlen berechnen

Als einfaches Modul:

    defmodule FibSolver do

      def fib(anzahl) do
        liste = for n <- 1..anzahl, into: [], do: fib_calc(n)
        IO.inspect liste
      end

      defp fib_calc(0), do: 0
      defp fib_calc(1), do: 1
      defp fib_calc(n), do: fib_calc(n-1) + fib_calc(n-2)

    end


Die 37 Fibonacci-Zahlen werden dann wie folgt berechnet (nach rd. 5 Sek.):

    FibSolver.fib(37)


Ergebnis:

    [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817]


Mangels Caching dauert die Berechnung größerer Zahlen ewig. Max hat das Beispiel unter Nutzung von Listen noch etwas beschleunigt, inklusive Doc und Spec: [elixirplayground.com/?gist=1dfd7f1d8dbc6afb1f3d][4]

Und nun noch als Prozess-Agent, der zudem einzelne Ergebnisse cacht.

    defmodule FibAgent do

      def start_link do
        cache = Enum.into([{0, 0}, {1, 1}], HashDict.new)
        Agent.start_link(fn -> cache end)
      end

      def fib(pid, n) when n >= 0 do
        Agent.get_and_update(pid, &do_fib(&1, n))
      end

      defp do_fib(cache, n) do
        if cached = cache[n] do
          {cached, cache}
        else
          {val, cache} = do_fib(cache, n - 1)
          result = val + cache[n - 2]
          {result, Dict.put(cache, n, result)}
        end
      end
    end


In `iex`dann so:

    {:ok, agent} = FibAgent.start_link()
    for n <- 1900 .. 2000, do: IO.puts "#{n} -> #{FibAgent.fib(agent, n)}"


Die Ausgabe dann nach rd. 3 Sekunden so:

    ...
    2000 -> 4224696333392304878706725602341482782579852840250681098010280137314308584370130707224123599639141511088446087538909603607640194711643596029271983312598737326253555802606991585915229492453904998722256795316982874482472992263901833716778060607011615497886719879858311468870876264597369086722884023654422295243347964480139515349562972087652656069529806499841977448720155612802665404554171717881930324025204312082516817125


Elixir kann also richtig ordentlich rechnen.

## Fazit

Die Lernkurve von Funktionaler Programmierung und Elixir hat sich für mich erst flach, dann zunehmend steiler angefühlt. Am meisten hab ich beim Probieren rund um die "Your turn" gelernt. Bis so ein Primzahl-Algorithmus läuft, den kann man schon auf rund 4 Arten und Geschmacksrichtungen implementieren.

Elixir Programmierer nennen sich selbst Alchemisten. Ich nenn mich derzeit Alchemist Rookie, da ich immernoch am Anfang der Möglichkeiten von Elixir, Erlang OTP und Phoenix stehe. Aber konsequentes Lernen ebnet den Weg zum Alchemisten. Womöglich löst Elixir demnächst PHP und Javascript (im Backend) im Tagesgeschäft ab.

Also, los gehts! Lasst Elixir und Phoenix Mainstream werden!

Vielen Dank auch an @Hisako1337 für Denkanstöße, das Review und einige Fachliche Korrekturen und Anmerkungen!

 [1]: http://codeforchemnitz.de
 [2]: http://appserver.io
 [3]: https://gist.github.com/omnibs/e5e72b31e6bd25caf39a
 [4]: http://elixirplayground.com/?gist=1dfd7f1d8dbc6afb1f3d
