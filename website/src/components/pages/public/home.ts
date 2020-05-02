import type { LitTpl } from '../../../utils/templates/lit-tpl';
import { homeIntro } from '../../core/home/home-intro';
import { lazyStylesheet } from '../../utils/lazy-stylesheet';
import { layout } from '../layout';

export const home: LitTpl<any> = (context, data) => {
    const { html } = context;

    const page = html`
        <main class="page--home">
            ${homeIntro(context)}
            ${lazyStylesheet(context, '/styles/components/home/explore-module.css')}
            <section class="container explore-module">
                <h2>Explore</h2>
            </section>
        </main>
    `;

    return html`${layout(context, data, page)}`;
};
