import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import { layout } from '../../layout';
import { homeIntro } from './home-intro/home-intro';

export const home: LitTpl<any> = (context, data) => {
    const { html } = context;

    const page = html` <main class="page--home">${homeIntro(context, undefined)}</main> `;

    return html`${layout(context, data, page)}`;
};
