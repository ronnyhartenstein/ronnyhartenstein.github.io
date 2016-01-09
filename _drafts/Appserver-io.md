---
layout: post
comments: true
title: PHP-Application-Server antesten
#date: '2016-??-??'
#categories: Patterns
---

Ziel: PHP-Application-Server in einem Docker-Container mit laufenden Servlet
http://appserver.io/documentation/servlet-engine.html#bootstrapping-a-servlet

Dockerfile basiert auf https://github.com/DavidFeller/docker-appserver

Docker-Container-Config: `/Users/vhosts/appserver/docker`
`/Users/vhosts/appserver/`` wird in `/opt/appserver/webapps` gemountet

Aufruf von `appserver.local:9080/examples/helloWorld.do`
soll in `/Users/vhosts/appserver/` .. `examples/WEB-INF/classes/AppserverIo/Example/Servlets/` .. `HelloWorldServlet.php` einsteigen
