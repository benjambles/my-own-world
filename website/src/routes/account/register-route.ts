import { layout } from '../../components/pages/layout';
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

export function RegisterRoute(
    litHtmlContext: clientContext,
    render: clientRender
): clientRouteConfig;
export function RegisterRoute(
    litHtmlContext: serverContext,
    render: serverRenderer
): serverRouteConfig;
export function RegisterRoute(litHtmlContext, render) {
    return {
        method: 'get',
        path: '/join',
        handler: async ctx => {
            const page = await render(layout(litHtmlContext, mockData));
            ctx.status = 200;
            ctx.body = page;
        },
    };
}
