export function getLossPerShare(

    currentPrice: number,

    stopPrice: number,

): number {

    return currentPrice - stopPrice;

}