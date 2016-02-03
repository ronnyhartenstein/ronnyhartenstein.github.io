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
<p dir="ltr">Funktionale Programmierung war mir bislang eher nicht geläufig. OOP ist ja das bekannte Allheilmittel, richtig? Haskell, Scala und Lisp sind ja abgefahrene Sprachen, die nur Wissenschaftler nutzen… Aber ein Vortrag auf DCHH 2013 der&nbsp; haben mich mir dann doch die Augen geöffnet: <a href="http://qafoo.com/talks/13_11_dc13_pure_and_functional_javascript.pdf">Jacob Westhoffs „Pure and functional Javascript“ </a>– &nbsp; <strong>JS ist auch funktional programmierbar!</strong></p>

<!--more-->

<p dir="ltr">Eine sehr gute Einführung gibt es hier im ersten und bislang einzigen Javascript Onlinemagazin Mag.JS <a href="http://www.magjs.de/2012-01/strehl/strehl.html">Funktionales Programmieren: das vernachlässigte Paradigma</a></p>
<p>Kurze Zusammenfassung der Kerngedanken:</p>
<ul>
<li>FP als Paradigma passt wunderbar zur Ablaufsteuerung</li>
<li>FP lässt eleganten Code entstehen, in JS auch durch map und reduce</li>
</ul>
<h2>Einfaches Beispiel</h2>
<p>Dieses und die nachfolgenden Beispiele entstammen Jacobs Vortrag und zeigen m.E. gut und deutlich die Mächtigkeit des Paradigmas.</p>
<pre class="prettyprint prettyprinted" style=""><span class="tag">&lt;h1&gt;</span><span class="pln">Funktionale Programmierung: Einfaches Beispiel</span><span class="tag">&lt;/h1&gt;</span><span class="pln">
</span><span class="tag">&lt;div</span><span class="pln"> </span><span class="atn">id</span><span class="pun">=</span><span class="atv">"ausgabe"</span><span class="tag">&gt;&lt;/div&gt;</span><span class="pln">

</span><span class="tag">&lt;script&gt;</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> sessions </span><span class="pun">=</span><span class="pln"> </span><span class="pun">[</span><span class="pln">
&nbsp;&nbsp;&nbsp; </span><span class="pun">{</span><span class="pln"> title</span><span class="pun">:</span><span class="pln"> </span><span class="str">'HTML und so'</span><span class="pun">,</span><span class="pln"> speaker</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Hans Musterfrau'</span><span class="pun">,</span><span class="pln"> description</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Kleine Einführung in HTML5'</span><span class="pln"> </span><span class="pun">},</span><span class="pln">
&nbsp;&nbsp;&nbsp; </span><span class="pun">{</span><span class="pln"> title</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Javascript und so'</span><span class="pun">,</span><span class="pln"> speaker</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Eva Maria Blankofix'</span><span class="pun">,</span><span class="pln"> description</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Ausführliche Einfügung in JavaScript'</span><span class="pln"> </span><span class="pun">},</span><span class="pln">
&nbsp;&nbsp;&nbsp; </span><span class="pun">{</span><span class="pln"> title</span><span class="pun">:</span><span class="pln"> </span><span class="str">'PHP und so'</span><span class="pun">,</span><span class="pln"> speaker</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Max Musterhauser'</span><span class="pun">,</span><span class="pln"> description</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Vorlesung zum Handbuch'</span><span class="pln"> </span><span class="pun">}</span><span class="pln">
</span><span class="pun">];</span><span class="pln">&nbsp;&nbsp; &nbsp;

</span><span class="kwd">var</span><span class="pln"> extract </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">property</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
&nbsp;&nbsp;&nbsp; </span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">object</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span class="kwd">return</span><span class="pln"> object</span><span class="pun">[</span><span class="pln">property</span><span class="pun">];</span><span class="pln">
&nbsp;&nbsp;&nbsp; </span><span class="pun">};</span><span class="pln">
</span><span class="pun">};</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> wrapIn </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">element</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
&nbsp;&nbsp;&nbsp; </span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">input</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span class="kwd">return</span><span class="pln"> </span><span class="str">"&lt;"</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> element </span><span class="pun">+</span><span class="pln"> </span><span class="str">"&gt;"</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> input </span><span class="pun">+</span><span class="pln"> </span><span class="str">"&lt;/"</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> element </span><span class="pun">+</span><span class="pln"> </span><span class="str">"&gt;"</span><span class="pun">;</span><span class="pln">
&nbsp;&nbsp;&nbsp; </span><span class="pun">};</span><span class="pln">
</span><span class="pun">};</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> concatenate </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">accumulation</span><span class="pun">,</span><span class="pln"> next </span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
&nbsp;&nbsp;&nbsp; </span><span class="kwd">return</span><span class="pln"> accumulation </span><span class="pun">+</span><span class="pln"> next</span><span class="pun">;</span><span class="pln">
</span><span class="pun">};</span><span class="pln">

