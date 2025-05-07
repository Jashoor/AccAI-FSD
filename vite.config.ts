import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/Jashoor/AccAI-FSD.git',  // Replace with your actual GitHub repository name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
