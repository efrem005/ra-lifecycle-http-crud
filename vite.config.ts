import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/ra-lifecycle-http-crud/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ra-lifecycle-http-crud-server.onrender.com/notes',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
})
