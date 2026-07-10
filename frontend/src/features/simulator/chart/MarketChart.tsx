import { useEffect, useRef } from "react";

import type { MarketData } from "../types";

import {
  createLightweightChart,
  type LightweightChartAdapter,
} from "./adapters/lightweightChart";

type MarketChartProps = {
  marketData: MarketData;
  stopPrice?: number;
};

export function MarketChart({
  marketData,
  stopPrice,
}: MarketChartProps) {

  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartRef =
    useRef<LightweightChartAdapter | null>(null);

  // Create chart once
  useEffect(() => {

    if (!chartContainerRef.current) {
      return;
    }

    chartRef.current =
      createLightweightChart(
        chartContainerRef.current
      );

    return () => {
      chartRef.current?.destroy();
    };

  }, []);

  // Update candles whenever history changes
  useEffect(() => {

    if (!chartRef.current) {
      return;
    }

    chartRef.current.setCandles(
      marketData.history
    );

  }, [marketData.history]);

  useEffect(() => {

    if (!chartRef.current) {
      return;
    }
console.log("Stop Price:", stopPrice);
    chartRef.current.setStopPrice(
      stopPrice
    );

  }, [stopPrice]);

  // // Resize the chart whenever its container changes size
  // useEffect(() => {

  //   if (!chartContainerRef.current || !chartRef.current) {
  //     return;
  //   }

  //   const container = chartContainerRef.current;

  //   const resizeObserver = new ResizeObserver(() => {

  //     chartRef.current?.resize(
  //       container.clientWidth,
  //       container.clientHeight
  //     );

  //   });

  //   resizeObserver.observe(container);

  //   // Initial resize
  //   chartRef.current.resize(
  //     container.clientWidth,
  //     container.clientHeight
  //   );

  //   return () => {
  //     resizeObserver.disconnect();
  //   };

  // }, []);

  return (
    <section className="flex h-full min-h-0 flex-col rounded-lg border bg-white shadow-sm">
      {/* <header className="flex items-center justify-between border-b px-4 py-3">

        <h2 className="text-lg font-semibold">
          Market Chart
        </h2>

        <span className="text-sm text-gray-500">
          {marketData.history.length} candles
        </span>

      </header> */}

      <div className="flex-1 min-h-0 p-4">

        <div
          ref={chartContainerRef}
          className="h-full w-full"
        />

      </div>

    </section>
  );
}