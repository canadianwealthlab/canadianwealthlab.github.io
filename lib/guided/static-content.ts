import { buildGuidedResult } from "@/lib/guided/engine.mjs";
import {
  getGuidedRecommendations,
  guidedJourneyRecommendations,
} from "@/lib/guided/recommendations";
import { getGuidedSources } from "@/lib/guided/sources";
import type {
  GuidedResponses,
  GuidedResult,
  JourneyId,
} from "@/lib/guided/types";

const representativeScenarios: Record<JourneyId, GuidedResponses[]> = {
  "next-dollar": [
    {
      "debt-rate": "over-12",
      "emergency-months": 1,
      "income-stability": "stable",
      "employer-match": "no",
      "monthly-amount": 500,
    },
    {
      "debt-rate": "under-7",
      "emergency-months": 1,
      "income-stability": "variable",
      "employer-match": "no",
      "monthly-amount": 500,
    },
    {
      "debt-rate": "none",
      "emergency-months": 6,
      "income-stability": "stable",
      "employer-match": "no",
      "monthly-amount": 500,
    },
    {
      "debt-rate": "under-7",
      "emergency-months": 6,
      "income-stability": "stable",
      "employer-match": "no",
      "monthly-amount": 500,
    },
  ],
  "registered-accounts": [
    {
      "primary-goal": "first-home",
      "first-home-status": "likely",
      "time-horizon": "5-15",
      "employer-match": "no",
      contribution: 5000,
      "tax-rate": 30,
    },
    {
      "primary-goal": "retirement",
      "time-horizon": "over-15",
      "employer-match": "no",
      contribution: 5000,
      "tax-rate": 30,
    },
    {
      "primary-goal": "flexibility",
      "time-horizon": "under-5",
      "employer-match": "no",
      contribution: 5000,
      "tax-rate": 30,
    },
  ],
  "home-readiness": [
    {
      timeline: "over-3",
      "target-price": 700000,
      "down-payment": 20000,
      "closing-reserve": 2000,
      "gross-income": 140000,
      "monthly-debt": 800,
      "emergency-months": 0,
    },
    {
      timeline: "1-3",
      "target-price": 700000,
      "down-payment": 60000,
      "closing-reserve": 2000,
      "gross-income": 140000,
      "monthly-debt": 800,
      "emergency-months": 3,
    },
    {
      timeline: "under-1",
      "target-price": 700000,
      "down-payment": 60000,
      "closing-reserve": 16000,
      "gross-income": 140000,
      "monthly-debt": 800,
      "emergency-months": 3,
    },
  ],
};

export function getStaticJourneyContent(journeyId: JourneyId) {
  const results = representativeScenarios[journeyId].map(
    (responses) =>
      buildGuidedResult(journeyId, responses) as GuidedResult,
  );
  const primaryResult = results[0];
  const sourceIds = [...new Set(results.flatMap((result) => result.sourceIds))];
  const recommendations = guidedJourneyRecommendations[journeyId];

  return {
    outcomes: results.map(({ signal, headline, summary }) => ({
      signal,
      headline,
      summary,
    })),
    concepts: primaryResult.concepts,
    tradeoffs: primaryResult.tradeoffs,
    nextSteps: primaryResult.nextSteps,
    assumptions: primaryResult.assumptions,
    sources: getGuidedSources(sourceIds),
    articles: getGuidedRecommendations(
      "article",
      recommendations.articleSlugs,
    ),
    calculators: getGuidedRecommendations(
      "calculator",
      recommendations.calculatorSlugs,
    ),
  };
}