</span><span class="com">// BISHER</span><span class="pln">
</span><span class="com">/*
var sessionList = "";
var i, len ;
for (i=0, len = sessions.length; i &lt; len; i ++) {
&nbsp;&nbsp;&nbsp; sessionList += "&lt;li&gt;" + sessions[i].title + "&lt;/li&gt;";
}
*/</span><span class="pln">
</span><span class="com">// FUNKTIONAL</span><span class="pln">

</span><strong><span class="kwd">var</span><span class="pln"> sessionList </span><span class="pun">=</span><span class="pln"> sessions</span></strong><span class="pln">
</span><strong><span class="pln">&nbsp;&nbsp;&nbsp; </span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> extract</span><span class="pun">(</span><span class="str">"title"</span><span class="pun">)</span><span class="pln"> </span><span class="pun">)</span></strong><span class="pln">
</span><strong><span class="pln">&nbsp;&nbsp;&nbsp; </span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> wrapIn</span><span class="pun">(</span><span class="str">"li"</span><span class="pun">)</span><span class="pln"> </span><span class="pun">)</span></strong><span class="pln">
</span><strong><span class="pln">&nbsp;&nbsp;&nbsp; </span><span class="pun">.</span><span class="pln">reduce</span><span class="pun">(</span><span class="pln"> concatenate</span><span class="pun">,</span><span class="pln"> </span><span class="str">" "</span><span class="pln"> </span><span class="pun">)</span><span class="pln"> </span><span class="pun">;</span></strong><span class="pln">

document</span><span class="pun">.</span><span class="pln">getElementById</span><span class="pun">(</span><span class="str">'ausgabe'</span><span class="pun">).</span><span class="pln">innerHTML </span><span class="pun">=</span><span class="pln"> </span><span class="str">"&lt;ul&gt;"</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> sessionList </span><span class="pun">+</span><span class="pln"> </span><span class="str">"&lt;/ul&gt;"</span><span class="pun">;</span><span class="pln">

</span><span class="tag">&lt;/script&gt;</span></pre>
<p>&nbsp;</p>
<h2>und nun noch in PHP</h2>
<pre class="prettyprint prettyprinted" style=""><span class="pln">&nbsp;</span><span class="tag">&lt;h1&gt;</span><span class="pln">Funktionale Programmierung in PHP: Einfaches Beispiel</span><span class="tag">&lt;/h1&gt;</span><span class="pln">
</span><span class="pun">&lt;?</span><span class="pln">php
error_reporting</span><span class="pun">(</span><span class="pln">E_ALL</span><span class="pun">);</span><span class="pln">
ini_set</span><span class="pun">(</span><span class="str">'display_errors'</span><span class="pun">,</span><span class="lit">1</span><span class="pun">);</span><span class="pln">

