import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",

  
  plugins: [react(), sentryVitePlugin({
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