import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles, getArticleUrl } from "@/lib/content/articles";
import { clusters } from "@/lib/content/clusters";

export const metadata: Metadata = {
  title: "Canadian personal finance guides",
  description:
    "Practical, balanced guides to the financial decisions Canadians face, from registered accounts to housing and retirement.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="kicker">FINANCIAL GUIDES</span>
          <h1>Clear analysis. Better decisions.</h1>
          <p>
            Research-led explanations of the choices that shape Canadian
            households, without predictions, product pushing, or unnecessary jargon.
          </p>
        </div>
      </section>
      <section className="cluster-directory" aria-labelledby="cluster-directory-title">
        <div className="container">
          <span className="kicker">EXPLORE BY TOPIC</span>
          <h2 id="cluster-directory-title">Canadian finance research clusters</h2>
          <div className="cluster-directory-grid">
            {clusters.map((cluster) => (
              <Link href={`/${cluster.slug}`} key={cluster.slug}>
                <strong>{cluster.name}</strong>
                <span>{cluster.description}</span>
                <small>Explore topic <ArrowRight size={14} /></small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="listing-section">
        <div className="container listing-grid">
          {articles.map((article) => (
            <article className="listing-card" key={article.slug}>
              <Link href={getArticleUrl(article)}>
                <div className="article-meta">
                  <span>{article.category}</span>
                  <span>{article.readingTime}</span>
                </div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <span className="read-link">Read guide <ArrowRight size={15} /></span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
