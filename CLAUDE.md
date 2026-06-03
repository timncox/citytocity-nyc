# City to City NYC — weft site

An AI-discoverable Astro site for **City to City NYC** (a ministry of Redeemer City to City).
The homepage is a faithful rebuild of the live citytocity.nyc design in the Redeemer
City to City NYC brand: light cool-gray ground, scarlet-red accent (`#EB1D2E`), bold
grotesque type (Archivo + Hanken Grotesk), a cross/plus-grid motif, rounded white cards,
dark-slate panels, a film-strip video block, and hand-drawn red circles/underlines. The
design lives in components + `src/styles/global.css`; **all editable copy lives in
`src/data/main.json`.**

## Editing rules (when AI is editing this site)

For ~95% of changes — headlines, the announcement bar, program copy, the Nova section,
the Start/Strengthen rows, the Keller memorial, footer/newsletter copy — edit ONLY
`src/data/main.json`. The components read every string from that file, so content edits
flow through automatically and the design is preserved.

Touch `.astro` components or `global.css` only when the user explicitly asks for a
**structural or visual** change the data model can't express.

### The `*emphasis*` convention
Wrap a word or phrase in `*asterisks*` to mark it for the red accent. Each section styles
it its own way (no need to specify which): the hero word is plain red; **"How we
\*help.\*"** and **"\*your\* journey"** get a hand-drawn red circle; the Nova heading
(`*Ministry*`, `*Movement*`) and the belief line (`*most catalytic way*`) get a red
underline; inline phrases in the rows go red. Implemented by `emph()` in `src/site.ts`.

### Placeholders to replace before launch
- **Photography** — every image (`home.hero.image`, `home.howWeHelp.video.image`,
  `home.programs.image`, `home.nova.image`, each `home.rows[].image`,
  `home.whoWeAre.image`, `home.memorial.image`) is an Unsplash placeholder. Swap for City
  to City NYC's own photos (drop files in `public/media/` and point the field at e.g.
  `/media/hero.jpg`).
- **Announcement bar** — `home.announce.text` ("Celebration Night, June 5th") is dated; update or clear it.
- **Video** — `home.howWeHelp.video.href` is `#`; point it at the real "Look at New York" video.
- **Links** — program / row / nav hrefs point at on-site anchors; wire real destinations and the giving URL.
- **Newsletter** — the footer form is a `mailto:`; wire to a real provider when chosen.

## Content model (`src/data/main.json` — the canonical content file)

```jsonc
{
  "site":  { "name", "tagline", "description", "url"?, "email" },
  "theme": { "accent" (#hex), "mode", "font" },
  "nav":   [ { "label", "href" } ],                         // top navigation; a "Give" label renders as the red button
  "home": {
    "announce":  { "text", "languages":[ ... ] },           // top bar
    "hero":      { "eyebrow", "headline", "sub", "image", "imageCaption" },
    "howWeHelp": { "heading", "body", "cta":{label,href},
                   "video":{ "label", "image", "href" } },  // film-strip video block
    "programs":  { "lead", "heading", "image",
                   "items":[ { "name", "body", "cta":{label,href} } ] },  // dark accordion
    "nova":      { "eyebrow", "heading", "body", "cta", "image",
                   "logoTop", "logoBottom", "logoCaption" },
    "belief":    { "heading" },                             // centered conviction line
    "rows":      [ { "title", "body", "cta":{label,href}, "image" } ],    // Start / Strengthen
    "whoWeAre":  { "heading", "body", "cta", "image" },     // photo-overlay band
    "memorial":  { "name", "years", "body", "cta", "image" },             // Keller, over aerial photo
    "footer":    { "newsletterHeading", "newsletterButton", "getInTouchTitle",
                   "addressLines":[ ... ], "legal", "copyright" }
  },
  "pages": [ { "slug", "title", "content" (markdown) } ],   // home summary + sub-pages
  "schema": { "type" (Schema.org type), "extra"? }
}
```

- `pages[0]` MUST have `slug:"/"` — its `content` is the SEO/`llms.txt` summary (the visible
  homepage is rendered from `home`, not this markdown).
- Other `pages[]` (`/programs`, `/nova-omnia`, `/about`, `/contact`) are full markdown
  sub-pages, rendered via `marked` in the branded `.prose` shell.
- `theme.accent` drives `--accent` (and thus `--red`) everywhere.

## File map

```
src/
  data/main.json           # the contract — edit this for content
  site.ts                  # typed wrapper + emph() emphasis helper
  styles/global.css        # the full design system
  layouts/Base.astro       # <head>, fonts, JSON-LD, OG, reveal script, <slot/>
  components/               # Header, Hero, HowWeHelp, Programs, Nova, Belief, WhoWeAre, Memorial, Footer
  pages/
    index.astro            # homepage — composes the components from `home`
    [...slug].astro        # renders each non-home page's markdown
    404.astro
    llms.txt.ts            # /llms.txt  (derived from site.pages)
    api/site.json.ts       # /api/site.json (full content mirror, incl. `home`)
public/
  media/                   # uploaded images live here
```

## What's already AI-optimized

- Schema.org JSON-LD (`Organization`) in the head, with postal address + email
- Open Graph + Twitter card tags (OG image = hero image)
- `/llms.txt` advertising pages + `/api/site.json`
- `/api/site.json` returning the full structured content (home sections included)
- Sitemap via `@astrojs/sitemap`; robots.txt allowing all + sitemap pointer
- Semantic HTML5; zero-JS except a tiny scroll-reveal observer (accordion uses native `<details>`)

## Don't

- Don't add a JS framework or CSS framework — the design is hand-written vanilla CSS.
- Don't invent facts. If a fact isn't supplied, leave a `[placeholder]` and note it.
- Don't move editable copy out of `main.json` into components.
