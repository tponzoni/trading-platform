import type { Timeframe } from "../../../features/simulator/types";

export interface UserPreferences {
    selectedTimeframe: Timeframe;
    layout: {
        panelSizes: number[];
        leftSidebarWidth: number;
        rightSidebarWidth: number;
        portfolioHeight: number;
    }
}