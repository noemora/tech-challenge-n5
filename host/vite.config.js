import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        remote: 'http://localhost:5001/assets/remoteEntry.js',
        remote2: 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false, // Disable module preload for compatibility
    target: 'esnext', // Use modern JavaScript features
    minify: false, // Disable minification for easier debugging
    cssCodeSplit: false, // Disable CSS code splitting
  },
});
