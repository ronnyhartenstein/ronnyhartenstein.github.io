---
layout: post
status: publish
published: true
title: 'Benchmark Helloworld in different frameworks #myelixirstatus [Update #3, now with Go]'
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
wordpress_id: 750
wordpress_url: http://blog.rh-flow.de/?p=750
date: '2015-10-08 22:23:37 +0200'
date_gmt: '2015-10-08 20:23:37 +0200'
categories:
- Entwicklung
- Elixir
- Phoenix
tags: []
comments: true
---

When I started with Elixir and Phoenix I wanted to see with my own eyes the speed of functional approach and Erlang in comparing with other well known languages. I just want to compare the simplest possible "Hello world" in Javascript, PHP and Elixir.

Every implementation is benchmarked with the Apache HTTP server benchmarking tool `ab`. I run 1000 requests on 10 and 100 concurrent connections with `ab -n 1000 -c 10 http://127.0.0.1:../`. The return of "Hello world" ist quite enough but it differs a little bit from test to test. So no HTML, no pre/postprocessing or something. Well, its a bit "comparing apples with peaches".

<!--more-->

My test machine is my faithful MacbookPro (Mid 2010) with i5 2,53Ghz, 8 GB RAM, El Capitan.

Beside the plain implementation I also tried a standard framework each. So here we go:

*   Node.JS v4.1.1: Module http and Express v4.13.3
*   PHP v5.5.29 + v7.0.0RC4: built-in Http-Server and Silex v1.3
*   Elixir v1.1.1: Plug (with Cowboy) and Phoenix v0.15
*   Go v1.5.2: `net/http`

(**Update** Added version numbers)

Please find the source here: [github.com/ronnyhartenstein/benchmarking-helloworld-http](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/) 

## HowTo Apache benchmark

**Update:** Some words about benchmarking. Normally you should benchmark some workflows - the fast ones (landing page) and the slow ones (e.g. checkout or login). And then the longest request of these. Because if there are a lot of parallel request are going fast and some of them are really slow, these some users just traps into it and getting a damn bad UX. This video of a talk [How NOT to Measure Latency][1] explains it in detail.

*(Thanks to @MorrisJbk and @Hisako1337 for their explanations)*

This posts on serverfault.com are also revealing:

*   [Apache ab: please explain the output][2]
*   [How do I analyze an Apache Bench result?][3]

## PHP plain

### Version 5.5.29 stable

The code:

```php
<?="Hello World"?>
```

Start the PHP internal server with

    php -S localhost:3000


The `ab -n 1000 -c 10 http://localhost:3000/` result:

    Time per request:       5.418 [ms] (mean)
    Time per request:       0.542 [ms] (mean, across all concurrent requests)
    Transfer rate:          219.89 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    0   0.6      0       4
    Processing:     1    5   2.8      4      16
    Waiting:        0    5   2.6      4      16
    Total:          1    5   2.8      4      18

    Percentage of the requests served within a certain time (ms)
      50%      4
      66%      5
      75%      6
      80%      7
      90%      9
      95%     12
      98%     14
      99%     15
     100%     18 (longest request)


The `ab -n 1000 -c 100 http://localhost:3000/` result:

    Time per request:       60.948 [ms] (mean)
    Time per request:       0.609 [ms] (mean, across all concurrent requests)
    Transfer rate:          195.48 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    4   5.6      1      38
    Processing:     3   54  20.5     58      92
    Waiting:        3   52  20.9     55      91
    Total:         16   57  17.1     59      92

    Percentage of the requests served within a certain time (ms)
      50%     59
      66%     69
      75%     72
      80%     73
      90%     78
      95%     81
      98%     85
      99%     87
     100%     92 (longest request)


**Update:** I guess this dev server is probably single processing, so the parallel request will be processed round robin. So the times increases nearly with the concurrency factor.

### Version 7.0.0 RC4 bleeding edge

