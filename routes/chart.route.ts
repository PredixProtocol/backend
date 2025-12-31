import { graphqlRequest } from '../lib/graphql-client';

interface Prediction {
  id: string;
  marketId: string;
  user: string;
  prediction: boolean;
  amount: string;
  timestamp: string;
}

interface ChartDataPoint {
  time: number;
  value: number;
}

interface ChartResponse {
  volume: {
    yes: ChartDataPoint[];
    no: ChartDataPoint[];
    total: ChartDataPoint[];
  };
  probability: {
    yes: ChartDataPoint[];
    no: ChartDataPoint[];
  };
}

const GET_MARKET_PREDICTIONS = `
  query GetMarketPredictions($marketId: String!) {
    predictions(
      where: { marketId: $marketId }
      orderBy: "timestamp"
      orderDirection: "asc"
      limit: 1000
    ) {
      items {
        id
        marketId
        user
        prediction
        amount
        timestamp
      }
    }
  }
`;

const GET_MARKET_INFO = `
  query GetMarketInfo($id: String!) {
    market(id: $id) {
      id
      createdAt
    }
  }
`;

function getIntervalMs(interval: string): number {
  switch (interval) {
    case '1m':
      return 60 * 1000;
    case '5m':
      return 5 * 60 * 1000;
    case '15m':
      return 15 * 60 * 1000;
    case '1h':
      return 60 * 60 * 1000;
    case '4h':
      return 4 * 60 * 60 * 1000;
    case '1d':
      return 24 * 60 * 60 * 1000;
    default:
      return 60 * 1000;
  }
}

function aggregateToTimeSeries(
  predictions: Prediction[],
  intervalMs: number,
  marketCreatedAt?: number
): ChartResponse {
  const volumeYes: ChartDataPoint[] = [];
  const volumeNo: ChartDataPoint[] = [];
  const volumeTotal: ChartDataPoint[] = [];
  const probabilityYes: ChartDataPoint[] = [];
  const probabilityNo: ChartDataPoint[] = [];

  // Add initial point at market creation with 0 values
  if (marketCreatedAt) {
    const startTime = Math.floor(marketCreatedAt);
    volumeYes.push({ time: startTime, value: 0 });
    volumeNo.push({ time: startTime, value: 0 });
    volumeTotal.push({ time: startTime, value: 0 });
    probabilityYes.push({ time: startTime, value: 50 });
    probabilityNo.push({ time: startTime, value: 50 });
  }

  if (predictions.length === 0) {
    return {
      volume: { yes: volumeYes, no: volumeNo, total: volumeTotal },
      probability: { yes: probabilityYes, no: probabilityNo },
    };
  }

  const buckets = new Map<
    number,
    { yesVolume: bigint; noVolume: bigint; yesCount: number; noCount: number }
  >();

  for (const pred of predictions) {
    const timestamp = Number(pred.timestamp) * 1000;
    const bucketTime = Math.floor(timestamp / intervalMs) * intervalMs;
    const bucketTimeSec = Math.floor(bucketTime / 1000);

    if (!buckets.has(bucketTimeSec)) {
      buckets.set(bucketTimeSec, {
        yesVolume: 0n,
        noVolume: 0n,
        yesCount: 0,
        noCount: 0,
      });
    }

    const bucket = buckets.get(bucketTimeSec)!;
    const amount = BigInt(pred.amount);

    if (pred.prediction) {
      bucket.yesVolume += amount;
      bucket.yesCount++;
    } else {
      bucket.noVolume += amount;
      bucket.noCount++;
    }
  }

  const sortedBuckets = Array.from(buckets.entries()).sort(
    ([a], [b]) => a - b
  );

  let cumulativeYes = 0n;
  let cumulativeNo = 0n;

  for (const [time, bucket] of sortedBuckets) {
    cumulativeYes += bucket.yesVolume;
    cumulativeNo += bucket.noVolume;

    const yesValue = Number(cumulativeYes) / 1e18;
    const noValue = Number(cumulativeNo) / 1e18;
    const totalValue = yesValue + noValue;

    volumeYes.push({ time, value: yesValue });
    volumeNo.push({ time, value: noValue });
    volumeTotal.push({ time, value: totalValue });

    const yesProbability = totalValue > 0 ? (yesValue / totalValue) * 100 : 50;
    const noProbability = totalValue > 0 ? (noValue / totalValue) * 100 : 50;

    probabilityYes.push({ time, value: yesProbability });
    probabilityNo.push({ time, value: noProbability });
  }

  return {
    volume: {
      yes: volumeYes,
      no: volumeNo,
      total: volumeTotal,
    },
    probability: {
      yes: probabilityYes,
      no: probabilityNo,
    },
  };
}

export async function handleGetMarketChart(
  req: Request,
  marketId: string
): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(req.url);
    const interval = url.searchParams.get('interval') || '1h';

    // Fetch market info to get creation time
    let marketCreatedAt: number | undefined;
    try {
      const marketInfo = await graphqlRequest<{
        market: { id: string; createdAt: string } | null;
      }>(GET_MARKET_INFO, {
        id: marketId.toLowerCase(),
      });
      if (marketInfo.market?.createdAt) {
        marketCreatedAt = Number(marketInfo.market.createdAt);
      }
    } catch {
      // Continue without market creation time
    }

    const response = await graphqlRequest<{
      predictions: { items: Prediction[] };
    }>(GET_MARKET_PREDICTIONS, {
      marketId: marketId.toLowerCase(),
    });

    const intervalMs = getIntervalMs(interval);
    const chartData = aggregateToTimeSeries(
      response.predictions.items,
      intervalMs,
      marketCreatedAt
    );

    return new Response(
      JSON.stringify({
        success: true,
        data: chartData,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching market chart data:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch chart data',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
