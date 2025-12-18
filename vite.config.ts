import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 部署到子路径时使用，例如 GitHub Pages
  // base: '/your-repo-name/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    host: true, // 允许局域网访问 (监听 0.0.0.0)
    port: 5173,
  },
})
