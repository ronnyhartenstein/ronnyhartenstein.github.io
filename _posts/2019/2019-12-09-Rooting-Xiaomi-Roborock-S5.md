---
layout: post
title: 'China-Cloud adéu: Xiaomi Roborock S5 gerootet via Dustcloud und Valetudo'
date: '2019-11-09'
---

Zum Black Friday tickerte auf mydealz.de der Roborock S5 als Schnäppele für 270 € durch. @MorrisJobke klickte, später ich auch. Dabei verrichtet der Roomba 774p noch treu seinen Dienst. Aber der hat keine Laserorientierung und zieht keinen nassen Lappen hinter sich her.
Nun ja, dem Fortschritt in seinem Lauf, hält weder Ochs noch Esel auf.


Aber ich hätte nicht geklickt, wenn der nur toll via Mi App über potentiell China-Cloud nach hause funken würde. Also war das ausschlaggebende Kaufargument, neben den o.g. Sachzwängen, **ich kann und werde es rooten**. 

Wie also geht das? Morris hat das sich mit viel Fluchen durch die Anleitungen gekämpft, die Schritt für Schritt den Build eines Images erklären. Das geht aber nur unter Linux und gar nicht mal so einfach. Per Android gibts wohl auch einen Weg, ist aber auch tricky. Irgendwann ist er über den **Dustbuilder** gestolpert der das einfach alles einmal wegkapselt. Wie das alles im einzelnen geht, ist nachfolgend beschrieben.

<!--more-->

Hier schonmal die Quellen:
- Valetudo Install Guide: https://github.com/Hypfer/Valetudo/wiki/Installation-Instructions
- FAQ: https://github.com/Hypfer/Valetudo/wiki/FAQ (inkl. German Voice Pack)

## 1. Firmware Image anfordern

