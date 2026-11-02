# Umigame — Website

Source of [umigamestudios.com](https://umigamestudios.com), the website of Umigame, an independent game studio from Türkiye. Built with [Jekyll](https://jekyllrb.com) and hosted on GitHub Pages (served from the `/docs` folder of `main`).

## Structure

```
docs/
├── _config.yml        site settings (title, url, email, collections)
├── _layouts/          default, page, work
├── _includes/         header, footer, socials, work cards, pages/ (page bodies)
├── _data/
│   ├── i18n/en.yml    all English UI text + navigation
│   ├── i18n/tr.yml    all Turkish UI text + navigation
│   └── socials.yml    social links (footer + Contact page)
├── _works/            one Markdown file per game (English)
├── _works_tr/         the same games in Turkish
├── assets/            css, js, fonts, img, video
├── index.html, works/, about/, contact/        English pages
├── tr/                                         Turkish pages (/tr/…)
└── CNAME              custom domain — do not delete
```

## Common tasks

**Add a game:** copy a file in `docs/_works/` **and** the matching one in `docs/_works_tr/` (they must share the same `ref`). Change the front matter (`title`, `order`, `genre`, `tagline`, `cover`, `links`) and write the description below it. Optional "künye" fields: `developer`, `platforms`, `release`. Put the cover image in `docs/assets/img/games/`. The Works and Home pages update automatically.

**Change site text or translations:** edit `docs/_data/i18n/en.yml` and `tr.yml`. The language button in the header links each page to its counterpart through the shared `ref`.

**Change a social link:** edit `docs/_data/socials.yml`.

**Change colors:** edit the variables at the top of `docs/assets/css/main.css` (`--accent`, `--bg`, …). The "umigame" wordmark uses the self-hosted Caveat Brush font (SIL Open Font License).

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
