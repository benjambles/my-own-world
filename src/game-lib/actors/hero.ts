import { HeroData } from '../types/game/hero';
import { clamp } from '../utils/math';

/**
 *
 * @param hero
 */
export const getCurrentActionPoints = (hero: HeroData): number => {
    return hero.actionPoints.current ?? 0;
};

/**
 *
 * @param hero
 * @param newTotal
 */
export const setCurrentActionPoints = (hero: HeroData, newTotal: number) => {
    return { ...hero, actionPoints: { ...hero.actionPoints, current: newTotal } };
};

/**
 *
 * @param hero
 */
export const getMaxActionPoints = (hero: HeroData): number => {
    return clamp(0, 4, hero.actionPoints.max || 4);
};
