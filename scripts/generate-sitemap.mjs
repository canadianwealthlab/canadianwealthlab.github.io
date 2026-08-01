import { readdir, readFile, writeFile } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const contentDirectory = new URL("../content/articles/", import.meta.url);
const outputFile = new URL("../public/sitemap.xml", import.meta.url);
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://canadianwealthlab.github.io").replace(/\/$/, "");
const reviewedDate = "2026-08-01";

const staticPaths = [
  "/",
  "/start-here/",
  "/guides/",
  "/perspective/",
  "/money-management/",
  "/taxes/",
  "/investing/",
  "/housing/",
  "/retirement/",
  "/calculators/",
  "/calculators/mortgage-prepayment/",
  "/calculators/rent-vs-buy/",
  "/calculators/tfsa-vs-rrsp/",
  "/calculators/fire/",
  "/guided/",
  "/guided/next-dollar/",
  "/guided/retirement-readiness/",
  "/guided/mortgage-vs-invest/",
  "/guided/registered-accounts/",
  "/guided/home-readiness/",
  "/guided/debt-plan/",
  "/about/",
  "/about/why-cwl-exists/",
  "/about/editorial-standards/",
  "/about/research-methodology/",
  "/about/sources-and-corrections/",
  "/authors/canadian-wealth-lab/",
  "/disclaimer/",
  "/privacy/",
  "/terms/",
];

function field(source, name) {
  return source.match(new RegExp(`^${name}:\\s*["']?([^"'\\n]+)`, "m"))?.[1]?.trim();
}

const articlePaths = [];
for (const filename of await readdir(contentDirectory)) {
  if (!filename.endsWith(".mdx")) continue;
  const source = await readFile(new URL(filename, contentDirectory), "utf8");
  const slug = field(source, "slug");
  const cluster = field(source, "cluster");
  const lastmod = field(source, "reviewedDate") || field(source, "date") || reviewedDate;
  if (!slug || !cluster) throw new Error(`Missing route frontmatter in ${filename}`);
  articlePaths.push({ path: `/${cluster}/${slug}/`, lastmod });
}

const entries = [
  ...staticPaths.map((path) => ({ path, lastmod: reviewedDate })),
  ...articlePaths,
].sort((left, right) => left.path.localeCompare(right.path));

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map(({ path, lastmod }) => `  <url><loc>${siteUrl}${path}</loc><lastmod>${lastmod}</lastmod></url>`),
  "</urlset>",
  "",
].join("\n");

await writeFile(outputFile, xml, "utf8");
console.log(`Generated sitemap with ${entries.length} URLs from ${projectRoot.pathname}.`);
