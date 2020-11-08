import { capCheck } from '../cap-check';

describe('CapTest', () => {
    const capValues = { critical: 3, accuracy: 10, penetration: 7 };

    describe('autoHit attacks', () => {
        it('returns a fixed result for autoHit attacks', () => {
            expect(capCheck(capValues, 'autoHit', { total: 1 })).toEqual({
                isCritical: false,
                isSuccess: true,
                passesBarrier: false,
            });
        });
    });

    describe('autoCrit attacks', () => {
        it('returns a fixed result for autoCrit attacks', () => {
            expect(capCheck(capValues, 'autoCrit', { total: 1 })).toEqual({
                isCritical: true,
                isSuccess: true,
                passesBarrier: true,
            });
        });
    });

    describe('piercingHit attacks', () => {
        it('fails when the roll is higher than the accuracy', () => {
            expect(capCheck(capValues, 'autoPierce', { total: 11 })).toEqual({
                isCritical: false,
                isSuccess: false,
                passesBarrier: true,
            });
        });

        it('crits when the value is LTE the crit value', () => {
            expect(capCheck(capValues, 'autoPierce', { total: 2 })).toEqual({
                isCritical: true,
                isSuccess: true,
                passesBarrier: true,
            });
        });

        it('penetrates barries on any success', () => {
            expect(capCheck(capValues, 'autoPierce', { total: 8 })).toEqual({
                isCritical: false,
                isSuccess: true,
                passesBarrier: true,
            });

            expect(capCheck(capValues, 'autoPierce', { total: 5 })).toEqual({
                isCritical: false,
                isSuccess: true,
                passesBarrier: true,
            });
        });
    });

    describe('basic attacks', () => {
        it('fails when the roll is higher than the accuracy', () => {
            expect(capCheck(capValues, 'basic', { total: 11 })).toEqual({
                isCritical: false,
                isSuccess: false,
                passesBarrier: false,
            });
        });

        it('crits when the value is LTE the crit value', () => {
            expect(capCheck(capValues, 'basic', { total: 2 })).toEqual({
                isCritical: true,
                isSuccess: true,
                passesBarrier: true,
            });
        });

        it('is successful when the accuracy is LTE than the roll', () => {
            expect(capCheck(capValues, 'basic', { total: 9 })).toEqual({
                isCritical: false,
                isSuccess: true,
                passesBarrier: false,
            });
        });

        it('is penetrates barries when the penetration value is LTE than the roll', () => {
            expect(capCheck(capValues, 'basic', { total: 6 })).toEqual({
                isCritical: false,
                isSuccess: true,
                passesBarrier: true,
            });
        });
    });
});
