/**
 * A squad represents a subset of a squad, along with its selected equipment for a mission.
 */

import { Character } from '../character/character.js';
import { GameEntity } from '../index.js';
import { CharacterGroup } from './members.js';

export interface Squad extends GameEntity, CharacterGroup {
    allies: Character[];
    leaderId: string;
    value: number;
}

export function createSquad(
    name: string,
    description: string,
    squadNumber: number,
    allies: Character[] = [],
): Squad {
    const squad = {
        allies,
        description,
        entityId: `squad-${squadNumber}`,
        name,
        leaderId: '',
        members: [],
        value: 0,
    };

    return squad;
}
