import { partial } from 'ramda';

interface Selection {
    d4: number[];
    d6: number[];
    d8: number[];
    d10: number[];
    d12: number[];
    d20: number[];
}

/**
 *
 * @param selection
 */
export const pool = (selection: Selection) => {
    return Object.fromEntries(
        Object.entries(selection).map(([die, modifiers]) => {
            return [die, modifiers.map((modifier) => rollers[die](modifier))];
        }),
    );
};

/**
 * Returns a function that takes a modifier and then
 * returns a random number between 1-Max + the modifier
 * @param max
 */
const getDiceRoller = (max: number, modifier: number) => {
    const roll = Math.floor(Math.random() * max + 1);
    return { roll, modifiedRoll: roll + modifier };
};

const rollers = {
    d4: partial(getDiceRoller, [4]),
    d6: partial(getDiceRoller, [6]),
    d8: partial(getDiceRoller, [8]),
    d10: partial(getDiceRoller, [10]),
    d12: partial(getDiceRoller, [12]),
    d20: partial(getDiceRoller, [20]),
};
