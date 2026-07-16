export interface StockQuote {
    // symbol: string;
    price: number;
}

export interface HistoricalPrice {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export type CachedHistoricalPrice = [
    time: number,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
];

export interface CachedMarketData {
    quote?: StockQuote;
    history: HistoricalPrice[];
    quoteCachedAt?: string;
    historyCachedAt?: string;
}

export type MarketCache = Record<
    string,
    CachedMarketData
>;