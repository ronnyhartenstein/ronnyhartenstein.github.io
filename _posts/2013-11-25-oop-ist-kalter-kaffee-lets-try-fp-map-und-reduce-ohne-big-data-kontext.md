---
layout: post
status: publish
published: true
title: OOP ist kalter Kaffee? Let's try FP! map und reduce ohne Big-Data-Kontext
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: "<p dir=\"ltr\">Funktionale Programmierung war mir bislang eher nicht gel&auml;ufig.
  OOP ist ja das bekannte Allheilmittel, richtig? Haskell, Scala und Lisp sind ja
  abgefahrene Sprachen, die nur Wissenschaftler nutzen&hellip; Aber ein Vortrag auf
  DCHH 2013 der&nbsp; haben mich mir dann doch die Augen ge&ouml;ffnet: <a href=\"http:&#47;&#47;qafoo.com&#47;talks&#47;13_11_dc13_pure_and_functional_javascript.pdf\">Jacob
  Westhoffs \"Pure and functional Javascript\" <&#47;a>- &nbsp; <strong>JS ist auch
  funktional programmierbar!<&#47;strong><&#47;p>\r\n<p dir=\"ltr\">"
wordpress_id: 372
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=372
date: '2013-11-25 22:28:00 +0100'
date_gmt: '2013-11-25 20:28:00 +0100'
categories:
- Entwicklung
- Javascript
- Paradigmen
tags:
- Javascript
- Paradigmen
- Funktionale Programmierung
- Pure Funktion
- Map Reduce
---
<p dir="ltr">Funktionale Programmierung war mir bislang eher nicht gel&auml;ufig. OOP ist ja das bekannte Allheilmittel, richtig? Haskell, Scala und Lisp sind ja abgefahrene Sprachen, die nur Wissenschaftler nutzen&hellip; Aber ein Vortrag auf DCHH 2013 der&nbsp; haben mich mir dann doch die Augen ge&ouml;ffnet: <a href="http:&#47;&#47;qafoo.com&#47;talks&#47;13_11_dc13_pure_and_functional_javascript.pdf">Jacob Westhoffs "Pure and functional Javascript" <&#47;a>- &nbsp; <strong>JS ist auch funktional programmierbar!<&#47;strong><&#47;p></p>
<p dir="ltr"><a id="more"></a><a id="more-372"></a><&#47;p></p>
<p dir="ltr">Eine sehr gute Einf&uuml;hrung gibt es hier im ersten und bislang einzigen Javascript Onlinemagazin Mag.JS <a href="http:&#47;&#47;www.magjs.de&#47;2012-01&#47;strehl&#47;strehl.html">Funktionales Programmieren: das vernachl&auml;ssigte Paradigma<&#47;a><&#47;p><br />
Kurze Zusammenfassung der Kerngedanken:</p>
<ul>
<li>FP als Paradigma passt wunderbar zur Ablaufsteuerung<&#47;li>
<li>FP l&auml;sst eleganten Code entstehen, in JS auch durch map und reduce<&#47;li><br />
<&#47;ul></p>
<h2>Einfaches Beispiel<&#47;h2><br />
Dieses und die nachfolgenden Beispiele entstammen Jacobs Vortrag und zeigen m.E. gut und deutlich die M&auml;chtigkeit des Paradigmas.</p>
<pre>
<h1>Funktionale Programmierung: Einfaches Beispiel<&#47;h1></p>
<div id="ausgabe"><&#47;div></p>
<p><script></p>
<p>var sessions = [<br />
&nbsp;&nbsp;&nbsp; { title: 'HTML und so', speaker: 'Hans Musterfrau', description: 'Kleine Einf&uuml;hrung in HTML5' },<br />
&nbsp;&nbsp;&nbsp; { title: 'Javascript und so', speaker: 'Eva Maria Blankofix', description: 'Ausf&uuml;hrliche Einf&uuml;gung in JavaScript' },<br />
&nbsp;&nbsp;&nbsp; { title: 'PHP und so', speaker: 'Max Musterhauser', description: 'Vorlesung zum Handbuch' }<br />
];&nbsp;&nbsp; &nbsp;</p>
<p>var extract = function(property) {<br />
&nbsp;&nbsp;&nbsp; return function(object) {<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return object[property];<br />
&nbsp;&nbsp;&nbsp; };<br />
};</p>
<p>var wrapIn = function(element) {<br />
&nbsp;&nbsp;&nbsp; return function(input) {<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return "<" + element + ">" + input + "<&#47;" + element + ">";<br />
&nbsp;&nbsp;&nbsp; };<br />
};</p>
<p>var concatenate = function(accumulation, next ) {<br />
&nbsp;&nbsp;&nbsp; return accumulation + next;<br />
};</p>
<p>&#47;&#47; BISHER<br />
&#47;*<br />
var sessionList = "";<br />
var i, len ;<br />
for (i=0, len = sessions.length; i < len; i ++) {<br />
&nbsp;&nbsp;&nbsp; sessionList += "
<li>" + sessions[i].title + "<&#47;li>";<br />
}<br />
*&#47;<br />
&#47;&#47; FUNKTIONAL</p>
<p><strong>var sessionList = sessions<&#47;strong><br />
<strong>&nbsp;&nbsp;&nbsp; .map( extract("title") )<&#47;strong><br />
<strong>&nbsp;&nbsp;&nbsp; .map( wrapIn("li") )<&#47;strong><br />
<strong>&nbsp;&nbsp;&nbsp; .reduce( concatenate, " " ) ;<&#47;strong></p>
<p>document.getElementById('ausgabe').innerHTML = "
<ul>" + sessionList + "<&#47;ul>";</p>
<p><&#47;script><&#47;pre><br />
&nbsp;</p>
<h2>und nun noch in PHP<&#47;h2></p>
<pre>&nbsp;<br />
<h1>Funktionale Programmierung in PHP: Einfaches Beispiel<&#47;h1><br />
<?php<br />
error_reporting(E_ALL);<br />
ini_set('display_errors',1);</p>
<p>$sessions = array(<br />
 &nbsp;&nbsp;&nbsp;array( 'title' => 'HTML und so', 'speaker' => 'Hans Musterfrau', 'description' => 'Kleine Einf&uuml;hrung in HTML5' ),<br />
 &nbsp;&nbsp;&nbsp;array( 'title' => 'Javascript und so', 'speaker' => 'Eva Maria Blankofix', 'description' => 'Ausf&uuml;hrliche Einf&uuml;gung in JavaScript' ),<br />
 &nbsp;&nbsp;&nbsp;array( 'title' => 'PHP und so', 'speaker' => 'Max Musterhauser', 'description' => 'Vorlesung zum Handbuch' )<br />
);</p>
<p>function extractItm($property) {<br />
 &nbsp;&nbsp;&nbsp;return function($object) use ($property) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;return $object[$property];<br />
 &nbsp;&nbsp;&nbsp;};<br />
}</p>
<p>function wrapIn($element) {<br />
 &nbsp;&nbsp;&nbsp;return function($input) use ($element) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;return "<" . $element . ">" . $input . "<&#47;" . $element . ">";<br />
 &nbsp;&nbsp;&nbsp;};<br />
}</p>
<p>function concatenate($accumulation, $next) {<br />
 &nbsp;&nbsp;&nbsp;return $accumulation . $next;<br />
};</p>
<p>&#47;&#47; FUNKTIONAL</p>
<p>$sessionExtract = array_map(extractItm("title"), $sessions);<br />
$sessionLi = array_map(wrapIn("li"), &nbsp;$sessionExtract);<br />
$sessionList = array_reduce($sessionLi, "concatenate", " ");</p>
<p>print "
<ul>" . $sessionList . "<&#47;ul>";<br />
?><&#47;pre><br />
&nbsp;</p>
<h2>Komplexes Beispiel<&#47;h2></p>
<pre>
<h1>Funktionale Programmierung: Komplexes Beispiel<&#47;h1></p>
<div id="ausgabe"><&#47;div></p>
<p><script><br />
var sessions = [<br />
 &nbsp;&nbsp;&nbsp;{ title: 'HTML und so', speaker: 'Hans Musterfrau', description: 'Kleine Einf&uuml;hrung in HTML5' },<br />
 &nbsp;&nbsp;&nbsp;{ title: 'Javascript und so', speaker: 'Eva Maria Blankofix', description: 'Ausf&uuml;hrliche Einf&uuml;gung in JavaScript' },<br />
 &nbsp;&nbsp;&nbsp;{ title: 'PHP und so', speaker: 'Max Musterhauser', description: 'Vorlesung zum Handbuch' }<br />
]; &nbsp;&nbsp;&nbsp;</p>
<p>&#47;&#47; ----------------------------------------<br />
&#47;&#47; Pure Funktionen</p>
<p>var extract = function(property) {<br />
 &nbsp;&nbsp;&nbsp;return function(object) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;return object[property];<br />
 &nbsp;&nbsp;&nbsp;}<br />
}</p>
<p>var wrapIn = function(element) {<br />
 &nbsp;&nbsp;&nbsp;return function(input) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;return "<" + element + ">" + input + "<&#47;" + element + ">";<br />
 &nbsp;&nbsp;&nbsp;}<br />
}</p>
<p>var concatenate = function(accumulation, next) {<br />
 &nbsp;&nbsp;&nbsp;return accumulation + next;<br />
}</p>
<p>var highlight = function(&#47;* argumente... *&#47;) {<br />
 &nbsp;&nbsp;&nbsp;var args = Array.prototype.slice.call(arguments);<br />
 &nbsp;&nbsp;&nbsp;return function (input) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;args.forEach(function(replacement) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;input = input.replace (<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;new RegExp("\\b" + replacement + "\\b"),<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;"<em>" + replacement + "<&#47;em>"<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;);<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;});<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;return input;<br />
 &nbsp;&nbsp;&nbsp;}<br />
}</p>
<p>var ellipsis = function(maxLength) {<br />
 &nbsp;&nbsp;&nbsp;return function(input) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;if ( input.length <= maxLength ) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return input ;<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;}<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;return input.substring(0, maxLength - 1) + "... ";<br />
 &nbsp;&nbsp;&nbsp;}<br />
}</p>
<p>var prefix = function(prefix) {<br />
 &nbsp;&nbsp;&nbsp;return function(input) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;return prefix + input ;<br />
 &nbsp;&nbsp;&nbsp;}<br />
} </p>
<p>var uppercaseEveryFirst = function() {<br />
 &nbsp;&nbsp;&nbsp;return function(input) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;return input<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;.split(" ")<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;.map( uppercaseFirst() )<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;.join(" ") ;<br />
 &nbsp;&nbsp;&nbsp;}<br />
}</p>
<p>var uppercaseFirst = function() {<br />
 &nbsp;&nbsp;&nbsp;return function(input) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;return input.charAt(0).toUpperCase ( )<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;+ input.substring(1) ;<br />
 &nbsp;&nbsp;&nbsp;}<br />
}</p>
<p>var join = function(delimiter) {<br />
 &nbsp;&nbsp;&nbsp;return function(input) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;return input.join(delimiter);<br />
 &nbsp;&nbsp;&nbsp;}<br />
}</p>
<p>var weave = function(a, b, c) {<br />
 &nbsp;&nbsp;&nbsp;var arr = [];<br />
 &nbsp;&nbsp;&nbsp;for (var i=0; i<a.length; i++) {<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;arr.push([ a[i], b[i], c[i] ]);<br />
 &nbsp;&nbsp;&nbsp;}<br />
 &nbsp;&nbsp;&nbsp;return arr;<br />
}</p>
<p>&#47;&#47; -------------------------------------------------<br />
&#47;&#47; Map und Reduce</p>
<p><strong>var titles = sessions<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.map( extract("title") )<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.map( wrapIn("h2") );<&#47;strong></p>
<p><strong>var speakers = sessions<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.map( extract("speaker") )<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.map( uppercaseEveryFirst() )<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.map( prefix("Speaker: ") )<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.map( wrapIn("h3") ) ;<&#47;strong></p>
<p><strong>var descriptions = sessions<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.map( extract("description") )<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.map( ellipsis(160) )<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.map( highlight("JavaScript", "HTML5") )<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.map( wrapIn("p") ) ;<&#47;strong></p>
<p><strong>var result = weave(titles, speakers, descriptions)<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.map( join() )<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.map( wrapIn("div") )<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;.reduce( concatenate );<&#47;strong></p>
<p>document.getElementById('ausgabe').innerHTML = result;</p>
<p><&#47;script><&#47;pre></p>
<h2>Geht auch asyncron!<&#47;h2></p>
<p dir="ltr">Mit Hilfe der<a href="https:&#47;&#47;github.com&#47;caolan&#47;async"> Async.js<&#47;a> Bibliothek funktioniert das ganze auch asynchron:<&#47;p></p>
<pre>&nbsp;<html><br />
<script src="http:&#47;&#47;ajax.googleapis.com&#47;ajax&#47;libs&#47;jquery&#47;1.9.1&#47;jquery.min.js"><&#47;script><br />
<script src="async.js"><&#47;script><br />
<body><br />
<script><br />
&#47;&#47; Asynchronous map&#47;reduce to the rescue</p>
<p>&#47;&#47; https:&#47;&#47;github.com&#47;caolan&#47;async</p>
<p>var ajax = function ( url , done ) {<br />
 &nbsp;&nbsp;&nbsp;$.ajax({<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;url : url ,<br />
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;success : done<br />
 &nbsp;&nbsp;&nbsp;});<br />
} </p>
<p><strong>var fetch = function ( urls , done ) {<&#47;strong><br />
<strong> &nbsp;&nbsp;&nbsp;async.map( urls , ajax , done );<&#47;strong><br />
<strong>}<&#47;strong></p>
<p>var urls = [<br />
 &nbsp;&nbsp;&nbsp;'http:&#47;&#47;heise.de&#47;',<br />
 &nbsp;&nbsp;&nbsp;'http:&#47;&#47;t3n.de&#47;',<br />
 &nbsp;&nbsp;&nbsp;'http:&#47;&#47;tagesschau.de&#47;'<br />
];</p>
<p>fetch(urls);<br />
<&#47;script><&#47;pre></p>
<p dir="ltr"><em>BTW:<&#47;em> Async.js hat noch einen ganzen Sack voll Funktionen mehr im Bauch...<&#47;p><br />
&nbsp;</p>
<h2>Fazit<&#47;h2></p>
<p dir="ltr">Meine Meinung dazu? Es ist ein Paradigma, was man kennen sollte um es bei passender Gelegenheit einzusetzen.<&#47;p><br />
&nbsp;</p>
<p dir="ltr">Manuel Strehl schreibt passend dazu:<&#47;p></p>
<blockquote>
<p dir="ltr">Unter JavaScript-Programmierern mit OOP-Hintergrund erfreut sich backbone.js als Quasi-MVC-Framework steigender Beliebtheit. Es ist nicht ohne ein bisschen Ironie, dass dessen einzige harte Abh&auml;ngigkeit das gerade erw&auml;hnte underscore.js ist, eine Bibliothek, die fehlende Elemente anderer funktionaler Sprachen in JavaScript umsetzt.<&#47;p></p>
<p dir="ltr">Andererseits zeigt diese Symbiose sehr sch&ouml;n die Flexibilit&auml;t von JavaScript und die Vielseitigkeit und M&auml;chtigkeit, die sich aus dem Mischen verschiedener Paradigmen ergibt. Wenn man einmal angefangen hat, funktionale Features zu verwenden, wird man Sprachen verfluchen, die Funktionen nicht als Objekte erster Klasse behandeln. Es wird sich anf&uuml;hlen wie ein Werkzeugkasten, aus dem jemand alle Schraubenzieher gestohlen hat.<&#47;p><br />
<&#47;blockquote></p>
<p dir="ltr">In dem Sinne: <strong>Happy Coding<&#47;strong> &ndash; habt Spa&szlig; daran!<&#47;p></p>
