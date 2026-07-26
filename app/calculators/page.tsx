import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { calculators } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Free Canadian financial calculators",
  description:
    "Transparent, easy-to-use calculators for Canadian mortgage, housing, registered account, and retirement decisions.",
  alternates: { canonical: "/calculators" },
};

export default function CalculatorsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="kicker">FINANCIAL CALCULATORS</span>
          <h1>Model the decision before you make it.</h1>
          <p>
            Change the assumptions, compare the outcomes, and understand what
            matters. Every calculator is free and designed for Canadian households.
          </p>
        </div>
      </section>
      <section className="listing-section">
        <div className="container listing-grid">
          {calculators.map((calculator) => (
            <article className="listing-card" key={calculator.slug}>
              <Link href={`/calculators/${calculator.slug}`}>
                <span className="calculator-card-icon"><Calculator size={20} /></span>
                <div className="article-meta"><span>{calculator.category}</span></div>
                <h2>{calculator.title}</h2>
                <p>{calculator.description}</p>
                <span className="read-link">Open calculator <ArrowRight size={15} /></span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