$sessions </span><span class="pun">=</span><span class="pln"> array</span><span class="pun">(</span><span class="pln">
 &nbsp;&nbsp;&nbsp;array</span><span class="pun">(</span><span class="pln"> </span><span class="str">'title'</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="str">'HTML und so'</span><span class="pun">,</span><span class="pln"> </span><span class="str">'speaker'</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="str">'Hans Musterfrau'</span><span class="pun">,</span><span class="pln"> </span><span class="str">'description'</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="str">'Kleine Einführung in HTML5'</span><span class="pln"> </span><span class="pun">),</span><span class="pln">
 &nbsp;&nbsp;&nbsp;array</span><span class="pun">(</span><span class="pln"> </span><span class="str">'title'</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="str">'Javascript und so'</span><span class="pun">,</span><span class="pln"> </span><span class="str">'speaker'</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="str">'Eva Maria Blankofix'</span><span class="pun">,</span><span class="pln"> </span><span class="str">'description'</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="str">'Ausführliche Einfügung in JavaScript'</span><span class="pln"> </span><span class="pun">),</span><span class="pln">
 &nbsp;&nbsp;&nbsp;array</span><span class="pun">(</span><span class="pln"> </span><span class="str">'title'</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="str">'PHP und so'</span><span class="pun">,</span><span class="pln"> </span><span class="str">'speaker'</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="str">'Max Musterhauser'</span><span class="pun">,</span><span class="pln"> </span><span class="str">'description'</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="str">'Vorlesung zum Handbuch'</span><span class="pln"> </span><span class="pun">)</span><span class="pln">
</span><span class="pun">);</span><span class="pln">

</span><span class="kwd">function</span><span class="pln"> extractItm</span><span class="pun">(</span><span class="pln">$property</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">$object</span><span class="pun">)</span><span class="pln"> </span><span class="kwd">use</span><span class="pln"> </span><span class="pun">(</span><span class="pln">$property</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">return</span><span class="pln"> $object</span><span class="pun">[</span><span class="pln">$property</span><span class="pun">];</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">};</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="kwd">function</span><span class="pln"> wrapIn</span><span class="pun">(</span><span class="pln">$element</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">$input</span><span class="pun">)</span><span class="pln"> </span><span class="kwd">use</span><span class="pln"> </span><span class="pun">(</span><span class="pln">$element</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">return</span><span class="pln"> </span><span class="str">"&lt;"</span><span class="pln"> </span><span class="pun">.</span><span class="pln"> $element </span><span class="pun">.</span><span class="pln"> </span><span class="str">"&gt;"</span><span class="pln"> </span><span class="pun">.</span><span class="pln"> $input </span><span class="pun">.</span><span class="pln"> </span><span class="str">"&lt;/"</span><span class="pln"> </span><span class="pun">.</span><span class="pln"> $element </span><span class="pun">.</span><span class="pln"> </span><span class="str">"&gt;"</span><span class="pun">;</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">};</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="kwd">function</span><span class="pln"> concatenate</span><span class="pun">(</span><span class="pln">$accumulation</span><span class="pun">,</span><span class="pln"> $next</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> $accumulation </span><span class="pun">.</span><span class="pln"> $next</span><span class="pun">;</span><span class="pln">
</span><span class="pun">};</span><span class="pln">

</span><span class="com">// FUNKTIONAL</span><span class="pln">

$sessionExtract </span><span class="pun">=</span><span class="pln"> array_map</span><span class="pun">(</span><span class="pln">extractItm</span><span class="pun">(</span><span class="str">"title"</span><span class="pun">),</span><span class="pln"> $sessions</span><span class="pun">);</span><span class="pln">
$sessionLi </span><span class="pun">=</span><span class="pln"> array_map</span><span class="pun">(</span><span class="pln">wrapIn</span><span class="pun">(</span><span class="str">"li"</span><span class="pun">),</span><span class="pln"> &nbsp;$sessionExtract</span><span class="pun">);</span><span class="pln">
$sessionList </span><span class="pun">=</span><span class="pln"> array_reduce</span><span class="pun">(</span><span class="pln">$sessionLi</span><span class="pun">,</span><span class="pln"> </span><span class="str">"concatenate"</span><span class="pun">,</span><span class="pln"> </span><span class="str">" "</span><span class="pun">);</span><span class="pln">

