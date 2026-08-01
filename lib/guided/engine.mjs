import {
  allocateRegisteredSavings,
  homeReadinessProjection,
  minimumDownPayment,
  mortgagePrepaymentComparison,
  retirementProjection,
  simulateDebtPayoff,
} from "./calculations.mjs";

const currency = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-CA", { maximumFractionDigits: 1 });

function numberValue(responses, id, fallback = 0) {
  const value = Number(responses[id]);
  return Number.isFinite(value) ? value : fallback;
}

function isUnknown(value) {
  return value === "unknown" || value === undefined || value === "";
}

function monthsLabel(months) {
  if (!Number.isFinite(months) || months >= 600) return "More than 50 years";
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  if (!years) return `${remainder} months`;
  return `${years} ${years === 1 ? "year" : "years"}${remainder ? `, ${remainder} months` : ""}`;
}

function conditionMatches(condition, responses) {
  const value = responses[condition.stepId];
  if (Object.hasOwn(condition, "equals") && value !== condition.equals) return false;
  if (Object.hasOwn(condition, "notEquals") && value === condition.notEquals) return false;
  if (condition.oneOf && !condition.oneOf.includes(value)) return false;
  if (Object.hasOwn(condition, "greaterThan") && !(Number(value) > condition.greaterThan)) return false;
  return true;
}

export { minimumDownPayment };

export function visibleStepIds(journey, responses) {
  return journey.steps.filter((step) => {
    if (!step.showWhen) return true;
    const conditions = Array.isArray(step.showWhen) ? step.showWhen : [step.showWhen];
    return conditions.every((condition) => conditionMatches(condition, responses));
  }).map((step) => step.id);
}

export function validateGuidedStep(step, value, responses = {}) {
  if (step.type === "checkpoint") return "";
  if ((value === undefined || value === "") && step.optional) return "";
  if (value === undefined || value === "") return "Choose or enter a response before continuing.";
  if (step.type === "choice" || step.type === "quiz") {
    return step.options.some((option) => option.value === value) ? "" : "Choose one of the available responses.";
  }
  if (step.type === "range") {
    const numeric = Number(value);
    return Number.isFinite(numeric) && numeric >= step.min && numeric <= step.max ? "" : "Choose a value within the available range.";
  }
  if (step.type === "money") {
    if (value === "unknown" && step.allowUnknown) return "";
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric < 0 || numeric > step.max) return `Enter an amount from $0 to ${currency.format(step.max)}.`;
    if (step.id === "down-payment" && numeric > numberValue(responses, "target-price")) return "The down payment cannot exceed the purchase price.";
    return "";
  }
  if (step.type === "debt-list") {
    if (!Array.isArray(value) || value.length === 0) return "Add at least one debt before continuing.";
    if (value.length > step.maxItems) return `Add no more than ${step.maxItems} debts.`;
    for (const debt of value) {
      if (!debt.type.trim()) return "Name each debt.";
      if (!(debt.balance > 0)) return "Enter a balance above $0 for each debt.";
      if (!(debt.interestRate >= 0 && debt.interestRate <= 60)) return "Enter an annual interest rate from 0% to 60%.";
      if (!(debt.minimumPayment > 0 && debt.minimumPayment <= debt.balance)) return "Each required payment must be above $0 and no more than its balance.";
    }
  }
  return "";
}

function baseResult(partial) {
  return {
    heard: [], scenarioColumns: [], scenarios: [], concepts: [], tradeoffs: [], alternativeFactors: [],
    nextSteps: [], missingInformation: [], professionalAdvice: [], reviseStepIds: [], articleSlugs: [],
    calculatorSlugs: [], sourceIds: [], assumptions: ["This is educational, directional information, not financial advice."],
    ...partial,
  };
}

