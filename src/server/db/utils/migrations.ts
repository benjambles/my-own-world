import * as path from 'path';
import * as fs from 'fs';
import * as program from 'commander';
import { pool, getUUID } from './utils';
import { sql, _raw } from 'pg-extra';
import cmp from 'semver-compare';

/**
 * Load resources in `root` directory.
 * @param root The path within which to search for migrations
 * @api private
 */
function load(root: string): migration[] {
    return fs.readdirSync(root)
        .map((filePath: string) => loadFiles(root, filePath))
        .filter(isMigration)
        .sort(compare);
};

/**
 * Register a new migration if the path provided is not a folder
 * @param root the directory we searched in
 * @param file the path provided for the current file object
 */
function loadFiles(root: string, file: string): migration {
    const filePath: string = path.resolve(root, file);
    const stats: fs.Stats = fs.lstatSync(filePath);

    if (stats.isDirectory() === false) {
        const fileContents = require(filePath);
        return fileContents;
    }

    return;
}

/**
 * Compares semver values for sorting into order lowest first
 * @param a A migration object
 * @param b A migration object
 */
function compare(a: migration, b: migration): number {
    return cmp([a.version, b.version]);
}

/**
 * Checks to see if the migration object has the required parameters
 * @param fileContents a migrations object retrieved from a migrations file
 */
function isMigration(fileContents): boolean {
    return typeof fileContents.version === 'string' && typeof fileContents.up === 'function' && typeof fileContents.down === 'function';
}

/**
 * 
 * @param direction Up/Down direction to run migrations in
 * @param target Which version to end up at
 */
function migrate(direction: string = 'up', target: string = null): string {
    try {
        let migrations = load('../sql/migrations');
        let dbVersion = pool.one(sql`
            SELECT "value"
            FROM "system"
            WHERE "key" = "db_version"
        `);
        let startPosition: number = migrations.indexOf(dbVersion);
        let version: string;

        // if we're already at the target or there are no migrations to run, return
        if (!migrations.length || target === dbVersion) return dbVersion;

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

program
    .option('-D, --direction <direction>', 'Specify the direction [up/down]', 'up')
    .option('-t, --target <target>', 'specify the target db version', '')
    .parse(process.argv);

if (program.direction === 'down' && program.target === null) {
    throw new Error('You must provide a target version when rolling back the database');
}

console.log(migrate(program.direction, program.target));