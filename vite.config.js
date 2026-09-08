import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { API_ORIGIN } from './src/api/config.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: API_ORIGIN,
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
