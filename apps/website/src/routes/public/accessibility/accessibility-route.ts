import { streamTemplate } from '../../../utils/stream-template.js';
import { RouteMethods } from '../../routes.js';

export function accessibilityRoute(getData) {
    return {
        method: RouteMethods.Get,
        path: '/accessibility-policy',
        handler: async (ctx) => {
            const data = getData();

            await streamTemplate({
                ctx,
                data,
                importUrl: import.meta.url,
                renderFile: './accessibility-renderer.js',
            });
        },
    };
}
