/**
 * A squad represents a subset of a squad, along with its selected equipment for a mission.
 */

import { append } from '@benjambles/js-lib/dist/arrays/array.js';
import { Merge, PartialBy } from '@benjambles/js-lib/dist/index.js';
import { getProp, setProp } from '@benjambles/js-lib/dist/objects/props.js';
import { Transactor } from '../credits/value.js';
import {
    GameEntity,
    getEntityFilter,
    hasEntityFilter,
    removeEntityFilter,
} from '../entities/entities.js';
import { Character } from './character/character.js';
import { CharacterGroup } from './members.js';
import { Team } from './team.js';

export interface Squad extends GameEntity, CharacterGroup, Transactor {
    allies: Character[];
    leaderId: string;
    value: number;
}

type Squads = Team['squads'];

type NewSquadInfo = Merge<
    PartialBy<
        Pick<Squad, 'allies' | 'credits' | 'description' | 'name'>,
        'allies' | 'credits'
    >,
    {
        squadNumber: number;
    }
>;

export function createSquad({
    allies = [],
    credits,
    description,
    name,
    squadNumber,
}: NewSquadInfo): Squad {
    const squad = {
        allies,
        description,
        entityId: `squad-${squadNumber}`,
        name,
        leaderId: '',
        members: [],
        value: 0,
        credits: credits ?? Infinity,
    };

    return squad;
}

export function getSquads<T extends Team>(team: T): Squads {
    return getProp('squads', team);
}

export function setSquads<T extends Team>(team: T, squads: Squads): T {
    return setProp('squads', squads, team);
}

export function getSquad<T extends Team>(team: T, entityId: string): Squad {
    return getSquads(team).find(getEntityFilter(entityId));
}

export function removeSquad<T extends Team>(squad: Squad, team: T): T {
    return setSquads(team, getSquads(team).filter(removeEntityFilter(squad)));
}

export function hasSquad<T extends Team>(squad: Squad, team: T): boolean {
    return getSquads(team).findIndex(hasEntityFilter(squad)) !== -1;
}

export function addSquad<T extends Team>(squad: Squad, team: T): T {
    return setSquads(team, append(getSquads(team), squad));
}
