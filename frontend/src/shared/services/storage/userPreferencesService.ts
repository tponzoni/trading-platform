import type { UserPreferences } from "./userPreferences";

const STORAGE_KEY = "userPreferences";

const EMPTY_USER_PREFERENCES: UserPreferences = {
  selectedTimeframe: "1Y",
  layout: {
    panelSizes: [50, 50],
    leftSidebarWidth: 0,
    rightSidebarWidth: 0,
    portfolioHeight: 0
  },
};

export function loadUserPreferences(): UserPreferences {
  const value = localStorage.getItem(
    STORAGE_KEY
  );

  if (!value) {
    return EMPTY_USER_PREFERENCES;
  }

  try {
    return {
      ...EMPTY_USER_PREFERENCES,
      ...JSON.parse(value),
    };
  } catch {
    return EMPTY_USER_PREFERENCES;
  }
}

export function saveUserPreferences(
  preferences: UserPreferences
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(preferences)
  );
}

export function updateUserPreferences(
  updates: Partial<UserPreferences>
): void {

  const preferences = loadUserPreferences();

  saveUserPreferences({
    ...preferences,
    ...updates,
  });
}