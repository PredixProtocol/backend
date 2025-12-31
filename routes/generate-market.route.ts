import { generateMarket } from '../services/generate-market.service';

interface GenerateMarketRequest {
  url: string;
}

export async function handleGenerateMarket(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = (await req.json()) as GenerateMarketRequest;

    if (!body.url || typeof body.url !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing or invalid "url" field' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await generateMarket(body.url);

    if (result.success) {
      return new Response(
        JSON.stringify({
          success: true,
          data: result.data,
          message: 'Market successfully generated',
        }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else {
      return new Response(JSON.stringify({ success: false, reason: result.reason }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Generate market error:', error);
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
