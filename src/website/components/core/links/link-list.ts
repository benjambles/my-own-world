import {
    clientContext,
    clientResult,
    serverContext,
    serverResult,
} from '../../../typings/templates';
import { Link, NavLink } from '../links/nav-link';

export function LinkList(context: clientContext, data: Link[]): clientResult;
export function LinkList(context: serverContext, data: Link[]): serverResult;
export function LinkList(context, data: Link[]) {
    const { html } = context;

    return html`
        <ul>
            ${data.map(linkData => html`<li>${NavLink(context, linkData)}</li>`)}
        </ul>
    `;
}
