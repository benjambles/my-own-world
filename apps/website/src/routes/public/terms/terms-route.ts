import { streamTemplate } from '../../../utils/stream-template.js';
import { RouteMethods, RouteConfig } from '../../routes.js';

export function termsRoute(getData): RouteConfig {
    return {
        method: RouteMethods.Get,
        path: '/terms',
        handler: async (ctx) => {
            const data = getData();
            await streamTemplate({
                ctx,
                data,
                importUrl: import.meta.url,
                renderFile: './terms-renderer.js',
            });
        },
    };
}
