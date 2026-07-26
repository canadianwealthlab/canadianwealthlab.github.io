"use client";

import { useMemo, useState } from "react";
import type { CalculatorDefinition } from "@/lib/calculators";

type FieldDefinition = {
  key: string;
  label: string;
  value: number;
  min: number;
  max?: number;
  step: number;
  prefix?: string;
  suffix?: string;
};

const fieldSets: Record<CalculatorDefinition["slug"], FieldDefinition[]> = {
  "mortgage-prepayment": [
    { key: "balance", label: "Mortgage balance", value: 480000, min: 1000, step: 1000, prefix: "$" },
    { key: "rate", label: "Interest rate", value: 4.75, min: 0, max: 20, step: 0.05, suffix: "%" },
    { key: "years", label: "Remaining amortization", value: 20, min: 1, max: 40, step: 1, suffix: "years" },
    { key: "extra", label: "Extra monthly payment", value: 500, min: 0, step: 25, prefix: "$" },
  ],
  "rent-vs-buy": [
    { key: "homePrice", label: "Home price", value: 750000, min: 50000, step: 5000, prefix: "$" },
    { key: "downPayment", label: "Down payment", value: 150000, min: 0, step: 5000, prefix: "$" },
    { key: "mortgageRate", label: "Mortgage rate", value: 4.75, min: 0, max: 20, step: 0.05, suffix: "%" },
    { key: "rent", label: "Comparable monthly rent", value: 2900, min: 0, step: 50, prefix: "$" },
    { key: "investmentReturn", label: "Investment return", value: 6, min: -10, max: 20, step: 0.25, suffix: "%" },
  ],
  "tfsa-vs-rrsp": [
    { key: "income", label: "Annual income", value: 95000, min: 0, step: 1000, prefix: "$" },
    { key: "contribution", label: "After-tax contribution", value: 10000, min: 0, step: 250, prefix: "$" },
    { key: "taxRate", label: "Current marginal tax rate", value: 32, min: 0, max: 55, step: 0.5, suffix: "%" },
    { key: "returnRate", label: "Annual investment return", value: 6, min: -10, max: 20, step: 0.25, suffix: "%" },
  ],
  fire: [
    { key: "investments", label: "Current investments", value: 125000, min: 0, step: 5000, prefix: "$" },
    { key: "savings", label: "Annual savings", value: 30000, min: 0, step: 1000, prefix: "$" },
    { key: "spending", label: "Annual spending", value: 55000, min: 1, step: 1000, prefix: "$" },
    { key: "returnRate", label: "Expected annual return", value: 5, min: -10, max: 20, step: 0.25, suffix: "%" },
  ],
};

function money(value: number) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, value));
}

function formatDuration(months: number) {
  const safeMonths = Math.max(0, Math.round(months));
  const years = Math.floor(safeMonths / 12);
  const remainder = safeMonths % 12;
  if (!years) return `${remainder} months`;
  if (!remainder) return `${years} years`;
  return `${years} yr ${remainder} mo`;
}

function mortgageResults(values: Record<string, number>) {
  const balance = Math.max(values.balance, 0);
  const months = Math.max(values.years * 12, 1);
  const rate = Math.max(values.rate / 100 / 12, 0);
  const payment = rate === 0
    ? balance / months
    : (balance * rate) / (1 - Math.pow(1 + rate, -months));
  const acceleratedPayment = payment + Math.max(values.extra, 0);
  const newMonths = rate === 0
    ? balance / acceleratedPayment
    : Math.log(acceleratedPayment / (acceleratedPayment - balance * rate)) / Math.log(1 + rate);
  const baselineInterest = payment * months - balance;
  const newInterest = acceleratedPayment * Math.min(newMonths, months) - balance;
  const date = new Date();
  date.setMonth(date.getMonth() + Math.ceil(Math.min(newMonths, months)));
  return {
    primaryLabel: "Estimated interest saved",
    primary: money(Math.max(0, baselineInterest - newInterest)),
    items: [
      { label: "Time saved", value: formatDuration(months - Math.min(newMonths, months)) },
      { label: "New payoff date", value: date.toLocaleDateString("en-CA", { month: "short", year: "numeric" }) },
      { label: "Regular payment", value: money(payment) },
      { label: "New monthly payment", value: money(acceleratedPayment) },
    ],
    assumption: "Assumes monthly payments, a constant interest rate, and that the extra payment is made every month without penalties.",
  };
}

function simulateRentVsBuy(values: Record<string, number>, years: number) {
  const price = Math.max(values.homePrice, 0);
  const down = Math.min(Math.max(values.downPayment, 0), price);
  const principal = price - down;
  const mortgageMonthlyRate = Math.max(values.mortgageRate / 100 / 12, 0);
  const amortizationMonths = 25 * 12;
  const mortgagePayment = mortgageMonthlyRate === 0
    ? principal / amortizationMonths
    : (principal * mortgageMonthlyRate) / (1 - Math.pow(1 + mortgageMonthlyRate, -amortizationMonths));
  const investmentMonthlyRate = Math.pow(1 + values.investmentReturn / 100, 1 / 12) - 1;
  const closingCosts = price * 0.03;
  let renterPortfolio = down + closingCosts;
  let currentRent = Math.max(values.rent, 0);

  for (let month = 0; month < years * 12; month += 1) {
    const ownerMonthlyCost = mortgagePayment + price * 0.017 / 12;
    const monthlyDifference = Math.max(ownerMonthlyCost - currentRent, 0);
    renterPortfolio = renterPortfolio * (1 + investmentMonthlyRate) + monthlyDifference;
    if ((month + 1) % 12 === 0) currentRent *= 1.02;
  }

  const elapsed = years * 12;
  const mortgageBalance = mortgageMonthlyRate === 0
    ? Math.max(0, principal - mortgagePayment * elapsed)
    : Math.max(0, principal * Math.pow(1 + mortgageMonthlyRate, elapsed) - mortgagePayment * ((Math.pow(1 + mortgageMonthlyRate, elapsed) - 1) / mortgageMonthlyRate));
  const homeValue = price * Math.pow(1.02, years);
  const ownerNetWorth = homeValue * 0.95 - mortgageBalance;
  return { ownerNetWorth, renterPortfolio, difference: ownerNetWorth - renterPortfolio };
}

