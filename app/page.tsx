import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Calculator,
  ChartNoAxesCombined,
  CircleDollarSign,
  Compass,
  House,
  Landmark,
  Palmtree,
  ReceiptText,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { HeroMotion, Reveal } from "@/components/motion";
import { articles, getArticle, getArticleUrl } from "@/lib/content/articles";
import { calculators } from "@/lib/calculators";
import { JsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Evidence-based Canadian personal finance guidance",
  description:
    "Practical, source-led Guides and decision tools for money management, tax, investing, housing, and retirement in Canada.",
  alternates: { canonical: "/" },
};

const situations = [
  ["I need a financial roadmap", "Organize competing priorities and identify the next bottleneck.", "/start-here/cwl-financial-roadmap"],
  ["I am deciding where the next dollar goes", "Compare debt, reserves, registered accounts, a mortgage, and investing.", "/start-here/financial-order-of-operations"],
  ["I am preparing to buy a home", "Test cash required, ongoing affordability, and financing risk.", "/start-here/preparing-to-buy-home"],
  ["I am building long-term wealth", "Connect savings, allocation, accounts, fees, tax, and behaviour.", "/start-here/building-long-term-wealth"],
  ["I am approaching retirement", "Turn spending, benefits, pensions, assets, and tax into an income plan.", "/start-here/preparing-for-retirement"],
] as const;

const clusters = [
  ["Money Management", "Cash flow, liquidity, debt, purchases, and financial systems.", CircleDollarSign, "/money-management"],
  ["Tax Strategy", "Current Canadian mechanics, registered accounts, and tax records.", ReceiptText, "/taxes"],
  ["Investing", "Risk, allocation, diversification, products, fees, and behaviour.", ChartNoAxesCombined, "/investing"],
  ["Housing", "Renting, buying, mortgages, ownership costs, and property analysis.", House, "/housing"],
  ["Retirement & Financial Independence", "Spending, public benefits, pensions, withdrawals, and uncertainty.", Palmtree, "/retirement"],
] as const;

