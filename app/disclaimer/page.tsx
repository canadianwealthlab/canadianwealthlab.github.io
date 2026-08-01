import type { Metadata } from "next";
import { StandardsPage } from "@/components/standards-page";

export const metadata: Metadata = {
  title: "Disclosures and Disclaimer",
  description:
    "Important limitations of Canadian Wealth Lab financial guides and calculators.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <StandardsPage
      parent={null}
      kicker="IMPORTANT INFORMATION"
      title="Disclosures and Disclaimer"
      description="Canadian Wealth Lab provides education and decision support, not individualized professional advice."
      sections={[
        {
          title: "Editorial and commercial disclosures",
          paragraphs: [
            "Canadian Wealth Lab does not currently publish paid product endorsements or claim that a financial product is best for every reader. If advertising, sponsorship, affiliate compensation, or a material commercial relationship is introduced, it will be disclosed clearly and will not control editorial conclusions.",
          ],
        },
        {
          title: "Not personalized advice",
          paragraphs: [
            "Content and calculator results are general and do not account for your complete financial situation, goals, risk tolerance, tax circumstances, province, legal obligations, mortgage contract, benefits eligibility, or investment knowledge.",
            "The site does not provide financial planning, investment, tax, legal, accounting, insurance, real-estate, or mortgage advice.",
          ],
        },
        {
          title: "Models are estimates",
          paragraphs: [
            "Calculator and Get Guided results depend on the limited values and assumptions entered. Returns, inflation, home prices, interest rates, taxes, costs, eligibility, and personal circumstances may differ materially from the scenarios shown. No result is a promise, guarantee, quote, approval, recommendation, or forecast.",
          ],
        },
        {
          title: "Investing risk",
          paragraphs: [
            "Investments can lose value. Past performance does not guarantee future results. Product names are used for educational comparison and do not constitute an offer, solicitation, endorsement, or recommendation to buy or sell a security.",
          ],
        },
        {
          title: "Verify before acting",
          paragraphs: [
            "Check current government guidance, official product documentation, and your own contracts before making a decision. Consider consulting a qualified professional who can evaluate your circumstances.",
          ],
        },
      ]}
    />
  );
}
