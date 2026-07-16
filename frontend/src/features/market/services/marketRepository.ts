import type {
    CachedMarketData,
    HistoricalPrice,
    MarketRecord,
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

import {
    getSeedHistory,
} from "./marketSeed";

import {
    mergeHistory,
} from "./historyMerge";

import {
    getDateDaysBefore,
    getLatestClosedTradingDate,
    getNextDate,
} from "./historyDates";

const QUOTE_CACHE_TTL = 1000 * 60;

const pendingRequests = new Map<
    string,
    Promise<MarketRecord | undefined>
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
        new Date(cachedAt).getTime() <
        ttlMilliseconds
    );
}

function getLastHistoryDate(
    history: HistoricalPrice[],
): string | undefined {
    return history.at(-1)?.time;
}

async function loadMarketRecord(
    symbol: string,
): Promise<MarketRecord | undefined> {
    //
    // Load the permanent historical baseline.
    //
    const seedHistory =
        getSeedHistory(symbol);

    //
    // Load only previously fetched candles.
    //
    const cached =
        getCachedMarketData(symbol);

    const cachedDelta =
        cached?.history ?? [];

    //
    // Merge seed and local delta before
    // determining the newest stored candle.
    //
    const existingHistory =
        mergeHistory(
            seedHistory,
            cachedDelta,
        );

    const latestStoredDate =
        getLastHistoryDate(
            existingHistory,
        );

    const latestClosedTradingDate =
        getLatestClosedTradingDate();

    //
    // Actual candle history is authoritative.
    // Metadata must not make incomplete history
    // appear current.
    //
    const historyIsCurrent =
        latestStoredDate !== undefined &&
        latestStoredDate >=
        latestClosedTradingDate;

    //
    // If history exists, fetch from the day
    // after its final candle.
    //
    // If no seed or delta exists, fetch a
    // rolling year.
    //
    const fromDate =
        historyIsCurrent
            ? undefined
            : latestStoredDate
                ? getNextDate(
                    latestStoredDate,
                )
                : getDateDaysBefore(
                    latestClosedTradingDate,
                    365,
                );

    const shouldFetchHistory =
        fromDate !== undefined &&
        fromDate <=
        latestClosedTradingDate;

    //
    // Refresh quote independently.
    //
    const quoteIsFresh =
        cached?.quote !== undefined &&
        isFresh(
            cached.quoteCachedAt,
            QUOTE_CACHE_TTL,
        );

    const quotePromise =
        quoteIsFresh
            ? Promise.resolve(
                cached?.quote,
            )
            : fetchFinnhubQuote(
                symbol,
            );

    //
    // Fetch only candles missing after the
    // merged seed and cached delta.
    //
    const historyPromise =
        fromDate !== undefined &&
        shouldFetchHistory
            ? fetchEodhdHistory(
                symbol,
                fromDate,
                latestClosedTradingDate,
            )
            : Promise.resolve([]);

    const [
        quoteResult,
        fetchedDelta,
    ] = await Promise.all([
        quotePromise,
        historyPromise,
    ]);

    const quote =
        quoteResult ??
        cached?.quote;

    //
    // Complete runtime history used by charts
    // and timeframe filtering.
    //
    const completeHistory =
        mergeHistory(
            seedHistory,
            cachedDelta,
            fetchedDelta,
        );

    if (
        !quote &&
        completeHistory.length === 0
    ) {
        return undefined;
    }

    //
    // Persist only fetched history.
    // Seed history remains in seed.json.
    //
    const updatedDelta =
        mergeHistory(
            cachedDelta,
            fetchedDelta,
        );

    const now =
        new Date().toISOString();

    const cachedMarketData:
        CachedMarketData = {
            quote,
            history:
                updatedDelta,
            quoteCachedAt:
                quoteIsFresh
                    ? cached?.quoteCachedAt
                    : quoteResult
                        ? now
                        : cached?.quoteCachedAt,
            historyCheckedThrough:
                shouldFetchHistory
                    ? latestClosedTradingDate
                    : cached
                        ?.historyCheckedThrough,
        };

    saveMarketData(
        symbol,
        cachedMarketData,
    );

    return {
        quote,
        history:
            completeHistory,
    };
}

export async function getMarketRecord(
    symbol: string,
): Promise<MarketRecord | undefined> {
    const normalizedSymbol =
        symbol.trim().toUpperCase();

    if (!normalizedSymbol) {
        return undefined;
    }

    const pendingRequest =
        pendingRequests.get(
            normalizedSymbol,
        );

    if (pendingRequest) {
        return pendingRequest;
    }

    const request =
        loadMarketRecord(
            normalizedSymbol,
        )
            .finally(() => {
                pendingRequests.delete(
                    normalizedSymbol,
                );
            });

    pendingRequests.set(
        normalizedSymbol,
        request,
    );

    return request;
}