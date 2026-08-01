import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { ArticleBody } from "@/components/article-body";
import { CommunityPerspectives } from "@/components/community-perspectives";
import { calculators } from "@/lib/calculators";
import {
  articles,
  getArticleUrl,
  type Article,
} from "@/lib/content/articles";
import { getCluster } from "@/lib/content/clusters";
import { JsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl } from "@/lib/seo/site";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function ArticlePage({ article }: { article: Article }) {
  const cluster = getCluster(article.cluster);
  const section = cluster || {
    slug: article.cluster,
    name: article.cluster === "perspective" ? "Perspective" : "Start Here",
    calculatorSlugs: [] as string[],
  };

  const articlePath = getArticleUrl(article);
  const articleUrl = absoluteUrl(articlePath);
  const relatedArticles = articles
    .filter(
      (candidate) =>
        candidate.cluster === article.cluster && candidate.slug !== article.slug,
    )
    .slice(0, 2);
  const relatedCalculators = calculators.filter((calculator) =>
    section.calculatorSlugs.includes(calculator.slug),
  );

  return (
    <main className="article-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.date,
          dateModified: article.reviewedDate,
          author: {
            "@type": "Organization",
            name: article.author,
            url: absoluteUrl("/authors/canadian-wealth-lab"),
          },
          publisher: {
            "@type": "Organization",
            name: "Canadian Wealth Lab",
            url: absoluteUrl("/"),
          },
          citation: article.sources.map((source) => source.url),
          about: section.name,
          isPartOf: absoluteUrl(`/${section.slug}`),
          mainEntityOfPage: articleUrl,
        }}
      />
      {article.faqs.length > 0 && (
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
      )}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: section.name,
              item: absoluteUrl(`/${section.slug}`),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
              item: articleUrl,
            },
          ],
        }}
      />

      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/${section.slug}`}>{section.name}</Link>
          <span>/</span>
          <span aria-current="page">{article.title}</span>
        </nav>

        <header className="article-header">
          <div className="article-meta">
            <span className={`content-type content-type-${article.contentType.toLowerCase().replaceAll(" ", "-")}`}>
              {article.contentType}
            </span>
            <span>{article.readingTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p className="dek">{article.description}</p>
          <div className="article-byline">
            <span>
              By{" "}
              <Link href="/authors/canadian-wealth-lab">{article.author}</Link>
            </span>
            <span>Published {formatDate(article.date)}</span>
            <span>Reviewed {formatDate(article.reviewedDate)}</span>
          </div>
        </header>

        <div className="article-review-note">
          <CheckCircle2 size={20} aria-hidden="true" />
          <p>
            Reviewed against primary Canadian sources on{" "}
            {formatDate(article.reviewedDate)}. See our{" "}
            <Link href="/about/editorial-standards">Editorial Standards</Link> and{" "}
            <Link href="/about/research-methodology">Research Methodology</Link>.
          </p>
        </div>

        <aside className="article-audience">
          <strong>Who this is for</strong>
          <p>{article.whoFor}</p>
        </aside>

        <div className="article-layout">
          <aside className="article-toc" aria-label="On this page">
            <span>ON THIS PAGE</span>
            {article.sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>
                {section.title}
              </a>
            ))}
            {article.communityDiscussions.length > 0 && (
              <a href="#community-perspectives">Community perspectives</a>
            )}
            <a href="#primary-sources">Primary sources</a>
          </aside>
          <div>
            <ArticleBody sections={article.sections} />
            <CommunityPerspectives
              discussions={article.communityDiscussions}
            />

            <section
              className="article-sources"
              id="primary-sources"
              aria-labelledby="primary-sources-title"
            >
              <span className="kicker">SOURCE NOTES</span>
              <h2 id="primary-sources-title">Primary sources</h2>
              <p>
                We prioritize government guidance, official product documents,
                and original issuer information. Rules and product details can
                change; verify time-sensitive information before acting.
              </p>
              <ul>
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} rel="noreferrer" target="_blank">
                      <span>
                        <strong>{source.name}</strong>
                        <small>{source.publisher}</small>
                      </span>
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {(relatedArticles.length > 0 || relatedCalculators.length > 0) && (
          <section className="article-next" aria-labelledby="continue-title">
            <span className="kicker">CONTINUE THE DECISION</span>
            <h2 id="continue-title">Related guides and tools</h2>
            <div className="article-next-grid">
              {relatedCalculators.map((calculator) => (
                <Link
                  href={`/calculators/${calculator.slug}`}
                  key={calculator.slug}
                >
                  <small>Calculator</small>
                  <strong>{calculator.title}</strong>
                  <span>
                    Test your assumptions <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
              {relatedArticles.map((related) => (
                <Link href={getArticleUrl(related)} key={related.slug}>
                  <small>{related.contentType}</small>
                  <strong>{related.title}</strong>
                  <span>
                    Read the guide <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="disclaimer">
          This article is educational and general in nature. It does not account
          for your complete financial situation and is not personalized
          financial, tax, legal, mortgage, or investment advice. Verify current
          rules and consider qualified professional advice where appropriate.
        </p>
      </div>
    </main>
  );
}
