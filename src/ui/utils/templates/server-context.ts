import { html, Part, RenderOptions, TemplateResult } from '@popeindustries/lit-html-server';
import { classMap } from '@popeindustries/lit-html-server/directives/class-map';
import { ifDefined } from '@popeindustries/lit-html-server/directives/if-defined';
import { Middleware } from 'koa';
import { RouteMethods } from './lit-route';

export { TemplateResult as ServerResult } from '@popeindustries/lit-html-server';

export interface ServerContext {
    html: (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult;
    directives: {
        classMap: (classInfo: {
            [name: string]: string | boolean | number;
        }) => (part: Part) => void;
        ifDefined: (value: unknown) => (part: Part) => void;
    };
}

export interface ServerRenderer {
    (result: TemplateResult, options?: RenderOptions): Promise<string>;
}

export interface ServerRouteConfig {
    method: RouteMethods;
    path: string | RegExp;
    handler: Middleware;
}

export const SERVER_CONTEXT: ServerContext = {
    html,
    directives: { classMap, ifDefined },
};
