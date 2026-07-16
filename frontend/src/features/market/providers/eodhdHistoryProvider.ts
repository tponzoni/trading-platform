import type {
    HistoricalPrice,
} from "../types";

import {
    EODHD_API_TOKENS,
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

interface EodhdHistoryItem {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    adjusted_close?: number;
    volume: number;
}

const PROVIDER =
    "eodhd";

function normalizeEodhdSymbol(
    symbol: string,
): string {
    const normalizedSymbol =
        symbol.trim().toUpperCase();

    if (
        normalizedSymbol.endsWith(".US") ||
        normalizedSymbol.endsWith(".AU")
    ) {
        return normalizedSymbol;
    }

    return `${normalizedSymbol}.US`;
}

export async function fetchEodhdHistory(
    symbol: string,
    fromDate: string,
    toDate: string,
): Promise<HistoricalPrice[]> {
    const attemptedTokens =
        new Set<string>();

    while (
        attemptedTokens.size <
        EODHD_API_TOKENS.length
    ) {
        const availableTokens =
            EODHD_API_TOKENS.filter(
                token =>
                    !attemptedTokens.has(
                        token
                    )
            );

        const token =
            getNextApiKey(
                PROVIDER,
                availableTokens,
            );

        if (!token) {
            return [];
        }

        attemptedTokens.add(token);

        const eodhdSymbol =
            normalizeEodhdSymbol(
                symbol
            );

        const url =
            "/api/eodhd/api/eod/" +
            `${encodeURIComponent(eodhdSymbol)}` +
            `?api_token=${encodeURIComponent(token)}` +
            "&period=d" +
            `&from=${encodeURIComponent(fromDate)}` +
            `&to=${encodeURIComponent(toDate)}` +
            "&fmt=json" +
            "&order=a";
console.log('here');
        try {
            const response =
                await safeFetchJson<
                    EodhdHistoryItem[]
                >(url);

            recordApiKeyUse(
                PROVIDER,
                token,
            );

            if (!Array.isArray(response)) {
                continue;
            }

            return response
                .filter(item =>
                    typeof item.date === "string" &&
                    Number.isFinite(item.open) &&
                    Number.isFinite(item.high) &&
                    Number.isFinite(item.low) &&
                    Number.isFinite(item.close) &&
                    Number.isFinite(item.volume)
                )
                .map(item => ({
                    time: item.date,
                    open: item.open,
                    high: item.high,
                    low: item.low,
                    close: item.close,
                    volume: item.volume,
                }));
        } catch (error) {
            recordApiKeyUse(
                PROVIDER,
                token,
            );

            if (
                error instanceof ApiRequestError &&
                [402, 403, 429].includes(
                    error.status
                )
            ) {
                temporarilyDisableApiKey(
                    PROVIDER,
                    token,
                    1000 * 60 * 60,
                );

                continue;
            }

            if (
                error instanceof ApiRequestError &&
                error.status === 404
            ) {
                return [];
            }
        }
    }

    return [];
}