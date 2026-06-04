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
export interface CTA {
  label: string;
  href: string;
}
export interface Home {
  brand: { name: string; subtitle: string; collab: string };
  hero: {
    lines: { text: string; italic?: boolean }[];
    breadcrumb: Link[];
    lede: string;
  };
  statement: {
    index: string;
    kicker: string;
    big: string;
    metaLeft: { label: string; body: string };
    metaRight: { label: string; body: string };
  };
  pathways: { index: string; kicker: string; items: { num: string; title: string; desc: string; href: string }[] };
  quote: { kicker: string; text: string; source: string };
  nova: { index: string; kicker: string; title: string; body: string; address: string; cta: CTA; image: string };
  gallery: { index: string; kicker: string; heading: string; caption: string; images: string[] };
  memorial: { kicker: string; name: string; years: string; body: string };
  give: {
    cta: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
    blurb: string;
    columns: { title: string; links: Link[] }[];
    legal: string;
    contactLine: string;
  };
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
 * Editor-friendly emphasis. In headings, wrap a word or phrase in *asterisks* to set it
 * in the display italic — the roman/italic mix is the heart of this editorial look
 * (e.g. "Strengthen a *Church*", "Nova *Omnia*"). Everything else is HTML-escaped, so
 * JSON copy stays plain text and safe.
 */
export function emph(input: string): string {
  const escaped = input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*([^*]+)\*/g, '<em class="it">$1</em>');
}
