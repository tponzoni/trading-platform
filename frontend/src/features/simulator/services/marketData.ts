import { MOCK_QUOTES } from "./providers/mock/quotes";

import {
  type MarketData,
  type MarketDataRequest,
  type Timeframe
} from "../types";
import { getHistory } from "./history";

export async function getMarketData(
  request: MarketDataRequest
): Promise<MarketData | null> {

  const normalized = request.symbol.trim().toUpperCase();

  const quote = MOCK_QUOTES[normalized];
  const history = getHistory(
    normalized,
    request.timeframe
  );

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