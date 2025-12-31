import { graphqlRequest } from '../lib/graphql-client';

export interface IndexerMarket {
  id: string;
  name: string;
  owner: string;
  maturity: string;
  asset: string;
  feeBPS: string;
  isOfficial: boolean;
  isMatured: boolean;
  truePool: string;
  falsePool: string;
  totalPool: string;
  createdAt: string;
  transactionHash: string;
}

const MARKET_BY_ID_QUERY = `
  query MarketById($id: String!) {
    market(id: $id) {
      id
      name
      owner
      maturity
      asset
      feeBPS
      isOfficial
      isMatured
      truePool
      falsePool
      totalPool
      createdAt
      transactionHash
    }
  }
`;

const MARKETS_BY_IDS_QUERY = `
  query MarketsByIds($ids: [String!]!) {
    markets(where: { id_in: $ids }) {
      items {
        id
        name
        owner
        maturity
        asset
        feeBPS
        isOfficial
        isMatured
        truePool
        falsePool
        totalPool
        createdAt
        transactionHash
      }
    }
  }
`;

export async function getIndexerMarketById(
  contractAddress: string
): Promise<IndexerMarket | null> {
  try {
    const data = await graphqlRequest<{ market: IndexerMarket | null }>(
      MARKET_BY_ID_QUERY,
      { id: contractAddress.toLowerCase() }
    );
    return data.market || null;
  } catch {
    return null;
  }
}

export async function getIndexerMarketsByIds(
  contractAddresses: string[]
): Promise<Map<string, IndexerMarket>> {
  const result = new Map<string, IndexerMarket>();

  if (contractAddresses.length === 0) {
    return result;
  }

  try {
    const data = await graphqlRequest<{ markets: { items: IndexerMarket[] } }>(
      MARKETS_BY_IDS_QUERY,
      { ids: contractAddresses.map((addr) => addr.toLowerCase()) }
    );

    for (const market of data.markets.items) {
      result.set(market.id.toLowerCase(), market);
    }
  } catch {
    // Return empty map on error
  }

  return result;
}

export function mergeMarketWithIndexerData(
  market: any,
  indexerMarket: IndexerMarket | null
): any {
  if (!indexerMarket) {
    return market;
  }

  const totalPoolWei = BigInt(indexerMarket.totalPool || '0');
  const totalPoolDisplay = Number(totalPoolWei) / 1e18;

  const truePoolWei = BigInt(indexerMarket.truePool || '0');
  const falsePoolWei = BigInt(indexerMarket.falsePool || '0');
  const truePoolDisplay = Number(truePoolWei) / 1e18;
  const falsePoolDisplay = Number(falsePoolWei) / 1e18;

  // Calculate total yield until end
  let totalYieldUntilEnd = '0';
  const protocolApy = market.protocol?.apy || 0; // APY in percentage (e.g., 5 for 5%)
  const endDate = market.endDate ? new Date(market.endDate) : null;

  if (totalPoolDisplay > 0 && protocolApy > 0 && endDate) {
    const now = new Date();
    const timeRemainingMs = endDate.getTime() - now.getTime();

    if (timeRemainingMs > 0) {
      // Calculate yield: TVL * (APY/100) * (timeRemaining / yearInMs)
      const yearInMs = 365 * 24 * 60 * 60 * 1000;
      const yieldAmount = totalPoolDisplay * (protocolApy / 100) * (timeRemainingMs / yearInMs);
      totalYieldUntilEnd = yieldAmount.toFixed(2);
    }
  }

  return {
    ...market,
    totalPoolSize: totalPoolDisplay.toString(),
    totalYieldUntilEnd,
    truePool: truePoolDisplay.toString(),
    falsePool: falsePoolDisplay.toString(),
    tvl: market.tvl
      ? { ...market.tvl, value: totalPoolDisplay }
      : { value: totalPoolDisplay, symbol: 'USDC' },
  };
}
