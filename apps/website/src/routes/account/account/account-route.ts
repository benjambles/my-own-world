import { resolve } from 'path';
import { getMockData } from '../../../data/get-mock-data.js';
import { RouteParams } from '../../../utils/get-route-handler.js';

export const accountRoute: RouteParams = {
    urlPattern: '/account',
    templatePath: resolve('./dist/routes/public/terms/terms.js'),
    dataFn: getMockData,
};
