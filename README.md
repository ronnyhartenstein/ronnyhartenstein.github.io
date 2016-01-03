# Blog rh-flow.de


## TODO

- RSS-Feed OXID http://blog.rh-flow.de/category/entwicklung/oxid/feed/ (static?)
- Index page: last x posts
- Category page
- Search


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