export default function Home() {
  const featured = getArticle("financial-order-of-operations");
  const perspective = getArticle("how-cwl-approaches-financial-decisions");
  const recentlyReviewed = [...articles]
    .filter((article) => article.cluster !== "start-here" && article.cluster !== "perspective")
    .sort((a, b) => b.reviewedDate.localeCompare(a.reviewedDate) || a.title.localeCompare(b.title))
    .slice(0, 3);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Canadian Wealth Lab",
        url: absoluteUrl("/"),
        description: "Evidence-based guidance for making better financial decisions in Canada.",
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Canadian Wealth Lab",
        url: absoluteUrl("/"),
        logo: absoluteUrl("/logo-north-star.svg"),
        publishingPrinciples: absoluteUrl("/about/editorial-standards"),
      }} />

      <main>
        <section className="hero home-reference-hero">
          <div className="container hero-grid">
            <HeroMotion>
              <div className="eyebrow"><span className="eyebrow-dot" />Independent Canadian financial education</div>
              <h1>Better evidence for better financial decisions.</h1>
              <p className="hero-copy">
                Practical Canadian Guides, transparent assumptions, and decision
                tools for the choices that materially shape household finances.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/start-here">Start Here <ArrowRight size={17} /></Link>
                <Link className="button button-secondary" href="/guides">Browse Guides</Link>
              </div>
              <p className="trust-line"><ShieldCheck size={16} />Sources, assumptions, exceptions, and review dates remain visible.</p>
            </HeroMotion>
            <Reveal className="hero-visual">
              <div className="signal-panel reference-panel">
                <div className="signal-topline"><span>CWL RESEARCH STANDARD</span><span className="signal-status">REVIEWED</span></div>
                <div className="signal-question">
                  <span>Decision framework</span>
                  <h2>Facts before conclusions.</h2>
                  <p>Define the choice. Verify the rules. Show the assumptions. Compare taxes, fees, inflation, risk, and opportunity cost.</p>
                </div>
                <div className="reference-steps">
                  <span>01 Mechanics</span><span>02 Scenarios</span><span>03 Tradeoffs</span><span>04 Next steps</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section decision-section" aria-labelledby="situations-title">
          <div className="container">
            <Reveal className="section-heading split-heading">
              <div><span className="kicker">START WITH YOUR SITUATION</span><h2 id="situations-title">Choose the decision in front of you.</h2></div>
              <p>The complete plan can wait. Begin where a better next step has the most practical value.</p>
            </Reveal>
            <div className="situation-grid">
              {situations.map(([title, description, href], index) => (
                <Reveal key={title} delay={index * 0.04}>
                  <Link className="situation-card" href={href}><span>0{index + 1}</span><strong>{title}</strong><p>{description}</p><ArrowRight size={17} /></Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {featured && (
          <section className="section featured-decision" aria-labelledby="featured-decision-title">
            <div className="container featured-decision-grid">
              <div><span className="kicker kicker-light">FEATURED DECISION GUIDE</span><h2 id="featured-decision-title">{featured.title}</h2></div>
              <div><p>{featured.description}</p><Link className="button button-primary" href={getArticleUrl(featured)}>Read the Decision Guide <ArrowRight size={17} /></Link></div>
            </div>
          </section>
        )}

        <section className="section cluster-home" aria-labelledby="clusters-title">
          <div className="container">
            <Reveal className="section-heading split-heading"><div><span className="kicker">GUIDE CLUSTERS</span><h2 id="clusters-title">Five connected parts of one financial life.</h2></div><p>Each hub explains mechanics, decisions, common errors, and the order in which to read deeper Guides.</p></Reveal>
            <div className="decision-grid">
              {clusters.map(([title, description, Icon, href], index) => (
                <Reveal className="decision-item" key={title} delay={index * 0.04}><Link href={href}><span className="decision-icon"><Icon size={21} /></span><span><strong>{title}</strong><small>{description}</small></span><ArrowRight size={17} /></Link></Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section calculators-feature" aria-labelledby="tools-title">
          <div className="container">
            <Reveal className="section-heading split-heading"><div><span className="kicker kicker-light">EXISTING TOOLS</span><h2 id="tools-title">Test the assumptions with your own numbers.</h2></div><p>The original calculators remain available. Inputs stay in the active browser session and are not sent to CWL analytics.</p></Reveal>
            <div className="calculator-list">
              {calculators.map((calculator, index) => (
                <Reveal className="calculator-row" key={calculator.slug} delay={index * 0.05}><Link href={`/calculators/${calculator.slug}`}><span className="calculator-index">0{index + 1}</span><span className="calculator-row-main"><strong>{calculator.title}</strong><small>{calculator.shortDescription}</small></span><span className="calculator-arrow"><Calculator size={18} /></span></Link></Reveal>
              ))}
            </div>
            <div className="section-link"><Link href="/guided">Use an existing guided path <ArrowRight size={16} /></Link></div>
          </div>
        </section>

        <section className="section latest-section" aria-labelledby="reviewed-title">
          <div className="container">
            <Reveal className="section-heading split-heading"><div><span className="kicker">RECENTLY REVIEWED</span><h2 id="reviewed-title">Current Guides with sources you can inspect.</h2></div><Link className="text-link" href="/guides">Browse all Guides <ArrowRight size={16} /></Link></Reveal>
            <div className="article-grid">
              {recentlyReviewed.map((article, index) => (
                <Reveal className="article-card" key={article.slug} delay={index * 0.05}><Link href={getArticleUrl(article)}><div className="article-meta"><span>{article.contentType}</span><span>Reviewed {article.reviewedDate}</span></div><h3>{article.title}</h3><p>{article.description}</p><span className="read-link">Read Guide <ArrowRight size={15} /></span></Link></Reveal>
              ))}
            </div>
          </div>
        </section>

        {perspective && (
          <section className="section perspective-feature" aria-labelledby="perspective-title">
            <div className="container featured-decision-grid">
              <div><span className="kicker">CWL PERSPECTIVE</span><h2 id="perspective-title">{perspective.title}</h2></div>
              <div><p>{perspective.description}</p><p className="perspective-note">Editorial judgment is labelled and kept separate from factual mechanics.</p><Link className="text-link" href={getArticleUrl(perspective)}>Read the Perspective <ArrowRight size={16} /></Link></div>
            </div>
          </section>
        )}

        <section className="section why-section" aria-labelledby="standards-title">
          <div className="container why-grid">
            <Reveal><span className="kicker">RESEARCH STANDARDS</span><h2 id="standards-title">Traceable facts. Visible limits.</h2><p className="why-lead">CWL prioritizes primary Canadian sources, dates time-sensitive claims, distinguishes assumptions from rules, and corrects material errors openly.</p></Reveal>
            <div className="principles">
              {[
                [BookOpenCheck, "Primary-source research", "Government, regulator, pension, and original product documents receive priority."],
                [Scale, "Balanced decisions", "The strongest reasonable case for each legitimate option is presented."],
                [Compass, "Transparent assumptions", "Examples show formulas, tax, fees, inflation, risk, and what can reverse the answer."],
                [Landmark, "Canadian context", "Federal and provincial differences, registered accounts, housing rules, and public benefits remain explicit."],
              ].map(([Icon, title, copy], index) => {
                const StandardIcon = Icon as typeof BookOpenCheck;
                return <Reveal className="principle" key={String(title)} delay={index * 0.04}><StandardIcon size={21} /><div><strong>{String(title)}</strong><p>{String(copy)}</p></div></Reveal>;
              })}
              <Link className="text-link" href="/about/editorial-standards">Read the editorial standards <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
