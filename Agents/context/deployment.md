# Deployment

How this prototype ships. Load this before changing build config, asset paths, or the
GitHub Actions workflow.

## How it works

Every push to `main` runs `.github/workflows/deploy.yml`, which builds `Code/` with Node 20
and publishes `Code/dist` to GitHub Pages via `actions/deploy-pages`. Pages is configured
with the `workflow` build type, so there is no `gh-pages` branch and nothing is served from
a committed `dist/` — `Code/.gitignore` excludes it deliberately.

The site URL is https://morgankeys.github.io/morgankeysdotcomv2-5/.

**Pages is currently unpublished** — the site was deliberately taken down while the content is
still being finished, so that URL 404s and the deploy workflow's `deploy` step will fail on
push. To republish: repo Settings → Pages → set Source to "GitHub Actions", then re-run the
workflow. Don't "fix" the failing deploy step by changing the workflow; it is correct as-is.

## The base path, and why it matters

Pages serves this repo from `/<repo-name>/`, not from the domain root. Two things depend on
getting that right:

- **Bundled assets.** `Code/vite.config.js` reads `base` from the `VITE_BASE` environment
  variable, defaulting to `/`. The workflow sets it to `/${{ github.event.repository.name }}/`
  so it tracks the repo name automatically. Local dev and `npm run build` stay at `/`.
- **Files in `public/`.** Vite does *not* rewrite these; it copies them verbatim. The image
  paths in `Code/src/data/` are stored root-relative (`/images/foo.png`) and must be passed
  through `asset()` from `Code/src/lib/asset.js`, which prefixes `import.meta.env.BASE_URL`
  at runtime.

**When adding a new image or other `public/` file, render it with `asset()`.** A raw
`src="/images/foo.png"` works in local dev and 404s in production — a failure mode that is
easy to miss because dev and prod differ. The same applies to links between pages: store the
path root-relative in `Code/src/data/site.js` (`links.about = '/about/'`) and pass it through
`asset()` at render time.

## Pages are separate HTML entries, not routes

There is no client-side router. Each page is its own Vite entry, registered in
`build.rollupOptions.input` in `Code/vite.config.js`:

| URL | Entry HTML | React entry | Component |
| --------- | ------------------ | ---------------- | ---------------------- |
| `/` | `index.html` | `src/main.jsx` | `App.jsx` |
| `/about/` | `about/index.html` | `src/about.jsx` | `components/About.jsx` |

Pages serves static files with no rewrite rules, so a directory entry like `about/index.html`
is served at `/about/` directly — deep links and refreshes work with no `404.html` redirect
shim, on both the project subpath and a future custom domain.

**To add a page:** create `<name>/index.html` and `src/<name>.jsx`, add the entry to
`rollupOptions.input`, and link to it with `asset('/<name>/')`. Forgetting the
`rollupOptions.input` line is the easy mistake — the page then works in dev and is missing
from `dist`.

To verify a production build the way Pages will serve it, match the base in both commands:

```bash
cd Code
VITE_BASE=/morgankeysdotcomv2-5/ npm run build
VITE_BASE=/morgankeysdotcomv2-5/ npm run preview
# then open http://localhost:4173/morgankeysdotcomv2-5/
```

## Moving to a custom domain

A custom domain serves from the root, which removes the subpath problem entirely:

1. Set `VITE_BASE: /` in the workflow's build step.
2. Add `Code/public/CNAME` containing the bare domain (e.g. `morgankeys.com`).
3. Point DNS at GitHub Pages and set the custom domain in the repo's Pages settings.

The `asset()` helper stays correct either way, so no component changes are needed.
