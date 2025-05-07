import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AccAI-FSD/',  // Replace with your actual GitHub repository name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
