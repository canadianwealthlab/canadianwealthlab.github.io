const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

function numberValue(responses, id) {
  const value = Number(responses[id]);
  return Number.isFinite(value) ? value : 0;
}

export function minimumDownPayment(price) {
  const value = Math.max(0, Number(price) || 0);
  if (value >= 1_500_000) return value * 0.2;
  if (value > 500_000) {
    return Math.round((25_000 + (value - 500_000) * 0.1) * 100) / 100;
  }
  return value * 0.05;
}

export function visibleStepIds(journey, responses) {
  return journey.steps
    .filter(
      (step) =>
        !step.showWhen ||
        responses[step.showWhen.stepId] === step.showWhen.equals,
    )
    .map((step) => step.id);
}

function nextDollarResult(responses) {
  const debt = responses["debt-rate"];
  const emergencyMonths = numberValue(responses, "emergency-months");
  const incomeStability = responses["income-stability"];
  const match = responses["employer-match"];
  const monthly = numberValue(responses, "monthly-amount");
  const fragileIncome = incomeStability === "variable" || incomeStability === "uncertain";
  const highDebt = debt === "over-12" || debt === "7-12";
  const thinBuffer = emergencyMonths < (fragileIncome ? 6 : 3);

  let signal = "Build a resilient base";
  let headline = "Use a staged sequence, not an all-or-nothing choice.";
  let summary =
    "A starter cash buffer reduces the risk of new borrowing. From there, compare the guaranteed cost of debt with the flexibility and long-term potential of investing.";
  const nextSteps = [
    "Confirm essential monthly expenses and keep the buffer liquid.",
    "List each debt by interest rate, required payment, and any prepayment restriction.",
    "Review investment time horizon and risk only after near-term cash needs are covered.",
  ];

  if (highDebt && thinBuffer) {
    signal = "Buffer, then high-cost debt";
    headline = "Protect against the next surprise, then attack the expensive balance.";
  } else if (highDebt) {
    signal = "High-cost debt leads";
    headline = "The guaranteed interest avoided is the clearest comparison point.";
  } else if (thinBuffer) {
    signal = "Liquidity leads";
    headline = "Strengthen the emergency fund before increasing long-term risk.";
  } else if (debt === "none") {
    signal = "Long-term investing is ready to study";
    headline = "Your next question is account choice, time horizon, and investment risk.";
    summary =
      "With no competing debt and a working cash reserve, long-term investing becomes a reasonable area to study. Confirm your goal and time horizon before choosing an account or investment.";
  } else {
    signal = "Compare debt and investing";
    headline = "You have room for a deliberate split.";
    summary =
      "Your buffer appears closer to a working level and the debt rate is not in the highest band. Compare the guaranteed after-tax return from debt repayment with a range of investment outcomes.";
  }

  if (match === "yes") {
    nextSteps.unshift(
      "Check the employer plan and consider capturing an available match before allocating the remainder.",
    );
  } else if (match === "unsure") {
    nextSteps.unshift("Confirm whether an employer match is available and how it works.");
  }

  return {
    signal,
    headline,
    summary,
    metrics: [
      {
        label: "Monthly amount to sequence",
        value: currency.format(monthly),
        detail: "Your planning input, not a recommended contribution.",
      },
      {
        label: "Liquid runway",
        value: `${emergencyMonths.toLocaleString("en-CA")} months`,
        detail: fragileIncome
          ? "Variable or uncertain income increases the value of liquidity."
          : "Compare this with your own risk and household obligations.",
      },
    ],
    concepts: [
      {
        title: "Guaranteed cost versus uncertain return",
        body: "Debt interest avoided is generally predictable. Investment returns are uncertain, can be negative, and depend on time horizon, tax, fees, and behaviour.",
      },
      {
        title: "Liquidity has option value",
        body: "Emergency cash can prevent a job interruption or repair from becoming new high-cost debt.",
      },
    ],
    tradeoffs: [
      {
        title: "All debt first",
        body: "Can maximize certainty, but may leave too little cash for a new emergency or cause you to miss an employer match.",
      },
      {
        title: "Invest immediately",
        body: "Can start long-term compounding, but market losses and high-cost debt can work against you at the same time.",
      },
    ],
    nextSteps,
    articleSlugs: [
      "emergency-fund-canada",
      "pay-off-mortgage-or-invest",
      "how-to-start-investing-canada",
    ],
    calculatorSlugs: [],
    sourceIds: ["fcac-emergency", "fcac-debt", "td-debt-invest", "reddit-next-dollar"],
    assumptions: [
      "Interest-rate bands are decision prompts, not universal thresholds.",
      "The screen does not know debt terms, taxes, benefits, risk tolerance, or household obligations.",
      "No response is saved or transmitted.",
    ],
  };
}

