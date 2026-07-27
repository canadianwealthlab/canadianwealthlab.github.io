import type { JourneyDefinition } from "@/lib/guided/types";

export const guidedJourneys: JourneyDefinition[] = [
  {
    id: "next-dollar",
    number: "01",
    title: "What should my next dollar do?",
    shortTitle: "Set my money priority",
    description:
      "Compare high-interest debt, emergency savings, and long-term investing in a practical sequence.",
    time: "About 3 minutes",
    outcome: "A staged priority map with tradeoffs and learning resources.",
    steps: [
      {
        id: "debt-rate",
        type: "choice",
        question: "What is the highest interest rate on debt you want to address?",
        helper:
          "Use the rate, not the balance. A credit card and a low-rate mortgage create very different tradeoffs.",
        options: [
          { value: "none", label: "No debt", description: "No debt is competing for this money." },
          { value: "under-7", label: "Under 7%", description: "Lower-cost debt, including many secured loans." },
          { value: "7-12", label: "7% to 12%", description: "A meaningful guaranteed cost." },
          { value: "over-12", label: "Over 12%", description: "High-cost debt that can compound quickly." },
        ],
      },
      {
        id: "emergency-months",
        type: "range",
        question: "How many months of essential expenses are readily available?",
        helper:
          "Count cash you could access quickly without selling long-term investments or borrowing.",
        min: 0,
        max: 12,
        step: 0.5,
        defaultValue: 2,
        suffix: " months",
      },
      {
        id: "income-stability",
        type: "choice",
        question: "How predictable is your household income?",
        helper: "This helps frame the value of a larger liquidity buffer.",
        options: [
          { value: "stable", label: "Predictable", description: "Income is regular and dependable." },
          { value: "variable", label: "Variable", description: "Income changes or depends on contracts or commissions." },
          { value: "uncertain", label: "Uncertain", description: "A near-term change or interruption is possible." },
        ],
      },
      {
        id: "employer-match",
        type: "choice",
        question: "Does an employer match part of your retirement contribution?",
        helper: "If you are unsure, check your plan documents before making a contribution decision.",
        options: [
          { value: "yes", label: "Yes", description: "A match is available and I may not be using all of it." },
          { value: "no", label: "No", description: "No employer match is available." },
          { value: "unsure", label: "Not sure", description: "I need to confirm the plan terms." },
        ],
      },
      {
        id: "monthly-amount",
        type: "money",
        question: "How much could you direct each month?",
        helper: "Use a sustainable amount. This value stays in your browser and is not saved.",
        placeholder: "500",
        max: 100000,
      },
    ],
  },
  {
    id: "registered-accounts",
    number: "02",
    title: "Which registered account should I learn about first?",
    shortTitle: "Compare TFSA, RRSP, and FHSA",
    description:
      "Use your goal, timing, and user-entered tax estimate to compare account features without treating one account as universally best.",
    time: "About 4 minutes",
    outcome: "A learning sequence, an illustrative tax estimate, and official sources.",
    steps: [
      {
        id: "primary-goal",
        type: "choice",
        question: "What is this money mainly for?",
        helper: "Choose the goal that would matter most if tradeoffs appear.",
        options: [
          { value: "first-home", label: "First home", description: "A qualifying home purchase is the main goal." },
          { value: "flexibility", label: "Flexible savings", description: "I may need the money for different goals." },
          { value: "retirement", label: "Retirement", description: "The money is mainly for future retirement income." },
        ],
      },
      {
        id: "first-home-status",
        type: "quiz",
        question: "Which statement best matches your first-home context?",
        helper:
          "This is an educational screen, not an FHSA eligibility determination. Verify the complete CRA definition.",
        showWhen: { stepId: "primary-goal", equals: "first-home" },
        options: [
          { value: "likely", label: "Likely eligible", description: "I believe I meet the CRA first-time home buyer conditions." },
          { value: "unsure", label: "Not sure", description: "I need to verify the ownership and residency rules." },
          { value: "not-eligible", label: "Likely not eligible", description: "I believe I do not meet the current conditions." },
        ],
      },
      {
        id: "time-horizon",
        type: "choice",
        question: "When might you use most of this money?",
        helper: "A shorter horizon usually increases the importance of stability and access.",
        options: [
          { value: "under-5", label: "Within 5 years", description: "The goal is relatively near." },
          { value: "5-15", label: "5 to 15 years", description: "There is a medium-term horizon." },
          { value: "over-15", label: "More than 15 years", description: "This is a long-term goal." },
        ],
      },
      {
        id: "employer-match",
        type: "choice",
        question: "Is an employer retirement match available?",
        helper: "Plan rules vary. Confirm contribution limits, vesting, and eligible account types.",
        options: [
          { value: "yes", label: "Yes", description: "A match is available and may not be fully used." },
          { value: "no", label: "No", description: "There is no employer match." },
          { value: "unsure", label: "Not sure", description: "I need to check my benefits." },
        ],
      },
      {
        id: "contribution",
        type: "money",
        question: "What contribution are you considering?",
        helper:
          "Do not exceed the room shown in your own CRA records. This amount is used only for an illustration.",
        placeholder: "5,000",
        max: 100000,
      },
      {
        id: "tax-rate",
        type: "range",
        question: "What marginal tax rate should the illustration use?",
        helper:
          "Enter your own combined federal and provincial estimate. This is not calculated from your income.",
        min: 10,
        max: 55,
        step: 1,
        defaultValue: 30,
        suffix: "%",
      },
    ],
  },
  {
    id: "home-readiness",
    number: "03",
    title: "How prepared am I for a home purchase?",
    shortTitle: "Check home-buying readiness",
    description:
      "Check the down payment, closing-cost reserve, emergency cushion, and debt load before seeking a lender quote.",
    time: "About 5 minutes",
    outcome: "A readiness signal with gaps, checkpoints, and deeper tools.",
    steps: [
      {
        id: "timeline",
        type: "choice",
        question: "When are you hoping to buy?",
        helper: "Your timeline affects how much uncertainty the plan needs to absorb.",
        options: [
          { value: "under-1", label: "Within 1 year", description: "I am preparing to transact soon." },
          { value: "1-3", label: "1 to 3 years", description: "I am actively building the plan." },
          { value: "over-3", label: "More than 3 years", description: "This is an early-stage goal." },
        ],
      },
      {
        id: "target-price",
        type: "money",
        question: "What purchase price are you using for planning?",
        helper: "This is a scenario value, not an affordability result or lender approval.",
        placeholder: "700,000",
        max: 10000000,
      },
      {
        id: "down-payment",
        type: "money",
        question: "How much have you set aside for the down payment?",
        helper: "Keep separate reserves for closing, moving, repairs, and emergencies.",
        placeholder: "60,000",
        max: 10000000,
      },
      {
        id: "closing-reserve",
        type: "money",
        question: "How much is reserved for closing and immediate purchase costs?",
        helper:
          "Land transfer taxes, legal fees, inspections, adjustments, moving, and repairs vary.",
        placeholder: "15,000",
        max: 1000000,
      },
      {
        id: "gross-income",
        type: "money",
        question: "What annual gross household income should the screen use?",
        helper:
          "This is used only for a partial debt-load check. It is not a mortgage qualification calculation.",
        placeholder: "140,000",
        max: 10000000,
      },
      {
        id: "monthly-debt",
        type: "money",
        question: "What are your required monthly debt payments?",
        helper: "Include loans, credit cards, lines of credit, and support obligations where relevant.",
        placeholder: "800",
        max: 100000,
      },
      {
        id: "emergency-months",
        type: "range",
        question: "How many months of essential expenses would remain after buying?",
        helper: "Do not include money already assigned to the purchase.",
        min: 0,
        max: 12,
        step: 0.5,
        defaultValue: 3,
        suffix: " months",
      },
    ],
  },
];

export function getJourney(id: string) {
  return guidedJourneys.find((journey) => journey.id === id);
}
