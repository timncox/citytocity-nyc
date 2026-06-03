# City to City NYC — weft site

An AI-discoverable Astro site for **City to City NYC** (a ministry of Redeemer City to City).
Originally scaffolded from the weft `default` template, then given a custom
**"Sacred Modern editorial"** design (warm paper, deep garnet accent, Fraunces +
Hanken Grotesk). The design lives in components + `src/styles/global.css`; **all
editable copy lives in `src/data/main.json`.**

## Editing rules (when AI is editing this site)

For ~95% of changes — headlines, program names/descriptions, events, addresses,
CTAs, footer links, the newsletter and giving copy — edit ONLY `src/data/main.json`.
The components read every string from that file, so content edits flow through
automatically and the design is preserved.

Touch `.astro` components or `global.css` only when the user explicitly asks for a
**structural or visual** change the data model can't express (a new section type,
a layout change, a color/typography change).

### The `*emphasis*` convention
In headlines and headings, wrap a word or phrase in `*asterisks*` to render it in the
garnet display-italic accent — e.g. `"Starting & *strengthening* churches…"` or
`"Nova *Omnia*"`. Move the asterisks to move the emphasis. Applies to:
`home.hero.headline`, `home.pathwaysIntro.heading`, `home.pathways[].title`,
`home.nova.title`, `home.conviction.quote`, `home.eventsIntro.heading`,
`home.give.heading`. (Implemented by `emph()` in `src/site.ts`.)

### Placeholders to replace before launch
- **Photography** — `home.hero.image` and `home.nova.image` are Unsplash placeholders.
  Swap for City to City NYC's own photos (drop files in `public/media/` and point the
  field at e.g. `/media/hero.jpg`).
- **Event dates** — `home.events[]` dates are illustrative; confirm against the real calendar.
- **Giving link** — `home.give.primaryCta.href` is `#give`; point it at the real donation URL.
- **Newsletter** — the form currently does a `mailto:`; wire to a real provider when chosen.

## Content model (`src/data/main.json` — the canonical content file)

```jsonc
{
  "site":  { "name", "tagline", "description", "url"?, "email" },
  "theme": { "accent" (#hex — the single brand color), "mode", "font" },
  "nav":   [ { "label", "href" } ],            // top navigation
  "home": {
    "hero":        { "eyebrow", "headline", "lede", "primaryCta":{label,href},
                     "secondaryCta":{label,href}, "image", "imageCaption", "verticalLabel" },
    "creed":       [ "scrolling phrase", ... ],  // the marquee band under the hero
    "pathwaysIntro": { "heading", "note" },
    "pathways":    [ { "num", "glyph", "title", "blurb",
                       "programs":[{name,desc}], "cta":{label,href} } ],
    "nova":        { "eyebrow", "title", "body", "address", "cta":{label,href}, "image" },
    "conviction":  { "eyebrow", "quote", "source" },
    "eventsIntro": { "heading", "note" },
    "events":      [ { "date", "name", "sub", "href" } ],
    "memorial":    { "kicker", "name", "years", "body" },
    "give":        { "eyebrow", "heading", "body", "primaryCta", "secondaryCta" },
    "newsletter":  { "eyebrow", "heading", "body", "placeholder", "button" },
    "footer":      { "columns":[{title,links:[{label,href}]}], "legal", "contactLine" }
  },
  "pages": [ { "slug", "title", "content" (markdown) } ],  // home summary + sub-pages
  "schema": { "type" (Schema.org type), "extra"? }
}
```

- `pages[0]` MUST have `slug:"/"` — its `content` is the SEO/`llms.txt` summary of the
  homepage (the visible homepage is rendered from `home`, not from this markdown).
- Other `pages[]` (`/programs`, `/nova-omnia`, `/about`, `/contact`) are full markdown
  sub-pages, rendered via `marked` in the branded `.prose` shell.
- `theme.accent` drives `--accent` (and thus the garnet `--garnet`) everywhere.

## File map

```
src/
  data/main.json           # the contract — edit this for content
  site.ts                  # typed wrapper + emph() emphasis helper
  styles/global.css        # the full design system
  layouts/Base.astro       # <head>, fonts, JSON-LD, OG, reveal script, <slot/>
  components/               # Header, Hero, Pathways, Nova, Conviction, Events, Memorial, Footer
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
- Semantic HTML5, zero-JS except a tiny scroll-reveal observer

## Don't

- Don't add a JS framework or CSS framework — the design is hand-written vanilla CSS.
- Don't invent facts. If a fact isn't supplied, leave a `[placeholder]` and note it.
- Don't move editable copy out of `main.json` into components.
