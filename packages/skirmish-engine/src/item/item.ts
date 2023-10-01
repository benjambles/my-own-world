import { Purchasable } from '../credits/value.js';
import { GameEntity } from '../entities/entities.js';
import { BodyPart, BodyPartType } from '../team/character/body-parts.js';

export interface Consumable extends GameEntity, Purchasable {
    limit: number;
    effects: {
        duration: string;
        target: string[];
        type: string;
        value: string;
    }[];
    type: string;
}

export interface Item extends GameEntity, Purchasable {
    requirements: {
        skills: string[];
        stats: { name: string; value: number }[];
        traits: string[];
    };
}

export interface EquipableItem extends Item {
    limit: number;
    location: string;
    type: string;
    traits: string[];
}

export interface Armour extends EquipableItem {
    stats: { name: string; value: number }[];
    upgradeSlots: { attachedId: string; type: string }[];
}

export interface Weapon extends EquipableItem {
    stats: {
        hands: number;
        range: string;
        attacks: number;
        damage: number;
    };
}

export interface Upgrade extends GameEntity, Purchasable {
    limit: number;
    location: string;
    stats: { name: string; value: number }[];
    type: string;
    traits: string[];
}

export interface Augmentation extends BodyPart {
    augmentationType: 'simple' | 'complex';
    preventsEquipment: boolean;
    replaces: BodyPartType;
}
