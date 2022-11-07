import { html } from 'lit';
import { lazyStylesheet } from '../../utils/lazy-stylesheet.js';
import styles from './skiplinks.css.js';

interface SkipLink {
    text: string;
    href: string;
}

export function skiplinks(links: SkipLink[]) {
    return html`
        ${lazyStylesheet('/styles/core/accessibility/skiplinks.css')}
        <div class=${styles.skiplinks}>
            ${links.map(({ text, href }) => {
                return html`<a href="${href}">${text}</a>`;
            })}
        </div>
    `;
}
