import { getMockData } from '../../../data/get-mock-data.js';
import { RouteParams } from '../../../utils/get-route-handler.js';

export const homeRoute: RouteParams = {
    urlPattern: '/',
    templatePath: '@benjambles/mow-ui/dist/components/pages/public/home/home.js',
    dataFn: getMockData,
};
