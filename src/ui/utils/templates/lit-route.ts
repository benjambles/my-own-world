import { ClientContext, ClientRender, ClientRouteConfig } from './client-context.js';
import { ServerContext, ServerRenderer, ServerRouteConfig } from './server-context.js';

export enum RouteMethods {
    Get = 'get',
    Options = 'options',
    Post = 'post',
}

export interface LitRoute {
    (litHtmlContext: ClientContext, render: ClientRender): ClientRouteConfig;
    (litHtmlContext: ServerContext, render: ServerRenderer): ServerRouteConfig;
}
