import { HeroData, Stats } from '../../types/game/hero.js';
import { clamp } from '../../utils/math.js';

export const baseStats: Stats = {
    accuracy: 10,
    actions: {
        move: {
            max: 5,
            min: 1,
        },
        shift: {
            max: 1,
            min: 1,
        },
        tide_turner_charges: 2,
    },
    barrier: 4,
    critical: 2,
    defense: 4,
    dodge: 4,
    hp: 20,
    limits: {
        amplify: 1,
        sustain: 1,
        trigger: 1,
    },
    penetration: 5,
    resistance: 4,
    skill: 8,
    toughness: 4,
    willpower: 4,
};

export function increaseTier(hero: HeroData): HeroData {
    const newTier = clamp(1, 4, hero.tier + 1);

    return {
        ...hero,
        stats: {
            ...hero.stats,
            base: upgradeStats(hero.stats.base, newTier),
            resolved: upgradeStats(hero.stats.resolved, newTier),
        },
        tier: newTier,
    };
}

function upgradeStats(stats: Stats, tier: number): Stats {
    const tideTurnerIncrease = tier === 3 ? 1 : 0;
    return {
        ...stats,
        actions: {
            ...stats.actions,
            tide_turner_charges: stats.actions.tide_turner_charges + tideTurnerIncrease,
        },
        hp: stats.hp + 10,
    };
}
