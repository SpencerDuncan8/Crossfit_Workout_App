// vite.config.js

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // This will load .env, .env.local, .env.[mode], .env.[mode].local
  const env = loadEnv(mode, process.cwd(), '');

  // Determine the proxy target URL. Use the VERCEL_URL if it exists (in production/preview),
  // otherwise, fall back to a local or specified URL.
  // For Replit, the dev server is the target itself for API routes.
  const proxyTarget = env.VERCEL_URL ? `https://${env.VERCEL_URL}` : 'http://localhost:5173';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          // --- MODIFIED: Simplified proxy logic ---
          // When running on Vercel, this will correctly proxy to itself.
          // When running locally, it points to the dev server which will handle the /api route.
          // This removes the need for a separate VITE_VERCEL_URL secret.
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});