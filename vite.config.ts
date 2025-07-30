import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Simple GLSL plugin for Vite
const glslPlugin = () => ({
  name: 'glsl',
  transform(code: string, id: string) {
    if (id.endsWith('.glsl')) {
      return `export default ${JSON.stringify(code)};`;
    }
  }
});

export default defineConfig({
  plugins: [react(), glslPlugin(), tailwindcss()],
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html'
      }
    }
  },
  publicDir: '../public',
  base: '/',
  server: {
    port: 3000,
    open: true
  }
});
