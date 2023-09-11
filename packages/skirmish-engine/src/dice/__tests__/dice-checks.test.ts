import { getRollState, getOpposedRollTargets } from '../dice-checks.js';

test('getRollState', () => {
    expect(getRollState({ critical: 12, fail: 4, success: 5 }, 1)).toEqual('fail');
    expect(getRollState({ critical: 12, fail: 4, success: 5 }, 5)).toEqual('success');
    expect(getRollState({ critical: 12, fail: 4, success: 5 }, 7)).toEqual('success');
    expect(getRollState({ critical: 12, fail: 4, success: 5 }, 12)).toEqual('critical');
});

test('getOpposedRollTargets', () => {
    expect(getOpposedRollTargets(6, 6)).toEqual({ critical: 12, fail: 4, success: 5 });
    expect(getOpposedRollTargets(6, 5)).toEqual({ critical: 11, fail: 3, success: 4 });
    expect(getOpposedRollTargets(10, 2)).toEqual({ critical: 4, fail: NaN, success: 1 });
    expect(getOpposedRollTargets(4, 10)).toEqual({
        critical: NaN,
        fail: 10,
        success: 11,
    });
});
