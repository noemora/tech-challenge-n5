import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote2',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx',
      },
      shared: [
        'react',
        'react-dom',
        'styled-components',
        '@tanstack/react-query',
        'zustand',
      ],
    }),
  ],
  build: {
    modulePreload: false, // Disable module preload for compatibility
    target: 'esnext', // Use modern JavaScript features
    minify: false, // Disable minification for easier debugging
    cssCodeSplit: false, // Disable CSS code splitting
  },
});
