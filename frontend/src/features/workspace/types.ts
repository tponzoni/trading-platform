import type { Portfolio } from "../portfolio/types";
import type { StockQuote } from "../simulator/types";

export interface Workspace {
    portfolioId: string;
    portfolios: Portfolio[];
    quote: StockQuote | undefined;
}