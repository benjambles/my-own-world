import {
    getCurrentActionPoints,
    setCurrentActionPoints,
} from '../actors/hero/actions.js';
import type { ActionSpeeds, CombatAction } from '../types/game/actions.js';
import type { HeroData } from '../types/game/hero.js';

export function useAction(action: CombatAction, hero: HeroData): HeroData {
    const currentPoints = getCurrentActionPoints(hero);
    const { result, remainingPoints } = canAffordAction(action, currentPoints);

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
    currentPoints: number,
): ActionPointResult {
    const points: Record<ActionSpeeds, number> = {
        free: 0,
        fast: 1,
        slow: 2,
    };

    if (speed === 'free') {
        return { result: true, usedPoints: 0, remainingPoints: currentPoints };
    }

    const remainingPoints = currentPoints - points[speed];

    return {
        result: remainingPoints >= 0,
        usedPoints: points[speed],
        remainingPoints,
    };
}
