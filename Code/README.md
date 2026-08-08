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

## Structure

```
Code/
├── index.html                 # entry HTML, loads Inter via Google Fonts
├── public/images/             # screenshots, client logos, and headshot from the live site
└── src/
    ├── main.jsx               # React entry
    ├── App.jsx / App.css      # sidebar + content layout
    ├── styles/
    │   ├── tokens.css         # colors, type scale, layout tokens
    │   └── global.css         # base/reset + section-label utility
    ├── data/
    │   ├── site.js            # sidebar content + links + client logos
    │   ├── caseStudies.js     # 5 case studies (verbatim copy, brand accent)
    │   └── otherProjects.js   # 6 other projects (verbatim copy, brand accent)
    └── components/
        ├── Sidebar.jsx / .css       # sticky left sidebar (collapses to top header)
        ├── CaseStudies.jsx / .css   # rust label + wrapping card grid
        ├── OtherProjects.jsx / .css # rust label + stacked full-width items
        ├── ProjectCard.jsx / .css   # CaseStudyCard + OtherProjectItem
        └── icons.jsx                # inline SVG social, arrow, Google/Microsoft logos
```

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