function nextDollarResult(responses) {
  const debt = responses["debt-rate"];
  const emergency = numberValue(responses, "emergency-months");
  const stability = responses["income-stability"];
  const match = responses["employer-match"];
  const monthly = numberValue(responses, "monthly-amount");
  const fragile = stability !== "stable";
  const highDebt = debt === "over-12" || debt === "7-12";
  const thinBuffer = emergency < (fragile ? 6 : 3);
  let signal = "Compare debt and investing";
  let headline = "You have room for a deliberate split.";
  if (highDebt && thinBuffer) { signal = "Buffer, then high-cost debt"; headline = "Protect against the next surprise, then attack the expensive balance."; }
  else if (highDebt) { signal = "High-cost debt leads"; headline = "The guaranteed interest avoided is the clearest comparison point."; }
  else if (thinBuffer) { signal = "Liquidity leads"; headline = "Strengthen the emergency fund before increasing long-term risk."; }
  else if (debt === "none") { signal = "Long-term investing is ready to study"; headline = "Your next question is account choice, time horizon, and investment risk."; }
  const nextSteps = ["Confirm essential monthly expenses and keep the buffer liquid.", "List each debt by rate, required payment, and prepayment restriction.", "Review time horizon and investment risk after near-term cash needs are covered."];
  if (match === "yes") nextSteps.unshift("Check the employer plan and consider capturing the available match first.");
  if (match === "unsure") nextSteps.unshift("Confirm whether an employer match is available and how it works.");
  return baseResult({
    signal, headline,
    summary: "A starter cash buffer reduces the risk of new borrowing. Then compare the guaranteed cost of debt with the flexibility and uncertain potential of investing.",
    heard: [`${currency.format(monthly)} available each month`, `${number.format(emergency)} months of liquid savings`, `${debt === "none" ? "No" : "Some"} competing debt`],
    metrics: [
      { label: "Monthly amount to sequence", value: currency.format(monthly), detail: "Your planning input, not a recommended contribution." },
      { label: "Liquid runway", value: `${number.format(emergency)} months`, detail: fragile ? "Less predictable income increases the value of liquidity." : "Compare with your household obligations." },
    ],
    concepts: [{ title: "Guaranteed cost versus uncertain return", body: "Debt interest avoided is generally predictable. Investment returns can be negative and depend on time, tax, fees, and behaviour." }, { title: "Liquidity has option value", body: "Emergency cash can prevent a disruption from becoming new high-cost debt." }],
    tradeoffs: [{ title: "All debt first", body: "Can maximize certainty, but may leave too little cash or miss an employer match." }, { title: "Invest immediately", body: "Can begin compounding, but market losses and high-cost debt can work against you together." }],
    nextSteps, alternativeFactors: ["Employer plan rules", "Debt prepayment restrictions", "Upcoming expenses"],
    reviseStepIds: ["debt-rate", "emergency-months", "monthly-amount"],
    articleSlugs: ["emergency-fund-canada", "pay-off-mortgage-or-invest", "building-investment-plan"],
    sourceIds: ["fcac-emergency", "fcac-debt", "td-debt-invest", "reddit-next-dollar"],
  });
}

