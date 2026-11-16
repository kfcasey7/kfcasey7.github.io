import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps every asset path relative, so the site works at
// username.github.io, username.github.io/repo-name, or any other host.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
