export type ArticleSource = {
  name: string;
  publisher: string;
  url: string;
};

export const defaultSourcesBySection: Record<string, ArticleSource[]> = {
  "start-here": [
    {
      name: "Your Financial Toolkit",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/financial-toolkit.html",
    },
    {
      name: "Saving for the future",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/educational-programs/saving-future.html",
    },
  ],
  "money-management": [
    {
      name: "Budget Planner",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://itools-ioutils.fcac-acfc.gc.ca/BP-PB/budget-planner-tool",
    },
    {
      name: "Setting up an emergency fund",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/savings-investments/setting-up-emergency-funds.html",
    },
    {
      name: "Paying back your debt",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/debt/plan-debt-free.html",
    },
  ],
  taxes: [
    {
      name: "Current year tax rates and income brackets (2026)",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html",
    },
    {
      name: "Personal income tax",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/services/taxes/income-tax/personal-income-tax.html",
    },
  ],
  investing: [
    {
      name: "Investing basics",
      publisher: "Canadian Investment Regulatory Organization",
      url: "https://www.ciro.ca/office-investor/investing-basics",
    },
    {
      name: "Understanding risk",
      publisher: "Canadian Investment Regulatory Organization",
      url: "https://www.ciro.ca/office-investor/understanding-risk",
    },
    {
      name: "Investment fees",
      publisher: "Ontario Securities Commission",
      url: "https://www.getsmarteraboutmoney.ca/learning-path/investing-basics/investment-fees/",
    },
  ],
  housing: [
    {
      name: "Mortgages",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages.html",
    },
    {
      name: "Preparing to get a mortgage",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/preparing-mortgage.html",
    },
  ],
  retirement: [
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
  perspective: [
    {
      name: "Sources and research standards",
      publisher: "Canadian Wealth Lab",
      url: "/about/sources-and-corrections",
    },
    {
      name: "Editorial policy",
      publisher: "Canadian Wealth Lab",
      url: "/about/editorial-standards",
    },
  ],
};

export const articleSourcesBySlug: Record<string, ArticleSource[]> = {
  "tfsa-rrsp-fhsa": [
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
    {
      name: "First Home Savings Account",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account.html",
    },
    {
      name: "Home Buyers' Plan",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan.html",
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
    {
      name: "When to start your CPP retirement pension",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/when-start.html",
    },
    {
      name: "Canadian Retirement Income Calculator",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/retirement-income-calculator.html",
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
  "how-canadian-income-tax-works": [
    {
      name: "Current year tax rates and income brackets (2026)",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html",
    },
    {
      name: "Personal income tax",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/services/taxes/income-tax/personal-income-tax.html",
    },
  ],
  "investment-taxation-canada": [
    {
      name: "Capital losses",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12700-capital-gains/capital-losses-deductions.html",
    },
    {
      name: "Tax treatment of mutual funds",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12700-capital-gains/completing-schedule-3/tax-treatment-mutual-funds.html",
    },
    {
      name: "Foreign tax credit",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-40500-federal-foreign-tax-credit.html",
    },
  ],
  "self-employment-and-incorporation": [
    {
      name: "Small businesses and self-employed income",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/small-businesses-self-employed-income.html",
    },
    {
      name: "Corporation",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/small-businesses-self-employed-income/setting-your-business/corporation.html",
    },
    {
      name: "Personal services business fact sheet",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/corporations/corporation-income-tax-return/tax-implications-personal-services-business/fact-sheet-personal-business.html",
    },
  ],
  "choosing-managing-mortgage": [
    {
      name: "Choosing a mortgage that is right for you",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/choose-mortgage.html",
    },
    {
      name: "Mortgage terms and amortization",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/mortgage-terms-amortization.html",
    },
    {
      name: "Renewing your mortgage",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/renew-mortgage.html",
    },
    {
      name: "Mortgage prepayment: know your rights",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/rights-responsibilities/rights-mortgages/rights-prepayments.html",
    },
  ],
  "rrsp-rrif-retirement-withdrawals": [
    {
      name: "Registered Retirement Income Fund",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-retirement-income-fund-rrif.html",
    },
    {
      name: "RRSPs and other registered plans for retirement",
      publisher: "Canada Revenue Agency",
      url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/t4040/rrsps-other-registered-plans-retirement.html",
    },
    {
      name: "Old Age Security pension recovery tax",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/recovery-tax.html",
    },
  ],
  "oas-employer-pensions": [
    {
      name: "Old Age Security",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/old-age-security.html",
    },
    {
      name: "Old Age Security payment amounts",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/payments.html",
    },
    {
      name: "Old Age Security pension recovery tax",
      publisher: "Government of Canada",
      url: "https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/recovery-tax.html",
    },
  ],
  "short-term-money": [
    {
      name: "What's covered",
      publisher: "Canada Deposit Insurance Corporation",
      url: "https://www.cdic.ca/depositors/whats-covered/",
    },
    {
      name: "Saving and investing",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/savings-investments.html",
    },
  ],
  "bonds-gics-cash-concentrated-stock": [
    {
      name: "What's covered",
      publisher: "Canada Deposit Insurance Corporation",
      url: "https://www.cdic.ca/depositors/whats-covered/",
    },
    {
      name: "Understanding risk",
      publisher: "Canadian Investment Regulatory Organization",
      url: "https://www.ciro.ca/office-investor/understanding-risk",
    },
  ],
  "condo-strata-due-diligence": [
    {
      name: "Strata depreciation report requirements",
      publisher: "Province of British Columbia",
      url: "https://www2.gov.bc.ca/gov/content?id=E4AA6CEB20624EE7A42D6A45C03669B8",
    },
    {
      name: "Preparing to get a mortgage",
      publisher: "Financial Consumer Agency of Canada",
      url: "https://www.canada.ca/en/financial-consumer-agency/services/mortgages/preparing-mortgage.html",
    },
  ],
};
