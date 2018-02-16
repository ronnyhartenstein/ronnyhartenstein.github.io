---
layout: post
title: Brower-Automatisierung mit Puppeteer
date: '2018-02-16'
---

Das Problem ist eigentlich einfach: Ich muss mich 1x im Monat bei GMX anmelden sonst löschen die irgendwann meinen Primäraccount rha@gmx.li. Das Login-Formular ist einfach gestrickt, doch per einfaches cURL lässt es sich natürlich nicht bewerkstelligen - ein headless Browser muss her damit die Seite tatsächlich abgeholt und etwaige Redirects etc durchgeführt werden.

Aktueller Stand der Tech für sowas ist [Headless Chrome (CLI)](https://developers.google.com/web/updates/2017/04/headless-chrome), welcher ab Chrome 59 verfügbar ist. Der Chrome/Chromium selbst wiederum bietet das fantastische WebDev Protocol, welches eine mittlerweile anerkannte allgemeine Schnittstelle zur Browsersteuerung ist und von den mitgelieferten Entwicklertools (DevTools) genutzt wird. Genau auf dieses Protokoll setzt nun [Puppeteer](https://github.com/GoogleChrome/puppeteer) auf, eine NodeJS Bibliothek.

<!--more-->

Bespiel für Headless Chrome um eine Webseite als PDF zu drucken:

```
chrome --headless --disable-gpu --print-to-pdf https://heise.de/
```

Und ein Screenshot geht so:

```
chrome --headless --disable-gpu --screenshot https://heise.de/
```

Zurück zu Puppeteer und der Aufgabe. Ich möchte eine Seite aufrufen, zwei Felder (Login + Pwd) ausfüllen und absenden. Dann warte bis die Folgeseite kommt und fertig.

```js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.gmx.net');
  
  // Login ausführen
  let u = await page.$("input[name=username]")
  await u.type("rha@gmx.li")

  // Passwort ausfüllen + Enter
  let p = await page.$("input[name=password]")
  await p.type("****")
  await p.press('Enter')

  // warte bis die Seite geladen hat
  await page.waitForNavigation()

  // Browser schließen
  await browser.close();
})();
```

Fertig. Das jetzt noch auf den Mac in die Crontab gepackt (`node login.js`) und täglich gestartet - fertig.

Die o.g. Befehle sind nur die Spitze des Eisbergs, das Tool hat eine [sehr umfangreiche API](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#).  Puppeteer wurde im Januar in Version 1.0.0 veröffentlich, die API bleibt also stabil.

Screenshots mit Puppeteer:

```js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.axilaris.de');
  await page.screenshot({path: 'axilaris.png'});
  await browser.close();
})();
```

PDF mit Puppeteer erzeugen:

```js
const puppeteer = require('puppeteer');
(async () => {
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.goto('https://www.axilaris.de', {waitUntil: 'networkidle2'});
   await page.pdf({path: 'axilaris.pdf', format: 'A4'});
   await browser.close();
})();
```

Andy H. hat ja jüngst mit seiner Obelisk Grunt-Extension einiges an Erfahrung mit NodeJS gesammelt. Die Implementierung von andere komplexeren Abläufen ist auch damit möglich - JS ist bockig aber kein Hexenwerk. PhpStorm und WebStorm bieten zudem die Möglichkeit, NodeJS Scripte im Debugmodus zu starten um damit Breakpoints und gewohntes Step-by-Step-Debugging zu ermöglichen.

Natürlich sind JS-Ökosystem-typisch schon [zahlreiche darauf aufbauende Libs verfügbar](https://medium.com/@kensoh/chromeless-chrominator-chromy-navalia-lambdium-ghostjs-autogcd-ef34bcd26907), bzw. haben bestehende Projekte die neue Schnittstelle integriert. Mal schauen welches Integration-Testframework diese integriert, sodass man automatisierte Oberflächen-Tests damit abwickeln kann. Dadurch dass man in einer Sprache bleibt, JS, fällt der gewisse Medienbruch weg, der zwangsläufig bei der Verwendung von Behat (PHP) oder Cucumber (Ruby) und andere erfolgt.

**Nachschlag**

Login via IMAP würde sicherlich zählen, aber ich hab seit Jahren da nur noch eine Weiterleitung zum eigentlichen Primäraccount - derzeit bei [mailbox.org](https://mailbox.org) - und kein IMAP eingerichtet. Vermutlich würde auch ein simpler IMAP Login via [openssl](https://delog.wordpress.com/2011/05/10/access-imap-server-from-the-command-line-using-openssl/) funktionieren. Aber so war es lustiger und lehrreich.
