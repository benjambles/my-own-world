import { append, dedupe } from '@benjambles/js-lib/dist/arrays/array.js';
import { PartialBy } from '@benjambles/js-lib/dist/index.js';
import { DamageState } from '../../combat/damage/states.js';
import { GameEntity } from '../../entities/entities.js';
import { Augmentation } from '../../item/augmentations/augmentation.js';
import { BodyPart } from './body-parts.js';
import { StatBlocks } from './stats.js';

export interface Character extends Species {
    experience: number;
    items: {};
    preventedActions: string[];
    speciesId: string;
    stance: string;
    state: DamageState;
}

export interface Species extends GameEntity {
    actions: {};
    bodyParts: (Augmentation | BodyPart)[];
    factions: string[];
    skills: {
        [name: string]: number;
    };
    stats: StatBlocks;
    traits: string[];
    value: number;
}

type NewCharacterParams = PartialBy<
    Pick<Character, 'name' | 'description' | 'factions' | 'traits'>,
    'factions' | 'traits'
>;

export function createCharacter(
    species: Species,
    { name, description, factions = [], traits = [] }: NewCharacterParams,
    existingCharacters: number = 0,
): Character {
    const character: Character = {
        ...species,
        name,
        description,
        entityId: `char-${existingCharacters + 1}`,
        experience: 0,
        factions: dedupe(append(species.factions, factions)),
        items: {},
        preventedActions: [],
        speciesId: species.entityId,
        stance: 'normal',
        state: 'normal',
        traits: dedupe(append(species.traits, traits)),
    };

    return character;
}
