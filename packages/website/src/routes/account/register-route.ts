import { layout } from '@benjambles/mow-ui/lib/components/pages/layout.js';
import { LitRoute, RouteMethods } from '@benjambles/mow-ui/lib/utils/templates/lit-route.js';

export function registerRoute(getData): LitRoute {
    return (litHtmlContext, render) => ({
        method: RouteMethods.Get,
        path: '/join',
        handler: async (ctx) => {
            const data = getData();
            const page = await render(layout(litHtmlContext, data));
            ctx.status = 200;
            ctx.body = page;
        },
    });
}
