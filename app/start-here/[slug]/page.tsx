import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { getArticle, getArticleUrl, getSectionArticles } from "@/lib/content/articles";

export const dynamicParams = false;
export function generateStaticParams() {
  return getSectionArticles("start-here").map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || article.cluster !== "start-here") return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: getArticleUrl(article) },
  };
}
export default async function StartHereArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || article.cluster !== "start-here") notFound();
  return <ArticlePage article={article} />;
}
