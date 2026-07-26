import type { Metadata } from "next";
import { StandardsPage } from "@/components/standards-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms governing use of the Canadian Wealth Lab website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <StandardsPage
      parent={null}
      kicker="TERMS"
      title="Terms of use"
      description="By using Canadian Wealth Lab, you agree to use its information and tools as general educational resources."
      sections={[
        {
          title: "Educational use",
          paragraphs: [
            "Canadian Wealth Lab provides general information and scenario tools. Nothing on the site creates an advisor-client, accountant-client, lawyer-client, lender-borrower, or fiduciary relationship.",
          ],
        },
        {
          title: "No guarantee",
          paragraphs: [
            "We work to make the site accurate and useful but do not guarantee that content is complete, current, error-free, or suitable for a particular decision. Financial rules, programs, markets, product terms, and personal circumstances change.",
          ],
        },
        {
          title: "Your responsibility",
          paragraphs: [
            "You are responsible for verifying relevant information, reviewing the assumptions and limitations of any calculation, and obtaining qualified professional advice when appropriate. You should not rely on a calculator result as an approval, quote, tax return, financial plan, or forecast.",
          ],
        },
        {
          title: "External resources",
          paragraphs: [
            "Links to third-party resources are provided for research and convenience. Canadian Wealth Lab does not control those sites and is not responsible for their availability, content, security, or services.",
          ],
        },
        {
          title: "Acceptable use",
          paragraphs: [
            "You may use the public site for lawful personal and informational purposes. You may not attempt to disrupt the service, circumvent security, misrepresent site content, or imply endorsement by Canadian Wealth Lab.",
          ],
        },
      ]}
    />
  );
}
