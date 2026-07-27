import type { Metadata } from "next";
import { StandardsPage } from "@/components/standards-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Canadian Wealth Lab handles calculator inputs, analytics, and personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <StandardsPage
      parent={null}
      kicker="PRIVACY"
      title="Privacy policy"
      description="The site is designed to work without collecting the financial values entered into its calculators."
      sections={[
        {
          title: "Calculator information",
          paragraphs: [
            "Calculator inputs are processed in your browser. Canadian Wealth Lab does not transmit, store, or associate those inputs with an account. Do not enter identifying information into calculator fields.",
          ],
        },
        {
          title: "Newsletter form",
          paragraphs: [
            "The current newsletter form is a demonstration interface. It does not transmit or store the email address entered. This policy will be updated before an email subscription service is activated.",
          ],
        },
        {
          title: "Analytics",
          paragraphs: [
            "On the production website, Google Analytics 4 loads only after you choose Allow analytics. If you decline, the Google tag is not loaded and no analytics request is sent. Your preference is stored in your browser and can be changed using Analytics settings in the footer.",
            "When allowed, Canadian Wealth Lab sends standard page-view information using a page path without URL query parameters. Calculator values, form entries, filenames, product or feed data, email addresses, user IDs, and custom financial data are not sent to Google Analytics. Advertising storage, advertising user data, ad personalization, and Google signals remain disabled.",
          ],
        },
        {
          title: "Hosting and external links",
          paragraphs: [
            "The site is hosted using third-party infrastructure that may create standard security and access logs. Links to government agencies, product issuers, and other websites are governed by those sites’ privacy practices.",
          ],
        },
        {
          title: "Policy changes",
          paragraphs: [
            "This policy will be updated before Canadian Wealth Lab introduces accounts, saved calculations, contact forms, active email collection, or other features that materially change personal-information handling.",
          ],
        },
      ]}
    />
  );
}
