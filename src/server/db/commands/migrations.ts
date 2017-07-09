import * as semver from 'semver';
import * as readline from 'readline';
import { sql } from 'pg-extra';
import { pool } from '../';
import { getUUID } from '../../lib/utils';
import { load } from '../utils/migrations';
import { migrationsPath } from '../../lib/config';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * 
 * @param direction Up/Down direction to run migrations in
 * @param target Which version to end up at
 */
async function migrate(direction: string = 'up', target: string = null): Promise<string> {
    try {
        let migrations = load(migrationsPath);
        let dbVersion = await pool.one(sql`
            SELECT "value"
            FROM "System"
            WHERE "key" = "db_version"
        `);
        let startPosition: number = migrations.indexOf(dbVersion);
        let version: string;

        // if we're already at the target or there are no migrations to run, return
        if (!migrations.length || target === dbVersion) return dbVersion;

        let valid = migrations.filter(function (migration) {
            return migration.version === target;
        });

        if (!valid.length) {
            throw new Error('The target chosen does not exist as an accessible migration');
        }

        for (let v of step(migrations, target, direction, startPosition)) {
            version = v;
        }

        return version;

    } catch (e) {
        throw e;
    }
}

/**
 * Iterates over a collection of migration objects running each and yielding the version
 * @param migrations Migration object loaded from file
 * @param target The version we hope to get to
 * @param direction Update or rollback (up/down)
 * @param startPosition The index of the migration the representing current version of the database
 */
function* step(migrations: any[], target: string = '', direction: string = 'up', startPosition: number = 0): IterableIterator<string> {
    let position: number = startPosition;
    let previousVersion: string = '';

    switch (direction) {
        case 'down':
            while (true) {
                const migration: migration = migrations[position];
                if (!migration || target === migration.version) return;
                migration.down();
                --position;
                yield migration.version;
            }
        case 'up':
        default:
            while (true) {
                const migration: migration = migrations[position];
                if (target === previousVersion || !migration) return;
                migration.up();
                ++position;
                previousVersion = migration.version;
                yield migration.version;
            }
    }
}

/*
 * Terminal prompt Q&A to establish migration requirements
 */
rl.question("Which direction would you like to run your migrations in? [up/down] default: up", function (direction) {
    direction = direction ? direction.toLowerCase() : 'up';

    if (!['up', 'down'].includes(direction)) {
        console.log("Invalid direction, please choose up or down");
        rl.close();
    }

    rl.question("What is the target version that you wish to migrate to", async function (version = '') {
        if (version !== '' && !semver.valid(version)) {
            console.log("The version must be a valid semver target, or blank");
            rl.close();
        }

        let newVersion = await migrate(direction, version);

        console.log(`Database successfully migrated to version ${newVersion}`);

        rl.close();
    });
});