function registeredResult(responses) {
  const goal = responses["primary-goal"];
  const firstHome = responses["first-home-status"];
  const horizon = responses["time-horizon"];
  const match = responses["employer-match"];
  const contribution = numberValue(responses, "contribution");
  const taxRate = numberValue(responses, "tax-rate");
  const estimatedDeductionValue = contribution * (taxRate / 100);

  let signal = "Start with TFSA flexibility";
  let headline = "Study access and contribution-room mechanics first.";
  let summary =
    "A TFSA often deserves early attention when the goal is flexible or the money may be used sooner. Withdrawals are generally tax-free, but room is restored in a later calendar year, not immediately.";
  let sourceIds = ["cra-tfsa", "cra-rrsp", "td-investing-basics", "reddit-accounts"];

  if (goal === "first-home" && firstHome !== "not-eligible") {
    signal = firstHome === "likely" ? "Start by verifying FHSA eligibility" : "Check FHSA eligibility first";
    headline = "The FHSA may align tax deductions with a qualifying first-home goal.";
    summary =
      "If you are eligible, an FHSA combines deductible contributions with tax-free qualifying withdrawals. Confirm eligibility and contribution room directly with CRA before contributing.";
    sourceIds = ["cra-fhsa", "cra-tfsa", "cra-rrsp", "reddit-accounts"];
  } else if (goal === "retirement" && horizon === "over-15") {
    signal = "Compare RRSP and TFSA";
    headline = "Tax timing and future withdrawal flexibility are the central tradeoff.";
    summary =
      "An RRSP deduction can be more valuable at a higher current marginal tax rate, while a TFSA offers tax-free withdrawals and greater flexibility. Future income and benefit interactions can change the comparison.";
  }

  const nextSteps = [
    "Check your own contribution room in CRA records before depositing money.",
    "Separate the account decision from the investment decision. An account is a tax wrapper, not an investment.",
    "Use a short time horizon to guide investment risk, even when an account offers tax advantages.",
  ];
  if (match === "yes") {
    nextSteps.unshift("Confirm and consider the available employer match and its plan rules.");
  } else if (match === "unsure") {
    nextSteps.unshift("Check whether your employer offers a match before finalizing the sequence.");
  }

  return {
    signal,
    headline,
    summary,
    metrics: [
      {
        label: "Contribution illustrated",
        value: currency.format(contribution),
        detail: "Subject to your verified contribution room.",
      },
      {
        label: "Illustrative deduction value",
        value: currency.format(estimatedDeductionValue),
        detail: `${taxRate}% user-entered marginal rate multiplied by the contribution. This is not a tax return estimate.`,
      },
    ],
    concepts: [
      {
        title: "Account and investment are different choices",
        body: "TFSA, RRSP, and FHSA describe tax treatment. Cash, GICs, bonds, and funds describe what can be held inside the account.",
      },
      {
        title: "Contribution room is personal",
        body: "Room depends on eligibility, prior contributions, withdrawals, and tax records. This experience does not calculate or verify it.",
      },
    ],
    tradeoffs: [
      {
        title: "Current deduction",
        body: "RRSP and FHSA contributions may create a deduction, but the long-term value depends on eligibility, contribution room, withdrawal rules, and future tax context.",
      },
      {
        title: "Future access",
        body: "TFSA withdrawals are generally flexible. RRSP withdrawals are generally taxable and room is not restored. FHSA qualifying withdrawals have specific conditions.",
      },
    ],
    nextSteps,
    articleSlugs: ["tfsa-guide", "rrsp-guide", "tfsa-vs-rrsp"],
    calculatorSlugs: ["tfsa-vs-rrsp"],
    sourceIds,
    assumptions: [
      "The tax illustration uses the marginal rate you entered and ignores credits, deductions, timing, and future tax.",
      "FHSA eligibility is not determined here. Current CRA conditions must be checked in full.",
      "No response is saved or transmitted.",
    ],
  };
}

