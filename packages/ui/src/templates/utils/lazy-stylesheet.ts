import { html } from 'lit';

/**
 * Returns a lazy loading stylesheet tag
 * @param href
 */
export function lazyStylesheet(href: string) {
    return html`
        <link as="style" href="${href}" onload="this.rel='stylesheet'" rel="preload" />
    `;
}
