/**
 * Curried function to extract a value from a Monad with a default
 * @param orElse - The result to return when the monad contains Nothing
 * @param m - A monadic structure
 */
export const getOrElse = <T>(orElse: T) => (m) => m.getOrElse(orElse);
