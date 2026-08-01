import type { GuidedStep, JourneyDefinition } from "@/lib/guided/types";

const incomeStability: GuidedStep = {
  id: "income-stability", type: "choice", shared: true,
  question: "How predictable is your household income?",
  helper: "Income stability affects the value of liquidity and the risk of fixed commitments.",
  options: [
    { value: "stable", label: "Predictable", description: "Income is regular and dependable." },
    { value: "variable", label: "Variable", description: "Income changes with contracts, commissions, or seasons." },
    { value: "uncertain", label: "Uncertain", description: "A near-term change or interruption is possible." },
  ],
};

const emergencyMonths: GuidedStep = {
  id: "emergency-months", type: "range", shared: true,
  question: "How many months of essential expenses are readily available?",
  helper: "Count cash available without selling long-term investments or borrowing.",
  min: 0, max: 12, step: 0.5, defaultValue: 3, suffix: " months",
};

const province: GuidedStep = {
  id: "province", type: "choice", shared: true,
  question: "Where do you live?",
  helper: "Province can affect tax, housing costs, and available programs. This experience does not calculate provincial tax.",
  options: [
    { value: "bc", label: "British Columbia", description: "Use British Columbia as context." },
    { value: "ab", label: "Alberta", description: "Use Alberta as context." },
    { value: "on", label: "Ontario", description: "Use Ontario as context." },
    { value: "qc", label: "Quebec", description: "Use Quebec as context." },
    { value: "other", label: "Elsewhere in Canada", description: "Use federal guidance only." },
  ],
};

const nextDollar: JourneyDefinition = {
  id: "next-dollar", number: "01", title: "What should my next dollar do?",
  shortTitle: "Set my money priority",
  description: "Compare high-interest debt, emergency savings, and long-term investing in a practical sequence.",
  time: "About 3 minutes", outcome: "A staged priority map with tradeoffs and learning resources.",
  steps: [
    {
      id: "debt-rate", type: "choice", question: "What is the highest interest rate on debt you want to address?",
      helper: "Use the rate, not the balance. A credit card and a low-rate mortgage create very different tradeoffs.",
      options: [
        { value: "none", label: "No debt", description: "No debt is competing for this money." },
        { value: "under-7", label: "Under 7%", description: "Lower-cost debt, including many secured loans." },
        { value: "7-12", label: "7% to 12%", description: "A meaningful guaranteed cost." },
        { value: "over-12", label: "Over 12%", description: "High-cost debt that can compound quickly." },
      ],
    },
    emergencyMonths,
    incomeStability,
    {
      id: "employer-match", type: "choice", question: "Does an employer match part of your retirement contribution?",
      helper: "If you are unsure, check your plan documents before making a contribution decision.",
      options: [
        { value: "yes", label: "Yes", description: "A match is available and I may not be using all of it." },
        { value: "no", label: "No", description: "No employer match is available." },
        { value: "unsure", label: "Not sure", description: "I need to confirm the plan terms." },
      ],
    },
    { id: "monthly-amount", type: "money", question: "How much could you direct each month?", helper: "Use a sustainable amount. This value stays in this browser tab.", placeholder: "500", max: 100000 },
  ],
};

