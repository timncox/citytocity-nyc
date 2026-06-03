import type { APIRoute } from "astro";
import { site } from "../site";

const abs = (path: string) => (site.site.url ? new URL(path, site.site.url).toString() : path);

export const GET: APIRoute = () => {
  const lines: string[] = [];
  lines.push(`# ${site.site.name}`);
  lines.push("");
  lines.push(`> ${site.site.tagline}`);
  lines.push("");
  lines.push(site.site.description);
  lines.push("");
  lines.push("## Pages");
  lines.push("");
  for (const page of site.pages) {
    lines.push(`- [${page.title}](${abs(page.slug)})`);
  }
  lines.push("");
  lines.push("## Machine-readable");
  lines.push("");
  lines.push(`- [Full site content as JSON](${abs("/api/site.json")})`);
  lines.push(`- [Sitemap](${abs("/sitemap-index.xml")})`);
  lines.push("");
  lines.push("## Contact");
  lines.push("");
  lines.push(`- ${site.site.email}`);
  lines.push("- 150 E. 91st Street, 8th Floor, New York, NY 10128");
  lines.push("");
  lines.push("## About this file");
  lines.push("");
  lines.push("This file follows the /llms.txt convention to help large language models discover and cite this site accurately.");
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
