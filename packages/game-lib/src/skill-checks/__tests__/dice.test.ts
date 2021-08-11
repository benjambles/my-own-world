import { Dice } from '../dice.js';

describe.only('Dice', () => {
    it('exposes the core Dice types', () => {
        expect(Dice.baseDiceTypes).toEqual([4, 6, 8, 10, 12, 20]);
    });

    describe('instance', () => {
        it('exposes the instances dice types', () => {
            const dice = new Dice([20]);

            expect(dice.diceTypes).toEqual([20]);
        });

        it('upgrades and downgrades dice to allowed versions in the pool', () => {
            const dice = new Dice([4, 6, 8, 10, 12]);

            expect(dice.modifyDiceType('2d6', 2)).toEqual('2d10');
            expect(dice.modifyDiceType('1d10', 6)).toEqual('1d12');

            expect(() => dice.modifyDiceType('1d20', 2)).toThrow();
            expect(() => dice.modifyDiceType('0d20', 2)).toThrow();

            expect(dice.modifyDiceType('1d6', 0)).toEqual('1d6');

            expect(dice.modifyDiceType('3d10', -2)).toEqual('3d6');
            expect(dice.modifyDiceType('1d8', -4)).toEqual('1d4');
            expect(dice.modifyDiceType('1d4', -2)).toEqual('1d4');
        });

        it('rolls dicepools', () => {
            let dice = new Dice([4, 6, 8, 10, 12, 20], () => 0.5);

            expect(dice.roll('2d20', 0)).toEqual({
                rolls: [10, 10],
                total: 20,
                modifiedTotal: 20,
            });

            expect(dice.roll('1d10', 0)).toEqual({
                rolls: [5],
                total: 5,
                modifiedTotal: 5,
            });

            expect(dice.roll('2d20', 2)).toEqual({
                rolls: [10, 10],
                total: 20,
                modifiedTotal: 22,
            });

            expect(dice.roll('2d20', -2)).toEqual({
                rolls: [10, 10],
                total: 20,
                modifiedTotal: 18,
            });

            dice = new Dice([4, 6, 8, 10, 12, 20], () => 0);

            expect(dice.roll('2d20', 0)).toEqual({
                rolls: [1, 1],
                total: 2,
                modifiedTotal: 2,
            });

            dice = new Dice([4, 6, 8, 10, 12, 20], () => 1);

            expect(dice.roll('2d20', 0)).toEqual({
                rolls: [20, 20],
                total: 40,
                modifiedTotal: 40,
            });
        });
    });
});
