import {
    clientContext,
    clientResult,
    serverContext,
    serverResult,
} from '../../../typings/templates';
import classNames from 'classnames';

export interface LinkProps {
    href: string;
    text: string;
    display?: {
        active?: boolean;
        light?: boolean;
        underlined?: boolean;
        bold?: boolean;
        bar?: boolean;
    };
}

export function Link(context: clientContext, data: LinkProps): clientResult;
export function Link(context: serverContext, data: LinkProps): serverResult;
export function Link(context, { text, href, display = {} }: LinkProps) {
    const { html } = context;
    const cssClasses = classNames(display);
    return html`<a href="${href}" class="${cssClasses}">${text}</a>`;
}
