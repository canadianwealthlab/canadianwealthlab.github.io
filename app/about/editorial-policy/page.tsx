import type { Metadata } from "next";
import { StandardsPage } from "@/components/standards-page";

export const metadata: Metadata = {
  title: "Editorial policy",
  description:
    "How Canadian Wealth Lab researches, writes, reviews, updates, and corrects Canadian financial content.",
  alternates: { canonical: "/about/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <StandardsPage
      kicker="OUR STANDARDS"
      title="Editorial policy"
      description="Our process is designed to make financial information understandable, traceable, and appropriately cautious."
      sections={[
        {
          title: "Editorial purpose",
          paragraphs: [
            "Canadian Wealth Lab publishes educational decision support for Canadians. We explain tradeoffs, make assumptions visible, and help readers identify questions worth taking to a qualified professional.",
            "We do not provide personalized financial, tax, legal, mortgage, or investment advice. We do not present forecasts or model outputs as guaranteed outcomes.",
          ],
        },
        {
          title: "Research and sourcing",
          paragraphs: [
            "We prioritize primary Canadian sources: federal and provincial government publications, regulators, official program documentation, legislation, and original product documents. Secondary research may provide context but should not replace the authoritative source for a rule or product feature.",
          ],
          points: [
            "Time-sensitive facts are checked against the source available on the review date.",
            "Material assumptions and important exclusions are stated near the analysis.",
            "Product comparisons link to the issuer documents used.",
            "Sources are selected for relevance and authority, not because they support a preferred conclusion.",
          ],
        },
        {
          title: "Writing and review",
          paragraphs: [
            "Each guide is drafted for a defined reader question, checked for internal consistency, and reviewed against its cited sources. Calculations are independently reproduced before publication when a numeric example is material to the conclusion.",
            "Until named subject-matter reviewers are retained, articles are attributed transparently to the Canadian Wealth Lab Editorial Team. We do not imply professional credentials that the project has not verified.",
          ],
        },
        {
          title: "Independence and conflicts",
          paragraphs: [
            "Editorial conclusions are not sold to product providers. If Canadian Wealth Lab introduces advertising, affiliate relationships, sponsorships, or other compensation, those relationships will be disclosed clearly and will not determine the conclusion of a guide.",
            "The site currently does not claim that a product is best for every reader. Comparisons focus on fit, tradeoffs, costs, risks, and information a reader should verify.",
          ],
        },
        {
          title: "Updates",
          paragraphs: [
            "Every guide displays its publication and review dates. High-change subjects such as tax rules, contribution limits, government benefits, mortgage regulations, and product fees receive priority for scheduled review.",
            "A changed date must reflect a substantive review or revision. Dates are not refreshed solely to make content appear newer.",
          ],
        },
      ]}
    />
  );
}
