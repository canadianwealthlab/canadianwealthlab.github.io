import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getArticleUrl, getSectionArticles } from "@/lib/content/articles";

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "Seven practical starting points for organizing your finances, buying a home, building wealth, and preparing for retirement in Canada.",
  alternates: { canonical: "/start-here" },
};

export default function StartHerePage() {
  const resources = getSectionArticles("start-here");
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="kicker">START HERE</span>
          <h1>Choose the next decision, not the perfect plan.</h1>
          <p>
            These resources move from financial organization to long-term
            planning. Begin with the question that is most consequential now.
          </p>
        </div>
      </section>
      <section className="listing-section">
        <div className="container listing-grid">
          {resources.map((article) => (
            <article className="listing-card" key={article.slug}>
              <Link href={getArticleUrl(article)}>
                <div className="article-meta">
                  <span>{article.contentType}</span>
                  <span>{article.readingTime}</span>
                </div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <span className="read-link">Start here <ArrowRight size={15} /></span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
