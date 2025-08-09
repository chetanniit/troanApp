import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
	
server: {
    allowedHosts: ['devserver-master--tronapp.netlify.app'],
  },
  plugins: [
    nodePolyfills(),
    react()
  ]
});
