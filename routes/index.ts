import { handleGenerateMarket } from './generate-market.route';
import {
  handleCreateMarket,
  handleGetMarketByBlockchainId,
  handleGetMarketById,
  handleGetMarkets,
} from './market.route';
import { handleGetMarketChart } from './chart.route';
import { handleSwaggerJSON, handleSwaggerUI } from './swagger.route';

export interface Route {
  path: string;
  handler: (req: Request, ...args: string[]) => Promise<Response>;
  pattern?: RegExp;
}

export const routes: Route[] = [
  {
    path: '/api-docs',
    handler: handleSwaggerUI,
  },
  {
    path: '/api-docs/json',
    handler: handleSwaggerJSON,
  },
  {
    path: '/api/generate-market',
    handler: handleGenerateMarket,
  },
  {
    path: '/api/markets',
    handler: async (req: Request) => {
      if (req.method === 'POST') {
        return handleCreateMarket(req);
      }
      return handleGetMarkets(req);
    },
  },
  {
    path: '/api/markets/blockchain',
    pattern: /^\/api\/markets\/blockchain\/(.+)$/,
    handler: handleGetMarketByBlockchainId,
  },
  {
    path: '/api/markets/:id/chart',
    pattern: /^\/api\/markets\/([^/]+)\/chart$/,
    handler: handleGetMarketChart,
  },
  {
    path: '/api/markets/:id',
    pattern: /^\/api\/markets\/([^/]+)$/,
    handler: handleGetMarketById,
  },
];

export function matchRoute(pathname: string): { route: Route; params: string[] } | undefined {
  const exactMatch = routes.find((route) => route.path === pathname && !route.pattern);
  if (exactMatch) {
    return { route: exactMatch, params: [] };
  }

  for (const route of routes) {
    if (route.pattern) {
      const match = pathname.match(route.pattern);
      if (match) {
        return { route, params: match.slice(1) };
      }
    }
  }

  return undefined;
}
