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

wordpress_id: 460
wordpress_url: http://rhflow.wp-root.rh-flow.de/?p=460
date: '2014-11-11 11:48:08 +0100'
date_gmt: '2014-11-11 09:48:08 +0100'
categories:
- Allgemein
- PHP
tags: []
---
<p>Referenzen in PHP sind tückisch, wie ich gerade wieder einmal feststellen durfte. Solche Konstrukten kennen wir ja alle:</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="kwd">foreach</span><span class="pln"> </span><span class="pun">(</span><span class="pln">$a</span><span class="pun">[</span><span class="str">'sehr'</span><span class="pun">][</span><span class="str">'tiefes'</span><span class="pun">][</span><span class="str">'array'</span><span class="pun">]</span><span class="pln"> </span><span class="kwd">as</span><span class="pln"> </span><span class="pun">&amp;</span><span class="pln">$b</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    $b</span><span class="pun">[</span><span class="str">'anzahl'</span><span class="pun">]</span><span class="pln"> </span><span class="pun">+=</span><span class="pln"> </span><span class="lit">10</span><span class="pun">;</span><span class="pln">
</span><span class="pun">}</span></code></pre>
<p>Das lässt sich besser lesen als das hier:</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="kwd">foreach</span><span class="pln"> </span><span class="pun">(</span><span class="pln">$a</span><span class="pun">[</span><span class="str">'sehr'</span><span class="pun">][</span><span class="str">'tiefes'</span><span class="pun">][</span><span class="str">'array'</span><span class="pun">]</span><span class="pln"> </span><span class="kwd">as</span><span class="pln"> $i </span><span class="pun">=&gt;</span><span class="pln"> $b</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    $a</span><span class="pun">[</span><span class="str">'sehr'</span><span class="pun">][</span><span class="str">'tiefes'</span><span class="pun">][</span><span class="str">'array'</span><span class="pun">][</span><span class="pln">$i</span><span class="pun">][</span><span class="str">'anzahl'</span><span class="pun">]</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> $b</span><span class="pun">[</span><span class="str">'anzahl'</span><span class="pun">]</span><span class="pln"> </span><span class="pun">+</span><span class="pln"> </span><span class="lit">10</span><span class="pun">;</span><span class="pln">
</span><span class="pun">}</span></code></pre>
<p>Die Kollegen haben mich aber immer angehalten, hinter solche <code>foreach</code>-Konstrukte ein <code>unset</code> zu platzieren.</p>
<p>Es hätte wohl schon komische Phänomene gegeben, wenn man es nicht tut, aber so recht innermechanisch erklären konnte es keiner. Nun ja, bis jetzt.</p>

<!--more-->

