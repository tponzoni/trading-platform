export interface StockQuote {
    symbol: string;
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

export interface MarketData {
    quote: StockQuote | null;
    history: HistoricalPrice[];
}

export interface MarketDataRequest {
    symbol: string;
    timeframe: Timeframe;
}

export interface TradeSimulatorState {
    selectedSymbol: string;
    selectedTimeframe: Timeframe;
    recentSymbols: string[];
    marketData: MarketData;
    isLoading: boolean;
    error: string | null;
}

export const TIMEFRAMES = [
    "1D",
    "5D",
    "1M",
    "3M",
    "6M",
    "1Y",
    "5Y",
    "MAX",
] as const;

export type Timeframe = (typeof TIMEFRAMES)[number];