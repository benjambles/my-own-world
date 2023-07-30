import { ToUnion } from '@benjambles/js-lib/dist/index.js';
import { eqProps } from '@benjambles/js-lib/dist/objects/props.js';
import { Faction, getRelationship } from './relationships.js';

const severity = ['trivial', 'small', 'medium', 'large'] as const;
type Severity = ToUnion<typeof severity>;

export interface Favour {
    description: string;
    faction: string;
    owedFrom: Date;
    severity: Severity;
}

export function createFavour(
    description: string,
    owedFrom: Date,
    severity: Severity,
    targetFaction: Faction,
): Favour {
    return {
        description,
        owedFrom,
        severity,
        faction: targetFaction.entityId,
    };
}

export function addFavour<T extends Faction>(
    team: T,
    targetFaction: Faction,
    favour: Favour,
): T {
    const favours = getFavours(team, targetFaction);
    favours.push(favour);

    return team;
}

export function removeFavour<T extends Faction>(
    team: T,
    targetFaction: Faction,
    favour: Favour,
): T {
    const favours = getFavours(team, targetFaction).filter((currentFavour) =>
        eqProps('owedFrom', currentFavour, favour),
    );

    return setFavours(team, targetFaction, favours);
}

export function getFavours<T extends Faction>(team: T, targetFaction: Faction): Favour[] {
    const relationship = getRelationship(team, targetFaction);

    if (!relationship) {
        throw new Error('game::favours::no_relationship');
    }

    return relationship.favours;
}

function setFavours<T extends Faction>(
    team: T,
    targetFaction: Faction,
    favours: Favour[],
): T {
    const relationship = getRelationship(team, targetFaction);
    relationship.favours = favours;

    return team;
}
