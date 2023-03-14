import { EquipableItem } from '../item.js';

export interface Weapon extends EquipableItem {
    type: string;
    stats: {
        hands: number;
        range: string;
        dice: string;
        modifier: number;
    };
}
