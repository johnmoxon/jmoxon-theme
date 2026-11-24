# jmoxon theme

The Hugo theme behind [jmoxon.net](https://jmoxon.net). It is built on
[Bulma 1](https://bulma.io), compiled with Dart Sass, and has light and dark
themes.

## Requirements

- Hugo 0.158.0 or later (standard or extended edition)
- [Dart Sass](https://gohugo.io/functions/css/sass/#dart-sass) on the `PATH`
- Go, for Hugo Modules

## Installation

Import the theme as a Hugo module in the site's `hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/johnmoxon/jmoxon-theme
```

Then run `hugo mod get -u github.com/johnmoxon/jmoxon-theme` to pull the
latest tagged version.

## Configuration

```yaml
params:
  subtitle: "Shown above the site title"
  mainSections: [articles]
  themeToggle: true          # light/dark toggle in the navbar (default true)
  author:
    name: John
    social:
      linkedin: { user: johnmoxon }
      twitter: { user: johnmoxon }

  # Analytics. Each integration is included only when its block is present,
  # and only in production builds.
  services:
    umami:
      id: <website id>
      src: https://umami.example.com/s.js
      recorder: https://umami.example.com/recorder.js   # optional
    plausible:
      src: https://plausible.example.com/js/script.js
    googletag:
      id: G-XXXXXXXXXX
```

### Light and dark themes

The site follows the visitor's system setting. The navbar toggle overrides it
and the choice is remembered in `localStorage`. Colours come from Bulma's CSS
variables plus two theme tokens, `--jm-ink` and `--jm-paper`
(`assets/scss/theme/_tokens.scss`). Use `.has-text-ink` instead of
`.has-text-black` so text adapts to both themes.

### Styles

`assets/scss/main.scss` configures Bulma (colours, fonts, sizes) and loads only
the Bulma modules the templates use. Bulma is mounted from the
`github.com/jgthms/bulma` module at `assets/bulma` and imported with relative
paths.

## Local development against the site

```sh
cd ../jmoxon.net
printf 'go 1.20\nuse .\nuse ../jmoxon-theme\n' > go.work.local
HUGO_MODULE_WORKSPACE=go.work.local hugo server
```

## Releasing

Tag a semver version (for example `v1.1.0`), then in the site repo run
`hugo mod get github.com/johnmoxon/jmoxon-theme@v1.1.0 && hugo mod tidy`.
