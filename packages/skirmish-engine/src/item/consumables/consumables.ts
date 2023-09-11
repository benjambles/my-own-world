import { Item } from '../item.js';

export interface Consumable extends Item {
    limit: number;
    effects: ConsumableEffect[];
    type: string;
}

interface ConsumableEffect {
    duration: string;
    target: string[];
    type: string;
    value: string;
}
