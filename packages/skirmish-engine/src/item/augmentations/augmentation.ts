import { BodyPart, PartType } from '../../character/character.js';

export interface Augmentation extends BodyPart {
    augmentationType: 'simple' | 'complex';
    preventsEquipment: boolean;
    replaces: PartType;
}