</span><span class="kwd">print</span><span class="pln"> </span><span class="str">"&lt;ul&gt;"</span><span class="pln"> </span><span class="pun">.</span><span class="pln"> $sessionList </span><span class="pun">.</span><span class="pln"> </span><span class="str">"&lt;/ul&gt;"</span><span class="pun">;</span><span class="pln">
</span><span class="pun">?&gt;</span></pre>
<p>&nbsp;</p>
<h2>Komplexes Beispiel</h2>
<pre class="prettyprint prettyprinted" style=""><span class="tag">&lt;h1&gt;</span><span class="pln">Funktionale Programmierung: Komplexes Beispiel</span><span class="tag">&lt;/h1&gt;</span><span class="pln">
</span><span class="tag">&lt;div</span><span class="pln"> </span><span class="atn">id</span><span class="pun">=</span><span class="atv">"ausgabe"</span><span class="tag">&gt;&lt;/div&gt;</span><span class="pln">

</span><span class="tag">&lt;script&gt;</span><span class="pln">
</span><span class="kwd">var</span><span class="pln"> sessions </span><span class="pun">=</span><span class="pln"> </span><span class="pun">[</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">{</span><span class="pln"> title</span><span class="pun">:</span><span class="pln"> </span><span class="str">'HTML und so'</span><span class="pun">,</span><span class="pln"> speaker</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Hans Musterfrau'</span><span class="pun">,</span><span class="pln"> description</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Kleine Einführung in HTML5'</span><span class="pln"> </span><span class="pun">},</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">{</span><span class="pln"> title</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Javascript und so'</span><span class="pun">,</span><span class="pln"> speaker</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Eva Maria Blankofix'</span><span class="pun">,</span><span class="pln"> description</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Ausführliche Einfügung in JavaScript'</span><span class="pln"> </span><span class="pun">},</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">{</span><span class="pln"> title</span><span class="pun">:</span><span class="pln"> </span><span class="str">'PHP und so'</span><span class="pun">,</span><span class="pln"> speaker</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Max Musterhauser'</span><span class="pun">,</span><span class="pln"> description</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Vorlesung zum Handbuch'</span><span class="pln"> </span><span class="pun">}</span><span class="pln">
</span><span class="pun">];</span><span class="pln"> &nbsp;&nbsp;&nbsp;

</span><span class="com">// ----------------------------------------</span><span class="pln">
</span><span class="com">// Pure Funktionen</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> extract </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">property</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">object</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">return</span><span class="pln"> object</span><span class="pun">[</span><span class="pln">property</span><span class="pun">];</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> wrapIn </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">element</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">input</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">return</span><span class="pln"> </span><span class="str">"&lt;"</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> element </span><span class="pun">+</span><span class="pln"> </span><span class="str">"&gt;"</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> input </span><span class="pun">+</span><span class="pln"> </span><span class="str">"&lt;/"</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> element </span><span class="pun">+</span><span class="pln"> </span><span class="str">"&gt;"</span><span class="pun">;</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> concatenate </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">accumulation</span><span class="pun">,</span><span class="pln"> next</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> accumulation </span><span class="pun">+</span><span class="pln"> next</span><span class="pun">;</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> highlight </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="com">/* argumente... */</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">var</span><span class="pln"> args </span><span class="pun">=</span><span class="pln"> </span><span class="typ">Array</span><span class="pun">.</span><span class="pln">prototype</span><span class="pun">.</span><span class="pln">slice</span><span class="pun">.</span><span class="pln">call</span><span class="pun">(</span><span class="pln">arguments</span><span class="pun">);</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">function</span><span class="pln"> </span><span class="pun">(</span><span class="pln">input</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;args</span><span class="pun">.</span><span class="pln">forEach</span><span class="pun">(</span><span class="kwd">function</span><span class="pun">(</span><span class="pln">replacement</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;input </span><span class="pun">=</span><span class="pln"> input</span><span class="pun">.</span><span class="pln">replace </span><span class="pun">(</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">new</span><span class="pln"> </span><span class="typ">RegExp</span><span class="pun">(</span><span class="str">"\\b"</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> replacement </span><span class="pun">+</span><span class="pln"> </span><span class="str">"\\b"</span><span class="pun">),</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;</span><span class="str">"&lt;em&gt;"</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> replacement </span><span class="pun">+</span><span class="pln"> </span><span class="str">"&lt;/em&gt;"</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;</span><span class="pun">);</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="pun">});</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">return</span><span class="pln"> input</span><span class="pun">;</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> ellipsis </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">maxLength</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">input</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">if</span><span class="pln"> </span><span class="pun">(</span><span class="pln"> input</span><span class="pun">.</span><span class="pln">length </span><span class="pun">&lt;=</span><span class="pln"> maxLength </span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">return</span><span class="pln"> input </span><span class="pun">;</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="pun">}</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">return</span><span class="pln"> input</span><span class="pun">.</span><span class="pln">substring</span><span class="pun">(</span><span class="lit">0</span><span class="pun">,</span><span class="pln"> maxLength </span><span class="pun">-</span><span class="pln"> </span><span class="lit">1</span><span class="pun">)</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> </span><span class="str">"... "</span><span class="pun">;</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> prefix </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">prefix</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">input</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">return</span><span class="pln"> prefix </span><span class="pun">+</span><span class="pln"> input </span><span class="pun">;</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> uppercaseEveryFirst </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">input</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">return</span><span class="pln"> input
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;</span><span class="pun">.</span><span class="pln">split</span><span class="pun">(</span><span class="str">" "</span><span class="pun">)</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> uppercaseFirst</span><span class="pun">()</span><span class="pln"> </span><span class="pun">)</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;</span><span class="pun">.</span><span class="pln">join</span><span class="pun">(</span><span class="str">" "</span><span class="pun">)</span><span class="pln"> </span><span class="pun">;</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> uppercaseFirst </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">input</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">return</span><span class="pln"> input</span><span class="pun">.</span><span class="pln">charAt</span><span class="pun">(</span><span class="lit">0</span><span class="pun">).</span><span class="pln">toUpperCase </span><span class="pun">(</span><span class="pln"> </span><span class="pun">)</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;</span><span class="pun">+</span><span class="pln"> input</span><span class="pun">.</span><span class="pln">substring</span><span class="pun">(</span><span class="lit">1</span><span class="pun">)</span><span class="pln"> </span><span class="pun">;</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> join </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">delimiter</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">input</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span><span class="kwd">return</span><span class="pln"> input</span><span class="pun">.</span><span class="pln">join</span><span class="pun">(</span><span class="pln">delimiter</span><span class="pun">);</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> weave </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pun">(</span><span class="pln">a</span><span class="pun">,</span><span class="pln"> b</span><span class="pun">,</span><span class="pln"> c</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">var</span><span class="pln"> arr </span><span class="pun">=</span><span class="pln"> </span><span class="pun">[];</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">for</span><span class="pln"> </span><span class="pun">(</span><span class="kwd">var</span><span class="pln"> i</span><span class="pun">=</span><span class="lit">0</span><span class="pun">;</span><span class="pln"> i</span><span class="pun">&lt;</span><span class="pln">a</span><span class="pun">.</span><span class="pln">length</span><span class="pun">;</span><span class="pln"> i</span><span class="pun">++)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;arr</span><span class="pun">.</span><span class="pln">push</span><span class="pun">([</span><span class="pln"> a</span><span class="pun">[</span><span class="pln">i</span><span class="pun">],</span><span class="pln"> b</span><span class="pun">[</span><span class="pln">i</span><span class="pun">],</span><span class="pln"> c</span><span class="pun">[</span><span class="pln">i</span><span class="pun">]</span><span class="pln"> </span><span class="pun">]);</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="pun">}</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="kwd">return</span><span class="pln"> arr</span><span class="pun">;</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="com">// -------------------------------------------------</span><span class="pln">
</span><span class="com">// Map und Reduce</span><span class="pln">

