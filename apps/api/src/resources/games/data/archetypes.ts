import { ModelResult, getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import { Db, ObjectId } from 'mongodb';
import { getGamesCollection } from './games.js';
import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';

const restrictedKeys = ['deletedOn', 'isDeleted'] as const;

//#region Types
export type Archetype = {
    _id: ObjectId;
    deletedOn: Date;
    isDeleted: boolean;
    movement: {
        distance: number;
        environment: string;
        type: string; // 'rotory' | 'wing' | 'powered' | 'none';
    }[];
    playable: boolean;
    points: number;
    species: string;
    stats: {
        abbreviation: string;
        group: string;
        key: string;
        value: string;
    }[];
    type: string; // 'organic' | 'synthetic'
    traits: {
        base: string[];
        options: string[];
    };
};

type ToStringKeys = '_id';
type RestrictedKeys = (typeof restrictedKeys)[number];

type NewArchetype = Omit<Archetype, ToStringKeys | RestrictedKeys>;
type UpdateArchetype = Partial<NewArchetype>;

export type ArchetypeResponse = Omit<Archetype, RestrictedKeys | ToStringKeys> & {
    [key in ToStringKeys]: string;
};
//#endregion Types

export function getArchetypeModel(db: Db) {
    const games = getGamesCollection(db);

    const model = {
        create: async function (
            gameId: string,
            data: NewArchetype,
        ): ModelResult<Archetype> {
            const { ok, value } = await games.findOneAndUpdate(
                { _id: getObjectId(gameId) },
                {
                    $push: {
                        archetypes: {
                            ...data,
                            _id: getObjectId(),
                            isDeleted: false,
                            deletedOn: undefined,
                        },
                    },
                },
                {
                    includeResultMetadata: true,
                    projection: { archetypes: { $slice: -1 } },
                },
            );

            return { ok: !!ok, value: value?.archetypes[0] };
        },
        delete: async function (unitId: string, gameId: string) {
            const { ok } = await games.findOneAndUpdate(
                { _id: getObjectId(gameId) },
                {
                    $pull: {
                        archetypes: {
                            _id: getObjectId(unitId),
                            isDeleted: true,
                            deletedOn: new Date(),
                        },
                    },
                },
                { includeResultMetadata: true, projection: { _id: 1 } },
            );

            return { ok: !!ok };
        },
        get: async function (
            gameId: string,
            limit: number,
            skip: number = 0,
        ): ModelResult<{ count: number; items: Archetype[] }> {
            const dbResult = await games.findOne(
                { _id: getObjectId(gameId) },
                { projection: { archetypes: 1 } },
            );

            return {
                ok: !!dbResult,
                value: {
                    count: dbResult?.archetypes.length,
                    items: limit
                        ? dbResult?.archetypes.slice(skip, skip + limit)
                        : dbResult?.archetypes ?? [],
                },
            };
        },
        update: async function (
            uuid: string,
            gameId: string,
            data: Partial<UpdateArchetype>,
        ): ModelResult<Archetype> {
            const { ok, value } = await games.findOneAndUpdate(
                {
                    _id: getObjectId(gameId),
                    'archetypes._id': uuid,
                },
                {
                    $set: {
                        'archetypes.$': data,
                    },
                },
                {
                    includeResultMetadata: true,
                    projection: { archetypes: { $slice: -1 } },
                },
            );

            return { ok: !!ok, value: value?.archetypes[0] };
        },
    };

    return model;
}

export function cleanArchetypeResponse(data: Archetype): ArchetypeResponse {
    return Object.assign(omit(data, restrictedKeys), { _id: data._id.toString() });
}
