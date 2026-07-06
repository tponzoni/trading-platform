import { MOCK_HISTORY } from "./providers/mock/history";

import type {
  HistoricalPrice,
  Timeframe,
} from "../types";

export function getHistory(
  symbol: string,
  timeframe: Timeframe
): HistoricalPrice[] {

  const history =
    MOCK_HISTORY[symbol];

  if (!history) {
    return [];
  }

  return history;
}