const retirement: JourneyDefinition = {
  id: "retirement-readiness", number: "02", title: "Am I on track for retirement?",
  shortTitle: "Check retirement readiness",
  description: "Test a retirement range using your spending, savings, timing, and expected income sources.",
  time: "About 7 minutes", outcome: "A cautious-to-optimistic projection, gap range, and practical levers.",
  steps: [
    province,
    { id: "household", type: "choice", shared: true, question: "Who is this retirement plan for?", helper: "Use the people whose savings, spending, and income you will include.", options: [
      { value: "one", label: "One person", description: "A single-person plan." },
      { value: "couple", label: "Two people", description: "A combined household plan." },
    ] },
    { id: "current-age", type: "range", question: "What is your current age?", helper: "Use your age for this directional projection.", min: 18, max: 75, step: 1, defaultValue: 40, suffix: " years" },
    { id: "retirement-age", type: "range", question: "At what age might retirement begin?", helper: "You can revise this assumption from the results.", min: 45, max: 75, step: 1, defaultValue: 65, suffix: " years" },
    { id: "partner-age", type: "range", question: "What is your partner's current age?", helper: "This helps identify timing differences. The projection still uses one shared horizon.", min: 18, max: 75, step: 1, defaultValue: 40, suffix: " years", showWhen: { stepId: "household", equals: "couple" } },
    { id: "retirement-spending", type: "money", question: "What does the household spend in a typical month today?", helper: "Include recurring living costs, but not savings contributions. A rough value is enough.", placeholder: "5,000", max: 100000 },
    { id: "spending-change", type: "choice", question: "How might retirement spending compare with today?", helper: "This is a scenario assumption, not a rule.", options: [
      { value: "lower", label: "About 20% lower", description: "Some work, mortgage, or savings costs may fall." },
      { value: "same", label: "About the same", description: "Lower costs may be replaced by travel, care, or other goals." },
      { value: "higher", label: "About 20% higher", description: "Travel, housing, family, or care may increase spending." },
    ] },
    { id: "retirement-checkpoint", type: "checkpoint", question: "A useful retirement target starts with spending", helper: "Portfolio targets are more meaningful when linked to the annual spending your investments must support.", body: ["Government benefits and pensions can cover part of spending.", "The remaining amount must come from savings, work, or a change in timing.", "Return and withdrawal assumptions create a range, not a promise."], sourceId: "fcac-retirement", articleHref: "/retirement/how-much-to-retire", articleLabel: "Read the retirement target guide" },
    { id: "current-assets", type: "money", question: "How much is currently invested for retirement?", helper: "Include retirement-focused RRSP, TFSA, workplace plan, and non-registered investments. Exclude your home unless you plan to use its value.", placeholder: "250,000", max: 50000000 },
    { id: "annual-contributions", type: "money", question: "How much do you add each year?", helper: "Include employer contributions. Use a sustainable total.", placeholder: "15,000", max: 1000000 },
    { id: "pension-income", type: "money", question: "What annual employer pension income do you expect?", helper: "Enter today's-dollar annual income. Use zero if none, or choose unknown.", placeholder: "20,000", max: 1000000, allowUnknown: true, unknownHelp: "The results will flag this for verification." },
    { id: "cpp-income", type: "money", question: "What combined annual CPP or QPP income should we use?", helper: "Use an estimate from official records when possible. Benefits vary by contribution history and start age.", placeholder: "15,000", max: 100000, allowUnknown: true },
    { id: "oas-income", type: "money", question: "What combined annual OAS income should we use?", helper: "Eligibility, residence history, age, and income can change the amount.", placeholder: "9,000", max: 100000, allowUnknown: true },
    { id: "other-income", type: "money", question: "Any other reliable annual retirement income?", helper: "Include only income you reasonably expect to continue. Use zero if none.", placeholder: "0", max: 1000000 },
    { id: "retirement-flexibility", type: "choice", question: "Which lever feels most flexible if the middle scenario is short?", helper: "The results will quantify each lever directionally.", options: [
      { value: "save", label: "Save more", description: "Increase annual contributions." },
      { value: "later", label: "Retire later", description: "Add saving years and reduce withdrawal years." },
      { value: "spend", label: "Spend less", description: "Lower the portfolio-supported target." },
      { value: "work", label: "Earn part-time income", description: "Reduce early withdrawals with work income." },
    ] },
  ],
};

