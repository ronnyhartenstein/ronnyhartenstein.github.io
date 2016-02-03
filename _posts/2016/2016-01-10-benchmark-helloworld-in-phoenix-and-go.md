---
layout: post
title: Benchmark Helloworld in Phoenix and Go
date: 2016-01-10
categories:
- Elixir
- Golang
libs: chartjs
---

As a response of my update of ["Benchmark Helloworld in different frameworks"](http://blog.rh-flow.de/2015/10/08/benchmark-helloworld-in-different-frameworks-myelixirstatus/) yesterday, [@chris_mccord](https://twitter.com/chris_mccord) gave me [some](https://twitter.com/chris_mccord/status/685940578496954368) [hints](https://twitter.com/chris_mccord/status/685940715919163393) [on](https://twitter.com/chris_mccord/status/685940856986189824) Twitter. So here we go.

**Improvements:**

- using `wrk` instead of `ab`
- `log_level: :error` + `compile_time_purge_level: :error`
- disable CSRF while remove `plug: protect_from_forgery`
- disable also `plug :fetch_session` and `plug :fetch_flash` (even we don't use them on purpose for the test)
- run more requests in sum to keep the machine busy long enough to see if the CPU usage is above 30% - thanks `wrk` support duration instead of requests
- take the best of 3 runs
- closing all other tools and apps

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

**Versions:**

- Erlang: v18.2.1
- Elixir: v1.2.0
- Phoenix: v1.1.2
- Go: v1.5.2
- Node: v5.4.0

## Elixir with Phoenix


See [source](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/tree/master/phoenix2) on GitHub.

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

Run it: `ENV=prod mix phoenix.server`

Curl it: `curl http://127.0.0.1:4000/` -> "Hello World!" - Yay! :v:


The `wrk -t 4 -c 10 -d 30 http://127.0.0.1:4000/` result:

```
Running 30s test @ http://127.0.0.1:4000/
  4 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.14ms  561.35us  16.65ms   73.90%
    Req/Sec     1.77k   109.77     2.01k    80.17%
  210882 requests in 30.01s, 68.62MB read
Requests/sec:   7026.62
Transfer/sec:      2.29MB
```

CPU spikes at ~300% for beam.smp and ~25% for wrk.

<script>
data.labels.push("Phoenix")
data.datasets[0].data.push(7026)
</script>

**Removing all Plugs**

in `phoenix2/lib/phoenix2/endpoint.ex` and `phoenix2/web/router.ex`

```
Running 30s test @ http://127.0.0.1:4000/
  4 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     0.99ms    4.44ms 131.31ms   99.06%
    Req/Sec     2.85k   270.89     3.51k    81.75%
  339998 requests in 30.01s, 64.26MB read
Requests/sec:  11331.30
Transfer/sec:      2.14MB
```

<script>
data.labels.push("Phoenix clean")
data.datasets[0].data.push(11331)
</script>


## Elixir with Plug

Same source than before, see [here](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/tree/master/elixir_plug) on GitHub.

Start with `iex -S mix` and then

```elixir
{:ok, _} = Plug.Adapters.Cowboy.http ElixirPlug, []
```

The `wrk -t 4 -c 10 -d 30 http://127.0.0.1:4000/` result:

```
Running 30s test @ http://127.0.0.1:4000/
  4 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   515.42us  727.02us  35.67ms   97.72%
    Req/Sec     4.07k   403.24     5.13k    72.34%
  487152 requests in 30.10s, 93.01MB read
Requests/sec:  16184.13
Transfer/sec:      3.09MB
```

CPU spikes at ~260% for beam.smp and ~55% for wrk.

<script>
data.labels.push("Plug")
data.datasets[0].data.push(16184)
</script>


## Go

Source is the same than before, see  [helloworld.go](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/blob/master/go/helloworld.go) on GitHub.

The `wrk -t 4 -c 10 -d 30 http://127.0.0.1:8080/` result:

```
Running 30s test @ http://127.0.0.1:8080/
  4 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   296.47us    0.94ms  41.72ms   97.67%
    Req/Sec     9.37k     1.42k   13.81k    69.58%
  1121496 requests in 30.10s, 137.97MB read
Requests/sec:  37257.91
Transfer/sec:      4.58MB
```

CPU spikes at ~190% for go and ~95% for wrk.

<script>
data.labels.push("Go")
data.datasets[0].data.push(37257)
</script>


## NodeJS

Source is the same than before, see  [app.js](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/blob/master/nodejs/app.js) on GitHub.

The `wrk -t 1 -c 10 -d 30 http://127.0.0.1:8000/` result:

```
Running 30s test @ http://127.0.0.1:8000/
  1 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.23ms   76.83us   4.70ms   91.35%
    Req/Sec     8.11k   177.74     9.06k    93.02%
  242916 requests in 30.10s, 36.14MB read
Requests/sec:   8070.08
Transfer/sec:      1.20MB
```

CPU spikes at ~100% for node (single instance, single thread) and ~30% for wrk.

<script>
data.labels.push("NodeJs")
data.datasets[0].data.push(8070)
</script>

## NodeJS with Express

Source is the same than before, see  [app_single.js](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/blob/master/nodejs-express/app_single.js) on GitHub.

The `wrk -t 1 -c 10 -d 30 http://127.0.0.1:3000/` result:

```
Running 30s test @ http://127.0.0.1:3000/
  1 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.27ms    1.17ms  54.06ms   99.07%
    Req/Sec     4.49k   433.05     4.69k    96.01%
  134813 requests in 29.48s, 27.13MB read
  Socket errors: connect 0, read 0, write 0, timeout 10
Requests/sec:   4573.21
Transfer/sec:      0.92MB
```

CPU spikes at ~100% for node (single instances, single thread) and ~16% for wrk.

<script>
data.labels.push("Express")
data.datasets[0].data.push(4573)
</script>

## NodeJS with Express-Cluster

Source is the same than before, see  [app_cluster.js](https://github.com/ronnyhartenstein/benchmarking-helloworld-http/blob/master/nodejs-express/app_cluster.js) on GitHub.

The `wrk -t 4 -c 10 -d 30 http://127.0.0.1:3000/` result:

```
Running 30s test @ http://127.0.0.1:3000/
  4 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     0.97ms    0.96ms  36.15ms   92.64%
    Req/Sec     2.25k     1.07k    4.72k    68.83%
  269641 requests in 30.10s, 58.12MB read
Requests/sec:   8957.45
Transfer/sec:      1.93MB
```

CPU spikes at ~300% for node (multiple instances) and ~30% for wrk.
It's nearly 2x fast than node single thread, because the i5 in 2010 has 2 physical cores.

<script>
data.labels.push("Express-Cluster")
data.datasets[0].data.push(8957)
</script>

## Conclusion

Let's have a look on the Request/sec

<canvas id="charts" height="300" width="400"></canvas>

So, we see, Elixir is really fast (15k requests per second!) in compare to Node. But a compiled and minimal Go service is twice as fast. What I wonder about is, Node with Express-Cluster runs faster than Phoenix. Hm, maybe I miss some performance trigger. Any suggestions?

Well, again, it is comparing apples with peaches. It's just a Helloworld, no complex concurrent microservices with fancy business logic or so. So, don't give too much on this.

_Hints for improve the tests are welcome! Just hit me on Twitter._
