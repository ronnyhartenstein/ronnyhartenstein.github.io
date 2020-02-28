---
layout: post
title: 'Scale Agile: Scrum Frameworks zum skalierten agilen Vorgehen - beim Agile Chemnitz Meetup'
date: '2019-11-09'
---

Gestern war ich mit einem PM-Kollege zum ersten Mal beim Agile Chemnitz Meetup. Im erstaunlich kleinen Kreis von 12 Leuten inkl. 3 Vortragenden gab es eine Mini-Konferenz zu Methoden um Scrum auf mehrere Teams zu skalieren. Vermutlich sind alle Projekte die in Chemnitz entwickelt werden zu klein für sowas. Oder die Reichweite des Meetups ist noch nicht gegeben. Denn was da an Input in kurzer Zeit vermittelt wurde, von Leuten die das tatsächlich leben, war unfassbar beeindruckend und lehrreich. Ein kleiner Erfahrungsbericht. Seht es mir nach, dass ich meine Hören-Schreiben-Mitschriften fast 1:1 hier reinkopiert habe. Fragen gerne per Twitter @rhflow_de

<!--more-->

Erfahrungen IBM:
- 10 Teams, max 8 Leute inkl. Master und PO
- PO je SCRUM Team - je nach Framework
- "Grooming" bedeutet auch "kleine Kinder im Chat anbaggern" - ist mittlerweile als Begriff verpönt, besser "Refinement" nutzen

"Scaled" .. viele Teams an einem Produkt

**zeitliche Entstehung** der vorgestellten Frameworks:
LeSS -> SAFe -> Nexus -> Scrum@Scale

weiteres Fw: "Discipline Agile"

alle Fws erweitern Scrum nur, die Regeln von Scrum bleiben erhalten

## LeSS (Large-Scale Scrum)

https://less.works/

- für 2-8 Teams,  danach "LeSS huge"
- ein PO, ein Backlog
- Retro je Team + Overall Retro
- Sprint Planning 2 unabhängig voneinander - außer wenn es Abhängigkeiten gibt
- ergibt Sprint-Backlog je Team

Daily:
- Kommunikation zw. Teams durch Vertreter -> nimmt an Daily vom anderen Team teil
- zwei Teams am gleichen Feature? ein gemeinsames Daily -> Nachteil: langes Daily
- Alternative: Scrum of Scrum -- je Team das Daily, dann ein Daily zw. Vertretern

Refinement:
- mit allen Teammitgliedern, wird an Story schon das zuständige Team zugeordnet
- mit Vertretern der Teams, auf grober Ebene, dann nimmt der Vertreter das ins Team mit und macht dort ein feineres Refinement

Review: 
- gemeinsam in einer einzigen Veranstaltung
- Messe/Basar - Team hat Stand/Raum, stellt Ergebnisse den POs/Stakeholdern vor

Retro:
- Team Retro
- Overall Retro mit Vertretern

LeSS Huge
- ein PO, mehrere Area-POs die bestimmtes Funktionsgebiet abdecken
- ein A-PO hat bis zu 8 Teams
- Beispiel: 3G bei Ericsson, ein Team Türme, ein Team Rollout in Länder, ein Team Software, tausende Leute
- BMW setzt es gerade ein


## SAFe (Scaled Agile Framework)

https://www.scaledagileframework.com/

- Big Picture auf Webseite -- Doku ohne Ende -- verliert man sich darin
- setzt IBM ein
- verbreitetste Scalierungs-Fw, auch das älteste
- verkauft sich gut beim Management, ist im Zweifel aber nur ein mechanischer Prozess der nicht gut funktioniert (wie alle) -> viel cooler wenn man von alter Schule kommt -- ist die große Gefahr
- Schaubild so komplex? hat auf jede Frage auch die Antwort
- zu SAFe gibts auch kleine Varianten
- Kanban ist auf dem Vormarsch - statt in Sprints arbeiten
- Agile Release Train -> Kernelement
- Scrum setzt erst bei fertigen Aufgaben/Stories an, der Teil davor fehlt Scrum
- technische Stories fehlen in Scrum, heißen hier "Enabler", helfen um "Architectural Runway" zu bauen (in SAFe v5)
- Design Thinking ist auch neu mit drin
- Gefahr ist, das es die Detail-Artefakte nicht ordentlich umgesetzt und implementiert werden
- besser an der Basis zu bleiben, Werte und Prinzipien übernehmen, aber "full-blown" ist zu viel, Manager müssen sich zu wenig bewegen
- das raussuchen was für das eigene Projekt funktioniert