function retirementResult(responses) {
  const currentAge = numberValue(responses, "current-age", 40);
  const retirementAge = Math.max(currentAge + 1, numberValue(responses, "retirement-age", 65));
  const spendingFactor = responses["spending-change"] === "lower" ? 0.8 : responses["spending-change"] === "higher" ? 1.2 : 1;
  const missing = [];
  for (const [id, label] of [["pension-income", "Employer pension estimate"], ["cpp-income", "CPP or QPP estimate"], ["oas-income", "OAS eligibility and estimate"]]) if (isUnknown(responses[id])) missing.push(label);
  const projection = retirementProjection({
    currentAge, retirementAge, monthlySpending: numberValue(responses, "retirement-spending"), spendingFactor,
    currentAssets: numberValue(responses, "current-assets"), annualContributions: numberValue(responses, "annual-contributions"),
    pensionIncome: numberValue(responses, "pension-income"), cppIncome: numberValue(responses, "cpp-income"),
    oasIncome: numberValue(responses, "oas-income"), otherIncome: numberValue(responses, "other-income"),
  });
  const middle = projection.scenarios.find((item) => item.label === "middle")?.projected || 0;
  const gap = middle - projection.required.middle;
  const coverage = projection.required.middle > 0 ? middle / projection.required.middle : 2;
  const signal = coverage >= 1.15 ? "Cushion in the middle scenario" : coverage >= 0.85 ? "Near the middle range" : "A planning gap to work on";
  const later = retirementProjection({ currentAge, retirementAge: retirementAge + 3, monthlySpending: numberValue(responses, "retirement-spending"), spendingFactor, currentAssets: numberValue(responses, "current-assets"), annualContributions: numberValue(responses, "annual-contributions"), pensionIncome: numberValue(responses, "pension-income"), cppIncome: numberValue(responses, "cpp-income"), oasIncome: numberValue(responses, "oas-income"), otherIncome: numberValue(responses, "other-income") });
  return baseResult({
    signal, headline: gap >= 0 ? "Your current inputs reach the middle target, with uncertainty on both sides." : "The middle scenario suggests a gap, but several levers can change it.",
    summary: "This projection uses today's dollars and a range of real returns and withdrawal rates. It is a planning range, not a forecast or guarantee.",
    heard: [`Retirement in about ${projection.years} years`, `${currency.format(projection.annualSpending)} estimated annual spending`, `${currency.format(projection.reliableIncome)} expected reliable annual income`, `${currency.format(numberValue(responses, "annual-contributions"))} annual contributions`],
    metrics: [
      { label: "Middle projected portfolio", value: currency.format(middle), detail: "Uses a 3% real annual return before retirement." },
      { label: "Middle portfolio target", value: currency.format(projection.required.middle), detail: "Uses a 4% initial withdrawal planning rate on spending not covered by entered reliable income." },
      { label: gap >= 0 ? "Middle cushion" : "Middle gap", value: currency.format(Math.abs(gap)), detail: "Difference between the two middle assumptions." },
      { label: "Annual saving for middle target", value: currency.format(projection.middleSavings), detail: "Illustrative level contribution required from now to the selected age." },
    ],
    scenarioColumns: ["Projected portfolio", "Portfolio target", "Difference"],
    scenarios: projection.scenarios.map((scenario, index) => { const target = [projection.required.cautious, projection.required.middle, projection.required.optimistic][index]; return { label: `${scenario.label[0].toUpperCase()}${scenario.label.slice(1)}`, values: [currency.format(scenario.projected), currency.format(target), currency.format(scenario.projected - target)], note: `${number.format(scenario.rate * 100)}% real return assumption` }; }),
    concepts: [{ title: "Real returns", body: "A real return is after inflation, so projected dollars and spending are compared in today's purchasing power." }, { title: "Withdrawal rates", body: "A withdrawal rate is a planning assumption. Taxes, fees, market sequence, longevity, and spending changes can materially alter outcomes." }],
    tradeoffs: [{ title: "Retire later", body: `Three more saving years produce an illustrative middle portfolio of ${currency.format(later.scenarios[1].projected)}.` }, { title: "Spend or earn differently", body: "Lower spending or reliable part-time income reduces the amount the portfolio must support." }],
    alternativeFactors: ["Tax on withdrawals", "CPP or QPP and OAS start ages", "Housing changes", "Long-term care and health costs", "Market sequence and fees"],
    nextSteps: ["Verify CPP or QPP, OAS, and workplace pension estimates.", "Separate essential from flexible retirement spending.", gap < 0 ? `Test a contribution increase toward ${currency.format(projection.middleSavings)} annually, a later date, or lower spending.` : "Stress-test taxes, fees, and an early market decline before treating the cushion as available."],
    missingInformation: missing, professionalAdvice: ["Consider a fee-only financial planner for tax-aware drawdown and pension timing.", "Use a qualified tax professional for complex cross-border, corporate, or benefit questions."],
    reviseStepIds: ["retirement-age", "retirement-spending", "spending-change", "annual-contributions", "pension-income", "cpp-income", "oas-income"],
    articleSlugs: ["how-much-to-retire", "retirement-spending-withdrawal-rates", "cpp-guide"], calculatorSlugs: ["fire"],
    sourceIds: ["fcac-retirement", "cpp-payments", "oas", "reddit-retirement"],
    assumptions: ["Returns are real annual rates of 1%, 3%, and 5%.", "Portfolio targets use initial withdrawal planning rates of 3.5%, 4%, and 4.25%.", "Unknown income sources are treated as $0 and flagged."],
  });
}

