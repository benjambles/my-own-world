import { layout } from '@benjambles/mow-ui/lib/components/pages/layout.js';
import { LitRoute, RouteMethods } from '@benjambles/mow-ui/lib/utils/templates/lit-route.js';

export function accountRoute(getData): LitRoute {
    return (litHtmlContext, render) => ({
        method: RouteMethods.Get,
        path: '/account',
        handler: async (ctx) => {
            const data = getData();
            const page = await render(layout(litHtmlContext, data));
            ctx.status = 200;
            ctx.body = page;
        },
    });
}
