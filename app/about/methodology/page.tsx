import type { Metadata } from "next";
import { StandardsPage } from "@/components/standards-page";

export const metadata: Metadata = {
  title: "Calculator methodology",
  description:
    "How Canadian Wealth Lab designs, tests, and communicates financial calculator assumptions and limitations.",
  alternates: { canonical: "/about/methodology" },
};

export default function MethodologyPage() {
  return (
    <StandardsPage
      kicker="TRANSPARENT MODELS"
      title="Calculator methodology"
      description="Our calculators are scenario tools. They make relationships visible; they do not predict a reader’s financial future."
      sections={[
        {
          title: "What the calculators do",
          paragraphs: [
            "Each calculator applies a documented set of formulas to the values entered by the user. Results are estimates intended to support comparison and further investigation.",
            "The tools do not access bank accounts, tax records, credit files, or government data. Inputs remain in the active browser session and are not submitted to Canadian Wealth Lab.",
          ],
        },
        {
          title: "Model design",
          points: [
            "Inputs use plain-language labels and practical default values.",
            "Material assumptions are editable or disclosed beside the result.",
            "Dollar amounts are rounded for decision support and may differ from lender, tax software, or advisor calculations.",
            "Comparisons use the same time period and internally consistent assumptions wherever possible.",
            "Uncertain inputs such as investment returns and home appreciation are scenarios, not forecasts.",
          ],
        },
        {
          title: "Testing",
          paragraphs: [
            "Formula changes are checked with independent examples and regression tests. Boundary conditions, including zero values, short periods, and unusually high inputs, are reviewed for mathematical and interface failures.",
            "Canadian mortgage calculations may differ slightly from lender disclosures because payment timing, compounding conventions, fees, insurance, and contractual terms can vary. Readers should treat their lender’s contract and disclosure as authoritative.",
          ],
        },
        {
          title: "Important exclusions",
          paragraphs: [
            "No simplified calculator can account for every tax credit, benefit interaction, provincial rule, fee, investment path, life event, or contractual term. Each result should be interpreted alongside its stated assumptions and exclusions.",
            "When a decision is consequential or depends on facts not captured by the model, obtain advice from an appropriately qualified professional.",
          ],
        },
        {
          title: "Reporting an issue",
          paragraphs: [
            "If you believe a formula, assumption, label, or result is incorrect, provide the calculator name, the inputs used, the result shown, and the result you expected. Reproducible reports receive priority.",
          ],
        },
      ]}
    />
  );
}