function mortgageResult(responses) {
  const account = responses["investment-account"] || "unknown";
  const taxRate = numberValue(responses, "tax-rate", 30) / 100;
  const result = mortgagePrepaymentComparison({ amount: numberValue(responses, "available-amount"), balance: numberValue(responses, "mortgage-balance"), rate: numberValue(responses, "mortgage-rate") / 100, years: Math.min(numberValue(responses, "mortgage-years", 20), numberValue(responses, "investment-horizon", 10)), prepaymentLimit: isUnknown(responses["prepayment-limit"]) ? numberValue(responses, "available-amount") : numberValue(responses, "prepayment-limit"), account, taxRate, splitPercent: 50 });
  let position = 50;
  if (responses.priority === "certainty") position -= 20;
  if (responses.priority === "growth") position += 20;
  if (responses["loss-comfort"] === "sell") position -= 15;
  if (responses["loss-comfort"] === "hold") position += 10;
  if (numberValue(responses, "emergency-months") < 3 || responses.priority === "liquidity") position += 8;
  position = Math.max(5, Math.min(95, position));
  const warnings = [];
  if (responses["high-interest-debt"] !== "none") warnings.push("Higher-cost debt may take priority");
  if (isUnknown(responses["prepayment-limit"])) warnings.push("Penalty-free prepayment amount");
  return baseResult({
    signal: position < 40 ? "Leans toward mortgage" : position > 60 ? "Leans toward investing" : "A split deserves consideration",
    headline: "Compare certainty, range of outcomes, liquidity, and behaviour together.",
    summary: "Mortgage savings are predictable when no charge applies. Investment outcomes are shown as scenarios and are not forecasts.",
    heard: [`${currency.format(numberValue(responses, "available-amount"))} to allocate`, `${number.format(numberValue(responses, "mortgage-rate"))}% mortgage rate`, `${numberValue(responses, "investment-horizon", 10)}-year investment horizon`, `${account.toUpperCase()} investment context`],
    spectrum: { left: "Mortgage certainty", right: "Investment flexibility and growth", position, label: position < 40 ? "Your inputs emphasize certainty" : position > 60 ? "Your inputs support accepting more uncertainty" : "Your inputs balance both sides" },
    metrics: [
      { label: "Illustrative interest avoided", value: currency.format(result.interestAvoided), detail: "Re-amortizes the reduced balance over the comparison period. Actual lender treatment differs." },
      { label: "Break-even return", value: `${number.format(result.breakEvenReturn * 100)}%`, detail: account === "taxable" ? "Rough after-tax comparison using your tax-rate input." : "Rough annual return needed to match the mortgage rate before differences in fees and risk." },
      { label: "Prepayment used", value: currency.format(result.prepayment), detail: "Limited by the entered privilege and remaining balance." },
    ],
    scenarioColumns: ["Value after period", "Certainty", "Liquidity"],
    scenarios: [
      { label: "Mortgage prepayment", values: [currency.format(result.prepayment + result.interestAvoided), "Higher", "Lower"], note: "Principal plus illustrative interest avoided" },
      ...result.investmentScenarios.map((item) => ({ label: `${item.label[0].toUpperCase()}${item.label.slice(1)} investment`, values: [currency.format(item.value), "Lower", "Higher"], note: `${number.format(item.returnRate * 100)}% nominal annual return assumption` })),
      { label: "50/50 split", values: [currency.format(result.splitValue), "Mixed", "Mixed"], note: "Middle investment assumption; excludes the split mortgage interest avoided" },
    ],
    concepts: [{ title: "Guaranteed and uncertain returns", body: "Avoided mortgage interest is known from the loan rate when no charge applies. Investment returns vary and can be negative." }, { title: "Liquidity", body: "Mortgage principal is generally harder to access than cash or investments and may require new borrowing." }],
    tradeoffs: [{ title: "Prepay", body: "Reduces debt and future interest, but concentrates more wealth in the home and reduces liquidity." }, { title: "Invest", body: "Keeps diversification and access options, but adds market, tax, fee, and behaviour risk." }],
    alternativeFactors: ["Renewal-rate risk", "Contribution room", "Investment fees", "Mortgage charge or privilege conditions", "Job stability"],
    nextSteps: [warnings.length ? `Resolve first: ${warnings.join("; ")}.` : "Confirm the lender's written prepayment terms.", "Check account room and choose an investment appropriate to the horizon.", "If neither side clearly dominates, test a repeatable split rather than a one-time all-or-nothing choice."],
    missingInformation: warnings, professionalAdvice: ["Ask the lender to confirm charges and how a prepayment changes amortization.", "Seek tax advice before relying on RRSP deductions or taxable investment estimates."],
    reviseStepIds: ["available-amount", "mortgage-rate", "mortgage-years", "prepayment-limit", "investment-account", "investment-horizon", "priority"],
    articleSlugs: ["pay-off-mortgage-or-invest", "choosing-managing-mortgage", "building-investment-plan"], calculatorSlugs: ["mortgage-prepayment"],
    sourceIds: ["fcac-prepayment", "cra-tfsa", "cra-rrsp", "reddit-mortgage"],
    assumptions: ["Investment scenarios use nominal annual returns of 2%, 5%, and 7% with no fees.", "Taxable investing uses a simplified tax drag, not a tax calculation.", "Actual mortgage payment and interest treatment depend on the contract."],
  });
}

