import { clientContext, clientRender, clientRouteConfig } from './client-context';
import { serverContext, serverRenderer, serverRouteConfig } from './server-context';

export enum RouteMethods {
    get = 'get',
    post = 'post',
    options = 'options',
}

export interface LitRoute {
    (litHtmlContext: clientContext, render: clientRender): clientRouteConfig;
    (litHtmlContext: serverContext, render: serverRenderer): serverRouteConfig;
}
