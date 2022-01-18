import { streamTemplate } from '../../../utils/stream-template.js';
import { RouteMethods, RouteConfig } from '../../routes.js';

export function homeRoute(getData): RouteConfig {
    return {
        method: RouteMethods.Get,
        path: '/',
        handler: async (ctx) => {
            const data = getData();

            await streamTemplate({
                ctx,
                data,
                importUrl: import.meta.url,
                renderFile: './home-renderer.js',
            });
        },
    };
}
