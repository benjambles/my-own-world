import { ActionTypes, ClassAction, ClassTrait, Maneuver, TideTurner } from './actions';
import { Anchor, Armour, Item, Keepsake } from './items';

export interface HeroData {
    name: string;
    tier: 1 | 2 | 3 | 4;
    class: ClassOptions;
    profession: ProfessionOptions;
    stats: {
        base: Stats;
        resolved: Stats;
    };
    actionPoints: {
        current: number;
        max: number;
    };
    skills: SkillOptions;
    equipment: {
        melee: {
            name: 'Scepter';
            id: 'scepter';
            hands: 1;
            range: 1;
            damage: {
                dice: {
                    d4: 1;
                };
                type: 'toughness';
            };
            offsets: {
                accuracy: 1;
            };
            additional_effect: 'Your first Spell each Encounter is a Fast Action.';
        };
        offhand: {
            name: 'Focus Item';
            id: 'focus_item';
            offsets: {
                resistance: 2;
            };
        };
        ranged: {
            name: 'Wand';
            id: 'wand';
            damage: {
                dice: {
                    d6: 1;
                };
                type: 'resistance';
            };
            offsets: {
                critical: 1;
            };
        };
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
    move_distance: {
        min: number;
        max: number;
    };
    actions: {
        tide_turner: number;
        move: number;
        shift: number;
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
