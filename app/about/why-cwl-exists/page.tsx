import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Why CWL Exists",
  description: "The purpose and boundaries of Canadian Wealth Lab as an evidence-based financial education platform.",
  alternates: { canonical: "/about/why-cwl-exists" },
};

export default function WhyCwlExistsPage() {
  return (
    <main>
      <section className="page-hero"><div className="container page-hero-inner"><span className="kicker">WHY CWL EXISTS</span><h1>Better decisions require more than a confident answer.</h1><p>Canadian Wealth Lab exists to make consequential financial choices easier to inspect, compare, and revisit.</p></div></section>
      <section className="section"><div className="container about-grid">
        <p className="about-statement">Financial education should show what is known, what is assumed, and what can change the answer.</p>
        <div className="about-copy">
          <p>Canadian households make decisions across taxes, housing, registered accounts, investing, public benefits, pensions, debt, and cash flow. A rule that is correct in one domain can be incomplete when the other effects are ignored.</p>
          <p>CWL uses primary sources to establish mechanics, worked scenarios to expose assumptions, and balanced Decision Guides to show legitimate alternatives. The publication does not sell individualized advice, predict markets, or treat complexity as evidence of sophistication.</p>
          <p>The intended result is practical: a reader should understand the variables, identify the evidence still required, and know when the decision needs qualified professional help.</p>
          <Link className="text-link" href="/about/editorial-standards">Read the Editorial Standards <ArrowRight size={16} /></Link>
        </div>
      </div></section>
    </main>
  );
}
