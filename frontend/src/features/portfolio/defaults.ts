export const DEFAULT_PORTFOLIOS = [    
    {
        id: "ebca93dd-4fac-45b6-a31e-68768f6c33c5",
        name: "Portfolio",

        currency: "NZD",
        riskPercent: 2,
        stopLossPercent: 15,
        selectedSymbol: "AAPL",

        symbols: ["AAPL", "RKLB", "MA", "SPCX", "FSLR", "BKSY", "SATL", "FLY", "FANG", "MARA", "NVDA"],
        tradeNotes: [],
        deposits: [

            {

                timestampUtc: new Date().toISOString(),

                amount: 40000,

                description: "Initial capital",

            },

        ],
    },
    // {
    //     id: "11111111-1111-1111-1111-111111111111",
    //     name: "Paper",

    //     currency: "NZD",
    //     riskPercent: 1,
    //     stopLossPercent: 15,
    //     selectedSymbol: "AAPL",

    //     symbols: ["AAPL", "NVDA"],
    //     tradeNotes: [],
    //     deposits: [

    //         {

    //             timestampUtc: new Date().toISOString(),

    //             amount: 1000000,

    //             description: "Initial capital",

    //         },

    //     ],
    // },
];