const mortgageVsInvest: JourneyDefinition = {
  id: "mortgage-vs-invest", number: "03", title: "Should I prepay my mortgage or invest?",
  shortTitle: "Compare mortgage and investing",
  description: "Compare a guaranteed mortgage cost avoided with a range of uncertain investment outcomes.",
  time: "About 6 minutes", outcome: "Mortgage, investment, and split scenarios with a decision spectrum.",
  steps: [
    { id: "available-amount", type: "money", question: "How much money are you deciding about?", helper: "Use money available after required payments and near-term commitments.", placeholder: "20,000", max: 5000000 },
    emergencyMonths, incomeStability,
    { id: "high-interest-debt", type: "choice", question: "Do you have debt above the mortgage rate?", helper: "Higher-cost debt may deserve attention before either option.", options: [
      { value: "none", label: "No", description: "No higher-rate debt competes with this money." },
      { value: "some", label: "Yes", description: "Some debt costs more than the mortgage." },
      { value: "unsure", label: "Not sure", description: "I need to compare rates and terms." },
    ] },
    { id: "mortgage-balance", type: "money", question: "What is the remaining mortgage balance?", helper: "Use the balance on the latest statement.", placeholder: "400,000", max: 10000000 },
    { id: "mortgage-rate", type: "range", question: "What is the current mortgage interest rate?", helper: "Use the annual contract rate.", min: 0, max: 15, step: 0.05, defaultValue: 5, suffix: "%" },
    { id: "mortgage-years", type: "range", question: "How many years remain in the amortization?", helper: "Round to the nearest year for this comparison.", min: 1, max: 30, step: 1, defaultValue: 20, suffix: " years" },
    { id: "prepayment-limit", type: "money", question: "How much can you prepay without a charge?", helper: "Check your contract for annual privileges, timing, and other conditions. Choose unknown if needed.", placeholder: "40,000", max: 5000000, allowUnknown: true },
    { id: "mortgage-checkpoint", type: "checkpoint", question: "The two returns are not equally certain", helper: "A mortgage prepayment and an investment can both improve net worth, but the paths differ.", body: ["Mortgage interest avoided is a predictable, after-tax benefit when no charge applies.", "Investment returns are uncertain and may be negative over shorter periods.", "Liquidity, account tax treatment, and personal comfort can matter as much as the midpoint."], sourceId: "fcac-prepayment", articleHref: "/mortgages/pay-off-mortgage-or-invest", articleLabel: "Read the full comparison" },
    { id: "investment-account", type: "choice", question: "Where would the investment go?", helper: "Tax treatment changes the break-even comparison. Room is not verified here.", options: [
      { value: "tfsa", label: "TFSA", description: "Growth and withdrawals are generally tax-free." },
      { value: "rrsp", label: "RRSP", description: "Contributions may be deductible and withdrawals are generally taxable." },
      { value: "taxable", label: "Non-registered", description: "Investment income and gains may be taxable." },
      { value: "unknown", label: "Not sure", description: "Compare without assuming a final account choice." },
    ] },
    { id: "tax-rate", type: "range", question: "What marginal tax rate should a taxable illustration use?", helper: "Enter your own combined estimate. This is not calculated from income.", min: 10, max: 55, step: 1, defaultValue: 30, suffix: "%", showWhen: { stepId: "investment-account", equals: "taxable" } },
    { id: "investment-horizon", type: "range", question: "How many years could the money remain invested?", helper: "A longer horizon can absorb more market variability, but does not guarantee a gain.", min: 1, max: 30, step: 1, defaultValue: 10, suffix: " years" },
    { id: "loss-comfort", type: "choice", question: "How would a 20% temporary investment decline affect you?", helper: "Use the answer that best reflects what you would actually do.", options: [
      { value: "sell", label: "I might sell", description: "A large decline could change my plan." },
      { value: "uneasy", label: "I would be uneasy", description: "I could likely stay invested with difficulty." },
      { value: "hold", label: "I would stay invested", description: "Short-term declines fit my plan and horizon." },
    ] },
    { id: "priority", type: "choice", question: "What matters most in this decision?", helper: "This helps place you on a spectrum, not declare a universal winner.", options: [
      { value: "certainty", label: "Certainty", description: "Reduce debt and fixed obligations." },
      { value: "balance", label: "Balance", description: "Keep both options moving." },
      { value: "growth", label: "Long-term growth", description: "Accept uncertainty for investment potential." },
      { value: "liquidity", label: "Liquidity", description: "Keep money more accessible." },
    ] },
  ],
};

