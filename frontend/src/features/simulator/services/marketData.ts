import { MOCK_QUOTES } from "../mock/quotes";
import { MOCK_HISTORY } from "../mock/history";

import type { MarketData } from "../types";

export async function getMarketData(
  symbol: string
): Promise<MarketData | null> {

  const normalized = symbol.trim().toUpperCase();

  const quote = MOCK_QUOTES[normalized];
  const history = MOCK_HISTORY[normalized];

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!quote || !history) {
    return null;
  }

  return {
    quote,
    history,
  };
}