The `ab -n 1000 -c 10 http://localhost:3000/` result:

    Time per request:       5.418 [ms] (mean)
    Time per request:       0.542 [ms] (mean, across all concurrent requests)
    Transfer rate:          219.89 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    0   0.6      0       4
    Processing:     1    5   2.8      4      16
    Waiting:        0    5   2.6      4      16
    Total:          1    5   2.8      4      18

    Percentage of the requests served within a certain time (ms)
      50%      4
      66%      5
      75%      6
      80%      7
      90%      9
      95%     12
      98%     14
      99%     15
     100%     18 (longest request)


The `ab -n 1000 -c 100 http://localhost:3000/` result:

    Time per request:       39.738 [ms] (mean)
    Time per request:       0.397 [ms] (mean, across all concurrent requests)
    Transfer rate:          926.47 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    1   1.9      0       9
    Processing:     2   37   9.5     35      59
    Waiting:        2   36   9.5     35      59
    Total:         12   37   8.5     36      59

    Percentage of the requests served within a certain time (ms)
      50%     36
      66%     41
      75%     45
      80%     47
      90%     49
      95%     51
      98%     52
      99%     58
     100%     59 (longest request)


So PHP 7 is a bit faster than 5.5. Not bad at all. Lets see the other ones.

## NodeJS plain with `http`

The code:

```js
var http = require('http');
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});
server.listen(8000);
```

The `ab -n 1000 -c 10 http://localhost:8000/` result:

    Time per request:       6.429 [ms] (mean)
    Time per request:       0.643 [ms] (mean, across all concurrent requests)
    Transfer rate:          171.65 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    0   0.3      0       3
    Processing:     1    6   4.8      5      44
    Waiting:        1    6   4.7      4      44
    Total:          2    6   5.0      5      47

    Percentage of the requests served within a certain time (ms)
      50%      5
      66%      6
      75%      7
      80%      7
      90%     10
      95%     13
      98%     21
      99%     36
     100%     47 (longest request)


The `ab -n 1000 -c 100 http://localhost:8000/` result:

    Time per request:       46.297 [ms] (mean)
    Time per request:       0.463 [ms] (mean, across all concurrent requests)
    Transfer rate:          238.36 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    2   3.3      0      16
    Processing:     9   42  10.2     43      60
    Waiting:        8   42  10.2     42      60
    Total:         22   44   8.9     46      60

    Percentage of the requests served within a certain time (ms)
      50%     46
      66%     50
      75%     51
      80%     52
      90%     53
      95%     59
      98%     60
      99%     60
     100%     60 (longest request)


Node.JS is at the same speed than PHP, but did the Webserver for himself. Don't mention it.

## Elixir nearly plain with Plug

(based on [github.com/elixir-lang/plug][4])

After bootstrapping Elixir with `mix new elixir_plug`.. The code in `mix.exs`

```elixir
defp deps do
  [{:cowboy, "~> 1.0.0"},
 {:plug, "~> 1.0"}]
end
```

The code in `lib/elixir_plug.ex`:

```elixir
defmodule ElixirPlug do
  import Plug.Conn

  def init(options) do
    # initialize options

    options
  end

  def call(conn, _opts) do
    conn
    |> put_resp_content_type("text/plain")
    |> send_resp(200, "Hello from Plug")
  end
end
```

Start with `iex -S mix` and then

```elixir
{:ok, _} = Plug.Adapters.Cowboy.http ElixirPlug, []
```

