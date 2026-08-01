import type { JourneyId } from "@/lib/guided/types";

export type GuidedRecommendation = {
  slug: string;
  title: string;
  href: string;
};

export const guidedArticleRecommendations: GuidedRecommendation[] = [
  {
    slug: "emergency-fund-canada",
    title: "Emergency Fund Guide for Canadians",
    href: "/money-management/emergency-fund-canada",
  },
  {
    slug: "pay-off-mortgage-or-invest",
    title: "Pay Off the Mortgage or Invest?",
    href: "/housing/pay-off-mortgage-or-invest",
  },
  {
    slug: "building-investment-plan",
    title: "Building a Diversified Investment Plan",
    href: "/investing/building-investment-plan",
  },
  {
    slug: "tfsa-guide",
    title: "TFSA Guide",
    href: "/taxes/tfsa-guide",
  },
  {
    slug: "rrsp-guide",
    title: "RRSP Guide",
    href: "/taxes/rrsp-guide",
  },
  {
    slug: "tfsa-rrsp-fhsa",
    title: "TFSA vs RRSP vs FHSA",
    href: "/taxes/tfsa-rrsp-fhsa",
  },
  {
    slug: "down-payment-canada",
    title: "Down Payment Requirements in Canada",
    href: "/housing/down-payment-canada",
  },
  {
    slug: "how-much-house-can-i-afford",
    title: "How Much House Can I Afford in Canada?",
    href: "/housing/how-much-house-can-i-afford",
  },
  {
    slug: "rent-vs-buy",
    title: "Rent vs Buy: How Should I Decide?",
    href: "/housing/rent-vs-buy",
  },
];

export const guidedCalculatorRecommendations: GuidedRecommendation[] = [
  {
    slug: "tfsa-vs-rrsp",
    title: "TFSA vs RRSP Calculator",
    href: "/calculators/tfsa-vs-rrsp",
  },
  {
    slug: "rent-vs-buy",
    title: "Rent vs Buy Calculator",
    href: "/calculators/rent-vs-buy",
  },
];

export const guidedJourneyRecommendations: Record<
  JourneyId,
  { articleSlugs: string[]; calculatorSlugs: string[] }
> = {
  "next-dollar": {
    articleSlugs: [
      "emergency-fund-canada",
      "pay-off-mortgage-or-invest",
      "building-investment-plan",
    ],
    calculatorSlugs: [],
  },
  "registered-accounts": {
    articleSlugs: ["tfsa-guide", "rrsp-guide", "tfsa-rrsp-fhsa"],
    calculatorSlugs: ["tfsa-vs-rrsp"],
  },
  "home-readiness": {
    articleSlugs: [
      "down-payment-canada",
      "how-much-house-can-i-afford",
      "rent-vs-buy",
    ],
    calculatorSlugs: ["rent-vs-buy"],
  },
};

export function getGuidedRecommendations(
  type: "article" | "calculator",
  slugs: string[],
) {
  const directory =
    type === "article"
      ? guidedArticleRecommendations
      : guidedCalculatorRecommendations;
  return slugs
    .map((slug) => directory.find((item) => item.slug === slug))
    .filter((item): item is GuidedRecommendation => Boolean(item));
}
