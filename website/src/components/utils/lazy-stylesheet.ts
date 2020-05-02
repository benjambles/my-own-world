import { clientContext, clientResult } from '../../utils/templates/client-context';
import { serverContext, serverResult } from '../../utils/templates/server-context';

/**
 * Returns a lazy loading stylesheet tag
 * @param href
 */
export function lazyStylesheet(context: clientContext, href: string): clientResult;
export function lazyStylesheet(context: serverContext, href: string): serverResult;
export function lazyStylesheet(context, href: string) {
    const { html } = context;
    return html`<link rel="preload" href="${href}" as="style" onload="this.rel='stylesheet'" />`;
}
