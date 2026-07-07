type PortfolioSymbolsProps = {
  symbols: string[];
  onSelect: (symbol: string) => void;
};

export function PortfolioSymbols({
  symbols,
  onSelect,
}: PortfolioSymbolsProps) {

  if (symbols.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">

      {symbols.map((symbol) => (

        <button
          key={symbol}
          type="button"
          onClick={() => onSelect(symbol)}
          className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-sm hover:bg-gray-100"
        >
          {symbol}
        </button>

      ))}

    </div>
  );
}