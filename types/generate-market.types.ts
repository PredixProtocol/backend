export interface AIAnalysisResult {
  possible: boolean;
  question?: string;
  description?: string;
  probability?: number;
  suggestedEndDays?: number;
  rejectionReason?: string;
}

export interface GenerateMarketInput {
  url: string;
}

export interface MarketAuthor {
  name: string;
  username: string;
  userId: string;
  avatar: string;
  verifiedGov: boolean;
  verifiedBlue: boolean;
  verifiedOrange: boolean;
}

export interface MarketPost {
  pid: string;
  text: string;
  banner: string | null;
  createdAt: string;
}

export interface MarketEngagement {
  replies: number;
  reposts: number;
  likes: number;
  views: number;
}

export interface MarketSource {
  platform: string;
  url: string;
}

export interface MarketTvl {
  value: number;
  symbol: string;
}

export interface MarketProtocol {
  name: string;
  icon: string;
  apy: number;
}

export interface MarketToken {
  name: string;
  icon: string;
}

export interface MarketProbability {
  value: number;
  unit: string;
}

export interface MarketDetails {
  blockchainMarketId: number | null;
  contractAddress: string | null;
  tvl: MarketTvl | null;
  protocol: MarketProtocol | null;
  token: MarketToken | null;
  endDate: string | null;
  totalPoolSize: string | null;
  totalYieldUntilEnd: string | null;
  createdAt: string;
  vaultCreationError?: string;
}

export interface MarketAction {
  label: string;
  type: string;
}

export interface GeneratedMarket {
  id: string;
  question: string;
  description: string;
  imageUrl: string;
  author: MarketAuthor;
  post: MarketPost;
  probability: MarketProbability;
  engagement: MarketEngagement;
  source: MarketSource;
  market: MarketDetails;
  actions: MarketAction[];
}

export interface GenerateMarketSuccess {
  success: true;
  data: GeneratedMarket;
}

export interface GenerateMarketFailure {
  success: false;
  reason: string;
}

export type GenerateMarketResult = GenerateMarketSuccess | GenerateMarketFailure;
