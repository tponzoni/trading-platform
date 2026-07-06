import { MOCK_QUOTES } from "./providers/mock/quotes";

import {
  type MarketData,
  type Timeframe
} from "../types";
import { getHistory } from "./history";

export async function getMarketData(
  symbol: string,
  timeframe: Timeframe
): Promise<MarketData | null> {

  const normalized = symbol.trim().toUpperCase();

  const quote = MOCK_QUOTES[normalized];
  const history = getHistory(
    normalized,
    timeframe
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