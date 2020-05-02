import { clientContext, clientResult } from '../../../utils/templates/client-context';
import { lazyStylesheet } from '../../utils/lazy-stylesheet';
import { serverContext, serverResult } from '../../../utils/templates/server-context';
import { link, LinkProps } from '../links/link';
export interface FooterData {
    links: LinkProps[];
}

/**
 * The footer component always renders the correct copyright date.
 * By default it doesn't know which links to render, so you should always
 * pass these values in. Uses the Link component to render the items.
 * @param context
 * @param data
 */

export function footer(context: clientContext, data: FooterData): clientResult;
export function footer(context: serverContext, data: FooterData): serverResult;
export function footer(context, { links }: FooterData) {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/components/footer.css')}
        <footer>
            <div class="container">
                <span>&copy; My Own World - 2020</span>
                <nav class="nav">
                    ${links.map(linkData => link(context, linkData))}
                </nav>
            </div>
        </footer>
    `;
}
