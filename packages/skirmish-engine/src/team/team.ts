import { Character } from '../character/character.js';
import { canAffordPurchase, Transactor } from '../credits/value.js';
import { GameEntity } from '../index.js';
import { EquipableItem, Item } from '../item/item.js';
import { Faction } from '../relationships/relationships.js';
import { addMember, CharacterGroup } from './members.js';
import { Squad } from './squad.js';

/**
 * A team represents the current state of a players available resources and relationships.
 * These are what are available when going on missions.
 */
export interface Team extends Transactor, Faction, GameEntity, CharacterGroup {
    equipment: (Item | EquipableItem)[];
    squads: Squad[];
}

export function createTeam(
    name: string,
    credits: number,
    description: string,
    teamNumber: number,
): Team {
    const team = {
        entityId: `team-${teamNumber}`,
        credits,
        description,
        name,
        equipment: [],
        members: [],
        relationships: {},
        squads: [],
    };

    return team;
}

export function addTeamMember(team: Team, character: Character): Team {
    if (!canAffordPurchase(team, character)) {
        throw new Error('game::team::not_purchasable');
    }

    return addMember(team, character);
}
