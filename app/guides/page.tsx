import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles, getArticleUrl } from "@/lib/content/articles";
import { clusters } from "@/lib/content/clusters";

export const metadata: Metadata = {
  title: "Canadian personal finance guides",
  description:
    "Evidence-based Canadian guides for money management, tax strategy, investing, housing, and retirement decisions.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  const guides = articles.filter(
    (article) => article.cluster !== "start-here" && article.cluster !== "perspective",
  );

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="kicker">GUIDES</span>
          <h1>Evidence for consequential financial decisions.</h1>
          <p>
            Start with mechanics, test the variables that change the answer,
            and use the source notes to verify time-sensitive rules.
          </p>
        </div>
      </section>
      <section className="cluster-directory" aria-labelledby="guide-clusters">
        <div className="container">
          <span className="kicker">EXPLORE BY TOPIC</span>
          <h2 id="guide-clusters">Five Canadian finance research clusters</h2>
          <div className="cluster-directory-grid">
            {clusters.map((cluster) => (
              <Link href={`/${cluster.slug}`} key={cluster.slug}>
                <strong>{cluster.name}</strong>
                <span>{cluster.description}</span>
                <small>Explore Guides <ArrowRight size={14} /></small>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="listing-section">
        <div className="container listing-grid">
          {guides.map((article) => (
            <article className="listing-card" key={article.slug}>
              <Link href={getArticleUrl(article)}>
                <div className="article-meta">
                  <span>{article.contentType}</span>
                  <span>{article.readingTime}</span>
                </div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <span className="read-link">Read {article.contentType} <ArrowRight size={15} /></span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
