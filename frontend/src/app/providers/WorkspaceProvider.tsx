import {
    createContext,
    useContext,
    useState,
} from "react";

import type {
    Workspace,
} from "../../features/workspace/types";
import { loadWorkspace } from "../../shared/services/storage/workspaceService";

type WorkspaceContextValue = {
    workspace: Workspace;
    setWorkspace: React.Dispatch<
        React.SetStateAction<Workspace>
    >;
};

const WorkspaceContext =
    createContext<
        WorkspaceContextValue | undefined
    >(undefined);

type WorkspaceProviderProps = {
    children: React.ReactNode;
};

export function WorkspaceProvider({
    children,
}: WorkspaceProviderProps) {

    const [workspace, setWorkspace] =
        useState(loadWorkspace);

    return (
        <WorkspaceContext.Provider
            value={{
                workspace,
                setWorkspace,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
}

export function useWorkspace() {

    const context =
        useContext(WorkspaceContext);

    if (!context) {
        throw new Error(
            "useWorkspace must be used inside WorkspaceProvider."
        );
    }

    return context;
}