function accountsResult(responses) {
  const legacy = responses["annual-savings"] === undefined && responses.contribution !== undefined;
  const annualSavings = legacy ? numberValue(responses, "contribution") : numberValue(responses, "annual-savings");
  const currentTaxRate = (legacy ? numberValue(responses, "tax-rate", 30) : numberValue(responses, "current-tax-rate", 30)) / 100;
  const futureTaxRate = responses["future-tax-rate"] === "lower" ? currentTaxRate - 0.08 : responses["future-tax-rate"] === "higher" ? currentTaxRate + 0.08 : currentTaxRate;
  const result = allocateRegisteredSavings({ annualSavings, matchAvailable: responses["employer-match"] === "yes", matchContribution: isUnknown(responses["match-contribution"]) ? 0 : numberValue(responses, "match-contribution"), firstHomeEligible: responses["first-home-status"] === "likely", goal: responses["primary-goal"], flexibilityNeeded: responses.flexibility !== "low", currentTaxRate, futureTaxRate, fhsaRoom: legacy && responses["primary-goal"] === "first-home" ? annualSavings : responses["primary-goal"] === "first-home" ? (responses["fhsa-room"] ?? "unknown") : 0, tfsaRoom: legacy ? annualSavings : responses["tfsa-room"] ?? "unknown", rrspRoom: legacy ? annualSavings : responses["rrsp-room"] ?? "unknown" });
  const missing = [];
  for (const [id, label] of [["tfsa-room", "Verified TFSA room"], ["rrsp-room", "Verified RRSP deduction room"]]) if (isUnknown(responses[id])) missing.push(label);
  if (responses["primary-goal"] === "first-home" && isUnknown(responses["fhsa-room"])) missing.push("Verified FHSA participation room");
  if (responses["employer-match"] === "yes" && isUnknown(responses["match-contribution"])) missing.push("Contribution needed for full employer match");
  const rows = [["Employer match", result.allocations.match], ["FHSA", result.allocations.fhsa], ["TFSA", result.allocations.tfsa], ["RRSP", result.allocations.rrsp], ["Not yet allocated", result.allocations.unallocated]];
  return baseResult({
    signal: responses["primary-goal"] === "first-home" && responses["first-home-status"] !== "not-eligible" ? "Verify FHSA eligibility and room first" : missing.length ? "Verify room before allocating" : result.allocations.unallocated > 0 ? "Some savings need another destination" : "A complete account sequence",
    headline: "Use eligibility and verified room first, then weigh access and tax timing.",
    summary: "This is a dollar allocation example based only on the room and preferences entered. It does not verify eligibility, room, or your tax return.",
    heard: [`${currency.format(annualSavings)} to allocate this year`, `${responses["primary-goal"]} as the leading goal`, `${number.format(currentTaxRate * 100)}% current marginal tax-rate estimate`, `${responses.flexibility || "unspecified"} need for flexibility`],
    metrics: [
      { label: "Potential deductible contribution", value: currency.format(result.allocations.fhsa + result.allocations.rrsp), detail: "FHSA plus RRSP example, subject to eligibility and verified room." },
      { label: legacy ? "Illustrative deduction value" : "Illustrative deduction range", value: legacy ? currency.format(annualSavings * currentTaxRate) : `${currency.format(result.deductionLow)} to ${currency.format(result.deductionHigh)}`, detail: legacy ? `${number.format(currentTaxRate * 100)}% user-entered marginal rate multiplied by the contribution. This is not a tax return estimate.` : "A simple current-rate sensitivity, not a refund estimate." },
      { label: "Unallocated after entered room", value: currency.format(result.allocations.unallocated), detail: "Could remain liquid or use another suitable account after verification." },
    ],
    scenarioColumns: ["Illustrative allocation", "Why it appears here"],
    scenarios: rows.filter(([, value]) => value > 0).map(([label, value]) => ({ label, values: [currency.format(value), label === "Employer match" ? "Capture plan value first" : label === "FHSA" ? "First-home goal and entered room" : label === "TFSA" ? "Flexibility and tax-free withdrawals" : label === "RRSP" ? "Retirement and tax timing" : "Entered room was insufficient or unknown"] })),
    concepts: [{ title: "Room before allocation", body: "Available room depends on your records, prior transactions, and eligibility. Annual limits alone are not enough." }, { title: "Account before investment", body: "The account defines tax rules. The investment inside it should still match the goal and time horizon." }],
    tradeoffs: [{ title: "Deduction today", body: "RRSP and FHSA contributions may reduce taxable income, but the value depends on room, eligibility, and withdrawal context." }, { title: "Access later", body: "TFSA withdrawals are generally flexible. RRSP and FHSA withdrawals follow different tax and eligibility rules." }],
    alternativeFactors: ["Employer plan restrictions", "Benefit and credit interactions", "Spousal RRSP planning", "Home Buyers' Plan", "Non-residency"],
    nextSteps: ["Verify every account's room before contributing.", "Confirm FHSA eligibility and qualifying-withdrawal rules if a first home is the goal.", "Choose holdings separately based on time horizon and risk."],
    missingInformation: missing, professionalAdvice: ["Use a tax professional for large deductions, uncertain residency, or benefit interactions.", "Confirm employer match mechanics with the plan administrator."],
    reviseStepIds: ["annual-savings", "match-contribution", "tfsa-room", "rrsp-room", "fhsa-room", "current-tax-rate", "future-tax-rate", "flexibility"],
    articleSlugs: ["tfsa-guide", "rrsp-guide", "tfsa-rrsp-fhsa"], calculatorSlugs: ["tfsa-vs-rrsp"],
    sourceIds: ["cra-room", "cra-tfsa", "cra-rrsp", "cra-fhsa", "reddit-accounts"],
    assumptions: ["FHSA eligibility is not determined here. Verify the complete current CRA conditions.", "Unknown room is treated as $0 and flagged, preventing an allocation based on guessed room.", "The future tax-rate choice is represented as eight percentage points below, equal to, or above the current estimate.", "The illustration does not model tax credits, deductions, benefits, refunds, or reinvestment."],
  });
}

