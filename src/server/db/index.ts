import * as libKnex from 'knex';
import * as pg from 'pg';
import { extend, _raw } from 'pg-extra';
import { compose, isNil } from 'ramda';
import { db } from '../utils/config';

const postgres = extend(pg);

export const pool = new postgres.extra.Pool(db);
export const knex = libKnex({ client: 'pg' });

/**
 * Run a Knex query for a single result through the pool
 * @param {object} query - A Knex query object
 */
export function getOneRaw(query) {
    return pool.one(_raw`${query}`);
}

/**
 * Run a Knex query for multiple results through the pool
 * @param {object} query - A Knex query object
 */
export function getManyRaw(query) {
    return pool.many(_raw`${query}`);
}

/**
 * On a null query response throw an error to the response handler otherwise return
 * @param {string} error - Error message to throw with
 * @param {any} data - Response from query
 */
export function result(error: string, data: any): never | any {
    if (isNil(data)) {
        throw new Error(error);
    }

    return data;
}
