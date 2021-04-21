import { ClientContext, ClientRender, ClientRouteConfig } from './client-context';
import { ServerContext, ServerRenderer, ServerRouteConfig } from './server-context';

export enum RouteMethods {
    Get = 'get',
    Options = 'options',
    Post = 'post',
}

export interface LitRoute {
    (litHtmlContext: ClientContext, render: ClientRender): ClientRouteConfig;
    (litHtmlContext: ServerContext, render: ServerRenderer): ServerRouteConfig;
}
