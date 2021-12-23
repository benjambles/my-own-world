import { streamTemplate } from '../../../utils/stream-template.js';
import { RouteMethods } from '../../routes.js';

export function homeRoute(getData) {
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
