import { terms } from '../../components/pages/public/terms';
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

export function TermsRoute(litHtmlContext: clientContext, render: clientRender): clientRouteConfig;
export function TermsRoute(
    litHtmlContext: serverContext,
    render: serverRenderer
): serverRouteConfig;
export function TermsRoute(litHtmlContext, render) {
    return {
        method: 'get',
        path: '/terms',
        handler: async ctx => {
            const page = await render(terms(litHtmlContext, mockData));
            ctx.status = 200;
            ctx.body = page;
        },
    };
}
