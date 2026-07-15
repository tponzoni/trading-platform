import {
    useWorkspace,
} from "../../../app/providers/WorkspaceProvider";

export function ResearchNotes() {
    const {
        workspace,
        setWorkspace,
    } = useWorkspace();

    const portfolio = workspace.portfolios?.find(
        portfolio =>
            portfolio.id === workspace.portfolioId
    );

    const symbol = portfolio?.selectedSymbol ?? "";

    const symbolNote = workspace.symbolNotes?.find(
        note =>
            note.symbol === symbol
    );

    const tradeNote = portfolio?.tradeNotes?.find(
        note =>
            note.symbol === symbol
    );

    function handleResearchNotesChanged(
        notes: string,
    ) {
        if (!symbol) {
            return;
        }

        setWorkspace(current => {
            const exists = current.symbolNotes.some(
                note =>
                    note.symbol === symbol
            );

            return {
                ...current,
                symbolNotes: exists
                    ? current.symbolNotes.map(note =>
                        note.symbol === symbol
                            ? {
                                ...note,
                                notes,
                            }
                            : note
                    )
                    : [
                        ...current.symbolNotes,
                        {
                            symbol,
                            notes,
                        },
                    ],
            };
        });
    }

    function handleTradeNotesChanged(
        notes: string,
    ) {
        if (!portfolio || !symbol) {
            return;
        }

        setWorkspace(current => ({
            ...current,
            portfolios: current.portfolios.map(
                currentPortfolio => {
                    if (
                        currentPortfolio.id !==
                        current.portfolioId
                    ) {
                        return currentPortfolio;
                    }

                    const exists =
                        currentPortfolio.tradeNotes.some(
                            note =>
                                note.symbol === symbol
                        );

                    return {
                        ...currentPortfolio,
                        tradeNotes: exists
                            ? currentPortfolio.tradeNotes.map(
                                note =>
                                    note.symbol === symbol
                                        ? {
                                            ...note,
                                            notes,
                                        }
                                        : note
                            )
                            : [
                                ...currentPortfolio.tradeNotes,
                                {
                                    symbol,
                                    notes,
                                },
                            ],
                    };
                }
            ),
        }));
    }

    if (!portfolio || !symbol) {
        return (
            <div className="rounded-md border border-gray-200 p-4 text-sm text-gray-500">
                Select a symbol to capture notes.
            </div>
        );
    }

    return (
        <section className="flex flex-col gap-4 rounded-md border border-gray-200 bg-white p-1">
            <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">
                    Trade Plan
                </span>

                <textarea
                    id="tradeNote"
                    value={tradeNote?.notes ?? ""}
                    placeholder="Capture the setup, entry rationale, stop-loss logic, pyramiding plan and exit conditions for this portfolio."
                    rows={6}
                    className="resize-y rounded-md border border-gray-300 p-2 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={event =>
                        handleTradeNotesChanged(
                            event.target.value
                        )
                    }
                />
            </label>
            <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">
                    Research Notes
                </span>

                <textarea
                    id="symbolNote"
                    value={symbolNote?.notes ?? ""}
                    placeholder="Capture company, stock, sector, valuation and long-term observations."
                    rows={5}
                    className="resize-y rounded-md border border-gray-300 p-2 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={event =>
                        handleResearchNotesChanged(
                            event.target.value
                        )
                    }
                />
            </label>
        </section>
    );
}