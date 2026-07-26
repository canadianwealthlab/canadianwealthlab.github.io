import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/lib/content/articles";

export const metadata: Metadata = {
  title: "Canadian personal finance guides",
  description:
    "Practical, balanced guides to the financial decisions Canadians face—from registered accounts to housing and retirement.",
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
            households—without predictions, product pushing, or unnecessary jargon.
          </p>
        </div>
      </section>
      <section className="listing-section">
        <div className="container listing-grid">
          {articles.map((article) => (
            <article className="listing-card" key={article.slug}>
              <Link href={`/articles/${article.slug}`}>
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
