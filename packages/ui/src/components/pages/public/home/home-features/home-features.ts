import { html } from 'lit';
import { lazyStylesheet } from '../../../../utils/lazy-stylesheet.js';

/**
 *
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export function homeFeatures() {
    return html`
        ${lazyStylesheet('/styles/pages/public/home/home-intro/home-intro.css')}
        <section>
            <h2>Features</h2>
        </section>
    `;
}
