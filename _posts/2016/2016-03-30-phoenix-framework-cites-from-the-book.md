---
layout: post
title: Cites of the book "Programming Phoenix"
date: '2016-03-30'
---

Some paragraphs of the book "Programming Phoenix" (McCord, Tate, Valim) I found really interesting, so I marked it in my Kindle...

## in chapter 1: Building with Functional MVC

> In Phoenix, whenever its possible, we try to limit side effects, those functions that touch and possibly change the outside world, to the controller. That means that we’ll try to keep the functions in our models and views pure, so that calling the same function with the same arguments will always yield the same results.


## in chapter 4: Ecto and Changesets

> When conventional persistence frameworks allow one-size-fits-all validations, they are forced to work harder and manage change across the whole model. Here’s the problem. Imagine that your boss lays down the requirement of logging into your application through Facebook. That update will require a different kind of password validation, and a different kind of enforcement for password rules, so you build a custom validation, and tweak your model code in clever ways to trigger the right password rules at the right time. Then, your increasingly irritating boss asks for a JSON API, and your JSON programmers are not content with the cute “Oops, we broke something” error messages that seemed to work fine for end users. You dig deeply into the model API, and decide that the error reporting no longer works for you. Your stomach sinks like it does for that first rollercoaster drop, hoping against hope that the car will rise again, but you instinctively know that this ride is at its zenith. It’s always downhill from here.


## in chapter 5: Authenticating Users

> The changesets make our code slightly more complex for trivial cases. Rather than marking the model with specific validations that all callers must use, we must specify independent changesets. In the long run, we bet changes from multiple clients with different validation and tracking requirements will make our application much simpler. If our experience with past applications is any indication, it’s a pretty safe bet.


## in chapter 8: Testing

> Libraries are like macros. Don’t use one when a simple function will do the job.

> Writing negative tests is a delicate balance. We don’t want to cover all possible failure conditions.

> If your code is worth writing, it’s worth testing.

> If your tests are slow, you won’t run them as much. We have to fix it.
