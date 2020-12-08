import type { LitTpl } from '../../../../../utils/templates/lit-tpl';
import { lazyStylesheet } from '../../../../utils/lazy-stylesheet';

/**
 *
 * @param context - Lit HTML rendering context
 * @param data - Display data
 */
export const homeFeatures: LitTpl<undefined> = (context) => {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/pages/public/home/home-intro/home-intro.css')}
        <section>
            <h2>Features</h2>
        </section>
    `;
};
