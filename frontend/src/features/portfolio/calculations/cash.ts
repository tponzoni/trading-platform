import type {
    Portfolio,
} from "../types";

export function getPortfolioCash(
    portfolio: Portfolio
): number {

    return portfolio.deposits.reduce(

        (total, deposit) =>

            total + deposit.amount,

        0,

    );

}