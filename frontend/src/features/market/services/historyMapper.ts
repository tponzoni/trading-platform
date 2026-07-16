import type {
    CachedHistoricalPrice,
    HistoricalPrice,
} from "../types";

function toCachedDate(
    date: string,
): number {
    return Number(
        date.replaceAll("-", "")
    );
}

function fromCachedDate(
    date: number,
): string {
    const value = date.toString();

    return (
        `${value.slice(0, 4)}-` +
        `${value.slice(4, 6)}-` +
        value.slice(6, 8)
    );
}

export function toCachedHistory(
    history: HistoricalPrice[],
): CachedHistoricalPrice[] {
    return history.map(candle => [
        toCachedDate(candle.time),
        candle.open,
        candle.high,
        candle.low,
        candle.close,
        candle.volume,
    ]);
}

export function fromCachedHistory(
    history: CachedHistoricalPrice[],
): HistoricalPrice[] {
    return history.map(candle => ({
        time: fromCachedDate(candle[0]),
        open: candle[1],
        high: candle[2],
        low: candle[3],
        close: candle[4],
        volume: candle[5],
    }));
}