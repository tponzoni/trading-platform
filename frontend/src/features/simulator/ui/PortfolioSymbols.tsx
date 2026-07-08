import type { Portfolio } from "../../portfolio/types";

type PortfolioSymbolsProps = {

  portfolio: Portfolio | undefined;

  onSelect: (
    symbol: string
  ) => void;

  onDelete: (

    symbol: string

  ) => void;

};

export function PortfolioSymbols({
  portfolio,
  onSelect,
  onDelete,
}: PortfolioSymbolsProps) {

  if (!portfolio) {
    return null;
  }

  return (

    <div className="flex flex-wrap gap-2">

      {portfolio.symbols.map((symbol) => (

        <button

          key={symbol}

          onClick={() =>
            onSelect(symbol)
          }

          // onDoubleClick={() =>
          //   onDelete(symbol)
          // }

          className={
            portfolio.selectedSymbol === symbol
              ? "rounded bg-blue-600 px-2 py-1 text-sm text-white"
              : `
                rounded
                bg-gray-100
                px-2
                py-1
                text-sm
                hover:bg-blue-100
              `
          }
        >

          {symbol}

        </button>

      ))}

    </div>

  );

}