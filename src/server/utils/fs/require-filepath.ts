import * as Result from 'folktale/result';
import { resolve } from 'path';

/**
 * Returns a Result monad holding the contents returned by `require`ing the given file.
 * @param basePath - The path to begin resolving from
 * @param parts - Additional steps to resolve to the correct path
 */
const requireFilePath = (basePath: string, ...parts: string[]) => {
    try {
        return Result.Ok(require(resolve(basePath, ...parts)));
    } catch (e) {
        return Result.Error(e);
    }
};

export default requireFilePath;
