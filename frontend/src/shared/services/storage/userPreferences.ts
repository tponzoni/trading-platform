import type { Timeframe } from "../../../features/simulator/types";

export interface WorkspacePanelLayout {
    simulator: number;
    portfolio: number;
}

export type ChartType = "candles" | "line";

export interface UserPreferences {
    timeframe: Timeframe;
    layout: {
        panelLayout: WorkspacePanelLayout;
    }
    chartType: ChartType;
}

export const EMPTY_USER_PREFERENCES: UserPreferences = {
  timeframe: "1Y",
  layout: {
    panelLayout: {
      simulator: 80,
      portfolio: 20
    }
  },
  chartType: "candles"
};