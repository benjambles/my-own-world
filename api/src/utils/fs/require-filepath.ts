import { IOEither, tryCatch2v } from 'fp-ts/lib/IOEither';
import { resolve } from 'path';

/**
 * Returns a Result monad holding the contents returned by `require`ing the given file.
 * @param basePath - The path to begin resolving from
 * @param parts - Additional steps to resolve to the correct path
 */
export const requireFilePath = (basePath: string, ...parts: string[]): IOEither<Error, any> => {
    return tryCatch2v(
        () => require(resolve(basePath, ...parts)),
        (reason) => new Error(String(reason))
    );
};
