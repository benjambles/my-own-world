import { BodyPart, BodyPartType } from '../../team/character/body-parts.js';

export interface Augmentation extends BodyPart {
    augmentationType: 'simple' | 'complex';
    preventsEquipment: boolean;
    replaces: BodyPartType;
}
