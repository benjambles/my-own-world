import {
    clientContext,
    clientResult,
    serverContext,
    serverResult,
} from '../../../typings/templates';
import { HomeIntro } from '../../core/home/home-intro';
import { Layout } from '../layout';
import { LazyStylesheet } from '../../../utils/lazy-stylesheet';

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
