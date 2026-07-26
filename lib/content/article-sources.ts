export type ArticleSource = {
  name: string;
  publisher: string;
  url: string;
};

export const articleSourcesBySlug: Record<string, ArticleSource[]> = {
  "tfsa-vs-rrsp": [
    {
      name: "Tax-Free Savings Account",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account.html",
    },
    {
      name: "RRSPs and related plans",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans.html",
    },
  ],
  "pay-off-mortgage-or-invest": [
    {
      name: "Paying off your mortgage faster",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/pay-mortgage-faster.html",
    },
    {
      name: "Mortgage prepayment: know your rights",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/rights-responsibilities/rights-mortgages/rights-prepayments.html",
    },
  ],
  "veqt-vs-xeqt": [
    {
      name: "Vanguard All-Equity ETF Portfolio (VEQT)",
      publisher: "Vanguard Canada",
      url: "https://www.vanguard.ca/en/product/etf/asset-allocation/9692/vanguard-all-equity-etf-portfolio",
    },
    {
      name: "iShares Core Equity ETF Portfolio (XEQT)",
      publisher: "BlackRock Canada",
      url: "https://www.blackrock.com/ca/investors/en/products/309480/ishares-core-equity-etf-portfolio",
    },
  ],
  "how-much-to-retire": [
    {
      name: "Planning and saving for retirement",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/retirement-planning/start-saving-retirement.html",
    },
    {
      name: "Canadian Retirement Income Calculator",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/retirement-income-calculator.html",
    },
    {
      name: "Sources of income during retirement",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/life-events/retirement/sources-income.html",
    },
  ],
  "rent-vs-buy": [
    {
      name: "Mortgages",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages.html",
    },
    {
      name: "Mortgage terms and amortization",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/mortgage-terms-amortization.html",
    },
  ],
  "how-much-house-can-i-afford": [
    {
      name: "Mortgages and Mortgage Qualifier Tool",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages.html",
    },
    {
      name: "Minimum qualifying rate for uninsured mortgages",
      publisher: "Office of the Superintendent of Financial Institutions",
      url: "https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages",
    },
    {
      name: "Questions to ask about mortgages",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/content/dam/canada/financial-consumer-agency/migration/eng/resources/educationalprograms/ft-of/documents/mortgages-4-5-eng.pdf",
    },
  ],
  "down-payment-canada": [
    {
      name: "How much you need for a down payment",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html",
    },
    {
      name: "CMHC mortgage loan insurance explained",
      publisher: "Canada Mortgage and Housing Corporation",
      url: "https://www.cmhc-schl.gc.ca/observer/2025/cmhc-mortgage-loan-insurance-explained",
    },
    {
      name: "Home Buyers’ Plan",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan.html",
    },
  ],
  "tfsa-guide": [
    {
      name: "Tax-Free Savings Account",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account.html",
    },
    {
      name: "Calculate your TFSA contribution room",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/contributing/calculate-room.html",
    },
    {
      name: "Making or replacing withdrawals from a TFSA",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/withdraw.html",
    },
    {
      name: "Tax payable on an excess TFSA amount",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/contributing/overcontribute.html",
    },
  ],
  "rrsp-guide": [
    {
      name: "RRSPs and related plans",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans.html",
    },
    {
      name: "RRSP and other registered plans for retirement",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/t4040/rrsps-other-registered-plans-retirement.html",
    },
    {
      name: "Tax rates on RRSP withdrawals",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/making-withdrawals/tax-rates-on-withdrawals.html",
    },
  ],
  "how-to-start-investing-canada": [
    {
      name: "Investing basics",
      publisher: "Canadian Investment Regulatory Organization",
      url: "https://www.ciro.ca/office-investor/investing-basics",
    },
    {
      name: "DIY vs. advised investing",
      publisher: "Canadian Investment Regulatory Organization",
      url: "https://www.ciro.ca/office-investor/investing-basics/diy-vs-advised-investing-which-right-you",
    },
    {
      name: "Understanding risk",
      publisher: "Canadian Investment Regulatory Organization",
      url: "https://www.ciro.ca/office-investor/understanding-risk",
    },
  ],
  "retirement-planning-canada": [
    {
      name: "Planning and saving for retirement",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/retirement-planning/start-saving-retirement.html",
    },
    {
      name: "Canadian Retirement Income Calculator",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/retirement-income-calculator.html",
    },
    {
      name: "Sources of income during retirement",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/life-events/retirement/sources-income.html",
    },
  ],
  "cpp-guide": [
    {
      name: "Canada Pension Plan retirement pension",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp.html",
    },
    {
      name: "How much you could receive",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/amount.html",
    },
    {
      name: "CPP pensions and benefits monthly amounts",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/payment-amounts.html",
    },
  ],
  "when-to-take-cpp": [
    {
      name: "When to start your CPP retirement pension",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/when-start.html",
    },
    {
      name: "How much CPP you could receive",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/amount.html",
    },
    {
      name: "Canadian Retirement Income Calculator",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/retirement-income-calculator.html",
    },
  ],
  "income-tax-brackets-canada": [
    {
      name: "Current year tax rates and income brackets (2026)",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html",
    },
    {
      name: "How progressive tax rates and brackets work",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/learn-progressive-taxes.html",
    },
  ],
  "emergency-fund-canada": [
    {
      name: "Setting up an emergency fund",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/savings-investments/setting-up-emergency-funds.html",
    },
    {
      name: "Limiting future debt",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/debt/limiting-debt.html",
    },
  ],
};
