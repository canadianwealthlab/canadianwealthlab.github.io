export type CommunityDiscussion = {
  threadTitle: string;
  subreddit: string;
  date: string;
  url: string;
  excerpt: string;
  takeaway: string;
};

export const communityDiscussionsBySlug: Record<
  string,
  CommunityDiscussion[]
> = {
  "tfsa-rrsp-fhsa": [
    {
      threadTitle: "RRSP vs TFSA",
      subreddit: "r/PersonalFinanceCanada",
      date: "2026-04-20",
      url: "https://www.reddit.com/r/PersonalFinanceCanada/comments/1sqe6dx/rrsp_vs_tfsa/",
      excerpt: "“It doesn’t have to be one vs the other.”",
      takeaway:
        "Replies repeatedly return to income, tax bracket, flexibility, and future withdrawal needs. That is the useful signal: the account decision changes with the household rather than producing one universal winner.",
    },
  ],
  "pay-off-mortgage-or-invest": [
    {
      threadTitle: "Should I increase my mortgage payments or invest?",
      subreddit: "r/PersonalFinanceCanada",
      date: "2026-06-12",
      url: "https://www.reddit.com/r/PersonalFinanceCanada/comments/1u48pou/should_i_increase_my_mortgage_payments_by_20_or/",
      excerpt:
        "“We’ve decided to split our extra income: extra in TFSA and extra payments.”",
      takeaway:
        "The discussion captures the practical middle ground between a guaranteed mortgage return and uncertain investment growth. Several participants also connect the choice to risk tolerance and retirement timing.",
    },
  ],
  "rent-vs-buy": [
    {
      threadTitle: "Buying a house vs. continuing to rent and save",
      subreddit: "r/PersonalFinanceCanada",
      date: "2026-07-16",
      url: "https://www.reddit.com/r/PersonalFinanceCanada/comments/1uxorkw/buying_a_house_vs_continuing_to_rent_and_save/",
      excerpt: "“Do you like where you live now?”",
      takeaway:
        "The highest-value replies widen the decision beyond monthly cost. Stability, location, space, mobility, invested savings, maintenance, and the expected holding period all change the answer.",
    },
  ],
  "how-much-to-retire": [
    {
      threadTitle: "How much is enough for retirement?",
      subreddit: "r/PersonalFinanceCanada",
      date: "2023-06-04",
      url: "https://www.reddit.com/r/PersonalFinanceCanada/comments/13zwkrc/how_much_is_enough_for_retirement_seeking_your/",
      excerpt:
        "“When you have enough money to support your lifestyle after you stop working.”",
      takeaway:
        "The thread demonstrates why a single national retirement number is weak. Spending, housing, account access, pension income, taxes, and flexibility determine whether the same portfolio is adequate for one person and insufficient for another.",
    },
  ],
  "how-much-house-can-i-afford": [
    {
      threadTitle: "Buying a house vs. continuing to rent and save",
      subreddit: "r/PersonalFinanceCanada",
      date: "2026-07-16",
      url: "https://www.reddit.com/r/PersonalFinanceCanada/comments/1uxorkw/buying_a_house_vs_continuing_to_rent_and_save/",
      excerpt: "“Do you like where you live now?”",
      takeaway:
        "The question is a useful counterweight to lender math. Affordability includes stability, location, space, mobility, maintenance, and the value of keeping savings invested, not only the approved payment.",
    },
  ],
  "down-payment-canada": [
    {
      threadTitle: "Is it worth waiting for a 20% down payment?",
      subreddit: "r/PersonalFinanceCanada",
      date: "2026-02-15",
      url: "https://www.reddit.com/r/PersonalFinanceCanada/comments/1r6wise/first_time_buying_a_home_is_it_worth_waiting_for/",
      excerpt: "“A 20% down payment would likely take me another 2–3 years.”",
      takeaway:
        "The discussion shows the real tradeoff: avoiding mortgage insurance must be weighed against additional rent, market changes, liquidity, and the buyer’s expected holding period.",
    },
  ],
  "tfsa-guide": [
    {
      threadTitle: "RRSP vs TFSA",
      subreddit: "r/PersonalFinanceCanada",
      date: "2026-04-20",
      url: "https://www.reddit.com/r/PersonalFinanceCanada/comments/1sqe6dx/rrsp_vs_tfsa/",
      excerpt: "“It doesn’t have to be one vs the other.”",
      takeaway:
        "The replies emphasize that room, tax rates, flexibility, and the purpose of the money matter more than a universal account ranking.",
    },
  ],
  "rrsp-guide": [
    {
      threadTitle: "RRSP vs TFSA",
      subreddit: "r/PersonalFinanceCanada",
      date: "2026-04-20",
      url: "https://www.reddit.com/r/PersonalFinanceCanada/comments/1sqe6dx/rrsp_vs_tfsa/",
      excerpt: "“It doesn’t have to be one vs the other.”",
      takeaway:
        "The community discussion reinforces the key planning point: an RRSP deduction should be evaluated against current income, future withdrawals, flexibility, and how the refund will be used.",
    },
  ],
  "retirement-spending-withdrawal-rates": [
    {
      threadTitle: "How much is enough for retirement?",
      subreddit: "r/PersonalFinanceCanada",
      date: "2023-06-04",
      url: "https://www.reddit.com/r/PersonalFinanceCanada/comments/13zwkrc/how_much_is_enough_for_retirement_seeking_your/",
      excerpt:
        "“When you have enough money to support your lifestyle after you stop working.”",
      takeaway:
        "The thread illustrates why lifestyle, housing, pension income, taxes, and flexibility produce more useful answers than a single savings target.",
    },
  ],
  "cpp-guide": [
    {
      threadTitle: "When should you take CPP in retirement?",
      subreddit: "r/PersonalFinanceCanada",
      date: "2022-04-18",
      url: "https://www.reddit.com/r/PersonalFinanceCanada/comments/u64cwb/when_should_you_take_cpp_in_retirement/",
      excerpt:
        "“When to take CPP is a complex question involving tax brackets, life expectancy, monetary needs, etc.”",
      takeaway:
        "The discussion is useful because it moves beyond the maximum payment. Personal estimates, cash needs, longevity, taxes, and the assets used while delaying all affect the decision.",
    },
  ],
  "emergency-fund-canada": [
    {
      threadTitle: "Emergency fund questions",
      subreddit: "r/PersonalFinanceCanada",
      date: "2026-01-03",
      url: "https://www.reddit.com/r/PersonalFinanceCanada/comments/1q39zn0/emergency_fund_questions/",
      excerpt:
        "“Start by saving for the 3 months then go from there.”",
      takeaway:
        "The replies show why the target is personal: essential expenses, dependants, job stability, housing, pets, insurance, and other liquid resources all change the required runway.",
    },
  ],
};
