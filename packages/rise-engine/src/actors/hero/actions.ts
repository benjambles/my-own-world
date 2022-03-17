import { HeroData } from '../../types/game/hero.js';
import { clamp } from '../../utils/math.js';

/**
 *
 * @param hero
 */
export function getCurrentActionPoints(hero: HeroData): number {
    return hero.actionPoints.current ?? 0;
}

/**
 *
 * @param hero
 * @param newTotal
 */
export function setCurrentActionPoints(hero: HeroData, newTotal: number) {
    return { ...hero, actionPoints: { ...hero.actionPoints, current: newTotal } };
}

/**
 *
 * @param hero
 */
export function getMaxActionPoints(hero: HeroData): number {
    return clamp(0, 4, hero.actionPoints.max || 4);
}
