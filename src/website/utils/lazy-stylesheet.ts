import { clientContext, clientResult, serverContext, serverResult } from '../typings/templates';

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
