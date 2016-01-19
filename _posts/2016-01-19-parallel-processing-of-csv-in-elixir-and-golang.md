---
layout: post
title: Parallel processing of CSV in Elixir and Golang
date: '2016-01-19'
categories:
- Elixir
- Golang
thumb: /files/2016/csvparallel_elixir_go.jpg
---

Our today coding [kata](https://en.wikipedia.org/wiki/Kata_(programming)) is parallel processing of streamed CSV data from a file. I'll try it with Elixir and Go for fun and learning.

**TL;DR** For Elixir, `parallel_stream` will win against `Task.async` and `Poolboy` for simplicity. In Golang it's straightforward goroutines and `sync.WaitGroup`. Both runs fast and safe. And its a lot of fun.

<!--more-->

## Elixir

### First approach: process each row as an own process with [`Task.async`](http://elixir-lang.org/docs/v1.0/elixir/Task.html)

For each row we'll create one new separate concurrent process, who will do the heavy load. Well, in our case just wait a little bit. Consequence: with 10,000 rows we'll have 10,000 processes. Normally this won't be a problem if we have enough RAM. We'll need more with more rows. So the next requiremend is: limit the max RAM usage. Drop this idea.

### Second approach: worker pool with [Poolboy](https://github.com/devinus/poolboy)

Poolboy manages a pool of workers. One worker can process one row of our CSV. If there are no more free works remaining, reading from CSV will paused. Consequence: steady RAM usage and maximum n process depending on the pool konfiguration. But: Poolboy is a service and don't wait until all processes are finished. So I guess this approach won't work for CLI scripts. Any ideas? Drop this idea.

### Third approach: hex.pm package [`parallel_stream`](https://github.com/beatrichartz/parallel_stream)

This package provides some functions for parallel processing, e.g. `map`. It is conceptional designed as stream which runs on n pippes (2x the CPU cores). So parallelism is possible with just one line of code. Instead of `Stream.map` we'll just use `ParallelStream.map`.

```elixir
File.stream!(file)
|> Stream.map(&split_row/1)
|> ParallelStream.map(&store_row/1)  # parallel processing
# |> Stream.map(&store_row/1)  # synchronous processing
|> Enum.into([])
```

### Testing scenario: performance test

- file with 1000 test rows  (generated with `mix generate test1000.csv 1000`)
- each row simulates a INSERT-SQL by waiting 10ms
- running `mix import test1000.csv` with `Stream.map` -> 12 sec.
- running with `ParallelStream.map` -> 1,2 Sek.

See here the code: [ronnyhartenstein/elixir-parallel-csv-importer](https://github.com/ronnyhartenstein/elixir-parallel-csv-importer)

## Go

### First approach: simple goroutings

The simplest thing is to use plain goroutines.

[**Code here**](https://github.com/ronnyhartenstein/golang-csv-parallel-processing/blob/dd4e75737c18fa6877a4a515074474a58555376a/import/import.go)

```go
func main() {
	// [.. start timing, read CSV ..]
	i := 0
	ch := make(chan []string)
	for {
		record, err := reader.Read()
		// [.. error handling ..]
		i++
		go func(r []string) {
			processData(r)
			ch <- r
		}(record)
		fmt.Printf("\rgo %d", i)
	}
	for ; i > 0; i-- {
    <-ch
		fmt.Printf("\r\t\t\t\t| <- %d", i)
	}
	fmt.Printf("\n%2fs", time.Since(start).Seconds())
}

func processData([]string) {
  fmt.Printf("\r\t\t| proc %d", i)
	time.Sleep(1000 * time.Millisecond)
}
```

So this runs quite good. But counting the amount of goroutines could not be the final solution I think.

### Second approach: `sync.WaitGroup`

We'll use `sync.WaitGroup` to encapsulate the counting of goroutines and something more.

> Package sync provides basic synchronization primitives such as mutual exclusion locks. Other than the Once and WaitGroup types, most are intended for use by low-level library routines. Higher-level synchronization is better done via channels and communication. [sync](https://golang.org/pkg/sync/)

[**Code here**](https://github.com/ronnyhartenstein/golang-csv-parallel-processing/blob/dd4e75737c18fa6877a4a515074474a58555376a/import/import.go)

```go
func main() {
	// [.. start timing, read CSV ..]
	i := 0
	ch := make(chan []string)
	var wg sync.WaitGroup
	for {
		record, err := reader.Read()
		//[.. error handling ..]
		i++
		wg.Add(1)
		go func(r []string, i int) {
			defer wg.Done()
			processData(i, r)
			ch <- r
		}(record, i)
		fmt.Printf("\rgo %d", i)
	}
	// closer
	go func() {
		wg.Wait()
		close(ch)
	}()
	// print channel results (necessary to prevent exit programm before)
	j := 0
	for range ch {
		j++
		fmt.Printf("\r\t\t\t\t | done %d", j)
	}
	fmt.Printf("\n%2fs", time.Since(start).Seconds())
}
func processData(i int, r []string) {
	time.Sleep(10 * time.Millisecond)
	fmt.Printf("\r\t\t| proc %d", i)
}
```

So it works quite in the same way. It's just another approach with some benefits.
Read more in Blogs [here](http://nanxiao.me/en/use-sync-waitgroup-in-golang/) and [here](http://nathanleclaire.com/blog/2014/02/15/how-to-wait-for-all-goroutines-to-finish-executing-before-continuing/) and of course in the great great **book ["The Go Programming Language"](http://www.amazon.de/Programming-Language-Addison-Wesley-Professional-Computing/dp/0134190440) chap. "9.8 Goroutines and Threads"**.

See the code here: [ronnyhartenstein/golang-csv-parallel-processing](https://github.com/ronnyhartenstein/golang-csv-parallel-processing)

### Boilerplate for parallel processing in Go

Here is a small boilerplate using Go's `WaitGroup` to wait for all goroutines finishing.

```go
package main

import (
	"sync"
)

func main() {
	tasks := []string{"a", "b", "c"}

	ch := make(chan bool)
	// start syncing
	var wg sync.WaitGroup
	for _, task := range tasks {
		wg.Add(1)
		go func(t string) {
			defer wg.Done()
			ok := processData(t)
			ch <- ok
		}(task)
	}
	// closer
	go func() {
		wg.Wait()
		close(ch)
	}()
	// fetch all channel results (necessary to prevent exit programm before)
	for range ch {
    // TODO if you are interested in channel responses
	}
}

func processData(task string) bool {
  // TODO do things in this goroutine
	return true
}
```


## Conclusion

With plain PHP, Python or Ruby script you'll just process CSV serial. But in other languages like Elixir and Go with concurrency and threads you can do this in parallel and use all CPU cores. Okay, you have to deal with some things like mutual exclusion and so on, but its faster than serial.
