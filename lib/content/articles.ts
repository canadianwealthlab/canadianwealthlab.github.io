import tfsaVsRrspSource from "@/content/articles/tfsa-vs-rrsp.mdx?raw";
import mortgageOrInvestSource from "@/content/articles/pay-off-mortgage-or-invest.mdx?raw";
import veqtVsXeqtSource from "@/content/articles/veqt-vs-xeqt.mdx?raw";
import retirementSource from "@/content/articles/how-much-to-retire.mdx?raw";
import rentVsBuySource from "@/content/articles/rent-vs-buy.mdx?raw";
import { articleSourcesBySlug, type ArticleSource } from "@/lib/content/article-sources";
import type { ClusterSlug } from "@/lib/content/clusters";

export type ArticleSection = {
  title: string;
  id: string;
  blocks: Array<
    | { type: "paragraph"; value: string }
    | { type: "subheading"; value: string }
    | { type: "list"; values: string[] }
  >;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  cluster: ClusterSlug;
  date: string;
  reviewedDate: string;
  author: string;
  readingTime: string;
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
  sources: ArticleSource[];
};

const sources = [
  tfsaVsRrspSource,
  mortgageOrInvestSource,
  veqtVsXeqtSource,
  retirementSource,
  rentVsBuySource,
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseSections(content: string): ArticleSection[] {
  const lines = content.trim().split(/\r?\n/);
  const sections: ArticleSection[] = [];
  let current: ArticleSection | null = null;
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (current && paragraph.length) {
      current.blocks.push({ type: "paragraph", value: paragraph.join(" ") });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (current && list.length) {
      current.blocks.push({ type: "list", values: list });
      list = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      const title = line.slice(3).trim();
      current = { title, id: slugify(title), blocks: [] };
      sections.push(current);
      continue;
    }
    if (!current) continue;
    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      current.blocks.push({ type: "subheading", value: line.slice(4).trim() });
      continue;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2).trim());
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  return sections;
}

function parseArticle(source: string): Article {
  const normalized = source.replace(/\r\n/g, "\n");
  const frontmatterEnd = normalized.indexOf("\n---", 4);
  const frontmatter = normalized.slice(4, frontmatterEnd).trim();
  const content = normalized.slice(frontmatterEnd + 4).trim();
  const data = Object.fromEntries(
    frontmatter.split("\n").map((line) => {
      const separator = line.indexOf(":");
      const key = line.slice(0, separator).trim();
      const value = line
        .slice(separator + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
      return [key, value];
    }),
  );
  const sections = parseSections(content);
  const faqSection = sections.find((section) => section.title === "FAQ");
  const faqs: Article["faqs"] = [];

  if (faqSection) {
    let question = "";
    for (const block of faqSection.blocks) {
      if (block.type === "subheading") {
        question = block.value;
      } else if (block.type === "paragraph" && question) {
        faqs.push({ question, answer: block.value });
        question = "";
      }
    }
  }

  const slug = String(data.slug);

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    category: String(data.category),
    cluster: String(data.cluster) as ClusterSlug,
    date: String(data.date),
    reviewedDate: String(data.reviewedDate || data.date),
    author: String(data.author),
    readingTime: String(data.readingTime),
    sections,
    faqs,
    sources: articleSourcesBySlug[slug] || [],
  };
}

export const articles = sources.map(parseArticle);

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleUrl(article: Pick<Article, "cluster" | "slug">) {
  return `/${article.cluster}/${article.slug}`;
}

export function getClusterArticles(cluster: ClusterSlug) {
  return articles.filter((article) => article.cluster === cluster);
}
