import {
  CandlestickSeries,
  createChart,
  HistogramSeries,
  LineSeries,
  LineStyle,
  type IChartApi,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";

import type { HistoricalPrice } from "../../../market/types";
import type { MarketChartEvent } from "../data/marketEvents";

import {
  createChartEventOverlay,
  type ChartEventOverlay,
} from "./chartEventOverlay";

export type ChartType = "candles" | "line";

export interface LightweightChartAdapter {
  setHistory(history: HistoricalPrice[]): void;

  setEvents(events: readonly MarketChartEvent[]): void;

  setChartType(chartType: ChartType): void;

  setStopPrice(stopPrice: number | undefined): void;

  resize(width: number, height: number): void;

  destroy(): void;
}

export function createLightweightChart(
  container: HTMLDivElement,
): LightweightChartAdapter {
  const chart: IChartApi = createChart(container, {
    autoSize: true,

    layout: {
      background: {
        color: "#ffffff",
      },

      textColor: "#374151",
    },

    grid: {
      vertLines: {
        color: "#f3f4f6",
      },

      horzLines: {
        color: "#f3f4f6",
      },
    },

    rightPriceScale: {
      borderColor: "#e5e7eb",

      scaleMargins: {
        top: 0.08,
        bottom: 0.25,
      },
    },

    timeScale: {
      borderColor: "#e5e7eb",
      timeVisible: true,
      secondsVisible: false,
    },

    crosshair: {
      vertLine: {
        labelVisible: true,
      },

      horzLine: {
        labelVisible: true,
      },
    },
  });

  const candleSeries: ISeriesApi<"Candlestick"> =
    chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a",
      downColor: "#dc2626",
      borderVisible: false,
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
      visible: true,
    });

  const lineSeries: ISeriesApi<"Line"> = chart.addSeries(
    LineSeries,
    {
      color: "#2563eb",
      lineWidth: 2,
      priceLineVisible: true,
      lastValueVisible: true,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      visible: false,
    },
  );

  const volumeSeries: ISeriesApi<"Histogram"> =
    chart.addSeries(HistogramSeries, {
      priceFormat: {
        type: "volume",
      },

      priceScaleId: "",
      lastValueVisible: false,
      priceLineVisible: false,
    });

  volumeSeries.priceScale().applyOptions({
    scaleMargins: {
      top: 0.78,
      bottom: 0,
    },
  });

  const candleStopPriceLine = candleSeries.createPriceLine({
    price: 0,
    color: "#ef4444",
    lineWidth: 2,
    lineStyle: LineStyle.Solid,
    axisLabelVisible: false,
    lineVisible: false,
    title: "Stop",
  });

  const lineStopPriceLine = lineSeries.createPriceLine({
    price: 0,
    color: "#ef4444",
    lineWidth: 2,
    lineStyle: LineStyle.Solid,
    axisLabelVisible: false,
    lineVisible: false,
    title: "Stop",
  });

  const eventOverlay: ChartEventOverlay =
    createChartEventOverlay(chart, container);

  function setHistory(history: HistoricalPrice[]): void {
    candleSeries.setData(
      history.map(candle => ({
        time: candle.time as Time,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
      })),
    );

    lineSeries.setData(
      history.map(candle => ({
        time: candle.time as Time,
        value: candle.close,
      })),
    );

    volumeSeries.setData(
      history.map(candle => ({
        time: candle.time as Time,
        value: candle.volume,

        color:
          candle.close >= candle.open
            ? "rgba(22, 163, 74, 0.45)"
            : "rgba(220, 38, 38, 0.45)",
      })),
    );

    chart.timeScale().fitContent();

    eventOverlay.setHistory(history);
  }

  function setEvents(
    events: readonly MarketChartEvent[],
  ): void {
    eventOverlay.setEvents(events);
  }

  function setChartType(chartType: ChartType): void {
    candleSeries.applyOptions({
      visible: chartType === "candles",
    });

    lineSeries.applyOptions({
      visible: chartType === "line",
    });
  }

  function setStopPrice(
    stopPrice: number | undefined,
  ): void {
    const hasStopPrice =
      stopPrice !== undefined &&
      Number.isFinite(stopPrice) &&
      stopPrice > 0;

    const price = hasStopPrice ? stopPrice : 0;

    candleStopPriceLine.applyOptions({
      price,
      axisLabelVisible: hasStopPrice,
      lineVisible: hasStopPrice,
    });

    lineStopPriceLine.applyOptions({
      price,
      axisLabelVisible: hasStopPrice,
      lineVisible: hasStopPrice,
    });
  }

  function resize(width: number, height: number): void {
    if (width <= 0 || height <= 0) {
      return;
    }

    chart.resize(width, height);
    eventOverlay.update();
  }

  function destroy(): void {
    eventOverlay.destroy();
    chart.remove();
  }

  return {
    setHistory,
    setEvents,
    setChartType,
    setStopPrice,
    resize,
    destroy,
  };
}