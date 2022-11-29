import { PartType } from '../character/character.js';
import { Purchasable } from '../credits/value.js';
import { GameEntity } from '../index.js';

export interface Item extends GameEntity, Purchasable {
    requirements: {
        skills: string[];
        stats: {
            [name: string]: number;
        };
    };
}

export interface EquipableItem extends Item {
    isEquipped: boolean;
    limit: number;
    location: PartType;
}
