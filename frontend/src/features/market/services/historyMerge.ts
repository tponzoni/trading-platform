import type {
    HistoricalPrice,
} from "../types";

export function mergeHistory(
    ...sources: HistoricalPrice[][]
): HistoricalPrice[] {
    const candlesByDate =
        new Map<string, HistoricalPrice>();

    for (const history of sources) {
        for (const candle of history) {
            candlesByDate.set(
                candle.time,
                candle,
            );
        }
    }

    return Array.from(
        candlesByDate.values(),
    ).sort(
        (left, right) =>
            left.time.localeCompare(
                right.time,
            ),
    );
}