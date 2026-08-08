// Resolves a path in `public/` against the deploy base, which is a subpath on
// GitHub Pages. Data files store these paths root-relative (e.g. /images/x.png).
export function asset(path) {
  if (!path) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
