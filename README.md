# Umigame — Website

Source of [umigamestudios.com](https://umigamestudios.com), the website of Umigame, an independent game studio from Türkiye. Built with [Jekyll](https://jekyllrb.com) and hosted on GitHub Pages (served from the `/docs` folder of `main`).

## Structure

```
docs/
├── _config.yml        site settings (title, url, email, collections)
├── _layouts/          default, page, work
├── _includes/         header, footer, socials, work-card
├── _data/
│   ├── nav.yml        main navigation
│   └── socials.yml    social links (footer + Contact page)
├── _works/            one Markdown file per game
├── assets/            css, js, fonts, img, video
├── index.html         Home
├── works/ about/ contact/
└── CNAME              custom domain — do not delete
```

## Common tasks

**Add a game:** copy any file in `docs/_works/`, change the front matter (`title`, `order`, `tagline`, `cover`, `links`) and write the description below it. Put the cover image in `docs/assets/img/games/`. The Works page and Home page update automatically.

**Change a social link:** edit `docs/_data/socials.yml`.

**Change colors:** edit the variables at the top of `docs/assets/css/main.css` (`--accent`, `--bg`, …).

## Run locally

Requires Ruby 3+ and Jekyll.

```sh
gem install jekyll jekyll-sitemap webrick
cd docs
jekyll serve
# open http://localhost:4000
```

## Deploying

Pushes to `main` are published automatically by GitHub Pages. For larger changes, work on a branch and open a pull request.
