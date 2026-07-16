import type {
    MarketData,
    MarketDataRequest,
} from "../types";

import {
    getMarketRecord,
} from "../../market/services/marketRepository";

import {
    filterHistory,
} from "./filterHistory";

export async function getMarketData(
    request: MarketDataRequest,
): Promise<MarketData | null> {
    const symbol =
        request.symbol
            .trim()
            .toUpperCase();

    if (!symbol) {
        return null;
    }

    try {
        const marketRecord =
            await getMarketRecord(
                symbol
            );

        if (!marketRecord?.quote) {
            return null;
        }

        if (
            marketRecord.history.length === 0
        ) {
            return null;
        }

        return {
            quote:
                marketRecord.quote,
            history:
                filterHistory(
                    marketRecord.history,
                    request.timeframe,
                ),
        };
    } catch (error) {
        console.error(
            `Unable to retrieve market data for ${symbol}.`,
            error,
        );

        return null;
    }
}