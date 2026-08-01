/// <reference types="vite/client" />
import {
  articleSourcesBySlug,
  defaultSourcesBySection,
  type ArticleSource,
} from "@/lib/content/article-sources";
import {
  communityDiscussionsBySlug,
  type CommunityDiscussion,
} from "@/lib/content/community-discussions";
import type { ClusterSlug } from "@/lib/content/clusters";

export type ArticleSection = {
  title: string;
  id: string;
  blocks: Array<
    | { type: "paragraph"; value: string }
    | { type: "subheading"; value: string }
    | { type: "list"; values: string[] }
    | { type: "ordered-list"; values: string[] }
    | { type: "callout"; value: string }
  >;
};

export type ArticleType = "Guide" | "Decision Guide" | "CWL Perspective";
export type ArticleSectionSlug = ClusterSlug | "start-here" | "perspective";

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  cluster: ArticleSectionSlug;
  contentType: ArticleType;
  whoFor: string;
  date: string;
  reviewedDate: string;
  author: string;
  readingTime: string;
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
  sources: ArticleSource[];
  communityDiscussions: CommunityDiscussion[];
};

const articleModules = import.meta.glob("../../content/articles/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const sources = Object.entries(articleModules)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([, source]) => source);

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
  let orderedList: string[] = [];

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
  const flushOrderedList = () => {
    if (current && orderedList.length) {
      current.blocks.push({ type: "ordered-list", values: orderedList });
      orderedList = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      flushOrderedList();
      const title = line.slice(3).trim();
      current = { title, id: slugify(title), blocks: [] };
      sections.push(current);
      continue;
    }
    if (!current) continue;
    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      flushOrderedList();
      current.blocks.push({ type: "subheading", value: line.slice(4).trim() });
      continue;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      flushOrderedList();
      list.push(line.slice(2).trim());
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      flushParagraph();
      flushList();
      orderedList.push(line.replace(/^\d+\.\s+/, "").trim());
      continue;
    }
    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      flushOrderedList();
      current.blocks.push({ type: "callout", value: line.slice(2).trim() });
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushOrderedList();
      continue;
    }
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushOrderedList();
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
    cluster: String(data.cluster) as ArticleSectionSlug,
    contentType: String(data.contentType || "Guide") as ArticleType,
    whoFor: String(data.whoFor || "Canadians researching this financial decision."),
    date: String(data.date),
    reviewedDate: String(data.reviewedDate || data.date),
    author: String(data.author),
    readingTime: String(data.readingTime),
    sections,
    faqs,
    sources:
      articleSourcesBySlug[slug] ||
      defaultSourcesBySection[String(data.cluster)] ||
      [],
    communityDiscussions: communityDiscussionsBySlug[slug] || [],
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

export function getSectionArticles(section: ArticleSectionSlug) {
  return articles.filter((article) => article.cluster === section);
}
