export class ApiRequestError extends Error {
    status: number;

    constructor(
        status: number,
        message: string,
    ) {
        super(message);
        this.status = status;
    }
}

function wait(
    milliseconds: number,
): Promise<void> {
    return new Promise(resolve =>
        setTimeout(resolve, milliseconds)
    );
}

export async function safeFetchJson<T>(
    url: string,
    retries = 2,
    delayMilliseconds = 1000,
): Promise<T> {
    try {
        const response =
            await fetch(url);

        if (
            response.status === 429 &&
            retries > 0
        ) {
            await wait(
                delayMilliseconds
            );

            return safeFetchJson<T>(
                url,
                retries - 1,
                delayMilliseconds * 2,
            );
        }

        if (!response.ok) {
            throw new ApiRequestError(
                response.status,
                `Request failed: ${response.status}.`
            );
        }

        return await response.json() as T;
    } catch (error) {
        if (
            error instanceof
            ApiRequestError
        ) {
            throw error;
        }

        throw new ApiRequestError(
            0,
            error instanceof Error
                ? error.message
                : "Network request failed."
        );
    }
}