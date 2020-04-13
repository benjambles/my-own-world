import { clientContext, clientResult } from '../../utils/client-context';
import { serverContext, serverResult } from '../../utils/server-context';

/**
 * Returns a lazy loading stylesheet tag
 * @param href
 */
export function LazyStylesheet(context: clientContext, href: string): clientResult;
export function LazyStylesheet(context: serverContext, href: string): serverResult;
export function LazyStylesheet(context, href: string) {
    const { html } = context;
    return html`<link rel="preload" href="${href}" as="style" onload="this.rel='stylesheet'" />`;
}
