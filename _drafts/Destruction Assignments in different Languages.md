---
layout: post
title: Destructuring assignment in different Languages
date: '2016-04-20'
categories: Patterns
---

Destructuring assignment are a little bit of pattern matching.

## Elixir

Elixir is immutable and somehow the godfather of pattern matching.

```elixir
{foo: bar} = %{foo: "foo"}
# now bar = "foo"
{foo: bar} = %{bar: "bar"}
# will crash, because it don't match
{poet: {name: name, address: [street, city]}} = %{poet: %{name: "Tom", address: ["Somewhere St.", "Nowhere"]}}
```

## PHP

```php
list($foo, $bar) = function() { return ["foo", "bar"]; };
// $foo is "foo" and $bar is "bar", yay!
list($foo, $bar) = "foobar";
// $foo and $bar are NULL, but no error or warning
list($foo, $bar) = ["foo"];
// $foo is "foo", $bar is NULL, but we'll get also a warning!
```

It works also on multilevel.

```php
list($foo, list($bar,$baz)) = ["foo",["bar","baz"]];
// $foo is "foo", $baz is "baz"
```

## Coffeescript

Right from their homepage:

> Destructuring assignment can be used with any depth of array and object nesting, to help pull out deeply nested properties.

```coffeescript
{poet: {name, address: [street, city]}} = futurists
```

## Golang

TODO


How is it in other languages? Tell me in the comments.
