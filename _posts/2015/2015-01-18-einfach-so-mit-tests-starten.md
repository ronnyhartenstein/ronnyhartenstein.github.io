---
layout: post
status: publish
published: true
title: '"Einfach so mit Tests starten"'
author:
  display_name: ''
  login: ''
  email: ''
  url: ''

wordpress_id: 553
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=553
date: '2015-01-18 18:10:54 +0100'
date_gmt: '2015-01-18 16:10:54 +0100'
categories:
- Allgemein
- Tests
tags: []
---
<p>„Einfach mal anfangen“ ist schon lange mein Kredo wenn es um testgetriebene Entwicklung und automatische Tests geht. Seit nunmehr über 10 Jahren bin ich in Legacy Anwendungen und deren Code unterwegs. Es stellte sich also nie die Frage „Machen wir bei unserem neuen Projekt automatische Tests?“. Nein, die gabs nicht und keiner nimmt sich Zeit diese einzuführen. „Wenn wir mal Zeit haben und keine Tickets, dann gucken wir uns das mal an.“. Und „Bugfixing hat Vorrang!“. Hm, Nicht. Sondern so: Einfach mal anfangen!</p>

<!--more-->

<p>Im aktuellen Projekt gibt es 100k+ Zeilen Code, tausende Templates, Controller, hunderte Models mit Tonnen undokumentierter Geschäftslogik und Sonderlocken. Das alles funktioniert erstaulich gut, auch ohne Tests! Also warum „einfach mal“ damit anfangen?<span id="more-553"></span></p>
<p>Schonmal versucht, ein nicht dokumentiertes Modul in einen komplexen System zu refaktorisieren? Weiß man, was diesen und jener Controller/Seite wirklich im Detail in jeder Situation tut? Nicht wirklich, deswegen wird es nicht angefasst, und wenn dann minimalinvasiv „ergänzt“ (=rangepappt) oder aber nach stundenlanger Analyse ein Bug gefixt. Dann testet man die neue Anpassung/den Fehler durch und gibt das Produkt auf Sendung. Und dann wächst die Legacy Anwendung immer weiter und macht der Bezeichnung „Legacy“ alle Ehre. Nicht das sie schlecht läuft, aber Redesign und Refaktorisierung ist praktisch nicht möglich.</p>
<p>Mit automatischen Tests kann man schrittweise den Code umgestalten, und immer wieder mittels schnell durchzuführender automatischer Tests die Korrektheit prüfen.</p>
<blockquote><p>Jede Stunde die in automatische Tests investiert wird bekommt man mindestens doppelt zurück.</p></blockquote>
<p>Testen rechnet sich! Folgendes Diagramm zeigt die wieviel Zeit man verbringt mit und ohne Test.</p>
<p><a href="/files/2015/01/testen_rechnet_sich.png"><img class="alignnone size-medium wp-image-554" src="/files/2015/01/testen_rechnet_sich-300x227.png" alt="testen_rechnet_sich" width="300" height="227"></a></p>
<p>Einfach mal anfangen… aber <strong>Wo, Wie, Wer, Wann, Was? </strong>Ein Vortrag auf der DC2013 greift genau diesen Aspekt auf und spannt den Bogen vom Vorsatz bis zur Einführung – und gibt dabei detailreich Auskunft. Der vorliegenede Artikel versucht ein Transkript zu sein und notiert die wesentlichen Punkte – ohne Anspruch auf roten Faden oder Vollständigkeit. Das Video sollte man sich bei tieferen Interesse auf jeden Fall ansehen!</p>
<h2>Transkript zu DevCon 2013 Vortrag von Judith Andresen und Arne Blankerts auf der Developer Conference 2013</h2>
<p><iframe width="560" height="315" src="https://www.youtube.com/embed/Rt-cqI_Qtuk" frameborder="0" allowfullscreen></iframe></p>
<p>&nbsp;</p>
<h3>Testen rechnet sich!</h3>
<p><a href="/files/2015/01/testen_rechnet_sich.png"><img class="alignnone size-medium wp-image-554" src="/files/2015/01/testen_rechnet_sich-300x227.png" alt="testen_rechnet_sich" width="300" height="227"></a></p>
<p>Diagramm basiert u.a. auf Microsoft, die die damalige Einführung von automatischen Tests stark gemonitort haben.<br>
bzgl. Testlevels: es ist 150x teurer einen Test in einen Livesystem zu finden, als ihn in den fachlichen Anforderungen (User-Stories, Pflichtenheft) zu identifizieren<br>
je tiefer man testet (unit-tests statt akzeptanz-tests), desto geringer ist die komplexität der Anforderungen</p>
<blockquote><p>Es macht mehr spaß neue Features zu bauen und Tests zu schreiben als in einen „Big Ball of Mud“ herumzustochern.</p></blockquote>
<h3>Qualität ist nicht absolut</h3>
<p>Was rechnet sich in unserem Kontext?<br>
Kosten Testerstellung vs. Bugfixing-Aufwand</p>
<p>Qualität misst sich für den Endverbraucher hauptsächlich in der GUI, der Kontext des Betrachters entscheidet.<br>
Für Vorstände ist ein Kommafehler im Text oder nicht eingehaltene CI-Vorgaben ein Projektproblem</p>
<p>Wieviel Qualität brauche ich eigentlich? Und wo?<br>
100% Test-Coverage braucht man nur für Flugzeug-Autopiloten und Mondflüge.</p>
<h3>Vorgehen zur Einführung</h3>
<p>Auf ein Bier/Wein treffen mit QS, und in lockerer Atmosphäre fragen „Was kann denn hier alles schief gehen?“<br>
Zunächst kommen relativ einfache Vorschläge, später dann lustige Vorschläge und Anekdoten vergangener Fälle.<br>
Daraus Risikomatrix erstellen mit Fehlertypen<br>
Wie kann man diese Typen am besten absichern?<br>
<a href="/files/2015/01/testmatrix.png"><img class="alignnone size-medium wp-image-555" src="/files/2015/01/testmatrix-300x258.png" alt="testmatrix" width="300" height="258"></a></p>
<p>Diese Treffen kann man regemäßig machen und fortschreiben (ggf. ohne Bier/Wein).<br>
Regelmäßig gucken was waren für Fehlerfälle, auf welcher Ebene sollten wir die abprüfen (Unit-Tests, Akzeptanz-Tests, User-Tests)<br>
Nicht jeder Fehler muss sofort in ein automatisiertes Testverfahren, das ist zu teuer.<br>
Besser agile Regel „rules of three“ nutzen: Wenn ein Fehler(-szenario) zum dritten mal auftaucht in einer bestimmten klasse, dann sollte ich mich drum kümmern, sonst ist es „Fernwirkung“.<br>
Ziel: Testklassen finden und Testleveln nähern</p>
<p>Für jede neue Anforderung gleich fragen:<br>
Wer testet das zum schluss, und auf welchem Level?</p>
<h3>Voraussetzungen</h3>
<ul>
<li>Geplante Lebensdauer?</li>
<li>Welche Risiken gibt es?</li>
<li>Wie hoch sind diese?</li>
<li>Was ist das Geschäftsmodell?</li>
</ul>
<p><strong>Lebensdauer</strong> ermitteln für intern entwickelte Software: entspricht mindestens dem Abschreibungszeitraum für die Entwickleraufwände.</p>
<p><strong>Risiken:</strong> Zeit für den Bierabend.<br>
Wie teuer ist der Fall wenn er eintritt? Gehe ich das Risiko ein oder ist es billiger mich dagegen abzusichern? Das kann man interdisziplinär im Team beantworten.<br>
-&gt; Testen ist eine Form von Versicherung<br>
Zu investierende Arbeitszeit vs. wahrscheinlicher (Image)Schaden und Nachbeben<br>
z.B. es besteht die Gefahr, Dinge aus der Testumgebung in die Produktivumgebung zu übernehmen (Debuggig-Weichen, -Kommentare, fest überschriebene Testwerte); Wie sichere ich mich dagegen ab?</p>
<p><strong>Geschäftsmodell</strong> <em>eigentlich</em>: z.B. Autovermietung: Gebrauchtwagenverkauf, Pizzabestellung: Lastspitze bei EM/WM Halbzeit verkraften, Axilaris Obelisk: Onlinebanking 100% stabil betreiben<br>
-&gt; Um was geht es eigentlich?</p>
<h3>Einführung</h3>
<p>Wieder zusammensitzen:<br>
Was ist das wesentliche? Was ist der Kern? „Wenn das und das schiefgeht ist das ganz schlimm“ -&gt; dort sollte man anfangen<br>
Wer ist für welchen Test zuständig?</p>
<h3>Checkliste</h3>
<ul>
<li>Geschäftsmodell verstehen</li>
<li>Ziele des Testens klären</li>
<li>Testprozesse und -ebenen</li>
<li>Mit dem Wichtigsten anfangen</li>
</ul>
<p>„Wichtigsten“ -&gt; im Team (Entwickler, Marketing, Grafiker, Manager, GF, Vorstände) beantworten</p>
<h2>Fazit</h2>
<p>Einführung von automatischen Tests ist in erstes Linie ein <strong>interdisziplinäres</strong> Thema, welches bei der Einführung <strong>firmenweit</strong> abgestimmt werden muss, und welches im hohem Maße ein <strong>Kommunikativer</strong> Prozess ist. Das bedeutet, dass auch wir als <strong>Entwickler viel reden und reflektieren</strong> müssen. Auch unangenehme Dinge wie <strong>personenspezifische wiederkehrende Fehlerbilder</strong> werden besprochen werden müssen. Am Ende etabliert sich aber ein <strong>Qualität steigernder und sichernder Prozess,</strong> der die gesamte Firma und auch das Produkt (unser aller Code und Anwendung) <strong>auch im Legacy-Umfeld</strong> mit Lebensdauer von 10+ Jahren <strong>überlebensfähig macht</strong>. Und am Ende haben wir als <strong>Entwickler wieder mehr Spaß an der Arbeit</strong>, was man dann der Anwendung anmerkt. <strong>Und dafür lohnt es sich zu kämpfen</strong>!</p>
