import { streamTemplate } from '../../../utils/stream-template.js';
import { RouteMethods } from '../../routes.js';

export function accountRoute(getData) {
    return {
        method: RouteMethods.Get,
        path: '/account',
        handler: async (ctx) => {
            const data = getData();
            await streamTemplate({
                ctx,
                data,
                importUrl: import.meta.url,
                renderFile: './account-render.js',
            });
        },
    };
}
