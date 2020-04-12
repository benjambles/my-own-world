import { html, Part, TemplateResult, RenderOptions } from '@popeindustries/lit-html-server';
import { classMap } from '@popeindustries/lit-html-server/directives/class-map';
import { ifDefined } from '@popeindustries/lit-html-server/directives/if-defined';

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

export const SERVER_CONTEXT: serverContext = { html, directives: { classMap, ifDefined } };

export type serverRenderer = (result: TemplateResult, options?: RenderOptions) => Promise<string>;
