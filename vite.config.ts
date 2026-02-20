import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vercelApiPlugin } from './vite-plugin-vercel-api';

export default defineConfig({
  server: {
    // Port will be managed by Vite
  },
  plugins: [react(), vercelApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  // Prevent Vite from crawling/transforming api/ serverless functions
  optimizeDeps: {
    exclude: [],
  },
});
