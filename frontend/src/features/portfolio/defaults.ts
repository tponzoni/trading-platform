export const DEFAULT_PORTFOLIOS = [
    {
        id: "ebca93dd-4fac-45b6-a31e-68768f6c33c5",
        name: "Portfolio",

        currency: "USD",
        riskPercent: 2,
        stopLossPercent: 15,
        selectedSymbol: "AAPL",

        symbols: [
            "JNJ",
            "CLOV",
            "CLNE",
            "CERS",
            "XYZ",
            "AKBA",
            "AFRM",
            "ABEO",
            "RUN",
            "AMD",
            "GE",
            "BA",
            "RIVN",
            "SOFI",
            "JPM",
            "OBK",
            "EBC",
            "SBUX",
            "SNAP",
            "CRM",
            "ADBE",
            "F",
            "V",
            "SPIR",
            "MCD",
            "AAPL",
            "RKLB",
            "MA",
            "SPCX",
            "FSLR",
            "BKSY",
            "SATL",
            "FLY",
            "FANG",
            "MARA",
            "NVDA"
        ],
        tradeNotes: [],
        deposits: [

            {

                timestampUtc: new Date().toISOString(),

                amount: 23000,

                description: "Initial capital",

            },

        ],
    },
    // {
    //     id: "11111111-1111-1111-1111-111111111111",
    //     name: "Paper",

    //     currency: "USD",
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