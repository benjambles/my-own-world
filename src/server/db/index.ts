import { extend, parseUrl } from 'pg-extra';
import * as pg from 'pg';
import { db } from '../lib/config';
import * as libKnex from 'knex';

const postgres = extend(pg);

export const pool = new postgres.Pool(db);
export const knex = libKnex({ client: 'pg' });
