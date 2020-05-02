import { clientContext, clientResult } from '../../../utils/templates/client-context';
import { lazyStylesheet } from '../../utils/lazy-stylesheet';
import { serverContext, serverResult } from '../../../utils/templates/server-context';
import { homeIntro } from '../../core/home/home-intro';
import { layout } from '../layout';

export function home(context: clientContext, data): clientResult;
export function home(context: serverContext, data): serverResult;
export function home(context, data) {
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
}
