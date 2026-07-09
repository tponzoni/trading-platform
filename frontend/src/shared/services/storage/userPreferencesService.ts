import type { UserPreferences } from "./userPreferences";

const STORAGE_KEY = "userPreferences";

const EMPTY_USER_PREFERENCES: UserPreferences = {
  timeframe: "1Y",
  layout: {
    panelLayout: {
      simulator: 80,
      portfolio: 20
    }
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

  const stored =
    JSON.parse(value) as Partial<UserPreferences>;

  return {

    ...EMPTY_USER_PREFERENCES,

    ...stored,

    layout: {

      ...EMPTY_USER_PREFERENCES.layout,

      ...stored.layout,

      panelLayout: {

        ...EMPTY_USER_PREFERENCES.layout.panelLayout,

        ...stored.layout?.panelLayout,

      },

    },

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