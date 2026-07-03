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

export interface TradeSimulatorState {
    selectedSymbol: string;
    recentSymbols: string[];
    marketData: MarketData;
    isLoading: boolean;
    error: string | null;
}