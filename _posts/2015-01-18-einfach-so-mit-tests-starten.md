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
excerpt: |-
  <p>"Einfach mal anfangen" ist schon lange mein Kredo wenn es um testgetriebene Entwicklung und automatische Tests geht. Seit nunmehr &uuml;ber 10 Jahren bin ich in Legacy Anwendungen und deren Code unterwegs. Es stellte sich also nie die Frage "Machen wir bei unserem neuen Projekt automatische Tests?". Nein, die gabs nicht und keiner nimmt sich Zeit diese einzuf&uuml;hren. "Wenn wir mal Zeit haben und keine Tickets, dann gucken wir uns das mal an.". Und "Bugfixing hat Vorrang!". Hm, Nicht. Sondern so: Einfach mal anfangen!<&#47;p>

  <p>Im aktuellen Projekt gibt es 100k+ Zeilen Code, tausende Templates, Controller, hunderte Models mit Tonnen undokumentierter Gesch&auml;ftslogik und Sonderlocken. Das alles funktioniert erstaulich gut, auch ohne Tests! Also warum "einfach mal" damit anfangen?
wordpress_id: 553
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=553
date: '2015-01-18 18:10:54 +0100'
date_gmt: '2015-01-18 16:10:54 +0100'
categories:
- Allgemein
- Tests
tags: []
---
<p>"Einfach mal anfangen" ist schon lange mein Kredo wenn es um testgetriebene Entwicklung und automatische Tests geht. Seit nunmehr &uuml;ber 10 Jahren bin ich in Legacy Anwendungen und deren Code unterwegs. Es stellte sich also nie die Frage "Machen wir bei unserem neuen Projekt automatische Tests?". Nein, die gabs nicht und keiner nimmt sich Zeit diese einzuf&uuml;hren. "Wenn wir mal Zeit haben und keine Tickets, dann gucken wir uns das mal an.". Und "Bugfixing hat Vorrang!". Hm, Nicht. Sondern so: Einfach mal anfangen!<&#47;p></p>
<p>Im aktuellen Projekt gibt es 100k+ Zeilen Code, tausende Templates, Controller, hunderte Models mit Tonnen undokumentierter Gesch&auml;ftslogik und Sonderlocken. Das alles funktioniert erstaulich gut, auch ohne Tests! Also warum "einfach mal" damit anfangen?<a id="more"></a><a id="more-553"></a><&#47;p></p>
<p>Schonmal versucht, ein nicht dokumentiertes Modul in einen komplexen System zu refaktorisieren? Wei&szlig; man, was diesen und jener Controller&#47;Seite wirklich im Detail in jeder Situation tut? Nicht wirklich, deswegen wird es nicht angefasst, und wenn dann minimalinvasiv "erg&auml;nzt" (=rangepappt) oder aber nach stundenlanger Analyse ein Bug gefixt. Dann testet man die neue Anpassung&#47;den Fehler durch und gibt das Produkt auf Sendung. Und dann w&auml;chst die Legacy Anwendung immer weiter und macht der Bezeichnung "Legacy" alle Ehre. Nicht das sie schlecht l&auml;uft, aber Redesign und Refaktorisierung ist praktisch nicht m&ouml;glich.<&#47;p></p>
<p>Mit automatischen Tests kann man schrittweise den Code umgestalten, und immer wieder mittels schnell durchzuf&uuml;hrender automatischer Tests die Korrektheit pr&uuml;fen.<&#47;p></p>
<blockquote><p>Jede Stunde die in automatische Tests investiert wird bekommt man mindestens doppelt zur&uuml;ck.<&#47;blockquote></p>
<p>Testen rechnet sich! Folgendes Diagramm zeigt die wieviel Zeit man verbringt mit und ohne Test.<&#47;p></p>
<p><a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;testen_rechnet_sich.png"><img class="alignnone size-medium wp-image-554" src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;testen_rechnet_sich-300x227.png" alt="testen_rechnet_sich" width="300" height="227" &#47;><&#47;a><&#47;p></p>
<p>Einfach mal anfangen... aber <strong>Wo, Wie, Wer, Wann, Was? <&#47;strong>Ein Vortrag auf der DC2013 greift genau diesen Aspekt auf und spannt den Bogen vom Vorsatz bis zur Einf&uuml;hrung - und gibt dabei detailreich Auskunft. Der vorliegenede Artikel versucht ein Transkript zu sein und notiert die wesentlichen Punkte - ohne Anspruch auf roten Faden oder Vollst&auml;ndigkeit. Das Video sollte man sich bei tieferen Interesse auf jeden Fall ansehen!<&#47;p></p>
<h2>Transkript zu DevCon 2013 Vortrag von Judith Andresen und Arne Blankerts auf der Developer Conference 2013<&#47;h2></p>
<p>https:&#47;&#47;www.youtube.com&#47;watch?v=Rt-cqI_Qtuk<&#47;p></p>
<p>&nbsp;<&#47;p></p>
<h3>Testen rechnet sich!<&#47;h3></p>
<p><a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;testen_rechnet_sich.png"><img class="alignnone size-medium wp-image-554" src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;testen_rechnet_sich-300x227.png" alt="testen_rechnet_sich" width="300" height="227" &#47;><&#47;a><&#47;p></p>
<p>Diagramm basiert u.a. auf Microsoft, die die damalige Einf&uuml;hrung von automatischen Tests stark gemonitort haben.<br />
bzgl. Testlevels: es ist 150x teurer einen Test in einen Livesystem zu finden, als ihn in den fachlichen Anforderungen (User-Stories, Pflichtenheft) zu identifizieren<br />
je tiefer man testet (unit-tests statt akzeptanz-tests), desto geringer ist die komplexit&auml;t der Anforderungen<&#47;p></p>
<blockquote><p>Es macht mehr spa&szlig; neue Features zu bauen und Tests zu schreiben als in einen "Big Ball of Mud" herumzustochern.<&#47;blockquote></p>
<h3>Qualit&auml;t ist nicht absolut<&#47;h3></p>
<p>Was rechnet sich in unserem Kontext?<br />
Kosten Testerstellung vs. Bugfixing-Aufwand<&#47;p></p>
<p>Qualit&auml;t misst sich f&uuml;r den Endverbraucher haupts&auml;chlich in der GUI, der Kontext des Betrachters entscheidet.<br />
F&uuml;r Vorst&auml;nde ist ein Kommafehler im Text oder nicht eingehaltene CI-Vorgaben ein Projektproblem<&#47;p></p>
<p>Wieviel Qualit&auml;t brauche ich eigentlich? Und wo?<br />
100% Test-Coverage braucht man nur f&uuml;r Flugzeug-Autopiloten und Mondfl&uuml;ge.<&#47;p></p>
<h3>Vorgehen zur Einf&uuml;hrung<&#47;h3></p>
<p>Auf ein Bier&#47;Wein treffen mit QS, und in lockerer Atmosph&auml;re fragen "Was kann denn hier alles schief gehen?"<br />
Zun&auml;chst kommen relativ einfache Vorschl&auml;ge, sp&auml;ter dann lustige Vorschl&auml;ge und Anekdoten vergangener F&auml;lle.<br />
Daraus Risikomatrix erstellen mit Fehlertypen<br />
Wie kann man diese Typen am besten absichern?<br />
<a href="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;testmatrix.png"><img class="alignnone size-medium wp-image-555" src="http:&#47;&#47;rhflow.wp-root.rh-flow.de&#47;files&#47;2015&#47;01&#47;testmatrix-300x258.png" alt="testmatrix" width="300" height="258" &#47;><&#47;a><&#47;p></p>
<p>Diese Treffen kann man regem&auml;&szlig;ig machen und fortschreiben (ggf. ohne Bier&#47;Wein).<br />
Regelm&auml;&szlig;ig gucken was waren f&uuml;r Fehlerf&auml;lle, auf welcher Ebene sollten wir die abpr&uuml;fen (Unit-Tests, Akzeptanz-Tests, User-Tests)<br />
Nicht jeder Fehler muss sofort in ein automatisiertes Testverfahren, das ist zu teuer.<br />
Besser agile Regel "rules of three" nutzen: Wenn ein Fehler(-szenario) zum dritten mal auftaucht in einer bestimmten klasse, dann sollte ich mich drum k&uuml;mmern, sonst ist es "Fernwirkung".<br />
Ziel: Testklassen finden und Testleveln n&auml;hern<&#47;p></p>
<p>F&uuml;r jede neue Anforderung gleich fragen:<br />
Wer testet das zum schluss, und auf welchem Level?<&#47;p></p>
<h3>Voraussetzungen<&#47;h3></p>
<ul>
<li>Geplante Lebensdauer?<&#47;li>
<li>Welche Risiken gibt es?<&#47;li>
<li>Wie hoch sind diese?<&#47;li>
<li>Was ist das Gesch&auml;ftsmodell?<&#47;li><br />
<&#47;ul></p>
<p><strong>Lebensdauer<&#47;strong> ermitteln f&uuml;r intern entwickelte Software: entspricht mindestens dem Abschreibungszeitraum f&uuml;r die Entwickleraufw&auml;nde.<&#47;p></p>
<p><strong>Risiken:<&#47;strong> Zeit f&uuml;r den Bierabend.<br />
Wie teuer ist der Fall wenn er eintritt? Gehe ich das Risiko ein oder ist es billiger mich dagegen abzusichern? Das kann man interdisziplin&auml;r im Team beantworten.<br />
-> Testen ist eine Form von Versicherung<br />
Zu investierende Arbeitszeit vs. wahrscheinlicher (Image)Schaden und Nachbeben<br />
z.B. es besteht die Gefahr, Dinge aus der Testumgebung in die Produktivumgebung zu &uuml;bernehmen (Debuggig-Weichen, -Kommentare, fest &uuml;berschriebene Testwerte); Wie sichere ich mich dagegen ab?<&#47;p></p>
<p><strong>Gesch&auml;ftsmodell<&#47;strong> <em>eigentlich<&#47;em>: z.B. Autovermietung: Gebrauchtwagenverkauf, Pizzabestellung: Lastspitze bei EM&#47;WM Halbzeit verkraften, Axilaris Obelisk: Onlinebanking 100% stabil betreiben<br />
-> Um was geht es eigentlich?<&#47;p></p>
<h3>Einf&uuml;hrung<&#47;h3></p>
<p>Wieder zusammensitzen:<br />
Was ist das wesentliche? Was ist der Kern? "Wenn das und das schiefgeht ist das ganz schlimm" -> dort sollte man anfangen<br />
Wer ist f&uuml;r welchen Test zust&auml;ndig?<&#47;p></p>
<h3>Checkliste<&#47;h3></p>
<ul>
<li>Gesch&auml;ftsmodell verstehen<&#47;li>
<li>Ziele des Testens kl&auml;ren<&#47;li>
<li>Testprozesse und -ebenen<&#47;li>
<li>Mit dem Wichtigsten anfangen<&#47;li><br />
<&#47;ul></p>
<p>"Wichtigsten" -> im Team (Entwickler, Marketing, Grafiker, Manager, GF, Vorst&auml;nde) beantworten<&#47;p></p>
<h2>Fazit<&#47;h2></p>
<p>Einf&uuml;hrung von automatischen Tests ist in erstes Linie ein <strong>interdisziplin&auml;res<&#47;strong> Thema, welches bei der Einf&uuml;hrung <strong>firmenweit<&#47;strong> abgestimmt werden muss, und welches im hohem Ma&szlig;e ein <strong>Kommunikativer<&#47;strong> Prozess ist. Das bedeutet, dass auch wir als <strong>Entwickler viel reden und reflektieren<&#47;strong> m&uuml;ssen. Auch unangenehme Dinge wie <strong>personenspezifische wiederkehrende Fehlerbilder<&#47;strong> werden besprochen werden m&uuml;ssen. Am Ende etabliert sich aber ein <strong>Qualit&auml;t steigernder und sichernder Prozess,<&#47;strong> der die gesamte Firma und auch das Produkt (unser aller Code und Anwendung) <strong>auch im Legacy-Umfeld<&#47;strong> mit Lebensdauer von 10+ Jahren <strong>&uuml;berlebensf&auml;hig macht<&#47;strong>. Und am Ende haben wir als <strong>Entwickler wieder mehr Spa&szlig; an der Arbeit<&#47;strong>, was man dann der Anwendung anmerkt. <strong>Und daf&uuml;r lohnt es sich zu k&auml;mpfen<&#47;strong>!<&#47;p></p>
