import type {
    HistoricalPrice,
    Timeframe,
} from "../types";

const DAYS: Record<Timeframe, number> = {
    "1D": 1,
    "5D": 5,
    "1M": 22,
    "3M": 66,
    "6M": 132,
    "1Y": 252,
    "5Y": 1260,
    MAX: Number.MAX_SAFE_INTEGER,
};

export function filterHistory(
    history: HistoricalPrice[],
    timeframe: Timeframe
): HistoricalPrice[] {

    const candles =
        DAYS[timeframe];

    return history.slice(-candles);
}