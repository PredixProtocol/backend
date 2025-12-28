import { handleGenerateMarket } from './generate-market.route';

export interface Route {
  path: string;
  handler: (req: Request) => Promise<Response>;
}

export const routes: Route[] = [
  {
    path: '/api/generate-market',
    handler: handleGenerateMarket,
  },
];

export function matchRoute(pathname: string): Route | undefined {
  return routes.find((route) => route.path === pathname);
}
