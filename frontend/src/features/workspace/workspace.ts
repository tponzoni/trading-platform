import type { Portfolio } from "../portfolio/types";
import type {
  Workspace,
} from "./types";

export function getSelectedPortfolio(
  workspace: Workspace
): Portfolio {

  const portfolio =
    workspace.portfolios.find(
      (portfolio) =>
        portfolio.id === workspace.portfolioId
    );

  if (!portfolio) {
    throw new Error(
      "Selected portfolio not found."
    );
  }

  return portfolio;
}