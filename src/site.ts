import data from "./data/main.json";

export interface Page {
  slug: string;
  title: string;
  content: string;
}
export interface Link {
  label: string;
  href: string;
}
export interface Program {
  name: string;
  desc: string;
}
export interface Pathway {
  num: string;
  glyph: string;
  title: string;
  blurb: string;
  programs: Program[];
  cta: Link;
}
export interface EventItem {
  date: string;
  name: string;
  sub: string;
  href: string;
}
export interface FooterCol {
  title: string;
  links: Link[];
}
export interface Home {
  hero: {
    eyebrow: string;
    headline: string;
    lede: string;
    primaryCta: Link;
    secondaryCta: Link;
    image: string;
    imageCaption: string;
    verticalLabel: string;
  };
  creed: string[];
  pathwaysIntro: { heading: string; note: string };
  pathways: Pathway[];
  nova: { eyebrow: string; title: string; body: string; address: string; cta: Link; image: string };
  conviction: { eyebrow: string; quote: string; source: string };
  eventsIntro: { heading: string; note: string };
  events: EventItem[];
  memorial: { kicker: string; name: string; years: string; body: string };
  give: { eyebrow: string; heading: string; body: string; primaryCta: Link; secondaryCta: Link };
  newsletter: { eyebrow: string; heading: string; body: string; placeholder: string; button: string };
  footer: { columns: FooterCol[]; legal: string; contactLine: string };
}

export interface SiteConfig {
  site: { name: string; tagline: string; description: string; url?: string; email: string };
  theme: { accent: string; mode: "light" | "dark" | "auto"; font: "sans" | "serif" | "mono" };
  nav: Link[];
  home: Home;
  pages: Page[];
  schema?: { type: string; extra?: Record<string, unknown> };
}

export const site: SiteConfig = data as SiteConfig;

export function getPage(slug: string): Page | undefined {
  const norm = slug.startsWith("/") ? slug : `/${slug}`;
  return site.pages.find((p) => p.slug === norm);
}

export function getNonHomePages(): Page[] {
  return site.pages.filter((p) => p.slug !== "/");
}

export function pathFromSlug(slug: string): string {
  return slug === "/" ? "" : slug.replace(/^\//, "");
}

/**
 * Editor-friendly emphasis. In main.json, wrap a word or phrase in *asterisks*
 * to render it in the garnet display-italic accent — e.g. "Starting & *strengthening*".
 * Everything else is HTML-escaped, so JSON copy stays plain text and safe.
 */
export function emph(input: string): string {
  const escaped = input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*([^*]+)\*/g, '<em class="hl">$1</em>');
}
