import type { LitTpl } from '../../utils/templates/lit-tpl';

/**
 * Returns a lazy loading stylesheet tag
 * @param href
 */
export const lazyStylesheet: LitTpl<string> = (context, href: string) => {
    const { html } = context;
    return html`<link rel="preload" href="${href}" as="style" onload="this.rel='stylesheet'" />`;
};
