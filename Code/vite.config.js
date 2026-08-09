import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

// GitHub Pages serves this project from /<repo-name>/, so CI sets VITE_BASE.
// Local dev and a future custom domain both serve from the root.
//
// Each page is its own HTML entry rather than a client-side router: GitHub Pages
// serves static files only, so /about/ resolves to about/index.html on its own
// and deep links work without a 404.html redirect shim.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        about: resolve(root, 'about/index.html'),
      },
    },
  },
})
