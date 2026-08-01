import { buildGuidedResult } from "@/lib/guided/engine.mjs";
import { getGuidedRecommendations, guidedJourneyRecommendations } from "@/lib/guided/recommendations";
import { getGuidedSources } from "@/lib/guided/sources";
import type { GuidedResponses, GuidedResult, JourneyId } from "@/lib/guided/types";

const debtFixture = [
  { id: "card", type: "Credit card", balance: 8000, interestRate: 20.99, minimumPayment: 240, security: "unsecured", rateType: "variable", status: "current" },
  { id: "loan", type: "Personal loan", balance: 12000, interestRate: 8.5, minimumPayment: 320, security: "unsecured", rateType: "fixed", status: "current" },
];

const representativeScenarios: Record<JourneyId, GuidedResponses[]> = {
  "next-dollar": [
    { "debt-rate": "over-12", "emergency-months": 1, "income-stability": "stable", "employer-match": "no", "monthly-amount": 500 },
    { "debt-rate": "none", "emergency-months": 6, "income-stability": "stable", "employer-match": "no", "monthly-amount": 500 },
  ],
  "retirement-readiness": [
    { province: "on", household: "one", "current-age": 40, "retirement-age": 65, "retirement-spending": 5000, "spending-change": "same", "current-assets": 250000, "annual-contributions": 15000, "pension-income": 0, "cpp-income": 15000, "oas-income": 9000, "other-income": 0, "retirement-flexibility": "save" },
    { province: "bc", household: "couple", "current-age": 55, "retirement-age": 62, "partner-age": 53, "retirement-spending": 7000, "spending-change": "lower", "current-assets": 500000, "annual-contributions": 20000, "pension-income": "unknown", "cpp-income": "unknown", "oas-income": "unknown", "other-income": 0, "retirement-flexibility": "later" },
  ],
  "mortgage-vs-invest": [
    { "available-amount": 20000, "emergency-months": 6, "income-stability": "stable", "high-interest-debt": "none", "mortgage-balance": 400000, "mortgage-rate": 5, "mortgage-years": 20, "prepayment-limit": 40000, "investment-account": "tfsa", "investment-horizon": 10, "loss-comfort": "hold", priority: "balance" },
    { "available-amount": 20000, "emergency-months": 2, "income-stability": "uncertain", "high-interest-debt": "some", "mortgage-balance": 400000, "mortgage-rate": 5, "mortgage-years": 20, "prepayment-limit": "unknown", "investment-account": "taxable", "tax-rate": 35, "investment-horizon": 5, "loss-comfort": "sell", priority: "certainty" },
  ],
  "registered-accounts": [
    { province: "on", "primary-goal": "first-home", "first-home-status": "likely", "time-horizon": "5-15", "annual-savings": 12000, "employer-match": "no", "tfsa-room": 20000, "rrsp-room": 30000, "fhsa-room": 8000, "current-tax-rate": 30, "future-tax-rate": "similar", flexibility: "some" },
    { province: "ab", "primary-goal": "retirement", "time-horizon": "over-15", "annual-savings": 12000, "employer-match": "yes", "match-contribution": 3000, "tfsa-room": "unknown", "rrsp-room": 30000, "current-tax-rate": 40, "future-tax-rate": "lower", flexibility: "low" },
  ],
  "home-readiness": [
    { province: "on", timeline: "1-3", "target-price": 700000, "purchase-cash": 100000, "down-payment": 70000, "closing-costs": 15000, "moving-repairs": 8000, "emergency-months": 3, "gross-income": 140000, "monthly-debt": 800, "mortgage-rate": 5, amortization: "25", "property-tax": 5000, "home-type": "freehold", utilities: 250, "home-insurance": 1800, maintenance: 7000, "monthly-rent": 2800, "holding-period": "5-10" },
    { province: "bc", timeline: "under-1", "target-price": 900000, "purchase-cash": 75000, "down-payment": 60000, "closing-costs": 18000, "moving-repairs": 10000, "emergency-months": 1, "gross-income": 150000, "monthly-debt": 1200, "mortgage-rate": 5.5, amortization: "25", "property-tax": 4500, "home-type": "condo", "condo-fees": 650, utilities: 150, "home-insurance": 1200, maintenance: 2500, "monthly-rent": 3200, "holding-period": "under-5" },
  ],
  "debt-plan": [
    { "payment-affordability": "yes", "account-status": "current", "borrowing-essentials": "no", debts: debtFixture, "extra-payment": 400, "emergency-months": 2, "income-stability": "stable", "payoff-style": "compare", "upcoming-change": "none" },
    { "payment-affordability": "no", "account-status": "past-due", "borrowing-essentials": "often", debts: debtFixture.map((item) => ({ ...item, status: "past-due" })), "extra-payment": 0, "emergency-months": 0, "income-stability": "uncertain", "payoff-style": "avalanche", "upcoming-change": "negative" },
  ],
};

export function getStaticJourneyContent(journeyId: JourneyId) {
  const results = representativeScenarios[journeyId].map((responses) => buildGuidedResult(journeyId, responses) as GuidedResult);
  const primaryResult = results[0];
  const sourceIds = [...new Set(results.flatMap((result) => result.sourceIds))];
  const recommendations = guidedJourneyRecommendations[journeyId];
  return {
    outcomes: results.map(({ signal, headline, summary }) => ({ signal, headline, summary })),
    concepts: primaryResult.concepts,
    tradeoffs: primaryResult.tradeoffs,
    nextSteps: primaryResult.nextSteps,
    assumptions: primaryResult.assumptions,
    sources: getGuidedSources(sourceIds),
    articles: getGuidedRecommendations("article", recommendations.articleSlugs),
    calculators: getGuidedRecommendations("calculator", recommendations.calculatorSlugs),
  };
}
