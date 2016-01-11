#!/bin/sh

cd css
sass --scss --watch --style compressed --sourcemap=none style.scss:style.css
