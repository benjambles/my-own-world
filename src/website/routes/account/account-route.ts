import { layout } from '../../../ui/components/pages/layout.js';
import { LitRoute, RouteMethods } from '../../../ui/utils/templates/lit-route.js';

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
