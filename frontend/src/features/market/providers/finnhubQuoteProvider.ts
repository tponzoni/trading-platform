import {
    FINNHUB_API_KEYS,
} from "../config/apiKeys";

import {
    getNextApiKey,
    recordApiKeyUse,
    temporarilyDisableApiKey,
} from "../services/apiKeyPool";

import {
    ApiRequestError,
    safeFetchJson,
} from "../services/safeFetch";
import type { StockQuote } from "../types";

interface FinnhubQuoteResponse {
    c: number;
    d: number | null;
    dp: number | null;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
}

const PROVIDER = "finnhub";

export async function fetchFinnhubQuote(
    symbol: string,
): Promise<StockQuote | undefined> {
    const attemptedKeys =
        new Set<string>();

    while (
        attemptedKeys.size <
        FINNHUB_API_KEYS.length
    ) {
        const key = getNextApiKey(
            PROVIDER,
            FINNHUB_API_KEYS.filter(
                key =>
                    !attemptedKeys.has(key)
            )
        );

        if (!key) {
            return undefined;
        }

        attemptedKeys.add(key);

        const normalizedSymbol =
            symbol.trim().toUpperCase();

        const url =
            "https://finnhub.io/api/v1/quote" +
            `?symbol=${encodeURIComponent(normalizedSymbol)}` +
            `&token=${encodeURIComponent(key)}`;

        try {
            const data =
                await safeFetchJson<FinnhubQuoteResponse>(
                    url
                );

            recordApiKeyUse(
                PROVIDER,
                key
            );

            if (
                Number.isFinite(data.c) &&
                data.c > 0
            ) {
                return {
                    // symbol:
                    //     normalizedSymbol,
                    price: data.c,
                };
            }
        } catch (error) {
            recordApiKeyUse(
                PROVIDER,
                key
            );

            if (
                error instanceof ApiRequestError &&
                error.status === 429
            ) {
                temporarilyDisableApiKey(
                    PROVIDER,
                    key,
                    1000 * 60 * 15,
                );

                continue;
            }
        }
    }

    return undefined;
}