import type { Workspace } from "./workspace";

const WORKSPACE_KEY = "workspace";

const EMPTY_WORKSPACE: Workspace = {
  recentSymbols: [],
  selectedTimeframe: "6M",
  layout: {
    panelSizes: [50, 50],
    leftSidebarWidth: 0,
    rightSidebarWidth: 0,
    portfolioHeight: 0
  }
};

export function loadWorkspace(): Workspace {
  const value = localStorage.getItem(
    WORKSPACE_KEY
  );

  if (!value) {
    return EMPTY_WORKSPACE;
  }

  try {
    return {
      ...EMPTY_WORKSPACE,
      ...JSON.parse(value),
    };
  } catch {
    return EMPTY_WORKSPACE;
  }
}

export function saveWorkspace(
  workspace: Workspace
): void {
  localStorage.setItem(
    WORKSPACE_KEY,
    JSON.stringify(workspace)
  );
}

export function updateWorkspace(
  updates: Partial<Workspace>
): void {

  const workspace = loadWorkspace();

  saveWorkspace({
    ...workspace,
    ...updates,
  });
}