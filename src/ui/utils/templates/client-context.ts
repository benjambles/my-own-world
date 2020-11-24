import { html, Part, render, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { RouteMethods } from './lit-route';

export { TemplateResult as ClientResult } from 'lit-html';

export interface ClientContext {
    html: (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult;
    directives: {
        classMap: (classInfo: {
            [name: string]: string | boolean | number;
        }) => (part: Part) => void;
        ifDefined: (value: unknown) => (part: Part) => void;
    };
}

export type ClientRender = typeof render;

export interface ClientRouteConfig {
    method: RouteMethods;
    path: string | RegExp;
    handler: (ctx: any) => Promise<void>;
}

export const CLIENT_CONTEXT: ClientContext = {
    html,
    directives: {
        classMap,
        ifDefined,
    },
};
