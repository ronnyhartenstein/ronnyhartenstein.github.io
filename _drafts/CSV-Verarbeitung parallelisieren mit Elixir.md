---
layout: post
comments: true
title: CSV-Verarbeitung parallelisieren mit Elixir
#date: '2016-??-??'
categories: Elixir
---

Ziel der Übung ist zu prüfen, wie mit Elixir massiv große CSV Datenbestände parallel und zügig importiert werden können.

**TL;DR** `parallel_stream` gewinnt gegenüber `Task.async` und `Poolboy`.

<!--more-->

## Erster Ansatz: jeder Datensatz ist ein Prozess mit [`Task.async`](http://elixir-lang.org/docs/v1.0/elixir/Task.html)

Beim Einlesen der CVS-Zeilen wird für jede Zeile ein neuer nebenläuftiger Prozess erstellt, welcher die Verarbeitung durchführt. Folge: bei 10.000 Datensätzen im Zweifel 10.000 Prozesse. Prinzipiell ist das kein Problem bei entsprechend viel RAM. Der Bedarf wächst mit der Anzahl der Prozesse. Abgeleitete Forderung: maximale RAM-Verwendung begrenzen. Idee verworfen.

## Zweiter Ansatz: Worker-Pool mit [Poolboy](https://github.com/devinus/poolboy)

Poolboy verwaltet einen Pool an Workern. Ein Worker kann eine CSV-Zeile verarbeiten. Stehen keine freien Worker mehr zur Verfügung, pausiert das Einlesen der CSV. Folge: stabiler RAM-Verbrauch und max. n Prozesse je nach Konfiguration des Pools. Aber: Poolboy ist als Service gedacht und wartet nicht bis alle anstehenden Aufgaben beendet worden sind und ist damit (lt. meinen Kentnissstand) nicht für CLI-Verarbeitung verwendbar. Idee verworfen.

## Dritter Ansatz: Paket [`parallel_stream`](https://github.com/beatrichartz/parallel_stream)

Das Paket stellt transparent parallel arbeitenden Funktionen bereit, u.a. map. Durch die Konzeptionierung als Stream der auf n Pipes läuft (2x CPU-Cores) ist die Parallelität mit nur einer Zeile Code möglich. Statt Stream.map wird schlicht ParallelStream.map verwendet und gut.

```
File.stream!(file)
|> Stream.map(&split_row/1)
|> ParallelStream.map(&store_row/1)  # parallele Verarbeitung
# |> Stream.map(&store_row/1)  # synchrone Verarbeitung
|> Enum.into([])
```

## Testszenario Performance-Test
- Datei enthält 1000 Testdatensätze  (generiert mit `mix generate test1000.csv 1000`)
- Je Zeile wird ein INSERT-SQL vorgetäuscht und 10ms gewartet
- Durchlauf (`mix import test1000.csv`) mittels `Stream.map` -> 12 Sek.
- Durchlauf mittels `ParallelStream.map` -> 1,2 Sek.

Repo mit Code: [ronnyhartenstein/elixir-parallel-csv-importer](https://github.com/ronnyhartenstein/elixir-parallel-csv-importer)
