import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { CalculatorExperience } from "@/components/calculator-experience";
import { calculators, getCalculator } from "@/lib/calculators";
import { JsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl } from "@/lib/seo/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return calculators.map((calculator) => ({ slug: calculator.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) return {};
  return {
    title: calculator.title,
    description: calculator.description,
    alternates: { canonical: `/calculators/${calculator.slug}` },
    openGraph: {
      title: calculator.title,
      description: calculator.description,
      url: `/calculators/${calculator.slug}`,
    },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) notFound();

  return (
    <main className="calculator-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Calculators", item: absoluteUrl("/calculators") },
            { "@type": "ListItem", position: 3, name: calculator.title, item: absoluteUrl(`/calculators/${calculator.slug}`) },
          ],
        }}
      />
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link><ChevronRight size={13} />
          <Link href="/calculators">Calculators</Link><ChevronRight size={13} />
          <span>{calculator.title}</span>
        </div>
        <header className="calculator-intro">
          <div>
            <span className="kicker">{calculator.category.toUpperCase()}</span>
            <h1>{calculator.title}</h1>
          </div>
          <p>{calculator.description}</p>
        </header>
        <CalculatorExperience calculator={calculator} />
        <p className="calculator-note">
          Educational estimate only. Results are simplified, may not reflect
          lender or tax rules, and are not personalized financial advice.
        </p>
      </div>
    </main>
  );
}
