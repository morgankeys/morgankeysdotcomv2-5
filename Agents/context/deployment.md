# Deployment

How this prototype ships. Load this before changing build config, asset paths, or the
GitHub Actions workflow.

## How it works

Every push to `main` runs `.github/workflows/deploy.yml`, which builds `Code/` with Node 24
and publishes `Code/dist` to GitHub Pages via `actions/deploy-pages`. Pages is configured
with the `workflow` build type, so there is no `gh-pages` branch and nothing is served from
a committed `dist/` — `Code/.gitignore` excludes it deliberately.

The live site is https://morgankeys.com/, set as the repo's custom domain. The old
`morgankeys.github.io/morgankeysdotcomv2-5/` URL redirects there.

## The base path, and why it matters

The custom domain serves from the root, so the base path is `/`. It is still worth
understanding, because the site spent its early life on the `/morgankeysdotcomv2-5/` subpath
and the machinery that handled that is still in place:

- **Bundled assets.** `Code/vite.config.js` reads `base` from the `VITE_BASE` environment
  variable, defaulting to `/`. The workflow sets it explicitly to `/` so the intent is visible
  at the point it matters. Reverting to a project subpath means setting it back to
  `/<repo-name>/` there — nothing else changes.
- **Files in `public/`.** Vite does *not* rewrite these; it copies them verbatim. The image
  paths in `Code/src/data/` are stored root-relative (`/images/foo.png`) and must be passed
  through `asset()` from `Code/src/lib/asset.js`, which prefixes `import.meta.env.BASE_URL`
  at runtime.

**When adding a new image or other `public/` file, render it with `asset()`.** A raw
`src="/images/foo.png"` works in local dev and 404s in production — a failure mode that is
easy to miss because dev and prod differ. The same applies to links between pages: store the
path root-relative in `Code/src/data/site.js` (`links.opengovCoa = '/opengov-coa/'`) and pass
it through `asset()` at render time.

## Pages are separate HTML entries, not routes

There is no client-side router. Each page is its own Vite entry, registered in
`build.rollupOptions.input` in `Code/vite.config.js`:

| URL | Entry HTML | React entry | Component |
| --------- | ------------------ | ---------------- | ---------------------- |
| `/` | `index.html` | `src/main.jsx` | `App.jsx` |
| `/opengov-coa/` | `opengov-coa/index.html` | `src/opengov-coa.jsx` | `components/OpenGovCoa.jsx` |

Pages serves static files with no rewrite rules, so a directory entry like
`opengov-coa/index.html` is served at `/opengov-coa/` directly — deep links and refreshes work
with no `404.html` redirect shim, on the custom domain root and on a project subpath alike.

**To add a page:** create `<name>/index.html` and `src/<name>.jsx`, add the entry to
`rollupOptions.input`, and link to it with `asset('/<name>/')`. Forgetting the
`rollupOptions.input` line is the easy mistake — the page then works in dev and is missing
from `dist`.

To verify a production build the way Pages will serve it:

```bash
cd Code
npm run build
npm run preview
# then open http://localhost:4173/
```

## The custom domain

`morgankeys.com` is set as the custom domain in the repo's Pages settings. DNS lives in
Route 53, where the apex `A` record holds GitHub's four Pages IPs
(`185.199.108.153` through `185.199.111.153`) and `www` is a `CNAME` to
`morgankeys.github.io` (bare, with no repo name). Route 53's `Alias` toggle only targets AWS
resources, so the `ALIAS`/`ANAME` option in GitHub's docs is not available here.

**There is no `CNAME` file in `Code/public/`, and adding one would do nothing.** That file is
how branch-based publishing carries the domain; this repo publishes from an Actions workflow,
where GitHub ignores it and reads the domain from the Pages settings instead. An earlier
version of this doc got that wrong.

The `asset()` helper is correct at any base, so moving between a custom domain and a project
subpath needs no component changes — only the `VITE_BASE` value in the workflow.
