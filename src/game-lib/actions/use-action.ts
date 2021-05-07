import { getCurrentActionPoints, setCurrentActionPoints } from '../actors/hero.js';
import type { ActionSpeeds, CombatAction } from '../types/game/actions.js';
import type { HeroData } from '../types/game/hero.js';

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

export function canAffordAction({ speed }: CombatAction, hero: HeroData): ActionPointResult {
    const points: Record<ActionSpeeds, number> = {
        free: 0,
        fast: 1,
        slow: 2,
    };

    const currentPoints = getCurrentActionPoints(hero);

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
