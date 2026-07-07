import { useEffect, useState } from "react";

import { Panel } from "../../../shared/components/Panel/Panel";

import { SymbolSearch } from "./SymbolSearch";
import { CurrentPrice } from "./CurrentPrice";
import { MarketChart } from "../chart/MarketChart";
import { TimeframeSelector } from "../chart/TimeframeSelector";
import { getMarketData } from "../services/marketData";
// import { updateUpdatePortfolioSymbols } from "../utils/updateUpdatePortfolioSymbols";

import type {
  MarketData,
  Timeframe,
  TradeSimulatorState,
} from "../types";
// import { PortfolioSymbols } from "./PortfolioSymbols";

import {
  useWorkspace,
} from "../../../app/providers/WorkspaceProvider";
// import { loadWorkspace } from "../../../shared/services/storage/workspaceStorage";

const EMPTY_MARKET_DATA: MarketData = {
  quote: null,
  history: [],
};

export function TradeSimulator() {
  // const {
  //   workspace,
  // } = useWorkspace();

  // console.log(workspace);

  const [state, setState] = useState<TradeSimulatorState>(() => {

    // const workspace = loadWorkspace();

    return {
      selectedSymbol: "",
      selectedTimeframe: "1Y",
      // PortfolioSymbols: workspace.PortfolioSymbols,
      marketData: EMPTY_MARKET_DATA,
      isLoading: false,
      error: null,
    }
  });

  // useEffect(() => {
  //   const lastSymbol = state.PortfolioSymbols[0];

  //   if (!lastSymbol) {
  //     return;
  //   }

  //   void handleLookup(lastSymbol);
  // }, []);

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
      // const PortfolioSymbols = updateUpdatePortfolioSymbols(
      //   current.PortfolioSymbols,
      //   symbol
      // );

      // updateWorkspace({
      //   PortfolioSymbols,
      // });

      return {
        ...current,
        selectedSymbol: symbol,
        // PortfolioSymbols,
        marketData,
        isLoading: false,
        error: null,
      };
    });
  }

  async function handleTimeframeChanged(
    selectedTimeframe: Timeframe
  ) {

    // updateWorkspace({
    //   selectedTimeframe,
    // });

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

        {/* <PortfolioSymbols
          symbols={state.PortfolioSymbols}
          onSelect={handleLookup}
        /> */}

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