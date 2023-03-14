import { resolve } from 'path';
import { getMockData } from '../../../data/get-mock-data.js';
import { RouteParams } from '../../../utils/get-route-handler.js';

export const privacyRoute: RouteParams = {
    urlPattern: '/privacy-policy',
    templatePath: resolve('./dist/routes/public/terms/terms.js'),
    dataFn: getMockData,
};
