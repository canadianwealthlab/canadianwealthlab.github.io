import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { getArticle, getArticleUrl, getSectionArticles } from "@/lib/content/articles";

export const dynamicParams = false;
export function generateStaticParams() {
  return getSectionArticles("perspective").map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || article.cluster !== "perspective") return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: getArticleUrl(article) },
  };
}
export default async function PerspectiveArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || article.cluster !== "perspective") notFound();
  return <ArticlePage article={article} />;
}
