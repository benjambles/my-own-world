import * as fs from 'fs';
import * as path from 'path';
import * as semver from 'semver';

/**
 * Load resources in `root` directory.
 * @param root The path within which to search for migrations
 * @api private
 */
export function load(root: string): migration[] {
    return fs
        .readdirSync(root)
        .map((filePath: string) => loadFiles(root, filePath))
        .filter(isMigration)
        .sort(compare);
}

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
    return semver.compare(a.version, b.version);
}

/**
 * Checks to see if the migration object has the required parameters
 * @param fileContents a migrations object retrieved from a migrations file
 */
function isMigration(fileContents): boolean {
    return (
        typeof fileContents.version === 'string' &&
        typeof fileContents.up === 'function' &&
        typeof fileContents.down === 'function'
    );
}
