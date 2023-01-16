import { ToUnion } from '@benjambles/js-lib/dist/index.js';
import { DamageState } from '../../combat/damage/states.js';
import { Modifiers } from './stats.js';

export interface BodyPart {
    id: string;
    isCritial: boolean;
    modifiers: {
        onDamage: Modifiers;
        onEquip?: Modifiers;
    };
    name: string;
    position?: LimbPosition;
    state: DamageState;
    type: BodyPartType;
}

export type LimbPosition = ToUnion<typeof limbPositions>;
export const limbPositions = ['left', 'right'] as const;

export type BodyPartType = ToUnion<typeof bodyPartTypes>;
export const bodyPartTypes = ['arm', 'flights', 'head', 'leg', 'tail', 'torso'] as const;
