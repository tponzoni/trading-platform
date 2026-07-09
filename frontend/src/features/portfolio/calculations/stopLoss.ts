export function getStopLossPrice(

    currentPrice: number,

    stopLossPercent: number,

): number {

    return currentPrice *

        (1 - stopLossPercent / 100);

}