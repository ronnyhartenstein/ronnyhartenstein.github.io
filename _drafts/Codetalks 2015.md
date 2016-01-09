# Code.talks 2015

## Zusammenfassender Eindruck

Mit wachsenden Mengen schlechten Code haben nahezu alle zu kämpfen weil sie im Featureitis-Marktdruck-Rad mitlaufen. Der Weg daraus ist anstrengend und Tech-lastig.

Microservices ist der Hype und ist für viele der Weg von einen schlecht skalierbaren und starren Monolithen hin zu einen skalierbaren und wartbaren Umgebung. Kleine leichtgewichtige Prozesse die über ein Protokoll (JSON) miteinander reden.

Überall dröhnt es auf einen ein: Lernt FTW (oder stirb!). Paradigmen, Tech, Softskills, fordere dich selbst hart und oft. Wer sich nicht weiterbildet, ist irgendwann nicht mehr beschäftigbar weil zu teuer bzgl. des produzierten Ergebnisses..

## Kickoff

* 1200 Anfragen nach Ticket-Sellout (zusätzlich zu den 1500 verkauften Karten)
* kein Kino nächstes Jahr
* Zukunft ist recht kurz, 1 Jahr, dann ist die nächste Zukunft da
* Skalierung: "da muss mal ein bisschen System rein"

## Startup-Code vs. Enterprise-Code

* Slides: ?
  
* Speaker: Sebastian Bernt
  
* Prädikat: **sehenswert**
  
* ## Key-Learning: Wir haben Startup-Code und das ist normal. Microservices FTW!
  
* "wann das Geld alle war, sieht man dem Code an"
  
* "Refactoring? bei soviel Code? im laufenden Betrieb? OMFG!"
  
* Code doppelt pflegen?
  
* permanent unter Hochdruck blöden Code produzieren -> konnte man sich fachlich im Kopf weiterentwickeln?
  
* Startup-Code: funktioniert, skaliert wenig, unstrukturiert, hoher Wartungsaufwand
  
* Enterprise-Code: skaliert, strukturiert, wartbar, komplex, kompliziert, nicht performant, aber: auch hoher Aufwand für Erweiterungen
  
* Entwickler -> Fachidioten
  
* Lösung: Microservices!
  
* Was ist noch "Micro"? alles was in 2 Personenwochen entwickelt werden kann
  
* Micro-SOA ist nicht:
  
  ``` 
  * MVC Anwendung mir vielen Endpoints
  * API im Legacy-Code
  * viele APIs mit vielen Standards/Protokollen
  * **ABER**: alles erlaubt in Übergangsphase!
  ```
  
* **M-SOA ist OOP** (Objekte mit Zuständen)
  
* Change-Management -> nur mit dem TEAM
  
  ``` 
  * zum erreichen des nächst besseren stabilen Zustand
  * -> Plan finden -> Team verkaufen, vorleben -> Team reinziehen
  * -> bestehendes Team wehr sich gegen das wegschmeißen, weil es funktioniert ja
  * -> holt die Leute ab die Fehler gemacht haben
  * -> warum wurden diese gemacht?
  ```
  
* Devs sind flexibel und anpassbar

## Two-Stack-CMS

* Speaker: Robert Lemke @robertlemke, Arne Blankerts @arneblankerts
  
* Slides: ?
  
* Prädikat: unterschätzt
  
* ## Key-Learning: Aggregated Content Store ist kein Cache aber genauso schnell
  
* Vortrag & Diagramm basiert auf Artikel von Martin Fowler (URL?)
  
* CCS = Content Creator Stack
  
* CDS = Content Delivery Stack
  
* Seiten müssen instant da sein
  
* Aggregated Content Store != Cache
  
* -> tolle Brücke für Integration verschiedener Dienste
  
* -> Security als Abfallprodukt :)
  
* -> kein Backend beteiligt
  
* z.B. mit Redis (nginx Modul)
  
* Neos: schickes hochindividuell anpassbares CMS mit inline-editing
  
* -> Suche mit Elasticsearch
  
* -> Suche ist als Service herauslösbar
  