function homeResult(responses) {
  const legacy = responses["purchase-cash"] === undefined;
  const legacyClosing = numberValue(responses, "closing-reserve");
  const projection = homeReadinessProjection({ price: numberValue(responses, "target-price"), downPayment: numberValue(responses, "down-payment"), purchaseCash: legacy ? numberValue(responses, "down-payment") + legacyClosing : numberValue(responses, "purchase-cash"), closingCosts: legacy ? legacyClosing : numberValue(responses, "closing-costs"), movingRepairs: numberValue(responses, "moving-repairs"), grossIncome: numberValue(responses, "gross-income"), monthlyDebt: numberValue(responses, "monthly-debt"), mortgageRate: numberValue(responses, "mortgage-rate", 5) / 100, amortizationYears: numberValue(responses, "amortization", 25), propertyTax: numberValue(responses, "property-tax"), condoFees: numberValue(responses, "condo-fees"), utilities: numberValue(responses, "utilities"), homeInsurance: numberValue(responses, "home-insurance"), maintenance: numberValue(responses, "maintenance"), monthlyRent: numberValue(responses, "monthly-rent") });
  const minimum = minimumDownPayment(numberValue(responses, "target-price"));
  const cashReady = projection.cashRemaining >= 0;
  const qualification = numberValue(responses, "down-payment") >= minimum && projection.totalRatio <= 0.44;
  const comfort = projection.housingRatio <= 0.32 && numberValue(responses, "emergency-months") >= 3 && cashReady;
  const legacyStrong = [numberValue(responses, "down-payment") >= minimum, legacyClosing >= numberValue(responses, "target-price") * 0.015, numberValue(responses, "emergency-months") >= 3].filter(Boolean).length;
  const signal = legacy ? (legacyStrong === 3 ? "Ready for a detailed stress test" : legacyStrong === 2 ? "Building toward readiness" : "Early planning") : qualification && comfort ? "Ready for lender and personal stress tests" : qualification ? "Qualification may be plausible, comfort needs work" : "Build the plan before relying on a target price";
  const legacyDebtRatio = numberValue(responses, "gross-income") > 0 ? numberValue(responses, "monthly-debt") / (numberValue(responses, "gross-income") / 12) * 100 : 0;
  return baseResult({
    signal,
    headline: "Treat qualification, personal comfort, and rent-versus-buy as three separate signals.",
    summary: legacy ? "This screen checks selected preparation signals only. It does not estimate a mortgage approval because property taxes, heating, condo fees, interest rate, amortization, credit, insurance, and lender policy are not included." : "Ratios are directional and omit lender-specific details. A lender must assess qualification using current rules and complete documentation.",
    heard: [`${currency.format(numberValue(responses, "target-price"))} target price`, `${currency.format(numberValue(responses, "down-payment"))} down payment`, `${currency.format(numberValue(responses, "monthly-rent"))} comparable rent`, `${responses["holding-period"]} expected holding period`],
    metrics: legacy ? [
      { label: "Federal minimum down payment", value: currency.format(minimum), detail: `${currency.format(numberValue(responses, "down-payment") - minimum)} above this minimum in the scenario.` },
      { label: "Closing-cost checkpoint", value: `${currency.format(numberValue(responses, "target-price") * 0.015)} to ${currency.format(numberValue(responses, "target-price") * 0.04)}`, detail: `A broad educational range. Your reserve is ${currency.format(legacyClosing)}.` },
      { label: "Required debt payments", value: `${number.format(legacyDebtRatio)}% of gross monthly income`, detail: "A partial ratio only. Housing costs and lender qualification rules are not included." },
      { label: "Post-purchase runway", value: `${number.format(numberValue(responses, "emergency-months"))} months`, detail: "Your estimate after purchase funds have been removed." },
    ] : [
      { label: "Cash after entered purchase costs", value: currency.format(projection.cashRemaining), detail: cashReady ? "Before the separate emergency fund you said would remain." : "The entered down payment and costs exceed available purchase cash." },
      { label: "Estimated ownership cost", value: `${currency.format(projection.monthlyOwnership)}/month`, detail: "Mortgage, entered tax, fees, utilities, insurance, and maintenance reserve." },
      { label: "Directional housing ratio", value: `${number.format(projection.housingRatio * 100)}%`, detail: "Entered ownership cost divided by gross monthly income. Not a lender GDS calculation." },
      { label: "Stress-rate payment", value: `${currency.format(projection.stressPayment)}/month`, detail: `Payment-only illustration at ${number.format(projection.stressRate * 100)}%, the greater of contract rate plus 2 points or 5.25%.` },
    ],
    scenarioColumns: ["Illustrative home value", "Rent paid", "Owner costs before principal and interest"],
    scenarios: projection.holdingPeriods.map((period) => ({ label: `${period.years} years`, values: [currency.format(period.homeValue), currency.format(period.rentPaid), currency.format(period.ownerUnrecoverable)], note: "Uses 2% home appreciation, 2% rent growth, and an 8% combined transaction-cost allowance." })),
    concepts: [{ title: "Qualification", body: "A lender applies current rules to verified income, debt, credit, property costs, mortgage terms, and documentation." }, { title: "Comfort", body: "A personal ceiling can be lower after maintenance, savings goals, lifestyle, and income risk." }, { title: "Rent versus buy", body: "The result changes with holding period, transaction costs, investment returns, rent growth, appreciation, and maintenance." }],
    tradeoffs: [{ title: "Buy sooner", body: "Advances the housing goal but adds transaction costs, fixed obligations, maintenance, and concentration." }, { title: "Rent longer", body: "Preserves flexibility and may lower near-term costs, but rents and property prices can change." }],
    alternativeFactors: ["Mortgage insurance premium", "Land transfer tax and rebates", "Credit and lender rules", "Special assessments", "Opportunity cost of the down payment"],
    nextSteps: [numberValue(responses, "down-payment") < minimum ? `Build at least ${currency.format(minimum - numberValue(responses, "down-payment"))} more toward the current federal minimum down payment.` : "Verify down payment sources and current mortgage-insurance rules.", cashReady ? "Replace broad cost inputs with property-specific quotes." : `Close the ${currency.format(Math.abs(projection.cashRemaining))} purchase-cash gap without using the emergency fund.`, "Request a lender or broker scenario, then set a separate personal ceiling below any approval maximum."],
    missingInformation: ["Credit history and lender documentation", "Heating cost and mortgage insurance", "Province-specific taxes and rebates"],
    professionalAdvice: ["Use a lender or mortgage broker for a current qualification assessment.", "Use a real-estate lawyer for contract, title, and closing-cost advice."],
    reviseStepIds: ["target-price", "purchase-cash", "down-payment", "mortgage-rate", "amortization", "maintenance", "monthly-rent", "holding-period"],
    articleSlugs: ["down-payment-canada", "how-much-house-can-i-afford", "rent-vs-buy"], calculatorSlugs: ["rent-vs-buy"],
    sourceIds: ["fcac-down-payment", "osfi-mqr", "fcac-homebuying", "reddit-home"],
    assumptions: ["The federal minimum down payment uses current published thresholds.", "The stress-rate illustration uses the greater of 5.25% or the entered rate plus two percentage points.", "Holding-period scenarios are sensitivities, not a recommendation or wealth forecast."],
  });
}

