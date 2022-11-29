import { Debt } from '../credits/debt.js';
import { Favour } from './favours.js';

export interface Faction {
    relationships: Relationships;
}

interface Relationships {
    [name: string]: {
        debts: Debt[];
        favours: Favour[];
        value: number;
    };
}
