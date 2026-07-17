import type {
    Timeframe,
} from "../../simulator/types";

const MILLISECONDS_PER_MINUTE =
    1000 * 60;

const MILLISECONDS_PER_HOUR =
    MILLISECONDS_PER_MINUTE * 60;

//
// The application is currently designed
// primarily for market research, portfolio
// analysis and trade planning.
//
// A five-hour quote cache keeps the interface
// responsive while preventing unnecessary
// Finnhub requests.
//
// This can later become user-configurable when
// realtime and delayed-market modes are added.
//
export const QUOTE_CACHE_TTL =
    MILLISECONDS_PER_HOUR * 5;

export const HISTORY_CACHE_TTL =
    MILLISECONDS_PER_HOUR * 12;

export function getQuoteCacheKey(
    symbol: string,
): string {

    return (
        `quote:` +
        symbol
            .trim()
            .toUpperCase()
    );

}

export function getHistoryCacheKey(
    symbol: string,
    timeframe: Timeframe,
): string {

    return (
        `history:` +
        symbol
            .trim()
            .toUpperCase() +
        `:${timeframe}`
    );

}