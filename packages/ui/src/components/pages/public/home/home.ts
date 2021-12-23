import { html } from 'lit';
import { layout } from '../../layout.js';
import { homeIntro } from './home-intro/home-intro.js';

export function home(data) {
    const page = html`<main class="page--home">${homeIntro()}</main>`;
    return html`${layout(data, page)}`;
}
