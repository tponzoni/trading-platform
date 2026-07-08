import type { Portfolio } from "../portfolio/types";

export interface Workspace {
    portfolioId: string;
    portfolios: Portfolio[];
}