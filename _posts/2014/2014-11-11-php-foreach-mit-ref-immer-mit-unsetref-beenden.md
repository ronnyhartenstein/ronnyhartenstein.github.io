---
layout: post
title: 'PHP: foreach mit &amp;$ref immer mit unset($ref) beenden [Update]'
date_first: '2014-11-11'
date: '2016-03-12'
categories:
- Allgemein
- PHP
---

**Update** In PHP 7 ändert `foreach` nicht mehr den internen Array Referenzen. Siehe [Backward incompatible changes](http://php.net/manual/de/migration70.incompatible.php#migration70.incompatible.variable-handling.list.string)

> The order of the elements in an array has changed when those elements have been automatically created by referencing them in a by reference assignment.

**TL;DR** Wenn man in PHP 5 `foreach` mit Array Referenzen arbeitet muss man abschließend ein `unset()` machen.

<!--more-->

Referenzen in PHP sind tückisch, wie ich gerade wieder einmal feststellen durfte. Solche Konstrukten kennen wir ja alle:

```php
foreach ($a['sehr']['tiefes']['array'] as &$b) {
    $b['anzahl'] += 10;
}
```

Das lässt sich besser lesen als das hier:

```php
foreach ($a['sehr']['tiefes']['array'] as $i => $b) {
    $a['sehr']['tiefes']['array'][$i]['anzahl'] = $b['anzahl'] + 10;
}
```

Die Kollegen haben mich aber immer angehalten, hinter solche foreach-Konstrukte ein unset zu platzieren.

Es hätte wohl schon komische Phänomene gegeben, wenn man es nicht tut, aber so recht innermechanisch erklären konnte es keiner. Nun ja, bis jetzt.

So muss es also ausschauen:

```php
foreach ($a['sehr']['tiefes']['array'] as &$b) {
    $b['anzahl'] += 10;
}
unset($b);
```

Heute ist es nun tatsächlich „in a nutshell“ passiert. Hier nun ein Minimalbeispiel wie es zustande kommt:

```php
$a1 = array(1, 2, 3);
$a2 = array('d' ,'e', 'f');
foreach ($a1 as &$b) {}
foreach ($a2 as $b) {}
var_dump($a1);  
```

Ergebnis:

```
array
    0 => int 1
    1 => int 2
    2 => &string 'f' (length=1)
```

_WTF?_

## Erklärung

PHP hat für `$b` als letztes die Referenz auf den letzten Eintrag von $a (da noch 3). Bei der zweiten Interation legt er jeden Wert aus `$a2` auf `$b` und damit durch die Referenz auf den letzten Eintrag von `$a1`. Klar soweit?

Das geht übrigens auch mit dem selben Array:

```php
$a = array('a', 'b', 'c');
foreach ($a as &$b) {}
foreach ($a as $b) {}
var_dump($a);
```

Ergebnis:

```
array
    0 => string 'a' (length=1)
    1 => string 'b' (length=1)
    2 => &string 'b' (length=1)
```

Also vergesst nie das unset nachdem ihr mit Referenzen in `foreaches` herumgespielt habt!
