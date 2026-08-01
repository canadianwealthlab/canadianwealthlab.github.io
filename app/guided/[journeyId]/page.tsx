import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getJourney, guidedJourneys } from "@/lib/guided/journeys";
import { getStaticJourneyContent } from "@/lib/guided/static-content";
import type { GuidedSourceType } from "@/lib/guided/types";
import { JsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl } from "@/lib/seo/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return guidedJourneys.map((journey) => ({ journeyId: journey.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ journeyId: string }>;
}): Promise<Metadata> {
  const { journeyId } = await params;
  const journey = getJourney(journeyId);
  if (!journey) return {};

  return {
    title: `${journey.title} Guided decision framework`,
    description: journey.description,
    alternates: { canonical: `/guided/${journey.id}` },
    openGraph: {
      title: journey.title,
      description: journey.description,
      url: `/guided/${journey.id}`,
    },
  };
}

const sourceLabels: Record<GuidedSourceType, string> = {
  official: "Official Canadian guidance",
  educational: "Institution educational material",
  community: "Reddit community perspective",
};

export default async function GuidedJourneyPage({
  params,
}: {
  params: Promise<{ journeyId: string }>;
}) {
  const { journeyId } = await params;
  const journey = getJourney(journeyId);
  if (!journey) notFound();

  const content = getStaticJourneyContent(journey.id);

  return (
    <main className="guided-static-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: journey.title,
          description: journey.description,
          url: absoluteUrl(`/guided/${journey.id}`),
          isPartOf: absoluteUrl("/guided"),
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
              name: "Get Guided",
              item: absoluteUrl("/guided"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: journey.title,
              item: absoluteUrl(`/guided/${journey.id}`),
            },
          ],
        }}
      />

      <section className="guided-static-hero">
        <div className="container">
          <nav className="breadcrumb guided-static-breadcrumb" aria-label="Breadcrumb">
            <Link href="/guided">Get Guided</Link>
            <ChevronRight size={13} />
            <span aria-current="page">{journey.shortTitle}</span>
          </nav>
          <div className="guided-static-hero-grid">
            <div>
              <span className="kicker">GUIDED DECISION FRAMEWORK</span>
              <h1>{journey.title}</h1>
              <p>{journey.description}</p>
              <div className="guided-static-meta">
                <span>{journey.time}</span>
                <span>{journey.outcome}</span>
              </div>
            </div>
            <aside>
              <ShieldCheck size={20} />
              <strong>Personalized education, not advice</strong>
              <p>
                The interactive path processes responses only in your browser.
                This HTML page exposes the complete educational framework
                without requiring JavaScript.
              </p>
              <Link className="button button-primary" href={`/guided?start=${journey.id}`}>
                Start the interactive path <ArrowRight size={17} />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <div className="container guided-static-body">
        <section aria-labelledby="guided-static-questions">
          <div className="guided-section-heading">
            <span className="kicker">QUESTIONS IN THIS PATH</span>
            <h2 id="guided-static-questions">The context the experience considers</h2>
            <p>
              Each question appears progressively in the interactive version.
              Conditional questions are shown only when relevant.
            </p>
          </div>
          <div className="guided-static-question-list">
            {journey.steps.map((step, index) => (
              <article key={step.id}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{step.question}</h3>
                  <p>{step.helper}</p>
                  {(step.type === "choice" || step.type === "quiz") && (
                    <ul>
                      {step.options.map((option) => (
                        <li key={option.value}>
                          <strong>{option.label}</strong>
                          <span>{option.description}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {step.type === "range" && (
                    <small>
                      Range: {step.prefix}{step.min}{step.suffix} to{" "}
                      {step.prefix}{step.max}{step.suffix}
                    </small>
                  )}
                  {step.type === "money" && (
                    <small>Input type: Canadian-dollar planning amount</small>
                  )}
                  {step.type === "checkpoint" && (
                    <ul>{step.body.map((item) => <li key={item}>{item}</li>)}</ul>
                  )}
                  {step.type === "debt-list" && (
                    <small>Input type: up to {step.maxItems} debts with balance, rate, required payment, security, rate type, and status</small>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="guided-static-outcomes">
          <div className="guided-section-heading">
            <span className="kicker">POSSIBLE EDUCATIONAL SIGNALS</span>
            <h2 id="guided-static-outcomes">How different contexts change the path</h2>
            <p>
              These are the same outcome frameworks used by the interactive
              experience. Your inputs determine which one appears.
            </p>
          </div>
          <div className="guided-static-outcome-grid">
            {content.outcomes.map((outcome, index) => (
              <article key={`${outcome.signal}-${index}`}>
                <span>{outcome.signal}</span>
                <h3>{outcome.headline}</h3>
                <p>{outcome.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="guided-result-grid" aria-labelledby="guided-static-concepts">
          <div>
            <div className="guided-section-heading">
              <span className="kicker">KEY CONCEPTS</span>
              <h2 id="guided-static-concepts">What to understand</h2>
            </div>
            <div className="guided-concept-list">
              {content.concepts.map((concept, index) => (
                <article key={concept.title}>
                  <span>0{index + 1}</span>
                  <div><h3>{concept.title}</h3><p>{concept.body}</p></div>
                </article>
              ))}
            </div>
          </div>
          <div>
            <div className="guided-section-heading">
              <span className="kicker">TRADEOFFS</span>
              <h2>What changes with the path</h2>
            </div>
            <div className="guided-tradeoff-list">
              {content.tradeoffs.map((tradeoff) => (
                <article key={tradeoff.title}>
                  <Scale size={19} />
                  <div><h3>{tradeoff.title}</h3><p>{tradeoff.body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="guided-next-steps" aria-labelledby="guided-static-next">
          <div className="guided-section-heading">
            <span className="kicker">PRACTICAL NEXT STEPS</span>
            <h2 id="guided-static-next">Move from signal to verification</h2>
          </div>
          <ol>{content.nextSteps.map((step) => <li key={step}>{step}</li>)}</ol>
        </section>

        <section aria-labelledby="guided-static-resources">
          <div className="guided-section-heading">
            <span className="kicker">KEEP EXPLORING</span>
            <h2 id="guided-static-resources">Guides and tools for the next layer</h2>
          </div>
          <div className="guided-resource-grid">
            {content.articles.map((article) => (
              <Link href={article.href} key={article.slug}>
                <BookOpen size={19} />
                <span><small>Guide</small><strong>{article.title}</strong></span>
                <ArrowRight size={17} />
              </Link>
            ))}
            {content.calculators.map((calculator) => (
              <Link href={calculator.href} key={calculator.slug}>
                <Calculator size={19} />
                <span><small>Calculator</small><strong>{calculator.title}</strong></span>
                <ArrowRight size={17} />
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="guided-static-sources">
          <div className="guided-section-heading">
            <span className="kicker">SOURCES AND PERSPECTIVES</span>
            <h2 id="guided-static-sources">Inspect the basis for this framework</h2>
          </div>
          <div className="guided-source-groups">
            {(["official", "educational", "community"] as GuidedSourceType[]).map(
              (type) => {
                const sources = content.sources.filter(
                  (source) => source.type === type,
                );
                if (!sources.length) return null;
                return (
                  <div className="guided-source-group" key={type}>
                    <header>
                      <CircleHelp size={19} />
                      <div><h3>{sourceLabels[type]}</h3></div>
                    </header>
                    <ul>
                      {sources.map((source) => (
                        <li key={source.id}>
                          <a href={source.url} rel="noreferrer" target="_blank">
                            <span>
                              <small>{source.publisher}</small>
                              <strong>{source.title}</strong>
                              <p>{source.context}</p>
                              <small>{source.jurisdiction} · Reviewed {source.reviewed}{source.effectiveDate ? ` · Effective ${source.effectiveDate}` : ""}</small>
                            </span>
                            <ExternalLink size={16} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              },
            )}
          </div>
        </section>

        <section className="guided-assumptions" aria-labelledby="guided-static-limitations">
          <div>
            <CircleHelp size={19} />
            <h2 id="guided-static-limitations">Assumptions and limitations</h2>
          </div>
          <ul>{content.assumptions.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <div className="guided-final-actions">
          <Link className="button button-primary" href={`/guided?start=${journey.id}`}>
            Start this path <ArrowRight size={17} />
          </Link>
          <Link className="button button-secondary" href="/guided">
            <ArrowLeft size={17} /> View all guided paths
          </Link>
          <Link className="button button-secondary" href="/guides">
            Browse all guides <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}
