export const clusterSlugs = [
  "housing",
  "investing",
  "retirement",
  "taxes",
  "money-management",
] as const;

export type ClusterSlug = (typeof clusterSlugs)[number];

export type Cluster = {
  slug: ClusterSlug;
  name: string;
  title: string;
  description: string;
  introduction: string;
  overview: string[];
  readingPath: string[];
  questions: string[];
  principles: Array<{ title: string; description: string }>;
  calculatorSlugs: string[];
};

export const clusters: Cluster[] = [
  {
    slug: "housing",
    name: "Housing",
    title: "Make a housing decision your finances can support",
    description:
      "Canadian guides and calculators for renting, buying, mortgages, prepayments, and the long-term cost of home ownership.",
    introduction:
      "Housing decisions combine financing, opportunity cost, taxes, maintenance, flexibility, and lifestyle. We separate those variables so you can compare realistic scenarios instead of relying on a single rule of thumb.",
    overview: [
      "A housing decision starts with the service required: a stable place to live, flexibility to move, space, location, and control. Financing comes next. Qualification rules determine what a lender may approve; household affordability determines what can be carried while preserving reserves, retirement saving, and other priorities.",
      "Compare renting and owning using the same holding period. Separate mortgage principal from interest, then include property tax, maintenance, insurance, fees, transaction costs, invested savings, and the risk that rates or plans change. For rental property, use net operating income, vacancy, management, financing, tax, and concentration rather than relying on appreciation.",
    ],
    readingPath: [
      "Set a household affordability limit and calculate the cash required at closing.",
      "Compare renting and buying over a realistic holding period.",
      "Choose mortgage rate, term, and amortization from cash-flow capacity rather than a forecast.",
      "Review renewal, prepayment, property-condition, and shared-building risks before they become urgent.",
    ],
    questions: [
      "Does buying improve my long-term position compared with renting?",
      "How much mortgage risk can my household comfortably carry?",
      "Should extra cash go to the mortgage or to investments?",
      "How do rates, amortization, and prepayment privileges change the outcome?",
    ],
    principles: [
      {
        title: "Compare total costs",
        description:
          "A mortgage payment is not directly comparable with rent. Include equity, interest, maintenance, transaction costs, taxes, and invested savings.",
      },
      {
        title: "Stress-test the downside",
        description:
          "A defensible plan should survive higher renewal rates, repairs, income disruption, and a longer-than-expected holding period.",
      },
      {
        title: "Value flexibility",
        description:
          "Mobility, career choices, and liquidity have economic value even when they do not appear on a mortgage statement.",
      },
    ],
    calculatorSlugs: ["rent-vs-buy", "mortgage-prepayment"],
  },
  {
    slug: "investing",
    name: "Investing",
    title: "Build an investment plan around the decision, not the product",
    description:
      "Independent Canadian investing guides covering registered accounts, diversified ETFs, portfolio design, fees, and investor behaviour.",
    introduction:
      "Good investing is usually less about finding a winning product and more about aligning risk, time horizon, taxes, costs, and behaviour. Our comparisons focus on the differences that can materially affect a Canadian investor.",
    overview: [
      "Investing begins only after the goal and withdrawal date are known. Short-term liabilities need stability; long-term goals can accept more market risk when the household can remain invested. Asset allocation, diversification, savings, fees, taxes, and behaviour have more durable influence than selecting a recent winner.",
      "CWL does not predict markets or recommend guaranteed securities. The Guides explain legitimate tradeoffs: active and passive implementation, one-fund and multi-fund portfolios, Canadian and global exposure, dividend and total-return approaches, and the roles of cash, GICs, bonds, and equities. Product evaluation follows the policy, not the other way around.",
    ],
    readingPath: [
      "Decide whether the goal should be saved for or invested, then choose an asset allocation.",
      "Write diversification, contribution, and rebalancing rules.",
      "Evaluate ETFs and services by exposure, all-in cost, tax, and maintainability.",
      "Prepare for market declines and concentrated positions before they occur.",
    ],
    questions: [
      "Should I prioritize a TFSA, RRSP, or both?",
      "Does an all-equity portfolio match my ability to tolerate losses?",
      "Which ETF differences matter and which are mostly noise?",
      "How do fees, taxes, and rebalancing affect long-term results?",
    ],
    principles: [
      {
        title: "Start with risk capacity",
        description:
          "An investment can be broadly diversified and still be inappropriate if the investor cannot tolerate its potential drawdowns.",
      },
      {
        title: "Separate account from investment",
        description:
          "A TFSA or RRSP is a tax structure. The investments held inside determine market exposure and risk.",
      },
      {
        title: "Prefer durable decisions",
        description:
          "Simple, low-cost choices that an investor can maintain often beat theoretically optimal plans that invite constant changes.",
      },
    ],
    calculatorSlugs: ["tfsa-vs-rrsp"],
  },
  {
    slug: "retirement",
    name: "Retirement & Financial Independence",
    title: "Turn retirement from a target into a working plan",
    description:
      "Canadian retirement planning guides covering spending, CPP, OAS, pensions, withdrawals, taxes, and financial independence.",
    introduction:
      "Retirement is an income-planning problem, not just a savings target. A useful plan connects expected spending with public benefits, workplace pensions, personal savings, taxes, inflation, and uncertainty.",
    overview: [
      "Financial independence describes the point at which work income is no longer required to support the chosen spending plan. It is not an objectively superior lifestyle. Retirement planning estimates that spending, subtracts reliable CPP or QPP, OAS, and pension income, and determines what personal assets must fund after tax.",
      "The central risks are longevity, inflation, weak early returns, excessive withdrawals, tax concentration, and inflexible spending. A sound plan uses return ranges, personal benefit estimates, account-specific taxation, and a response to poor outcomes. Withdrawal-rate research provides context but cannot guarantee a Canadian household's future.",
    ],
    readingPath: [
      "Estimate spending and reliable income before selecting a portfolio target.",
      "Model withdrawal rates, taxes, inflation, and sequence risk as ranges.",
      "Coordinate CPP, OAS, pensions, RRSP or RRIF, TFSA, and taxable assets by year.",
      "Stress-test housing debt, survivor income, and flexible spending before retirement begins.",
    ],
    questions: [
      "How much of my retirement spending must my portfolio fund?",
      "How should CPP, OAS, and workplace pensions affect my target?",
      "What withdrawal rate is reasonable for my time horizon?",
      "How sensitive is my plan to inflation and weak early returns?",
    ],
    principles: [
      {
        title: "Plan from spending",
        description:
          "Begin with the lifestyle the plan must fund, then subtract reliable income before estimating the portfolio requirement.",
      },
      {
        title: "Model a range",
        description:
          "Returns, inflation, longevity, and taxes are uncertain. A range of outcomes is more useful than a single precise forecast.",
      },
      {
        title: "Revisit the plan",
        description:
          "Retirement planning is an ongoing process. Update assumptions when spending, benefits, markets, or family circumstances change.",
      },
    ],
    calculatorSlugs: ["fire"],
  },
  {
    slug: "taxes",
    name: "Tax Strategy",
    title: "Understand the tax mechanics behind the decision",
    description:
      "Plain-language Canadian tax guides explaining marginal rates, registered-plan deductions, investment income, and retirement taxation.",
    introduction:
      "Tax rules can materially change a financial decision, but tax reduction is not the only objective. This cluster explains the mechanics, identifies the assumptions that vary by person and province, and points readers to official sources.",
    overview: [
      "Tax Strategy starts with the current law for the relevant year and jurisdiction. Federal and provincial or territorial systems interact, and Quebec administers its own provincial tax. Marginal rates, deductions, credits, benefits, and account withdrawals can all change the incremental result.",
      "The Guides cover ordinary personal, registered-account, investment, self-employment, and owner-manager mechanics. They do not promote aggressive arrangements. A tax result should be compared with cash flow, fees, investment suitability, future withdrawals, and administration. Current CRA and provincial sources control when rules change.",
    ],
    readingPath: [
      "Understand how taxable income, brackets, deductions, credits, and filing fit together.",
      "Compare TFSA, RRSP, and FHSA using personal room and current tax context.",
      "Maintain adjusted-cost-base and investment-income records before taxable transactions accumulate.",
      "Use year-end and filing checklists, and obtain advice for material self-employment or corporate decisions.",
    ],
    questions: [
      "What is the difference between marginal and average tax rates?",
      "When is an RRSP deduction most valuable?",
      "How are interest, dividends, and capital gains treated differently?",
      "Which tax details require current CRA or provincial guidance?",
    ],
    principles: [
      {
        title: "Use current primary sources",
        description:
          "Contribution limits, brackets, credits, and program rules can change. Time-sensitive claims should be checked against government guidance.",
      },
      {
        title: "Show jurisdiction limits",
        description:
          "Federal and provincial rules interact. Examples must identify what is included and what may vary by province.",
      },
      {
        title: "Avoid false precision",
        description:
          "A general illustration cannot reproduce a complete tax return or account for every credit, benefit, deduction, or family circumstance.",
      },
    ],
    calculatorSlugs: ["tfsa-vs-rrsp"],
  },
  {
    slug: "money-management",
    name: "Money Management",
    title: "Build the financial capacity behind every long-term goal",
    description:
      "Practical Canadian guidance for budgeting, emergency savings, debt repayment, cash flow, and net worth.",
    introduction:
      "Investing and retirement plans depend on a resilient financial base. This cluster focuses on liquidity, debt, spending, and the everyday systems that make longer-term decisions sustainable.",
    overview: [
      "Money management is the operating layer of a financial plan. It makes reliable cash flow visible, reserves predictable irregular costs, controls expensive debt, and directs a sustainable surplus toward goals. It does not require moral judgments about spending or a budget category for every purchase.",
      "A resilient system matches cash with near-term obligations and protects long-term assets from forced sales. Debt decisions compare certain interest savings with uncertain after-tax returns. Major purchases use full ownership and opportunity cost. Couples and variable-income households can use different structures as long as obligations, ownership, and decision rules remain clear.",
    ],
    readingPath: [
      "Build a personal money system and identify the true sustainable surplus.",
      "Separate irregular expenses from emergency cash and match short-term money to its date.",
      "Compare debt repayment, investing, and major purchases on the same after-tax basis.",
      "Measure progress and complete one focused annual review.",
    ],
    questions: [
      "How much emergency liquidity does my household need?",
      "Should extra cash go to debt, savings, or investing?",
      "Which expenses are fixed, flexible, irregular, or avoidable?",
      "Is my net worth improving even when monthly cash flow varies?",
    ],
    principles: [
      {
        title: "Protect the base",
        description:
          "Emergency liquidity and adequate insurance can prevent a temporary disruption from becoming expensive long-term debt.",
      },
      {
        title: "Prioritize by impact",
        description:
          "Interest cost, tax treatment, liquidity, and risk matter more than following a universal debt or savings rule.",
      },
      {
        title: "Use repeatable systems",
        description:
          "A simple process for saving, reviewing, and adjusting is more valuable than a budget that works only in a perfect month.",
      },
    ],
    calculatorSlugs: [],
  },
];

export function getCluster(slug: string) {
  return clusters.find((cluster) => cluster.slug === slug);
}
