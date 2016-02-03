---
layout: post
status: publish
published: true
title: Was Grunt und Sass mit Minderwertigkeitskomplex zu tun haben (sollen)
author:
  display_name: ''
  login: ''
  email: ''
  url: ''

wordpress_id: 595
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=595
date: '2015-03-03 08:47:19 +0100'
date_gmt: '2015-03-03 06:47:19 +0100'
categories:
- Allgemein
- Entwicklung
- Paradigmen
- Grunt
- Sass
tags: []
---

Früher gab es DEN Web-Entwickler der ALLES gemacht hat. Heute gibt es den Frontend-Engineer, den Backend-Engineer, den SQL-Specialist, den Web-Designer (HTML, CSS). Da kann man als Web-Entwickler schonmal die Identität einbüßen und in einen Minderwertigkeitskomplex rutschen, oder? Schon weil ja PHP und HTML kein echtes Programmieren ist, gegenüber Java und Co...

Auf [praegnanz.de ][1]gibt es einen [Blog-Artikel][2] zum Selbstverständnis des "Web-Entwicklers", und warum sie/er sich in letzter Zeit wohl über zu viele neumodischen Automatisierungs-"Hipster"-Tools gegenüber den "echten" Entwicklern (C++, C#, Java) vermeindlich groß machen. Zeit sich selbst ein wenig zu reflektieren..

<!--more-->

**Meine Meinung:**

#### Zum Web-Entwickler:

Früher (so vor 5 Jahren) waren die Anforderungen an moderne Webseiten auch lange nicht so groß. Heute muss eine gute Webseite in 200ms zum Browser funken, responsiv, intuitiv und schnell bedienbar sein, und noch hübsch aussehen. Gottseidank macht das nicht nur einer, sondern die Richtigen an der richtigen Stelle.

Sind wir mit PHP echte Entwickler? Na klar! Oder sind die die VBA programmieren keine? MySQL ist auch eine echte Datenbank, auch wenn der Uni-Professor zu meiner Zeit das nicht so sah (da galt nur Oracle).

#### Zu Sass:

Ich persönlich möchte nicht mehr ohne. Schon alleine der Syntax-Check und das Nesting (vorsichtig eingesetzt!) bringt enorme Entwicklungs-Vorteile. Und man kann sein CSS nach Lust und Laune dokumentieren, es wird sowieswo eingedampft auf das Nötigste beim Build. Und mittlerweile wird aus Performance-Gründen erwartet, das JS und CSS *minifiziert *und *zusammengefasst* (möglichst in einer Datei) sind.

#### Zu Bower und Grunt:

Jedes mittelgroße Web-Projekt nutzt mittlerweile zig Javascript-Bibliotheken, welche in schneller Taktung aktualisiert werden.   
**Früher so:** herunterladen, entpacken, kopieren (bzw. in der eigenen Struktur verteilen), im HTML einbinden, testen;   
**Heute so:** Bower-Config pflegen, Bower starten, Grunt starten, fertig. Ist nicht weniger, weniger sophisticated schon gar nicht, aber *automatisiert.*

#### Zu PHP:

Es mag konzeptionell nicht gegen Javascript, Node.JS etc, ankommen, aber es tut sich was. Schon alleine weil Facebook nicht von PHP wegkommt bescherte der PHP-Community enorm Drive: eine Sprach-Spezifikation, HHVM. Und eine kleine deutsche Agentur hat mit [appserver.io][3] sogar einen Application-Server gelauncht.

*Wie seht ihr das? Kommentar und Anregungen gerne hier oder* [@rhflow_de][4]

 [1]: http://praegnanz.de/
 [2]: http://praegnanz.de/weblog/tool-wettruesten-im-frontend "Aufrüsten gegen den Minderwertigkeitskomplex"
 [3]: http://appserver.io/
 [4]: https://twitter.com/rhflow_de
