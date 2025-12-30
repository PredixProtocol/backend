import { prisma } from '../lib/prisma';

export interface CreateMarketInput {
  question: string;
  description: string;
  imageUrl: string;
  blockchainMarketId: number;
  totalPoolSize: string;
  totalYieldUntilEnd: string;
  contractAddress: string;
  endDate: Date;
  author: {
    name: string;
    username: string;
    userId: string;
    avatar: string;
    verifiedGov?: boolean;
    verifiedBlue?: boolean;
    verifiedOrange?: boolean;
  };
  post?: {
    pid: string;
    text: string;
    banner?: string | null;
  };
  engagement?: {
    replies?: number;
    reposts?: number;
    likes?: number;
    views?: number;
  };
  source?: {
    platform: string;
    url: string;
  };
  probability?: {
    value: number;
    unit?: string;
  };
  protocol?: {
    name: string;
    icon: string;
    apy: number;
  };
  token?: {
    name: string;
    icon: string;
  };
  tvl?: {
    value: number;
    symbol: string;
  };
  actions?: {
    label: string;
    type: string;
  }[];
}

export interface GetMarketsOptions {
  page?: number;
  limit?: number;
  orderBy?: 'createdAt' | 'endDate' | 'blockchainMarketId';
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getMarkets(options: GetMarketsOptions = {}) {
  const { page = 1, limit = 10, orderBy = 'createdAt', order = 'desc' } = options;

  const skip = (page - 1) * limit;

  const [markets, total] = await Promise.all([
    prisma.market.findMany({
      skip,
      take: limit,
      orderBy: { [orderBy]: order },
      include: {
        author: true,
        post: true,
        engagement: true,
        source: true,
        probability: true,
        protocol: true,
        token: true,
        tvl: true,
        actions: true,
      },
    }),
    prisma.market.count(),
  ]);

  return {
    data: markets,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getMarketById(id: string) {
  return prisma.market.findUnique({
    where: { id },
    include: {
      author: true,
      post: true,
      engagement: true,
      source: true,
      probability: true,
      protocol: true,
      token: true,
      tvl: true,
      actions: true,
    },
  });
}

export async function getMarketByBlockchainId(blockchainMarketId: number) {
  return prisma.market.findUnique({
    where: { blockchainMarketId },
    include: {
      author: true,
      post: true,
      engagement: true,
      source: true,
      probability: true,
      protocol: true,
      token: true,
      tvl: true,
      actions: true,
    },
  });
}

export async function createMarket(input: CreateMarketInput) {
  const {
    question,
    description,
    imageUrl,
    blockchainMarketId,
    totalPoolSize,
    totalYieldUntilEnd,
    contractAddress,
    endDate,
    author,
    post,
    engagement,
    source,
    probability,
    protocol,
    token,
    tvl,
    actions,
  } = input;

  const authorRecord = await prisma.author.upsert({
    where: { username: author.username },
    update: {
      name: author.name,
      avatar: author.avatar,
      verifiedGov: author.verifiedGov ?? false,
      verifiedBlue: author.verifiedBlue ?? false,
      verifiedOrange: author.verifiedOrange ?? false,
    },
    create: {
      name: author.name,
      username: author.username,
      userId: author.userId,
      avatar: author.avatar,
      verifiedGov: author.verifiedGov ?? false,
      verifiedBlue: author.verifiedBlue ?? false,
      verifiedOrange: author.verifiedOrange ?? false,
    },
  });

  let probabilityId: string | undefined;
  if (probability) {
    const probabilityRecord = await prisma.probability.create({
      data: {
        value: probability.value,
        unit: probability.unit ?? 'percent',
      },
    });
    probabilityId = probabilityRecord.id;
  }

  let protocolId: string | undefined;
  if (protocol) {
    const protocolRecord = await prisma.protocol.upsert({
      where: { name: protocol.name },
      update: {
        icon: protocol.icon,
        apy: protocol.apy,
      },
      create: {
        name: protocol.name,
        icon: protocol.icon,
        apy: protocol.apy,
      },
    });
    protocolId = protocolRecord.id;
  }

  let tokenId: string | undefined;
  if (token) {
    const tokenRecord = await prisma.token.upsert({
      where: { name: token.name },
      update: {
        icon: token.icon,
      },
      create: {
        name: token.name,
        icon: token.icon,
      },
    });
    tokenId = tokenRecord.id;
  }

  let tvlId: string | undefined;
  if (tvl) {
    const tvlRecord = await prisma.tvl.create({
      data: {
        value: tvl.value,
        symbol: tvl.symbol,
      },
    });
    tvlId = tvlRecord.id;
  }

  const market = await prisma.market.create({
    data: {
      question,
      description,
      imageUrl,
      blockchainMarketId,
      totalPoolSize,
      totalYieldUntilEnd,
      contractAddress,
      endDate,
      authorId: authorRecord.id,
      probabilityId,
      protocolId,
      tokenId,
      tvlId,
      post: post
        ? {
            create: {
              pid: post.pid,
              text: post.text,
              banner: post.banner,
            },
          }
        : undefined,
      engagement: engagement
        ? {
            create: {
              replies: engagement.replies ?? 0,
              reposts: engagement.reposts ?? 0,
              likes: engagement.likes ?? 0,
              views: engagement.views ?? 0,
            },
          }
        : undefined,
      source: source
        ? {
            create: {
              platform: source.platform,
              url: source.url,
            },
          }
        : undefined,
      actions: actions
        ? {
            create: actions.map((action) => ({
              label: action.label,
              type: action.type,
            })),
          }
        : undefined,
    },
    include: {
      author: true,
      post: true,
      engagement: true,
      source: true,
      probability: true,
      protocol: true,
      token: true,
      tvl: true,
      actions: true,
    },
  });

  return market;
}
