import classNames from 'classnames';
import { clientContext, clientResult } from '../../../utils/client-context';
import { serverContext, serverResult } from '../../../utils/server-context';

export interface DarkLinkProps {
    href: string;
    text: string;
    display?: {
        active?: boolean;
        underlined?: boolean;
        bold?: boolean;
    };
}

export function DarkLink(context: clientContext, data: DarkLinkProps): clientResult;
export function DarkLink(context: serverContext, data: DarkLinkProps): serverResult;
export function DarkLink(context, { text, href, display = {} }: DarkLinkProps) {
    const { html } = context;
    return html`<a href="${href}" class="${classNames({ 'link--dark': true, ...display })}"
        >${text}</a
    >`;
}
