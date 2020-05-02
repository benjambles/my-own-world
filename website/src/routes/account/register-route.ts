import { layout } from '../../components/pages/layout';
import { mockData } from '../../static/mock-data';
import { LitRoute, RouteMethods } from '../../utils/templates/lit-route';

export const registerRoute: LitRoute = (litHtmlContext, render) => ({
    method: RouteMethods.get,
    path: '/join',
    handler: async ctx => {
        const page = await render(layout(litHtmlContext, mockData));
        ctx.status = 200;
        ctx.body = page;
    },
});
