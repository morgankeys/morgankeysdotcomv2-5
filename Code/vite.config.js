import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project from /<repo-name>/, so CI sets VITE_BASE.
// Local dev and a future custom domain both serve from the root.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
})
