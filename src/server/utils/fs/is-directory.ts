import { none, Option, some } from 'fp-ts/lib/Option';
import * as fs from 'fs';

/**
 * Wrapper around the FS api to check if a given path is a directory
 * @param filePath
 */
export function isDirectory(filePath: string): boolean {
    return fs.lstatSync(filePath).isDirectory();
}

/**
 *
 * @param filePath
 */
export function maybeIsDirectory(filePath: string): Option<string> {
    return isDirectory(filePath) ? some(filePath) : none;
}
