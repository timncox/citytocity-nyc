# City to City NYC — weft site

An AI-discoverable Astro site for **City to City NYC** (a ministry of Redeemer City to City).
The homepage uses an **editorial / "museo"** design: monochrome on warm light gray with a
**Day / Night** dark mode, a faint square grid, a high-contrast Didone display
(**Bodoni Moda**) that mixes roman + italic caps, clean grotesque (**Hanken Grotesk**)
labels, and one sparing red accent reserved for Give / CTAs. The design lives in
components + `src/styles/global.css`; **all editable copy lives in `src/data/main.json`.**

## Editing rules (when AI is editing this site)

For ~95% of changes — the hero lines, the conviction statement, the two pathways, the
pull-quote, Nova, the gallery caption, the Keller memorial, footer/newsletter copy — edit
ONLY `src/data/main.json`. Components read every string from it, so content edits flow
through automatically and the design is preserved.

Touch `.astro` components or `global.css` only for **structural or visual** changes the
data model can't express.

### The `*emphasis*` convention
Wrap a word or phrase in `*asterisks*` to set it in the **display italic** — the
roman/italic mix is the heart of this look (e.g. `"Strengthen a *Church*"`,
`"Nova *Omnia*"`, `"the most *catalytic* way"`). Implemented by `emph()` in `src/site.ts`.
The hero is special: each line is its own object with an `italic` flag (the middle line is
italic, like the reference's mixed-case display).

### Day / Night
A working light/dark toggle lives in the header. It persists to `localStorage` (`ctc-theme`)
and falls back to the OS `prefers-color-scheme`. Colors are CSS variables swapped under
`html[data-theme="night"]` in `global.css` — no per-component theming needed.

### Placeholders to replace before launch
- **Photography** — `home.nova.image` and `home.gallery.images[]` use the org's real
  photos in `public/media/`, shown grayscale (color on hover). Swap/extend as desired.
- The dated bits from earlier versions are gone; confirm the gallery caption + any program
  details, and wire the real giving URL + newsletter provider (the footer form is a `mailto:`).

## Content model (`src/data/main.json` — the canonical content file)

```jsonc
{
  "site":  { "name", "tagline", "description", "url"?, "email" },
  "theme": { "accent" (#hex — the single red accent), "mode", "font" },
  "nav":   [ { "label", "href" } ],                  // header nav; a "Give" label renders in the accent
  "home": {
    "brand":     { "name", "subtitle", "collab" },   // header wordmark + collaborator line
    "hero":      { "lines":[ { "text", "italic"? } ], "breadcrumb":[ {label,href} ], "lede" },
    "statement": { "index", "kicker", "big", "metaLeft":{label,body}, "metaRight":{label,body} },
    "pathways":  { "index", "kicker", "items":[ { "num", "title", "desc", "href" } ] },
    "quote":     { "kicker", "text", "source" },     // giant pull-quote
    "nova":      { "index", "kicker", "title", "body", "address", "cta":{label,href}, "image" },
    "gallery":   { "index", "kicker", "heading", "caption", "images":[ ...paths ] },  // scattered grid
    "memorial":  { "kicker", "name", "years", "body" },
    "give":      { "cta", "newsletterPlaceholder", "newsletterButton", "blurb",
                   "columns":[ {title,links:[{label,href}]} ], "legal", "contactLine" }
  },
  "pages": [ { "slug", "title", "content" (markdown) } ],  // home summary + sub-pages
  "schema": { "type" (Schema.org type), "extra"? }
}
```

- `pages[0]` MUST have `slug:"/"` — its `content` is the SEO/`llms.txt` summary (the visible
  homepage renders from `home`, not this markdown).
- Other `pages[]` are full markdown sub-pages, rendered in the branded `.prose` shell.
- `theme.accent` is the single red used for Give / CTAs (kept sparing by design).

## File map

```
src/
  data/main.json           # the contract — edit this for content
  site.ts                  # typed wrapper + emph() (display-italic) helper
  styles/global.css        # the full design system + day/night variables
  layouts/Base.astro       # <head>, fonts, no-FOUC theme script, JSON-LD, OG, favicon, <main>, skip link
  components/               # Header, Hero, Statement, Pathways, Quote, Nova, Gallery, Memorial, Footer
  pages/
    index.astro            # homepage — composes the components from `home`
    [...slug].astro        # renders each non-home page's markdown
    404.astro
    llms.txt.ts            # /llms.txt (absolute URLs + contact)
    api/site.json.ts       # /api/site.json (full content mirror, incl. `home`)
public/
  media/                   # logo, favicon, real photos
  favicon.ico
```

## Accessibility + SEO (keep these intact)

- WCAG 2.1 AA: verified 0 axe violations in **both** day and night; `<main>` landmark,
  skip-link, `:focus-visible`, labelled newsletter inputs, `prefers-reduced-motion`.
- `site.url` drives absolute canonical / og:url / sitemap; robots.txt + llms.txt are absolute.
- Schema.org JSON-LD (`Organization` + address), OG/Twitter cards, sitemap, semantic HTML.

## Don't

- Don't add a JS framework or CSS framework — hand-written vanilla CSS.
- Don't invent facts. If a fact isn't supplied, leave a `[placeholder]` and note it.
- Don't move editable copy out of `main.json` into components.
