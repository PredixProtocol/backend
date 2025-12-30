import { analyzePostForMarket } from '../lib/ai';
import type {
  GeneratedMarket,
  GenerateMarketResult,
  MarketAction,
} from '../types/generate-market.types';
import { getPostByPidX } from './get-post-by-pid-x.service';

function extractPidFromUrl(url: string): string | null {
  const patterns = [/(?:x\.com|twitter\.com)\/\w+\/status\/(\d+)/i, /\/status\/(\d+)/i];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

function generateMarketId(question: string): string {
  const slug = question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);

  return `predict-x-${slug}`;
}

const DEFAULT_ACTIONS: MarketAction[] = [
  { label: 'YES', type: 'positive' },
  { label: 'NO', type: 'negative' },
];

export async function generateMarket(url: string): Promise<GenerateMarketResult> {
  const pid = extractPidFromUrl(url);

  if (!pid) {
    return {
      success: false,
      reason: 'Invalid X/Twitter URL. Please provide a valid post URL.',
    };
  }

  let postData;
  try {
    postData = await getPostByPidX(pid);
  } catch (error) {
    return {
      success: false,
      reason: `Failed to fetch post data: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }

  const tweetResult = postData.result?.tweetResult?.result;

  if (!tweetResult) {
    return {
      success: false,
      reason: 'Post not found or has been deleted.',
    };
  }

  const userResult = tweetResult.core?.user_results?.result;
  const legacy = tweetResult.legacy;
  const userLegacy = userResult?.legacy;

  if (!userResult || !legacy || !userLegacy) {
    return {
      success: false,
      reason: 'Unable to parse post data.',
    };
  }

  const postText =
    tweetResult.note_tweet?.note_tweet_results?.result?.text || legacy.full_text || '';

  let aiAnalysis;
  try {
    aiAnalysis = await analyzePostForMarket({
      postText,
      authorName: userLegacy.name,
      authorUsername: userLegacy.screen_name,
    });
  } catch (error) {
    return {
      success: false,
      reason: `AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }

  if (!aiAnalysis.possible) {
    return {
      success: false,
      reason: aiAnalysis.rejectionReason || 'This post cannot be turned into a prediction market.',
    };
  }

  const question = aiAnalysis.question!;
  const description = aiAnalysis.description!;
  const probability = aiAnalysis.probability!;

  const market: GeneratedMarket = {
    id: generateMarketId(question),
    question,
    description,
    imageUrl: userLegacy.profile_image_url_https.replace('_normal', '_400x400'),
    author: {
      name: userLegacy.name,
      username: `@${userLegacy.screen_name}`,
      userId: userResult.rest_id,
      avatar: userLegacy.profile_image_url_https.replace('_normal', '_400x400'),
      verifiedGov:
        userResult.affiliates_highlighted_label?.label?.userLabelType === 'GovernmentLabel',
      verifiedBlue: userResult.is_blue_verified || false,
      verifiedOrange: false,
    },
    post: {
      pid,
      text: postText,
      banner: userLegacy.profile_banner_url || null,
      createdAt: legacy.created_at,
    },
    probability: {
      value: probability,
      unit: 'percent',
    },
    engagement: {
      replies: legacy.reply_count || 0,
      reposts: legacy.retweet_count || 0,
      likes: legacy.favorite_count || 0,
      views: parseInt(tweetResult.views?.count || '0', 10),
    },
    source: {
      platform: 'x',
      url,
    },
    market: {
      blockchainMarketId: null,
      contractAddress: null,
      tvl: null,
      protocol: null,
      token: null,
      endDate: null,
      totalPoolSize: null,
      totalYieldUntilEnd: null,
      createdAt: new Date().toISOString(),
    },
    actions: DEFAULT_ACTIONS,
  };

  return {
    success: true,
    data: market,
  };
}
