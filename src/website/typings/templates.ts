import { TemplateResult as ServerTemplateResult } from '@popeindustries/lit-html-server';
import { TemplateResult } from 'lit-html';

export type clientContext = {
    html: (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult;
};
export type serverContext = {
    html: (strings: TemplateStringsArray, ...values: unknown[]) => ServerTemplateResult;
};

export type clientResult = TemplateResult;
export type serverResult = ServerTemplateResult;
