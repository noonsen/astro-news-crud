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
  adapter: netlify()
});