# Blog rh-flow.de

# Bundle Update

https://github.com/github/pages-gem

`bundle update github-pages` -> aktualisiert `Gemfile.lock`


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
bundle exec jekyll serve --drafts --baseurl '' --profile --incremental
```

## Bower for vendor libs

GitHub Pages don't support Bower directly, so we just use Bower for download and then copy the necessary parts directly to `vendor/`.

If you don't have Bower already installed, run `npm -g install bower`.
