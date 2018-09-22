---
layout: post
title: Workshop "Pragmatic Event Sourcing" zum #PHPDD18
date: '2018-09-21'
---

Ich beschäftige mich mit dem Thema Event Sourcing schon seit ich zur #PHPDD17 erstmals bei Talks von @Ocramius und Alexander Miertsch davon gehört habe. Mein Ziel ist klar, damit irgendwann ein Projekt zu realisieren. Aber neue disruptive Konzepte erfordern Übung - also von den Besten lernen und in kleinen Projekten und Prototypen lernen.

## Katas

Prooph ist quasi **das** Event Sourcing Framework - besser: eine Komponenten-Sammlung. Trotz eines Grundverständnisses des Konzeptes hab ich aber nach wie vor Probleme mich in der Komplexität von Prooph zurechtzufinden. Vermutlich geht es anderen ähnlich, denn die Core Contributer entschieden sich vor kurzem, viele von deren Paketen zu droppen und sich auf den Kern zu konzentrieren. 

Es gibt natürlich das [Prooph Cargo Beispiel](http://codeliner.github.io/php-ddd-cargo-sample/) und auch [Buttercup Project](http://buttercup-php.github.io/protects/)

@morrisjobke hat mir zudem dankenswerter weise ein privates Projekt auf Basis Slim und **Prooph** zur Verfügung gestellt. Irgendwie ist mir das zu viel, ich möchte einfach minimal Event Sourcing machen. Prooph ist wie React (oder Angular) - es löst sicherlich allerhand large scale Probleme - aber zum lernen ist die Lernkurve einfach zu steil - zumindest für meine kognitive Leistungsfähigkeit abends auf der Couch.

Also hab ich mich hingesetzt und einen minimalen eigenen Prototyp gescribbelt. Das stellte sich für mich als ideale Voraussetzung für den Workshop heraus. Ok, ich hatte da sogar schon CommandBus und EventBus, sowie AggregateRoot drin - stellt sich heraus, braucht man gar nicht zwingend.

Weiterlesen zu Event Sourcing:
- [Martin Fowler: Event Sourcing (2005)](https://martinfowler.com/eaaDev/EventSourcing.html)
- [Why use Event Sourcing? (2010)](http://codebetter.com/gregyoung/2010/02/20/why-use-event-sourcing/)
- [Event Sourcing, overcoming the monolith (2017)](https://engineering.talkdesk.com/event-sourcing-overcoming-the-monolith-c1a14b2bd26a)
- [PhpFriendsOfDdd / state-of-the-union](https://github.com/PhpFriendsOfDdd/state-of-the-union)
- [Eventsourcing: Why Are People Into That? (2016)](https://adaptechsolutions.net/eventsourcing-why-are-people-into-that/)
- [Kickstarter: Event Sourcing made Simple (2018)](https://kickstarter.engineering/event-sourcing-made-simple-4a2625113224)
- [Talk: Decoupling with (Domain-)Events (2013, PDF)](https://qafoo.com/talks/13_12_symfonycon_domain_events.pdf)
- [Event Sourcing is not a messaging integration pattern (2016)](https://carlosbuenosvinos.com/event-sourcing-is-not-a-messaging-integration-pattern/)
- [DDD, Hexagonal, Onion, Clean, CQRS, … How I put it all together (2017)](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)

Weiterlesen zu Prooph:
- [Talk zu Prooph Micro zu #PHPDD17](http://prooph-software.de/blog/PHP-Developer-Day-2017-talk-prooph-micro.html#blog-text)
- [The future of prooph components (2018)](https://www.sasaprolic.com/2018/08/the-future-of-prooph-components.html)
- [Prooph: CQRS+ES in PHP. How to use. (2017)](https://pilsniak.com/cqrs-es-php-prooph/)

## Workshop Kickoff

Zunächst gab es ein paar einführende [Slides](https://pragmatic-event-sourcing.de/pragmatic-event-sourcing.pdf). 

- herkömmliche Persistierung -> direkt in DB schreiben
- Absicht für Schreioperation fehlt - Warum wurde gespeichert?
- nur der aktuelle Stand ist bekannt (keine Historie)
- Concurrency ist ein Problem - bei parallen Aufrufen (z.b. mehrere Tabs) der zuletzt schreibt, gewinnt

Wo es gar nicht anders als mit Event Sourcing geht: Bankkonto, Versionskontrolle :)

### Event Sourcing

**Events**

- sind passiert, können nicht geändert werden, nicht zurückgenommen werden (ungeschehen machen)
- können nur durch ein anderes Ereignis rückgängig gemacht werden
- Eventname transportiert die Absicht
- verschiedene Events können die selbe Information ändern
- viel Information und Kontext kann über gute Eventnamen transportiert werden - specifische Business relevante Infos

**Sourcing**
- erstellt aktuellen Zustand aus einer Liste an Ereignissen -> (re)creation
- automatisch bekommt man eine History: inkl. point-in-time recovery
- Konflikte können trotzdem vorkommen - aber Auflösung wird erzwungen

- Replay aller Events bei jeder Aktion
- Performance? Recreation ist teuer
- Lösung: Projektion (Projection)
- verschiedene Projections für verschiedene Zwecke - enthalten direkt die künftige Ausgabe (JSON, HTML, XML, whatever)

### CQRS

- separiert Lesen (reads) von Schreiben (writes)
- HTTP Protokoll ist dafür entwickelt es genau so zu realisieren :)  -- GET + POST
- POST ist ein **Command**, ändert State am Server
- GET ist ein **Query**, holt Darstellung vom Server
- beim Lesen brauch ich keine komplexen Objekte und Validierungen
- nur beim Schreiben brauch ich das
- also: lesen nutzt direkt die Projection, schreiben das komplexe Domain Object mit Validierung uvm.

### Workshop-Thema: Checkout :)

- Welche Events können passieren
- zunächst muss man den Prozess verstehen
- andere Kollegen haben oft ein anderes Verständnis eines Prozesses
- WAS passiert und WARUM passiert es - und wie will man es in der Zukunft haben
- Lösung: **Event Storming**!

### Event Storming

- alle die involviert sind in einen Raum zusammenbringen
- alle Fragen der Kunden mit reinnehmen
- Prozess muss weit genug weg sein von technischen Aspekten aber nah genug dran um es später auch abzubilden
- verschiedenfarbige Klebezettel je Typ
  - "Domain Event" -> orange
  - "Command" -> blau
  - "Aggregate" -> gelb
  - "Read Model" (Projection) -> grün
- Zettel gibt es fertig: [EventNotes](http://eventnotes.io/), es gehen sicher auch verschiedenfarbige PostIts
- mehrere Ereignisse für ein Command ? mit (gelben) Klebeband werden Lanes abgetrennt - lässt sich besser gedanklich dann trennen
- all das klebt man an ein Whiteboard "Time line" - muss aber groß genug sein
- ein Flipchart ist zu klein und hochkant
- Leute lesen Zeitlinien von links (Vergangenheit) nach rechts (heute/Zukunft)

Vorgehen:
1. alle Events sammeln die vorkommen können
2. Dubletten herausfiltern - ein Wort für ein Ding finden
3. überlegen ob die Events alle relevant für den Prozess sind
4. nur Prozesse bauen die man wirklich braucht, was wirklich wegautomatisiert werden soll (nur was sich lohnt, nicht alles)

- man kann kleinere Aggregate bauen, man muss nicht riesen klassische Domain Objects bauen

Naming things..
- Event Name: geschrieben in Passiv, Vergangenheit
- Aggregate: Subjektiv, ein Ding
- Command: geschrieben im Aktiv, wird passieren, Handlungsanweisung
- Read Model: Subjektiv ggf. mit adjektiven zur näheren Spezifizierung

- Read model: JSON nur speichern wenn man es an eine API ausgibt, für HTML Ausgabe gleich direkt HTML speichern
- gern auch 2 oder 3 Projections für verschiedene Zwecke erstellen

## Let's code!

Los ging es. Sebastian an der Tastatur, Arne als Erklärbär an der Wand. Anfangs hab ich noch versucht dem Code mitzuschreiben, aber das anfängliche moderate Tempo zog ziemlich schnell an und ich kam nicht mehr hinterher. - wir hatten viel Stoff zu schaffen. Da auch nach jedem größeren Wurf commitet und gepusht wurde, konnte man den Stand aber immer wieder lokal dazuschaufen und selber durchschauen.

*Nachfolgend hab ich meine Notizen, also die für mich interessanten Aspekte, in Frage-Antwort-Form notiert. Frage gedanklich von mir, beantwortet bzw. vorgeturnt von Arne (meistens)*

Kein Basis-Framework?
- kein Framework (für ES)! wir bauen alles selbst :)  nur an einer Stelle gibts wirklich ne DB-Anbindung
- besser: starte einfach, verstehe was man wirklich braucht, nutzt später bei Bedarf stärkere Tools
- (später kommt Slim als FE Mini-FW zum Einsatz)

Warum Classmap Autoloading? 
- Dateien & Verz so strukturieren wie es Sinn ergibt, und nicht wie es technisch nötig ist.
- einfaches Refactoring durch Datei verschieben möglich

Wirklich immer `strict_types`?
- in PHP 7 ist "declare(strict_types=1);" keine Diskussion

Naming things - Methoden:
- `set` statt `add` - wenn man nur ein Ding statt mehrere setzen will
- `apply` statt `handle` für Event Anwendung
- wichtig ist sich auf jeweils einen Begriff zu verständigen

Wie die richtige Event Behandlung bestimmen?
- `instanceof` bei Event class Bestimmung ist problematisch weil es hart gegen eine konkrete Klasse gekoppelt ist, daher Brücke über Topic Instanz 
- zudem kann man später beim asynchronen Event Stream das Topic abonnieren
- `switch(true)` für mehrere Auswahlen.. statt `if else if else if`

Events sollten doch asynchron verarbeitet werden?
- wir bauen alles syncron, weil bei asyncron gibt es viele "what-if"s zu beachten 

Was beinhaltet mein Read Model?
- Read model wird für den Use case optimiert - Warum und Was ist zu klären
- komplexe Projektionen können nachts auch komplett neu aufgebaut werden

Müssen wir wirklich auch für Arrays Value Objekte bauen?
- "no arrays" as return type - immer "XyzCollection" - array kann alles enthalten..

Warum gibts für das schreiben einer Projection so viele Klassen?
- Projector sind EventHandler 
- Renderer kann nicht direkt ein EventHandler sein, wg. S in SOLID

Warum `asString` bei Value-Objekten?
- Fkt. `asString` an Value-Objs für mehr Aussagekraft als implizites magic `__toString`

Nutzt ihr/kennt ihr Generatoren für Value Objects? 
- Nö, die sind trivial genug und schnell zu schreiben

Wie schneidet ihr eure Exceptions?
- eine Exception-Klasse je Bereich, Interface, Klasse, damit man es trennen kann. 
- der Text ist meist nicht so wichtig wie der Intent über den Exception-Namen

Meinung zu PHP-FIG Komponenten:
- Request Response brauch man nicht implementieren wenn man nicht externe Komponenten nutzen möchte. 
- Sollten eigentlich GetRequest, PostRequest mit spez. Funktionen sein
- PHP-FIG -- Framework Interop Group  -- ermöglicht die Zusammenarbeit zw. Frameworks
- Komponenten kommen mit reichlich Bloat den man meist nicht braucht

Cart/Checkout und Order sind unterschiedliche Aggregate mit unterschiedlicher ItemList?
- wenn etwas einen anderen Kontext angehört, muss es eigene Objekte und Items haben, auch wenn diese exakt ähnlich zu bestehenden eines anderen Kontextes sind. Mapper für Datenübernahme
- -> Cart/Checkout und Order sind verschiedene Domains, daher sind es zwei verschiedene Aggregate 
- -> Bounded Context ist dadurch berücksichtigt

Anekdote:
- booking.com hat die größte MySQL Install in der Welt
- aktualisieren bei Datenänderungen ihre massiv vielen Projections
- dadurch sind aber alle Abfragen instant da

Warum UUID als ID?
- Primarykey ID ist Implementationsdetail der DB, darf nicht außerhalb verwendet werden

Was ist wenn ein Aggregat sehr viele Ereignisse hat? 
- Lösung: Snapshot - ist wie ein Squash Commit :)
- sammelt alle Events zusammen, macht einen Snapshot-Event mit all den Daten  -- und schmeißt dann alle alten Events weg
- (unterscheidet sich mit dem Ansatz von Prooph)

Data in der Event-Tabelle ist PHP serialized. Was ist wenn die Value-Objekte sich ändern?
- PHP unserialisiert es trotzdem - hat man halt ein paar Null Werte
- man kann aber Korrektur-Events dazubauen

Was ist wenn man Events wg. DSGVO löschen muss?
- Steuergesetz schlägt DSGVO Löschansprüche :) (im Ecommerce relevant)
- ansonsten Snapshots und relevante Daten auslassen
- oder Events löschen

## Sidekicks

Spannend ist ja für mich, was ich sonst noch so aus dem Tag mitnehme, neben dem Stoff, Code, Architektur usw.
Da wäre zum einen die routinierte Arbeit von Sebastian. Hier mal eine Methode per Shortcut nach oben geschoben, da mal ein Interface heraus refaktorisiert. Und ich dachte ich kenn PhpStorm - aber Cmd+N in Funktionen und Klassen war mir neu. Und wie verschiebt man ganze Funktionen?

Und natürlich war da noch der [localheinz](https://github.com/localheinz), der gleich mal kurz nach Start schon die ersten PRs auf Github eingereicht hat. Hier mal PHPStan drüber laufen gelassen, dort in die [Composer Script Aufrufe fürs Tooling eingebaut](https://github.com/thePHPcc/phpdd18-event-sourcing/pull/7/commits/ed8dfe0138f439d28d0aecac71107ece24aea5ff), da die [EditorConfig](https://github.com/thePHPcc/phpdd18-event-sourcing/pull/3/commits/edb8ea3c0eaa7a0b2e087f23a0de7bfce076a21d) eingeführt ([Spez](https://editorconfig.org), [PhpStorm Plugin](https://plugins.jetbrains.com/plugin/7294-editorconfig)). Und zack, mal eben die Lösung für ein Problem mitgenommen, was wir bei Axilaris schon eine Weile versuchen zu lösen.

Slim kam als schlankes Framework zum Einsatz. Schön zu sehen, dass unsere Technologie-Entscheidung für ein schlankes PHP-Basis-Fw nicht ganz daneben war. Danke @morrisjobke für den Tipp.

## Repo zum Nachlesen

Ein Tag vor dem Workshop ging auch dessen Homepage auf Sendung. **[pragmatic-event-sourcing.de](https://pragmatic-event-sourcing.de)** Just in time :) Und mit den Slides!

Das Repo vom Tag findet sich bei Github [thephpcc/phpdd18-event-sourcing](https://github.com/thephpcc/phpdd18-event-sourcing).

Der Start-Zustand ([Commit](https://github.com/thePHPcc/phpdd18-event-sourcing/tree/4e22606fe7145ca01f5089c41928d1c8f8abb66d))

![Anfang](/files/2018/workshop-anfang.png)

Der End-Zustand ([Commit](https://github.com/thePHPcc/phpdd18-event-sourcing/tree/21386140b9215a1e6c0d435f17ae730e35ec4abe))

![Ende 1](/files/2018/workshop-ende-1.png)
![Ende 2](/files/2018/workshop-ende-2.png)

## Schlusswort

Ein anstrengender Tag geht zuende. Selbst was wirklich gemacht hab ich zwar erst gegen 16 Uhr, aber in der kurzen Zeit konnte zumindest noch eine wesentliche Frage geklärt werden: Wer kennt/bekommt das Request Objekt.
Spaß beiseite. Es war anstrengend, anstrengend weil es ungewohnt ist anderen beim entwickeln zuzuschauen, die auf Englisch erklären Gedankengänge zu verstehen und damit die Überlegungen und Designentscheidungen nachzuvollziehen. Aber Lernen basiert auf Wiederholung. Und vieles wiederholt sich ja: Value Objekte extrahieren, Interfaces rausziehen, Klassen zerlegen und damit entkoppeln.

Für mich war es der erste Workshop, deswegen ist es mir ein Bedürfnis die Eindrücke zu notieren. Vielleicht nützt es den einen oder anderen was. Gerade die starken Meinungen der "alten Hasen" sind nicht jedermanns Geschmack. Ich persönlich überlege dann oft, in wieweit ich mein eigenes Weltbild korrigiere.

Ein großes Dank geht an die Crew rund um PHP UG DD die die PHP DEV DAYS ermöglichen und das Experiment mit einen Workshop-Tag gewagt haben. Hoffentlich gibt es eine Neuauflage in 2019. Ich wäre sofort dabei.
