import error400 from './400.js';
import error403 from './403.js';
import error404 from './404.js';
import error500 from './500.js';

export default {
    '400': error400,
    '401': error403,
    '403': error403,
    '405': error403,
    '404': error404,
    '500': error500,
};