const accounts: JourneyDefinition = {
  id: "registered-accounts", number: "04", title: "How should I allocate between TFSA, RRSP, and FHSA?",
  shortTitle: "Allocate registered savings",
  description: "Build an account sequence from your goal, eligibility, verified room, tax timing, and need for access.",
  time: "About 6 minutes", outcome: "A dollar allocation example, sequence, and unresolved checks.",
  steps: [
    province,
    { id: "primary-goal", type: "choice", question: "What is this money mainly for?", helper: "Choose the goal that should lead if tradeoffs appear.", options: [
      { value: "first-home", label: "First home", description: "A qualifying home purchase is the main goal." },
      { value: "flexibility", label: "Flexible savings", description: "The money may support different goals." },
      { value: "retirement", label: "Retirement", description: "The money is mainly for retirement income." },
    ] },
    { id: "first-home-status", type: "choice", question: "Do you believe you meet the FHSA first-time home buyer conditions?", helper: "Verify the full CRA definition before opening or contributing.", showWhen: { stepId: "primary-goal", equals: "first-home" }, options: [
      { value: "likely", label: "Likely eligible", description: "I believe I meet the conditions." },
      { value: "unsure", label: "Not sure", description: "I need to verify ownership and residency rules." },
      { value: "not-eligible", label: "Likely not eligible", description: "I believe I do not meet the conditions." },
    ] },
    { id: "time-horizon", type: "choice", question: "When might you use most of this money?", helper: "The account and the investments inside it are separate decisions.", options: [
      { value: "under-5", label: "Within 5 years", description: "Stability and access may matter more." },
      { value: "5-15", label: "5 to 15 years", description: "A medium-term horizon." },
      { value: "over-15", label: "More than 15 years", description: "A long-term goal." },
    ] },
    { id: "annual-savings", type: "money", question: "How much will you allocate over the next year?", helper: "Use new savings, excluding money already contributed.", placeholder: "12,000", max: 1000000 },
    { id: "employer-match", type: "choice", question: "Is an employer retirement match available?", helper: "Confirm eligible contributions, limits, and vesting with the plan.", options: [
      { value: "yes", label: "Yes", description: "A match may not be fully used." },
      { value: "no", label: "No", description: "No match is available." },
      { value: "unsure", label: "Not sure", description: "I need to check my benefits." },
    ] },
    { id: "match-contribution", type: "money", question: "How much would capture the full annual match?", helper: "Enter only your required contribution, not the employer portion.", placeholder: "3,000", max: 100000, allowUnknown: true, showWhen: { stepId: "employer-match", equals: "yes" } },
    { id: "accounts-checkpoint", type: "checkpoint", question: "Contribution room is personal", helper: "Annual headline limits are not the same as your available room.", body: ["Check current room using CRA records and your own transaction history.", "TFSA withdrawals restore room in a later calendar year, not immediately.", "RRSP withdrawals generally do not restore room. FHSA rules include annual and lifetime limits."], sourceId: "cra-room", articleHref: "/investing/tfsa-rrsp-fhsa", articleLabel: "Compare the account rules" },
    { id: "tfsa-room", type: "money", question: "How much verified TFSA room is available?", helper: "Use your own records and CRA information. Choose unknown rather than guessing.", placeholder: "20,000", max: 5000000, allowUnknown: true },
    { id: "rrsp-room", type: "money", question: "How much verified RRSP deduction room is available?", helper: "Use the latest notice of assessment or CRA records.", placeholder: "30,000", max: 5000000, allowUnknown: true },
    { id: "fhsa-room", type: "money", question: "How much verified FHSA participation room is available?", helper: "Use zero if ineligible. Choose unknown if you need to verify.", placeholder: "8,000", max: 40000, allowUnknown: true, showWhen: { stepId: "primary-goal", equals: "first-home" } },
    { id: "current-tax-rate", type: "range", question: "What is your current marginal tax rate estimate?", helper: "Use a combined federal and provincial estimate. This is not calculated from income.", min: 10, max: 55, step: 1, defaultValue: 30, suffix: "%" },
    { id: "future-tax-rate", type: "choice", question: "How might your tax rate when withdrawing compare with today?", helper: "This is uncertain. Use the closest planning assumption.", options: [
      { value: "lower", label: "Likely lower", description: "Future taxable income may be lower." },
      { value: "similar", label: "Likely similar", description: "No clear tax-rate change expected." },
      { value: "higher", label: "Possibly higher", description: "Future income or tax rates may be higher." },
      { value: "unknown", label: "Unknown", description: "Do not lean heavily on this assumption." },
    ] },
    { id: "flexibility", type: "choice", question: "Could you need the money before the main goal?", helper: "Access rules can outweigh an estimated tax advantage.", options: [
      { value: "high", label: "Quite possibly", description: "Flexibility is important." },
      { value: "some", label: "Maybe", description: "Some access would be useful." },
      { value: "low", label: "Unlikely", description: "The money can stay committed." },
    ] },
  ],
};

