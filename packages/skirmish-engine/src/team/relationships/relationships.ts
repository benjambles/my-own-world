import { Transactor } from '../../credits/value.js';
import { GameEntity } from '../../entities/entities.js';
import { Favour } from './favours.js';

export interface Faction extends Transactor, GameEntity {
    relationships: {
        [name: string]: {
            favours: Favour[];
            standing: number;
        };
    };
}

type Relationships = Faction['relationships'];
type Relationship = Relationships[string];

export function createRelationship(favour?: Favour, standing: number = 0): Relationship {
    return {
        standing,
        favours: favour ? [favour] : [],
    };
}

export function getRelationship<T extends Faction>(
    team: T,
    targetFaction: Faction,
): Relationship | undefined {
    return team.relationships[targetFaction.entityId];
}

export function getRelationships<T extends Faction>(team: T): Relationships {
    return team.relationships;
}

export function modifyStanding<T extends Faction>(
    team: T,
    targetFaction: Faction,
    standingChange: number,
): T {
    const relationship = getRelationship(team, targetFaction);
    return setRelationship(team, targetFaction, {
        ...relationship,
        standing: relationship.standing + standingChange,
    });
}

export function setRelationship<T extends Faction>(
    team: T,
    targetFaction: Faction,
    relationship: Relationship,
): T {
    return {
        ...team,
        relationships: {
            ...team.relationships,
            [targetFaction.entityId]: relationship,
        },
    };
}
