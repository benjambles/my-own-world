import { Character } from '../character/character.js';

export interface CharacterGroup {
    members: Character[];
}

export function addMember<T extends CharacterGroup>(group: T, character: Character): T {
    if (hasMember(group, character)) {
        throw new Error('game::group::duplicate_member');
    }

    return {
        ...group,
        members: [...group.members, character],
    };
}

export function removeMember<T extends CharacterGroup>(
    group: T,
    character: Character,
): T {
    return {
        ...group,
        members: group.members.filter((currentChar) => currentChar !== character),
    };
}

export function hasMember<T extends CharacterGroup>(
    { members }: T,
    character: Character,
): boolean {
    return members.findIndex(({ id }) => id === character.id) !== -1;
}
