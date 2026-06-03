# Site built with weft

This site is managed by [weft](https://github.com/) — an AI-driven website builder.

You can keep editing it through chat, or work on it directly:

```bash
npm install
npm run dev
```

## Content

All canonical content lives in `src/content/site/main.json`. Edit that file (or ask the AI to) and Vercel will redeploy.

## AI-optimized

Every page emits Schema.org JSON-LD, the site exposes `/llms.txt` and `/api/site.json` (machine-readable mirror), and `/sitemap-index.xml` is generated automatically.
