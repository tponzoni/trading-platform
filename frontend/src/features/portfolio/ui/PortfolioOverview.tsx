import type { Portfolio } from "../types";
import type { StockQuote } from "../../simulator/types";

import { getPortfolioCash } from "../calculations/cash";
import { getMaximumTradeRisk } from "../calculations/risk";
import { getStopLossPrice } from "../calculations/stopLoss";
import { getLossPerShare } from "../calculations/lossPerShare";
import { getMaximumPositionShares } from "../calculations/positionSize";
import { getCapitalRequired } from "../calculations/capitalRequired";
import { getMaximumLoss } from "../calculations/maximumLoss";
import { getBalancedPyramidingPlan } from "../calculations/pyramiding";

type PortfolioOverviewProps = {
    portfolio: Portfolio | undefined;
    quote: StockQuote | undefined;
};

export function PortfolioOverview({
    portfolio,
    quote,
}: PortfolioOverviewProps) {
    if (!portfolio) {
        return null;
    }

    const cash = getPortfolioCash(portfolio);

    const maximumRisk = getMaximumTradeRisk(portfolio);

    const stopPrice =
        quote === undefined
            ? undefined
            : getStopLossPrice(quote.price, portfolio.stopLossPercent);

    const lossPerShare =
        stopPrice === undefined || quote === undefined
            ? undefined
            : getLossPerShare(quote.price, stopPrice);

    const maximumShares =
        lossPerShare === undefined
            ? undefined
            : getMaximumPositionShares(maximumRisk, lossPerShare);

    const pyramidingPlan =
        quote?.price === undefined
            ? undefined
            : getBalancedPyramidingPlan(
                maximumShares ?? 0,
                quote.price,
                5,
            );

    const capitalRequired =
        maximumShares === undefined || quote === undefined
            ? undefined
            : getCapitalRequired(maximumShares, quote.price);

    const maximumLoss =
        maximumShares === undefined || lossPerShare === undefined
            ? undefined
            : getMaximumLoss(maximumShares, lossPerShare);

    return (
        <div className="rounded-md border border-gray-200 bg-white p-1">
            <div className="grid grid-cols-2 gap-y-2 text-sm">
                {/*
                <span>Cash</span>

                <span className="text-right font-medium">
                    $ {cash.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
                */}

                <span>Risk ({portfolio.riskPercent}%)</span>

                <span className="text-right font-medium">
                    ${" "}
                    {maximumRisk.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>

            </div>

            <hr className="mt-3 pt-3" />

            <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span>{quote?.symbol} Price</span>

                <span className="text-right">
                    $ {quote?.price?.toFixed(2) ?? "—"}
                </span>

                <span>Trailing Stop</span>

                <span className="text-right">
                    {portfolio.stopLossPercent.toFixed(0)}%
                </span>

                <span>Stop Price</span>

                <span className="text-right">
                    $ {stopPrice?.toFixed(2) ?? "—"}
                </span>

                {/*
                <span>Loss / Share</span>

                <span className="text-right">
                    ${lossPerShare?.toFixed(2) ?? "—"}
                </span>
                */}

                <span>Max Shares</span>

                <span className="text-right">
                    {maximumShares?.toLocaleString() ?? "—"}
                </span>

                <span>Max Value</span>

                <span className="text-right">
                    ${" "}
                    {capitalRequired?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }) ?? "—"}
                </span>

                <span>Max Loss</span>

                <span className="text-right">
                    ${" "}
                    {maximumLoss?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }) ?? "—"}
                </span>
            </div>

            <hr className="mt-3 pt-2" />

            <h3 className="mb-2 text-sm font-semibold">Pyramiding</h3>

            {pyramidingPlan?.parcels.map((parcel) => (
                <div
                    key={parcel.entry}
                    className="mb-3 grid grid-cols-2 gap-y-1 pt-0 text-sm"
                >
                    <span className="text-right">
                        {parcel.shares} x $ {parcel.price.toFixed(2)}
                    </span>

                    <span className="text-right">
                        ${" "}
                        {parcel.value?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }) ?? "—"}
                    </span>
                </div>
            ))}

            <div className="grid grid-cols-2 border-t pt-2 text-sm font-semibold">
                <span>Deployment</span>

                <span className="text-right">
                    ${" "}
                    {pyramidingPlan?.totalValue?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }) ?? "—"}
                </span>
            </div>
        </div>
    );
}