import type { ActionSpeeds, CapValues } from './actions.js';

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
    locked: boolean;
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
type OffsetTypes = DefenseTypes | 'willpower';

export interface Armour extends EqupimentBase {
    offsets: Partial<
        {
            [key in DefenseTypes]: number;
        }
    >;
}

export interface Weapon extends EqupimentBase {
    type: 'melee' | 'ranged';
    range: number;
    damage: WeaponDamage;
    offsets: Partial<CapValues>;
    additional_effect: string;
    affect_handler?: Function;
    hands?: number;
}

export interface OffhandWeapon extends EqupimentBase {
    offsets: Partial<
        {
            [key in OffsetTypes | 'damage']: number;
        }
    >;
    additional_effect: string;
    affect_handler?: Function;
}

interface WeaponDamage {
    attack_dice: {
        sides: number;
        bonus_dice: number;
    };
    type: AttackTypes;
}
