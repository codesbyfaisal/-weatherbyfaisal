<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
>>>>>>> 7ddbcfb3ae28c98db954b822d64cce4a20350488

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
})
=======
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html', // Ensure this path is correct
    },
  },
});
>>>>>>> 7ddbcfb3ae28c98db954b822d64cce4a20350488
