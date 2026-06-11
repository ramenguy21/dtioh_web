// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Canonical site URL — used for sitemap, canonical links, and OG/JSON-LD URLs.
// Override per-environment with the PUBLIC_SITE_URL env var if needed.
const site = process.env.PUBLIC_SITE_URL ?? 'https://dtioh.com';

export default defineConfig({
  site,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
