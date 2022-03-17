import type {
    ActionTypes,
    ClassAction,
    ClassTrait,
    Maneuver,
    TideTurner,
} from './actions.js';
import type { Anchor, Armour, Item, Keepsake, OffhandWeapon, Weapon } from './items.js';

export interface HeroData {
    name: string;
    tier: number;
    class: ClassOptions;
    profession: ProfessionOptions;
    stats: {
        base: Stats;
        resolved: Stats;
        current: Stats;
    };
    actionPoints: {
        current: number;
        max: number;
    };
    skills: SkillOptions;
    equipment: {
        melee: Weapon;
        offhand?: OffhandWeapon;
        ranged: Weapon;
        armour: Armour;
        keepsakes: [Keepsake, Keepsake?];
        items: Item[];
    };
    anchors: Anchor[];
}

type ActionOrTrait = ClassAction | ClassTrait;

export interface ClassOptions {
    name: string;
    id: string;
    actions: [
        ActionOrTrait,
        ActionOrTrait,
        ActionOrTrait,
        ActionOrTrait,
        ActionOrTrait,
        ActionOrTrait,
    ];
    tide_turners: [TideTurner, TideTurner];
}

export interface ProfessionOptions {
    name: string;
    id: string;
    aspects: Record<AspectTypes, ApectTiersSelections>;
}

export type AspectTypes = 'offensive' | 'defensive' | 'utility';
export type ApectTiers = keyof ApectTiersSelections;
export interface ApectTiersSelections {
    tier1: Aspect;
    tier2?: Aspect;
    tier3?: Aspect;
    tier4?: Aspect;
}
export interface Aspect {
    name: string;
    id: string;
    offsets: {
        actions?: {
            [name: string]: number;
        };
        [name: string]: any;
    };
}

export interface Stats {
    hp: number;
    defense: number;
    barrier: number;
    skill: number;
    limits: Record<ActionTypes, number>;
    actions: {
        tide_turner_charges: number;
        move: {
            min: number;
            max: number;
        };
        shift: {
            min: number;
            max: number;
        };
    };
    critical: number;
    accuracy: number;
    penetration: number;
    toughness: number;
    resistance: number;
    willpower: number;
    dodge: number;
}

export interface SkillOptions {
    major: Skill;
    minor: [Skill, Skill, Skill];
    maneuver: Maneuver;
}

export interface Skill {
    name: string;
    id: string;
    bonus: number;
}
