import { getStopLossPrice } from "./calculations/stopLoss";

export const DEFAULT_PORTFOLIOS = [
    {
        id: "11111111-1111-1111-1111-111111111111",
        name: "All",

        currency: "NZD",
        riskPercent: 2,
        stopLossPercent: 15,
        selectedSymbol: "AAPL",

        symbols: ["AAPL", "NVDA"],

        deposits: [

            {

                timestampUtc: new Date().toISOString(),

                amount: 42000,

                description: "Initial capital",

            },

        ],
    },
];