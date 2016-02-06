# Blog rh-flow.de


## TODO

- [x] Umstellung auf rouge statt pygments
  - [x] `bundle update`
  - [x] CSS von pygments an rouge anpassen/übernehmen
- [x] Umstellung auf kramdown


Ideas - later:

- [ ] (later) Post: more articles of category of Post
  - http://stackoverflow.com/questions/22441281/jekyll-site-categories-variable


# Features

On `bundle update` after [Githubs move from Jekyll 2 to 3](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0)

```
Installing minitest 5.8.4 (was 5.8.3)
Using thread_safe 0.3.5
Using addressable 2.3.8
Using coffee-script-source 1.10.0
Using execjs 2.6.0
Using colorator 0.1
Using ffi 1.9.10
Using multipart-post 2.0.0
Using gemoji 2.1.0
Using net-dns 0.8.0
Using public_suffix 1.5.3
Installing sass 3.4.21 (was 3.4.20)
Using rb-fsevent 0.9.7
Using kramdown 1.9.0
Installing liquid 3.0.6 (was 2.6.2)
Using mercenary 0.3.5
Installing rouge 1.10.1
Using safe_yaml 1.0.4
Using jekyll-feed 0.3.1
Using mini_portile2 2.0.0
Using jekyll-paginate 1.1.0
Installing jekyll-sitemap 0.10.0 (was 0.9.0)
Using rdiscount 2.1.8
Using redcarpet 3.3.3
Using terminal-table 1.5.2
Using bundler 1.11.2
Installing jekyll-textile-converter 0.1.0
Using tzinfo 1.2.2
Using coffee-script 2.4.1
Installing ethon 0.8.1 (was 0.8.0)
Installing rb-inotify 0.9.6 (was 0.9.5)
Using faraday 0.9.2
Using jekyll-sass-converter 1.3.0
Installing nokogiri 1.6.7.2 (was 1.6.7.1) with native extensions
Installing activesupport 4.2.5.1 (was 4.2.5)
Using jekyll-coffeescript 1.0.1
Using typhoeus 0.8.0
Using listen 3.0.5
Using sawyer 0.6.0
Installing html-pipeline 2.3.0 (was 1.9.0)
Installing github-pages-health-check 0.6.0 (was 0.5.3)
Installing jekyll-watch 1.3.1 (was 1.3.0)
Using octokit 4.2.0
Installing jekyll 3.0.2 (was 2.4.0)
Using jekyll-gist 1.4.0
Installing jekyll-mentions 1.0.0 (was 0.2.1)
Installing jekyll-redirect-from 0.9.1 (was 0.8.0)
Installing jekyll-seo-tag 0.1.4
Installing jemoji 0.5.1 (was 0.5.0)
Installing github-pages 45 (was 40)
```


## Gist Support through [`jekyll-gist`](https://github.com/jekyll/jekyll-gist)

```
{% gist parkr/c08ee0f2726fd0e3909d test.md %}
```

## Jekyll Docs

- [Liquid Template Engine for Designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)
- [integrate Images and Resources](http://jekyllrb.com/docs/posts/#including-images-and-resources)


# Up and Running

## Install Jekyll

Mac users: To install `ruby` run `brew install ruby`

https://help.github.com/articles/using-jekyll-with-pages/

```
sudo gem install bundler
bundle install
```

## Run Jeykll local

```
jekyll serve --drafts --baseurl '' --profile --incremental
```

## Bower for vendor libs

GitHub Pages don't support Bower directly, so we just use Bower for download and then copy the necessary parts directly to `vendor/`.

If you don't have Bower already installed, run `npm -g install bower`.
