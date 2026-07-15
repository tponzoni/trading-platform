import type { Portfolio } from "../portfolio/types";
import type { StockQuote } from "../simulator/types";
import type { SymbolNote } from "../research/types";

export interface Workspace {
    portfolioId: string;
    portfolios: Portfolio[];
    symbolNotes: SymbolNote[];
    quote: StockQuote | undefined;
}