import {
  useEffect,
  useRef,
} from "react";

type SymbolSearchProps = {
  value: string;
  isLoading: boolean;
  onChange: (
    value: string
  ) => void;
  onSubmit: () => Promise<void>;
};

export function SymbolSearch({
  value,
  isLoading,
  onChange,
  onSubmit,
}: SymbolSearchProps) {

  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  function focusAndSelect(): void {

    requestAnimationFrame(() => {

      const input =
        inputRef.current;

      if (!input) {
        return;
      }

      input.focus();

      input.select();

    });

  }

  useEffect(() => {

    if (isLoading) {
      return;
    }

    focusAndSelect();

  }, [
    isLoading,
  ]);

  async function handleKeyDown(
    event:
      React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> {

    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    if (
      isLoading ||
      !value.trim()
    ) {
      return;
    }

    await onSubmit();

    focusAndSelect();

  }

  return (

    <div className="flex gap-2">

      <input
        id="symbol"
        ref={inputRef}
        autoFocus
        type="text"
        value={value}
        placeholder="Stock symbol (e.g. AAPL)"
        readOnly={isLoading}
        aria-busy={isLoading}
        className="w-16 rounded-sm border px-1 py-2 outline-none focus:ring-2 focus:ring-blue-500 read-only:cursor-wait read-only:opacity-70"
        onChange={(event) =>
          onChange(
            event.target.value.toUpperCase()
          )
        }
        onKeyDown={(event) => {
          void handleKeyDown(event);
        }}
      />

      {/* <button
        type="button"
        disabled={isLoading}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        onClick={async () => {

          if (isLoading) {
            return;
          }

          await onSubmit();

          focusAndSelect();

        }}
      >
        Search
      </button> */}

    </div>

  );

}