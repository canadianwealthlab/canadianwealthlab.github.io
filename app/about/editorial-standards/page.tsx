import type { Metadata } from "next";
import { StandardsPage } from "@/components/standards-page";

export const metadata: Metadata = { title: "Editorial Standards", description: "How Canadian Wealth Lab researches, labels, reviews, updates, and corrects financial content.", alternates: { canonical: "/about/editorial-standards" } };

export default function EditorialStandardsPage() {
  return <StandardsPage kicker="EDITORIAL STANDARDS" title="Evidence before confidence" description="Readers should be able to trace important facts, distinguish judgment, and understand the limits of every conclusion." sections={[
    { title: "Purpose and boundaries", paragraphs: ["Canadian Wealth Lab publishes general financial education and decision support for Canadians. It does not provide individualized financial, investment, tax, legal, mortgage, or accounting advice.", "Content must not invent owner experience, holdings, results, credentials, or beliefs. Guides explain mechanics. Decision Guides compare legitimate options. CWL Perspective labels restrained editorial judgment separately."] },
    { title: "Research", points: ["Prefer current primary Canadian government, regulator, pension, statistical, and original product sources.", "Identify tax year and jurisdiction for time-sensitive rules.", "Distinguish enacted rules from proposals.", "Use only sources actually reviewed and link directly to them.", "Show material formulas, assumptions, exceptions, and uncertainties."] },
    { title: "Review and updates", paragraphs: ["Every substantive Guide displays publication and review dates. A changed review date must represent a substantive source check or revision, not an attempt to appear current.", "High-change subjects such as annual limits, tax brackets, public benefits, mortgage rules, and product documents receive priority. Repeated annual values are stored centrally where practical."] },
    { title: "Community material", paragraphs: ["Public discussions may surface lived experience and recurring questions. They remain anecdotal, are linked to their original context, and never replace authoritative evidence. Usernames are omitted when identification adds no editorial value."] },
    { title: "Independence", paragraphs: ["Editorial conclusions are not sold to product providers. If advertising, affiliate relationships, or sponsorships are introduced, compensation must be disclosed and cannot determine the conclusion."] },
    { title: "Page removal", paragraphs: ["Intentionally retired pages are removed from the site and sitemap and return HTTP 404. They are not redirected or preserved as placeholders unless the owner explicitly requests a redirect for a specific URL."] },
  ]} />;
}
