import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import { homeIntro } from './home-intro/home-intro';
import layoutStyles from '../../../global-css/base.css.json';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet';
import { layout } from '../../layout';
import styles from './explore-module.css.json';

export const home: LitTpl<any> = (context, data) => {
    const { html } = context;

    const page = html`
        <main class="page--home">
            ${homeIntro(context, undefined)}
            ${lazyStylesheet(context, '/styles/pages/public/explore-module.css')}
            <section class="${layoutStyles.container} ${styles.exploreModule}">
                <h2>Explore</h2>
            </section>
        </main>
    `;

    return html`${layout(context, data, page)}`;
};
