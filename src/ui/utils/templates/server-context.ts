import { html, Part, RenderOptions, TemplateResult } from '@popeindustries/lit-html-server';
import { classMap } from '@popeindustries/lit-html-server/directives/class-map.js';
import { ifDefined } from '@popeindustries/lit-html-server/directives/if-defined.js';
import type { Middleware } from 'koa';
import type { RouteMethods } from './lit-route.js';

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
