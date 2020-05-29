import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import { homeIntro } from './home-intro/home-intro';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet';
import { layout } from '../../layout';

export const home: LitTpl<any> = (context, data) => {
    const { html } = context;

    const page = html`
        <main class="page--home">
            ${homeIntro(context, undefined)}
            ${lazyStylesheet(context, '/styles/pages/public/home/explore-module.css')}
        </main>
    `;

    return html`${layout(context, data, page)}`;
};
