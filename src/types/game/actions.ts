export type ActionSpeeds = 'fast' | 'slow' | 'free';
export type ActionTypes = 'amplify' | 'trigger' | 'sustain';
export type ClassActionBaseType = 'general' | ActionTypes;
export type ClassActionSecondaryType = 'spell' | 'exploit';
export type TargetConstraints = [any, any?];

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

export type Maneuver = {
    name: string;
    id: string;
    text: string;
    speed: ActionSpeeds;
};
