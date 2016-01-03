---
layout: post
status: publish
published: true
title: 'PHP: foreach mit &amp;$ref immer mit unset($ref) beenden'
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: "<p>Referenzen in PHP sind t&uuml;ckisch, wie ich gerade wieder einmal feststellen
  durfte. Solche Konstrukten kennen wir ja alle:<&#47;p>\n\n<pre><code>foreach ($a['sehr']['tiefes']['array']
  as &amp;$b) {\n    $b['anzahl'] += 10;\n}\n<&#47;code><&#47;pre>\n\n<p>Das l&auml;sst
  sich besser lesen als das hier:<&#47;p>\n\n<pre><code>foreach ($a['sehr']['tiefes']['array']
  as $i => $b) { \n    $a['sehr']['tiefes']['array'][$i]['anzahl'] = $b['anzahl']
  + 10; \n}\n<&#47;code><&#47;pre>\n\n<p>Die Kollegen haben mich aber immer angehalten,
  hinter solche <code>foreach<&#47;code>-Konstrukte ein <code>unset<&#47;code> zu
  platzieren.<&#47;p>\n\n<p>Es h&auml;tte wohl schon komische Ph&auml;nomene gegeben,
  wenn man es nicht tut, aber so recht innermechanisch erkl&auml;ren konnte es keiner.
  Nun ja, bis jetzt.\n"
wordpress_id: 460
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=460
date: '2014-11-11 11:48:08 +0100'
date_gmt: '2014-11-11 09:48:08 +0100'
categories:
- Allgemein
- PHP
tags: []
---
<p>Referenzen in PHP sind t&uuml;ckisch, wie ich gerade wieder einmal feststellen durfte. Solche Konstrukten kennen wir ja alle:<&#47;p></p>
<pre><code>foreach ($a['sehr']['tiefes']['array'] as &amp;$b) {<br />
    $b['anzahl'] += 10;<br />
}<br />
<&#47;code><&#47;pre></p>
<p>Das l&auml;sst sich besser lesen als das hier:<&#47;p></p>
<pre><code>foreach ($a['sehr']['tiefes']['array'] as $i => $b) {<br />
    $a['sehr']['tiefes']['array'][$i]['anzahl'] = $b['anzahl'] + 10;<br />
}<br />
<&#47;code><&#47;pre></p>
<p>Die Kollegen haben mich aber immer angehalten, hinter solche <code>foreach<&#47;code>-Konstrukte ein <code>unset<&#47;code> zu platzieren.<&#47;p></p>
<p>Es h&auml;tte wohl schon komische Ph&auml;nomene gegeben, wenn man es nicht tut, aber so recht innermechanisch erkl&auml;ren konnte es keiner. Nun ja, bis jetzt.<br />
<a id="more"></a><a id="more-460"></a><&#47;p></p>
<p>So muss es also ausschauen:<&#47;p></p>
<pre><code>foreach ($a['sehr']['tiefes']['array'] as &amp;$b) {<br />
    $b['anzahl'] += 10;<br />
}<br />
unset($b);<br />
<&#47;code><&#47;pre></p>
<p>Heute ist es nun tats&auml;chlich "in a nutshell" passiert. Hier nun ein Minimalbeispiel wie es zustande kommt:<&#47;p></p>
<pre><code>$a1 = array(1, 2, 3);<br />
$a2 = array('d' ,'e', 'f');<br />
foreach ($a1 as &amp;$b) {}<br />
foreach ($a2 as $b) {}<br />
var_dump($a1);<br />
<&#47;code><&#47;pre></p>
<p>Ergebnis:<&#47;p></p>
<pre><code>array<br />
    0 => int 1<br />
    1 => int 2<br />
    2 => &amp;string 'f' (length=1)<br />
<&#47;code><&#47;pre></p>
<p><em>WTF?<&#47;em><&#47;p></p>
<h2>Erkl&auml;rung<&#47;h2></p>
<p>PHP hat f&uuml;r $b als letztes die Referenz auf den letzten Eintrag von $a (da noch <code>3<&#47;code>). Bei der zweiten Interation legt er jeden Wert aus $a2 auf $b und damit durch die Referenz auf den letzten Eintrag von <code>$a1<&#47;code>. Klar soweit?<&#47;p></p>
<p>Das geht &uuml;brigens auch mit dem selben Array:<&#47;p></p>
<pre><code>$a = array('a', 'b', 'c');<br />
foreach ($a as &amp;$b) {}<br />
foreach ($a as $b) {}<br />
var_dump($a);<br />
<&#47;code><&#47;pre></p>
<p>Ergebnis:<&#47;p></p>
<pre><code>array<br />
    0 => string 'a' (length=1)<br />
    1 => string 'b' (length=1)<br />
    2 => &amp;string 'b' (length=1)<br />
<&#47;code><&#47;pre></p>
<p>Also vergesst nie das <code>unset<&#47;code> nachdem ihr mit Referenzen in <code>foreach<&#47;code>es herumgespielt habt!<&#47;p></p>
