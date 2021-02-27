import { clamp, sum } from '../utils/math';

interface RollResult {
    rolls: number[];
    total: number;
    modifiedTotal: number;
}

export interface RollFn {
    (dicePool: string, modifier?: number): RollResult;
}

export class Dice {
    static readonly baseDiceTypes: number[] = [4, 6, 8, 10, 12, 20];
    readonly diceTypes: number[];
    #getRandom: () => number;

    constructor(diceTypes: number[] = Dice.baseDiceTypes, randomFn: () => number = Math.random) {
        this.diceTypes = diceTypes;
        this.#getRandom = randomFn;
    }

    roll(dicePool: string, modifier: number = 0): RollResult {
        const [count, diceType] = this.getDice(dicePool);

        const rolls = Array.from({ length: count }, () => this.getDieValue(diceType));
        const total = sum(...rolls);

        return {
            rolls,
            total,
            modifiedTotal: Math.max(0, total + modifier),
        };
    }

    /**
     * Returns a number for faces for the dice in the list with the number of modifications
     * applied. e.g. Starting with a d6 and appling +2 steps up returns a d10, -2 steps would
     * give a d4.
     * @param dicePool - The dice to be rolled e.g. 2d10
     * @param steps - The number of steps up or down the dice list
     */
    modifyDiceType(dicePool: string, steps: number): string {
        const [count, diceType] = this.getDice(dicePool);
        return `${count}d${
            this.diceTypes[
                clamp(0, this.diceTypes.length - 1, this.diceTypes.indexOf(diceType) + steps)
            ]
        }`;
    }

    /**
     * Extracts the count and type of dice to be rolled from a dice pool value.
     * Errors if an invalid pool is passed
     * e.g. 2d10 = 2 * 10 sided dice
     * @param dicePool - The dice to be rolled e.g. 2d10
     */
    private getDice(dicePool: string) {
        const [count, diceType] = dicePool.split('d').map((num) => parseInt(num, 10));

        if (isNaN(count) || count === 0) {
            throw new Error(`Invalid number of dice: ${count}`);
        }

        if (!this.diceTypes.includes(diceType)) {
            throw new Error(`Unexpected dice with ${diceType} faces`);
        }

        return [count, diceType];
    }

    /**
     * Get a random integer between 1 and the provided number
     * @param diceType - The highest number that can be rolled
     */
    private getDieValue(diceType: number): number {
        return Math.floor(this.#getRandom() * (diceType - 1) + 1);
    }
}
