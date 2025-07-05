import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const plugins = [
    react(),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
    }),
  ];
  if (process.env.npm_config_report) {
    plugins.push(visualizer({ open: true, filename: 'bundle-report.html' }));
  }
  return {
    plugins,
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    // Explicit build optimizations for production
    build: {
      minify: 'esbuild', // Explicitly enable minification (default)
      cssMinify: true,   // Minify CSS (default)
      sourcemap: false,  // No source maps in production by default
      target: 'es2017',  // Only serve modern JS (no legacy polyfills)
      // You can add more options here if needed
    },
  };
});
