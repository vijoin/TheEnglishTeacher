/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), tailwindcss()],
  build:
    mode === 'single'
      ? { outDir: 'dist-single', assetsInlineLimit: 100_000_000, cssCodeSplit: false }
      : { outDir: 'dist' },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    css: false,
  },
}))
