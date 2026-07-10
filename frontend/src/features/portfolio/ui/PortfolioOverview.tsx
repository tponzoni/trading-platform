import type {
    Portfolio,
} from "../types";

import {
    getPortfolioCash,
} from "../calculations/cash";

import {
    getMaximumTradeRisk,
} from "../calculations/risk";

import {
    getStopLossPrice,
} from "../calculations/stopLoss";

import {
    getLossPerShare,
} from "../calculations/lossPerShare";

import {
    getMaximumPositionShares,
} from "../calculations/positionSize";

import {
    getCapitalRequired,
} from "../calculations/capitalRequired";
import type { StockQuote } from "../../simulator/types";

import {
    getMaximumLoss,
} from "../calculations/maximumLoss";

type PortfolioOverviewProps = {

    portfolio: Portfolio | undefined;
    quote: StockQuote | undefined;
};

export function PortfolioOverview({
    portfolio,
    quote
}: PortfolioOverviewProps) {

    if (!portfolio) {
        return null;
    }

    const cash =
        getPortfolioCash(
            portfolio
        );

    const maximumRisk =
        getMaximumTradeRisk(
            portfolio
        );

    const stopPrice =
        quote === undefined

            ? undefined

            : getStopLossPrice(
                quote.price,
                portfolio.stopLossPercent
            );

    const lossPerShare =
        stopPrice === undefined || quote === undefined

            ? undefined

            : getLossPerShare(
                quote.price,
                stopPrice
            );

    const maximumShares =
        lossPerShare === undefined

            ? undefined

            : getMaximumPositionShares(
                maximumRisk,
                lossPerShare
            );

    const capitalRequired =
        maximumShares === undefined || quote === undefined

            ? undefined

            : getCapitalRequired(
                maximumShares,
                quote.price!
            );

    const maximumLoss =
        maximumShares === undefined
            || lossPerShare === undefined

            ? undefined

            : getMaximumLoss(
                maximumShares,
                lossPerShare,
            );

    return (

        <div className="rounded-md border border-gray-200 bg-white p-4">

            <div className="grid grid-cols-2 gap-y-2 text-sm">

                <span>

                    Cash

                </span>
                

                <span className="text-right font-medium">

                    ${cash.toLocaleString(
                        undefined,
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    )}

                </span>

                <span>

                    Risk ({portfolio.riskPercent}%)

                </span>

                <span className="text-right font-medium">

                    ${maximumRisk.toLocaleString(
                        undefined,
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    )}

                </span>

                <span>Current Price</span>

                <span className="text-right">

                    ${quote?.price?.toFixed(2) ?? "—"}

                </span>

                <span>Stop Loss %</span>

                <span className="text-right">

                    {portfolio.stopLossPercent.toFixed(2)}%

                </span>

                <span>Stop Price</span>

                <span className="text-right">

                    ${stopPrice?.toFixed(2) ?? "—"}

                </span>

                <span>Loss / Share</span>

                <span className="text-right">

                    ${lossPerShare?.toFixed(2) ?? "—"}

                </span>

                <span>Max Position (Qty)</span>

                <span className="text-right">

                    {maximumShares?.toLocaleString() ?? "—"}

                </span>

                <span>Max Position Value</span>

                <span className="text-right">

                    ${capitalRequired?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }) ?? "—"}

                </span>

                <span>Maximum Loss</span>

                <span className="text-right">

                    ${maximumLoss?.toLocaleString(
                        undefined,
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    ) ?? "—"}

                </span>

            </div>

        </div>

    );

}