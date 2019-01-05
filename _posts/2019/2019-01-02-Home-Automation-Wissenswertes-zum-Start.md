---
layout: post
title: Home Automation - Wissenswertes zum Start
date: '2019-01-02'
---

Nach Andys sehr guten Talk ["Kosten runter, Komfort rauf - Smart Home für Fortgeschrittene"](https://github.com/ChemnitzerWebDevs/slides/blob/master/2018/11-November/fhem-smarthome.pptx) hab ich selbst bisschen angefangen. Bislang dachte ich, ich müsste irgendwelche Sensoren an den Raspi ranlöten und hatte keine Lust darauf. Aber der Ansatz günstige Baumarkt-Komponenten zu verwenden und entsprechende Empfänger an den Raspi zu stöpseln hat mich überzeugt, selbst loszulegen.

<!--more-->

**Was wollte ich:**
- Steckdosen schalten zu Weihnachten, 
- Temperaturen aller Räume in Grafiken darstellen um die Heizung sinnvoll einzustellen.

**Was möchte ich nicht:**
- echte Home-Automation mit irgendeinen größeren System wie Philips Hue, IKEA TRADFRI, Homematic etc.

## Was ist da gerne noch vorher gewußt hätte und mir anfangs es etwas leichter gemacht hätte:

**CUL-Stick: 868 MHz Protokolle & 433 MHz Funksteckdosen**

- CUL - mit **C**C1101 CPU an **U**SB **L**ite, 
- kann FS20/FHT/S300/EM/HMS 
- kann auch Homematic Zentrale CCU ersetzen
- Homematic: Defacto-Standard in Deutschland
- FS20: der eigentliche Billig-Standard mit Rückkanal, aber doch teuer (160€ ein 3er-Set Steckdosen auf Amazon)
- Original **[Busware CUL Stick](http://busware.de/tiki-index.php?page=CUL)**, auf Arduino nano Basis

![vorn](/files/2019/busware-culstick-868-1.jpg)
![hinten](/files/2019/busware-culstick-868-2.jpg)

- **NanoCUL**: [Selbstbau-CUL](https://wiki.fhem.de/wiki/Selbstbau_CUL) auf Arduino nano Basis

![vorn](/files/2019/nanocul-433-1.jpg)
![hinten](/files/2019/nanocul-433-2.jpg)

- **MegaCUL**: NanoCUL mit vorgeschalteten ESP6288 um den CUL per WLAN zu konnektieren statt Serial-USB-Brücke
- da Arduino nicht genug Kapaziät für alle "Sprachen" hat, muss man sich entscheiden, kann also nicht alle seine verschiedenen Geräte gleichzeitig befeuern -- oder aber man benutzt einen

![vorn](/files/2019/megacul-868-1.jpg)
![hinten](/files/2019/megacul-868-2.jpg)

- **[MapleCUL](https://wiki.fhem.de/wiki/MapleCUN)**: 4x-Multi-CUL mit WLAN Anbindung: 
CUNO?

*868/433 MHz Kombimodus*
- NanoCUL und MegaCUL gibts in beiden Radios bestückt
- bei 868 MHz wird fürs schalten kurz auf 433 MHz umgetaktet
- kann dafür aber nicht auf 433 MHz horchen und Signale der Fernbedienung in FHEM autocreaten


**JeeLink: Temperatur-Sensoren**

- früher hat man den JeeLink USB-Stick verwendet, heute bekommt man die günstiger selbst gebaut
- Original **JeeBase JeeLink** 433 MHz

![vorn](/files/2019/jeelink-1.jpg)
![hinten](/files/2019/jeelink-2.jpg)

- ein **LaCrosseGateway** auf Wemos D1 Mini Basis mit 2x Radios

![vorn](/files/2019/lacrossegateway-1.jpg)
![hinten](/files/2019/lacrossegateway-2.jpg)


- die meisten Baumarkt-Sensoren folgen den LaCrosse-Standard
- nicht irgendeinen Sensor kaufen, sondern in die [Kompatiblitäts-Liste](https://wiki.fhem.de/wiki/JeeLink#Unterst.C3.BCtzte_Sensoren_und_Aktoren_incl._Wetterstation_WS_1600) schauen
- Batterien in nicht falsch einlegen, da die sonst direkt kaputt gehen
- funkt auf 2x unterschiedlichen Geschwindigkeiten (9,5kbps und 17,2kbps) - hat man gemischte Geräte, muss man toggeln - oder verwendet ein [LaCrosse-Gateway](https://wiki.fhem.de/wiki/LaCrosseGateway_V1.x) mit mehreren Empfängern
- kauft einfach TX29DTH-IT, hat ein LCD und gibts gelegentlich für 12€

die Wetterstationen der Umgebung sind sich nicht immer einig

![Außenstationen](/files/2019/wetterstationen-der-umgebung.jpg)

## verschiedene Software - eine Einschätzung für meine Zwecke
Nicht vergessen, oben meine Anforderungen.. Kontext matters

- begonnen mit [FHEM](https://fhem.de/) ... Perl, krepelige Optik, aber mein NanoCUL wurde erkannt \o/
- weiter mit [Home Assistant](https://www.home-assistant.io/) (unpassend HASS abgekürzt): Python, geile absolut zeitgemäße Optik, Polymer, HTML5, geht einfach los, Presence mit Fritzbox kein Problem, Tag-Nach-Rhythmus und Y-Wetter-Anbindung out-of-the-box, aber bekomme den CUL-Stick nicht ran, googeln bringt praktisch keine Treffer

![Homeassistation Diagramme](/files/2019/homeassistant-diagramme.jpg)

- weiter mit [OpenHAB](openhab.org/): Java, läuft trotzdem auf Raspi los, mehrere GUIs, bekomme bei Anbindung des CUL-Stick Exceptions - finde keine Lösung beim Googeln - schade
- lets try [Homegear](https://homegear.eu): CLI-Tool (woot?!), Homematic-Emulator in C++ mit PHP \o/ Scripting-Schnittstelle  -- das Teil kann als Homematic-CCU an Home Assistant und OpenHAB angebunden werden
- zurück zu **FHEM**: der JeeLink für die LaCrosse ist mittlerweile auch angekommen

**FHEM: eine Liebe auf den zweiten Blick**
- FHEM ist zwar nicht hübsch, passt aber für meine Zwecke gut, die Entwicklung rund um die CUL-Sticks findet im FHEM Universum statt
- genial auf den zweiten Blick ist die Kommandoeingabe gepaart mit Autocreate
- flashen des Jeelink geht auch direkt aus der Oberfläche
- das zuordnen zu Räumen über Attribute ist für Techies dann auch nachvollziehbar
- aber eigentlich ist die Oberfläche auch nicht wichtig
- Eingaben finden über Fernbedienungen, Amazon Dash Button oder Echo bzw. oder via Presence-Erkennung Bluetooth, WLAN, PIR statt; Ausgaben der Graphen via Grafana
- ach ja: vergiss FileLog und den integrierten SVG-Plot bzw. DBLog, nimm InfluxDb und Grafana
