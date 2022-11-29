import { Db } from 'mongodb';
import * as queries from './queries.js';

/**
 *
 */
export async function getSystemKey(dbInstance: Db, key: string): Promise<any> {
    const system = dbInstance.collection('System');

    return await queries.getSystemKey(system, key);
}