<p>So muss es also ausschauen:</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="kwd">foreach</span><span class="pln"> </span><span class="pun">(</span><span class="pln">$a</span><span class="pun">[</span><span class="str">'sehr'</span><span class="pun">][</span><span class="str">'tiefes'</span><span class="pun">][</span><span class="str">'array'</span><span class="pun">]</span><span class="pln"> </span><span class="kwd">as</span><span class="pln"> </span><span class="pun">&amp;</span><span class="pln">$b</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    $b</span><span class="pun">[</span><span class="str">'anzahl'</span><span class="pun">]</span><span class="pln"> </span><span class="pun">+=</span><span class="pln"> </span><span class="lit">10</span><span class="pun">;</span><span class="pln">
</span><span class="pun">}</span><span class="pln">
unset</span><span class="pun">(</span><span class="pln">$b</span><span class="pun">);</span></code></pre>
<p>Heute ist es nun tatsächlich „in a nutshell“ passiert. Hier nun ein Minimalbeispiel wie es zustande kommt:</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">$a1 </span><span class="pun">=</span><span class="pln"> array</span><span class="pun">(</span><span class="lit">1</span><span class="pun">,</span><span class="pln"> </span><span class="lit">2</span><span class="pun">,</span><span class="pln"> </span><span class="lit">3</span><span class="pun">);</span><span class="pln">
$a2 </span><span class="pun">=</span><span class="pln"> array</span><span class="pun">(</span><span class="str">'d'</span><span class="pln"> </span><span class="pun">,</span><span class="str">'e'</span><span class="pun">,</span><span class="pln"> </span><span class="str">'f'</span><span class="pun">);</span><span class="pln">
</span><span class="kwd">foreach</span><span class="pln"> </span><span class="pun">(</span><span class="pln">$a1 </span><span class="kwd">as</span><span class="pln"> </span><span class="pun">&amp;</span><span class="pln">$b</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{}</span><span class="pln">
</span><span class="kwd">foreach</span><span class="pln"> </span><span class="pun">(</span><span class="pln">$a2 </span><span class="kwd">as</span><span class="pln"> $b</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{}</span><span class="pln">
var_dump</span><span class="pun">(</span><span class="pln">$a1</span><span class="pun">);</span><span class="pln">  </span></code></pre>
<p>Ergebnis:</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">array
    </span><span class="lit">0</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="kwd">int</span><span class="pln"> </span><span class="lit">1</span><span class="pln">
    </span><span class="lit">1</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="kwd">int</span><span class="pln"> </span><span class="lit">2</span><span class="pln">
    </span><span class="lit">2</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="pun">&amp;</span><span class="kwd">string</span><span class="pln"> </span><span class="str">'f'</span><span class="pln"> </span><span class="pun">(</span><span class="pln">length</span><span class="pun">=</span><span class="lit">1</span><span class="pun">)</span></code></pre>
<p><em>WTF?</em></p>
<h2>Erklärung</h2>
<p>PHP hat für $b als letztes die Referenz auf den letzten Eintrag von $a (da noch <code>3</code>). Bei der zweiten Interation legt er jeden Wert aus $a2 auf $b und damit durch die Referenz auf den letzten Eintrag von <code>$a1</code>. Klar soweit?</p>
<p>Das geht übrigens auch mit dem selben Array:</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">$a </span><span class="pun">=</span><span class="pln"> array</span><span class="pun">(</span><span class="str">'a'</span><span class="pun">,</span><span class="pln"> </span><span class="str">'b'</span><span class="pun">,</span><span class="pln"> </span><span class="str">'c'</span><span class="pun">);</span><span class="pln">
</span><span class="kwd">foreach</span><span class="pln"> </span><span class="pun">(</span><span class="pln">$a </span><span class="kwd">as</span><span class="pln"> </span><span class="pun">&amp;</span><span class="pln">$b</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{}</span><span class="pln">
</span><span class="kwd">foreach</span><span class="pln"> </span><span class="pun">(</span><span class="pln">$a </span><span class="kwd">as</span><span class="pln"> $b</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{}</span><span class="pln">
var_dump</span><span class="pun">(</span><span class="pln">$a</span><span class="pun">);</span></code></pre>
<p>Ergebnis:</p>
<pre class="prettyprint prettyprinted" style=""><code><span class="pln">array
    </span><span class="lit">0</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="kwd">string</span><span class="pln"> </span><span class="str">'a'</span><span class="pln"> </span><span class="pun">(</span><span class="pln">length</span><span class="pun">=</span><span class="lit">1</span><span class="pun">)</span><span class="pln">
    </span><span class="lit">1</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="kwd">string</span><span class="pln"> </span><span class="str">'b'</span><span class="pln"> </span><span class="pun">(</span><span class="pln">length</span><span class="pun">=</span><span class="lit">1</span><span class="pun">)</span><span class="pln">
    </span><span class="lit">2</span><span class="pln"> </span><span class="pun">=&gt;</span><span class="pln"> </span><span class="pun">&amp;</span><span class="kwd">string</span><span class="pln"> </span><span class="str">'b'</span><span class="pln"> </span><span class="pun">(</span><span class="pln">length</span><span class="pun">=</span><span class="lit">1</span><span class="pun">)</span><span class="pln"> </span></code></pre>
<p>Also vergesst nie das <code>unset</code> nachdem ihr mit Referenzen in <code>foreach</code>es herumgespielt habt!</p>
