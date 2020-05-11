export type HeroData = {
    name: string;
    tier: 1 | 2 | 3 | 4;
    class: ClassOptions;
    profession: ProfessionOptions;
    stats: {
        base: Stats;
        resolved: Stats;
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

export type CombatAction = {
    name: string;
    types: 'passive' | [ClassActionBaseType, ClassActionSecondaryType];
    action_type: string;
    target: {
        number: number;
        type: TargetConstraints;
    };
    range: number;
    effect: {
        text: string;
    };
    speed: ActionSpeeds;
};

export type ClassAction = CombatAction & { action_type: 'action' | 'trait' };

export type TideTurner = CombatAction & { action_type: 'tide_turner' };

export type ActionSpeeds = 'fast' | 'slow' | 'free';
export type ActionTypes = 'amplify' | 'trigger' | 'sustain';
export type ClassActionBaseType = 'general' | ActionTypes;
export type ClassActionSecondaryType = 'spell' | 'exploit';
export type TargetConstraints = [any, any?];

export type ProfessionOptions = {
    name: string;
    id: string;
    aspects: Record<AspectTypes, ApectTiersSelections>;
};

export type AspectTypes = 'offensive' | 'defensive' | 'utility';
export type ApectTiers = 'tier1' | 'tier2' | 'tier3' | 'tier4';
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

export type Maneuver = {
    name: string;
    id: string;
    text: string;
    speed: ActionSpeeds;
};

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
