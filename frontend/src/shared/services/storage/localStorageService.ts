const RECENT_SYMBOLS_KEY = "recentSymbols";

export function loadRecentSymbols(): string[] {

  const value = localStorage.getItem(
    RECENT_SYMBOLS_KEY
  );

  if (!value) {
    return [];
  }

  try {
    return JSON.parse(value);

  } catch {

    return [];

  }

}

export function saveRecentSymbols(
  symbols: string[]
): void {

  localStorage.setItem(
    RECENT_SYMBOLS_KEY,
    JSON.stringify(symbols)
  );

}