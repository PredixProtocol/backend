export const marketData = [
  {
    id: "predict-x-tn07-matt-van-epps",
    question:
      "Will Matt Van Epps win the U.S. House election in Tennessee's 7th Congressional District (TN-07)?",
    description:
      "This market predicts the outcome of the U.S. House of Representatives election for Tennessee’s 7th Congressional District (TN-07), specifically whether Matt Van Epps will be elected as the winning candidate. The market will resolve to YES if Matt Van Epps is officially declared the winner of the election by the relevant state or federal election authority, following the certification of final election results. The market will resolve to NO if Matt Van Epps is not declared the winner, withdraws from the race, is disqualified, or if another candidate is officially certified as the winner. In the event of election delays, recounts, or legal challenges, the market will remain open and unresolved until a final, authoritative outcome is confirmed. Resolution will be determined based on publicly available, verifiable information from official government election sources or widely recognized, reputable news organizations reporting the certified results.",
    imageUrl:
      "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg",
    author: {
      name: "Donald J. Trump",
      username: "@realDonaldTrump",
      userId: "44196397",
      avatar:
        "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg",
      verifiedGov: true,
      verifiedBlue: false,
      verifiedOrange: false,
    },
    post: {
      pid: "1995898845134303294",
      text: "The radical left has been using fraudulent government programs for a long time to import and retain vast numbers of illegal (and legal, in some cases) immigrants to win elections and turn America into a single-party state, destroying any real democracy. The more you look at it,",
      banner: "https://pbs.twimg.com/profile_banners/44196397/1739948056",
      createdAt: "2025-12-24T10:30:00Z",
    },
    probability: {
      value: 30,
      unit: "percent",
    },
    engagement: {
      replies: 37000,
      reposts: 91000,
      likes: 605000,
      views: 81000000,
    },
    source: {
      platform: "x",
      url: "https://x.com/realDonaldTrump/status/1995898845134303294",
    },
    market: {
      blockchainMarketId: 1,
      tvl: {
        value: 1700000,
        symbol: "MOVE",
      },
      protocol: {
        name: "Canopy",
        icon: "/images/protocol/canopy.png",
        apy: 1000,
      },
      token: {
        name: "Movement",
        icon: "/images/token/movement.png",
      },
      endDate: "2026-03-24T10:30:00Z",
      totalPoolSize: "1700000",
      totalYieldUntilEnd: "1000000",
      createdAt: "2025-12-24T10:30:00Z",
    },
    actions: [
      {
        label: "YES",
        type: "positive",
      },
      {
        label: "NO",
        type: "negative",
      },
    ],
  },
];

export type MarketType = (typeof marketData)[0];
