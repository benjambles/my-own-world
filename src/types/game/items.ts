import { ActionSpeeds } from './actions';

export type UseTypes = 'combat' | 'crossroad' | 'custom' | 'role-playing' | 'encounter';
export type UseLimits = 'combat' | 'campaign' | 'milestone' | 'times';

export type Item = {
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
};

export type Keepsake = Item & {
    type: 'keepsake';
};

export type Anchor = {
    type: 'person' | 'topic of interest';
    id: string;
    name: string;
};

type EqupimentBase = {
    name: string;
    id: string;
};

type AttackTypes = 'resistance' | 'toughness';
type DefenseTypes = AttackTypes | 'dodge';

export type Armour = EqupimentBase & {
    offsets: Partial<
        {
            [key in DefenseTypes]: number;
        }
    >;
};
