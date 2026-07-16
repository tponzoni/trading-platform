import type {
    CachedHistoricalPrice,
    MarketSeed,
} from "../types";

interface StoredMarketData {
    history?: CachedHistoricalPrice[];
}

type StoredMarketCache = Record<
    string,
    StoredMarketData
>;

const STORAGE_KEY =
    "marketCache";

const EXPORT_FILE_NAME =
    "historical-price-seed.json";

function loadStoredMarketCache(): StoredMarketCache {
    const value =
        localStorage.getItem(
            STORAGE_KEY,
        );

    if (!value) {
        return {};
    }

    try {
        return JSON.parse(
            value,
        ) as StoredMarketCache;
    } catch {
        return {};
    }
}

function createHistoricalPriceSeed(
    cache: StoredMarketCache,
): MarketSeed {
    const seed: MarketSeed = {};

    for (
        const [
            symbol,
            marketData,
        ] of Object.entries(cache)
    ) {
        const history =
            marketData.history;

        if (
            !Array.isArray(history) ||
            history.length === 0
        ) {
            continue;
        }

        seed[symbol] = history;
    }

    return seed;
}

function downloadJson(
    filename: string,
    value: unknown,
): void {
    const json =
        JSON.stringify(
            value,
            null,
            4,
        );

    const blob =
        new Blob(
            [json],
            {
                type: "application/json",
            },
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}

export function exportMarketCache(): void {
    const cache =
        loadStoredMarketCache();

    const seed =
        createHistoricalPriceSeed(
            cache,
        );

    downloadJson(
        EXPORT_FILE_NAME,
        seed,
    );
}