import {
    getCurrentActionPoints,
    setCurrentActionPoints,
} from '../actors/hero/actions.js';
import { ActionSpeeds, CombatAction } from '../types/game/actions.js';
import { HeroData } from '../types/game/hero.js';

/**
 *
 * @param action
 * @param hero
 * @returns
 */
export function useAction(action: CombatAction, hero: HeroData): HeroData {
    const { result, remainingPoints } = canAffordAction(action, hero);

    if (result) {
        /* TODO: Run Action event - Ben Allen */
    }

    return setCurrentActionPoints(hero, remainingPoints);
}

interface ActionPointResult {
    result: boolean;
    usedPoints: number;
    remainingPoints: number;
}

export function canAffordAction(
    { speed }: CombatAction,
    hero: HeroData,
): ActionPointResult {
    const points: Record<ActionSpeeds, number> = {
        free: 0,
        fast: 1,
        slow: 2,
    };

    const currentPoints = getCurrentActionPoints(hero);
    const remainingPoints = currentPoints - points[speed];
    const isSuccess = speed !== 'free' && remainingPoints >= 0;

    if (!isSuccess) {
        return { result: false, usedPoints: 0, remainingPoints: currentPoints };
    }

    return {
        result: true,
        usedPoints: points[speed],
        remainingPoints,
    };
}
