import assert from "node:assert/strict";
import test from "node:test";
import {
  buildGuidedResult,
  minimumDownPayment,
  visibleStepIds,
} from "../lib/guided/engine.mjs";

test("calculates the current federal minimum down payment bands", () => {
  assert.equal(minimumDownPayment(500_000), 25_000);
  assert.equal(minimumDownPayment(700_000), 45_000);
  assert.equal(minimumDownPayment(1_499_999), 124_999.9);
  assert.equal(minimumDownPayment(1_500_000), 300_000);
  assert.equal(minimumDownPayment(-10), 0);
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