## Nexus

https://www.scrum.org/resources/nexus-guide

- von den scrum.org Machern
- nur wenige Artefakte mehr als bei Scrum
- "Nexus Sprint Planing"
- "Nexus Sprint Backlog"
  - welches Team macht welche Story in welchen Sprint
  - Abhängigkeiten in farbige Kategorien: Menschen, Tech (API, Service, Server), Domain, Software (Lizenzen), Extern
  - phyiscal Board mit farbigen Zetteln die Abhängigkeiten aufzeigen
- 3-9 Teams sind so die Empfehlung
- "Nexus Daily Scrum"
  - findet vor den Team Dailys statt - mit Vertretern der Teams
  - Vertreter pflegen beim Daily Scrum die visualisierten Abhängigkeiten
- "Nexus Integration Team" -> ein PO, ein Scrum-Master, "Dev Team Members"
  - gibt DoD und DoR vor
  - ist u.a. technisches Architektur-Team
  - Vertreter zeitweise aus Teams reinholen für spezielle Integrations-Arbeiten
  - ist funktionales Team, verantwortlich dafür dass das nächste Release funktioniert
  - lösen Probleme die auf Einzelteam-Ebene nicht mehr klärbar sind, wie strategisch wichtige Refactorings
- arbeiten im Integration-Team haben Vorrang
- ab 3 weil mit 2 Teams kann man sich noch koordinieren
- ein Scrum-Master je Team, aber nur ein PO im Integrations-Team
- "ein guter Scrum-Master kann zwei Teams betreuen, ein sehr guter eins"

- "Nexus Sprint Review"
  - ein gemeinsamer Review

- "Nexus Sprint Retro"
  - mit Vertretern der Teams
  - danach in die Team-Retro
  - danach wieder mit Vertretern der Teams, darin werden Maßnahmen festgelegt

## Scrum@Scale

https://www.scrumatscale.com/scrum-at-scale-guide/

- von Jeff Sutherland
- organisches Wachstum, autonom agieren
- Veränderung von Prozessen frisst Energie, die bei Produktentwicklung fehlt
- erst skalieren wenn man mehrere Teams hat, Werte und Zeremonien verstanden sind und gelebt werden
- Produkt ist nicht nur Software
- Case-Study: Saab Military - Inkremente eines Düsenfliegers alle 3 Monate 
- im Vgl. zu SAFe und LeSS nur ein kleiner grober Rahmen, wie man es ausgestaltet muss man selbst herausfinden
- Schnittpunkte: 
  - Team-Level Process (Scrum Zeremonien)
  - Product & Release Feedback
- Scrum Master Cycle -> EAT (Executive Action Team) im Zentrum
- PO Cycle - EMS (Executive MEta Scrum) im Zentrum
- "Verändern" statt "Verbessern" - letzteres hat negativen Touch
- Scrum will gnadenlose Transparenz -> "Metrics & Transparency"
- gibt keine feste Vorgaben, haben aber Kriterien/Anforderungskatalog für jede Komponente im Schaubild

- Teamgröße mit wenigster Reibung lt. Harvard-Studie -> 4-5

**Scrum Master Cylce**
- SoS = Scrum-of-Scrums -> max. 5 Teams a 5 Leute
- SoSoS = Scrum-of-Scrum-of-Scrums -> max 5 SoS
- theoretisch SoSoSoS :)
- EAT = Executive Action Team -> max 5 SoSoS Teams
  - ist Management, haben politische Macht und Budget
- gibt Case-Study mit 2000 Leuten -- Probleme die innerhalb eines Teams nicht gelöst werden können, sind innerhalb eines halben Tags beim EAT
- geht im Konzern-Kontext, muss aber gewollt werden, hat ein IBM CEO in einem Werk schon implementiert mit 4 Stufen

**PO Cycle**
- andere Sicht aufs gleiche Team
- gibt einen PO pro Team, gibt darüber einen Chief Product Owner (CPO)
- 5 Leute im Team
- 1 CCPO kann bis zu 5 CPO steuern
- Executve Meta Scrum - steuert CCPOs

- fraktale Sicht ist Absicht 
- ergibt organisches Konstrukt in beliebiger Detailtiefe
- skalierbar auf ganze Organisation - im Vergleich zu anderen FWs 

