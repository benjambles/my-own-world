import { terms } from '../../../ui/components/pages/public/terms.js';
import { LitRoute, RouteMethods } from '../../../ui/utils/templates/lit-route.js';

export function privacyRoute(getData): LitRoute {
    return (litHtmlContext, render) => ({
        method: RouteMethods.Get,
        path: '/privacy-policy',
        handler: async (ctx) => {
            const data = getData();
            const page = await render(terms(litHtmlContext, data));
            ctx.status = 200;
            ctx.body = page;
        },
    });
}
