import { clientContext, clientResult } from '../../../utils/client-context';
import { LazyStylesheet } from '../../../utils/lazy-stylesheet';
import { serverContext, serverResult } from '../../../utils/server-context';
import { HomeIntro } from '../../core/home/home-intro';
import { Layout } from '../layout';

export function Home(context: clientContext, data): clientResult;
export function Home(context: serverContext, data): serverResult;
export function Home(context, data) {
    const { html } = context;

    const page = html`
        <main class="page--home">
            ${HomeIntro(context)}
            ${LazyStylesheet(context, '/styles/components/home/explore-module.css')}
            <section class="container explore-module">
                <h2>Explore</h2>
            </section>
        </main>
    `;

    return html`${Layout(context, data, page)}`;
}
