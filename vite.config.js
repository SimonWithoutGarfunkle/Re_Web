import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://re.simonwithoutgarfunkle.fr',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
