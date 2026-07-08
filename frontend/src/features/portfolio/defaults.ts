export const DEFAULT_PORTFOLIOS = [
    {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Tiger",

        currency: "NZD",
        riskPercent: 2,
        selectedSymbol: "AAPL",

        symbols: ["AAPL", "NVDA", "RKLB"],

        deposits: [

            {

                timestampUtc: new Date().toISOString(),

                amount: 29000,

                description: "Initial capital",

            },

        ],
    },
];