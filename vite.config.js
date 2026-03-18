import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  base: '/', // Ensures all internal links start with /
});