The `ab -n 1000 -c 10 http://127.0.0.1:4000/` result: (Elixir and Phoenix don't like `localhost`)

    Time per request:       3.509 [ms] (mean)
    Time per request:       0.351 [ms] (mean, across all concurrent requests)
    Transfer rate:          556.55 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    1   0.6      0       6
    Processing:     0    3   3.7      2      35
    Waiting:        0    2   3.6      2      34
    Total:          1    3   3.8      2      36
    WARNING: The median and mean for the initial connection time are not within a normal deviation
            These results are probably not that reliable.

    Percentage of the requests served within a certain time (ms)
      50%      2
      66%      3
      75%      4
      80%      4
      90%      6
      95%      7
      98%     11
      99%     34
     100%     36 (longest request)


The `ab -n 1000 -c 100 http://127.0.0.1:4000/` result:

    Time per request:       30.279 [ms] (mean)
    Time per request:       0.303 [ms] (mean, across all concurrent requests)
    Transfer rate:          645.04 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    6   4.0      5      21
    Processing:     3   24  11.7     22      54
    Waiting:        2   20  10.5     18      48
    Total:          7   29  10.1     27      57

    Percentage of the requests served within a certain time (ms)
      50%     27
      66%     33
      75%     36
      80%     38
      90%     43
      95%     46
      98%     51
      99%     53
     100%     57 (longest request)


## PHP with Silex

The `composer.json`

```json
{
    "require": {
        "silex/silex": "~1.3"
    }
}
```

The code of `index.php`

```php
<?php
require __DIR__ . '/vendor/autoload.php';
$app = new \Silex\Application();
$app['debug'] = false;
$app->get('/', function() {
    return "HelloWorld";
});
$app->run();
```

Start the PHP internal dev server with `php -S localhost:3000`. Well, this dev server is (probably) single processing, so the parallel request will be processed round robin. But hey, for fun..

### with PHP 5.5.29

The results of `ab -n 1000 -c 10 http://localhost:3000/`

    Time per request:       203.522 [ms] (mean)
    Time per request:       20.352 [ms] (mean, across all concurrent requests)
    Transfer rate:          6.00 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    0   0.3      0       3
    Processing:   166  202  10.1    200     342
    Waiting:       49  182  10.7    180     324
    Total:        170  202  10.2    200     343

    Percentage of the requests served within a certain time (ms)
      50%    200
      66%    203
      75%    205
      80%    206
      90%    210
      95%    214
      98%    224
      99%    240
     100%    343 (longest request)


**Update:** I spare the 100 concurrent requests test, because it would'nt be better results.

### with PHP 7

The results of `ab -n 1000 -c 10 http://localhost:3000/`

    Time per request:       176.218 [ms] (mean)
    Time per request:       17.622 [ms] (mean, across all concurrent requests)
    Transfer rate:          13.91 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    0   0.2      0       3
    Processing:    26  175  22.1    177     229
    Waiting:       24  174  22.0    176     229
    Total:         26  175  22.1    177     230

    Percentage of the requests served within a certain time (ms)
      50%    177
      66%    189
      75%    193
      80%    196
      90%    201
      95%    207
      98%    215
      99%    224
     100%    230 (longest request)


So it's ~30% faster looking at the longest request. But the 99% and other values are near to the 5.5. Ok, I run this test without opcache, maybe thats a problem.

## NodeJS with Express

(inspired by [expressjs.com/starter/hello-world.html][5])

The `package.json`

```json
{
  ..
  "dependencies": {
    "express": "^4.13.3",
    "express-cluster": "0.0.4"
  }
}
```

### as single instance

The code `app_single.js`

```js
var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
```

The result of `ab -n 1000 -c 10 http://localhost:3000/`

    Time per request:       9.832 [ms] (mean)
    Time per request:       0.983 [ms] (mean, across all concurrent requests)
    Transfer rate:          204.61 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    0   0.2      0       3
    Processing:     5   10   6.0      8      51
    Waiting:        4    9   6.0      7      51
    Total:          5   10   6.1      8      51

    Percentage of the requests served within a certain time (ms)
      50%      8
      66%      9
      75%     11
      80%     12
      90%     15
      95%     18
      98%     33
      99%     46
     100%     51 (longest request)


The result of `ab -n 1000 -c 100 http://localhost:3000/`

    Time per request:       84.539 [ms] (mean)
    Time per request:       0.845 [ms] (mean, across all concurrent requests)
    Transfer rate:          237.96 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    1   2.0      0      12
    Processing:    12   80  17.8     82     111
    Waiting:       12   80  17.8     82     111
    Total:         24   81  16.7     83     112

    Percentage of the requests served within a certain time (ms)
      50%     83
      66%     93
      75%     94
      80%     95
      90%     99
      95%    101
      98%    105
      99%    109
     100%    112 (longest request)


### as a cluster with `express-cluster`:

The code `app_cluster.js`

```js
var express = require('express');
var cluster = require('express-cluster');
cluster(function(worker) {
    var app = express();
    app.get('/', function(req, res) {
        res.send('Hello World from worker #' + worker.id);
    });
    server = app.listen(3000, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log('Listening at http://%s:%s', host, port);
    });
    return server;
}, {count: 4})
```

(If you have more cores, than increase `count: n`)

The result for `ab -n 1000 -c 10 http://localhost:3000/`

    Requests per second:    910.30 [#/sec] (mean)
    Time per request:       10.985 [ms] (mean)
    Time per request:       1.099 [ms] (mean, across all concurrent requests)
    Transfer rate:          196.46 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    0   0.1      0       2
    Processing:     1   11  13.3      6     104
    Waiting:        1   10  12.6      6     104
    Total:          1   11  13.3      7     105

    Percentage of the requests served within a certain time (ms)
      50%      7
      66%      9
      75%     12
      80%     13
      90%     22
      95%     40
      98%     55
      99%     72
     100%    105 (longest request)


The result for `ab -n 1000 -c 100 http://localhost:3000/`.

    Requests per second:    1155.37 [#/sec] (mean)
    Time per request:       86.552 [ms] (mean)
    Time per request:       0.866 [ms] (mean, across all concurrent requests)
    Transfer rate:          249.35 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    3   6.8      0      28
    Processing:     3   80  17.3     82     126
    Waiting:        3   79  18.2     82     126
    Total:         31   83  12.7     83     127

    Percentage of the requests served within a certain time (ms)
      50%     83
      66%     87
      75%     89
      80%     91
      90%     95
      95%    102
      98%    112
      99%    118
     100%    127 (longest request)


Hm, no better performance for me now. Maybe, because "cluster" don't really mean "threading on multiple cores". Because it is a `npm` package it is running within the NodeJS instance and can't be multi-threading by default. (poor NodeJS). But there are other libs ideas like Nginx as proxy or clusting outside of NodeJS.

## Elixir with Phoenix

The `mix.ex`

```elixir
..
defp deps do
  [{:phoenix, "~> 0.15"},
   {:phoenix_ecto, "~> 0.8"},
   {:postgrex, ">= 0.0.0"},
   {:phoenix_html, "~> 1.4"},
   {:phoenix_live_reload, "~> 0.5", only: :dev},
   {:cowboy, "~> 1.0"}]
end
```

After bootstrapping Phoenix with `mix phoenix.new hello_world` we had to tune it a little bit.

We define a `/hello/:name` route for fun in file `web/router.ex`.

```elixir
..
scope "/", HelloPhoenix do
  ..
  get "/hello/:name", HelloController, :world
  ..
end
..
```

Our layout should be nearly plain in `web/templates/layout/app.html.eex`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Hello Phoenix!</title>
  </head>
  <body>
      <%= @inner %>
  </body>
</html>
```

The template for our route is also more or less minimal - file `web/templates/hello/world.html.eex`

```html
<h1>From template: Hello <%= String.capitalize @name %>!</h1>
```

Well, it is'nt so plain like the other ones. The route `/hello/:name` works with the value of the parameter. But still ..

**Update:** Start Phoenix in **production mode** with `MIX_ENV=prod PORT=4000 mix do compile, phoenix.digest, phoenix.server`. (thanks for the tip @josevalim)

**Update:** The results for `ab -n 1000 -c 10 http://127.0.0.1:4000/hello/benchmark`:

    Time per request:       4.781 [ms] (mean)
    Time per request:       0.478 [ms] (mean, across all concurrent requests)
    Transfer rate:          804.77 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    0   0.6      0       6
    Processing:     1    4   2.9      3      24
    Waiting:        1    4   2.7      3      24
    Total:          1    5   3.0      4      24

    Percentage of the requests served within a certain time (ms)
      50%      4
      66%      5
      75%      5
      80%      6
      90%      8
      95%     11
      98%     14
      99%     16
     100%     24 (longest request)


**Update:** The results for `ab -n 1000 -c 100 http://127.0.0.1:4000/hello/benchmark`:

    Time per request:       52.396 [ms] (mean)
    Time per request:       0.524 [ms] (mean, across all concurrent requests)
    Transfer rate:          734.35 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    7   7.2      5      30
    Processing:     3   42  15.6     41      85
    Waiting:        3   39  14.5     38      83
    Total:         13   50  13.2     50      86

    Percentage of the requests served within a certain time (ms)
      50%     50
      66%     55
      75%     58
      80%     61
      90%     69
      95%     73
      98%     75
      99%     78
     100%     86 (longest request)

## Go with `net/http`

The code:

```go
package main

import (
	"io"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		io.WriteString(w, "Hello world!")
	})
	http.ListenAndServe(":8080", nil)
}
```

The results for `ab -n 1000 -c 10 http://127.0.0.1:8080/`:

```
Requests per second:    3854.59 [#/sec] (mean)
Time per request:       2.594 [ms] (mean)
Time per request:       0.259 [ms] (mean, across all concurrent requests)
Transfer rate:          485.59 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.7      1       5
Processing:     0    2   0.9      1       7
Waiting:        0    1   0.7      1       6
Total:          1    2   1.1      2       7
WARNING: The median and mean for the processing time are not within a normal deviation
        These results are probably not that reliable.

Percentage of the requests served within a certain time (ms)
  50%      2
  66%      3
  75%      3
  80%      3
  90%      4
  95%      5
  98%      7
  99%      7
 100%      7 (longest request)
```

The `ab -n 1000 -c 100 http://127.0.0.1:8080/` result:

```
Requests per second:    4097.54 [#/sec] (mean)
Time per request:       24.405 [ms] (mean)
Time per request:       0.244 [ms] (mean, across all concurrent requests)
Transfer rate:          516.19 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        2    9   5.2      8      31
Processing:     3   13   6.3     12      36
Waiting:        2   10   5.2      9      31
Total:          9   22   7.6     21      45

Percentage of the requests served within a certain time (ms)
  50%     21
  66%     23
  75%     24
  80%     26
  90%     35
  95%     41
  98%     42
  99%     44
 100%     45 (longest request)
```

So well, Go is faster than Elixir with Plug. It's really really flippin fast! But hey, its like programming a lean webservice in C :smile:

## Conclusion

So well, the fully featured fat-lady framework Phoenix with its rounting, view, layout and template runs at the same speed like a pure NodeJS with `http`. And PHP plain just returning a string is not significant faster. Get your own tests and think about it.

Elixir and Phoenix is functional. Thats really another paradigm. That changes a lot. The way of programming, thinking, structuring the code. Its not easy, its not hard, its just different. But hey, I think its worth the efford of learning it.

 [1]: https://www.youtube.com/watch?v=lJ8ydIuPFeU
 [2]: http://serverfault.com/questions/274252/apache-ab-please-explain-the-output
 [3]: http://serverfault.com/questions/378310/how-do-i-analyze-an-apache-bench-result
 [4]: http://github.com/elixir-lang/plug
 [5]: http://expressjs.com/starter/hello-world.html
