import { html } from 'lit';
import { lazyStylesheet } from '../../utils/lazy-stylesheet.js';
import { link, LinkProps } from '../links/link.js';
import styles from './skiplinks.css.js';

export function skiplinks(links: LinkProps[]) {
    return html`
        ${lazyStylesheet('/mow-ui/styles/core/accessibility/skiplinks.css')}
        <div class=${styles.skiplinks}>${links.map(link)}</div>
    `;
}
