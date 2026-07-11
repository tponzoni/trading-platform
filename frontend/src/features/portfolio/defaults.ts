import { getStopLossPrice } from "./calculations/stopLoss";

export const DEFAULT_PORTFOLIOS = [
    {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Paper",

        currency: "NZD",
        riskPercent: 1,
        stopLossPercent: 15,
        selectedSymbol: "AAPL",

        symbols: ["AAPL", "NVDA"],

        deposits: [

            {

                timestampUtc: new Date().toISOString(),

                amount: 1000000,

                description: "Initial capital",

            },

        ],
    },
    {
        id: "ebca93dd-4fac-45b6-a31e-68768f6c33c5",
        name: "Tiger",

        currency: "NZD",
        riskPercent: 2,
        stopLossPercent: 20,
        selectedSymbol: "AAPL",

        symbols: ["AAPL", "FANG", "MARA", "NAVN", "FTRE", "VRDN"],

        deposits: [

            {

                timestampUtc: new Date().toISOString(),

                amount: 40000,

                description: "Initial capital",

            },

        ],
    }
];