const home: JourneyDefinition = {
  id: "home-readiness", number: "05", title: "What can I comfortably afford, and should I rent or buy?",
  shortTitle: "Test home affordability",
  description: "Separate lender qualification, personal comfort, upfront cash, and rent-versus-buy uncertainty.",
  time: "About 8 minutes", outcome: "Three readiness signals and 5, 10, and 15-year housing scenarios.",
  steps: [
    province,
    { id: "timeline", type: "choice", question: "When are you hoping to buy?", helper: "Your timeline affects how much uncertainty the plan needs to absorb.", options: [
      { value: "under-1", label: "Within 1 year", description: "Preparing to transact soon." },
      { value: "1-3", label: "1 to 3 years", description: "Actively building the plan." },
      { value: "over-3", label: "More than 3 years", description: "An early-stage goal." },
    ] },
    { id: "target-price", type: "money", question: "What purchase price are you testing?", helper: "This is a scenario, not a lender approval.", placeholder: "700,000", max: 10000000 },
    { id: "purchase-cash", type: "money", question: "How much total cash is available for the purchase?", helper: "Include the planned down payment and purchase reserves, but exclude the emergency fund you want to keep.", placeholder: "100,000", max: 10000000 },
    { id: "down-payment", type: "money", question: "How much of that cash would be the down payment?", helper: "The remainder must cover closing, moving, repairs, and any other purchase costs.", placeholder: "70,000", max: 10000000 },
    { id: "closing-costs", type: "money", question: "What are your estimated closing costs?", helper: "Use province-specific tax, legal, inspection, adjustment, and insurance estimates.", placeholder: "15,000", max: 1000000 },
    { id: "moving-repairs", type: "money", question: "What is reserved for moving and immediate repairs?", helper: "Keep this separate from the down payment and closing costs.", placeholder: "8,000", max: 1000000 },
    emergencyMonths,
    { id: "gross-income", type: "money", question: "What annual gross household income should the screen use?", helper: "Income is used for directional ratios only.", placeholder: "140,000", max: 10000000 },
    { id: "monthly-debt", type: "money", question: "What are your required monthly debt payments?", helper: "Include loans, credit cards, lines of credit, and support obligations where relevant.", placeholder: "800", max: 100000 },
    { id: "housing-checkpoint", type: "checkpoint", question: "Approval, affordability, and comfort are different", helper: "A lender's maximum is not a personal spending target.", body: ["Qualification considers current rules and complete obligations.", "Comfort also includes maintenance, saving, lifestyle, and resilience to rate or income changes.", "A pre-approval is not a final approval or a guarantee."], sourceId: "osfi-mqr", articleHref: "/home-buying/how-much-house-can-i-afford", articleLabel: "Read the affordability guide" },
    { id: "mortgage-rate", type: "range", question: "What mortgage rate should the scenario use?", helper: "Use a current quote if available. Qualification may use a higher rate.", min: 0, max: 15, step: 0.05, defaultValue: 5, suffix: "%" },
    { id: "amortization", type: "choice", question: "What amortization should the scenario use?", helper: "Eligibility for longer amortizations depends on current rules and mortgage details.", options: [
      { value: "20", label: "20 years", description: "Higher payments, faster principal repayment." },
      { value: "25", label: "25 years", description: "A common planning period." },
      { value: "30", label: "30 years", description: "Lower payments, more total interest, if eligible." },
    ] },
    { id: "property-tax", type: "money", question: "Estimated annual property tax?", helper: "Use the target property's local estimate.", placeholder: "5,000", max: 100000 },
    { id: "home-type", type: "choice", question: "What type of home are you considering?", helper: "This affects recurring costs and maintenance assumptions.", options: [
      { value: "freehold", label: "Freehold", description: "No regular condo fee assumed." },
      { value: "condo", label: "Condo or strata", description: "Include monthly fees and special-assessment risk." },
    ] },
    { id: "condo-fees", type: "money", question: "Estimated monthly condo or strata fees?", helper: "Review what the fee includes and reserve-fund information.", placeholder: "500", max: 10000, showWhen: { stepId: "home-type", equals: "condo" } },
    { id: "utilities", type: "money", question: "Estimated monthly utilities?", helper: "Include utilities not covered by fees.", placeholder: "250", max: 10000 },
    { id: "home-insurance", type: "money", question: "Estimated annual home insurance?", helper: "Use a quote when possible.", placeholder: "1,800", max: 100000 },
    { id: "maintenance", type: "money", question: "How much would you reserve annually for maintenance?", helper: "Actual costs are uneven and property-specific.", placeholder: "7,000", max: 1000000 },
    { id: "monthly-rent", type: "money", question: "What is the comparable monthly rent?", helper: "Compare similar location, space, and utility coverage.", placeholder: "2,800", max: 100000 },
    { id: "holding-period", type: "choice", question: "How long are you reasonably likely to stay?", helper: "Transaction costs make short ownership periods more sensitive to assumptions.", options: [
      { value: "under-5", label: "Under 5 years", description: "Plans may change relatively soon." },
      { value: "5-10", label: "5 to 10 years", description: "A medium holding period." },
      { value: "over-10", label: "More than 10 years", description: "A longer ownership horizon." },
      { value: "unknown", label: "Not sure", description: "Flexibility has meaningful value." },
    ] },
  ],
};

