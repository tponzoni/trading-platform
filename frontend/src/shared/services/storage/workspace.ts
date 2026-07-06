import type { Timeframe } from "../../../features/simulator/types";

export interface Workspace {
    recentSymbols: string[];
    selectedTimeframe: Timeframe;
    layout: {
        panelSizes: number[];
        leftSidebarWidth: number;
        rightSidebarWidth: number;
        portfolioHeight: number;
    }
}