- beim Wachstum gibts irgendwann die gläserne Decke beim mittleren Management 
  - EAT holt die Leute rein -> ultra-wichtig 
  - ist als Erkentniss über die letzten Jahre gewachsen 
  - Management muss sich beteiligen, nicht nur zulassen

- Pilot-Projekte zeigen wie es gehen kann


## SAFe Battle Report: Praxisbericht IBM

Projekt bei der DRV Deutsche Rentenversicherung
IBM betreut da mehrere Großprojekte
eines davon umfasst insgesamt alleine 150 Leute, u.a. 10 Scrum Teams

läuft mittlerweile nach SAFe, ist aber organisch dahin gewachsen

so läufts bei IBM bei dem Projekt:
- Sprintwechsel : Mo-Di
- Mo: Review, Retro,  Di: Planning
- 4 Wochen Sprints
- Teams liefern Kapazität und Urlaubssituation am Donnerstag vorher
- Planning 1 Auftakt gemeinsam
- holen bei Planning 1 Vertreter der Service-Teams
- Planning 1 zeigt auch Abhängigkeiten zw. Teams auf
- Planning 2 teamintern -- günstigerweise nicht im Jira sondern am Whiteboard
- danach nochmal finales Syn-Meeting

- Chats wurden vom Betriebsrat auf Instant-Löschen getrimmt
- Mattermost als UBoot eingeführt, eigentl. für Bot-Anbindung
- mittlerweile alle Scrum-Teams drauf

- Review will eigentlich Feedback generieren, nicht nur vorführen
- eigentlich mit echten wechselnden Sachbearbeitern, aber es sitzen eher die Entscheider und Budget-Verwalter mit da
- nutzen mittlerweile Skype-for-Business

- alle 2 Sprints ein Release, dann Zwischensprint
- Business Owner haben Verantwortung für das Produkt, messen Zielen Wert bei, zeigen im Release Review an wieviel erreicht wurde

- Sprint-Ziel nicht erreicht`"ist nicht fertig geworden" ist legitim
- Reviews zeigen nur wirklich fertige Features
- POs wissen was nicht fertig geworden ist, aber Endnutzer nicht
- Sprintabbruch gab es noch incht

- Problem: alles musste mit Tosca getestet werden - auch Varianten
- fachliches/strategisches Feedback beschleunigen ist strategisches Ziel
- haben so viele Unittests druntergebaut, dass die Tosca-Tests wieder wie eine Pyramide ausschaut
- Tester müssen mitdenken, was getestet werden muss, und die Tests auf die entsprechenden Stufen verteilen zu können
- haben CD Pipeline, aktuell 2h Build-Zeit
- Tester sind zertifiziert nach ISABQ
- "Vollständigkeit der Tests ist nicht ausschlaggebend, sondern Geschwindigkeit" -> Erkenntnis aus XP
- Entwickler helfen Tosca Tests zu automatisieren

**Design Thinking Workshop:**
mit PO, Anwendern und Entwicklern

**PI-Planning:** 
Program Increment Planning
Release Plannig für das *über*nächste Release

**Confidence Vote** 
Wie sicher sind wir uns dass wir das schaffen können?

**Community of Practise**
- Entwickler-Community, Tester-Comm., DB-Comm.
- aus Buch "Software Craftmanship"
- Vorträge anschauen
- Katas, gemeinsames Coden am Beamer
- ist Arbeitszeit

**Scrum of Scrum:**
- tatsächlich am Faserboard mit gepinnten Zetteln 
- -> sind Abhängigkeiten verzeichnet
- ein SM moderiert
- Mittwoch ists länger mit Aufgabenstatus
- Protokollant schreibt mit, kippts ins Mattermost

**Anekdote am Rand: Beispiel für steigende Komplexität:**
Anrede in Briefbögen.. "Herr", "Frau" ok .. 
aber wie spricht man eine Erbengemeinschaft an die sich von Anwälten vertreten lässt?


## Mein Fazit

- Crossfunktionale Teams heißt auch: Entwickler FE+BE sitzen in einem Raum
- alle Mitglieder eines Scrum-Teams sitzen in einem Raum
- im Scrum-Team gibt es definierte Rollen: z.B. 1x Senior Dev, 2x Devs, 2x Junior Devs
- Physical Board mit den Stories (nicht den Tasks!) des aktuellen Sprints zeigt die Abhängigkeiten auf
- Architektur & Refactorings sind "Enabler" für künftige Features
