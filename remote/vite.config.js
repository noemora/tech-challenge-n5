import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      federation({
        name: 'remote',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/App.jsx',
        },
        remotes: {
          host:
            env.VITE_REMOTE_HOST_URL ||
            'http://localhost:4173/assets/remoteEntry.js',
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
  };
});
