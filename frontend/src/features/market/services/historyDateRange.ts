import type {
    Timeframe,
} from "../../simulator/types";

export interface HistoryDateRange {
    fromDate: string;
    toDate: string;
}

function formatDate(
    date: Date,
): string {
    return date
        .toISOString()
        .slice(0, 10);
}

export function getHistoryDateRange(
    timeframe: Timeframe,
): HistoryDateRange {
    const to = new Date();
    const from = new Date(to);

    switch (timeframe) {
        case "1D":
            from.setDate(from.getDate() - 10);
            break;

        case "5D":
            from.setDate(from.getDate() - 15);
            break;

        case "1M":
            from.setMonth(from.getMonth() - 1);
            break;

        case "3M":
            from.setMonth(from.getMonth() - 3);
            break;

        case "6M":
            from.setMonth(from.getMonth() - 6);
            break;

        case "1Y":
            from.setFullYear(from.getFullYear() - 1);
            break;

        case "5Y":
            from.setFullYear(from.getFullYear() - 5);
            break;

        case "MAX":
            from.setFullYear(from.getFullYear() - 30);
            break;
    }

    return {
        fromDate: formatDate(from),
        toDate: formatDate(to),
    };
}