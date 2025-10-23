import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vitest
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      lines: 40, // cobertura mínima exigida
    },
  },
})
