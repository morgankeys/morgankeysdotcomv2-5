# morgankeys.com

Portfolio site for Morgan Keys — a Vite + React single-page app, deployed to GitHub Pages.

**Live:** https://morgankeys.github.io/morgankeysdotcomv2-5/

## Quick start

```bash
cd Code
npm install
npm run dev
```

See [`Code/README.md`](Code/README.md) for the app's structure, layout, and content sources.

## Repo layout

This repo is a fork of a prototyping kit, so the app lives in `Code/` rather than at the
root. Four top-level folders sit as peers:

| Folder    | Purpose                                                              |
| --------- | -------------------------------------------------------------------- |
| `Code/`   | The site itself — Vite + React source, images, and build config.      |
| `Docs/`   | Design system notes, personas, and prototype write-ups.               |
| `Export/` | Drop zone for built artifacts staged for manual transfer.             |
| `Agents/` | Instructions, skills, and context for AI agents working in this repo. |

[`AGENTS.md`](AGENTS.md) is the entry point for any AI tool working here.

## Deployment

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds `Code/` and publishes to GitHub Pages. Because Pages serves the site from a
subpath, CI sets `VITE_BASE` to the repo name — see
[`Agents/context/deployment.md`](Agents/context/deployment.md) for the details and for how
to switch to a custom domain.
