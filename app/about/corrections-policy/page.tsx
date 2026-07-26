import type { Metadata } from "next";
import { StandardsPage } from "@/components/standards-page";

export const metadata: Metadata = {
  title: "Corrections policy",
  description:
    "How Canadian Wealth Lab evaluates, corrects, and discloses material errors.",
  alternates: { canonical: "/about/corrections-policy" },
};

export default function CorrectionsPolicyPage() {
  return (
    <StandardsPage
      kicker="ACCOUNTABILITY"
      title="Corrections policy"
      description="Material errors should be corrected quickly, visibly, and without quietly rewriting the record."
      sections={[
        {
          title: "What we correct",
          points: [
            "Incorrect facts, formulas, calculations, or source attributions.",
            "Outdated rules or product details that could materially affect a decision.",
            "Ambiguous wording that creates a materially misleading impression.",
            "Broken source links when an authoritative replacement is available.",
          ],
        },
        {
          title: "How corrections are handled",
          paragraphs: [
            "Reports are checked against the relevant source and, for calculations, reproduced independently. Confirmed issues are corrected in the article or calculator and the review date is updated.",
            "A material correction that changes the conclusion, recommendation framework, or numeric result will be disclosed in a correction note on the affected page. Minor spelling, formatting, and non-substantive clarity edits may be made without a formal note.",
          ],
        },
        {
          title: "How to report an issue",
          paragraphs: [
            "Include the page address, the statement or result in question, why you believe it is wrong, and a primary source or reproducible example when available. We will not treat disagreement with a clearly labelled assumption as a factual error, but we may revise the explanation if the assumption is easy to misunderstand.",
          ],
        },
      ]}
    />
  );
}
