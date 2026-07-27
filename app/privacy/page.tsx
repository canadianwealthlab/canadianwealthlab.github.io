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
          title: "Get Guided responses",
          paragraphs: [
            "Responses in Get Guided are processed in memory in your browser tab. They are not transmitted, stored, or linked to an account, and they disappear when you reload, restart, or leave the experience. The experience does not request names, email addresses, account numbers, exact income sources, or free-text financial details.",
            "If analytics is allowed, events may record that a guided journey started, a non-sensitive step was completed, results were viewed, or a recommended resource was opened. Event data can include an internal journey, step, or content-type label. It never includes response values or the text of a response.",
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
            "On the production website, the Google Analytics 4 tag loads with analytics storage denied by default. A standard page view is sent only after you choose Allow analytics. If you decline, analytics storage remains denied and Canadian Wealth Lab does not send its page-view or guided-interaction events. Your preference is stored in your browser and can be changed using Analytics settings in the footer.",
            "When allowed, Canadian Wealth Lab sends standard page-view information using a page path without URL query parameters and the limited guided interaction events described above. Calculator values, guided responses, form entries, filenames, product or feed data, email addresses, user IDs, and custom financial data are not sent to Google Analytics. Advertising storage, advertising user data, ad personalization, and Google signals remain disabled.",
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
            "This policy will be updated before Canadian Wealth Lab introduces accounts, saved calculations or guided results, contact forms, active email collection, or other features that materially change personal-information handling.",
          ],
        },
      ]}
    />
  );
}
