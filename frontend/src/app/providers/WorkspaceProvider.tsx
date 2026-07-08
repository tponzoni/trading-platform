import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type {
    Workspace,
} from "../../features/workspace/types";

import {
    loadWorkspace,
    saveWorkspace,
} from "../../shared/services/storage/workspaceService";

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
        useState<Workspace>(loadWorkspace);

    //
    // Persist automatically whenever
    // the Workspace changes.
    //
    useEffect(() => {

        saveWorkspace(workspace);

    }, [workspace]);

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