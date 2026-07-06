import {
    TIMEFRAMES,
    type Timeframe,
} from "../types";

type TimeframeSelectorProps = {
    selected: Timeframe;
    onSelect: (
        timeframe: Timeframe
    ) => void;
};

export function TimeframeSelector({
    selected,
    onSelect,
}: TimeframeSelectorProps) {
    return (
        <div className="flex items-center gap-1">
            {TIMEFRAMES.map((timeframe) => (
                <button
                    key={timeframe}
                    type="button"
                    onClick={() => onSelect(timeframe)}
                    className={
                        selected === timeframe
                            ? "rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white"
                            : "rounded px-2 py-1 text-xs hover:bg-gray-100"
                    }
                >
                    {timeframe}
                </button>
            ))}
        </div>
    );
}