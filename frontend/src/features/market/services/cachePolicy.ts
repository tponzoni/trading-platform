import type {
    Timeframe,
} from "../../simulator/types";

export const QUOTE_CACHE_TTL =
    1000 * 60;

export const HISTORY_CACHE_TTL =
    1000 * 60 * 60 * 12;

export function getQuoteCacheKey(
    symbol: string,
): string {
    return `quote:${symbol.toUpperCase()}`;
}

export function getHistoryCacheKey(
    symbol: string,
    timeframe: Timeframe,
): string {
    return (
        `history:${symbol.toUpperCase()}` +
        `:${timeframe}`
    );
}