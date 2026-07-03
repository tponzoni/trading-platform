import { useEffect, useRef } from "react";

type SymbolSearchProps = {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function SymbolSearch({
  value,
  isLoading,
  onChange,
  onSubmit,
}: SymbolSearchProps) {

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      onSubmit();
    }
  }

  return (
    <div className="flex gap-2">

      <input
        ref={inputRef}
        autoFocus
        type="text"
        value={value}
        placeholder="Stock symbol (e.g. AAPL)"
        disabled={isLoading}
        className="w-28 rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(event) =>
          onChange(event.target.value.toUpperCase())
        }
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        onClick={() => onSubmit()}
        disabled={isLoading}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        Search
      </button>

    </div>
  );
}