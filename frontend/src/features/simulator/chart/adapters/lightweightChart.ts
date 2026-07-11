import {
    createChart,
    type IChartApi,
    type ISeriesApi,
    type Time,
    CandlestickSeries,
    LineStyle,
} from "lightweight-charts";

import type { HistoricalPrice } from "../../types";

// export interface LightweightChartAdapter {
//     setCandles(history: HistoricalPrice[]): void;
//     resize(width: number, height: number): void;
//     destroy(): void;
// }

export interface LightweightChartAdapter {

    setCandles(history: HistoricalPrice[]): void;

    setStopPrice(
        stopPrice: number | undefined
    ): void;

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

    let stopPriceLine =
        candleSeries.createPriceLine({

            price: 0,

            color: "#ef4444",

            lineWidth: 2,

            lineStyle: LineStyle.Solid,

            axisLabelVisible: false,

            // title: "STOP",

        });

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

        setStopPrice(
            stopPrice
        ) {

            if (stopPrice === undefined) {

                candleSeries.removePriceLine(
                    stopPriceLine
                );

                stopPriceLine =
                    candleSeries.createPriceLine({

                        price: 0,

                        color: "#ef4444",

                        lineWidth: 2,

                        lineStyle: LineStyle.Solid,

                        axisLabelVisible: false,

                        // title: "STOP",

                    });

                return;

            }

            candleSeries.removePriceLine(
                stopPriceLine
            );

            stopPriceLine =
                candleSeries.createPriceLine({

                    price: stopPrice,

                    color: "#ef4444",

                    lineWidth: 2,

                    lineStyle: LineStyle.Solid,

                    axisLabelVisible: true,

                    // title: "STOP",

                });

        },

        resize(width, height) {
            chart.resize(width, height);
        },

        destroy() {
            chart.remove();
        },

    };

}