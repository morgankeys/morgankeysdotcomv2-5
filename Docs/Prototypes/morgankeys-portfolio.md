# Prototype: Morgan Keys portfolio

Reproduction of the personal portfolio at [morgankeys.com](https://morgankeys.com), originally
built in **Figma Sites**, rebuilt as a **Vite + React** app that lives in [`Code/`](../../Code).

## Why a rebuild (not a Figma import)

The original is a Figma **Site** (`/site/` URL). Figma's MCP server only supports Design,
FigJam, and Make files, so the site could not be read design-to-code. Instead, the published
site was used as the source: its `_index.json` node tree and `/_assets/` CDN provided exact
copy, colors, typography, links, and imagery.

## Layout & structure

Matches the live design closely (rebuilt from the exact per-breakpoint frames in the site's
`_index.json`):

- **Sticky left sidebar (342px)** — headshot, "Morgan Keys" (serif, green), "@morgankeys"
  (rust), LinkedIn + GitHub icons, bold "View resume" / "Read more about me →", three bio
  lines, and "Client projects:" logos (Google, Microsoft, Cisco, Gartner).
- **Content column** with two rust, uppercase-labelled sections:
  - **Case studies** (5) — white rounded cards (title → screenshot → "View case study" pill →
    description → company icon + company/year), wrapping 3 → 2 → 1 columns.
  - **Other projects** (6) — full-width items (title → large image → description → meta).
    Company icons come from the Portfolio Design System (Boardable, DesignMap, Autodesk,
    BuildingConnected, OpenGov, Hightail).
- At ≤1199 (tablet) and ≤739 (mobile) the sidebar collapses to a centered top header; the
  bio and client logos are hidden and the card grid reflows, mirroring the original.

## Pages

- **`/`** — the sidebar + case studies/other projects layout described above.
- **`/about/`** — the long-form bio from [morgankeys.com/about](https://morgankeys.com/about):
  a centered 752px column with a home link, headshot beside "Hi, I'm Morgan." (rust period),
  social icons, eight paragraphs, and the two resume links. Reached from the sidebar's
  "Read more about me →".

Each page is a separate HTML entry rather than a client-side route, so deep links work on
GitHub Pages without a redirect shim — see [`Agents/context/deployment.md`](../../Agents/context/deployment.md).

## Design tokens

- Fonts: a **serif** for the name and project titles (matching the live site's serif
  fallback) + **Inter** for body/UI (the font the published site loads).
- Palette: cream `#fffdfa`, cards `#ffffff`, text `#2d3930`/`#0a0f0a`, muted `#626a64`,
  name green `#354439`, rust labels/handle `#b72100`.
- Breakpoints mirror the original: mobile 375, tablet 740, desktop 1200.

## Running

See [`Code/README.md`](../../Code/README.md). In short: `cd Code && npm install && npm run dev`.

## Assets

Images (screenshots, client logos, headshot) were downloaded from the live site into
[`Code/public/images/`](../../Code/public/images). Company marks (`icon-*.{svg,png}`) were
exported from the Portfolio Design System Figma file. Content strings live in `Code/src/data/`.
