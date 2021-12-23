import { streamTemplate } from '../../../utils/stream-template.js';
import { RouteMethods } from '../../routes.js';

export function privacyRoute(getData) {
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
