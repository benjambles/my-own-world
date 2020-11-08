import { AttackType, CapValues } from '../../types/game/actions';

type CapResult = {
    isSuccess: boolean;
    isCritical: boolean;
    passesBarrier: boolean;
};

type RollResult = { total: number };

export const capCheck = (
    capValues: CapValues,
    attackType: AttackType,
    { total }: RollResult,
): CapResult => {
    const attackTypes = {
        autoHit,
        autoCrit,
        autoPierce,
        basic: attack,
    };
    return attackTypes[attackType](capValues, total);
};

/**
 * Roll a CAP check that guarantees barrier defenses penetrated
 * @param capValues
 */
const autoPierce = (capValues: CapValues, roll: number): CapResult => {
    return attack({ ...capValues, penetration: 20 }, roll);
};

/**
 * Return the result for a CAP check that always hits, crits
 * and penetrates barriers
 */
const autoCrit = (): CapResult => {
    return {
        isCritical: true,
        isSuccess: true,
        passesBarrier: true,
    };
};

/**
 * Return the result for a CAP check that always hits
 * but cannot crit or penetrate barriers
 */
const autoHit = (): CapResult => {
    return {
        isCritical: false,
        isSuccess: true,
        passesBarrier: false,
    };
};

/**
 * Rolls a CAP check, if the value is LTE the characters (c) value
 * a crit occurs, which auto hits and ignores the opponents barrier defenses.
 * If the value is LTE the (a) value a hit occurs
 * If the value is LTE the (p) value any damage on a successful hit
 * will ignore the opponents barrier defense.
 * @param capValues
 */
const attack = (capValues: CapValues, roll: number): CapResult => {
    const isCritical = roll <= capValues.critical;

    return {
        isCritical,
        isSuccess: isCritical || roll <= capValues.accuracy,
        passesBarrier: isCritical || roll <= capValues.penetration,
    };
};
