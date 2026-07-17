import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  MarketData,
} from "../types";

import {
  createLightweightChart,
  type ChartType,
  type LightweightChartAdapter,
} from "./adapters/lightweightChart";

type MarketChartProps = {

  marketData: MarketData;

  stopPrice:
    number | undefined;

};

const CHART_TYPE_STORAGE_KEY =
  "trade-simulator-chart-type";

function loadChartType():
  ChartType {

  try {

    const storedValue =
      localStorage.getItem(
        CHART_TYPE_STORAGE_KEY
      );

    if (
      storedValue ===
      "candles" ||
      storedValue ===
      "line"
    ) {
      return storedValue;
    }

  } catch {

    //
    // localStorage may be unavailable
    // in restricted browser contexts.
    //

  }

  return "candles";

}

function saveChartType(
  chartType: ChartType
): void {

  try {

    localStorage.setItem(
      CHART_TYPE_STORAGE_KEY,
      chartType
    );

  } catch {

    //
    // The chart still works when the
    // preference cannot be persisted.
    //

  }

}

export function MarketChart({
  marketData,
  stopPrice,
}: MarketChartProps) {

  const containerRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const chartRef =
    useRef<
      LightweightChartAdapter |
      undefined
    >(
      undefined
    );

  const [
    chartType,
    setChartType,
  ] = useState<ChartType>(
    loadChartType
  );

  useEffect(() => {

    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    const chart =
      createLightweightChart(
        container
      );

    chartRef.current =
      chart;

    const resizeObserver =
      new ResizeObserver(
        entries => {

          const entry =
            entries[0];

          if (!entry) {
            return;
          }

          const {
            width,
            height,
          } =
            entry.contentRect;

          chart.resize(
            width,
            height
          );

        }
      );

    resizeObserver.observe(
      container
    );

    return () => {

      resizeObserver.disconnect();

      chart.destroy();

      chartRef.current =
        undefined;

    };

  }, []);

  useEffect(() => {

    chartRef
      .current
      ?.setHistory(
        marketData.history
      );

  }, [
    marketData.history,
  ]);

  useEffect(() => {

    chartRef
      .current
      ?.setStopPrice(
        stopPrice
      );

  }, [
    stopPrice,
  ]);

  useEffect(() => {

    chartRef
      .current
      ?.setChartType(
        chartType
      );

  }, [
    chartType,
  ]);

  function handleChartTypeSelected(
    selectedChartType: ChartType
  ): void {

    setChartType(
      selectedChartType
    );

    saveChartType(
      selectedChartType
    );

  }

  return (

    <div className="flex h-full min-h-0 flex-col">

      <div className="mb-2 flex justify-end">

        <div
          className="
            inline-flex
            rounded
            border
            border-gray-200
            bg-gray-50
            p-0.5
          "
          role="group"
          aria-label="Chart type"
        >

          <button

            type="button"

            aria-pressed={
              chartType ===
              "candles"
            }

            onClick={() =>
              handleChartTypeSelected(
                "candles"
              )
            }

            className={
              chartType ===
              "candles"

                ? `
                  rounded
                  bg-white
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-gray-900
                  shadow-sm
                `

                : `
                  rounded
                  px-3
                  py-1
                  text-sm
                  text-gray-500
                  hover:bg-white
                  hover:text-gray-900
                `
            }
          >

            Candles

          </button>

          <button

            type="button"

            aria-pressed={
              chartType ===
              "line"
            }

            onClick={() =>
              handleChartTypeSelected(
                "line"
              )
            }

            className={
              chartType ===
              "line"

                ? `
                  rounded
                  bg-white
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-blue-600
                  shadow-sm
                `

                : `
                  rounded
                  px-3
                  py-1
                  text-sm
                  text-gray-500
                  hover:bg-white
                  hover:text-blue-600
                `
            }
          >

            Line

          </button>

        </div>

      </div>

      <div

        ref={
          containerRef
        }

        className="
          min-h-0
          flex-1
          overflow-hidden
          rounded
        "

      />

    </div>

  );

}