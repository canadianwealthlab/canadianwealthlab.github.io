import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getArticleUrl, getSectionArticles } from "@/lib/content/articles";

export const metadata: Metadata = {
  title: "CWL Perspective",
  description:
    "Restrained editorial perspectives on how Canadian Wealth Lab evaluates financial decisions.",
  alternates: { canonical: "/perspective" },
};

export default function PerspectivePage() {
  const perspectives = getSectionArticles("perspective");
  return (
    <main>
      <section className="page-hero perspective-hero">
        <div className="container page-hero-inner">
          <span className="kicker">CWL PERSPECTIVE</span>
          <h1>Judgment, separated from financial mechanics.</h1>
          <p>
            These essays explain CWL editorial principles. They are labelled
            separately so interpretation is never confused with an official rule.
          </p>
        </div>
      </section>
      <section className="listing-section">
        <div className="container listing-grid">
          {perspectives.map((article) => (
            <article className="listing-card perspective-card" key={article.slug}>
              <Link href={getArticleUrl(article)}>
                <div className="article-meta"><span>CWL Perspective</span><span>{article.readingTime}</span></div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <span className="read-link">Read Perspective <ArrowRight size={15} /></span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
