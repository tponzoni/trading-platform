import historicalPriceSeed from "../data/historical-price-seed.json";

import type {
    HistoricalPrice,
    MarketSeed,
} from "../types";

import {
    fromCachedHistory,
} from "./historyMapper";

const marketSeed =
    historicalPriceSeed as unknown as MarketSeed;

export function getSeedHistory(
    symbol: string,
): HistoricalPrice[] {
    const normalizedSymbol =
        symbol.trim().toUpperCase();

    const cachedHistory =
        marketSeed[normalizedSymbol];

    if (!cachedHistory) {
        return [];
    }

    return fromCachedHistory(
        cachedHistory,
    );
}