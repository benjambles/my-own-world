import { streamTemplate } from '../../../utils/stream-template.js';
import { RouteMethods, RouteConfig } from '../../routes.js';

export function privacyRoute(getData): RouteConfig {
    return {
        method: RouteMethods.Get,
        path: '/privacy-policy',
        handler: async (ctx) => {
            const data = getData();

            await streamTemplate({
                ctx,
                data,
                importUrl: import.meta.url,
                renderFile: './privacy-renderer.js',
            });
        },
    };
}
