export type ActionSpeeds = 'fast' | 'slow' | 'free';
export type ActionTypes = 'amplify' | 'trigger' | 'sustain';
export type ClassActionBaseType = 'general' | ActionTypes;
export type ClassActionSecondaryType = 'spell' | 'exploit';
export type TargetConstraints = [any, any?];
export type AttackType = 'autoHit' | 'autoPierce' | 'autoCrit' | 'basic';

export type CapValues = {
    critical: number;
    accuracy: number;
    penetration: number;
};

export type CombatAction = {
    name: string;
    id: string;
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

export type ClassTrait = CombatAction & { action_type: 'trait' };

export type ClassAction = CombatAction & { action_type: 'action' };

export type TideTurner = CombatAction & { action_type: 'tide_turner' };

export type Maneuver = {
    name: string;
    id: string;
    text: string;
    speed: ActionSpeeds;
};
