---
layout: post
title: Gogs instead of GitLab and How to migrate on Ubuntu plus Bonus about memory consumption confusion
#date_first: '2016-06-11'
date: '2016-11-20'
tags:
- git
- devops
---

Normally I just want to rant a bit about the amount of ressources which Gitlab is consuming. Recently I installed Nextcloud, which using the existing MySQL and use Redis for caching (yay!). But Gitlab comes as a bundle of services (Nginx, PostgresSQL, Redis (own port), Sidekiq, Unicorn, Workhorse). Gogs instead is using also MySQL and Redis (yay!).

Well, I thought Gitlab is consuming around 6 GB of RAM, but after reading [Linux ate my RAM](http://www.linuxatemyram.com) I'm not sure anymore. More about memory and resources at the end of post. But hey, for my purposes Gogs is quite the better (and more slim) solution. So fast forward to Gogs. **Um, how to migrate?**

If you search for "gogs migration gitlab" then you [get](http://stackoverflow.com/questions/31128371/migrate-gitlab-to-gogs) [some](https://github.com/valeriangalliat/gogs-migrate) [poor](https://github.com/gogits/gogs/issues/881) informations but nothing like a keep-it-simple HowTo. At least nothing special for the Gitlab-to-Gogs scenario. 

My situation: ~50 repos, 3 users, 5 groups. Let see what to do and how to automate..

<!--more-->

What I had to do:

- create users -> manually, just 3
- create organisations, the groups in Gogs -> manually, just 5 
- create repos -> of course NOT manually
- copy&paste repo descriptions from GitLab to Gogs -> manually
  - I guess its not a big deal to SELECT them from GitLab PostgresSQL and put it into the Gogs MySQL.

So the main focus lies on create an import of existing repos.

## Gogs REST-API

Gogs has a nice REST-API -> [documentation here](https://github.com/gogits/go-gogs-client/wiki/Repositories#migrate).
The following example API-calls assume admin credentials in bash exports `$admuser` and `$admpwd`.

**Search repos with "js":**

```
curl -u $admuser:$admpwd \
  -X GET \
  https://gogs.yourdomain.lol/api/v1/repos/search?q=js&uid=1
```

**List repositories:**

```
curl -u $admuser:$admpwd \
  -X GET \
  https://gogs.yourdomain.lol/api/v1/user/repos
```

**Create a user repository:**

```
curl -u $admuser:$admpwd \
  -d '{"name":"Awesome-Project","private":true}' \ 
  -X POST \
  -H 'Content-Type: application/json; charset=utf-8' \
  https://gogs.yourdomain.lol/api/v1/user/repos
```

**Create an organisation repository:**

```
curl -u $admuser:$admpwd \
  -d '{"name":"Awesome-Orga-Project","private":true}' \
  -X POST \
  -H 'Content-Type: application/json; charset=utf-8' \
  https://gogs.yourdomain.lol/api/v1/org/Your-Group/repos
```

**Migrate directly from another git service (even GitLab!):**

If you have just some projects, you can use the direct way with this webservice. There is even an frontend page in Gogs, just call `/repo/migrate`.

```
curl -u $admuser:$admpwd \
  -d '{"clone_addr": "https://gitlab.yourdomain.lol/johndoe/you-awesome-project.git", "auth_username":"johndoe", "auth_password":"pAssw0rdThere", "uid":1, "repo_name":"you-awesome-project", "name":"you-awesome-project", "private":true}' \
  -X POST \
  -H 'Content-Type: application/json; charset=utf-8' \
  https://gogs.yourdomain.lol/api/v1/user/repos
```

**Delete a repo:**

```
curl -u $admuser:$admpwd \
  -X DELETE \
  https://gogs.yourdomain.lol/api/v1/repos/johndoe/your-awesome-project
```

## Import from Gitlab Backup

Here are the steps I walked:

- I found my GitLab backup here: `/var/opt/gitlab/backups`
  - (it's created by a cronjob `/opt/gitlab/bin/gitlab-rake gitlab:backup:create CRON=1`)
- Untar the latest tar in `/home/gogs/gitlab-backup`
- it crumbles into some directories with `*.bundle` files, which are just `tar` files :)
- so a script must create for each `bundle` a dir, untar it, create the repo and import it

## Migration scripts

**Users**

I use `code.yourdomain.lol` where Gogs is running. 
The REST-API is called using the credentials of the admin user. In Gogs, admin is (at least) the first created user, here `admin`. Password should be your own, of course. All repos are created as private. You can customize if you want.

Place the `migration.sh` in a user directory, e.g. `/home/gogs/gitlab-backup/johndoe`.

```bash
#!/bin/bash
admuser="admin"
admpwd="yoURp@ssW0rd"
user="johndoe"
for bundle in *.bundle; do
    echo $bundle
    repo=${bundle%.bundle}
    mkdir $repo
    cd $repo
    tar xf ../$bundle
    post="{\"name\":\"$repo\",\"private\":true}"
    curl -u $admuser:$admpwd -d $post -X POST -H 'Content-Type: application/json; charset=utf-8' https://gogs.yourdomain.lol/api/v1/user/repos
    git push --mirror https://$admuser:$admpwd@gogs.yourdomain.lol/$user/$repo.git
    cd ..
done
```

Well, the username is fixed. Because inside of `/home/gogs/gitlab-backup/` its not possible to determine if a subdir is a user or a group. It's up to you to create a script which is able to. I'm curious to see comments about it.

**GitLab groups -> Gogs organisations**

To migrate groups to organisations, ot's nearly the same script like for users - except of the other REST-API-path and git push target.

Place the `migration.sh` in a group directory, e.g. `/home/gogs/gitlab-backup/your-group`.

```bash
admuser="admin"
admpwd="yoURp@ssW0rd"
orga="your-group"
for bundle in *.bundle; do
    echo $bundle
    repo=${bundle%.bundle}
    mkdir $repo
    cd $repo
    tar xf ../$bundle
    post="{\"name\":\"$repo\",\"private\":true}"
    curl -u $admuser:$admpwd -d $post -X POST -H 'Content-Type: application/json; charset=utf-8' https://gogs.yourdomain.lol/api/v1/org/$orga/repos
	  git push --mirror https://$admuser:$admpwd@gogs.yourdomain.lol/$orga/$repo.git
    cd ..
done
```

## Memory consumption confusion

I told you about my primary reason why I switched from GitLab to Gogs - reducing memory consumption. And I told you before that I was probably wrong. Here are some stats from my server, after I started the services and played a bit with them (just to fill the caches).

**GitLab**

Have a look at this `free -h` when GitLab is running:

![Memory with GitLab](/files/2016/gogs-statt-gitlab/mem-with-gitlab.jpg)

Then look an those processes - all comes with the Omibus package of GitLab:

![htop headline](/files/2016/gogs-statt-gitlab/htop-headline.jpg)

![GitLab Sidekiq processes](/files/2016/gogs-statt-gitlab/gitlab-sidekiq.jpg)

Nearly 600 MB for Sidekiq. 

![GitLab Unicorn Master processes](/files/2016/gogs-statt-gitlab/gitlab-unicorn.jpg)

Another 500 MB for Unicorn master.

![GitLab Workhorse, Unicorn, Nginx processes](/files/2016/gogs-statt-gitlab/gitlab-workhorse-unicorn-nginx.jpg)

120 MB for workhorse, ~40 for his own Ngnix

![GitLab Postgres and Redis processes](/files/2016/gogs-statt-gitlab/gitlab-postgres-redis.jpg)

Well and a fat 2.1 GB Postgres instance. Redis with its ~40 MB hardly doesn't matter.

**Gogs**

Now have a look at `free -h` when Gogs is running:

![Memory with Gogs](/files/2016/gogs-statt-gitlab/mem-with-gogs.jpg)

First some stats from Gogs personally - Golang metrics: 

![Gogs memory consumption by web frontend](/files/2016/gogs-statt-gitlab/gogs-web-memory.jpg)

These are the Gogs processes: 

![htop headline](/files/2016/gogs-statt-gitlab/htop-headline.jpg)

![Gogs Web processes after start](/files/2016/gogs-statt-gitlab/gogs-web-after-start.jpg)

Around 250 MB.

Thats how it looks after a day of usage:

![Gogs Web processes after a day](/files/2016/gogs-statt-gitlab/gogs-web-after-a-day.jpg)

Around 500 MB.

Gogs and Nextcloud are using these services both:

![Redis processes](/files/2016/gogs-statt-gitlab/redis.jpg)

The same 40 MB like above Redis.

![MySQL processes](/files/2016/gogs-statt-gitlab/mysqld.jpg)

And 1.2 GB MySQL database at all.

## Conclusion

I guess hardly the values above are the max consumption and reserved memory. So even if it looks like it ate all my 8 GB, it doesn't. But after I switches to Gogs my Nextcloud was incredibly more fast than before. So of course there is a causal connection :) So for me the shift was quite successfull and the guys and community behind Gogs are quite fantastic.

Well, beside all the memory stuff and my half knowledge about memory management - the GitLab crew and community does a really good job at being a GitHub replacement. We are using it at work and we are more then happy with it! 