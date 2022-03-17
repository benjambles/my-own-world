import { html } from 'lit';
import { lazyStylesheet } from '../../utils/lazy-stylesheet.js';
import styles from './skiplinks.css.js';

export function skiplinks() {
    return html`
        ${lazyStylesheet('/styles/core/accessibility/skiplinks.css')}
        <div class=${styles.skiplinks}>
            <a href="#content">Skip to the content</a>
            <a href="#footer">Skip to the footer</a>
        </div>
    `;
}
