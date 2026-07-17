import {
  getCachedMarketData,
} from "./marketDataCache";

import {
  getSeedHistory,
} from "./marketSeed";

import {
  mergeHistory,
} from "./historyMerge";

const TRADING_DAYS_PER_YEAR =
  252;

const NEAR_52_WEEK_HIGH_PERCENT =
  5;

function isNear52WeekHigh(
  symbol: string
): boolean {

  const normalizedSymbol =
    symbol
      .trim()
      .toUpperCase();

  if (!normalizedSymbol) {
    return false;
  }

  const seedHistory =
    getSeedHistory(
      normalizedSymbol
    );

  const cachedMarketData =
    getCachedMarketData(
      normalizedSymbol
    );

  const history =
    mergeHistory(
      seedHistory,
      cachedMarketData?.history ?? [],
    );

  if (history.length === 0) {
    return false;
  }

  const recentHistory =
    history.slice(
      -TRADING_DAYS_PER_YEAR
    );

  const latestCandle =
    recentHistory.at(-1);

  if (!latestCandle) {
    return false;
  }

  const highestClosingPrice =
    Math.max(
      ...recentHistory.map(
        candle =>
          candle.close
      )
    );

  if (
    !Number.isFinite(
      highestClosingPrice
    ) ||
    highestClosingPrice <= 0
  ) {
    return false;
  }

  const currentPrice =
    cachedMarketData
      ?.quote
      ?.price ??
    latestCandle.close;

  const minimumPriceToQualify =
    highestClosingPrice *
    (
      1 -
      NEAR_52_WEEK_HIGH_PERCENT /
      100
    );

  return (
    currentPrice >=
    minimumPriceToQualify
  );

}

export function get52WeekHighSymbols(
  symbols: readonly string[]
): Set<string> {

  const symbolsNear52WeekHigh =
    new Set<string>();

  for (const symbol of symbols) {

    const normalizedSymbol =
      symbol
        .trim()
        .toUpperCase();

    if (
      isNear52WeekHigh(
        normalizedSymbol
      )
    ) {

      symbolsNear52WeekHigh.add(
        normalizedSymbol
      );

    }

  }

  return symbolsNear52WeekHigh;

}