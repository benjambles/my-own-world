import { resolveImportPath } from '@benjambles/mow-server/dist/utils/paths.js';
import { getMockData } from '../../../data/get-mock-data.js';
import { RouteParams } from '../../../utils/get-route-handler.js';

export const route: RouteParams = {
    urlPattern: '/campaigns',
    templatePath: resolveImportPath(import.meta.url, 'template.js'),
    dataFn: getMockData,
};
