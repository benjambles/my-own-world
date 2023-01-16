import { streamResponse } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { Context, Middleware } from 'koa';
import { getWebsiteTemplateStream } from './get-template-stream.js';

export type RouteParams<T = any> = {
    urlPattern: UrlPattern;
    templatePath: string;
    dataFn: (ctx: Context) => T;
};

export interface RouteConfig {
    method: 'get' | 'options' | 'post';
    path: UrlPattern;
    handler: Middleware;
}

type UrlPattern = `/${string}` | RegExp;

export function getRouteHandler({
    urlPattern,
    templatePath,
    dataFn,
}: RouteParams): RouteConfig {
    return {
        method: 'get',
        path: urlPattern,
        handler: async (ctx) => {
            const data = dataFn(ctx);

            const page = await getWebsiteTemplateStream({
                data,
                rootComponent: templatePath,
            });

            streamResponse(ctx, page);
        },
    };
}
