import {
    clientContext,
    clientResult,
    serverContext,
    serverResult,
} from '../../../typings/templates';
import { LazyStylesheet } from '../../../utils/lazy-stylesheet';
import { LinkList } from '../links/link-list';
import { Link } from '../links/nav-link';
export interface FooterData {
    links: Link[];
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
                    ${LinkList(context, links)}
                </nav>
            <div>
        </footer>
    `;
}