function homeResult(responses) {
  const timeline = responses.timeline;
  const price = numberValue(responses, "target-price");
  const downPayment = numberValue(responses, "down-payment");
  const closingReserve = numberValue(responses, "closing-reserve");
  const income = numberValue(responses, "gross-income");
  const monthlyDebt = numberValue(responses, "monthly-debt");
  const emergencyMonths = numberValue(responses, "emergency-months");
  const minimum = minimumDownPayment(price);
  const downPaymentGap = downPayment - minimum;
  const closingLow = price * 0.015;
  const closingHigh = price * 0.04;
  const debtToGross = income > 0 ? (monthlyDebt / (income / 12)) * 100 : 0;

  const downPaymentReady = downPayment >= minimum;
  const closingReady = closingReserve >= closingLow;
  const cashReady = emergencyMonths >= 3;
  const strongCount = [downPaymentReady, closingReady, cashReady].filter(Boolean).length;

  let signal = "Early planning";
  let headline = "Build the cash layers before testing a lender scenario.";
  if (strongCount === 2) {
    signal = "Building toward readiness";
    headline = "One major cash checkpoint still needs attention.";
  } else if (strongCount === 3) {
    signal = "Ready for a detailed stress test";
    headline = "The planning inputs support a deeper affordability review.";
  }

  return {
    signal,
    headline,
    summary:
      "This screen checks selected preparation signals only. It does not estimate a mortgage approval because property taxes, heating, condo fees, interest rate, amortization, credit, insurance, and lender policy are not included.",
    metrics: [
      {
        label: "Federal minimum down payment",
        value: currency.format(minimum),
        detail:
          downPaymentGap >= 0
            ? `${currency.format(downPaymentGap)} above this minimum in the scenario.`
            : `${currency.format(Math.abs(downPaymentGap))} below this minimum in the scenario.`,
      },
      {
        label: "Closing-cost checkpoint",
        value: `${currency.format(closingLow)} to ${currency.format(closingHigh)}`,
        detail: `A 1.5% to 4% institution-education range. Your reserve is ${currency.format(closingReserve)}.`,
      },
      {
        label: "Required debt payments",
        value: `${debtToGross.toFixed(1)}% of gross monthly income`,
        detail: "A partial ratio only. Housing costs and lender qualification rules are not included.",
      },
      {
        label: "Post-purchase runway",
        value: `${emergencyMonths.toLocaleString("en-CA")} months`,
        detail: "Your estimate after the purchase funds have been removed.",
      },
    ],
    concepts: [
      {
        title: "Minimum is not the full cash requirement",
        body: "A down payment does not cover closing, moving, immediate repairs, or a post-purchase emergency reserve.",
      },
      {
        title: "Approval and comfort are different",
        body: "A lender may qualify a maximum based on its rules. Your comfortable budget also needs room for maintenance, savings, and other goals.",
      },
    ],
    tradeoffs: [
      {
        title: "Buy sooner",
        body: "Can advance the housing goal, but may reduce liquidity and increase exposure to repairs, rate changes, and transaction costs.",
      },
      {
        title: "Wait and build",
        body: "Can improve the cash cushion and flexibility, but prices, rents, and rates can change while you wait.",
      },
    ],
    nextSteps: [
      downPaymentReady
        ? "Verify the source and accessibility of the down payment funds."
        : "Build a dated plan for the minimum down payment gap.",
      closingReady
        ? "Get province-specific estimates for tax, legal, inspection, moving, and adjustment costs."
        : "Create a separate closing-cost reserve that does not use the emergency fund.",
      "Run a detailed affordability model and then request a lender or broker quote using current rates and complete obligations.",
      timeline === "under-1"
        ? "Before making an offer, verify current federal rules, lender conditions, and purchase-contract contingencies."
        : "Revisit the target price and savings pace at least annually as rules and market conditions change.",
    ],
    articleSlugs: [
      "down-payment-canada",
      "how-much-house-can-i-afford",
      "rent-vs-buy",
    ],
    calculatorSlugs: ["rent-vs-buy"],
    sourceIds: [
      "fcac-down-payment",
      "osfi-mqr",
      "scotia-closing",
      "bmo-affordability",
      "reddit-home",
    ],
    assumptions: [
      "The federal minimum down payment formula reflects guidance reviewed on July 26, 2026.",
      "The 1.5% to 4% closing-cost range is institution educational content, not a government rule.",
      "The debt percentage excludes housing costs and is not a GDS, TDS, or mortgage qualification result.",
      "No response is saved or transmitted.",
    ],
  };
}

export function buildGuidedResult(journeyId, responses) {
  if (journeyId === "next-dollar") return nextDollarResult(responses);
  if (journeyId === "registered-accounts") return registeredResult(responses);
  if (journeyId === "home-readiness") return homeResult(responses);
  throw new Error(`Unknown guided journey: ${journeyId}`);
}
