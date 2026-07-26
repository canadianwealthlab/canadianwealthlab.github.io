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
  "tfsa-vs-rrsp": [
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
        "“We’ve decided to split our extra income—extra in TFSA and extra payments.”",
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
  "veqt-vs-xeqt": [
    {
      threadTitle: "XEQT and VEQT?",
      subreddit: "r/PersonalFinanceCanada",
      date: "2026-03-10",
      url: "https://www.reddit.com/r/PersonalFinanceCanada/comments/1rpjkl0/xeqt_and_veqt/",
      excerpt:
        "“I would just pick one. They are way more similar than they are different.”",
      takeaway:
        "The discussion highlights a behavioural point that product tables can miss: small allocation and fee differences may matter less than choosing an appropriate all-equity portfolio and contributing consistently.",
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
};
