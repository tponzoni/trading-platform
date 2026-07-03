import { SplitView } from "./SplitView";

import { TradeSimulator } from "../../features/simulator/ui/TradeSimulator";

import { PortfolioManager } from "../../features/portfolio/PortfolioManager";

export function Workspace() {
    return (
       <main className="flex flex-1 min-h-0 overflow-hidden p-4">
            <SplitView
                primary={<TradeSimulator />}
                secondary={<PortfolioManager />}
            />
        </main>
    );
}