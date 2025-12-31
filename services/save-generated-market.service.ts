import type { GeneratedMarket } from '../types/generate-market.types';
import { createMarket, type CreateMarketInput } from './market.service';

export interface SaveGeneratedMarketResult {
  success: boolean;
  data?: any;
  error?: string;
}

export async function saveGeneratedMarket(
  generatedMarket: GeneratedMarket
): Promise<SaveGeneratedMarketResult> {
  try {
    const marketInput: CreateMarketInput = {
      question: generatedMarket.question,
      description: generatedMarket.description,
      imageUrl: generatedMarket.imageUrl,
      blockchainMarketId: generatedMarket.market.blockchainMarketId || 0,
      totalPoolSize: generatedMarket.market.totalPoolSize || '0',
      totalYieldUntilEnd: generatedMarket.market.totalYieldUntilEnd || '0',
      contractAddress: generatedMarket.market.contractAddress || '',
      endDate: new Date(generatedMarket.market.endDate || Date.now()),
      author: {
        name: generatedMarket.author.name,
        username: generatedMarket.author.username,
        userId: generatedMarket.author.userId,
        avatar: generatedMarket.author.avatar,
        verifiedGov: generatedMarket.author.verifiedGov,
        verifiedBlue: generatedMarket.author.verifiedBlue,
        verifiedOrange: generatedMarket.author.verifiedOrange,
      },
      post: {
        pid: generatedMarket.post.pid,
        text: generatedMarket.post.text,
        banner: generatedMarket.post.banner,
      },
      engagement: {
        replies: generatedMarket.engagement.replies,
        reposts: generatedMarket.engagement.reposts,
        likes: generatedMarket.engagement.likes,
        views: generatedMarket.engagement.views,
      },
      source: {
        platform: generatedMarket.source.platform,
        url: generatedMarket.source.url,
      },
      probability: {
        value: generatedMarket.probability.value,
        unit: generatedMarket.probability.unit,
      },
      protocol: generatedMarket.market.protocol
        ? {
            name: generatedMarket.market.protocol.name,
            icon: generatedMarket.market.protocol.icon,
            apy: generatedMarket.market.protocol.apy,
          }
        : undefined,
      token: generatedMarket.market.token
        ? {
            name: generatedMarket.market.token.name,
            icon: generatedMarket.market.token.icon,
          }
        : undefined,
      tvl: generatedMarket.market.tvl
        ? {
            value: generatedMarket.market.tvl.value,
            symbol: generatedMarket.market.tvl.symbol,
          }
        : undefined,
      actions: generatedMarket.actions.map((action) => ({
        label: action.label,
        type: action.type,
      })),
    };

    const savedMarket = await createMarket(marketInput);

    return {
      success: true,
      data: savedMarket,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown database error',
    };
  }
}
