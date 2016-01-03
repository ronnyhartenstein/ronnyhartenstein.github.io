# Blog rh-flow.de


## TODO

- [x] Bootstrap Jekyll
- [x] Split up Layout Displaced
- [x] Permalinks like old links
  - http://jekyllrb.com/docs/permalinks/
- [x] Disqus for posts
  - https://help.disqus.com/customer/portal/articles/472138-jekyll-installation-instructions
  - https://rhflow.disqus.com/admin/settings/universalcode/
  - https://help.disqus.com/customer/en/portal/articles/2158629
- [ ] Index page: last x posts
- [ ] Category page
- [x] Remove JQuery (for now)
- [ ] Lazy load Disqus (without Jquery)
  - https://www.kadder.de/2014/04/pagespeed-disqus-mit-lazyload/
  - https://www.hagen-bauer.de/2015/12/jekyll-disquss.html
- [ ] RSS-Feed OXID http://blog.rh-flow.de/category/entwicklung/oxid/feed/ (static?)
- [ ] Search

- [ ] move all drafts from Repo `_blog`
  - http://jekyllrb.com/docs/drafts/

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