function debtResult(responses) {
  const debts = Array.isArray(responses.debts) ? responses.debts : [];
  const extra = numberValue(responses, "extra-payment");
  const avalanche = simulateDebtPayoff(debts, extra, "avalanche");
  const snowball = simulateDebtPayoff(debts, extra, "snowball");
  const minimumOnly = simulateDebtPayoff(debts, 0, "avalanche");
  const totalBalance = debts.reduce((sum, item) => sum + item.balance, 0);
  const minimums = debts.reduce((sum, item) => sum + item.minimumPayment, 0);
  const urgent = responses["payment-affordability"] === "no" || responses["account-status"] !== "current" || responses["borrowing-essentials"] === "often" || debts.some((item) => item.status !== "current");
  const selected = responses["payoff-style"] === "snowball" ? snowball : avalanche;
  return baseResult({
    signal: urgent ? "Stabilize and get qualified help now" : "A structured payoff plan is workable",
    headline: urgent ? "Protect essentials and prevent further escalation before optimizing the order." : "Choose the order you can sustain, then automate the monthly amount.",
    summary: "The timelines assume rates and payments remain constant, no new borrowing occurs, and every scheduled payment is made. Actual statements and lender allocation rules can differ.",
    urgentSupport: urgent,
    heard: [`${debts.length} debts totalling ${currency.format(totalBalance)}`, `${currency.format(minimums)} in required monthly payments`, `${currency.format(extra)} extra each month`, `${number.format(numberValue(responses, "emergency-months"))} months of liquid savings`],
    metrics: [
      { label: "Selected-method payoff", value: monthsLabel(selected.months), detail: `${responses["payoff-style"] === "snowball" ? "Smallest balance first" : "Highest rate first"} with entered extra payment.` },
      { label: "Selected-method interest", value: currency.format(selected.totalInterest), detail: "Illustrative total from the month-by-month simulation." },
      { label: "Time saved versus minimums", value: monthsLabel(Math.max(0, minimumOnly.months - selected.months)), detail: "Assumes the required payments in the list remain available until all debts are paid." },
    ],
    scenarioColumns: ["Payoff time", "Illustrative interest", "First payoff"],
    scenarios: [
      { label: "Highest rate first", values: [monthsLabel(avalanche.months), currency.format(avalanche.totalInterest), avalanche.milestones[0]?.type || "Not reached"], note: "Usually lowers interest when payments are sustained." },
      { label: "Smallest balance first", values: [monthsLabel(snowball.months), currency.format(snowball.totalInterest), snowball.milestones[0]?.type || "Not reached"], note: "May create an earlier motivational milestone." },
      { label: "Required payments only", values: [monthsLabel(minimumOnly.months), currency.format(minimumOnly.totalInterest), minimumOnly.milestones[0]?.type || "Not reached"], note: "Comparison baseline with no extra payment." },
    ],
    timeline: selected.milestones.slice(0, 5).map((item, index) => ({ label: index === 0 ? "First account" : `Milestone ${index + 1}`, value: item.type, detail: `Illustratively paid in month ${item.month}` })),
    concepts: [{ title: "Avalanche", body: "Directs extra money to the highest interest rate and usually minimizes interest when followed consistently." }, { title: "Snowball", body: "Directs extra money to the smallest balance and may create faster visible wins, sometimes at a higher cost." }],
    tradeoffs: [{ title: "Aggressive payment", body: "Shortens the timeline, but can backfire if it leaves no cash for essentials or emergencies." }, { title: "Larger buffer", body: "Slows repayment but can reduce the chance of adding new debt after a disruption." }],
    alternativeFactors: ["Promotional-rate expiry", "Secured collateral", "Prepayment charges", "Tax-deductible interest", "Credit counselling or insolvency options"],
    nextSteps: urgent ? ["Protect housing, food, utilities, medicine, and other essentials.", "Contact creditors promptly and document proposed arrangements.", "Speak with a reputable credit counsellor. For consumer proposals or bankruptcy, consult a Licensed Insolvency Trustee."] : ["Verify balances, rates, due dates, and prepayment terms against current statements.", `Automate ${currency.format(minimums + extra)} in total monthly payments if sustainable.`, "Review progress after 30 days and redirect every paid-off minimum to the next debt."],
    missingInformation: debts.some((item) => item.rateType === "promotional") ? ["Promotional-rate expiry dates"] : [],
    professionalAdvice: ["A reputable credit counsellor can explain budgeting and debt-management options and their costs.", "Only a Licensed Insolvency Trustee can administer consumer proposals and bankruptcies in Canada."],
    reviseStepIds: ["debts", "extra-payment", "emergency-months", "payoff-style"],
    articleSlugs: ["debt-or-invest", "emergency-fund-canada", "personal-money-system"],
    sourceIds: ["fcac-debt-help", "osb-lit", "reddit-next-dollar"],
    assumptions: ["Rates remain constant and no new charges or borrowing occur.", "Required payments are treated as a fixed total that rolls to the next debt after payoff.", "The simulation stops at 50 years and does not replace creditor statements."],
  });
}

export function buildGuidedResult(journeyId, responses) {
  if (journeyId === "next-dollar") return nextDollarResult(responses);
  if (journeyId === "retirement-readiness") return retirementResult(responses);
  if (journeyId === "mortgage-vs-invest") return mortgageResult(responses);
  if (journeyId === "registered-accounts") return accountsResult(responses);
  if (journeyId === "home-readiness") return homeResult(responses);
  if (journeyId === "debt-plan") return debtResult(responses);
  throw new Error(`Unknown guided journey: ${journeyId}`);
}
