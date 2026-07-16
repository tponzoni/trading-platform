import type {
    CachedHistoricalPrice,
    CachedMarketData,
    StockQuote,
} from "../types";

import {
    fromCachedHistory,
    toCachedHistory,
} from "./historyMapper";

interface StoredMarketData {
    quote?: StockQuote;
    history: CachedHistoricalPrice[];
    quoteCachedAt?: string;
    historyCheckedThrough?: string;
}

type StoredMarketCache = Record<
    string,
    StoredMarketData
>;

const STORAGE_KEY =
    "marketCache";

function loadMarketCache(): StoredMarketCache {
    const value =
        localStorage.getItem(
            STORAGE_KEY
        );

    if (!value) {
        return {};
    }

    try {
        return JSON.parse(
            value
        ) as StoredMarketCache;
    } catch {
        return {};
    }
}

function saveMarketCache(
    cache: StoredMarketCache,
): void {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cache),
    );
}

export function getCachedMarketData(
    symbol: string,
): CachedMarketData | undefined {
    const normalizedSymbol =
        symbol.trim().toUpperCase();

    const storedMarketData =
        loadMarketCache()[
            normalizedSymbol
        ];

    if (!storedMarketData) {
        return undefined;
    }

    return {
        quote:
            storedMarketData.quote,
        history:
            fromCachedHistory(
                storedMarketData.history ??
                []
            ),
        quoteCachedAt:
            storedMarketData.quoteCachedAt,
        historyCheckedThrough:
            storedMarketData.historyCheckedThrough,
    };
}

export function saveMarketData(
    symbol: string,
    marketData: CachedMarketData,
): void {
    const cache =
        loadMarketCache();

    const normalizedSymbol =
        symbol.trim().toUpperCase();

    cache[normalizedSymbol] = {
        quote:
            marketData.quote,
        history:
            toCachedHistory(
                marketData.history
            ),
        quoteCachedAt:
            marketData.quoteCachedAt,
        historyCheckedThrough:
            marketData.historyCheckedThrough,
    };

    saveMarketCache(cache);
}

export function removeCachedMarketData(
    symbol: string,
): void {
    const cache =
        loadMarketCache();

    const normalizedSymbol =
        symbol.trim().toUpperCase();

    delete cache[
        normalizedSymbol
    ];

    saveMarketCache(cache);
}

export function clearMarketCache(): void {
    localStorage.removeItem(
        STORAGE_KEY
    );
}