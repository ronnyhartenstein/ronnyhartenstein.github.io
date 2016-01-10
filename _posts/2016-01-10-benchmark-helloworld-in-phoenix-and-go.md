---
layout: post
comments: true
title: Benchmark Helloworld in Phoenix and Go
date: 2016-01-10
categories:
- Elixir
- Go
libs: chartjs
---

As a response of my update of ["Benchmark Helloworld in different frameworks"](http://blog.rh-flow.de/2015/10/08/benchmark-helloworld-in-different-frameworks-myelixirstatus/) yesterday, [@chris_mccord](https://twitter.com/chris_mccord) gave me [some](https://twitter.com/chris_mccord/status/685940578496954368) [hints](https://twitter.com/chris_mccord/status/685940715919163393) [on](https://twitter.com/chris_mccord/status/685940856986189824) Twitter. So here we go.

**Improvements:**

- using `wrk` instead of `ab`
- `log_level: :error` + `compile_time_purge_level: :error`
- disable CSRF while remove `plug: protect_from_forgery`
- disable also `plug :fetch_session` and `plug :fetch_flash` (even we don't use them on purpose for the test)
- run more requests in sum to keep the machine busy long enough to see if the CPU usage is above 30% - thanks `wrk` support duration instead of requests

I'll test (like before) on my MacBookPro 15" Mid 2010, 2,53 GHz i5, 8 GB DDR3, OS X El Capitan 10.11.2 and wrk 4.0.0.

**TL;DR** Go is still faster than Elixir. But remember .. apples and peaches.

<!--more-->

<script>
data = {
  labels : [],
  datasets : [{ label: "#1", data: []}]
}
window.onload = function(){
	var ctx = document.getElementById("charts").getContext("2d");
	window.myLine = new Chart(ctx).Bar(data, {
		responsive: true
	});
}
</script>

## Elixir with Phoenix

Bootstrap a new project without Brunch and Ecto: `mix phoenix.new phoenix2 --no-brunch --no-ecto`

Removing all the clutter from Layout and Page template.

[`phoenix2/web/templates/layout/app.html.eex`](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/blob/master/phoenix2/web/templates/layout/app.html.eex)

```html
<%= @inner %>
```

[`phoenix2/web/templates/page/index.html.eex`](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/blob/master/phoenix2/web/templates/page/index.html.eex)

```html
Hello World!
```

Slim config

```elixir
use Mix.Config

config :phoenix2, Phoenix2.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "yuWB6z9ZPH4HJ29b9kADx3W0SKBzm4vJDmaQrL4GLXi7dSFUdXie+/TtLMfej5u4",
  render_errors: [accepts: ~w(html json)]

config :logger, :console,
  level: :error,
  compile_time_purge_level: :error
```

Run it: `ENV=production mix phoenix.server`

Curl it: `curl http://127.0.0.1:4000/` -> "Hello World!" - Yay! :v:

[See source here](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/tree/master/phoenix2) on GitHub.


The `wrk -t 4 -c 10 -d 30 http://127.0.0.1:4000/` result:

```
Running 30s test @ http://127.0.0.1:4000/
  4 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.54ms    4.20ms 126.93ms   99.64%
    Req/Sec     1.50k   126.89     1.72k    83.44%
  179439 requests in 30.02s, 58.39MB read
Requests/sec:   5977.08
Transfer/sec:      1.94MB
```

CPU spikes at ~300% for beam.smp and ~25% for wrk.

<script>
data.labels.push("Phoenix")
data.datasets[0].data.push(5977)
</script>

## Elixir with Plug

Same source than before, see [here](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/tree/master/elixir_plug) on GitHub.

The `wrk -t 4 -c 10 -d 30 http://127.0.0.1:4000/` result:

```
Running 30s test @ http://127.0.0.1:4000/
  4 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   553.55us    1.12ms  50.26ms   98.95%
    Req/Sec     3.93k   440.11     5.25k    71.92%
  469051 requests in 30.00s, 89.55MB read
Requests/sec:  15633.63
Transfer/sec:      2.98MB
```

CPU spikes at ~260% for beam.smp and ~55% for wrk.

<script>
data.labels.push("Plug")
data.datasets[0].data.push(15633)
</script>


## Go

Source is the same than before, see  [helloworld.go](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/blob/master/go/helloworld.go) on GitHub.

The `wrk -t 4 -c 10 -d 30 http://127.0.0.1:8080/` result:

```
Running 30s test @ http://127.0.0.1:8080/
  4 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   359.85us    1.26ms  60.11ms   97.67%
    Req/Sec     8.25k     1.48k   13.16k    69.88%
  987040 requests in 30.10s, 121.43MB read
Requests/sec:  32788.42
Transfer/sec:      4.03MB
```

CPU spikes at ~190% for go and ~95% for wrk.

<script>
data.labels.push("Go")
data.datasets[0].data.push(32788)
</script>


## NodeJS

Source is the same than before, see  [app.js](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/blob/master/nodejs/app.js) on GitHub.

The `wrk -t 4 -c 10 -d 30 http://127.0.0.1:8000/` result:

```
Running 30s test @ http://127.0.0.1:8000/
  4 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.05ms  844.03us  44.06ms   99.51%
    Req/Sec     1.96k   157.75     4.00k    93.76%
  234656 requests in 30.10s, 34.91MB read
Requests/sec:   7795.53
Transfer/sec:      1.16MB
```

CPU spikes at ~100% for node (single instance, single thread) and ~30% for wrk.

<script>
data.labels.push("NodeJs")
data.datasets[0].data.push(7795)
</script>

## NodeJS with Express

Source is the same than before, see  [app_single.js](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/blob/master/nodejs-express/app_single.js) on GitHub.

The `wrk -t 4 -c 10 -d 30 http://127.0.0.1:3000/` result:

```
Running 30s test @ http://127.0.0.1:3000/
  4 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.00ms    1.23ms  53.10ms   97.17%
    Req/Sec     1.03k   146.10     1.22k    86.67%
  122740 requests in 30.03s, 24.70MB read
Requests/sec:   4087.21
Transfer/sec:    842.19KB
```

CPU spikes at ~100% for node (single instances, single thread) and ~16% for wrk.

<script>
data.labels.push("Express")
data.datasets[0].data.push(4087)
</script>

## NodeJS with Express-Cluster

Source is the same than before, see  [app_cluster.js](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/blob/master/nodejs-express/app_cluster.js) on GitHub.

The `wrk -t 4 -c 10 -d 30 http://127.0.0.1:3000/` result:

```
Running 30s test @ http://127.0.0.1:3000/
  4 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.36ms    3.15ms 113.92ms   96.81%
    Req/Sec     2.04k   824.35     4.02k    66.31%
  243005 requests in 30.02s, 52.37MB read
Requests/sec:   8094.42
Transfer/sec:      1.74MB
```

CPU spikes at ~300% for node (multiple instances) and ~30% for wrk.

<script>
data.labels.push("Express-Cluster")
data.datasets[0].data.push(8094)
</script>

## Conclusion

Let's have a look on the Request/sec

<canvas id="charts" height="200" width="400"></canvas>

So, we see, Elixir is really fast (15k requests per second!) in compare to Node. But a compiled and minimal Go service is twice as fast. What I wonder about is, Node with Express-Cluster runs faster than Phoenix. Hm, maybe I miss some performance trigger. Any suggestions?

Well, again, it is comparing apples with peaches. It's just a Helloworld, no complex concurrent microservices with fancy business logic or so. So, don't give too much on this.

_Hints for improve the tests are welcome! Just hit me on Twitter._
