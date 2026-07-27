export type JourneyId =
  | "next-dollar"
  | "registered-accounts"
  | "home-readiness";

export type GuidedResponse = string | number;
export type GuidedResponses = Record<string, GuidedResponse>;

export type ChoiceOption = {
  value: string;
  label: string;
  description: string;
};

export type ChoiceStep = {
  id: string;
  type: "choice" | "quiz";
  question: string;
  helper: string;
  options: ChoiceOption[];
  showWhen?: { stepId: string; equals: string };
};

export type RangeStep = {
  id: string;
  type: "range";
  question: string;
  helper: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  prefix?: string;
  suffix?: string;
  showWhen?: { stepId: string; equals: string };
};

export type MoneyStep = {
  id: string;
  type: "money";
  question: string;
  helper: string;
  placeholder: string;
  max: number;
  showWhen?: { stepId: string; equals: string };
};

export type GuidedStep = ChoiceStep | RangeStep | MoneyStep;

export type JourneyDefinition = {
  id: JourneyId;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  time: string;
  outcome: string;
  steps: GuidedStep[];
};

export type GuidedMetric = {
  label: string;
  value: string;
  detail: string;
};

export type GuidedResult = {
  signal: string;
  headline: string;
  summary: string;
  metrics: GuidedMetric[];
  concepts: Array<{ title: string; body: string }>;
  tradeoffs: Array<{ title: string; body: string }>;
  nextSteps: string[];
  articleSlugs: string[];
  calculatorSlugs: string[];
  sourceIds: string[];
  assumptions: string[];
};

export type GuidedSourceType = "official" | "educational" | "community";

export type GuidedSource = {
  id: string;
  type: GuidedSourceType;
  title: string;
  publisher: string;
  url: string;
  context: string;
  reviewed: string;
};
