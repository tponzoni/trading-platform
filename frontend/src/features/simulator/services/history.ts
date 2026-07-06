import { MOCK_HISTORY } from "./providers/mock/history";

import type {
  HistoricalPrice,
  Timeframe,
} from "../types";
import { filterHistory } from "./filterHistory";

export function getHistory(
  symbol: string,
  timeframe: Timeframe
): HistoricalPrice[] {

  const history =
    MOCK_HISTORY[symbol];

  if (!history) {
    return [];
  }

  return filterHistory(
    history,
    timeframe
  );
}