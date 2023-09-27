import { Simplify } from '@benjambles/js-lib/dist/index.js';
import { Db } from 'mongodb';
import { getGameModel } from '../resources/games/data/games.js';
import { getServiceModel } from '../resources/service/service.js';
import { getSkirmishModel } from '../resources/skirmishes/skirmishes.js';
import { getIdentifierModel } from '../resources/users/data/identifiers.js';
import { getTokenModel } from '../resources/users/data/tokens.js';
import { getUserModel } from '../resources/users/data/users.js';
import { Env } from '../schema/env-schema.js';
import { getUnitModel } from '../resources/games/data/units.js';
import { getItemsModel } from '../resources/games/data/items.js';

type Model = (db: Db, env: any) => ModelReturn;

type BinderData = {
    [name: string]: ModelReturn;
};

type ModelReturn = {
    [name: string]: Function;
};

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
        .bind('games', getGameModel)
        .bind('identifiers', getIdentifierModel)
        .bind('items', getItemsModel)
        .bind('skirmishes', getSkirmishModel)
        .bind('system', getServiceModel)
        .bind('tokens', getTokenModel)
        .bind('units', getUnitModel)
        .bind('users', getUserModel)
        .get();
}
