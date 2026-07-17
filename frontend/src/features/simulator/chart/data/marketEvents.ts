export type MarketChartEventCategory =
  | "geopolitical"
  | "economic"
  | "company"
  | "market";

export interface MarketChartEvent {
  date: string;
  title: string;
  category?: MarketChartEventCategory;
  symbols?: readonly string[];
}

export const MARKET_CHART_EVENTS:
  readonly MarketChartEvent[] = [
    {
      date: "2020-03-11",
      title: "WHO declares COVID-19 a pandemic",
      category: "market",
    },
    {
      date: "2022-02-24",
      title: "Russia launches full-scale invasion of Ukraine",
      category: "geopolitical",
    },
    {
      date: "2023-03-10",
      title: "Silicon Valley Bank collapses",
      category: "economic",
    },
    {
      date: "2024-06-10",
      title: "Apple Intelligence announced",
      category: "company",
      symbols: ["AAPL"],
    },
    {
      date: "2026-02-28",
      title: "Khamenei Killed",
      category: "geopolitical",
    },
  ];