const debt: JourneyDefinition = {
  id: "debt-plan", number: "06", title: "How can I build a debt payoff plan?",
  shortTitle: "Build a debt payoff plan",
  description: "Organize debts, test avalanche and snowball methods, and identify when outside help matters.",
  time: "About 7 minutes", outcome: "A payoff order, timeline range, first 30-day plan, and support checkpoints.",
  steps: [
    { id: "payment-affordability", type: "choice", question: "Can you currently cover essential costs and all required debt payments?", helper: "Answer based on the next 30 days, not an ideal month.", options: [
      { value: "yes", label: "Yes", description: "Required payments are currently manageable." },
      { value: "tight", label: "Barely", description: "Payments leave little room for essentials or surprises." },
      { value: "no", label: "No", description: "I cannot cover all requirements." },
    ] },
    { id: "account-status", type: "choice", question: "Are any debts past due, in collections, or subject to legal action?", helper: "Urgent status can change the priority from optimization to stabilization and professional support.", options: [
      { value: "current", label: "All current", description: "No known missed payments or collections." },
      { value: "past-due", label: "Past due", description: "At least one payment is late." },
      { value: "collections", label: "Collections or legal action", description: "At least one account has escalated." },
    ] },
    { id: "borrowing-essentials", type: "choice", question: "Are you using credit for essentials such as food, housing, or utilities?", helper: "This can signal a cash-flow emergency that a payoff order alone will not solve.", options: [
      { value: "no", label: "No", description: "Current income covers essentials." },
      { value: "sometimes", label: "Sometimes", description: "Credit occasionally bridges essential costs." },
      { value: "often", label: "Often", description: "Credit regularly funds essentials." },
    ] },
    { id: "debt-support-checkpoint", type: "checkpoint", question: "Safety comes before optimization", helper: "If required payments or essentials are not manageable, get qualified help early.", body: ["Contact creditors before missing more payments where possible.", "A reputable credit counsellor can explain options, costs, and tradeoffs.", "Only a Licensed Insolvency Trustee can administer consumer proposals and bankruptcies in Canada."], sourceId: "fcac-debt-help", articleHref: "/money-management/debt-or-invest", articleLabel: "Read the debt and investing guide" },
    { id: "debts", type: "debt-list", question: "Add the debts you want to include", helper: "Use current balances, annual rates, and required monthly payments. Values remain in this browser tab.", maxItems: 12 },
    { id: "extra-payment", type: "money", question: "How much extra can you pay each month?", helper: "Use a sustainable amount after essentials and required payments.", placeholder: "300", max: 100000 },
    emergencyMonths, incomeStability,
    { id: "payoff-style", type: "choice", question: "Which payoff style feels easier to sustain?", helper: "The results will show both methods when their order differs.", options: [
      { value: "avalanche", label: "Highest rate first", description: "Usually minimizes interest if followed consistently." },
      { value: "snowball", label: "Smallest balance first", description: "Creates earlier account closures for motivation." },
      { value: "compare", label: "Show both", description: "Compare cost and milestone timing." },
    ] },
    { id: "upcoming-change", type: "choice", question: "Is a major income or expense change likely in the next six months?", helper: "A changing cash flow can make a flexible plan more useful than a precise payoff date.", options: [
      { value: "none", label: "No known change", description: "Current cash flow is a reasonable base." },
      { value: "positive", label: "Income may rise or costs fall", description: "Extra capacity may appear." },
      { value: "negative", label: "Income may fall or costs rise", description: "The plan needs more buffer." },
      { value: "unknown", label: "Uncertain", description: "Keep the plan adaptable." },
    ] },
  ],
};

export const guidedJourneys: JourneyDefinition[] = [nextDollar, retirement, mortgageVsInvest, accounts, home, debt];

export function getJourney(id: string) {
  return guidedJourneys.find((journey) => journey.id === id);
}
