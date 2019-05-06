import maybeProp from '../../utils/functional/maybe-prop';
import getSecurityHandlers from '../get-security-handlers';
import * as Maybe from 'folktale/maybe';

/**
 *
 * @param spec
 */
const parseSecuritySpec = spec =>
    maybeProp('security', spec)
        .map(getSecurityHandlers)
        .alt(Maybe.Just([]));

export default parseSecuritySpec;
