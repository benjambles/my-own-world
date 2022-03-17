import { HeroData, Stats } from '../../types/game/hero.js';
import { clamp } from '../../utils/math.js';

export const baseStats: Stats = {
    hp: 20,
    defense: 4,
    barrier: 4,
    skill: 8,
    limits: {
        trigger: 1,
        sustain: 1,
        amplify: 1,
    },

    actions: {
        tide_turner_charges: 2,
        move: {
            min: 1,
            max: 5,
        },
        shift: {
            min: 1,
            max: 1,
        },
    },
    critical: 2,
    accuracy: 10,
    penetration: 5,
    toughness: 4,
    resistance: 4,
    willpower: 4,
    dodge: 4,
};

export function increaseTier(hero: HeroData): HeroData {
    const newTier = clamp(1, 4, hero.tier + 1);

    return {
        ...hero,
        tier: newTier,
        stats: {
            ...hero.stats,
            base: upgradeStats(hero.stats.base, newTier),
            resolved: upgradeStats(hero.stats.resolved, newTier),
        },
    };
}

function upgradeStats(stats: Stats, tier: number): Stats {
    const tideTurnerIncrease = tier === 3 ? 1 : 0;
    return {
        ...stats,
        hp: stats.hp + 10,
        actions: {
            ...stats.actions,
            tide_turner_charges: stats.actions.tide_turner_charges + tideTurnerIncrease,
        },
    };
}
