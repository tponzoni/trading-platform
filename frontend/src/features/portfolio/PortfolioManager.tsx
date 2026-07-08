import { Panel } from "../../shared/components/Panel/Panel";

import {
  useWorkspace,
} from "../../app/providers/WorkspaceProvider";

export function PortfolioManager() {

  const {
    workspace,
    setWorkspace,
  } = useWorkspace();

  function handlePortfolioSelected(
    portfolioId: string
  ) {

    setWorkspace(current => ({

      ...current,

      portfolioId,

    }));

  }

  function handleNewPortfolio() {

    const name =
      window.prompt("Portfolio name");

    if (!name) {
      return;
    }

    const trimmedName =
      name.trim();

    if (
      workspace.portfolios.some(
        portfolio =>
          portfolio.name.toLowerCase() ===
          trimmedName.toLowerCase()
      )
    ) {

      alert(
        "Portfolio already exists."
      );

      return;

    }

    const portfolio = {
      id: crypto.randomUUID(),
      name: trimmedName,
      symbols: [],
    };

    setWorkspace(current => ({

      ...current,

      portfolioId: portfolio.id,

      portfolios: [

        ...current.portfolios,

        portfolio,

      ],

    }));

  }

  return (

    <Panel title="">

      <div className="flex flex-col gap-4">

        <div className="flex flex-wrap gap-2">

          {workspace.portfolios.map(portfolio => (

            <button

              key={portfolio.id}

              onClick={() =>
                handlePortfolioSelected(
                  portfolio.id
                )
              }

              className={
                portfolio.id === workspace.portfolioId

                  ? "rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-white"

                  : "rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-blue-100"
              }

            >

              {portfolio.name}

            </button>

          ))}

          <button

            onClick={handleNewPortfolio}

            className="rounded-md border border-blue-500 bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"

          >

            +

          </button>

        </div>

      </div>

    </Panel>

  );

}