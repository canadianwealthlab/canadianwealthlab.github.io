import { guidedConfig } from "./config.mjs";

export function futureValue(principal, annualContribution, annualRate, years) {
  const safePrincipal = Math.max(0, Number(principal) || 0);
  const safeContribution = Math.max(0, Number(annualContribution) || 0);
  const safeYears = Math.max(0, Math.round(Number(years) || 0));
  let balance = safePrincipal;
  for (let year = 0; year < safeYears; year += 1) {
    balance = balance * (1 + annualRate) + safeContribution;
  }
  return balance;
}

export function contributionForTarget(principal, target, annualRate, years) {
  const safeYears = Math.max(1, Math.round(Number(years) || 1));
  const grownPrincipal = futureValue(principal, 0, annualRate, safeYears);
  const factor = annualRate === 0
    ? safeYears
    : ((1 + annualRate) ** safeYears - 1) / annualRate;
  return Math.max(0, (Math.max(0, target) - grownPrincipal) / factor);
}

export function retirementProjection(input) {
  const years = Math.max(1, input.retirementAge - input.currentAge);
  const currentAssets = Math.max(0, input.currentAssets);
  const annualContributions = Math.max(0, input.annualContributions);
  const annualSpending = Math.max(0, input.monthlySpending * 12 * input.spendingFactor);
  const reliableIncome = Math.max(0, input.pensionIncome + input.cppIncome + input.oasIncome + input.otherIncome);
  const portfolioSpending = Math.max(0, annualSpending - reliableIncome);
  const scenarios = Object.entries(guidedConfig.retirementRealReturns).map(([label, rate]) => ({
    label,
    rate,
    projected: futureValue(currentAssets, annualContributions, rate, years),
  }));
  const required = {
    cautious: portfolioSpending / guidedConfig.retirementWithdrawalRates.cautious,
    middle: portfolioSpending / guidedConfig.retirementWithdrawalRates.middle,
    optimistic: portfolioSpending / guidedConfig.retirementWithdrawalRates.optimistic,
  };
  const middleSavings = contributionForTarget(currentAssets, required.middle, guidedConfig.retirementRealReturns.middle, years);
  return { years, annualSpending, reliableIncome, portfolioSpending, scenarios, required, middleSavings };
}

