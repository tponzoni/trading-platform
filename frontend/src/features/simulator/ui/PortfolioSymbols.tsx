import type {
  Portfolio,
} from "../../portfolio/types";

type PortfolioSymbolsProps = {

  portfolio: Portfolio | undefined;

  symbolsAt52WeekHigh:
    ReadonlySet<string>;

  onSelect: (
    symbol: string
  ) => void;

  onDelete: (
    symbol: string
  ) => void;

};

export function PortfolioSymbols({
  portfolio,
  symbolsAt52WeekHigh,
  onSelect,
  onDelete,
}: PortfolioSymbolsProps) {

  if (!portfolio) {
    return null;
  }

  const symbols =
    [...portfolio.symbols]
      .sort((left, right) =>
        left.localeCompare(
          right,
          undefined,
          {
            sensitivity: "base",
          },
        )
      );

  return (

    <div className="flex flex-wrap gap-2">

      {symbols.map((symbol) => {

        const normalizedSymbol =
          symbol
            .trim()
            .toUpperCase();

        const isSelected =
          portfolio.selectedSymbol ===
          symbol;

        const isNear52WeekHigh =
          symbolsAt52WeekHigh.has(
            normalizedSymbol
          );

        const highClassName =
          isNear52WeekHigh
            ? `
              border-emerald-300
              shadow-sm
              shadow-emerald-100
            `
            : `
              border-transparent
            `;

        const selectionClassName =
          isSelected
            ? `
              bg-blue-600
              text-white
            `
            : `
              bg-gray-100
              text-gray-900
              hover:bg-blue-100
            `;

        return (

          <button

            key={symbol}

            type="button"

            title={
              isNear52WeekHigh
                ? `${symbol} is within 5% of its highest 52-week close`
                : symbol
            }

            onClick={() =>
              onSelect(symbol)
            }

            // onDoubleClick={() =>
            //   onDelete(symbol)
            // }

            className={`
              rounded
              border-2
              px-2
              py-1
              text-sm
              transition-colors
              ${selectionClassName}
              ${highClassName}
            `}
          >

            {symbol}

          </button>

        );

      })}

    </div>

  );

}