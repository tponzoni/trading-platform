import { useEffect, useState } from "react";

import { Panel } from "../../../shared/components/Panel/Panel";

import { SymbolSearch } from "./SymbolSearch";
import { CurrentPrice } from "./CurrentPrice";
import { MarketChart } from "../chart/MarketChart";
import { TimeframeSelector } from "../chart/TimeframeSelector";
import { getMarketData } from "../services/marketData";
import { updateRecentSymbols } from "../utils/updateRecentSymbols";

import {
  loadWorkspace,
  updateWorkspace,
} from "../../../shared/services/storage/localStorageService";

import type {
  MarketData,
  Timeframe,
  TradeSimulatorState,
} from "../types";
import { RecentSymbols } from "./RecentSymbols";

const EMPTY_MARKET_DATA: MarketData = {
  quote: null,
  history: [],
};

export function TradeSimulator() {
  const [state, setState] = useState<TradeSimulatorState>(() => {

    const workspace = loadWorkspace();

    return {
      selectedSymbol: "",
      selectedTimeframe: workspace.selectedTimeframe,
      recentSymbols: workspace.recentSymbols,
      marketData: EMPTY_MARKET_DATA,
      isLoading: false,
      error: null,
    }
  });

  useEffect(() => {
    const lastSymbol = state.recentSymbols[0];

    if (!lastSymbol) {
      return;
    }

    void handleLookup(lastSymbol);
  }, []);

  async function handleLookup(
    requestedSymbol?: string,
    timeframe?: Timeframe
  ) {
    const symbol = (
      typeof requestedSymbol === "string"
        ? requestedSymbol
        : state.selectedSymbol
    ).trim().toUpperCase();

    if (!symbol) {
      return;
    }

    setState((current) => ({
      ...current,
      isLoading: true,
      error: null,
    }));

    const selectedTimeframe =
      timeframe ?? state.selectedTimeframe;
    const marketData = await getMarketData({ symbol, timeframe: selectedTimeframe });

    if (!marketData) {
      setState((current) => ({
        ...current,
        isLoading: false,
        error: "Unknown symbol.",
        marketData: EMPTY_MARKET_DATA,
      }));

      return;
    }

    setState((current) => {
      const recentSymbols = updateRecentSymbols(
        current.recentSymbols,
        symbol
      );

      updateWorkspace({
        recentSymbols,
      });

      return {
        ...current,
        selectedSymbol: symbol,
        recentSymbols,
        marketData,
        isLoading: false,
        error: null,
      };
    });
  }

  async function handleTimeframeChanged(
    selectedTimeframe: Timeframe
  ) {

    updateWorkspace({
      selectedTimeframe,
    });

    setState((current) => ({
      ...current,
      selectedTimeframe,
    }));

    if (!state.marketData.quote) {
      return;
    }

    await handleLookup(
      state.marketData.quote.symbol,
      selectedTimeframe
    );
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

        {/* {state.isLoading && (
          <div className="rounded border border-blue-300 bg-blue-50 p-3 text-blue-700">
            Loading market data...
          </div>
        )} */}

        <RecentSymbols
          symbols={state.recentSymbols}
          onSelect={handleLookup}
        />

        <TimeframeSelector
          selected={state.selectedTimeframe}
          onSelect={handleTimeframeChanged}
        />

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