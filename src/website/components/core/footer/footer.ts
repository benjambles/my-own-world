import {
    clientContext,
    clientResult,
    serverContext,
    serverResult,
} from '../../../typings/templates';
import { LazyStylesheet } from '../../../utils/lazy-stylesheet';
import { Link, LinkProps } from '../links/link';
export interface FooterData {
    links: LinkProps[];
}

export function Footer(context: clientContext, data: FooterData): clientResult;
export function Footer(context: serverContext, data: FooterData): serverResult;
export function Footer(context, { links }: FooterData) {
    const { html } = context;

    return html`
        ${LazyStylesheet(context, '/styles/components/footer.css')}
        <footer>
            <div class="container">
                <span>&copy; My Own World - 2020</span>
                <nav class="nav">
                ${links.map(link => Link(context, link))}
                </nav>
            <div>
        </footer>
    `;
}
