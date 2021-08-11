import { terms } from '@benjambles/mow-ui/lib/components/pages/public/terms.js';
import { LitRoute, RouteMethods } from '@benjambles/mow-ui/lib/utils/templates/lit-route.js';

export function termsRoute(getData): LitRoute {
    return (litHtmlContext, render) => ({
        method: RouteMethods.Get,
        path: '/terms',
        handler: async (ctx) => {
            const data = getData();
            const page = await render(terms(litHtmlContext, data));
            ctx.status = 200;
            ctx.body = page;
        },
    });
}
