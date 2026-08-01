export const financialValues = {
  reviewedDate: "2026-08-01",
  taxYear: 2026,
  tfsaAnnualLimit: 7_000,
  fhsaAnnualLimit: 8_000,
  fhsaLifetimeLimit: 40_000,
  hbpWithdrawalLimit: 60_000,
  rrspDollarLimit: 33_810,
  federalTaxBrackets: [
    { threshold: 58_523, rate: 0.14 },
    { threshold: 117_045, rate: 0.205 },
    { threshold: 181_440, rate: 0.26 },
    { threshold: 258_482, rate: 0.29 },
    { threshold: Number.POSITIVE_INFINITY, rate: 0.33 },
  ],
  cppMaximumAt65Monthly: 1_507.65,
  cppAverageNewAt65Monthly: 877.01,
  mortgageMinimumQualifyingRate: 0.0525,
  mortgageQualifyingRateBuffer: 0.02,
  insuredMortgagePriceCeiling: 1_500_000,
  bankOfCanadaInflationTargetMidpoint: 0.02,
} as const;

export type FinancialValues = typeof financialValues;
