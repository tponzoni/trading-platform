import {
  Group,
  Panel,
  Separator
} from "react-resizable-panels";

import type {

  WorkspacePanelLayout,

} from "../../shared/services/storage/userPreferences";

type SplitViewProps = {

  primary: React.ReactNode;

  secondary: React.ReactNode;

  panelLayout: WorkspacePanelLayout;

  onPanelLayoutChanged: (

    layout: WorkspacePanelLayout

  ) => void;

};

export function SplitView({
  primary,
  secondary,
  panelLayout,
  onPanelLayoutChanged,
}: SplitViewProps) {

  return (

    <Group
      id="workspace"
      orientation="horizontal"
      className="h-full w-full"
      defaultLayout={{
        simulator: panelLayout.simulator,
        portfolio: panelLayout.portfolio,
      }}
      onLayoutChanged={(layout) =>
        onPanelLayoutChanged({
          simulator: layout.simulator,
          portfolio: layout.portfolio,
        })
      }
    >

      <Panel
        id="simulator"
        minSize={20}
      >
        <div className="flex h-full w-full min-h-0">
          {primary}
        </div>
      </Panel>

      <Separator className="w-2 cursor-col-resize bg-gray-300 hover:bg-blue-500" />

      <Panel
        id="portfolio"
        minSize={20}
      >
        <div className="flex h-full w-full min-h-0">
          {secondary}
        </div>
      </Panel>

    </Group>

  );

}