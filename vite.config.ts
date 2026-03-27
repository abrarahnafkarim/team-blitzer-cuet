import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Deduplicate motion libraries — route "motion" imports to framer-motion
      "motion/react": "framer-motion",
      "motion": "framer-motion",
    },
  },
  build: {
    // Optimize build performance
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-scroll-area'],
          motion: ['framer-motion'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    // Pre-bundle dependencies for faster dev startup
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'react-router-dom',
      '@tanstack/react-query',
      'react-helmet-async',
    ],
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: mode === 'development',
  },
}));