Auf [Dustcloud Builder das Image bauen](https://dustbuilder.xvm.mit.edu) bauen. 
Dort folgendes wählen:
- "Let DustBuilder generate a SSH Keypair for you, it will be sent unencrypted via Email" wählen, kann man später tauschen
- unbedingt "Preinstall valetudo 0.4.x" anhaken, sonst gibts kein Webinterface
- "Preinstall Nano texteditor, wget, htop, hexdump" schadet nicht
- "Rockrobo S50, S55, S5x, roborock.vacuum.s5" > "Gen2 (ver 1886) recommended"
- kleinen "Create Job" Button klicken

## 2. Python Repo erstellen
```
mkdir flasher
cd flasher
python3 -m venv venv
source venv/bin/activate
pip3 install wheel
pip3 install python-miio
```

Dustcloud klonen ins Python Repo
```
git clone https://github.com/dgiese/dustcloud
```

## 3. Robo Wifi starten

Äußere Buttons am Robo für 3 Sekunden drücken
Am Mac zum WLAN "roborock_..." verbinden

## 4. Firmware Image und Zerts laden

Mittlerweile sollte die Mail mit dem Link zum Image und zu den Zerts angekommen sein.
Beides herunterladen und die Zerts auspacken. 

## 5. Flashen

```
$ python3 dustcloud/devices/xiaomi.vacuum/firmwarebuilder/flasher.py --firmware ~/Downloads/xiaomi-S5-dustcloud-v11_001886.pkg
Flasher for Xiaomi Vacuum
Address is not set. Trying to discover.
Connecting to device 192.168.8.1...
Sending handshake to get token
Starting local http server...
Serving http server at 192.168.8.10:55087
Sending ota command with parameters: {"mode": "normal", "install": "1", "app_url": "http://192.168.8.10:55087/xiaomi-S5-dustcloud-v11_001886.pkg", "file_md5": "832cc62584ba3904decd38b00f3bb453", "proc": "dnld install"}
Ota started!
192.168.8.1 - - [07/Dec/2019 23:08:22] "GET /xiaomi-S5-dustcloud-v11_001886.pkg HTTP/1.1" 200 -
Progress: |██------------------------------------------------| 5.0% 
...                                                              
Firmware downloaded successfully.
Exiting.
```

Es kann passieren, dass die Übertragung abbricht mit etwa:
```
Exception happened during processing of request from ('192.168.8.1', 49665)
Traceback (most recent call last):
[..]
BrokenPipeError: [Errno 32] Broken pipe
```
Dann einfach nochmal Wifi am Robo reseten und erneut versuchen.

Wenn der Robo die Firmware vom Mac heruntergeladen hat, spricht es "Updating firmware. It maybe take 5 to 10 minutes."

Wenn fertig ertönt eine Tada-Melodie und "Charging" gefolgt von "Updated successfully."

## 6. WIFI via Browser konfigurieren

Dann im Browser http://192.168.8.1 aufrufen und seine WLAN Credentials hinterlegen.

Jetzt per SSH drauf verbinden und neustarten
```
ssh -i /Users/ronny/Downloads/j5dec1b556a7b9-keys/j5dec1b556a7b9.id_rsa  root@192.168.8.1
reboot
```

## 7. Robo im Netzwerk finden

Nach dem Neustart bekommt der Robo vom Router eine neue IP zugewiesen.
Diese heraussuchen und im Browser öffnen.
Ab da gibts eine schöne Weboberfläche wo man auch die SSH-Keys unbedingt tauschen sollte.

**Fertig!**


## Bonbon: MQTT aktivieren

https://github.com/Hypfer/Valetudo/wiki/Home-Assistant-Integration

Datei `/mnt/data/valetudo/config.json` editieren:
```
"mqtt": {
    "enabled": true,
    "identifier": "rockrobo",
    "topicPrefix": "valetudo",
    "autoconfPrefix": "homeassistant",
    "broker_url": "mqtt://mqtt.home",
    "provideMapData": true,
    "caPath": ""
  },
```

Funktioniert. Publisht bald unter dem Topic `valetudo/rockrobo`
Das `provideMapData` mag man ausschalten wenn man es nicht nutzt.

## Wichtig! Dateien fürs Backup

https://github.com/Hypfer/Valetudo/wiki/Important-Files-&-Folder

- Zones + Spots configuration, mqtt + other config -> `/mnt/data/valetudo/config.json`
- Status to keep map  -> `/mnt/data/rockrobo/lab.cfg`

various map data
- current map -> `mnt/data/rockrobo/user_map0`
- previous map, will be used if robot does not recognize where it is -> `mnt/data/rockrobo/last_map` 
- last cleaning path -> `mnt/data/rockrobo/robot.db` 
- virtual zones and walls? -> `mnt/data/rockrobo/PersistData` 
- named positions -> `mnt/data/rockrobo/ChargerPos.data`, `mnt/data/rockrobo/StartPos.data`

## Troubleshooting: Token manuell auslesen

Falls der Flash-Befehl aus Schritt 5 das Gerät nicht finden kann oder das Token nicht auslesen kann, dann hilft eventuell noch das manuelle Auslesen. Dazu einfach im venv folgenden Befehl ausführen und die IP-Adresse und das Token aus der vorletzten Zeile mittels `-a IP -t TOKEN` an den `flasher.py` übergeben.

```
$ mirobo --debug discover --handshake true
INFO:miio.vacuum_cli:Debug mode active
INFO:miio.miioprotocol:Sending discovery to <broadcast> with timeout of 5s..
DEBUG:miio.protocol:Unable to decrypt, returning raw bytes: b''
DEBUG:miio.miioprotocol:Got a response: Container:
    data = Container:
        data = b'' (total 0)
        value = b'' (total 0)
        offset1 = 32
        offset2 = 32
        length = 0
    header = Container:
        data = b'!1\x00 \x00\x00\x00\x00\x0f\x99\\\xbb\x00\x00\x0b\x1f' (total 16)
        value = Container:
            length = 32
            unknown = 0
            device_id = unhexlify('0f995cbb')
            ts = 1970-01-01 00:47:27
        offset1 = 0
        offset2 = 16
        length = 16
    checksum = b'VdebsnHPhgthzlfk' (total 16)
INFO:miio.miioprotocol:  IP 192.168.8.1 (ID: 0f995cbb) - token: b'TOKEN_IS_WRITTEN_HERE'
INFO:miio.miioprotocol:Discovery done
```
