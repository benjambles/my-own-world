import { streamTemplate } from '../../../utils/stream-template.js';
import { RouteMethods, RouteConfig } from '../../routes.js';

export function registerRoute(getData): RouteConfig {
    return {
        method: RouteMethods.Get,
        path: '/join',
        handler: async (ctx) => {
            const data = getData();
            await streamTemplate({
                ctx,
                data,
                importUrl: import.meta.url,
                renderFile: './register-renderer.js',
            });
        },
    };
}