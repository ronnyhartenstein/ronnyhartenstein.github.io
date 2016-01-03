---
layout: post
status: publish
published: true
title: 'The problem with TypeScript while DOING things in constructor [Update #2]'
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: |+
  <p>Lets assume we want to overwrite a value while constructing in class <code>B<&#47;code> which inherits from <code>A<&#47;code>.<&#47;p>

  <p>Our code may looks like this:<&#47;p>

wordpress_id: 742
wordpress_url: http://blog.rh-flow.de/?p=742
date: '2015-09-09 19:13:04 +0200'
date_gmt: '2015-09-09 17:13:04 +0200'
categories:
- Javascript
tags: []
---
<p>Lets assume we want to overwrite a value while constructing in class <code>B<&#47;code> which inherits from <code>A<&#47;code>.<&#47;p></p>
<p>Our code may looks like this:<&#47;p></p>
<p><a id="more"></a><a id="more-742"></a></p>
<pre><code>module Overload {<br />
    export class B extends A {<br />
        x = [];<br />
        constructor(y) {<br />
            super(y);<br />
            console.log("x should be [1,2] - is ", this.x);<br />
        }<br />
        protected _init() {<br />
            this.x = [1,2];<br />
        }<br />
    }<br />
    class A {<br />
        y = [];<br />
        constructor(y) {<br />
            this.y = y;<br />
            this._init();<br />
        }<br />
        protected _init() {}<br />
    }<br />
}</p>
<p>var b = new Overload.B([1,2]);<br />
<&#47;code><&#47;pre></p>
<p>Will be compiled to this:<&#47;p></p>
<pre><code>var __extends = (this &amp;&amp; this.__extends) || function (d, b) {<br />
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];<br />
    function __() { this.constructor = d; }<br />
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());<br />
};<br />
var Overload;<br />
(function (Overload) {<br />
    var B = (function (_super) {<br />
        __extends(B, _super);<br />
        function B(y) {<br />
            _super.call(this, y);<br />
            this.x = [];<br />
            console.log("x should be [1,2] - is ", this.x);<br />
        }<br />
        B.prototype._init = function () {<br />
            this.x = [1, 2];<br />
        };<br />
        return B;<br />
    })(A);<br />
    Overload.B = B;<br />
    var A = (function () {<br />
        function A(y) {<br />
            this.y = [];<br />
            this.y = y;<br />
            this._init();<br />
        }<br />
        A.prototype._init = function () { };<br />
        return A;<br />
    })();<br />
})(Overload || (Overload = {}));<br />
var b = new Overload.B([1, 2]);<br />
<&#47;code><&#47;pre></p>
<p>As we can see, the TS class property <code>y<&#47;code> will be transpiled in JS like this:<&#47;p></p>
<pre><code>_super.call(this, y);<br />
this.x = [];<br />
<&#47;code><&#47;pre></p>
<p>So it'll be overwritten in the constructor. That&rsquo;s bad. Even while the sourcecode looks so fine, JS is has prototypical inheritance and TS just polishes stuff a little without touching the JS language core.<&#47;p></p>
<p>So the problem is not the var init, it's the <code>this._init()<&#47;code> call in <code>A<&#47;code>. My solution is to <strong>defer<&#47;strong> it. I'll use Underscore for convenience here:<&#47;p></p>
<pre><code>class A {<br />
    y = [];<br />
    constructor(y) {<br />
        this.y = y;<br />
        _.defer(() => this._init(););<br />
    }<br />
    protected _init() {}<br />
}<br />
<&#47;code><&#47;pre></p>
<p>Now it works.<&#47;p></p>
<p>So if u need to really DO something and your (pseudo) class will be inherited, just encapsulate the DOing logic and defer the call. But always remember: inheritance is a root of evil, use composition (aka mixins&#47;traits) if you can. To prevent these classes of problems (<em>pun intended<&#47;em>) alltogether, use functional programming :)<&#47;p></p>
<p>(Many thanks to @Hisako1337 for announcements and his review!)<&#47;p></p>
<h3><strong>Update #1<&#47;strong> <em>(2015-09-10)<&#47;em><&#47;h3></p>
<p>Attention while creating TS objects in <code>document.ready<&#47;code> environments. The defer runs only after the last document.ready is finished! So if you create a obj in env 1 and use the object in env 2 <em>with<&#47;em> the expected reponse of env 1, it wasn't run at this time.<&#47;p></p>
<pre><code><script><br />
a = {}<br />
$(function() {<br />
    a = new B();<br />
});<br />
<&#47;script></p>
<p>..</p>
<p><script><br />
$(function() {<br />
    a.do_something_with_x();<br />
});<br />
<&#47;script><br />
<&#47;code><&#47;pre></p>
<h3><strong>Update #2<&#47;strong> <em>(2015-10-13)<&#47;em><&#47;h3></p>
<p>Eric Elliot (@_ericelliott) wrote a really good blog post about object orientation in JS doing it the wrong way. He points to "the importance of avoiding classical inheritance" in JS. <strong><a href="https:&#47;&#47;medium.com&#47;javascript-scene&#47;inside-the-dev-team-death-spiral-6a7ea255467b">Inside the Dev Team Death Spiral<&#47;a><&#47;strong><&#47;p></p>
<blockquote>
<p>"The frustrating thing about this is that there are several better options in JS that are easier to use (in the long run) than <code>class<&#47;code>."<&#47;p><br />
<&#47;blockquote></p>
