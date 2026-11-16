import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// `vite build` uses the GitHub Pages sub-path; `vite` (dev) serves from "/".
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/hello-fresh-with-react/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))
