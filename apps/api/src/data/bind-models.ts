import { Simplify } from '@benjambles/js-lib/dist/index.js';
import { Db } from 'mongodb';
import { getArchetypeModel } from '../resources/games/data/archetypes.js';
import { getGameModel } from '../resources/games/data/games.js';
import { getItemsModel } from '../resources/games/data/items.js';
import { getServiceModel } from '../resources/service/service.js';
import { getSkirmishModel } from '../resources/skirmishes/skirmishes.js';
import { getIdentifierModel } from '../resources/users/data/identifiers.js';
import { getTokenModel } from '../resources/users/data/tokens.js';
import { getUserModel } from '../resources/users/data/users.js';
import { Env } from '../schema/env-schema.js';
import { getNpcModel } from '../resources/games/data/npcs.js';
import { getMissionModel } from '../resources/games/data/missions.js';

type Model = (db: Db, env: Partial<Env>) => ModelReturn;
type BinderData = Record<string, ModelReturn>;
type ModelReturn = Record<string, (...args: unknown[]) => unknown>;

type Binder2<T extends BinderData = {}> = {
    bind: <K extends string, V extends Model>(
        key: K extends keyof T ? never : K,
        model: V,
    ) => Binder2<Simplify<T & { [key in K]: ReturnType<V> }>>;
    get: () => {
        getKey: <K extends keyof T>(key: K) => T[K];
    };
};

function withDb(db: Db, env: Env): Binder2 {
    function binder(data) {
        return {
            bind(key, model) {
                return binder(Object.assign(data, { [key]: model(db, env) }));
            },
            // This looks awkward but generates a significantly smaller type signature
            get() {
                return {
                    getKey(key) {
                        return data[key];
                    },
                };
            },
        };
    }

    return binder({});
}

export function bindModels(db: Db, env: Env) {
    return withDb(db, env)
        .bind('archetypes', getArchetypeModel)
        .bind('games', getGameModel)
        .bind('identifiers', getIdentifierModel)
        .bind('items', getItemsModel)
        .bind('missions', getMissionModel)
        .bind('npcs', getNpcModel)
        .bind('skirmishes', getSkirmishModel)
        .bind('system', getServiceModel)
        .bind('tokens', getTokenModel)
        .bind('users', getUserModel)
        .get();
}
