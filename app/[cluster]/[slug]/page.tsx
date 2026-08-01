import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import {
  articles,
  getArticle,
  getArticleUrl,
} from "@/lib/content/articles";
import { getCluster } from "@/lib/content/clusters";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles
    .filter((article) => getCluster(article.cluster))
    .map((article) => ({
      cluster: article.cluster,
      slug: article.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}): Promise<Metadata> {
  const { cluster, slug } = await params;
  const article = getArticle(slug);
  if (!article || article.cluster !== cluster) return {};

  const path = getArticleUrl(article);
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: path,
      publishedTime: article.date,
      modifiedTime: article.reviewedDate,
      authors: [article.author],
    },
  };
}

export default async function ClusterArticlePage({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}) {
  const { cluster: clusterSlug, slug } = await params;
  const cluster = getCluster(clusterSlug);
  const article = getArticle(slug);

  if (!cluster || !article || article.cluster !== cluster.slug) notFound();
  return <ArticlePage article={article} />;
}
