import { Home } from '../../components/pages/public/home';
import { mockData } from '../../static/mock-data';
import {
    clientContext,
    clientRender,
    clientRouteConfig,
} from '../../utils/templates/client-context';
import {
    serverContext,
    serverRenderer,
    serverRouteConfig,
} from '../../utils/templates/server-context';

export function HomeRoute(litHtmlContext: clientContext, render: clientRender): clientRouteConfig;
export function HomeRoute(litHtmlContext: serverContext, render: serverRenderer): serverRouteConfig;
export function HomeRoute(litHtmlContext, render) {
    return {
        method: 'get',
        path: '/',
        handler: async ctx => {
            const page = await render(Home(litHtmlContext, mockData));
            ctx.status = 200;
            ctx.body = page;
        },
    };
}
