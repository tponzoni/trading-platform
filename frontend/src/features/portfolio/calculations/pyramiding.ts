export interface PyramidParcel {

    entry: number;

    shares: number;

    price: number;

    value: number;

}

export interface PyramidingPlan {

    parcels: PyramidParcel[];

    totalValue: number;

}

export function getBalancedPyramidingPlan(

    shares: number,

    currentPrice: number,

    triggerPercent: number,

): PyramidingPlan {

    const parcelShares = [

        Math.ceil(shares / 3),

        Math.ceil((shares - Math.ceil(shares / 3)) / 2),

        shares

            - Math.ceil(shares / 3)

            - Math.ceil((shares - Math.ceil(shares / 3)) / 2),

    ];

    const parcels: PyramidParcel[] =

        parcelShares.map((parcelShares, index) => {

            const price =

                currentPrice *

                (1 + triggerPercent / 100 * index);

            return {

                entry: index + 1,

                shares: parcelShares,

                price,

                value: parcelShares * price,

            };

        });

    return {

        parcels,

        totalValue:

            parcels.reduce(

                (total, parcel) =>

                    total + parcel.value,

                0,

            ),

    };

}