# Code — Morgan Keys portfolio

A reproduction of [morgankeys.com](https://morgankeys.com) (originally built in Figma Sites)
as a Vite + React single-page app.

## Run

```bash
cd Code
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into Code/dist
npm run preview  # preview the production build
```

## Deploy

Pushing to `main` builds this folder and publishes it to GitHub Pages. Pages serves the site
from a subpath, so `base` comes from the `VITE_BASE` env var and anything in `public/` must be
referenced through `asset()` in `src/lib/asset.js`. See `Agents/context/deployment.md`.

## Structure

```
Code/
├── index.html                 # home entry HTML, loads Inter via Google Fonts
├── about/index.html           # /about entry HTML
├── public/images/             # screenshots, client logos, and headshot from the live site
└── src/
    ├── main.jsx               # React entry for the home page
    ├── about.jsx              # React entry for the about page
    ├── App.jsx / App.css      # sidebar + content layout
    ├── styles/
    │   ├── tokens.css         # colors, type scale, layout tokens
    │   └── global.css         # base/reset + section-label utility
    ├── data/
    │   ├── site.js            # sidebar content + links + client logos
    │   ├── about.js           # long-form bio + resume links for /about
    │   ├── caseStudies.js     # 5 case studies (verbatim copy, brand accent)
    │   └── otherProjects.js   # 6 other projects (verbatim copy, brand accent)
    ├── lib/
    │   └── asset.js           # resolves root-relative paths against the deploy base
    └── components/
        ├── Sidebar.jsx / .css       # sticky left sidebar (collapses to top header)
        ├── About.jsx / .css         # centered 752px prose column for /about
        ├── CaseStudies.jsx / .css   # rust label + wrapping card grid
        ├── OtherProjects.jsx / .css # rust label + stacked full-width items
        ├── ProjectCard.jsx / .css   # CaseStudyCard + OtherProjectItem
        └── icons.jsx                # inline SVG home/social, arrow, Google/Microsoft logos
```

## Pages

Two pages, each its own HTML entry (wired up in `vite.config.js`) rather than a client-side
router — GitHub Pages serves static files, so `/about/` resolves to `about/index.html` on its
own and deep links work without a `404.html` redirect shim.

| URL | Entry | Component |
| --------- | ------------------ | ---------------------- |
| `/` | `index.html` | `App.jsx` |
| `/about/` | `about/index.html` | `components/About.jsx` |

Links between pages are plain `<a href>` wrapped in `asset()`, which keeps them correct under
the GitHub Pages subpath.

## Layout

Matches the live Figma Site: a **342px sticky left sidebar** (headshot, name, `@handle`,
social icons, resume/read-more links, bio, client logos) beside a **fluid content column**
(case studies + other projects). At the tablet (≤1199) and mobile (≤739) breakpoints the
sidebar collapses to a centered top header, and the case-study grid reflows 3 → 2 → 1 columns.

## Content source

All copy, colors, typography, links, and images were extracted from the published
Figma Sites bundle (the site's `_index.json` node tree and `/_assets/` CDN), including exact
per-breakpoint frames. Content lives in `src/data/` so it can be edited without touching layout.

- Fonts: a **serif** for the name and project titles (matching the live site's serif fallback)
  and **Inter** for all body/UI text (the font the published site actually loads).
- Palette: cream `#fffdfa`, cards `#ffffff`, text `#2d3930`/`#0a0f0a`, muted `#626a64`,
  name green `#354439`, rust labels/handle `#b72100`.

## Notes

This is a faithful hand-built rebuild, not a byte-for-byte clone of Figma's generated markup;
exact metrics may differ slightly from the proprietary Figma runtime output.
