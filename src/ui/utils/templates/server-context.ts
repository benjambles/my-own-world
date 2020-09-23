import { html, Part, RenderOptions, TemplateResult } from '@popeindustries/lit-html-server';
import { classMap } from '@popeindustries/lit-html-server/directives/class-map';
import { ifDefined } from '@popeindustries/lit-html-server/directives/if-defined';
import { Middleware } from 'koa';
import { RouteMethods } from './lit-route';

export type ServerContext = {
    html: (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult;
    directives: {
        classMap: (classInfo: {
            [name: string]: string | boolean | number;
        }) => (part: Part) => void;
        ifDefined: (value: unknown) => (part: Part) => void;
    };
};

export type ServerResult = TemplateResult;

export type ServerRenderer = (result: TemplateResult, options?: RenderOptions) => Promise<string>;

export type ServerRouteConfig = {
    method: RouteMethods;
    path: string;
    handler: Middleware;
};

export const SERVER_CONTEXT: ServerContext = {
    html,
    directives: { classMap, ifDefined },
};