</span><strong><span class="kwd">var</span><span class="pln"> titles </span><span class="pun">=</span><span class="pln"> sessions</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> extract</span><span class="pun">(</span><span class="str">"title"</span><span class="pun">)</span><span class="pln"> </span><span class="pun">)</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> wrapIn</span><span class="pun">(</span><span class="str">"h2"</span><span class="pun">)</span><span class="pln"> </span><span class="pun">);</span></strong><span class="pln">

</span><strong><span class="kwd">var</span><span class="pln"> speakers </span><span class="pun">=</span><span class="pln"> sessions</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> extract</span><span class="pun">(</span><span class="str">"speaker"</span><span class="pun">)</span><span class="pln"> </span><span class="pun">)</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> uppercaseEveryFirst</span><span class="pun">()</span><span class="pln"> </span><span class="pun">)</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> prefix</span><span class="pun">(</span><span class="str">"Speaker: "</span><span class="pun">)</span><span class="pln"> </span><span class="pun">)</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> wrapIn</span><span class="pun">(</span><span class="str">"h3"</span><span class="pun">)</span><span class="pln"> </span><span class="pun">)</span><span class="pln"> </span><span class="pun">;</span></strong><span class="pln">

</span><strong><span class="kwd">var</span><span class="pln"> descriptions </span><span class="pun">=</span><span class="pln"> sessions</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> extract</span><span class="pun">(</span><span class="str">"description"</span><span class="pun">)</span><span class="pln"> </span><span class="pun">)</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> ellipsis</span><span class="pun">(</span><span class="lit">160</span><span class="pun">)</span><span class="pln"> </span><span class="pun">)</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> highlight</span><span class="pun">(</span><span class="str">"JavaScript"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"HTML5"</span><span class="pun">)</span><span class="pln"> </span><span class="pun">)</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> wrapIn</span><span class="pun">(</span><span class="str">"p"</span><span class="pun">)</span><span class="pln"> </span><span class="pun">)</span><span class="pln"> </span><span class="pun">;</span></strong><span class="pln">

