import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Phaser/',
  build: {
    chunkSizeWarningLimit: 2000 // 單位 KB，這裡改成 2MB
  }
});