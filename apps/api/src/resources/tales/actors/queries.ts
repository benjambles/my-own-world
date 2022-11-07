import { result } from '@benjambles/mow-server/dist/utils/db.js';

interface Actor {
    _id: string;
    isDeleted: boolean;
    npcType: string;
    name: string;
}

export interface NPC extends Actor {}

export interface Trigger {
    uuid: string;
    requirements: {
        flags: {
            [key: string]: boolean;
        };
        items: {
            [key: string]: number;
        };
        time: number;
    };
    changes: {
        flags: {
            [key: string]: boolean;
        };
        items: {
            [key: string]: number;
        };
        time: number;
    };
}

export interface Enemy extends Actor {
    npcType: 'enemy';
    type: string;
    size: [number, number];
    rank: string;
    stats: {
        toughness: number;
        resistance: number;
        hp: {
            max: number;
            current: number;
        };
        movement: number;
    };
    characteristics: Characteristic[];
    actions: {
        basic: Action[];
        special: Action[];
    };
    actionTree: [
        ActionBranch,
        ActionBranch?,
        ActionBranch?,
        ActionBranch?,
        ActionBranch?,
        ActionBranch?,
    ];
}

interface ActionBranch {
    roll: number;
    steps: [
        [ActionId?],
        [ActionId?, ActionId?, ActionId?],
        [ActionId?, ActionId?, ActionId?],
    ];
}

interface Action {
    uuid: ActionId;
    name: string;
    type: string;
    range: number;
    effect: string;
}

type ActionId = string;

interface Characteristic {
    name: string;
    id: string;
    description: string;
}

/**
 * Retrieve a actor with a matching uuid from the database
 * @param uuid - A valid uuid
 */
export async function getActiveActorByUuid(actors, uuid): Promise<Actor> {
    const data: Actor = await actors.findOne({
        _id: uuid,
        isDeleted: false,
    });

    return result('There was an error whilst fetching the actor', data);
}

/**
 * Fetch a list of active actors from the database filtered by parameters
 * @param limit - The number of records to fetch
 * @param skip - The number of records to skip
 */
export async function getActiveActors(
    actors,
    projectId: string,
    limit: number = 10,
    skip: number = 0,
): Promise<Actor[]> {
    const data: Actor[] = await actors
        .find(
            {
                isDeleted: false,
                projectId,
            },
            { limit, skip },
        )
        .toArray();

    return result('There was an error whilst fetching actors', data);
}

/**
 * Create a new actor from validated data
 * @param data - The formatted data ready for storage
 */
export async function createActor(actors, actorData: Actor): Promise<Actor> {
    const { insertedId } = await actors.insertOne(actorData);
    const data = await getActiveActorByUuid(actors, insertedId);

    return result('There was an error whilst creating the actor', data);
}

/**
 * Delete a actor with a given ID
 * @param uuid - A valid uuid
 */
export async function deleteActor(actors, uuid): Promise<boolean> {
    const data: boolean = await actors.findOneAndUpdate(
        { _id: uuid },
        { $set: { isDeleted: true } },
        { actorion: { isDeleted: 1 } },
    );

    return result('There was an error whilst updating the actor', data);
}

/**
 * Updates a actor record with the patch provided
 * @param uuid - A UUID representing the actor to be updated
 * @param data - An object representing a patch on a actor
 */
export async function updateActor(actors, uuid, actorData: Actor): Promise<Actor> {
    const data: Actor = await actors.findOneAndUpdate({ _id: uuid }, { $set: actorData });

    return result('There was an error whilst updating the actor', data);
}