function rentVsBuyResults(values: Record<string, number>) {
  const five = simulateRentVsBuy(values, 5);
  const ten = simulateRentVsBuy(values, 10);
  const winner = ten.difference >= 0 ? "Buying leads after 10 years" : "Renting leads after 10 years";
  return {
    primaryLabel: winner,
    primary: money(Math.abs(ten.difference)),
    items: [
      { label: "Buy net worth — year 5", value: money(five.ownerNetWorth) },
      { label: "Rent net worth — year 5", value: money(five.renterPortfolio) },
      { label: "Buy net worth — year 10", value: money(ten.ownerNetWorth) },
      { label: "Rent net worth — year 10", value: money(ten.renterPortfolio) },
    ],
    assumption: "Assumes 25-year amortization, 2% annual home appreciation and rent growth, 1.7% yearly tax and maintenance, 3% buying costs, and 5% selling costs.",
  };
}

function tfsaRrspResults(values: Record<string, number>) {
  const contribution = Math.max(values.contribution, 0);
  const taxRate = Math.min(Math.max(values.taxRate / 100, 0), 0.55);
  const growth = Math.pow(1 + values.returnRate / 100, 20);
  const grossRrspContribution = taxRate < 1 ? contribution / (1 - taxRate) : contribution;
  const refund = grossRrspContribution - contribution;
  const tfsa = contribution * growth;
  const rrsp = grossRrspContribution * growth;
  const rrspAfterTax = rrsp * 0.7;
  const difference = rrspAfterTax - tfsa;
  return {
    primaryLabel: difference >= 0 ? "RRSP leads after tax" : "TFSA leads after tax",
    primary: money(Math.abs(difference)),
    items: [
      { label: "TFSA value in 20 years", value: money(tfsa) },
      { label: "RRSP value before tax", value: money(rrsp) },
      { label: "RRSP value after tax", value: money(rrspAfterTax) },
      { label: "Estimated tax refund invested", value: money(refund) },
    ],
    assumption: `Uses the entered ${money(values.income)} income as context, a 20-year horizon, full reinvestment of the RRSP refund, and a 30% tax rate on RRSP withdrawal.`,
  };
}

function fireResults(values: Record<string, number>) {
  const target = Math.max(values.spending, 0) * 25;
  let balance = Math.max(values.investments, 0);
  let years = 0;
  while (balance < target && years < 80) {
    balance = balance * (1 + values.returnRate / 100) + Math.max(values.savings, 0);
    years += 1;
  }
  const reached = years < 80;
  return {
    primaryLabel: "Estimated time to financial independence",
    primary: reached ? `${years} ${years === 1 ? "year" : "years"}` : "80+ years",
    items: [
      { label: "FI portfolio target", value: money(target) },
      { label: "Projected portfolio", value: money(balance) },
      { label: "Current progress", value: `${Math.min(100, Math.round((values.investments / target) * 100))}%` },
      { label: "Target withdrawal", value: money(values.spending) + "/yr" },
    ],
    assumption: "Uses a 4% starting withdrawal rule, annual compounding, year-end savings, and a constant nominal return. Taxes, inflation, and public benefits are not modelled.",
  };
}

export function CalculatorExperience({ calculator }: { calculator: CalculatorDefinition }) {
  const fields = fieldSets[calculator.slug];
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(fields.map((field) => [field.key, field.value])),
  );

  const results = useMemo(() => {
    if (calculator.slug === "mortgage-prepayment") return mortgageResults(values);
    if (calculator.slug === "rent-vs-buy") return rentVsBuyResults(values);
    if (calculator.slug === "tfsa-vs-rrsp") return tfsaRrspResults(values);
    return fireResults(values);
  }, [calculator.slug, values]);

  return (
    <div className="calculator-workspace">
      <section className="calculator-inputs" aria-label="Calculator inputs">
        <div className="panel-label"><span>YOUR INPUTS</span><span>CAD</span></div>
        <div className="input-grid">
          {fields.map((field) => (
            <div className="field" key={field.key}>
              <label htmlFor={field.key}>{field.label}</label>
              <div className="input-wrap">
                {field.prefix && <span className="input-prefix">{field.prefix}</span>}
                <input
                  className={field.prefix ? "has-prefix" : ""}
                  id={field.key}
                  inputMode="decimal"
                  max={field.max}
                  min={field.min}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setValues((current) => ({ ...current, [field.key]: Number.isFinite(next) ? next : 0 }));
                  }}
                  step={field.step}
                  type="number"
                  value={values[field.key]}
                />
                {field.suffix && <span className="input-suffix">{field.suffix}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="calculator-results" aria-live="polite" aria-label="Calculator results">
        <div className="panel-label"><span>MODEL OUTPUT</span><span>ESTIMATE</span></div>
        <div className="result-primary">
          <span>{results.primaryLabel}</span>
          <strong>{results.primary}</strong>
        </div>
        <div className="result-grid">
          {results.items.map((item) => (
            <div className="result-item" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
        <div className="assumptions">
          <h3>Key assumptions</h3>
          <p>{results.assumption}</p>
        </div>
      </section>
    </div>
  );
}
