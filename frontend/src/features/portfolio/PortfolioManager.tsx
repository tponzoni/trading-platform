import { useState } from "react";

import { Panel } from "../../shared/components/Panel/Panel";

import { createPortfolio, getPortfolios } from "./services/portfolioService";

export function PortfolioManager() {

  const [portfolios, setPortfolios] =
    useState(getPortfolios);

  function handleNewPortfolio() {

    const name = window.prompt(
      "Portfolio name"
    );

    if (!name) {
      return;
    }

    if (
      portfolios.some(
        (portfolio) =>
          portfolio.name.toLowerCase() ===
          name.toLowerCase()
      )
    ) {

      alert(
        "Portfolio already exists."
      );

      return;
    }

    const portfolio =
      createPortfolio(
        name.trim()
      );

    setPortfolios((current) => [
      ...current,
      portfolio,
    ]);
  }

  return (
    <Panel title="">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">

          {portfolios.map((portfolio) => (

            <button
              key={portfolio.id}
              className="
                rounded-md
                border
                border-gray-300
                bg-gray-100
                px-4
                py-2
                hover:bg-blue-100
              "
            >
              {portfolio.name}
            </button>

          ))}

          <button onClick={handleNewPortfolio}
            className="rounded-md border border-blue-500 bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >+</button>
        </div>
      </div>
    </Panel>
  );
}