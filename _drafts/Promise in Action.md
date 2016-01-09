---
layout: post
comments: true
title: Promises
#date: '2016-??-??'
categories: Patterns
---

# Higher order functions

in JS

```
var n = function(n) {
  return function (x) {
    return (x * x) + n;
  };
};
var l = n(4);
l(3); // 12
```

in PHP

```
$n = function($n) {
  return function($x) use ($n) {
    return $x * $x + $n;
  }
}
$l = $n(4);
$l(3); // 12
```

# Promises

g'ol JS

```
function get_redis(key) {
  return new Promise(function(fullfill, reject) {
      Redis.get(key, function(err, value) {
        if (err) { reject(err); return; }
        // loser Zusammenhang
        fullfill(value);
    });
  });
}

function put_redis(key, value) {
  return new Promise(function(fullfill, reject) {
      Redis.set(key, value, function(err) {
        if (err) { reject(err); return; }
        // loser Zusammenhang
        fullfill();
    });
  });
}

function log_to_mqtt(msg) {
  return new Promise(function(fullfill, reject) {
      Mqtt.publish("localhost", "/bla", msg, function(err) {
        if (err) { reject(err); return; }
        // loser Zusammenhang
        fullfill();
    });
  });
}

function tuewas() {
  get_redis("bla")
    .then(function(value) {
      return put_redis("irgendwas", value + 1);
    })
    .then(function() {
      log_to_mqtt("fertsch");
    })
    .then(function() {
      console.log("Done!");
    });
}
```

in Coffeescript .. no more clutter

```
get_redis(key) ->
  new Promise (fullfill, reject) ->
    Redis.get key, (err, value) ->
      if (err)
        reject err
        return
      // loser Zusammenhang

      fullfill value

..

tuewas() ->
  get_redis("bla")
    .then (value)
      put_redis("irgendwas", value + 1)

    .then () ->
      log_to_mqtt "fertsch"

    .then () ->
      console.log "Done!"
}
```
