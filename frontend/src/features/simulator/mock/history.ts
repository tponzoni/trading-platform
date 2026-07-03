import type { HistoricalPrice } from "../types";

export const MOCK_HISTORY: Record<string, HistoricalPrice[]> = {
  AAPL: [
    {
      time: "2026-06-23",
      open: 206.10,
      high: 209.20,
      low: 205.70,
      close: 208.40,
      volume: 62400000,
    },
    {
      time: "2026-06-24",
      open: 208.40,
      high: 210.10,
      low: 207.90,
      close: 209.65,
      volume: 54800000,
    },
    {
      time: "2026-06-25",
      open: 209.65,
      high: 212.80,
      low: 209.40,
      close: 212.35,
      volume: 58700000,
    },
  ],

  MSFT: [
    {
      time: "2026-06-23",
      open: 521.30,
      high: 524.80,
      low: 519.60,
      close: 522.10,
      volume: 28400000,
    },
    {
      time: "2026-06-24",
      open: 522.10,
      high: 526.20,
      low: 521.80,
      close: 525.90,
      volume: 26200000,
    },
    {
      time: "2026-06-25",
      open: 525.90,
      high: 529.10,
      low: 524.70,
      close: 528.42,
      volume: 30100000,
    },
  ],

  RKLB: [
    {
      time: "2026-06-23",
      open: 40.20,
      high: 40.90,
      low: 39.80,
      close: 40.60,
      volume: 14300000,
    },
    {
      time: "2026-06-24",
      open: 40.60,
      high: 41.30,
      low: 40.40,
      close: 41.05,
      volume: 15100000,
    },
    {
      time: "2026-06-25",
      open: 41.05,
      high: 42.10,
      low: 40.90,
      close: 41.82,
      volume: 16900000,
    },
  ],
};