import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { articles, getArticle } from "@/lib/content/articles";
import { JsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl } from "@/lib/seo/site";

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
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `/articles/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author],
    },
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

  const articleUrl = absoluteUrl(`/articles/${article.slug}`);
  const date = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${article.date}T00:00:00Z`));

  return (
    <main className="article-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.date,
          dateModified: article.date,
          author: { "@type": "Organization", name: article.author },
          publisher: { "@type": "Organization", name: "Canadian Wealth Lab" },
          mainEntityOfPage: articleUrl,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/articles") },
            { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
          ],
        }}
      />

      <div className="container">
        <header className="article-header">
          <div className="article-meta">
            <span>{article.category}</span>
            <span>{article.readingTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p className="dek">{article.description}</p>
          <div className="article-byline">
            <span>By {article.author}</span>
            <span>{date}</span>
          </div>
        </header>

        <div className="article-layout">
          <aside className="article-toc" aria-label="On this page">
            <span>ON THIS PAGE</span>
            {article.sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>{section.title}</a>
            ))}
          </aside>
          <ArticleBody sections={article.sections} />
        </div>
        <p className="disclaimer">
          This article is educational and general in nature. It does not account
          for your complete financial situation and is not personalized
          financial, tax, legal, or investment advice.
        </p>
      </div>
    </main>
  );
}