* MySQL skalieren ist viel schwieriger als Redis
  
* Code zur Erstellung ist gleich zu Caching, aber der Ausführungszeitpunkt ist anders

## Tour of language landscape

* Speaker: @theburningmonk
  
* Slides: ?
  
* Prädikat: take the red pill
  
* ## Key-Leanings: lerne neue Paradigmen statt neue Syntax

**#F**

* type writers -> compile time validation
* pipes -> "clean code is visual thinking"
* unit-of-measure
* precise interface defs! für Funktionen nutzen!

**Rust**

* mem safe w/o GC
* immutable
* borrowing pointers (!!)

**Idris**

* "the more types, the more bugs fetched by compiler"
* TDD - type driven development

**Elm**

* functional reactive programming
* Signals: value over history

**How to learn?**

* challenging yourself
* at least 20 hours (Josh Kaufman)
* learn new paradigma not a new syntax

## Change or die!

* Speaker: Alexander Jäger
  
* Slides: ?
  
* Prädikat: empfehlenswert
  
* ## Key-Learning: embrace yourself. bewußt leben, lernen und agieren
  
* der der Abends am längsten sitzt hat es noch nicht begriffen
  
* statt Burnout gleich Karoshi - einfach tot umfallen
  
* Schwarmdumm lesen
  
