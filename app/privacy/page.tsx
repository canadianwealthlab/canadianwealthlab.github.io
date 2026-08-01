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
            "Responses in Get Guided are processed in your browser and kept in session storage for the current tab. This permits back navigation, revising assumptions, and optional reuse of shared context across guided paths. Responses are not transmitted or linked to an account. They survive a reload in the same tab and are cleared when the tab closes. Starting over clears the current path, while shared context may remain available in that tab.",
            "Do not enter names, email addresses, account numbers, creditor names, or other identifying details. The debt list requests a generic debt name or type only, such as credit card or auto loan.",
            "Analytics events may record that a guided journey started, a non-sensitive step was completed, results were viewed, or a recommended resource was opened. Event data can include an internal journey, step, or content-type label. It never includes response values or the text of a response.",
          ],
        },
        {
          title: "Analytics",
          paragraphs: [
            "On the production website, Google Analytics 4 runs by default to measure standard page views and the limited guided-interaction events described above. Google Analytics may set first-party analytics cookies and receives standard browser, device, network, and page information when these events are sent.",
            "Canadian Wealth Lab sends page paths without URL query parameters. Calculator values, guided responses, form entries, filenames, product or feed data, email addresses, user IDs, and custom financial data are not sent to Google Analytics. Advertising signals and ad personalization remain disabled. Visitors can block or delete analytics cookies using their browser or privacy tools.",
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
            "This policy will be updated before Canadian Wealth Lab introduces accounts, server-saved calculations or guided results, active message or email collection, or other features that materially change personal-information handling.",
          ],
        },
      ]}
    />
  );
}
