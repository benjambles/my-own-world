import { html } from 'lit';
import baseStyles from '../../global-css/base.css.js';
import { lazyStylesheet } from '../../utils/lazy-stylesheet.js';
import { link } from '../links/link.js';
import styles from './footer.css.js';

interface FooterData {
    links: LinkProps[];
}

interface LinkProps {
    href: string;
    text: string;
    display?: {
        active?: boolean;
        underlined?: boolean;
        bold?: boolean;
    };
}

/**
 * The footer component always renders the correct copyright date.
 * By default it doesn't know which links to render, so you should always
 * pass these values in. Uses the Link component to render the items.
 * @param context
 * @param data
 */

export function footer({ links }: FooterData) {
    const currentYear = new Date().getFullYear();

    return html`
        ${lazyStylesheet('/mow-ui/styles/core/footer/footer.css')}
        <footer>
            <div class="${baseStyles.container} ${styles.container}">
                <span>&copy; My Own World - ${currentYear}</span>
                <nav class="">${links.map(link)}</nav>
            </div>
        </footer>
    `;
}
