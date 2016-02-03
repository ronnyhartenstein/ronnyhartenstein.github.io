---
layout: post
title: 'Coding Kata: Site Heartbeat in Elixir and Golang'
date: '2016-02-02'
categories:
- Elixir
- Golang
---

Our today coding [kata](https://en.wikipedia.org/wiki/Kata_(programming)) is a website heartbeat system.
It checks the correct `<title>` for a bunch of domains.
If a site is down, or the title is wrong, it should send a email.
Of course it will do the job in parallel.

I'll try it with Elixir and Go for fun and learning - and to have a bit of monitoring my sites.

<!--more-->

## Elixir

Code on GitHub: [ronnyhartenstein/site-heartbeat-elixir](https://github.com/ronnyhartenstein/site-heartbeat-elixir)

**Learnings:**

- build mix targets using `Mix.Task`
- prepare stuff for escript (`cli.ex`) and use it for one-file-deployment (`mix escript.build`)
- read a text (the domains and titles) file as a stream with `File.stream`
- parallel processing with [`Parallel.map`](https://hex.pm/packages/parallel)
- fetch sites body with [`HTTPoison.get`](https://github.com/edgurgel/httpoison)
- parse `<title>` using [`Regex.run`](http://elixir-lang.org/docs/stable/elixir/Regex.html)
- tried to send mails with `Mailer.compose_email` but failed
- **try hard to do it the functional way!**


## Go

Code on GitHub: [ronnyhartenstein/site-heartbeat-golang](https://github.com/ronnyhartenstein/site-heartbeat-golang)

**Learnings:**

- read a plain text file (the domains and titles) with [`ioutil.ReadFile`](https://golang.org/pkg/io/ioutil/#ReadFile)
- use goroutines for parallel processing and sync it with [`sync.WaitGroup`](https://golang.org/pkg/sync/#WaitGroup)
- fetch and parse sites body with [goquery](https://github.com/PuerkitoBio/goquery) - a jQuery like lib
- use regexp to check the `<title>` string with [`regexp.MatchString`](https://golang.org/pkg/regexp/#MatchString)
- read a JSON config (the mailer config) as a Go struct with [`json.Unmarshal`](https://golang.org/pkg/encoding/json/#Unmarshal)
- send a mail TLS secured with [`net/mail`](https://golang.org/pkg/net/mail/), [`net/smtp`](https://golang.org/pkg/net/smtp/) and [`crypto/tls`](https://golang.org/pkg/crypto/tls/)
- for program organisation it is a good practise to split it into some files, but each is in package "main"
- cross compile for linux from a mac via `env GOOS=linux GOARCH=386 go build github.com/ronnyhartenstein/site-heartbeat-golang`
- **try hard to do it the pragmatic getting-stuff-done-way**


## Conclusion

This kata was quite a lot of fun! I'm surprised how many diffent things I could touch on this small use case. Working with files, parsing configs, query websites, parsing body, sending mails, dealing with errors.
