import {
    CandlestickSeries,
    createChart,
    HistogramSeries,
    type IChartApi,
    type ISeriesApi,
    LineStyle,
    type Time,
} from "lightweight-charts";
import type { HistoricalPrice } from "../../../market/types";

export interface LightweightChartAdapter {

    setCandles(
        history: HistoricalPrice[]
    ): void;

    setStopPrice(
        stopPrice: number | undefined
    ): void;

    resize(
        width: number,
        height: number
    ): void;

    destroy(): void;

}

export function createLightweightChart(
    container: HTMLDivElement
): LightweightChartAdapter {

    const chart: IChartApi =
        createChart(
            container,
            {

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

            }
        );

    const candleSeries:
        ISeriesApi<"Candlestick"> =
        chart.addSeries(
            CandlestickSeries
        );

    const volumeSeries:
        ISeriesApi<"Histogram"> =
        chart.addSeries(
            HistogramSeries,
            {

                priceFormat: {
                    type: "volume",
                },

                priceScaleId: "",

            }
        );

    volumeSeries
        .priceScale()
        .applyOptions({

            scaleMargins: {

                top: 0.78,

                bottom: 0,

            },

        });

    let stopPriceLine =
        candleSeries.createPriceLine({

            price: 0,

            color: "#ef4444",

            lineWidth: 2,

            lineStyle:
                LineStyle.Solid,

            axisLabelVisible: false,

        });

    function setCandles(
        history: HistoricalPrice[]
    ): void {

        candleSeries.setData(

            history.map(
                (candle) => ({

                    time:
                        candle.time as Time,

                    open:
                        candle.open,

                    high:
                        candle.high,

                    low:
                        candle.low,

                    close:
                        candle.close,

                })
            )

        );

        volumeSeries.setData(

            history.map(
                (candle) => ({

                    time:
                        candle.time as Time,

                    value:
                        candle.volume,

                    color:
                        candle.close >=
                        candle.open
                            ? "rgba(22, 163, 74, 0.45)"
                            : "rgba(220, 38, 38, 0.45)",

                })
            )

        );

        chart
            .timeScale()
            .fitContent();

    }

    function setStopPrice(
        stopPrice: number | undefined
    ): void {

        candleSeries.removePriceLine(
            stopPriceLine
        );

        stopPriceLine =
            candleSeries.createPriceLine({

                price:
                    stopPrice ?? 0,

                color: "#ef4444",

                lineWidth: 2,

                lineStyle:
                    LineStyle.Solid,

                axisLabelVisible:
                    stopPrice !== undefined,

            });

    }

    function resize(
        width: number,
        height: number
    ): void {

        chart.resize(
            width,
            height
        );

    }

    function destroy(): void {

        chart.remove();

    }

    return {

        setCandles,

        setStopPrice,

        resize,

        destroy,

    };

}