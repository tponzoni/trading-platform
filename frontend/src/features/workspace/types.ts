import type { Portfolio } from "../portfolio/types";

export interface Workspace {
    selectedPortfolioId: string;
    portfolios: Portfolio[];
}