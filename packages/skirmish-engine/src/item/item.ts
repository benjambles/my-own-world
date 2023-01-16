import { Purchasable } from '../credits/value.js';
import { GameEntity } from '../entities/entities.js';
import { BodyPartType } from '../team/character/body-parts.js';

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
    location: BodyPartType;
}
