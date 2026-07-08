import type {
    Portfolio,
} from "../types";

import {
    getPortfolioCash,
} from "../calculations/cash";

import {
    getMaximumTradeRisk,
} from "../calculations/risk";

type PortfolioOverviewProps = {

    portfolio: Portfolio | undefined;

};

export function PortfolioOverview({
    portfolio,
}: PortfolioOverviewProps) {

    if (!portfolio) {
        return null;
    }

    const cash =
        getPortfolioCash(
            portfolio
        );

    const maximumTradeRisk =
        getMaximumTradeRisk(
            portfolio
        );

    return (

        <div className="rounded-md border border-gray-200 bg-white p-4">

            {/* <h3 className="mb-4 text-sm font-semibold text-gray-700">

                Portfolio Overview

            </h3> */}

            <div className="grid grid-cols-2 gap-y-2 text-sm">

                <span>Currency</span>

                <span className="text-right font-medium">

                    {portfolio.currency}

                </span>

                {/* <span>Cash</span>

                <span className="text-right font-medium">

                    {cash.toLocaleString(
                        undefined,
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    )}

                </span> */}

                <span>

                    Risk ({portfolio.riskPercent}%)

                </span>

                <span className="text-right font-medium">

                    {maximumTradeRisk.toLocaleString(
                        undefined,
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    )}

                </span>

                {/* <span>Deposits</span>

                <span className="text-right font-medium">

                    {portfolio.deposits.length}

                </span> */}

            </div>

        </div>

    );

}