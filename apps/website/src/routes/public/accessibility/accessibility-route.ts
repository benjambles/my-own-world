import { streamTemplate } from '../../../utils/stream-template.js';
import { RouteMethods, RouteConfig } from '../../routes-config.js';

export function accessibilityRoute(getData): RouteConfig {
    return {
        method: RouteMethods.Get,
        path: '/accessibility-policy',
        handler: async (ctx) => {
            const data = getData();

            await streamTemplate({
                ctx,
                data,
                importUrl: import.meta.url,
                renderFile: '../../../utils/render-template.js',
                rootComponent: '@benjambles/mow-ui/dist/components/pages/public/terms.js',
            });
        },
    };
}
