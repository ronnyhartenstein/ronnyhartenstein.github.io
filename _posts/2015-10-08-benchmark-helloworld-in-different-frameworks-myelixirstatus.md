---
layout: post
status: publish
published: true
title: 'Benchmark Helloworld in different frameworks #myelixirstatus [Update #2]'
author:
  display_name: ''
  login: ''
  email: ''
  url: ''
excerpt: |+
  <p>When I started with Elixir and Phoenix I wanted to see with my own eyes the speed of functional approach and Erlang in comparing with other well known languages. I just want to compare the simplest possible "Hello world" in Javascript, PHP and Elixir.<&#47;p>

  <p>Every implementation is benchmarked with the Apache HTTP server benchmarking tool <code>ab<&#47;code>. I run 1000 requests on 10 and 100 concurrent connections with <code>ab -n 1000 -c 10 http:&#47;&#47;127.0.0.1:..&#47;<&#47;code>. The return of "Hello world" ist quite enough but it differs a little bit from test to test. So no HTML, no pre&#47;postprocessing or something. Well, its a bit "comparing apples with peaches".<&#47;p>

wordpress_id: 750
wordpress_url: http://blog.rh-flow.de/?p=750
date: '2015-10-08 22:23:37 +0200'
date_gmt: '2015-10-08 20:23:37 +0200'
categories:
- Entwicklung
- Elixir
- Phoenix
tags: []
---
<p>When I started with Elixir and Phoenix I wanted to see with my own eyes the speed of functional approach and Erlang in comparing with other well known languages. I just want to compare the simplest possible "Hello world" in Javascript, PHP and Elixir.<&#47;p></p>
<p>Every implementation is benchmarked with the Apache HTTP server benchmarking tool <code>ab<&#47;code>. I run 1000 requests on 10 and 100 concurrent connections with <code>ab -n 1000 -c 10 http:&#47;&#47;127.0.0.1:..&#47;<&#47;code>. The return of "Hello world" ist quite enough but it differs a little bit from test to test. So no HTML, no pre&#47;postprocessing or something. Well, its a bit "comparing apples with peaches".<&#47;p></p>
<p><a id="more"></a><a id="more-750"></a></p>
<p>My test machine is my faithful MacbookPro (Mid 2010) with i5 2,53Ghz, 8 GB RAM, El Capitan.<&#47;p></p>
<p>Beside the plain implementation I also tried a standard framework each. So here we go:<&#47;p></p>
<ul>
<li>Node.JS v4.1.1: Module http and Express v4.13.3<&#47;li>
<li>PHP v5.5.29 + v7.0.0RC4: built-in Http-Server and Silex v1.3<&#47;li>
<li>Elixir v1.1.1: Plug (with Cowboy) and Phoenix v0.15<&#47;li><br />
<&#47;ul></p>
<p>(<strong>Update<&#47;strong> Added version numbers)<&#47;p></p>
<h2>HowTo Apache benchmark<&#47;h2></p>
<p><strong>Update:<&#47;strong> Some words about benchmarking. Normally you should benchmark some workflows - the fast ones (landing page) and the slow ones (e.g. checkout or login). And then the longest request of these. Because if there are a lot of parallel request are going fast and some of them are really slow, these some users just traps into it and getting a damn bad UX. This video of a talk <a href="https:&#47;&#47;www.youtube.com&#47;watch?v=lJ8ydIuPFeU">How NOT to Measure Latency<&#47;a> explains it in detail.<&#47;p></p>
<p><em>(Thanks to @MorrisJbk and @Hisako1337 for their explanations)<&#47;em><&#47;p></p>
<p>This posts on serverfault.com are also revealing:<&#47;p></p>
<ul>
<li><a href="http:&#47;&#47;serverfault.com&#47;questions&#47;274252&#47;apache-ab-please-explain-the-output">Apache ab: please explain the output<&#47;a><&#47;li>
<li><a href="http:&#47;&#47;serverfault.com&#47;questions&#47;378310&#47;how-do-i-analyze-an-apache-bench-result">How do I analyze an Apache Bench result?<&#47;a><&#47;li><br />
<&#47;ul></p>
<h2>PHP plain<&#47;h2></p>
<h3>Version 5.5.29 stable<&#47;h3></p>
<p>The code:<&#47;p></p>
<pre><code><?="Hello World"?><br />
<&#47;code><&#47;pre></p>
<p>Start the PHP internal server with<&#47;p></p>
<pre><code>php -S localhost:3000<br />
<&#47;code><&#47;pre></p>
<p>The <code>ab -n 1000 -c 10 http:&#47;&#47;localhost:3000&#47;<&#47;code> result:<&#47;p></p>
<pre><code>Time per request:       5.418 [ms] (mean)<br />
Time per request:       0.542 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          219.89 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    0   0.6      0       4<br />
Processing:     1    5   2.8      4      16<br />
Waiting:        0    5   2.6      4      16<br />
Total:          1    5   2.8      4      18</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%      4<br />
  66%      5<br />
  75%      6<br />
  80%      7<br />
  90%      9<br />
  95%     12<br />
  98%     14<br />
  99%     15<br />
 100%     18 (longest request)<br />
<&#47;code><&#47;pre></p>
<p>The <code>ab -n 1000 -c 100 http:&#47;&#47;localhost:3000&#47;<&#47;code> result:<&#47;p></p>
<pre><code>Time per request:       60.948 [ms] (mean)<br />
Time per request:       0.609 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          195.48 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    4   5.6      1      38<br />
Processing:     3   54  20.5     58      92<br />
Waiting:        3   52  20.9     55      91<br />
Total:         16   57  17.1     59      92</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%     59<br />
  66%     69<br />
  75%     72<br />
  80%     73<br />
  90%     78<br />
  95%     81<br />
  98%     85<br />
  99%     87<br />
 100%     92 (longest request)<br />
<&#47;code><&#47;pre></p>
<p><strong>Update:<&#47;strong> I guess this dev server is probably single processing, so the parallel request will be processed round robin. So the times increases nearly with the concurrency factor.<&#47;p></p>
<h3>Version 7.0.0 RC4 bleeding edge<&#47;h3></p>
<p>The <code>ab -n 1000 -c 10 http:&#47;&#47;localhost:3000&#47;<&#47;code> result:<&#47;p></p>
<pre><code>Time per request:       5.418 [ms] (mean)<br />
Time per request:       0.542 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          219.89 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    0   0.6      0       4<br />
Processing:     1    5   2.8      4      16<br />
Waiting:        0    5   2.6      4      16<br />
Total:          1    5   2.8      4      18</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%      4<br />
  66%      5<br />
  75%      6<br />
  80%      7<br />
  90%      9<br />
  95%     12<br />
  98%     14<br />
  99%     15<br />
 100%     18 (longest request)<br />
<&#47;code><&#47;pre></p>
<p>The <code>ab -n 1000 -c 100 http:&#47;&#47;localhost:3000&#47;<&#47;code> result:<&#47;p></p>
<pre><code>Time per request:       39.738 [ms] (mean)<br />
Time per request:       0.397 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          926.47 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    1   1.9      0       9<br />
Processing:     2   37   9.5     35      59<br />
Waiting:        2   36   9.5     35      59<br />
Total:         12   37   8.5     36      59</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%     36<br />
  66%     41<br />
  75%     45<br />
  80%     47<br />
  90%     49<br />
  95%     51<br />
  98%     52<br />
  99%     58<br />
 100%     59 (longest request)<br />
<&#47;code><&#47;pre></p>
<p>So PHP 7 is a bit faster than 5.5. Not bad at all. Lets see the other ones.<&#47;p></p>
<h2>NodeJS plain with <code>http<&#47;code><&#47;h2></p>
<p>The code:<&#47;p></p>
<pre><code>var http = require('http');<br />
var server = http.createServer(function (request, response) {<br />
  response.writeHead(200, {"Content-Type": "text&#47;plain"});<br />
  response.end("Hello World\n");<br />
});<br />
server.listen(8000);<br />
<&#47;code><&#47;pre></p>
<p>The <code>ab -n 1000 -c 10 http:&#47;&#47;localhost:8000&#47;<&#47;code> result:<&#47;p></p>
<pre><code>Time per request:       6.429 [ms] (mean)<br />
Time per request:       0.643 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          171.65 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    0   0.3      0       3<br />
Processing:     1    6   4.8      5      44<br />
Waiting:        1    6   4.7      4      44<br />
Total:          2    6   5.0      5      47</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%      5<br />
  66%      6<br />
  75%      7<br />
  80%      7<br />
  90%     10<br />
  95%     13<br />
  98%     21<br />
  99%     36<br />
 100%     47 (longest request)<br />
<&#47;code><&#47;pre></p>
<p>The <code>ab -n 1000 -c 100 http:&#47;&#47;localhost:8000&#47;<&#47;code> result:<&#47;p></p>
<pre><code>Time per request:       46.297 [ms] (mean)<br />
Time per request:       0.463 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          238.36 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    2   3.3      0      16<br />
Processing:     9   42  10.2     43      60<br />
Waiting:        8   42  10.2     42      60<br />
Total:         22   44   8.9     46      60</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%     46<br />
  66%     50<br />
  75%     51<br />
  80%     52<br />
  90%     53<br />
  95%     59<br />
  98%     60<br />
  99%     60<br />
 100%     60 (longest request)<br />
<&#47;code><&#47;pre></p>
<p>Node.JS is at the same speed than PHP, but did the Webserver for himself. Don't mention it.<&#47;p></p>
<h2>Elixir nearly plain with Plug<&#47;h2></p>
<p>(based on <a href="http:&#47;&#47;github.com&#47;elixir-lang&#47;plug">github.com&#47;elixir-lang&#47;plug<&#47;a>)<&#47;p></p>
<p>After bootstrapping Elixir with <code>mix new elixir_plug<&#47;code>.. The code in <code>mix.exs<&#47;code><&#47;p></p>
<pre><code>defp deps do<br />
  [{:cowboy, "~> 1.0.0"},<br />
 {:plug, "~> 1.0"}]<br />
end<br />
<&#47;code><&#47;pre></p>
<p>The code in <code>lib&#47;elixir_plug.ex<&#47;code>:<&#47;p></p>
<pre><code>defmodule ElixirPlug do<br />
  import Plug.Conn</p>
<p>  def init(options) do<br />
    # initialize options</p>
<p>    options<br />
  end</p>
<p>  def call(conn, _opts) do<br />
    conn<br />
    |> put_resp_content_type("text&#47;plain")<br />
    |> send_resp(200, "Hello from Plug")<br />
  end<br />
end<br />
<&#47;code><&#47;pre></p>
<p>Start with <code>iex -S mix<&#47;code> and then<&#47;p></p>
<pre><code>{:ok, _} = Plug.Adapters.Cowboy.http ElixirPlug, []<br />
<&#47;code><&#47;pre></p>
<p>The <code>ab -n 1000 -c 10 http:&#47;&#47;127.0.0.1:4000&#47;<&#47;code> result: (Elixir and Phoenix don't like <code>localhost<&#47;code>)<&#47;p></p>
<pre><code>Time per request:       3.509 [ms] (mean)<br />
Time per request:       0.351 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          556.55 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    1   0.6      0       6<br />
Processing:     0    3   3.7      2      35<br />
Waiting:        0    2   3.6      2      34<br />
Total:          1    3   3.8      2      36<br />
WARNING: The median and mean for the initial connection time are not within a normal deviation<br />
        These results are probably not that reliable.</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%      2<br />
  66%      3<br />
  75%      4<br />
  80%      4<br />
  90%      6<br />
  95%      7<br />
  98%     11<br />
  99%     34<br />
 100%     36 (longest request)<br />
<&#47;code><&#47;pre></p>
<p>The <code>ab -n 1000 -c 100 http:&#47;&#47;127.0.0.1:4000&#47;<&#47;code> result:<&#47;p></p>
<pre><code>Time per request:       30.279 [ms] (mean)<br />
Time per request:       0.303 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          645.04 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    6   4.0      5      21<br />
Processing:     3   24  11.7     22      54<br />
Waiting:        2   20  10.5     18      48<br />
Total:          7   29  10.1     27      57</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%     27<br />
  66%     33<br />
  75%     36<br />
  80%     38<br />
  90%     43<br />
  95%     46<br />
  98%     51<br />
  99%     53<br />
 100%     57 (longest request)<br />
<&#47;code><&#47;pre></p>
<h2>PHP with Silex<&#47;h2></p>
<p>The <code>composer.json<&#47;code><&#47;p></p>
<pre><code>{<br />
    "require": {<br />
        "silex&#47;silex": "~1.3"<br />
    }<br />
}<br />
<&#47;code><&#47;pre></p>
<p>The code of <code>index.php<&#47;code><&#47;p></p>
<pre><code><?php<br />
require __DIR__ . '&#47;vendor&#47;autoload.php';<br />
$app = new \Silex\Application();<br />
$app['debug'] = false;<br />
$app->get('&#47;', function() {<br />
    return "HelloWorld";<br />
});<br />
$app->run();<br />
<&#47;code><&#47;pre></p>
<p>Start the PHP internal dev server with <code>php -S localhost:3000<&#47;code>. Well, this dev server is (probably) single processing, so the parallel request will be processed round robin. But hey, for fun..<&#47;p></p>
<h3>with PHP 5.5.29<&#47;h3></p>
<p>The results of <code>ab -n 1000 -c 10 http:&#47;&#47;localhost:3000&#47;<&#47;code><&#47;p></p>
<pre><code>Time per request:       203.522 [ms] (mean)<br />
Time per request:       20.352 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          6.00 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    0   0.3      0       3<br />
Processing:   166  202  10.1    200     342<br />
Waiting:       49  182  10.7    180     324<br />
Total:        170  202  10.2    200     343</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%    200<br />
  66%    203<br />
  75%    205<br />
  80%    206<br />
  90%    210<br />
  95%    214<br />
  98%    224<br />
  99%    240<br />
 100%    343 (longest request)<br />
<&#47;code><&#47;pre></p>
<p><strong>Update:<&#47;strong> I spare the 100 concurrent requests test, because it would'nt be better results.<&#47;p></p>
<h3>with PHP 7<&#47;h3></p>
<p>The results of <code>ab -n 1000 -c 10 http:&#47;&#47;localhost:3000&#47;<&#47;code><&#47;p></p>
<pre><code>Time per request:       176.218 [ms] (mean)<br />
Time per request:       17.622 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          13.91 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    0   0.2      0       3<br />
Processing:    26  175  22.1    177     229<br />
Waiting:       24  174  22.0    176     229<br />
Total:         26  175  22.1    177     230</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%    177<br />
  66%    189<br />
  75%    193<br />
  80%    196<br />
  90%    201<br />
  95%    207<br />
  98%    215<br />
  99%    224<br />
 100%    230 (longest request)<br />
<&#47;code><&#47;pre></p>
<p>So it's ~30% faster looking at the longest request. But the 99% and other values are near to the 5.5.<br />
Ok, I run this test without opcache, maybe thats a problem.<&#47;p></p>
<h2>NodeJS with Express<&#47;h2></p>
<p>(inspired by <a href="http:&#47;&#47;expressjs.com&#47;starter&#47;hello-world.html">expressjs.com&#47;starter&#47;hello-world.html<&#47;a>)<&#47;p></p>
<p>The <code>package.json<&#47;code><&#47;p></p>
<pre><code>{<br />
  ..<br />
  "dependencies": {<br />
    "express": "^4.13.3",<br />
    "express-cluster": "0.0.4"<br />
  }<br />
}<br />
<&#47;code><&#47;pre></p>
<h3>as single instance<&#47;h3></p>
<p>The code <code>app_single.js<&#47;code><&#47;p></p>
<pre><code>var express = require('express');<br />
var app = express();<br />
app.get('&#47;', function (req, res) {<br />
  res.send('Hello World!');<br />
});<br />
var server = app.listen(3000, function () {<br />
  var host = server.address().address;<br />
  var port = server.address().port;<br />
  console.log('Listening at http:&#47;&#47;%s:%s', host, port);<br />
});<br />
<&#47;code><&#47;pre></p>
<p>The result of <code>ab -n 1000 -c 10 http:&#47;&#47;localhost:3000&#47;<&#47;code><&#47;p></p>
<pre><code>Time per request:       9.832 [ms] (mean)<br />
Time per request:       0.983 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          204.61 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    0   0.2      0       3<br />
Processing:     5   10   6.0      8      51<br />
Waiting:        4    9   6.0      7      51<br />
Total:          5   10   6.1      8      51</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%      8<br />
  66%      9<br />
  75%     11<br />
  80%     12<br />
  90%     15<br />
  95%     18<br />
  98%     33<br />
  99%     46<br />
 100%     51 (longest request)<br />
<&#47;code><&#47;pre></p>
<p>The result of <code>ab -n 1000 -c 100 http:&#47;&#47;localhost:3000&#47;<&#47;code><&#47;p></p>
<pre><code>Time per request:       84.539 [ms] (mean)<br />
Time per request:       0.845 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          237.96 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    1   2.0      0      12<br />
Processing:    12   80  17.8     82     111<br />
Waiting:       12   80  17.8     82     111<br />
Total:         24   81  16.7     83     112</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%     83<br />
  66%     93<br />
  75%     94<br />
  80%     95<br />
  90%     99<br />
  95%    101<br />
  98%    105<br />
  99%    109<br />
 100%    112 (longest request)<br />
<&#47;code><&#47;pre></p>
<h3>as a cluster with <code>express-cluster<&#47;code>:<&#47;h3></p>
<p>The code <code>app_cluster.js<&#47;code><&#47;p></p>
<pre><code>var express = require('express');<br />
var cluster = require('express-cluster');<br />
cluster(function(worker) {<br />
    var app = express();<br />
    app.get('&#47;', function(req, res) {<br />
        res.send('Hello World from worker #' + worker.id);<br />
    });<br />
    server = app.listen(3000, function () {<br />
      var host = server.address().address;<br />
      var port = server.address().port;<br />
      console.log('Listening at http:&#47;&#47;%s:%s', host, port);<br />
    });<br />
    return server;<br />
}, {count: 4})<br />
<&#47;code><&#47;pre></p>
<p>(If you have more cores, than increase <code>count: n<&#47;code>)<&#47;p></p>
<p>The result for <code>ab -n 1000 -c 10 http:&#47;&#47;localhost:3000&#47;<&#47;code><&#47;p></p>
<pre><code>Requests per second:    910.30 [#&#47;sec] (mean)<br />
Time per request:       10.985 [ms] (mean)<br />
Time per request:       1.099 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          196.46 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    0   0.1      0       2<br />
Processing:     1   11  13.3      6     104<br />
Waiting:        1   10  12.6      6     104<br />
Total:          1   11  13.3      7     105</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%      7<br />
  66%      9<br />
  75%     12<br />
  80%     13<br />
  90%     22<br />
  95%     40<br />
  98%     55<br />
  99%     72<br />
 100%    105 (longest request)<br />
<&#47;code><&#47;pre></p>
<p>The result for <code>ab -n 1000 -c 100 http:&#47;&#47;localhost:3000&#47;<&#47;code>.<&#47;p></p>
<pre><code>Requests per second:    1155.37 [#&#47;sec] (mean)<br />
Time per request:       86.552 [ms] (mean)<br />
Time per request:       0.866 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          249.35 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    3   6.8      0      28<br />
Processing:     3   80  17.3     82     126<br />
Waiting:        3   79  18.2     82     126<br />
Total:         31   83  12.7     83     127</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%     83<br />
  66%     87<br />
  75%     89<br />
  80%     91<br />
  90%     95<br />
  95%    102<br />
  98%    112<br />
  99%    118<br />
 100%    127 (longest request)<br />
<&#47;code><&#47;pre></p>
<p>Hm, no better performance for me now. Maybe, because "cluster" don't really mean "threading on multiple cores". Because it is a <code>npm<&#47;code> package it is running within the NodeJS instance and can't be multi-threading by default. (poor NodeJS). But there are other libs ideas like Nginx as proxy or clusting outside of NodeJS.<&#47;p></p>
<h2>Elixir with Phoenix<&#47;h2></p>
<p>The <code>mix.ex<&#47;code><&#47;p></p>
<pre><code>..<br />
defp deps do<br />
  [{:phoenix, "~> 0.15"},<br />
   {:phoenix_ecto, "~> 0.8"},<br />
   {:postgrex, ">= 0.0.0"},<br />
   {:phoenix_html, "~> 1.4"},<br />
   {:phoenix_live_reload, "~> 0.5", only: :dev},<br />
   {:cowboy, "~> 1.0"}]<br />
end<br />
<&#47;code><&#47;pre></p>
<p>After bootstrapping Phoenix with <code>mix phoenix.new hello_world<&#47;code> we had to tune it a little bit.<&#47;p></p>
<p>We define a <code>&#47;hello&#47;:name<&#47;code> route for fun in file <code>web&#47;router.ex<&#47;code>.<&#47;p></p>
<pre><code>..<br />
scope "&#47;", HelloPhoenix do<br />
  ..<br />
  get "&#47;hello&#47;:name", HelloController, :world<br />
  ..<br />
end<br />
..<br />
<&#47;code><&#47;pre></p>
<p>Our layout should be nearly plain in <code>web&#47;templates&#47;layout&#47;app.html.eex<&#47;code><&#47;p></p>
<pre><code><!DOCTYPE html><br />
<html lang="en"><br />
  <head><br />
    <title>Hello Phoenix!<&#47;title><br />
  <&#47;head><br />
  <body><br />
      <%= @inner %><br />
  <&#47;body><br />
<&#47;html><br />
<&#47;code><&#47;pre></p>
<p>The template for our route is also more or less minimal - file <code>web&#47;templates&#47;hello&#47;world.html.eex<&#47;code><&#47;p></p>
<pre><code><br />
<h1>From template: Hello <%= String.capitalize @name %>!<&#47;h1><br />
<&#47;code><&#47;pre></p>
<p>Well, it is'nt so plain like the other ones. The route <code>&#47;hello&#47;:name<&#47;code> works with the value of the parameter. But still ..<&#47;p></p>
<p><strong>Update:<&#47;strong> Start Phoenix in <strong>production mode<&#47;strong> with <code>MIX_ENV=prod PORT=4000 mix do compile, phoenix.digest, phoenix.server<&#47;code>. (thanks for the tip @josevalim)<&#47;p></p>
<p><strong>Update:<&#47;strong> The results for <code>ab -n 1000 -c 10 http:&#47;&#47;127.0.0.1:4000&#47;hello&#47;benchmark<&#47;code>:<&#47;p></p>
<pre><code>Time per request:       4.781 [ms] (mean)<br />
Time per request:       0.478 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          804.77 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    0   0.6      0       6<br />
Processing:     1    4   2.9      3      24<br />
Waiting:        1    4   2.7      3      24<br />
Total:          1    5   3.0      4      24</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%      4<br />
  66%      5<br />
  75%      5<br />
  80%      6<br />
  90%      8<br />
  95%     11<br />
  98%     14<br />
  99%     16<br />
 100%     24 (longest request)<br />
<&#47;code><&#47;pre></p>
<p><strong>Update:<&#47;strong> The results for <code>ab -n 1000 -c 100 http:&#47;&#47;127.0.0.1:4000&#47;hello&#47;benchmark<&#47;code>:<&#47;p></p>
<pre><code>Time per request:       52.396 [ms] (mean)<br />
Time per request:       0.524 [ms] (mean, across all concurrent requests)<br />
Transfer rate:          734.35 [Kbytes&#47;sec] received</p>
<p>Connection Times (ms)<br />
              min  mean[+&#47;-sd] median   max<br />
Connect:        0    7   7.2      5      30<br />
Processing:     3   42  15.6     41      85<br />
Waiting:        3   39  14.5     38      83<br />
Total:         13   50  13.2     50      86</p>
<p>Percentage of the requests served within a certain time (ms)<br />
  50%     50<br />
  66%     55<br />
  75%     58<br />
  80%     61<br />
  90%     69<br />
  95%     73<br />
  98%     75<br />
  99%     78<br />
 100%     86 (longest request)<br />
<&#47;code><&#47;pre></p>
<h2>Conclusion<&#47;h2></p>
<p>So well, the fully featured fat-lady framework Phoenix with its rounting, view, layout and template runs at the same speed like a pure NodeJS with <code>http<&#47;code>. And PHP plain just returning a string is not significant faster. Get your own tests and think about it.<&#47;p></p>
<p>Elixir and Phoenix is functional. Thats really another paradigm. That changes a lot. The way of programming, thinking, structuring the code. Its not easy, its not hard, its just different. But hey, I think its worth the efford of learning it.<&#47;p></p>
