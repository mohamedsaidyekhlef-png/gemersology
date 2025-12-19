import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split heavy dependencies into separate chunks to prevent timeouts
            if (id.includes('echarts')) return 'echarts';
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('lucide')) return 'icons';
            if (id.includes('framer-motion')) return 'motion';
            
            // Group remaining small dependencies
            return 'vendor';
          }
        },
      },
    },
  },
});
