import type {
    CachedMarketData,
} from "../types";

import {
    fetchFinnhubQuote,
} from "../providers/finnhubQuoteProvider";

import {
    fetchEodhdHistory,
} from "../providers/eodhdHistoryProvider";

import {
    getCachedMarketData,
    saveMarketData,
} from "./marketDataCache";

const QUOTE_CACHE_TTL = 1000 * 60;
const HISTORY_CACHE_TTL = 1000 * 60 * 60 * 12;

const pendingRequests = new Map<
    string,
    Promise<CachedMarketData | undefined>
>();

function isFresh(
    cachedAt: string | undefined,
    ttlMilliseconds: number,
): boolean {
    if (!cachedAt) {
        return false;
    }

    return (
        Date.now() -
        new Date(cachedAt).getTime()
        <
        ttlMilliseconds
    );
}

async function loadMarketData(
    symbol: string,
): Promise<CachedMarketData | undefined> {
    const cached = getCachedMarketData(symbol);

    const quoteIsFresh =
        cached?.quote !== undefined &&
        isFresh(
            cached.quoteCachedAt,
            QUOTE_CACHE_TTL,
        );

    const historyIsFresh =
        cached !== undefined &&
        cached.history.length > 0 &&
        isFresh(
            cached.historyCachedAt,
            HISTORY_CACHE_TTL,
        );

    if (
        quoteIsFresh &&
        historyIsFresh
    ) {
        return cached;
    }

    const [
        quoteResult,
        historyResult,
    ] = await Promise.all([
        quoteIsFresh
            ? Promise.resolve(cached?.quote)
            : fetchFinnhubQuote(symbol),

        historyIsFresh
            ? Promise.resolve(cached?.history ?? [])
            : fetchEodhdHistory(symbol),
    ]);

    const quote =
        quoteResult ??
        cached?.quote;

    const history =
        historyResult.length > 0
            ? historyResult
            : cached?.history ?? [];

    if (
        !quote &&
        history.length === 0
    ) {
        return undefined;
    }

    const now =
        new Date().toISOString();

    const marketData: CachedMarketData = {
        quote,
        quoteCachedAt:
            quoteResult !== undefined
                ? now
                : cached?.quoteCachedAt,
        history,
        historyCachedAt:
            historyResult.length > 0
                ? now
                : cached?.historyCachedAt,
    };

    saveMarketData(symbol, marketData);

    return marketData;
}

export async function getMarketRecord(
    symbol: string,
): Promise<CachedMarketData | undefined> {
    const normalizedSymbol =
        symbol.trim().toUpperCase();

    if (!normalizedSymbol) {
        return undefined;
    }

    const pendingRequest =
        pendingRequests.get(
            normalizedSymbol
        );

    if (pendingRequest) {
        return pendingRequest;
    }

    const request =
        loadMarketData(
            normalizedSymbol
        )
            .finally(() => {
                pendingRequests.delete(
                    normalizedSymbol
                );
            });

    pendingRequests.set(
        normalizedSymbol,
        request
    );

    return request;
}