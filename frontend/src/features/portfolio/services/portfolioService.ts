import { DEFAULT_PORTFOLIOS }
  from "../defaults";

import {
  loadWorkspace,
  updateWorkspace,
} from "../../../shared/services/storage/workspaceService";

import type {
  Portfolio,
} from "../types";

export function getPortfolios(): Portfolio[] {

  const workspace =
    loadWorkspace();

  if (workspace.portfolios.length === 0) {

    workspace.portfolios = DEFAULT_PORTFOLIOS;

    updateWorkspace(workspace);

  }

  return workspace.portfolios;
}

export function createPortfolio(
  name: string
): Portfolio {

  const workspace = loadWorkspace();

  const portfolio: Portfolio = {
    id: crypto.randomUUID(),
    name,
    symbols: [],
  };

  workspace.portfolios.push(portfolio);

  workspace.selectedPortfolioId = portfolio.id;

  updateWorkspace(workspace);

  return portfolio;
}