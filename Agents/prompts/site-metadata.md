# Task: site metadata & crawler presentation

Close the gaps found in an audit of how morgankeys.com presents itself to search engines,
social unfurlers, and AI crawlers. Tasks 1–4 are independent and can be done in any order or
separately; task 5 is a larger architectural decision that should be made on its own.

Task 2 (favicon) is already done — kept here with its notes for context. Tasks 1, 3, and 4 are
still open.

## Orientation

Read `Agents/context/deployment.md` first. Two facts from it drive most of this work:

- **There is no client-side router.** Each page is its own HTML entry registered in
  `build.rollupOptions.input` in `Code/vite.config.js`. Today that is two pages:
  `Code/index.html` (`/`) and `Code/opengov-coa/index.html` (`/opengov-coa/`).
- **`<head>` metadata is not shared.** Anything added below must be added to *both* entry
  files, and to every page added later. There is no template layer that would do it for you.
  The per-page values (title, description, `og:url`, `og:image`) differ; the rest is copied.

Files in `Code/public/` are copied verbatim to the site root and are *not* rewritten by Vite.
Inside React, root-relative paths go through `asset()` — but none of the work below is inside
React, so `asset()` does not apply. Use absolute `https://morgankeys.com/...` URLs; crawlers
and unfurlers require them, and the custom domain is stable.

## 1. Open Graph + Twitter Card tags — highest value

Right now, sharing the site anywhere (LinkedIn, Slack, X, iMessage) produces a text-only
unfurl with no image. This is the largest practical gap, since a LinkedIn share is the
portfolio's main distribution path.

Add to each entry's `<head>`:

- `og:title`, `og:description` — can mirror the existing `<title>` / `<meta name="description">`
- `og:type` — `website` for home, `article` for the case study
- `og:url` — the page's own absolute URL
- `og:image` — absolute URL, plus `og:image:width` / `og:image:height` / `og:image:alt`
- `og:site_name` — `Morgan Keys`
- `twitter:card` — `summary_large_image`, plus `twitter:title` / `twitter:description` /
  `twitter:image`

**The share image needs to be made.** The only headshot on hand,
`Code/public/images/profile.png`, is 853×1280 portrait — wrong shape for the 1200×630 landscape
that `summary_large_image` crops to; it would be cut to a band across the eyes. Either produce a
1200×630 card (headshot plus name and tagline reads well) or drop to `twitter:card: summary` with
a square 1200×1200 crop. Put it in `Code/public/images/`.

Verify with the LinkedIn Post Inspector and Slack's unfurl preview against the deployed URL —
these tools fetch live, so this can only be checked after a deploy, not locally.

## 2. Favicon — done

A rounded-square headshot icon supplied by Morgan, in `Code/public/`, linked from both entries:
`favicon.ico` (48/32/16), `favicon-96.png` for HiDPI tabs, and a 180×180 `apple-touch-icon.png`.

The artwork is his, not generated — do not regenerate it from `images/profile.png`. The 96px
PNG is his file byte-for-byte; the `.ico` is his 180 resampled down; the Apple icon is his 180
flattened onto the cream `#fffdfa`, because iOS renders alpha as black. That flattening is safe
because iOS masks at ~22.4% corner radius and this artwork rounds at 14.4%, so the mask cuts
wider than the artwork's own corners and no background shows.

The original suggestion here was a drawn mark in the site palette with an SVG favicon. Two
consequences of using a photo, if this is ever revisited:

- **It is raster, not SVG.** Fine at every size that matters, but it will not scale to a size
  that has not been generated. Regenerating from a larger original is Morgan's call.
- **At 16×16 it reads as a warm blob**, not a face — inherent to photographic favicons. It is
  recognizable from 32×32 up, which is what most browsers now use. A drawn monogram would be
  sharper at the smallest size, at the cost of the personal association.

## 3. `Person` structured data

Add a JSON-LD `<script type="application/ld+json">` block to the home page with a `Person`:
`name`, `url`, `image`, `jobTitle`, and `sameAs` pointing at the LinkedIn and GitHub URLs already
in `Code/src/data/site.js`. This is how Google associates the domain with Morgan as an entity
rather than as an unattributed page, which matters for name searches.

Because it lives in static `<head>`, it works even while the body is client-rendered — see task 5.
Validate with Google's Rich Results Test after deploying.

## 4. Canonical, `robots.txt`, `sitemap.xml`

Lowest urgency; do it for completeness.

- `<link rel="canonical">` on each page pointing at its own `https://morgankeys.com/...` URL.
  Guards against `www`/apex and any future subpath serving being read as duplicates.
- `Code/public/robots.txt` — allow everything, and point at the sitemap. Its current absence
  already means "crawl everything," so this is about the sitemap reference.
- `Code/public/sitemap.xml` — two URLs today. Marginal at this size, but it is the only signal
  that would surface `/opengov-coa/` independently, since that page is linked from exactly one
  card on the home page.

Both files go in `Code/public/` so they land at the site root.

## 5. Prerendering — decide before building

The built `dist/index.html` ships `<div id="root"></div>` and nothing else; every word arrives
via React at runtime. Googlebot renders JavaScript on a second pass, so Google will index the
content. Social unfurlers, Bing's non-rendering path, and most AI crawlers read raw HTML only —
to them the site is a title and one sentence.

Tasks 1–4 all live in static `<head>` and are unaffected by this, which is why they are worth
doing first regardless. If the body content should also be readable without JS, the options are
roughly:

- **`vite-plugin-prerender` / `puppeteer-prerender-plugin`** — render each route to static HTML at
  build time. Fits the current setup best: no framework change, and the multi-entry structure is
  already page-per-file.
- **Move to Astro or Next static export** — better long-term for a content site, but a rewrite of
  the entry/build layer and of how `Code/src/data/` feeds the pages.
- **Accept it.** Defensible for a portfolio whose traffic arrives from a LinkedIn link rather
  than organic search, especially once task 1 makes those links unfurl properly.

Do not start this without a decision on which of the three applies.

## Also worth deciding

The two titles are `Morgan Keys | Product & Design` and
`Morgan Keys | OpenGov Chart of Accounts Manager` — name first. The usual SEO convention is
page-name-first (`OpenGov Chart of Accounts Manager | Morgan Keys`) so the distinctive part
survives truncation in results. Left as-is deliberately; changing it is a call about personal
branding, not a fix.

## Done when

- [ ] OG + Twitter tags on both entries, with a purpose-built share image in `Code/public/images/`
- [ ] Unfurl verified on the deployed URL with LinkedIn Post Inspector and Slack
- [x] Favicon present and referenced from both entries
- [ ] `Person` JSON-LD on the home page, passing Google's Rich Results Test
- [ ] Canonical on both entries; `robots.txt` and `sitemap.xml` in `Code/public/`
- [ ] `npm run build` in `Code/` succeeds and the new `public/` files appear in `dist/`
- [ ] `Code/README.md` structure tree updated with any new `public/` files
- [ ] `Agents/context/deployment.md` "To add a page" checklist updated to say that new pages must
      copy the `<head>` metadata block — the duplication trap this task creates
