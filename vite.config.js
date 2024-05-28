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
    publicDir: 'public' ,// Ensure this line is included
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