---
layout: post
title: Resümé des PHP Dev Day in Dresden
date: '2017-10-04'
---

Am vergangenen Freitag war der **PHP Dev Day 2017** in Dresden. Hier nun ein Überblick über die Talks inkl. einer kurzen Einschätzung meinerseits - und vor allem weiterführender Links.

<!--more-->

[Homepage, **Programm**, etc.](http://phpug-dresden.org/phpdd17.html)

[**Videos aller Vorträge** demnächst vermutlich hier](https://www.youtube.com/channel/UC9RvlzszDfeZ_ILq0JSNHZQ/videos)

![Beginn](/files/2017/phpdevday/beginn.jpeg)

![PHParty](/files/2017/phpdevday/phparty.jpeg)

### **PHIVE** - Managing you PHP toolchain

Tool um die Dinge  nichts mit der eigene App zu tun haben aus der composer.json als Abhängigkeit herauszubekommen. Also PHPUnit, Behat, PHPMD, phpDox und die anderen Test- und Metrik-Tools.

![Thank you](/files/2017/phpdevday/phar.jpeg)

- [**PHAR.IO**: Plattform für PHARs](https://phar.io/)
- [**Phive**](https://github.com/phar-io/phive/blob/master/README.md)


### **Middleware Web APIs** in PHP 7.x (mit Zend **Expressive**)

Aus dem Zend Framework wurde ein auf Web APIs spezialisiertes Fw heraus extrahiert. Ja, Zend hat es schwer gegenüber Symfony (und Laravel). Das wird so bleiben vermutlich.

![Features](/files/2017/phpdevday/expressive-1.jpeg)

![Dankeschön](/files/2017/phpdevday/expressive-2.jpeg)

- [**Expressive** (Zend Framework Nachfolger)](https://docs.zendframework.com/zend-expressive/)


### PostgreSQL - Die NoSQL Datenbank, die niemand kennt

Mäßig spannend gehaltener Vortrag wie mit JSON in PostgreSQL arbeitet (speichern, suchen, ändern). Eindruck: Die Syntax bzw. die Operatoren stammen direkt aus der Hölle.

Slides: https://talks.bitexpert.de/phpdd17-postgresql-nosql/

![NoSQL Database Types](/files/2017/phpdevday/postgres-1.jpeg)

![Filtering arrays](/files/2017/phpdevday/postgres-2.jpeg)

### Event Sourcing: The good, the bad, and the complicated

Der gefühlt beste Vortrag, weil mit Event-getriebener Entwicklung ein völlig anderen Ansatz als das bekannt MVC an einen griffigen Beispiel erklärt wurde. Event Sourcing passt aber nicht für alle Anwendungen.  *(Wenn die Folien im Netz stehen, unbedingt anschauen wer auf Italo-Western steht)*

![Process Managers](/files/2017/phpdevday/eventsource-1.jpeg)

![New state is persisted](/files/2017/phpdevday/eventsource-2.jpeg)

![ORM throws changes to DB](/files/2017/phpdevday/eventsource-3.jpeg)

[**Slides**](http://slidedeck.io/Ocramius/real-time-applications-and-event-sourcing-in-php): noch nicht veröffentlicht, aber folgender Vortrag von 2015 erhellt bis dahin: 


### **prooph/micro** - weniger ist mehr

Die Vortragsreihenfolge war perfekt. Nach "Event Sourcing" am Beispiel folgte nun ein passenden PHP Framework nebst Erklärungen. Für mich schafften es diese beiden Vorträge endlich, den sagenumwobenen Begriff "Micro Services die miteinander reden" als Techniker sich wirklich vorstellen zu können - also so die Umsetzung.

![Event Driven Microservices](/files/2017/phpdevday/prooph-1.jpeg)

![PHP & ES](/files/2017/phpdevday/prooph-2.jpeg)

- [Functional **prooph for microservices**](https://github.com/prooph/micro)
- [**prooph** CQRS and Event Sourcing components for PHP](http://getprooph.org/)
- [**phunkie**: functional structures for PHP](https://github.com/phunkie/phunkie/blob/master/README.md)
- [Building Microservices Using an **API Gateway** | NGINX](https://www.nginx.com/blog/building-microservices-using-an-api-gateway/)
- [**Nginx Unit**: Ein Application Server für Microservices | iX](https://m.heise.de/ix/meldung/Nginx-Unit-Ein-Application-Server-fuer-Microservices-3823638.html)
- [faas: Functions as a Service (**OpenFaaS**) - a serverless framework for Docker & Kubernetes](https://github.com/alexellis/faas)
- [**aws-lambda-php**: Amazon Lambda mit PHP nutzen (geht nur indirekt)](https://github.com/dannylinden/aws-lambda-php/blob/master/README.md)


### Pushing the limits - with **reactPHP**

Gelernt: "React" als Begriff in der Framework-Welt gibt es nicht erst seit Facebook. Im PHP Kosmos gibt es den schon länger. Nützt nur nix. Das Fw wird von der Kommandozeile gestartet und arbeitet ähnlich eines Application Servers. Der Event-Loop arbeitet mit PHPs stream_select() oder libevent. Spannend für schnelle Microservices, da man sich damit das Bootstrapping des PHP-Prozesses spart. Man darf nur das Variablen beräumen nicht verkacken.

![Knock knock! 2017!](/files/2017/phpdevday/reactphp.jpeg)

**Slides**: https://speakerdeck.com/clue/pushing-the-limits-with-reactphp-phpdd17

- [**ReactPHP**: Event-driven, non-blocking I/O with PHP](https://reactphp.org/)
- [**Amp** amphp: non-blocking concurrency framework for PHP](https://amphp.org/amp/)
- [**Buzz**: PHP's lightweight HTTP client](https://github.com/kriswallsmith/Buzz)
- [**php-zenity-react**: Build graphical desktop (GUI) applications in PHP](https://github.com/clue/php-zenity-react)
- [PHP: streamWrapper::stream_write - Manual](http://php.net/manual/de/streamwrapper.stream-write.php)


### Lightning Talk: Retrospektiven  (Sebastian Heuer)

Spannender Talk welche Regeln man befolgen muss für sinnvolle Retrospektiven.

![Prime Directive](/files/2017/phpdevday/retro-2.jpeg)

![Vegas Rule](/files/2017/phpdevday/retro-4.jpeg)

![Team Temperature](/files/2017/phpdevday/retro-3.jpeg)

![Staplerfahrer Klaus](/files/2017/phpdevday/retro-1.jpeg)

- inspiriert von Judith Andresens [**Buch** "Retrospektiven in agilen Projekten: Ablauf, Regeln und Methodenbausteine"](https://www.amazon.de/Retrospektiven-agilen-Projekten-Ablauf-Methodenbausteine/dp/3446439080)
- [**Fun Retro**: (zu) technisches Tool um Retros zu managen](https://funretro.github.io/distributed/)

-----

Sonstiges was noch so an Tipps herumflog in Talks oder bei Gesprächen:

- [**phpbu**: PHP Backup Utility - Creates and encrypts database and file backups, syncs your backups to other servers or cloud services and assists you monitor your backup process](https://github.com/sebastianfeldmann/phpbu)
- [**Whoops!** There was an error.](http://filp.github.io/whoops/demo/)
- [**Aura.Di**: Dependency Injection System](https://github.com/auraphp/Aura.Di)
- [**Pimple**: A simple PHP Dependency Injection Container](https://pimple.symfony.com/)
- [The **League of Extraordinary Packages**](https://thephpleague.com/de/)
- [**dredd**: HTTP API Testing Framework](https://github.com/apiaryio/dredd/blob/master/README.md)
- [**phpunit-snapshot-assertions**: Snapshot testing for PHPUnit](https://github.com/spatie/phpunit-snapshot-assertions/blob/master/README.md)
- [**Laravel Horizon**: Beautiful Dashboard For Your Redis Queue](https://horizon.laravel.com/)

![Blick von Terrasse beim Bier](/files/2017/phpdevday/terasse.jpeg)