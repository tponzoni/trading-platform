export function getMaximumPositionShares(

    maximumRisk: number,

    lossPerShare: number,

): number {

    if (lossPerShare <= 0) {

        return 0;

    }

    return Math.floor(

        maximumRisk /

        lossPerShare

    );

}