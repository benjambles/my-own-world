import type { LitTpl } from '../../../utils/templates/lit-tpl';
import baseStyles from '../../global-css/base.css.json';
import { lazyStylesheet } from '../../utils/lazy-stylesheet';
import { link, LinkProps } from '../links/link';
import styles from './footer.css.json';

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

export const footer: LitTpl<FooterData> = (context, { links }: FooterData) => {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/core/footer/footer.css')}
        <footer>
            <div class="${baseStyles.container} ${styles.container}">
                <span>&copy; My Own World - 2020</span>
                <nav class="">
                    ${links.map(linkData => link(context, linkData))}
                </nav>
            </div>
        </footer>
    `;
};
