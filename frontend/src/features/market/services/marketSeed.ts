import seed from "../data/seed.json";

import type {
    HistoricalPrice,
    MarketSeed,
} from "../types";

import {
    fromCachedHistory,
} from "./historyMapper";

const marketSeed =
    seed as unknown as MarketSeed;

export function getSeedHistory(
    symbol: string,
): HistoricalPrice[] {
    const normalizedSymbol =
        symbol.trim().toUpperCase();

    const seedRecord =
        marketSeed[normalizedSymbol];

    if (!seedRecord?.history) {
        return [];
    }

    return fromCachedHistory(
        seedRecord.history
    );
}