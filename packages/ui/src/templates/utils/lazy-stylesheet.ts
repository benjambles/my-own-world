import { html } from 'lit';

/**
 * Returns a lazy loading stylesheet tag
 * @param href
 */
export function lazyStylesheet(href: string) {
    return html`<link
        rel="preload"
        href="${href}"
        as="style"
        onload="this.rel='stylesheet'"
    />`;
}
