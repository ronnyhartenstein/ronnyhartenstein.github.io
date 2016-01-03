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
wordpress_id: 742
wordpress_url: http://blog.rh-flow.de/?p=742
date: '2015-09-09 19:13:04 +0200'
date_gmt: '2015-09-09 17:13:04 +0200'
categories:
- Javascript
tags: []
comments: true
---
Lets assume we want to overwrite a value while constructing in class `B` which inherits from `A`.

Our code may looks like this:

<!--more-->

```
module Overload {
    export class B extends A {
        x = [];
        constructor(y) {
            super(y);
            console.log("x should be [1,2] - is ", this.x);
        }
        protected _init() {
            this.x = [1,2];
        }
    }
    class A {
        y = [];
        constructor(y) {
            this.y = y;
            this._init();
        }
        protected _init() {}
    }
}

var b = new Overload.B([1,2]);
```    

Will be compiled to this:

```
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Overload;
(function (Overload) {
    var B = (function (_super) {
        __extends(B, _super);
        function B(y) {
            _super.call(this, y);
            this.x = [];
            console.log("x should be [1,2] - is ", this.x);
        }
        B.prototype._init = function () {
            this.x = [1, 2];
        };
        return B;
    })(A);
    Overload.B = B;
    var A = (function () {
        function A(y) {
            this.y = [];
            this.y = y;
            this._init();
        }
        A.prototype._init = function () { };
        return A;
    })();
})(Overload || (Overload = {}));
var b = new Overload.B([1, 2]);
```

As we can see, the TS class property `y` will be transpiled in JS like this:

```
_super.call(this, y);
this.x = [];
```

So it'll be overwritten in the constructor. That’s bad. Even while the sourcecode looks so fine, JS is has prototypical inheritance and TS just polishes stuff a little without touching the JS language core.

So the problem is not the var init, it's the `this._init()` call in `A`. My solution is to **defer** it. I'll use Underscore for convenience here:

```
class A {
    y = [];
    constructor(y) {
        this.y = y;
        _.defer(() => this._init(););
    }
    protected _init() {}
}
```

Now it works.

So if u need to really DO something and your (pseudo) class will be inherited, just encapsulate the DOing logic and defer the call. But always remember: inheritance is a root of evil, use composition (aka mixins/traits) if you can. To prevent these classes of problems (*pun intended*) alltogether, use functional programming :)

(Many thanks to @Hisako1337 for announcements and his review!)

### **Update #1** *(2015-09-10)*

Attention while creating TS objects in `document.ready` environments. The defer runs only after the last document.ready is finished! So if you create a obj in env 1 and use the object in env 2 *with* the expected reponse of env 1, it wasn't run at this time.

```
<script>
a = {}
$(function() {
    a = new B();
});
</script>

..

<script>
$(function() {
    a.do_something_with_x();
});
</script>
```

### **Update #2** *(2015-10-13)*

Eric Elliot (@_ericelliott) wrote a really good blog post about object orientation in JS doing it the wrong way. He points to "the importance of avoiding classical inheritance" in JS. **[Inside the Dev Team Death Spiral][1]**

> "The frustrating thing about this is that there are several better options in JS that are easier to use (in the long run) than `class`."

 [1]: https://medium.com/javascript-scene/inside-the-dev-team-death-spiral-6a7ea255467b
