import { useState } from "react";

import { SplitView } from "./SplitView";

import { TradeSimulator } from "../../features/simulator/ui/TradeSimulator";
import { PortfolioManager } from "../../features/portfolio/ui/PortfolioManager";

import {
  loadUserPreferences,
  updateUserPreferences,
} from "../../shared/services/storage/userPreferencesService";
import type { WorkspacePanelLayout } from "../../shared/services/storage/userPreferences";

export function Workspace() {

  const [preferences, setPreferences] =
    useState(loadUserPreferences);

  function handlePanelLayoutChanged(
    panelLayout: WorkspacePanelLayout
  ) {

    const updatedPreferences = {

      ...preferences,

      layout: {

        ...preferences.layout,

        panelLayout,

      },

    };

    setPreferences(updatedPreferences);

    updateUserPreferences(updatedPreferences);

  }

  return (

    <main className="flex flex-1 min-h-0 overflow-hidden p-4">

      <SplitView

        primary={<TradeSimulator />}

        secondary={<PortfolioManager />}

        panelLayout={
          preferences.layout.panelLayout
        }

        onPanelLayoutChanged={
          handlePanelLayoutChanged
        }

      />

    </main>

  );

}