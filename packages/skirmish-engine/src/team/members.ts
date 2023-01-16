import { append } from '@benjambles/js-lib/dist/arrays/array.js';
import { getProp, setProp } from '@benjambles/js-lib/dist/objects/props.js';
import {
    getEntityFilter,
    hasEntityFilter,
    removeEntityFilter,
} from '../entities/entities.js';
import { Character } from './character/character.js';

export interface CharacterGroup {
    members: Character[];
}

type Members = CharacterGroup['members'];

export function getMembers<G extends CharacterGroup>(characterGroup: G): Members {
    return getProp('members', characterGroup);
}

export function getMember<G extends CharacterGroup>(
    characterGroup: G,
    entityId: string,
): Character {
    return getMembers(characterGroup).find(getEntityFilter(entityId));
}

export function removeMember<G extends CharacterGroup>(
    character: Character,
    characterGroup: G,
): G {
    return setMembers(
        characterGroup,
        getMembers(characterGroup).filter(removeEntityFilter(character)),
    );
}

export function hasMember<G extends CharacterGroup>(
    character: Character,
    characterGroup: G,
): boolean {
    return getMembers(characterGroup).findIndex(hasEntityFilter(character)) !== -1;
}

export function addMember<G extends CharacterGroup>(
    character: Character,
    characterGroup: G,
): G {
    return setMembers(characterGroup, append(getMembers(characterGroup), character));
}

function setMembers<G extends CharacterGroup>(characterGroup: G, members: Members): G {
    return setProp('members', members, characterGroup);
}
