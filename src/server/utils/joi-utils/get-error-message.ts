import { map } from 'ramda';
import maybeProp from '../functional/maybe-prop';

const getErrorMessage = error =>
    maybeProp('details', error)
        .map(map(({ message, path }) => ({ error: message, field: path })))
        .getOrElse(error.msg);

export default getErrorMessage;
