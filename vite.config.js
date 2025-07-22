import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
  coverage: {
    reporter: ['text', 'html'], // 'text' shows in terminal, 'html' generates report
    reportsDirectory: './coverage',
    exclude: [
      'node_modules/',
      'dist/',
      'test-utils/',
      '**/*.spec.{js,jsx,ts,tsx}',
    ],
  },
});
