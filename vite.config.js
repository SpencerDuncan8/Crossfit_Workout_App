import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This is required for Replit to properly expose the dev server.
    host: '0.0.0.0',
    
    // This will proxy API requests during development to your live Vercel functions.
    // It will be ignored by Vercel during the production build.
    proxy: {
      '/api': {
        target: 'https://blockfit.app',
        changeOrigin: true,
      },
    },
  },
});