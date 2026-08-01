export type JourneyId =
  | "next-dollar"
  | "retirement-readiness"
  | "mortgage-vs-invest"
  | "registered-accounts"
  | "home-readiness"
  | "debt-plan";

export type DebtItem = {
  id: string;
  type: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  security: "secured" | "unsecured";
  rateType: "fixed" | "variable" | "promotional";
  status: "current" | "past-due" | "collections";
};

export type GuidedResponse = string | number | DebtItem[];
export type GuidedResponses = Record<string, GuidedResponse>;

export type ShowCondition = {
  stepId: string;
  equals?: GuidedResponse;
  notEquals?: GuidedResponse;
  oneOf?: GuidedResponse[];
  greaterThan?: number;
};

type StepBase = {
  id: string;
  question: string;
  helper: string;
  optional?: boolean;
  shared?: boolean;
  showWhen?: ShowCondition | ShowCondition[];
};

export type ChoiceOption = {
  value: string;
  label: string;
  description: string;
};

export type ChoiceStep = StepBase & {
  type: "choice" | "quiz";
  options: ChoiceOption[];
};

export type RangeStep = StepBase & {
  type: "range";
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  prefix?: string;
  suffix?: string;
};

export type MoneyStep = StepBase & {
  type: "money";
  placeholder: string;
  max: number;
  allowUnknown?: boolean;
  unknownHelp?: string;
};

export type CheckpointStep = StepBase & {
  type: "checkpoint";
  body: string[];
  sourceId?: string;
  articleHref?: string;
  articleLabel?: string;
};

export type DebtListStep = StepBase & {
  type: "debt-list";
  maxItems: number;
};

export type GuidedStep =
  | ChoiceStep
  | RangeStep
  | MoneyStep
  | CheckpointStep
  | DebtListStep;

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

export type GuidedScenario = {
  label: string;
  values: string[];
  note?: string;
};

export type GuidedResult = {
  signal: string;
  headline: string;
  summary: string;
  heard: string[];
  spectrum?: { left: string; right: string; position: number; label: string };
  metrics: GuidedMetric[];
  scenarioColumns: string[];
  scenarios: GuidedScenario[];
  concepts: Array<{ title: string; body: string }>;
  tradeoffs: Array<{ title: string; body: string }>;
  alternativeFactors: string[];
  nextSteps: string[];
  missingInformation: string[];
  professionalAdvice: string[];
  reviseStepIds: string[];
  timeline?: Array<{ label: string; value: string; detail: string }>;
  articleSlugs: string[];
  calculatorSlugs: string[];
  sourceIds: string[];
  assumptions: string[];
  urgentSupport?: boolean;
};

export type GuidedSourceType = "official" | "educational" | "community";

export type GuidedSource = {
  id: string;
  type: GuidedSourceType;
  title: string;
  publisher: string;
  url: string;
  context: string;
  jurisdiction: string;
  reviewed: string;
  effectiveDate?: string;
};
