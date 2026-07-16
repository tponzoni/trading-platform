function formatDate(
    date: Date,
): string {
    return date
        .toISOString()
        .slice(0, 10);
}

function parseDate(
    date: string,
): Date {
    return new Date(
        `${date}T00:00:00Z`
    );
}

function getPreviousWeekday(
    date: Date,
): Date {
    const result =
        new Date(date);

    do {
        result.setUTCDate(
            result.getUTCDate() - 1
        );
    } while (
        result.getUTCDay() === 0 ||
        result.getUTCDay() === 6
    );

    return result;
}

export function getNextDate(
    date: string,
): string {
    const nextDate =
        parseDate(date);

    nextDate.setUTCDate(
        nextDate.getUTCDate() + 1
    );

    return formatDate(nextDate);
}

export function getDateDaysBefore(
    date: string,
    days: number,
): string {
    const previousDate =
        parseDate(date);

    previousDate.setUTCDate(
        previousDate.getUTCDate() -
        days
    );

    return formatDate(previousDate);
}

export function getLatestClosedTradingDate(
    now = new Date(),
): string {
    const formatter =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "America/New_York",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h23",
            }
        );

    const parts =
        formatter.formatToParts(now);

    const getPart = (
        type: Intl.DateTimeFormatPartTypes,
    ): string =>
        parts.find(
            part =>
                part.type === type
        )?.value ?? "";

    const year =
        Number(getPart("year"));

    const month =
        Number(getPart("month"));

    const day =
        Number(getPart("day"));

    const hour =
        Number(getPart("hour"));

    const minute =
        Number(getPart("minute"));

    const weekday =
        getPart("weekday");

    const marketDate =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day,
            )
        );

    if (
        weekday === "Sat" ||
        weekday === "Sun"
    ) {
        return formatDate(
            getPreviousWeekday(
                marketDate
            )
        );
    }

    const minutesSinceMidnight =
        hour * 60 + minute;

    const marketDataAvailableAfter =
        16 * 60 + 15;

    if (
        minutesSinceMidnight <
        marketDataAvailableAfter
    ) {
        return formatDate(
            getPreviousWeekday(
                marketDate
            )
        );
    }

    return formatDate(marketDate);
}