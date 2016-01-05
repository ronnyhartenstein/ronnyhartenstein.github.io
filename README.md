# Blog rh-flow.de


## TODO

- [x] Bootstrap Jekyll
- [x] Split up Layout Displaced
- [x] Remove JQuery (for now)
- [x] Permalinks like old links
  - http://jekyllrb.com/docs/permalinks/

- [x] Disqus for posts
  - https://help.disqus.com/customer/portal/articles/472138-jekyll-installation-instructions
  - https://rhflow.disqus.com/admin/settings/universalcode/
  - https://help.disqus.com/customer/en/portal/articles/2158629
- [x] Index page: last x posts

- [x] Category page
  - https://github.com/zroger/jekyll-categories
  - http://geligalabs.com/code/2014/06/19/jekyll-category-list.html
  - http://stackoverflow.com/questions/22441281/jekyll-site-categories-variable
  - gh-pages don't support Plugins!

- [x] Pictures from wp-content
- [x] Genericons CSS+Font for arrows

- [x] Post archive (index_older.html) + Navigation

- [ ] Lazy load Disqus (without Jquery) + Activate
  - https://www.kadder.de/2014/04/pagespeed-disqus-mit-lazyload/
  - https://www.hagen-bauer.de/2015/12/jekyll-disquss.html

- [x] RSS-Feed OXID http://blog.rh-flow.de/category/entwicklung/oxid/feed/ (static?)

- [ ] move all drafts from Repo `_blog`
  - some docs on Google Docs?
  - http://jekyllrb.com/docs/drafts/

- BLOG!

Ideas - later:

- [ ] (later) Post: more articles of category of Post
  - http://stackoverflow.com/questions/22441281/jekyll-site-categories-variable

## Jekyll Docs

- [Liquid Template Engine for Designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)
- [integrate Images and Resources](http://jekyllrb.com/docs/posts/#including-images-and-resources)

## Install Jekyll

Mac users: To install `ruby` run `brew install ruby`

https://help.github.com/articles/using-jekyll-with-pages/

```
sudo gem install bundler
bundle install
```

## Run Jeykll local

```
bundle exec jekyll serve --baseurl ''
```

## Bower for vendor libs

GitHub Pages don't support Bower directly, so we just use Bower for download and then copy the necessary parts directly to `vendor/`.

If you don't have Bower already installed, run `npm -g install bower`.
