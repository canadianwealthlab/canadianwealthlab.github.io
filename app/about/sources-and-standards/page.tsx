import type { Metadata } from "next";
import { StandardsPage } from "@/components/standards-page";

export const metadata: Metadata = {
  title: "Sources and research standards",
  description:
    "The source hierarchy and evidence standards Canadian Wealth Lab applies to financial guides and calculators.",
  alternates: { canonical: "/about/sources-and-standards" },
};

export default function SourcesStandardsPage() {
  return (
    <StandardsPage
      kicker="EVIDENCE"
      title="Sources and research standards"
      description="Readers should be able to distinguish an official rule, a chosen assumption, an estimate, and an editorial interpretation."
      sections={[
        {
          title: "Source hierarchy",
          points: [
            "Government departments, agencies, regulators, legislation, and official program publications.",
            "Official fund facts, prospectuses, lender disclosures, and product documentation.",
            "Audited reports, peer-reviewed research, and recognized statistical agencies.",
            "High-quality secondary analysis used for context, never as a substitute for an authoritative rule.",
          ],
        },
        {
          title: "How sources appear",
          paragraphs: [
            "Guides list the primary sources used for verification. External links open the original publisher so readers can inspect the source directly. A source supports only the relevant claim; its inclusion does not imply that the publisher endorses Canadian Wealth Lab.",
          ],
        },
        {
          title: "Facts, assumptions, and estimates",
          points: [
            "Facts describe information supported by a cited source as of the review date.",
            "Assumptions are selected model inputs and should be visible and adjustable when material.",
            "Estimates are outputs derived from facts and assumptions, not guaranteed outcomes.",
            "Editorial analysis explains implications and tradeoffs and is identified through context rather than presented as an official rule.",
          ],
        },
        {
          title: "Time-sensitive information",
          paragraphs: [
            "Tax brackets, contribution limits, public-benefit amounts, mortgage rules, interest rates, and fund characteristics can change. Pages covering these subjects display a review date and direct readers to the authoritative source.",
          ],
        },
      ]}
    />
  );
}
