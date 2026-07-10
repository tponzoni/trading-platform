export function getMaximumLoss(

    shares: number,

    lossPerShare: number,

): number {

    return shares * lossPerShare;

}