import {
  useEffect,
  useState,
} from "react";

import { Panel } from "../../../shared/components/Panel/Panel";

import { SymbolSearch } from "./SymbolSearch";
import { CurrentPrice } from "./CurrentPrice";
import { MarketChart } from "../chart/MarketChart";
import { TimeframeSelector } from "../chart/TimeframeSelector";

import { getMarketData } from "../services/marketData";

import {
  loadUserPreferences,
  updateUserPreferences,
} from "../../../shared/services/storage/userPreferencesService";

import type {
  MarketData,
  Timeframe,
  TradeSimulatorState,
} from "../types";

import {
  useWorkspace,
} from "../../../app/providers/WorkspaceProvider";

import {
  PortfolioSymbols,
} from "./PortfolioSymbols";
import { getStopLossPrice } from "../../portfolio/calculations/stopLoss";

const EMPTY_MARKET_DATA: MarketData = {
  quote: undefined,
  history: [],
};

export function TradeSimulator() {

  const {
    workspace,
    setWorkspace,
  } = useWorkspace();

  const portfolio =
    workspace.portfolios.find(
      (portfolio) =>
        portfolio.id === workspace.portfolioId
    );

  const [state, setState] = useState<TradeSimulatorState>(() => {

    const preferences =
      loadUserPreferences();

    return {

      searchText: "",

      timeframe: preferences.timeframe,

      marketData: EMPTY_MARKET_DATA,

      isLoading: false,

      error: null,

    };

  });

  const currentPrice =
    state.marketData.quote?.price;

  const stopPrice =
    currentPrice === undefined

      ? undefined

      : getStopLossPrice(
        currentPrice,
        portfolio?.stopLossPercent ?? 15,
      );

  useEffect(() => {

    if (!portfolio?.selectedSymbol) {
      return;
    }

    void handleLookup(
      portfolio.selectedSymbol
    );

  }, [
    workspace.portfolioId,
  ]);

  async function handleLookup(
    requestedSymbol?: string,
    timeframe?: Timeframe
  ) {

    const symbol = (
      typeof requestedSymbol === "string"
        ? requestedSymbol
        : state.searchText ?? ""
    )
      .trim()
      .toUpperCase();

    if (!symbol) {
      return;
    }

    setState((current) => ({
      ...current,
      isLoading: true,
      error: null,
    }));

    const tf =
      timeframe ?? state.timeframe;

    const marketData =
      await getMarketData({
        symbol,
        timeframe: tf,
      });

    if (!marketData) {

      setState((current) => ({
        ...current,
        isLoading: false,
        error: "Unknown symbol.",
        marketData: EMPTY_MARKET_DATA,
      }));

      return;

    }

    setWorkspace(current => ({

      ...current,

      quote: marketData.quote,

      portfolios: current.portfolios.map(portfolio =>

        portfolio.id === current.portfolioId

          ? {
            ...portfolio,

            selectedSymbol: symbol,

            symbols: portfolio.symbols.includes(symbol)
              ? portfolio.symbols
              : [
                symbol,
                ...portfolio.symbols,
              ],
          }

          : portfolio

      ),

    }));

    setState((current) => ({

      ...current,

      searchText: symbol,

      marketData,

      isLoading: false,

      error: null,

    }));

  }

  function handleSymbolDeleted(
    symbol: string
  ) {

    setWorkspace(current => ({

      ...current,

      portfolios: current.portfolios.map(portfolio => {

        if (
          portfolio.id !== current.portfolioId
        ) {
          return portfolio;
        }

        const symbols =
          portfolio.symbols.filter(
            currentSymbol =>
              currentSymbol !== symbol
          );

        return {

          ...portfolio,

          symbols,

          selectedSymbol:

            portfolio.selectedSymbol === symbol

              ? symbols[0] ?? ""

              : portfolio.selectedSymbol,

        };

      }),

    }));

  }

  async function handleTimeframeChanged(
    timeframe: Timeframe
  ) {

    updateUserPreferences({
      timeframe,
    });

    setState((current) => ({
      ...current,
      timeframe,
    }));

    if (!state.marketData.quote) {
      return;
    }

    await handleLookup(
      state.marketData.quote.symbol,
      timeframe
    );

  }

  return (

    <Panel title="">

      <div className="flex h-full min-h-0 flex-col gap-4">

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-4">

            <SymbolSearch
              value={state.searchText ?? ""}
              isLoading={state.isLoading}
              onChange={(searchText) =>
                setState((current) => ({
                  ...current,
                  searchText,
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

        <PortfolioSymbols
          portfolio={portfolio}
          onSelect={handleLookup}
          onDelete={handleSymbolDeleted}
        />

        <TimeframeSelector
          selected={state.timeframe}
          onSelect={handleTimeframeChanged}
        />

        {!state.isLoading && (

          <div className="flex-1 min-h-0">

            <MarketChart
              marketData={state.marketData}
              stopPrice={stopPrice}
            />

          </div>

        )}

      </div>

    </Panel>

  );

}