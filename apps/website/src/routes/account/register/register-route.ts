import { resolve } from 'path';
import { getMockData } from '../../../data/get-mock-data.js';
import { RouteParams } from '../../../utils/get-route-handler.js';

export const registerRoute: RouteParams = {
    urlPattern: '/join',
    templatePath: resolve('./dist/routes/public/terms/template.js'),
    dataFn: getMockData,
};