* Tribal Leadership: Einheit "Dunbar" (Wiki: [Dunbar-Zahl](http://de.wikipedia.org/Dunbar-Zahl))
  
* (fun-fact: Wer hat mehr als 150 Freunde auf FB? und Bekannte im echten Leben?)
  
* Spiral Dynamics
  
* Freiheit ist, sich nach einer Aktio vor einer Reaktio aktiv zu entscheiden.
  
* Was verändern?
  
* Daniel Pink -> "What drives you?"
  
* Viktor Frankl (Leseempfehlung! TODO Welches Buch? in den Slides?)
  
* bei Impacts **rückt** die Familie zusammen, Firmen werfen Leute raus
  
* Meta-ebene: Beobachter-Position in den eigenen Gedanken einnehmen

## CQRS, DDD etc. bei flyeralarm

* Speaker: Verena Ruff
  
* Slides: ?
  
* Prädikat: **spannend**
  
* ## Key-Learnings: von Legacy zu Micro-SOA dauert, betrifft nicht nur Tech sondern auch das Team
  
* Programmierung ist nur ein Teil der Softwareentwicklung
  
* SOLID Entwicklerparadigma
  
* Proof-of-Concept von Domain-driven development (DDD) und CQRS (Command-Query-Responsibility-Segregation, vereinfacht Trennung zw. Lesen und Schreiben
  
* umfangreiches internes Schulungsprogramm:
  
  ``` 
  * -> neues Projekt, grüne Wiese, neue Techniken testen
  * jedes Team 1 Quartal lang -> 5x Teams = 5 Quartale (sind nun durch)
  * Scaling Agile -> SAFe (Dean Leffinwell), LeSS, ScalingScrum
  ```
  
* Abhängigkeiten per composer gemanagt
  
* agile Teams -> funktioniert nicht firmenweit -> z.B. nicht für Papier-Produktion
  
* -> autarke Teams vs .Das große Ganze
  
* Workshop:
  
  ``` 
  * Team-Regeln: nicht zu viel, nicht zu wenig
  * Rollen! lead tech, QA, method guru, OPS, UX, dev
  ```

## Microservice Testing

* Speaker: Per Bernhardt @perprogramming
  
* Slides: ?
  
* Prädikat: schwer zu folgen (für mich)
  
* ## Key-Learning: ordentliches Testen von MSOA ist herausfordernd
  
* basiert auf Martin Fowlers (@martinfowler) original Artikel "Microservice Testing"
  
* Unit Tests:
  
  ``` 
  * solitary -> alleinstehend
  * social -> zusammenarbeitend
  ```
  
* Controller testen? DI? also kein ServiceLayer :8
  
* -> frei von Logik halten -> muss man nicht testen
  
* Integrations Test: Wie reagiert Gateway?
  
* ``` 
  Configdaten richtig? Schemas richtig?
  ```
  
* Guzzle: MockHandler
  
* SQlite: in memory
  
* Contract Tests -> hauptsächlich für Micro-SOA
  
  ``` 
  * Vertrag macht der Consumer, nicht der Producer
  *
  ```
  
* Testpyramide: je höher der Fehler auftritt, desto schwerer das Debugging
  
* Prio der Tests nach Aufwand/Nutzen

## Managed Chaos

* Speaker: Johanes Manusch @docjoe
  
* Slides: ?
  
* Prädikat: auch für PM unbedingt empfehlenswert
  
* ## Key-Learning:
  
* simpel -> kompliziert -> komplex -> chaotisch
  
* Ziel von Softwarearchitektur: Änderungen einfach implementierbar
  
* 400 Bugs = symptomatisch
  
  ``` 
  * Tortentester: kann Gabel nicht mehr heben
  * Sport geht auch nicht, ist zu schwer
  * multiples Organversagen (in der Software)
  ```
  
* Chaos: Zustand morgen ist nicht heute ableitbar
  
* Unternehmen ist kaputt, wenn Management-Entscheidungen schneller kommen, als sie umgesetzt werden können = Stillstand
  
* (Mark Haddon "dog night time", enthält interessante Definition von "Chaos")
  
* "People ar ethe new gold"
  
* Video von Git-Projekten -> **Gors**
  
  ``` 
  * Software sichtbar machen
  ```
  
* Excel-Graph Teamgrößen -> 8-20% Kommunikations-Overhead

## PHP-Framework geschrumpft

* Speaker: @belanur
  
* Slides: ?
  
* Prädikat: im Kern spannend
  
* ## Key-Learning: MSOA mit REST mit PHP benötigt kein Framework, ist dann auch schnell
  
* "Lara-vel"
  
* stellt Minimalimplementierung von Router und Controller vor
  
* Apache Bench Helloworld -> 1ms Response
  
* Essenz von Microservices -> [belanur/minimal-rest](http://github.com/belanur/minimal-rest)
  
* 1 Service pro Domain
  
* REST-Service ruft andere Services auf
  
  ``` 
  * _Gateway_-Service enthält Verknüpfungs-Logik
  * (per DI können Implementierungen getauscht werden)
  ```
  
* fein granulierte Skalierung je Service
  
* einzelne Services als Docker-Container (?)
  
* wachsen von Services -> wann trennen? -> wenn es mehr als 1 Domäne abdeckt, Review

Warum PHP?

* "weil ichs kann"
* haben die Sprache im Griff
* kennen alle Eigenheiten

## Lügen, schlimme Lügen

* Speaker: Johann-Peter Hartmann
  
* Slides: ? (aber kommt definitiv!)
  
* Prädikat: BÄM! Pflichtlektüre!
  
* ## Key-Learnings:
  
* Dienst nach Vorschrift -> so wie es der Arbeitsvertrag verlangt
  
* Vertrag -> Risiken *vermeiden* (Warum nicht nur verringern?)
  
* Chaos Report (Kreisdiagram zu Erfolg von Software-Projekten)
  
* Cynefin - Sense making model
  
* 6 Leute, 6 Monate, 50% Zusatzaufwand, immer.
  
* Chaos-Report wurde angepasst -> Erfolg != in time & budget,
  
  ``` 
  * -> sondern beide Parteien erachten Projekt als erfolgreich
  ```
  
* Max(Features) == Min(Qualität)
  
* Vertrag "Fixed profit" -> auch Exploits
  
* Langzeit-Opportunismus: Langzeitprojekt ohne Doku
  
* komplexe Aufgabe = Standard in Projekten => "unvollständiger Vetrag"
  
* fixed time + fixed states geht nicht, außer mit sehr viel Buffer
  
* bei neuen Kunden: erst Werkvertrag später Dienstvertrag
  
* wenn Kunde komplett opportunistisch ist, gibts keine Lösung, nur andere Projekte von anderen Kunden stattdessen
  
* **wenn nach Storypoints abgerechnet wird, taugen sie nicht mehr für Metriken** (Burndown, Velocity)