import type {
  Portfolio,
} from "../types";

import {
  loadWorkspace,
} from "../../../shared/services/storage/workspaceService";

export function getPortfolios(): Portfolio[] {

  return loadWorkspace().portfolios;

}

export function getCurrentPortfolio(): Portfolio | undefined {

  const workspace =
    loadWorkspace();

  return workspace.portfolios.find(
    (portfolio) =>
      portfolio.id === workspace.portfolioId
  );

}