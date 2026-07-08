import type { Portfolio } from "../../portfolio/types";

type PortfolioSymbolsProps = {

  portfolio: Portfolio | undefined;

  onSelect: (
    symbol: string
  ) => void;

};

export function PortfolioSymbols({
  portfolio,
  onSelect,
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

          className="
            rounded
            bg-gray-100
            px-2
            py-1
            text-sm
            hover:bg-blue-100
          "

        >

          {symbol}

        </button>

      ))}

    </div>

  );

}