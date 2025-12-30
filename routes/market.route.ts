import {
  createMarket,
  getMarketByBlockchainId,
  getMarketById,
  getMarkets,
  type CreateMarketInput,
} from '../services/market.service';

export async function handleGetMarkets(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const orderBy =
      (url.searchParams.get('orderBy') as 'createdAt' | 'endDate' | 'blockchainMarketId') ||
      'createdAt';
    const order = (url.searchParams.get('order') as 'asc' | 'desc') || 'desc';

    const result = await getMarkets({ page, limit, orderBy, order });

    return new Response(JSON.stringify({ success: true, ...result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Get markets error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function handleGetMarketById(req: Request, id: string): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const market = await getMarketById(id);

    if (!market) {
      return new Response(JSON.stringify({ error: 'Market not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data: market }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Get market by ID error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function handleGetMarketByBlockchainId(
  req: Request,
  blockchainId: string
): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const blockchainMarketId = parseInt(blockchainId, 10);

    if (isNaN(blockchainMarketId)) {
      return new Response(JSON.stringify({ error: 'Invalid blockchain market ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const market = await getMarketByBlockchainId(blockchainMarketId);

    if (!market) {
      return new Response(JSON.stringify({ error: 'Market not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data: market }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Get market by blockchain ID error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function handleCreateMarket(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = (await req.json()) as CreateMarketInput;

    const requiredFields = [
      'question',
      'description',
      'imageUrl',
      'blockchainMarketId',
      'totalPoolSize',
      'totalYieldUntilEnd',
      'contractAddress',
      'endDate',
      'author',
    ];

    for (const field of requiredFields) {
      if (!(field in body)) {
        return new Response(JSON.stringify({ error: `Missing required field: ${field}` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const authorRequiredFields = ['name', 'username', 'userId', 'avatar'];
    for (const field of authorRequiredFields) {
      if (!(field in body.author)) {
        return new Response(JSON.stringify({ error: `Missing required author field: ${field}` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const marketInput: CreateMarketInput = {
      ...body,
      endDate: new Date(body.endDate),
    };

    const market = await createMarket(marketInput);

    return new Response(JSON.stringify({ success: true, data: market }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Create market error:', error);

    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return new Response(
        JSON.stringify({
          error: 'Market with this blockchain ID already exists',
        }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
