import { ModelResult } from '@benjambles/mow-server/dist/utils/db.js';
import { Db } from 'mongodb';

export function getServiceModel(db: Db) {
    const system = db.collection('System');

    return {
        find: async function getSystemKey(key: string): ModelResult<any> {
            const { ok, value } = await system.findOne({ key });

            return { ok, value };
        },
    };
}
