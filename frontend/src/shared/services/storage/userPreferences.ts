import type { Timeframe } from "../../../features/simulator/types";

export interface WorkspacePanelLayout {
    simulator: number;
    portfolio: number;
}

export interface UserPreferences {
    timeframe: Timeframe;
    layout: {
        panelLayout: WorkspacePanelLayout;
    }
}