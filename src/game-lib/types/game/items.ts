import type { ActionSpeeds } from './actions.js';

export type UseTypes = 'combat' | 'crossroad' | 'custom' | 'role-playing' | 'encounter';
export type UseLimits = 'combat' | 'campaign' | 'milestone' | 'times';

export interface Item {
    name: string;
    useable_in: UseTypes[];
    type: string;
    effect: {
        text: string;
    };
    speed: ActionSpeeds;
    availability: {
        charges: number;
        period: UseLimits;
        used: number;
    };
}

export interface Keepsake extends Item {
    type: 'keepsake';
}

export interface Anchor {
    type: 'person' | 'topic of interest';
    id: string;
    name: string;
}

interface EqupimentBase {
    name: string;
    id: string;
}

type AttackTypes = 'resistance' | 'toughness';
type DefenseTypes = AttackTypes | 'dodge';

export interface Armour extends EqupimentBase {
    offsets: Partial<
        {
            [key in DefenseTypes]: number;
        }
    >;
}
