import type { LitTpl } from '../../../../utils/templates/lit-tpl.js';
import { layout } from '../../layout.js';
import { homeIntro } from './home-intro/home-intro.js';

export const home: LitTpl<any> = (context, data) => {
    const { html } = context;

    const page = html` <main class="page--home">${homeIntro(context, undefined)}</main> `;

    return html`${layout(context, data, page)}`;
};
