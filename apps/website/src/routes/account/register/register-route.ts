import { streamTemplate } from '../../../utils/stream-template.js';
import { RouteMethods } from '../../routes.js';

export function registerRoute(getData) {
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
