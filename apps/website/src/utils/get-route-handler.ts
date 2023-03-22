import { getAccessMiddleware } from '@benjambles/mow-server/dist/koa/middleware/get-access-middleware.js';
import { getAccessMap } from '@benjambles/mow-server/dist/utils/routes/get-access-map.js';
import { streamResponse } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { Context, Middleware } from 'koa';
import { getWebsiteTemplateStream } from './get-template-stream.js';

export type RouteParams<T = any> = {
    urlPattern: UrlPattern;
    templatePath: string;
    dataFn: (ctx: Context) => Promise<T>;
    access?: {
        accessMap?: {
            [key: string]: (ctx: Context) => boolean;
        };
        roles: { [key: string]: string[] }[];
    };
};

export interface RouteConfig {
    method: 'get' | 'options' | 'post';
    path: UrlPattern;
    handler: Middleware[] | Middleware;
}

type UrlPattern = `/${string}` | RegExp;

export function getRouteHandler({
    urlPattern,
    templatePath,
    dataFn,
    access,
}: RouteParams): RouteConfig {
    return {
        method: 'get',
        path: urlPattern,
        handler: [
            getAccessMiddleware(getAccessMap(access?.accessMap), access?.roles),
            async (ctx) => {
                const data = await dataFn(ctx);
                const page = await getWebsiteTemplateStream(data, templatePath);

                streamResponse(ctx, page);
            },
        ].filter(Boolean),
    };
}
