import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import { calculators } from "@/lib/calculators";
import {
  getArticleUrl,
  getClusterArticles,
} from "@/lib/content/articles";
import {
  clusterSlugs,
  getCluster,
} from "@/lib/content/clusters";
import { financialValues } from "@/lib/content/annual-values";
import { JsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl } from "@/lib/seo/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return clusterSlugs.map((cluster) => ({ cluster }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster: clusterSlug } = await params;
  const cluster = getCluster(clusterSlug);
  if (!cluster) return {};

  return {
    title: `${cluster.name} guides and calculators for Canadians`,
    description: cluster.description,
    alternates: { canonical: `/${cluster.slug}` },
    openGraph: {
      title: `${cluster.name} guides and calculators for Canadians`,
      description: cluster.description,
      url: `/${cluster.slug}`,
    },
  };
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ cluster: string }>;
}) {
  const { cluster: clusterSlug } = await params;
  const cluster = getCluster(clusterSlug);
  if (!cluster) return null;

  const clusterArticles = getClusterArticles(cluster.slug);
  const clusterCalculators = calculators.filter((calculator) =>
    cluster.calculatorSlugs.includes(calculator.slug),
  );

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${cluster.name} guides and calculators`,
          description: cluster.description,
          url: absoluteUrl(`/${cluster.slug}`),
          isPartOf: absoluteUrl("/"),
          hasPart: clusterArticles.map((article) =>
            absoluteUrl(getArticleUrl(article)),
          ),
        }}
      />
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
              name: cluster.name,
              item: absoluteUrl(`/${cluster.slug}`),
            },
          ],
        }}
      />

      <section className="cluster-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">{cluster.name}</span>
          </nav>
          <div className="cluster-hero-grid">
            <div>
              <span className="kicker">{cluster.name.toUpperCase()} LAB</span>
              <h1>{cluster.title}</h1>
            </div>
            <p>{cluster.introduction}</p>
          </div>
        </div>
      </section>

      <section className="section cluster-questions">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <span className="kicker">START WITH THE QUESTION</span>
              <h2>Decisions this research cluster covers.</h2>
            </div>
            <p>
              Every guide and calculator is designed to expose the variables,
              tradeoffs, and uncertainties behind a consequential choice.
            </p>
          </div>
          <div className="question-grid">
            {cluster.questions.map((question, index) => (
              <div className="question-card" key={question}>
                <span>0{index + 1}</span>
                <p>{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cluster-overview" aria-labelledby="cluster-overview-title">
        <div className="container cluster-overview-grid">
          <div>
            <span className="kicker">CLUSTER OVERVIEW</span>
            <h2 id="cluster-overview-title">How to use this research</h2>
          </div>
          <div className="cluster-overview-copy">
            {cluster.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <h3>Suggested reading path</h3>
            <ol>{cluster.readingPath.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </div>
      </section>

      {cluster.slug === "taxes" && (
        <section className="section annual-values" aria-labelledby="annual-values-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="kicker">{financialValues.taxYear} REFERENCE</span>
                <h2 id="annual-values-title">Current federal registered-account limits.</h2>
              </div>
              <p>
                General figures only. Personal contribution room and eligibility
                must be verified in CRA records and current program rules.
              </p>
            </div>
            <div className="annual-value-grid">
              <article><span>TFSA annual limit</span><strong>${financialValues.tfsaAnnualLimit.toLocaleString("en-CA")}</strong></article>
              <article><span>FHSA annual limit</span><strong>${financialValues.fhsaAnnualLimit.toLocaleString("en-CA")}</strong></article>
              <article><span>FHSA lifetime limit</span><strong>${financialValues.fhsaLifetimeLimit.toLocaleString("en-CA")}</strong></article>
              <article><span>HBP withdrawal limit</span><strong>${financialValues.hbpWithdrawalLimit.toLocaleString("en-CA")}</strong></article>
              <article><span>RRSP dollar limit</span><strong>${financialValues.rrspDollarLimit.toLocaleString("en-CA")}</strong></article>
            </div>
            <p className="annual-values-note">Reviewed {financialValues.reviewedDate}. Verify personal room before contributing.</p>
          </div>
        </section>
      )}

      {clusterArticles.length > 0 && (
        <section className="section cluster-guides">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="kicker">RESEARCH LIBRARY</span>
                <h2>{cluster.name} guides</h2>
              </div>
              <Link className="text-link" href="/guides">
                Browse all guides <ArrowRight size={16} />
              </Link>
            </div>
            <div className="listing-grid">
              {clusterArticles.map((article) => (
                <article className="listing-card" key={article.slug}>
                  <Link href={getArticleUrl(article)}>
                    <div className="article-meta">
                      <span>{article.category}</span>
                      <span>{article.readingTime}</span>
                    </div>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <span className="read-link">
                      Read guide <ArrowRight size={15} />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {clusterCalculators.length > 0 && (
        <section className="section cluster-tools">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="kicker kicker-light">TEST THE ASSUMPTIONS</span>
                <h2>Related calculators</h2>
              </div>
              <p>
                Use your own inputs to explore how changing one variable affects
                the result.
              </p>
            </div>
            <div className="cluster-tool-grid">
              {clusterCalculators.map((calculator) => (
                <Link
                  href={`/calculators/${calculator.slug}`}
                  key={calculator.slug}
                >
                  <Calculator size={24} aria-hidden="true" />
                  <strong>{calculator.title}</strong>
                  <p>{calculator.description}</p>
                  <span>
                    Open calculator <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section cluster-standards">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <span className="kicker">HOW WE APPROACH IT</span>
              <h2>Research principles for {cluster.name.toLowerCase()}.</h2>
            </div>
            <p>
              These standards shape the questions we ask, the assumptions we
              disclose, and the limits we place around each conclusion.
            </p>
          </div>
          <div className="principle-card-grid">
            {cluster.principles.map((principle) => (
              <article key={principle.title}>
                <CheckCircle2 size={21} aria-hidden="true" />
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
          <div className="cluster-policy-link">
            <Link href="/about/editorial-standards">
              Read our editorial standards <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
