import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

import tunnel from "astro-tunnel";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: true,
    site: 'https://a2k-nms.netlify.app'
  }), tunnel()],
  output: 'server',
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, set-cookie',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',

    }
  },
  adapter: netlify(),
  vite: {
    build: {
       rollupOptions: {
          output: {
             entryFileNames: '[name]-[hash].js',
          },
       },
    },
 },
});