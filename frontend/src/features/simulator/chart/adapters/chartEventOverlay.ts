import type { IChartApi, Time } from "lightweight-charts";

import type { HistoricalPrice } from "../../../market/types";
import type { MarketChartEvent } from "../data/marketEvents";

interface PositionedMarketEvent {
  event: MarketChartEvent;
  chartTime: string;
}

export interface ChartEventOverlay {
  setHistory(history: readonly HistoricalPrice[]): void;

  setEvents(events: readonly MarketChartEvent[]): void;

  update(): void;

  destroy(): void;
}

function findChartTime(
  eventDate: string,
  history: readonly HistoricalPrice[],
): string | undefined {
  const nextTradingCandle = history.find(
    candle => candle.time >= eventDate,
  );

  return nextTradingCandle?.time;
}

function getEventColor(
  category: MarketChartEvent["category"],
): string {
  switch (category) {
    case "company":
      return "#2563eb";

    case "economic":
      return "#d97706";

    case "geopolitical":
      return "#dc2626";

    case "market":
    default:
      return "#6b7280";
  }
}

export function createChartEventOverlay(
  chart: IChartApi,
  chartContainer: HTMLDivElement,
): ChartEventOverlay {
  const overlay = document.createElement("div");

  Object.assign(overlay.style, {
    position: "absolute",
    inset: "0",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: "5",
  });

  chartContainer.appendChild(overlay);

  let history: readonly HistoricalPrice[] = [];
  let events: readonly MarketChartEvent[] = [];

  function getPositionedEvents(): PositionedMarketEvent[] {
    return events
      .map(event => {
        const chartTime = findChartTime(event.date, history);

        if (!chartTime) {
          return undefined;
        }

        return {
          event,
          chartTime,
        };
      })
      .filter(
        (
          event,
        ): event is PositionedMarketEvent =>
          event !== undefined,
      );
  }

  function update(): void {
    overlay.replaceChildren();

    getPositionedEvents().forEach(
      ({ event, chartTime }) => {
        const coordinate = chart
          .timeScale()
          .timeToCoordinate(chartTime as Time);

        if (coordinate === null) {
          return;
        }

        const color = getEventColor(event.category);

        const eventContainer =
          document.createElement("div");

        Object.assign(eventContainer.style, {
          position: "absolute",
          top: "0",
          bottom: "0",
          left: `${coordinate}px`,
          width: "14px",
          transform: "translateX(-50%)",
          pointerEvents: "auto",
          cursor: "help",
        });

        eventContainer.title =
          `${event.date}: ${event.title}`;

        eventContainer.setAttribute(
          "aria-label",
          `${event.date}: ${event.title}`,
        );

        const line = document.createElement("div");

        Object.assign(line.style, {
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "50%",
          borderLeft: `1px dashed ${color}`,
          opacity: "0.75",
        });

        const marker = document.createElement("div");

        marker.textContent = "●";

        Object.assign(marker.style, {
          position: "absolute",
          top: "6px",
          left: "50%",
          transform: "translateX(-50%)",
          color,
          fontSize: "10px",
          lineHeight: "10px",
        });

        eventContainer.append(line, marker);
        overlay.appendChild(eventContainer);
      },
    );
  }

  function setHistory(
    nextHistory: readonly HistoricalPrice[],
  ): void {
    history = nextHistory;
    update();
  }

  function setEvents(
    nextEvents: readonly MarketChartEvent[],
  ): void {
    events = nextEvents;
    update();
  }

  function destroy(): void {
    chart
      .timeScale()
      .unsubscribeVisibleLogicalRangeChange(update);

    overlay.remove();
  }

  chart
    .timeScale()
    .subscribeVisibleLogicalRangeChange(update);

  return {
    setHistory,
    setEvents,
    update,
    destroy,
  };
}