import { extend, parseUrl } from 'pg-extra';
import * as pg from 'pg';
import { db } from '../../lib/constants';
import * as libKnex from 'knex';
import * as uuidv5 from 'uuid/v5';
import { uuidv5_NS } from '../../lib/constants';

const postgres = extend(pg);

export const pool = new postgres.Pool(db);
export const knex = libKnex({ client: 'pg' });

/**
 * Return a namespaced UUID using UUIDv5
 * @param value 
 */
export function getUUID(value: string) {
    return uuidv5(uuidv5_NS, value);
};

// String -> Bool
export function isValidUuid(uuid) {
    const re = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/
    return re.test(uuid)
}
