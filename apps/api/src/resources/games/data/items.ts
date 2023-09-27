import { getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import { Db } from 'mongodb';
import { Game, getGamesCollection } from './games.js';

//#region Types
export type Items = Game['items'];

type NewItems = Partial<Items>;
type DeleteItems = Partial<Record<keyof Items, string[]>>;
//#endregion Types

export function getItemsModel(db: Db) {
    const games = getGamesCollection(db);

    const model = {
        delete: async function (gameId: string, data: DeleteItems) {
            const preparedData = Object.fromEntries(
                Object.entries(data).map(([key, _ids]) => {
                    return [`items.${key}`, { _id: { $in: _ids } }];
                }),
            );

            const dbResult = await games.findOneAndUpdate(
                { _id: getObjectId(gameId) },
                { $pull: preparedData },
                { projection: { items: 1 } },
            );

            return { ok: !!dbResult, value: dbResult?.items };
        },
        get: async function (gameId: string, fields?: string[]) {
            const itemProject = fields
                ? Object.fromEntries(fields.filter(isKey).map((field) => [field, 1]))
                : 1;
            const dbResult = await games.findOne(
                { _id: getObjectId(gameId) },
                { projection: { items: itemProject } },
            );

            return { ok: !!dbResult, value: dbResult?.items };
        },
        update: async function (gameId: string, data: NewItems) {
            const preparedData = Object.fromEntries(
                Object.entries(data).map(([key, items]) => {
                    return [`items.${key}`, { $each: items }];
                }),
            );

            const dbResult = await games.findOneAndUpdate(
                { _id: getObjectId(gameId) },
                { $push: preparedData },
                { projection: { items: 1 } },
            );

            return { ok: !!dbResult, value: dbResult?.items };
        },
    };

    return model;
}

function isKey(key) {
    return ['consumables', 'items', 'upgrades', 'weapons'].includes(key);
}
