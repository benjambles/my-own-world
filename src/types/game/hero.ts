import { ActionTypes, ClassAction, Maneuver, TideTurner } from './actions';
import { Anchor, Armour, Item, Keepsake } from './items';

export type HeroData = {
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
};

export type ClassOptions = {
    name: string;
    id: string;
    actions: ClassAction[];
    tide_turners: TideTurner[];
};

export type ProfessionOptions = {
    name: string;
    id: string;
    aspects: Record<AspectTypes, ApectTiersSelections>;
};

export type AspectTypes = 'offensive' | 'defensive' | 'utility';
export type ApectTiers = keyof ApectTiersSelections;
export type ApectTiersSelections = {
    tier1: Aspect;
    tier2?: Aspect;
    tier3?: Aspect;
    tier4?: Aspect;
};
export type Aspect = {
    name: string;
    id: string;
    offsets: {
        actions?: {
            [name: string]: number;
        };
        [name: string]: any;
    };
};

export type Stats = {
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
};

export type SkillOptions = {
    major: Skill;
    minor: [Skill, Skill, Skill];
    maneuver: Maneuver;
};

export type Skill = {
    name: string;
    id: string;
    bonus: number;
};
