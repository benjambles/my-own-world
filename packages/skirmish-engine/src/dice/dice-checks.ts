type RollTargets = { fail: number; success: number; critical: number };

export function getOpposedRollTargets(actorsValue, targetsValue): RollTargets {
    const rollCap = 12;
    const baseCrit = rollCap;
    const baseFail = 4;

    const delta = actorsValue - targetsValue;

    if (delta === 0) {
        return { fail: baseFail, success: baseFail + 1, critical: baseCrit };
    }

    const minCrit = baseCrit - delta;
    const maxFail = between(0, rollCap, baseFail - delta);

    const fail = maxFail || NaN;
    const success = maxFail >= rollCap ? NaN : between(1, rollCap, maxFail + 1);
    const critical = minCrit > rollCap ? NaN : between(1, rollCap, minCrit);

    return { fail, success, critical };
}

export function getRollState(targets: RollTargets, roll: number) {
    if (roll <= targets.fail) return 'fail';
    if (roll >= targets.critical) return 'critical';

    return 'success';
}

function between(min: number, max: number, value: number) {
    return Math.max(min, Math.min(max, value));
}
