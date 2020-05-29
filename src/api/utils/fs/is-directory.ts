import { fromPredicate, Option } from 'fp-ts/lib/Option';
import { lstatSync } from 'fs';

/**
 * Wrapper around the FS api to check if a given path is a directory
 * @param filePath
 */
export const isDirectory = (filePath: string): boolean => lstatSync(filePath).isDirectory();

/**
 *
 * @param filePath
 */
export const maybeIsDirectory: (filePath: string) => Option<string> = fromPredicate(isDirectory);
