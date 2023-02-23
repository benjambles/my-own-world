import { resolve } from 'path';
import { getMockData } from '../../../data/get-mock-data.js';
import { RouteParams } from '../../../utils/get-route-handler.js';

export const homeRoute: RouteParams = {
    urlPattern: '/',
    templatePath: resolve('./dist/routes/public/home/template.js'),
    dataFn: getMockData,
};
