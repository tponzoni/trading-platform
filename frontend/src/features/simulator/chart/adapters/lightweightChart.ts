import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type Time,
  CandlestickSeries,
} from "lightweight-charts";

import type { HistoricalPrice } from "../../types";

export interface LightweightChartAdapter {
    setCandles(history: HistoricalPrice[]): void;
    resize(width: number, height: number): void;
    destroy(): void;
}

export function createLightweightChart(
    container: HTMLDivElement
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
        },

        timeScale: {
            borderColor: "#e5e7eb",
        },
    });

    const candleSeries: ISeriesApi<"Candlestick"> =
        chart.addSeries(CandlestickSeries);

    return {

        setCandles(history) {

            candleSeries.setData(
                history.map((candle) => ({
                    time: candle.time as Time,
                    open: candle.open,
                    high: candle.high,
                    low: candle.low,
                    close: candle.close,
                }))
            );

            chart.timeScale().fitContent();
        },

        resize(width, height) {
            chart.resize(width, height);
        },

        destroy() {
            chart.remove();
        },

    };

}