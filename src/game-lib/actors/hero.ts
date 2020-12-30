import { assocPath } from 'ramda';
import { HeroData } from '../types/game/hero';

/**
 *
 * @param hero
 */
export const getCurrentActionPoints = (hero: HeroData): number => {
    return hero.actionPoints.current ?? 0;
};

export const setCurrentActionPoints = (hero: HeroData, newTotal: number) => {
    return assocPath(['actionPoints', 'current'], newTotal, hero);
};

export const getMaxActionPoints = (hero: HeroData): number => {
    return hero.actionPoints.max ?? 4;
};
