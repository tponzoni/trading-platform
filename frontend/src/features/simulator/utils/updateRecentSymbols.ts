export function updateRecentSymbols(
  current: string[],
  symbol: string,
  maxItems = 10
): string[] {

  const normalized = symbol.toUpperCase();

  const filtered = current.filter(
    (item) => item !== normalized
  );

  return [
    normalized,
    ...filtered,
  ].slice(0, maxItems);

}