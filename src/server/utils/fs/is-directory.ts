import * as fs from 'fs';

/**
 * Wrapper around the FS api to check if a given path is a directory
 * @param filePath
 */
const isDirectory = (filePath: string): boolean => fs.lstatSync(filePath).isDirectory();
export default isDirectory;
