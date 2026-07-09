import type { StockQuote } from "../types";

type CurrentPriceProps = {
  quote: StockQuote | undefined;
};

export function CurrentPrice({
  quote,
}: CurrentPriceProps) {
  if (!quote) {
    return (
      <div className="">
      </div>
    );
  }

  return (
    <div className="rounded">
      {/* <div className="text-2xl font-bold">
        {quote.symbol}
      </div> */}

      <div className="mt-2 text-2xl">
        ${quote.price.toFixed(2)}
      </div>

      {/* <div className="mt-2 text-sm text-gray-500">
        NASDAQ • USD
      </div> */}
    </div>
  );
}