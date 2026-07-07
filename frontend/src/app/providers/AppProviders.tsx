import { WorkspaceProvider } from "./WorkspaceProvider";

export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceProvider>
      {children}
    </WorkspaceProvider>
  );
}