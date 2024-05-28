import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
// import reactRefresh from '@vitejs/plugin-react-refresh'
import { VitePWA } from "vite-plugin-pwa";


dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",


  plugins: [react(),VitePWA({
    devOptions: {
      enabled: true // For making sure that the PWA is testable from the Local dev environment
    },
    registerType: 'autoUpdate',
    manifest: {
      name: "Share toh karo",
      short_name: "Share toh karo",
      icons: [
        {
          "src": "/favicon.ico",
          "sizes": "64x64 32x32 24x24 16x16",
          "type": "image/x-icon",
          "purpose":"any maskable"

        },
        {
          "src": "/favicon-16x16.png",
          "type": "image/png",
          "sizes": "16x16",
          "purpose":"any maskable"
        },
        {
          "src": "/favicon-32x32.png",
          "type": "image/png",
          "sizes": "32x32",
          "purpose":"any maskable"

        },
        {
          "src": "/pwa-192x192.png",
          "type": "image/png",
          "sizes": "192x192",
          "purpose":"any maskable"

        },
        {
          "src": "/pwa-512x512.png",
          "type": "image/png",
          "sizes": "512x512",
          "purpose": "any maskable" // Icon format that ensures that your PWA icon looks great on all Android devices
        }
      ],
      theme_color: '#AAF',
    },
  }), 
    // reactRefresh(),
    sentryVitePlugin({
    org: "wd-s6",
    project: "file-sharing-sentry"
  })],

  server: {
    // host: 'localhost',
    port: 8100
  },

  build: {
    sourcemap: true
  }
})