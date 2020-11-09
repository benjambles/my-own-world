import { resolve } from 'path';

/**
 * Returns the contents retrieved by `require`ing the given file.
 * @param basePath - The path to begin resolving from
 * @param parts - Additional steps to resolve to the correct path
 */
export const requireFilePath = (basePath: string, ...parts: string[]) => {
    try {
        return require(resolve(basePath, ...parts));
    } catch (e) {
        throw new Error(`Could not load requested file at ${resolve(basePath, ...parts)}`);
    }
};
