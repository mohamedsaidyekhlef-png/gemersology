import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Increase the warning limit to reduce log noise
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // Use function-based chunking which is safer for this environment
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split ECharts as it is the heaviest dependency
            if (id.includes('echarts')) {
              return 'echarts';
            }
            // Split Markdown processing
            if (id.includes('react-markdown') || id.includes('remark-gfm')) {
              return 'markdown';
            }
            // Group everything else into a single vendor file to avoid 
            // too many small file requests which can also cause timeouts
            return 'vendor';
          }
        },
      },
    },
  },
});
