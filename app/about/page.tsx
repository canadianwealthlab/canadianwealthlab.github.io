import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About CWL",
  description:
    "Why Canadian Wealth Lab exists, how we approach financial decisions, and what readers should expect from our work.",
  alternates: { canonical: "/about" },
};

const values = [
  ["01", "Show the assumptions", "A useful model makes its logic visible so readers can challenge it and test a range."],
  ["02", "Separate facts from forecasts", "Known rules, chosen assumptions, and uncertain outcomes should never be presented as the same thing."],
  ["03", "Stay independent", "Content should clarify a decision before it creates a commercial opportunity."],
  ["04", "Design for action", "Every guide should leave readers with a better question, a useful calculation, or a practical next step."],
];

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="kicker">ABOUT THE LAB</span>
          <h1>About Canadian Wealth Lab</h1>
          <p>
            Canadian Wealth Lab exists to make consequential money decisions
            easier to understand without acting like a bank, an advisor, or a market pundit.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container about-grid">
          <p className="about-statement">
            We believe the best financial content helps people reason, not simply
            follow a confident answer.
          </p>
          <div className="about-copy">
            <p>
              Canadian financial decisions sit at the intersection of taxes,
              housing, public benefits, investment risk, and personal priorities.
              Generic advice often misses that context. Our job is to make the
              variables legible.
            </p>
            <p>
              The platform combines transparent calculators, guided decision
              paths, factual Guides, and balanced Decision Guides. We do not
              provide personalized advice, predict markets, or claim there is
              one correct choice for every household.
            </p>
            <Link className="text-link" href="/calculators">
              Explore the calculators <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="container values-list">
          {values.map(([number, title, copy]) => (
            <div className="value-row" key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{copy}</p>
            </div>
          ))}
        </div>
        <div className="container standards-links">
          <div className="section-heading split-heading">
            <div>
              <span className="kicker">PUBLIC STANDARDS</span>
              <h2>See how the work is produced.</h2>
            </div>
            <p>
              Our policies explain how sources, assumptions, reviews,
              corrections, and calculator limitations are handled.
            </p>
          </div>
          <div className="standards-link-grid">
            {[
              ["Why CWL Exists", "/about/why-cwl-exists"],
              ["Editorial Standards", "/about/editorial-standards"],
              ["Research Methodology", "/about/research-methodology"],
              ["Sources and Corrections", "/about/sources-and-corrections"],
              ["Disclosures and Disclaimer", "/disclaimer"],
              ["Editorial team", "/authors/canadian-wealth-lab"],
            ].map(([label, href]) => (
              <Link href={href} key={href}>
                <span>{label}</span>
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
