import type { Workspace } from "./types";

import {
  DEFAULT_PORTFOLIOS,
} from "../portfolio/defaults";

export const DEFAULT_WORKSPACE: Workspace = {
  portfolioId: DEFAULT_PORTFOLIOS[0].id,
  portfolios: DEFAULT_PORTFOLIOS,
  quote: undefined
};