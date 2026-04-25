import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://bambi-ui.felekoglu.dev",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});