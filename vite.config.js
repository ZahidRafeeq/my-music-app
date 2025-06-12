import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/my-music-app/', // <-- IMPORTANT: your repo name
  plugins: [react()],
});
