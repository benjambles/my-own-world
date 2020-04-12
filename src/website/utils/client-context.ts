import { html, Part, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';

export type clientContext = {
    html: (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult;
    directives: {
        classMap: (classInfo: {
            [name: string]: string | boolean | number;
        }) => (part: Part) => void;
        ifDefined: (value: unknown) => (part: Part) => void;
    };
};

export type clientResult = TemplateResult;

export const CLIENT_CONTEXT: clientContext = {
    html,
    directives: {
        classMap,
        ifDefined,
    },
};
