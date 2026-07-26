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
};
