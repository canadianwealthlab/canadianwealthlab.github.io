import type { Metadata } from "next";
import { GuidedLanding } from "@/components/guided-landing";
import { GuidedLauncher } from "@/components/guided-launcher";
import { JsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Get Guided through a Canadian money decision",
  description:
    "Answer a few focused questions and get an educational decision map for money priorities, registered accounts, or home-buying readiness.",
  alternates: { canonical: "/guided" },
};

export default function GuidedPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Get Guided",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Any",
          url: absoluteUrl("/guided"),
          description:
            "A browser-based educational experience for exploring Canadian personal finance decisions.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
        }}
      />
      <GuidedLanding />
      <GuidedLauncher />
    </>
  );
}
