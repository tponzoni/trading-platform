export function getCapitalRequired(

    shares: number,

    currentPrice: number,

): number {

    return shares * currentPrice;

}