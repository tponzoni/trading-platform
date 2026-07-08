import type {
    Portfolio,
} from "../types";

import {
    getPortfolioCash,
} from "./cash";

export function getMaximumTradeRisk(
    portfolio: Portfolio
): number {

    const cash =
        getPortfolioCash(portfolio);

    return (
        cash *
        portfolio.riskPercent /
        100
    );

}