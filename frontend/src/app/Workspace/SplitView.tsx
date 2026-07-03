import {
  Group,
  Panel,
  Separator,
} from "react-resizable-panels";

type SplitViewProps = {
  primary: React.ReactNode;
  secondary: React.ReactNode;
};

export function SplitView({
  primary,
  secondary,
}: SplitViewProps) {
  return (
    <Group
      orientation="horizontal"
      className="h-full w-full"
    >
      <Panel
        defaultSize={50}
        minSize={20}
      >
        <div className="flex h-full w-full min-h-0">
          {primary}
        </div>
      </Panel>

      <Separator className="w-2 cursor-col-resize bg-gray-300 hover:bg-blue-500" />

      <Panel
        defaultSize={50}
        minSize={20}
      >
        <div className="flex h-full w-full min-h-0">
          {secondary}
        </div>
      </Panel>
    </Group>
  );
}