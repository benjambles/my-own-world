import { ClientContext, ClientRender, ClientRouteConfig } from './client-context';
import { ServerContext, ServerRenderer, ServerRouteConfig } from './server-context';

export enum RouteMethods {
    get = 'get',
    post = 'post',
    options = 'options',
}

export interface LitRoute {
    (litHtmlContext: ClientContext, render: ClientRender): ClientRouteConfig;
    (litHtmlContext: ServerContext, render: ServerRenderer): ServerRouteConfig;
}
