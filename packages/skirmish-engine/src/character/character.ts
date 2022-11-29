import { Augmentation } from '../item/augmentations/augmentation.js';
import { Modifiers, StatBlocks } from './stats.js';

export interface Character extends Species {
    experience: number;
    id: string;
    factions: string[];
    givenName: string;
    items: {};
    relationships: {
        [name: string]: number;
    };
    skills: {
        [name: string]: number;
    };
    stance: string;
    value: number;
    state: DamageState;
}

export interface Species {
    actions: {};
    bodyParts: (Augmentation | BodyPart)[];
    classification: string;
    id: string;
    preventedActions: string[];
    stats: StatBlocks;
    traits: string[];
    value: number;
}

export interface BodyPart {
    id: string;
    isCritial: boolean;
    modifiers: {
        onDamage: Modifiers;
        onEquip?: Modifiers;
    };
    name: string;
    position?: 'left' | 'right';
    state: DamageState;
    type: PartType;
}

export type DamageState = 'damaged' | 'destroyed' | 'normal';

export type PartType = 'arm' | 'flights' | 'head' | 'leg' | 'tail' | 'torso';

export function createCharacter(
    species: Species,
    givenName: string,
    existingCharacters: number = 0,
): Character {
    const character: Character = {
        ...species,
        id: `char-${existingCharacters + 1}`,
        experience: 0,
        factions: [],
        givenName,
        items: {},
        relationships: {},
        skills: {},
        stance: 'normal',
        state: 'normal',
        value: species.value,
    };

    return character;
}
