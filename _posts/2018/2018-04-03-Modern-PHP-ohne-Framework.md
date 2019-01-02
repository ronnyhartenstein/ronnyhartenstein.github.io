---
layout: post
title: Lese-Tipp "Modern PHP Without a Framework"
date: '2018-04-03'
---

Hier hat mal jemand notiert, wie man heutzutage ein größeres PHP-Projekt bootstrappen könnte, wenn man nicht auf ein Framework wie Symfony, Laravel oder Zend aufsetzen will. Mit Framework ist man bekanntlich an dessen Update- und Innovations-Zyklen gebunden – oder bleibt auf der Version stehen wovon man startet. Ohne Framework frickelt man wieder alles selbst? Nicht in Zeiten von PHP-Industriestandards – den **PHP Standards Recommendations** – kurz PSR – der PHP Framework Interop Group.

<!--more-->

Der nachfolgende Artikel ist über Ostern auf Hackernews aufgeploppt und hat reichlich Ruhm (= Punkte) kassiert. Die [Diskussion](https://news.ycombinator.com/item?id=16725492) dazu ist lesenswert.

[Modern PHP Without a Framework (Kevin Smith, 2018)](https://kevinsmith.io/modern-php-without-a-framework)

Der Artikel befasst sich mit **Autoloading** (PSR-4), **Dependency Injection Container** (PSR-11), **Middleware** (PSR-15), **Routing** und **Request & Response** (PSR-7). Dazu bindet der Autor zahlreiche weithin akzeptierte Drittanbieter-Pakete ein und klebt die alle mit ein wenig Code zusammen. Dadurch dass nur Pakete verwendet werden, die die PSR-Standards implementieren, können diese auch einfach wieder ausgetauscht werden gegen welche die noch besser funktionieren oder aber spezielle Zusatzfunktionalität bieten.

Gute und weit verbreitete Bibliotheken liefern folgende Anbieter:

- [Symfony components](https://symfony.com/components)
- [Zend Framework components](https://zendframework.github.io/)
- [The League of Extraordinary Packages](https://thephpleague.com/)
- [Paragon Initiative’s security-focused libraries](https://paragonie.com/software) (mir bislang unbekannt)
- [Aura](http://auraphp.com/) (mir bislang unbekannt)

Übrigens gibt es auch für Caching mit PSR-6 einen Standard und [reichlich implementierende Pakete](https://packagist.org/packages/psr/cache/dependents?q=psr-6&p=0).

Hier gibts eine Liste der gültigen, in Arbeit befindlichen und abgelaufenen Standards: [https://www.php-fig.org/psr/](https://www.php-fig.org/psr/)