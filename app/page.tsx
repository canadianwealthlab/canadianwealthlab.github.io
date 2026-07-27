import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  Car,
  ChartNoAxesCombined,
  CircleDollarSign,
  Compass,
  House,
  Landmark,
  Palmtree,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HeroMotion, Reveal } from "@/components/motion";
import { Newsletter } from "@/components/newsletter";
import { articles, getArticleUrl } from "@/lib/content/articles";
import { calculators } from "@/lib/calculators";
import { JsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Canadian personal finance calculators and guides",
  description:
    "Clear calculators and independent guides to help Canadians make better decisions about housing, investing, taxes, and retirement.",
  alternates: { canonical: "/" },
};

const decisions = [
  { name: "Housing", description: "Buy, rent, refinance, or pay it down.", icon: House, href: "/housing" },
  { name: "Investing", description: "Build a portfolio around your real goals.", icon: ChartNoAxesCombined, href: "/investing" },
  { name: "Money management", description: "Strengthen cash flow, savings, and debt decisions.", icon: CircleDollarSign, href: "/money-management" },
  { name: "Taxes", description: "Understand the mechanics behind the decision.", icon: ReceiptText, href: "/taxes" },
  { name: "Retirement", description: "Turn a future goal into a working plan.", icon: Palmtree, href: "/retirement" },
  { name: "Calculators", description: "Pressure-test the numbers before acting.", icon: Car, href: "/calculators" },
];

export default function Home() {
  const featuredArticles = articles.slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Canadian Wealth Lab",
          url: absoluteUrl("/"),
          description:
            "Data-driven calculators and guides for Canadians making important money decisions.",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Canadian Wealth Lab",
          url: absoluteUrl("/"),
          logo: absoluteUrl("/logo-north-star.svg"),
          sameAs: ["https://github.com/canadianwealthlab"],
          publishingPrinciples: absoluteUrl("/about/editorial-policy"),
        }}
      />

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <HeroMotion>
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Independent Canadian financial research
              </div>
              <h1>Make smarter money decisions in Canada.</h1>
              <p className="hero-copy">
                Data-driven calculators, guides, and tools to help Canadians
                build wealth with confidence.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/calculators">
                  Explore calculators <ArrowRight size={17} />
                </Link>
                <Link className="button button-secondary" href="/articles">
                  Read financial guides
                </Link>
              </div>
              <p className="trust-line">
                <ShieldCheck size={16} />
                Educational, transparent, and built for Canadian realities.
              </p>
            </HeroMotion>

            <Reveal className="hero-visual">
              <div className="signal-panel">
                <div className="signal-topline">
                  <span>DECISION SIGNAL</span>
                  <span className="signal-status">MODEL READY</span>
                </div>
                <div className="signal-question">
                  <span>Question 01</span>
                  <h2>Mortgage or invest?</h2>
                  <p>Compare the guaranteed return of debt repayment with a range of market outcomes.</p>
                </div>
                <div className="signal-chart" aria-hidden="true">
                  <span className="chart-line chart-line-one" />
                  <span className="chart-line chart-line-two" />
                  <i style={{ left: "14%", bottom: "22%" }} />
                  <i style={{ left: "45%", bottom: "42%" }} />
                  <i style={{ left: "77%", bottom: "68%" }} />
                </div>
                <div className="signal-legend">
                  <span><i className="legend-coral" /> Mortgage prepayment</span>
                  <span><i className="legend-sage" /> Investing range</span>
                </div>
              </div>
              <div className="floating-note">
                <BarChart3 size={18} />
                <span><strong>Numbers before narratives.</strong> Every model shows its assumptions.</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="home-guided-band" aria-labelledby="home-guided-title">
          <div className="container home-guided-grid">
            <span className="home-guided-icon" aria-hidden="true">
              <Compass size={23} />
            </span>
            <div>
              <span className="kicker">NEW: GET GUIDED</span>
              <h2 id="home-guided-title">Not sure where to start?</h2>
              <p>
                Answer a few focused questions and get an educational decision
                map with tradeoffs, next steps, and sources you can inspect.
              </p>
            </div>
            <Link className="button button-primary" href="/guided">
              Choose a guided path <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section className="section decision-section">
          <div className="container">
            <Reveal className="section-heading split-heading">
              <div>
                <span className="kicker">THE DECISIONS THAT MATTER</span>
                <h2>Start with the question on your mind.</h2>
              </div>
              <p>
                Practical frameworks for the choices that shape your financial
                life, not market noise or hot takes.
              </p>
            </Reveal>
            <div className="decision-grid">
              {decisions.map(({ name, description, icon: Icon, href }, index) => (
                <Reveal className="decision-item" key={name} delay={index * 0.04}>
                  <Link href={href}>
                    <span className="decision-icon"><Icon size={21} /></span>
                    <span>
                      <strong>{name}</strong>
                      <small>{description}</small>
                    </span>
                    <ArrowRight size={17} />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section calculators-feature">
          <div className="container">
            <Reveal className="section-heading split-heading">
              <div>
                <span className="kicker kicker-light">MODELS, NOT GUESSWORK</span>
                <h2>Put your numbers to work.</h2>
              </div>
              <p>
                Explore tradeoffs, test assumptions, and leave with a clearer
                next question.
              </p>
            </Reveal>
            <div className="calculator-list">
              {calculators.map((calculator, index) => (
                <Reveal className="calculator-row" key={calculator.slug} delay={index * 0.05}>
                  <Link href={`/calculators/${calculator.slug}`}>
                    <span className="calculator-index">0{index + 1}</span>
                    <span className="calculator-row-main">
                      <strong>{calculator.title}</strong>
                      <small>{calculator.shortDescription}</small>
                    </span>
                    <span className="calculator-arrow"><ArrowRight size={18} /></span>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="section-link">
              <Link href="/calculators">View all calculators <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section className="section latest-section">
          <div className="container">
            <Reveal className="section-heading split-heading">
              <div>
                <span className="kicker">FIELD NOTES</span>
                <h2>Clear thinking for complex decisions.</h2>
              </div>
              <Link className="text-link" href="/articles">Browse all guides <ArrowRight size={16} /></Link>
            </Reveal>
            <div className="article-grid">
              {featuredArticles.map((article, index) => (
                <Reveal className="article-card" key={article.slug} delay={index * 0.05}>
                  <Link href={getArticleUrl(article)}>
                    <div className="article-meta">
                      <span>{article.category}</span>
                      <span>{article.readingTime}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    <span className="read-link">Read guide <ArrowRight size={15} /></span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section why-section">
          <div className="container why-grid">
            <Reveal>
              <span className="kicker">WHY CANADIAN WEALTH LAB</span>
              <h2>A research mindset for your real life.</h2>
              <p className="why-lead">
                Financial decisions rarely have one perfect answer. We help you
                see the variables, understand the tradeoffs, and make a choice
                you can defend.
              </p>
            </Reveal>
            <div className="principles">
              {[
                { icon: Compass, title: "Independent analysis", copy: "No product sales quotas. No manufactured urgency." },
                { icon: Landmark, title: "Canadian by design", copy: "Accounts, taxes, housing, and terminology that fit this market." },
                { icon: Calculator, title: "Transparent models", copy: "Assumptions are visible, editable, and explained in plain language." },
                { icon: Sparkles, title: "Practical decision support", copy: "A clearer framework, not a prescriptive financial plan." },
              ].map(({ icon: Icon, title, copy }, index) => (
                <Reveal className="principle" key={title} delay={index * 0.04}>
                  <Icon size={21} />
                  <div><strong>{title}</strong><p>{copy}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
    </>
  );
}
