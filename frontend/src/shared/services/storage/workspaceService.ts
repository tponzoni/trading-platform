import type { Workspace }
  from "../../../features/workspace/types";

import {
  DEFAULT_WORKSPACE,
} from "../../../features/workspace/defaults";

const STORAGE_KEY = "workspace";

export function loadWorkspace(): Workspace {

  const json =
    localStorage.getItem(STORAGE_KEY);

  if (!json) {

    return DEFAULT_WORKSPACE;

  }

  return JSON.parse(json) as Workspace;

}

export function saveWorkspace(
  workspace: Workspace
): void {

  localStorage.setItem(

    STORAGE_KEY,

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