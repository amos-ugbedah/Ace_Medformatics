import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build optimization
  build: {
    rollupOptions: {
      output: {
        // Add content hash for cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        
        // Manual chunks for better caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons': ['react-icons'],
          'vendor-utils': ['@supabase/supabase-js'],
        }
      }
    },
    
    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    },
    
    // Source maps for debugging
    sourcemap: true,
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  
  // Server configuration
  server: {
    port: 3000,
    open: true, // Open browser automatically
    headers: {
      'Cache-Control': 'no-store',
    }
  },
  
  // Preview server (for production preview)
  preview: {
    port: 3001,
    headers: {
      'Cache-Control': 'no-store',
    }
  },
  
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.1'),
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': '/src', // Optional: alias for src directory
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react'], // Exclude if causing issues
  }
})