interface ApiKeyUsage {
  count: number;
  lastUsedAt?: string;
  unavailableUntil?: string;
}

type ApiKeyUsageMap = Record<string, ApiKeyUsage>;

type ApiUsage = Record<string, ApiKeyUsageMap>;

const STORAGE_KEY = "apiUsage";

function loadApiUsage(): ApiUsage {
  const value = localStorage.getItem(STORAGE_KEY);

  if (!value) {
    return {};
  }

  try {
    return JSON.parse(value) as ApiUsage;
  } catch {
    return {};
  }
}

function saveApiUsage(apiUsage: ApiUsage): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(apiUsage),
  );
}

function loadUsage(provider: string): ApiKeyUsageMap {
  const apiUsage = loadApiUsage();

  return apiUsage[provider] ?? {};
}

function saveUsage(
  provider: string,
  usage: ApiKeyUsageMap,
): void {
  const apiUsage = loadApiUsage();

  saveApiUsage({
    ...apiUsage,
    [provider]: usage,
  });
}

function isAvailable(
  usage: ApiKeyUsage | undefined,
): boolean {
  if (!usage?.unavailableUntil) {
    return true;
  }

  return (
    new Date(usage.unavailableUntil).getTime() <=
    Date.now()
  );
}

export function getNextApiKey(
  provider: string,
  keys: string[],
): string | undefined {
  const usage = loadUsage(provider);

  return keys
    .filter(key => isAvailable(usage[key]))
    .map(key => ({
      key,
      count: usage[key]?.count ?? 0,
    }))
    .sort(
      (left, right) =>
        left.count - right.count,
    )[0]?.key;
}

export function recordApiKeyUse(
  provider: string,
  key: string,
): void {
  const usage = loadUsage(provider);

  usage[key] = {
    ...usage[key],
    count: (usage[key]?.count ?? 0) + 1,
    lastUsedAt: new Date().toISOString(),
  };

  saveUsage(provider, usage);
}

export function temporarilyDisableApiKey(
  provider: string,
  key: string,
  durationMilliseconds: number,
): void {
  const usage = loadUsage(provider);

  usage[key] = {
    ...usage[key],
    count: usage[key]?.count ?? 0,
    unavailableUntil: new Date(
      Date.now() + durationMilliseconds,
    ).toISOString(),
  };

  saveUsage(provider, usage);
}