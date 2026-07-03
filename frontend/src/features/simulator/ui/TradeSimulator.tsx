import { useState } from "react";

import { Panel } from "../../../shared/components/Panel/Panel";

import { SymbolSearch } from "./SymbolSearch";
import { CurrentPrice } from "./CurrentPrice";
import { MarketChart } from "../chart/MarketChart";

import { getMarketData } from "../services/marketData";

import type {
  MarketData,
  TradeSimulatorState,
} from "../types";

const EMPTY_MARKET_DATA: MarketData = {
  quote: null,
  history: [],
};

export function TradeSimulator() {
  const [state, setState] = useState<TradeSimulatorState>({
    selectedSymbol: "",
    marketData: EMPTY_MARKET_DATA,
    isLoading: false,
    error: null,
  });

  async function handleLookup() {
    const symbol = state.selectedSymbol.trim();

    if (!symbol) {
      return;
    }

    setState((current) => ({
      ...current,
      isLoading: true,
      error: null,
    }));

    const marketData = await getMarketData(symbol);

    if (!marketData) {
      setState((current) => ({
        ...current,
        isLoading: false,
        error: "Unknown symbol.",
        marketData: EMPTY_MARKET_DATA,
      }));

      return;
    }

    setState((current) => ({
      ...current,
      isLoading: false,
      error: null,
      marketData,
    }));
  }

  return (
    <Panel title="">

      <div className="flex h-full min-h-0 flex-col gap-4">

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-4">

            <SymbolSearch
              value={state.selectedSymbol}
              isLoading={state.isLoading}
              onChange={(symbol) =>
                setState((current) => ({
                  ...current,
                  selectedSymbol: symbol,
                }))
              }
              onSubmit={handleLookup}
            />

          </div>

          {!state.isLoading && (
            <CurrentPrice
              quote={state.marketData.quote}
            />
          )}

        </div>

        {state.error && (
          <div className="rounded border border-red-300 bg-red-50 p-3 text-red-700">
            {state.error}
          </div>
        )}

        {state.isLoading && (
          <div className="rounded border border-blue-300 bg-blue-50 p-3 text-blue-700">
            Loading market data...
          </div>
        )}

        {!state.isLoading && (
          <div className="flex-1 min-h-0">

            <MarketChart
              marketData={state.marketData}
            />

          </div>
        )}

      </div>

    </Panel>
  );
}