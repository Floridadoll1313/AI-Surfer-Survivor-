import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
<<<<<<< HEAD
    emptyOutDir: true
=======
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
>>>>>>> 064f0f3391a6a75a152fe7a81b96c72465a1f367
  }
});