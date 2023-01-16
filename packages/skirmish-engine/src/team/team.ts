import { Merge, PartialBy } from '@benjambles/js-lib/dist/index.js';
import { canAffordPurchase } from '../credits/value.js';
import { EquipableItem, Item } from '../item/item.js';
import { Character } from './character/character.js';
import { addMember, CharacterGroup } from './members.js';
import { Faction } from './relationships/relationships.js';
import { Squad } from './squad.js';

/**
 * A team represents the current state of a players available resources and relationships.
 * These are what are available when going on missions.
 */
export interface Team extends Faction, CharacterGroup {
    equipment: (Item | EquipableItem)[];
    squads: Squad[];
}

type NewTeamInfo = Merge<
    PartialBy<Pick<Team, 'name' | 'credits' | 'description'>, 'credits'>,
    { teamNumber: number }
>;

export function createTeam({
    name,
    credits,
    description,
    teamNumber,
}: NewTeamInfo): Team {
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

export function addTeamMember(character: Character, team: Team): Team {
    if (!canAffordPurchase(character, team)) {
        throw new Error('game::team::not_purchasable');
    }

    return addMember(character, team);
}
