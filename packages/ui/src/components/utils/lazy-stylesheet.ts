import type { LitTpl } from '../../utils/templates/lit-tpl.js';

/**
 * Returns a lazy loading stylesheet tag
 * @param href
 */
export function lazyStylesheet(context, href: string): LitTpl<string> {
    const { html } = context;
    return html`<link rel="preload" href="${href}" as="style" onload="this.rel='stylesheet'" />`;
}
