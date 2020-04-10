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
    rel?: string;
    target?: string;
    classes?: {
        [index: string]: boolean;
    };
    action?: string;
    active?: boolean;
}

export function Link(context: clientContext, data: LinkProps): clientResult;
export function Link(context: serverContext, data: LinkProps): serverResult;
export function Link(context, { text, href, active, classes }: LinkProps) {
    const { html } = context;
    const cssClasses = classNames({
        active,
        ...classes,
    });
    return html`<a href="${href}" class="${cssClasses}">${text}</a>`;
}
