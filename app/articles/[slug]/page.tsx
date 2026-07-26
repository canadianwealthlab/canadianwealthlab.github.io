import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, getArticleUrl } from "@/lib/content/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const destination = getArticleUrl(article);
  return {
    title: `This guide has moved: ${article.title}`,
    description: `Continue to the current version of ${article.title}.`,
    alternates: { canonical: destination },
    robots: { index: false, follow: true },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const destination = getArticleUrl(article);

  return (
    <main className="redirect-shell">
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
      <div className="container">
        <div className="redirect-card">
          <span className="kicker">GUIDE MOVED</span>
          <h1>{article.title}</h1>
          <p>This guide now lives in our {article.cluster} research cluster.</p>
          <Link className="button button-primary" href={destination}>
            Continue to the guide
          </Link>
        </div>
      </div>
    </main>
  );
}
