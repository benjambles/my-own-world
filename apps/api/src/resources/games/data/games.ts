import {
    formatData,
    getDataFormatter,
} from '@benjambles/mow-server/dist/utils/data/index.js';
import { omit } from '@benjambles/mow-server/dist/utils/data/objects.js';
import { ModelResult, getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import { Consumable } from '@benjambles/skirmish-engine/dist/item/consumables/consumables.js';
import { Weapon } from '@benjambles/skirmish-engine/dist/item/weapons/weapons.js';
import { randomUUID } from 'crypto';
import { Db, ObjectId } from 'mongodb';
import { Env } from '../../../schema/env-schema.js';

const restrictedKeys = ['items', 'units'] as const;

//#region Types
export type Game = {
    _id: ObjectId;
    description: string;
    items: {
        armour: [];
        consumables: Consumable[];
        upgrades: [];
        weapons: Weapon[];
    };
    name: string;
    tags: string[];
    units: {
        _id: ObjectId;
        movement: {
            distance: number;
            environment: string;
            type: string; // 'rotory' | 'wing' | 'powered' | 'none';
        }[];
        playable: boolean;
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
    }[];
    version: string;
};

type NewGame = Pick<Game, 'description' | 'name' | 'tags' | 'version'>;
type UpdateGame = Pick<Game, 'description' | 'name' | 'tags'>;

type ToStringKeys = '_id';
type RestrictedKeys = (typeof restrictedKeys)[number];
type GameResponse = Omit<Game, RestrictedKeys | ToStringKeys> & {
    [key in ToStringKeys]: string;
};
//#endregion Types

export function getGamesCollection(db: Db) {
    return db.collection<Game>('Games');
}

export function getGameModel(db: Db, { ENC_SECRET }: Env) {
    const dataFormatter = formatData(getDataFormatter(ENC_SECRET));
    const games = getGamesCollection(db);

    const model = {
        dataFormatter,
        count: async function (query?: Partial<Game>): Promise<number> {
            return await games.countDocuments(query);
        },
        create: async function (data: NewGame): ModelResult<Game> {
            const gameData: Game = {
                ...data,
                _id: getObjectId(randomUUID()),
                items: { armour: [], consumables: [], upgrades: [], weapons: [] },
                units: [],
            };
            const cleanData = await dataFormatter(gameData);
            const { insertedId } = await games.insertOne(cleanData);

            return await model.find(insertedId.toString());
        },
        find: async function (uuid: string): ModelResult<Game> {
            const dbResult = await games.findOne({
                _id: getObjectId(uuid),
            });

            return {
                ok: !!dbResult,
                value: dbResult,
            };
        },
        get: async function (limit: number = 10, skip: number = 0): ModelResult<Game[]> {
            const dbResult = await games.find({ limit, skip }).toArray();

            return { ok: true, value: dbResult };
        },
        update: async function (
            uuid: string,
            data: Partial<UpdateGame>,
        ): ModelResult<Game> {
            const cleanData = await dataFormatter(data);
            const { ok, value } = await games.findOneAndUpdate(
                { _id: getObjectId(uuid) },
                { $set: cleanData },
                { includeResultMetadata: true },
            );

            return { ok: !!ok, value };
        },
    };

    return model;
}

export function cleanResponse(data: Game): GameResponse {
    return Object.assign(omit(data, restrictedKeys), {
        _id: data._id.toString(),
    });
}
