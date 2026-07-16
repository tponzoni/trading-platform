const STORAGE_KEY = "marketCache";

export function exportMarketCache(): void {
    const value = localStorage.getItem(STORAGE_KEY);

    if (!value) {
        throw new Error(
            "No market cache was found in localStorage."
        );
    }

    let cache: unknown;

    try {
        cache = JSON.parse(value);
    } catch {
        throw new Error(
            "The market cache contains invalid JSON."
        );
    }

    const json = JSON.stringify(
        cache,
        null,
        2,
    );

    const blob = new Blob(
        [json],
        {
            type: "application/json",
        },
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "marketSeed.json";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
}