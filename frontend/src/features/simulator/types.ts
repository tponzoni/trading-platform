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

    //
    // Transient UI state.
    // This is simply what the user is typing into
    // the search box. It is NOT the selected symbol.
    //
    searchText: string;

    //
    // User preference.
    //
    timeframe: Timeframe;

    //
    // Current market data shown on screen.
    //
    marketData: MarketData;

    //
    // UI state.
    //
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

export type Timeframe =
    (typeof TIMEFRAMES)[number];