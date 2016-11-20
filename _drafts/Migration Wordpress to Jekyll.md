---
layout: post
comments: true
title: Migrating from Wordpress to Jekyll
date: '2016-01-03'
#categories: Patterns
---

http://import.jekyllrb.com/docs/installation/

`gem install jekyll-import`

http://import.jekyllrb.com/docs/wordpress/

`gem install unidecode sequel mysql2 htmlentities`

```
ruby -rubygems -e 'require "jekyll-import";
    JekyllImport::Importers::WordPress.run({
      "dbname"   => "wp-root",
      "user"     => "root",
      "password" => "",
      "host"     => "192.168.99.100",
      "socket"   => "",
      "table_prefix"   => "wp_5_",
      "site_prefix"    => "",
      "clean_entities" => true,
      "comments"       => false,
      "categories"     => true,
      "tags"           => true,
      "more_excerpt"   => true,
      "more_anchor"    => true,
      "extension"      => "md",
      "status"         => ["publish"]
    })'
```

Remove old or unrelevant content and sites.

Introduce layout.
