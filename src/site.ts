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
export interface ProgramItem {
  name: string;
  body: string;
  cta: CTA;
}
export interface Row {
  title: string;
  body: string;
  cta: CTA;
  image: string;
}
export interface Home {
  announce: { text: string; languages: string[] };
  hero: { eyebrow: string; headline: string; sub: string; image: string; imageCaption: string };
  howWeHelp: { heading: string; body: string; cta: CTA; video: { label: string; image: string; href: string } };
  programs: { lead: string; heading: string; image: string; items: ProgramItem[] };
  nova: { eyebrow: string; heading: string; body: string; cta: CTA; image: string; logoImage?: string; logoTop: string; logoBottom: string; logoCaption: string };
  belief: { heading: string };
  rows: Row[];
  whoWeAre: { heading: string; body: string; cta: CTA; image: string };
  memorial: { name: string; years: string; body: string; cta: CTA; image: string };
  footer: {
    newsletterHeading: string;
    newsletterButton: string;
    getInTouchTitle: string;
    addressLines: string[];
    legal: string;
    copyright: string;
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
 * Editor-friendly emphasis. In copy, wrap a word or phrase in *asterisks* to mark it
 * for the red accent. Each section styles `.hl` its own way — the hero word is plain
 * red, "How we help." and "your" get a hand-drawn circle, and the Nova / belief
 * headings get a red underline. Everything else is HTML-escaped, so JSON copy stays
 * plain text and safe.
 */
export function emph(input: string): string {
  const escaped = input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*([^*]+)\*/g, '<em class="hl">$1</em>');
}