</span><strong><span class="kwd">var</span><span class="pln"> result </span><span class="pun">=</span><span class="pln"> weave</span><span class="pun">(</span><span class="pln">titles</span><span class="pun">,</span><span class="pln"> speakers</span><span class="pun">,</span><span class="pln"> descriptions</span><span class="pun">)</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> join</span><span class="pun">()</span><span class="pln"> </span><span class="pun">)</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> wrapIn</span><span class="pun">(</span><span class="str">"div"</span><span class="pun">)</span><span class="pln"> </span><span class="pun">)</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;</span><span class="pun">.</span><span class="pln">reduce</span><span class="pun">(</span><span class="pln"> concatenate </span><span class="pun">);</span></strong><span class="pln">

document</span><span class="pun">.</span><span class="pln">getElementById</span><span class="pun">(</span><span class="str">'ausgabe'</span><span class="pun">).</span><span class="pln">innerHTML </span><span class="pun">=</span><span class="pln"> result</span><span class="pun">;</span><span class="pln">

</span><span class="tag">&lt;/script&gt;</span></pre>
<h2>Geht auch asyncron!</h2>
<p dir="ltr">Mit Hilfe der<a href="https://github.com/caolan/async"> Async.js</a> Bibliothek funktioniert das ganze auch asynchron:</p>
<pre class="prettyprint prettyprinted" style=""><span class="pln">&nbsp;</span><span class="tag">&lt;html&gt;</span><span class="pln">
</span><span class="tag">&lt;script</span><span class="pln"> </span><span class="atn">src</span><span class="pun">=</span><span class="atv">"http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"</span><span class="tag">&gt;&lt;/script&gt;</span><span class="pln">
</span><span class="tag">&lt;script</span><span class="pln"> </span><span class="atn">src</span><span class="pun">=</span><span class="atv">"async.js"</span><span class="tag">&gt;&lt;/script&gt;</span><span class="pln">
</span><span class="tag">&lt;body&gt;</span><span class="pln">
</span><span class="tag">&lt;script&gt;</span><span class="pln">
</span><span class="com">// Asynchronous map/reduce to the rescue</span><span class="pln">

