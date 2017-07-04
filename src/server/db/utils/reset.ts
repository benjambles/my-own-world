import * as path from 'path';
import * as fs from 'fs';
import { pool } from './utils';
import { NODE_ENV } from '../../lib/constants';

// //////////////////////////////////////////////////////////

// Sanity check: Ensure this isn't being run in production

if (NODE_ENV !== 'development') {
    throw new Error('[reset_db] May only reset database in development mode')
}

// //////////////////////////////////////////////////////////

function slurpSql(filePath) {
    const relativePath = 'sql/' + filePath
    const fullPath = path.join(__dirname, relativePath)

    return new Promise((resolve, reject) => {
        fs.readFile(fullPath, 'utf8', (err, text) => {
            if (err) {
                return reject(err);
            }
            resolve(text);
        });
    });
}

async function seed() {
    console.log('Resetting the database...')

    await (async () => {
        const sql = await slurpSql('schema.sql');
        console.log('-- Executing schema.sql...');
        await pool._query(sql);
    })();
}

seed().then(function () {
    console.log('Finished resetting db');
    process.exit(0);
}, function (err) {
    console.error('Error:', err, err.stack);
    process.exit(1);
});