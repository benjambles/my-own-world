import { getMockData } from '../../../data/get-mock-data.js';
import { RouteParams } from '../../../utils/get-route-handler.js';

export const accountRoute: RouteParams = {
    urlPattern: '/account',
    templatePath: '@benjambles/mow-ui/dist/components/pages/public/terms.js',
    dataFn: getMockData,
};
