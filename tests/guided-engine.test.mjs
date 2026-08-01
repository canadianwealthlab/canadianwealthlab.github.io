import assert from "node:assert/strict";
import test from "node:test";
import {
  buildGuidedResult,
  minimumDownPayment,
  validateGuidedStep,
  visibleStepIds,
} from "../lib/guided/engine.mjs";

test("calculates the current federal minimum down payment bands", () => {
  assert.equal(minimumDownPayment(500_000), 25_000);
  assert.equal(minimumDownPayment(700_000), 45_000);
  assert.equal(minimumDownPayment(1_499_999), 124_999.9);
  assert.equal(minimumDownPayment(1_500_000), 300_000);
  assert.equal(minimumDownPayment(-10), 0);
});

test("builds a retirement range without presenting a forecast", () => {
  const result = buildGuidedResult("retirement-readiness", {
    "current-age": 40, "retirement-age": 65, "retirement-spending": 5_000,
    "spending-change": "same", "current-assets": 250_000,
    "annual-contributions": 15_000, "pension-income": 0,
    "cpp-income": 15_000, "oas-income": 9_000, "other-income": 0,
  });
  assert.equal(result.scenarios.length, 3);
  assert.match(result.summary, /not a forecast or guarantee/i);
  assert.ok(result.reviseStepIds.includes("retirement-age"));
});

test("compares mortgage, investment, and split scenarios", () => {
  const result = buildGuidedResult("mortgage-vs-invest", {
    "available-amount": 20_000, "emergency-months": 6,
    "income-stability": "stable", "high-interest-debt": "none",
    "mortgage-balance": 400_000, "mortgage-rate": 5,
    "mortgage-years": 20, "prepayment-limit": 40_000,
    "investment-account": "tfsa", "investment-horizon": 10,
    "loss-comfort": "hold", priority: "balance",
  });
  assert.equal(result.scenarios.length, 5);
  assert.ok(result.spectrum.position >= 0 && result.spectrum.position <= 100);
  assert.match(result.assumptions.join(" "), /not forecasts|scenarios|nominal/i);
});

test("never allocates registered savings against unknown room", () => {
  const result = buildGuidedResult("registered-accounts", {
    "primary-goal": "retirement", "annual-savings": 12_000,
    "employer-match": "no", "tfsa-room": "unknown", "rrsp-room": "unknown",
    "current-tax-rate": 35, "future-tax-rate": "lower", flexibility: "low",
  });
  assert.match(result.metrics[2].value, /\$12,000/);
  assert.ok(result.missingInformation.length >= 2);
});

test("produces separate home qualification and comfort signals", () => {
  const result = buildGuidedResult("home-readiness", {
    "target-price": 700_000, "purchase-cash": 100_000, "down-payment": 70_000,
    "closing-costs": 15_000, "moving-repairs": 8_000, "emergency-months": 3,
    "gross-income": 140_000, "monthly-debt": 800, "mortgage-rate": 5,
    amortization: "25", "property-tax": 5_000, utilities: 250,
    "home-insurance": 1_800, maintenance: 7_000, "monthly-rent": 2_800,
  });
  assert.equal(result.scenarios.length, 3);
  assert.match(result.headline, /qualification, personal comfort, and rent-versus-buy/i);
  assert.match(result.metrics[3].detail, /5\.25%/);
});

test("escalates distressed debt cases to qualified support", () => {
  const result = buildGuidedResult("debt-plan", {
    "payment-affordability": "no", "account-status": "past-due",
    "borrowing-essentials": "often", debts: [{ id: "card", type: "Credit card", balance: 8_000, interestRate: 20, minimumPayment: 240, security: "unsecured", rateType: "variable", status: "past-due" }],
    "extra-payment": 0, "emergency-months": 0, "income-stability": "uncertain",
    "payoff-style": "avalanche",
  });
  assert.equal(result.urgentSupport, true);
  assert.ok(result.sourceIds.includes("osb-lit"));
  assert.match(result.nextSteps.join(" "), /creditors/i);
});

test("validates debt rows and permits explicit unknown money values", () => {
  assert.equal(validateGuidedStep({ type: "money", id: "room", max: 40_000, allowUnknown: true }, "unknown"), "");
  assert.match(validateGuidedStep({ type: "debt-list", id: "debts", maxItems: 12 }, [{ id: "x", type: "Card", balance: 1_000, interestRate: 80, minimumPayment: 50 }]), /0% to 60%/);
});

test("shows the FHSA context step only for a first-home goal", () => {
  const journey = {
    steps: [
      { id: "primary-goal", type: "choice" },
      {
        id: "first-home-status",
        type: "choice",
        showWhen: { stepId: "primary-goal", equals: "first-home" },
      },
      { id: "time-horizon", type: "choice" },
    ],
  };

  assert.deepEqual(visibleStepIds(journey, { "primary-goal": "first-home" }), [
    "primary-goal",
    "first-home-status",
    "time-horizon",
  ]);
  assert.deepEqual(visibleStepIds(journey, { "primary-goal": "retirement" }), [
    "primary-goal",
    "time-horizon",
  ]);
});

test("prioritizes a buffer and high-cost debt when both signals are present", () => {
  const result = buildGuidedResult("next-dollar", {
    "debt-rate": "over-12",
    "emergency-months": 1,
    "income-stability": "stable",
    "employer-match": "no",
    "monthly-amount": 750,
  });

  assert.equal(result.signal, "Buffer, then high-cost debt");
  assert.match(result.metrics[0].value, /\$750/);
  assert.ok(result.sourceIds.includes("fcac-emergency"));
});

test("uses an FHSA learning path without claiming eligibility", () => {
  const result = buildGuidedResult("registered-accounts", {
    "primary-goal": "first-home",
    "first-home-status": "likely",
    "time-horizon": "5-15",
    "employer-match": "no",
    contribution: 8_000,
    "tax-rate": 30,
  });

  assert.match(result.signal, /FHSA/);
  assert.match(result.metrics[1].value, /\$2,400/);
  assert.ok(result.assumptions.some((item) => item.includes("not determined")));
});

test("keeps the home result distinct from mortgage qualification", () => {
  const result = buildGuidedResult("home-readiness", {
    timeline: "under-1",
    "target-price": 700_000,
    "down-payment": 60_000,
    "closing-reserve": 16_000,
    "gross-income": 140_000,
    "monthly-debt": 800,
    "emergency-months": 4,
  });

  assert.equal(result.signal, "Ready for a detailed stress test");
  assert.equal(result.metrics[0].value, "$45,000");
  assert.match(result.summary, /does not estimate a mortgage approval/i);
  assert.match(result.metrics[2].detail, /not included/i);
});
