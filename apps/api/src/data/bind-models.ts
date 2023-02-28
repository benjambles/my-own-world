import { Simplify } from '@benjambles/js-lib/dist/index.js';
import { ModelOptions } from '@benjambles/mow-server/dist/utils/data/index.js';
import { Db } from 'mongodb';
import { getServiceModel } from '../resources/service/service.js';
import { talesModel } from '../resources/tales/tales.js';
import { getIdentifierModel } from '../resources/users/data/identifiers.js';
import { getUserModel } from '../resources/users/data/users.js';
import { Env } from '../schema/env-schema.js';

type Model = (db: Db, env: any) => ModelReturn;

type BinderData = {
    [name: string]: ModelReturn;
};

type ModelReturn = {
    [name: string]: ModelOptions | Function;
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
        .bind('users', getUserModel)
        .bind('identifiers', getIdentifierModel)
        .bind('system', getServiceModel)
        .bind('tales', talesModel)
        .get();
}
