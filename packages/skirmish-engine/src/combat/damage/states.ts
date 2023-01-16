import { ToUnion } from '@benjambles/js-lib/dist/index.js';

export type DamageState = ToUnion<typeof damageStates>;
export const damageStates = ['damaged', 'destroyed', 'normal'] as const;
