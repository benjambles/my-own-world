import { capCheck } from '../cap-check.js';
import { RollResult } from '../dice.js';

describe('CapTest', () => {
    const capValues = { critical: 3, accuracy: 10, penetration: 7 };
    const dummyRoll: RollResult = { rolls: [], total: 0, modifiedTotal: 0 };

    describe('autoHit attacks', () => {
        it('returns a fixed result for autoHit attacks', () => {
            expect(capCheck(capValues, 'autoHit', { ...dummyRoll, total: 1 })).toEqual({
                isCritical: false,
                isSuccess: true,
                passesBarrier: false,
            });
        });
    });

    describe('autoCrit attacks', () => {
        it('returns a fixed result for autoCrit attacks', () => {
            expect(capCheck(capValues, 'autoCrit', { ...dummyRoll, total: 1 })).toEqual({
                isCritical: true,
                isSuccess: true,
                passesBarrier: true,
            });
        });
    });

    describe('piercingHit attacks', () => {
        it('fails when the roll is higher than the accuracy', () => {
            expect(
                capCheck(capValues, 'autoPierce', { ...dummyRoll, total: 11 }),
            ).toEqual({
                isCritical: false,
                isSuccess: false,
                passesBarrier: true,
            });
        });

        it('crits when the value is LTE the crit value', () => {
            expect(capCheck(capValues, 'autoPierce', { ...dummyRoll, total: 2 })).toEqual(
                {
                    isCritical: true,
                    isSuccess: true,
                    passesBarrier: true,
                },
            );
        });

        it('penetrates barries on any success', () => {
            expect(capCheck(capValues, 'autoPierce', { ...dummyRoll, total: 8 })).toEqual(
                {
                    isCritical: false,
                    isSuccess: true,
                    passesBarrier: true,
                },
            );

            expect(capCheck(capValues, 'autoPierce', { ...dummyRoll, total: 5 })).toEqual(
                {
                    isCritical: false,
                    isSuccess: true,
                    passesBarrier: true,
                },
            );
        });
    });

    describe('basic attacks', () => {
        it('fails when the roll is higher than the accuracy', () => {
            expect(capCheck(capValues, 'basic', { ...dummyRoll, total: 11 })).toEqual({
                isCritical: false,
                isSuccess: false,
                passesBarrier: false,
            });
        });

        it('crits when the value is LTE the crit value', () => {
            expect(capCheck(capValues, 'basic', { ...dummyRoll, total: 2 })).toEqual({
                isCritical: true,
                isSuccess: true,
                passesBarrier: true,
            });
        });

        it('is successful when the accuracy is LTE than the roll', () => {
            expect(capCheck(capValues, 'basic', { ...dummyRoll, total: 9 })).toEqual({
                isCritical: false,
                isSuccess: true,
                passesBarrier: false,
            });
        });

        it('is penetrates barries when the penetration value is LTE than the roll', () => {
            expect(capCheck(capValues, 'basic', { ...dummyRoll, total: 6 })).toEqual({
                isCritical: false,
                isSuccess: true,
                passesBarrier: true,
            });
        });
    });
});
