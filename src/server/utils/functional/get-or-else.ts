/**
 * Curried function to extract a value from a Monad with a default
 * @param orElse - The result to return when the monad contains Nothing
 * @param m - A Folktale monadic structure
 */
const getOrElse = (orElse: any) => m => m.getOrElse(orElse);
export default getOrElse;
