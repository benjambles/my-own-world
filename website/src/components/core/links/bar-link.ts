import classNames from 'classnames';
import { clientContext, clientResult } from '../../../utils/templates/client-context';
import { serverContext, serverResult } from '../../../utils/templates/server-context';

export interface BarLinkProps {
    href: string;
    text: string;
    active?: boolean;
}

export function BarLink(context: clientContext, data: BarLinkProps): clientResult;
export function BarLink(context: serverContext, data: BarLinkProps): serverResult;
export function BarLink(context, { text, href, active = false }: BarLinkProps) {
    const { html } = context;
    return html`<a href="${href}" class="${classNames({ 'link--bar': true, active })}">${text}</a>`;
}
