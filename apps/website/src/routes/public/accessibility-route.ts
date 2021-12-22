import { terms } from '@benjambles/mow-ui/dist/components/pages/public/terms.js';
import { LitRoute, RouteMethods } from '@benjambles/mow-ui/dist/utils/templates/lit-route.js';

export function accessibilityRoute(getData): LitRoute {
    return (litHtmlContext, render) => ({
        method: RouteMethods.Get,
        path: '/accessibility-policy',
        handler: async (ctx) => {
            const data = getData();
            const page = await render(terms(litHtmlContext, data));
            ctx.status = 200;
            ctx.body = page;
        },
    });
}
