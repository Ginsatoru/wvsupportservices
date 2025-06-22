import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});


// ==== NGROK ====


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// export default defineConfig({
//   server: {
//     host: true,
//     port: 5173,
//     strictPort: true,
//     cors: true,
//     hmr: {
//       clientPort: 443, // required for HTTPS via Ngrok
//     },
//     origin: 'http://localhost:5173', // still fine for local
//     allowedHosts: ['.ngrok-free.app', 'localhost'], // 💥 works with any ngrok domain & local
//   },
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// })