</span><span class="com">// https://github.com/caolan/async</span><span class="pln">

</span><span class="kwd">var</span><span class="pln"> ajax </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pln"> </span><span class="pun">(</span><span class="pln"> url </span><span class="pun">,</span><span class="pln"> done </span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
 &nbsp;&nbsp;&nbsp;$</span><span class="pun">.</span><span class="pln">ajax</span><span class="pun">({</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;url </span><span class="pun">:</span><span class="pln"> url </span><span class="pun">,</span><span class="pln">
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;success </span><span class="pun">:</span><span class="pln"> done
 &nbsp;&nbsp;&nbsp;</span><span class="pun">});</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><strong><span class="kwd">var</span><span class="pln"> fetch </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">function</span><span class="pln"> </span><span class="pun">(</span><span class="pln"> urls </span><span class="pun">,</span><span class="pln"> done </span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span></strong><span class="pln">
</span><strong><span class="pln"> &nbsp;&nbsp;&nbsp;async</span><span class="pun">.</span><span class="pln">map</span><span class="pun">(</span><span class="pln"> urls </span><span class="pun">,</span><span class="pln"> ajax </span><span class="pun">,</span><span class="pln"> done </span><span class="pun">);</span></strong><span class="pln">
</span><strong><span class="pun">}</span></strong><span class="pln">

</span><span class="kwd">var</span><span class="pln"> urls </span><span class="pun">=</span><span class="pln"> </span><span class="pun">[</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="str">'http://heise.de/'</span><span class="pun">,</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="str">'http://t3n.de/'</span><span class="pun">,</span><span class="pln">
 &nbsp;&nbsp;&nbsp;</span><span class="str">'http://tagesschau.de/'</span><span class="pln">
</span><span class="pun">];</span><span class="pln">

fetch</span><span class="pun">(</span><span class="pln">urls</span><span class="pun">);</span><span class="pln">
</span><span class="tag">&lt;/script&gt;</span></pre>
<p dir="ltr"><em>BTW:</em> Async.js hat noch einen ganzen Sack voll Funktionen mehr im Bauch…</p>
<p>&nbsp;</p>
<h2>Fazit</h2>
<p dir="ltr">Meine Meinung dazu? Es ist ein Paradigma, was man kennen sollte um es bei passender Gelegenheit einzusetzen.</p>
<p>&nbsp;</p>
<p dir="ltr">Manuel Strehl schreibt passend dazu:</p>
<blockquote>
<p dir="ltr">Unter JavaScript-Programmierern mit OOP-Hintergrund erfreut sich backbone.js als Quasi-MVC-Framework steigender Beliebtheit. Es ist nicht ohne ein bisschen Ironie, dass dessen einzige harte Abhängigkeit das gerade erwähnte underscore.js ist, eine Bibliothek, die fehlende Elemente anderer funktionaler Sprachen in JavaScript umsetzt.</p>
<p dir="ltr">Andererseits zeigt diese Symbiose sehr schön die Flexibilität von JavaScript und die Vielseitigkeit und Mächtigkeit, die sich aus dem Mischen verschiedener Paradigmen ergibt. Wenn man einmal angefangen hat, funktionale Features zu verwenden, wird man Sprachen verfluchen, die Funktionen nicht als Objekte erster Klasse behandeln. Es wird sich anfühlen wie ein Werkzeugkasten, aus dem jemand alle Schraubenzieher gestohlen hat.</p>
</blockquote>
<p dir="ltr">In dem Sinne: <strong>Happy Coding</strong> – habt Spaß daran!</p>
