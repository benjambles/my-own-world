import { none, Option, some } from 'fp-ts/lib/Option';
import * as fs from 'fs';
/**
 * Wrapper around the FS api to check if a given path is a directory
 * @param filePath
 */
export const isDirectory = (filePath: string): boolean => fs.lstatSync(filePath).isDirectory();

export const maybeIsDirectory = (filePath: string): Option<string> => {
    return isDirectory(filePath) ? some(filePath) : none;
};
