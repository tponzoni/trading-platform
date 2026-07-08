import { getPortfolioCash } from "../services/portfolioService";
import type { Portfolio } from "../types";

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
    getPortfolioCash(portfolio);

  return (

    <div className="rounded-md border border-gray-200 p-4">

      <div className="flex justify-between">

        <span className="font-medium">

          Cash

        </span>

        <span>

          {portfolio.currency}{" "}

          {cash.toLocaleString(
            undefined,
            {

              minimumFractionDigits: 2,

              maximumFractionDigits: 2,

            }

          )}

        </span>

      </div>

    </div>

  );

}