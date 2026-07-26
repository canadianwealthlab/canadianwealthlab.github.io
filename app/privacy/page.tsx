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
            "The site can load Google Analytics only when a measurement identifier is configured by the operator. If enabled, Google may process technical and usage information such as device, browser, approximate location, pages viewed, and interactions. IP anonymization is requested in the site configuration, but Google’s own terms and privacy practices govern its processing.",
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