export function monthlyMortgagePayment(principal, annualRate, years) {
  const amount = Math.max(0, Number(principal) || 0);
  const months = Math.max(1, Math.round((Number(years) || 1) * 12));
  const monthlyRate = Math.max(0, Number(annualRate) || 0) / 12;
  if (monthlyRate === 0) return amount / months;
  return (amount * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
}

export function mortgagePrepaymentComparison(input) {
  const amount = Math.max(0, input.amount);
  const balance = Math.max(0, input.balance);
  const prepayment = Math.min(amount, balance, Math.max(0, input.prepaymentLimit || amount));
  const years = Math.max(1, input.years);
  const rate = Math.max(0, input.rate);
  const baselinePayment = monthlyMortgagePayment(balance, rate, years);
  const reducedPaymentEquivalent = monthlyMortgagePayment(balance - prepayment, rate, years);
  const interestAvoided = Math.max(0, (baselinePayment - reducedPaymentEquivalent) * years * 12 - prepayment);
  const investmentPrincipal = amount;
  const taxableRetention = input.account === "taxable" ? Math.max(0.5, 1 - input.taxRate * 0.5) : 1;
  const investmentScenarios = Object.entries(guidedConfig.investmentNominalReturns).map(([label, returnRate]) => ({
    label,
    returnRate,
    value: futureValue(investmentPrincipal, 0, returnRate, years) * taxableRetention,
  }));
  const split = Math.min(100, Math.max(0, input.splitPercent ?? 50)) / 100;
  const splitMortgage = prepayment * split;
  const splitInvestment = amount * (1 - split);
  const splitValue = splitMortgage + futureValue(splitInvestment, 0, guidedConfig.investmentNominalReturns.middle, years) * taxableRetention;
  const mortgageFreeMonthsSaved = baselinePayment > 0
    ? Math.min(years * 12, Math.round(prepayment / baselinePayment))
    : 0;
  return {
    prepayment,
    interestAvoided,
    investmentScenarios,
    splitMortgage,
    splitInvestment,
    splitValue,
    baselinePayment,
    mortgageFreeMonthsSaved,
    breakEvenReturn: input.account === "taxable" ? rate / taxableRetention : rate,
  };
}

export function minimumDownPayment(price) {
  const value = Math.max(0, Number(price) || 0);
  if (value >= 1_500_000) return value * 0.2;
  if (value > 500_000) return Math.round((25_000 + (value - 500_000) * 0.1) * 100) / 100;
  return Math.round(value * 0.05 * 100) / 100;
}

export function homeReadinessProjection(input) {
  const price = Math.max(0, input.price);
  const downPayment = Math.min(price, Math.max(0, input.downPayment));
  const principal = price - downPayment;
  const payment = monthlyMortgagePayment(principal, input.mortgageRate, input.amortizationYears);
  const monthlyOwnership = payment
    + input.propertyTax / 12
    + input.condoFees
    + input.utilities
    + input.homeInsurance / 12
    + input.maintenance / 12;
  const upfront = downPayment + input.closingCosts + input.movingRepairs;
  const cashRemaining = input.purchaseCash - upfront;
  const grossMonthlyIncome = Math.max(1, input.grossIncome / 12);
  const housingRatio = monthlyOwnership / grossMonthlyIncome;
  const totalRatio = (monthlyOwnership + input.monthlyDebt) / grossMonthlyIncome;
  const stressRate = Math.max(guidedConfig.mortgageQualifyingFloor, input.mortgageRate + guidedConfig.mortgageQualifyingBuffer);
  const stressPayment = monthlyMortgagePayment(principal, stressRate, input.amortizationYears);
  const holdingPeriods = [5, 10, 15].map((years) => {
    const homeValue = price * (1 + guidedConfig.homeAppreciationRates.middle) ** years;
    const rentPaid = input.monthlyRent * 12 * (((1 + guidedConfig.rentGrowthRates.middle) ** years - 1) / guidedConfig.rentGrowthRates.middle);
    const ownerUnrecoverable = (input.propertyTax + input.homeInsurance + input.maintenance + input.condoFees * 12 + input.utilities * 12) * years + price * 0.08;
    return { years, homeValue, rentPaid, ownerUnrecoverable };
  });
  return { principal, payment, monthlyOwnership, upfront, cashRemaining, housingRatio, totalRatio, stressRate, stressPayment, holdingPeriods };
}

function debtSort(debts, strategy) {
  return [...debts].sort((a, b) => strategy === "snowball"
    ? a.balance - b.balance || b.interestRate - a.interestRate
    : b.interestRate - a.interestRate || a.balance - b.balance);
}

export function simulateDebtPayoff(debtsInput, extraPayment, strategy) {
  const debts = debtSort(debtsInput.map((debt) => ({ ...debt, balance: Math.max(0, debt.balance) })), strategy);
  let month = 0;
  let totalInterest = 0;
  const milestones = [];
  const baseMinimums = debts.reduce((sum, debt) => sum + Math.max(0, debt.minimumPayment), 0);
  while (debts.some((debt) => debt.balance > 0.005) && month < 600) {
    month += 1;
    for (const debt of debts) {
      if (debt.balance <= 0) continue;
      const interest = debt.balance * Math.max(0, debt.interestRate) / 100 / 12;
      debt.balance += interest;
      totalInterest += interest;
    }
    let available = baseMinimums + Math.max(0, extraPayment);
    for (const debt of debts) {
      if (debt.balance <= 0) continue;
      const payment = Math.min(debt.balance, Math.max(0, debt.minimumPayment));
      debt.balance -= payment;
      available -= payment;
      if (debt.balance <= 0.005 && !milestones.some((item) => item.id === debt.id)) {
        milestones.push({ id: debt.id, type: debt.type, month });
      }
    }
    for (const debt of debtSort(debts.filter((item) => item.balance > 0.005), strategy)) {
      if (available <= 0) break;
      const payment = Math.min(debt.balance, available);
      debt.balance -= payment;
      available -= payment;
      if (debt.balance <= 0.005 && !milestones.some((item) => item.id === debt.id)) {
        milestones.push({ id: debt.id, type: debt.type, month });
      }
    }
  }
  return { months: month, totalInterest, milestones, complete: month < 600 };
}

export function allocateRegisteredSavings(input) {
  let remaining = Math.max(0, input.annualSavings);
  const allocations = { match: 0, fhsa: 0, tfsa: 0, rrsp: 0, unallocated: 0 };
  if (input.matchAvailable) {
    allocations.match = Math.min(remaining, Math.max(0, input.matchContribution));
    remaining -= allocations.match;
  }
  const priorities = [];
  if (input.firstHomeEligible && input.goal === "first-home") priorities.push("fhsa");
  if (input.flexibilityNeeded || input.currentTaxRate <= input.futureTaxRate) priorities.push("tfsa");
  if (input.currentTaxRate > input.futureTaxRate || input.goal === "retirement") priorities.push("rrsp");
  for (const account of ["fhsa", "tfsa", "rrsp"]) if (!priorities.includes(account)) priorities.push(account);
  const room = { fhsa: input.fhsaRoom, tfsa: input.tfsaRoom, rrsp: input.rrspRoom };
  for (const account of priorities) {
    const availableRoom = room[account] === "unknown" ? 0 : Math.max(0, Number(room[account]) || 0);
    allocations[account] = Math.min(remaining, availableRoom);
    remaining -= allocations[account];
  }
  allocations.unallocated = remaining;
  const deductible = allocations.fhsa + allocations.rrsp;
  return {
    allocations,
    priorities,
    deductionLow: deductible * Math.max(0, input.currentTaxRate - 0.03),
    deductionHigh: deductible * Math.min(0.6, input.currentTaxRate + 0.03),
  };
}
