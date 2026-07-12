import type {
    Portfolio,
} from "../types";

import {
    getMaximumTradeRisk,
} from "../calculations/risk";

import {
    getStopLossPrice,
} from "../calculations/stopLoss";

import {
    getLossPerShare,
} from "../calculations/lossPerShare";

import {
    getMaximumPositionShares,
} from "../calculations/positionSize";

export interface PyramidingStage {
    stage: number;
    shares: number;
    triggerPercent: number;
    entryPrice: number;
    stopPrice: number;
    lossPerShare: number;
    risk: number;
    remainingRisk: number;
}

export interface PyramidingPlan {
    stages: PyramidingStage[];
}

function createStage(
    stage: number,
    triggerPercent: number,
    entryPrice: number,
    availableRisk: number,
    plannedShares: number,
    stopLossPercent: number,
): PyramidingStage {

    const stopPrice = getStopLossPrice(
        entryPrice,
        stopLossPercent,
    );

    const lossPerShare = getLossPerShare(
        entryPrice,
        stopPrice,
    );

    const maximumShares = getMaximumPositionShares(
        availableRisk,
        lossPerShare,
    );

    const shares = Math.min(
        plannedShares,
        maximumShares,
    );

    const risk =
        shares * lossPerShare;

    return {
        stage,
        shares,
        triggerPercent,
        entryPrice,
        stopPrice,
        lossPerShare,
        risk,
        remainingRisk: availableRisk - risk,
    };
}

export function simulatePyramiding(
    portfolio: Portfolio,
    currentPrice: number,
): PyramidingPlan {

    const maximumRisk = getMaximumTradeRisk(portfolio);

    const initialStop = getStopLossPrice(
        currentPrice,
        portfolio.stopLossPercent,
    );

    const initialLossPerShare = getLossPerShare(
        currentPrice,
        initialStop,
    );

    const maximumShares = getMaximumPositionShares(
        maximumRisk,
        initialLossPerShare,
    );

    //
    // Balanced strategy
    //
    const stage1Planned =
        Math.ceil(maximumShares / 3);

    const stage2Planned =
        Math.ceil((maximumShares - stage1Planned) / 2);

    const stage3Planned =
        maximumShares -
        stage1Planned -
        stage2Planned;

    //
    // Stage 1
    //
    const stage1 = createStage(
        1,
        0,
        currentPrice,
        maximumRisk,
        stage1Planned,
        portfolio.stopLossPercent,
    );

    //
    // Stage 2
    //
    const stage2 = createStage(
        2,
        5,
        currentPrice * 1.05,
        stage1.remainingRisk,
        stage2Planned,
        portfolio.stopLossPercent,
    );

    //
    // Stage 3
    //
    const stage3 = createStage(
        3,
        10,
        currentPrice * 1.10,
        stage2.remainingRisk,
        stage3Planned,
        portfolio.stopLossPercent,
    );

    return {
        stages: [
            stage1,
            stage2,
            stage3,
        ],
    };
}