import type { ClusterSlug } from "@/lib/content/clusters";

export type CalculatorDefinition = {
  slug: "mortgage-prepayment" | "rent-vs-buy" | "tfsa-vs-rrsp" | "fire";
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  cluster: ClusterSlug;
};

export const calculators: CalculatorDefinition[] = [
  {
    slug: "mortgage-prepayment",
    title: "Mortgage Prepayment Calculator",
    shortDescription: "See how extra payments change your interest and payoff date.",
    description:
      "Estimate the interest and time you could save by adding a regular extra payment to your Canadian mortgage.",
    category: "Home ownership",
    cluster: "housing",
  },
  {
    slug: "rent-vs-buy",
    title: "Rent vs Buy Calculator",
    shortDescription: "Compare the net-worth impact of renting and buying.",
    description:
      "Compare five- and ten-year outcomes using a transparent model for home equity, ownership costs, and invested savings.",
    category: "Home ownership",
    cluster: "housing",
  },
  {
    slug: "tfsa-vs-rrsp",
    title: "TFSA vs RRSP Calculator",
    shortDescription: "Compare projected after-tax outcomes side by side.",
    description:
      "Model the long-term impact of a TFSA contribution versus an RRSP contribution and reinvested tax refund.",
    category: "Taxes & investing",
    cluster: "investing",
  },
  {
    slug: "fire",
    title: "FIRE Calculator",
    shortDescription: "Estimate your path to financial independence.",
    description:
      "Turn your investments, savings, spending, and expected return into an estimated financial independence timeline.",
    category: "Retirement",
    cluster: "retirement",
  },
];

export function getCalculator(slug: string) {
  return calculators.find((calculator) => calculator.slug === slug);
}
