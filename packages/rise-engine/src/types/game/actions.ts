export type ActionSpeeds = 'fast' | 'free' | 'slow';
export type ActionTypes = 'amplify' | 'sustain' | 'trigger';
export type ClassActionBaseType = 'general' | ActionTypes;
export type ClassActionSecondaryType = 'exploit' | 'spell';
export type TargetConstraints = [any, any?];
export type AttackType = 'autoHit' | 'autoCrit' | 'autoPierce' | 'basic';

export interface CapValues {
    accuracy: number;
    critical: number;
    penetration: number;
}

export interface CombatAction {
    action_type: string;
    effect: {
        text: string;
    };
    id: string;
    name: string;
    range: number;
    speed: ActionSpeeds;
    target: {
        number: number;
        type: TargetConstraints;
    };
    types: 'passive' | [ClassActionBaseType, ClassActionSecondaryType];
}
export interface ClassAction extends CombatAction {
    action_type: 'action';
}

export interface ClassTrait extends CombatAction {
    action_type: 'trait';
}

export interface TideTurner extends CombatAction {
    action_type: 'tide_turner';
}

export interface Maneuver {
    id: string;
    name: string;
    speed: ActionSpeeds;
    text: string;
}
