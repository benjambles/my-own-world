import { html, Part, RenderOptions, TemplateResult } from '@popeindustries/lit-html-server';
import { classMap } from '@popeindustries/lit-html-server/directives/class-map';
import { ifDefined } from '@popeindustries/lit-html-server/directives/if-defined';
import { Context } from 'koa';
import { RouteMethods } from './lit-route';

export type serverContext = {
    html: (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult;
    directives: {
        classMap: (classInfo: {
            [name: string]: string | boolean | number;
        }) => (part: Part) => void;
        ifDefined: (value: unknown) => (part: Part) => void;
    };
};

export type serverResult = TemplateResult;

export type serverRenderer = (result: TemplateResult, options?: RenderOptions) => Promise<string>;

export interface serverRouteConfig {
    method: RouteMethods;
    path: string;
    handler: (ctx: Context) => Promise<void>;
}

export const SERVER_CONTEXT: serverContext = { html, directives: { classMap, ifDefined } };
