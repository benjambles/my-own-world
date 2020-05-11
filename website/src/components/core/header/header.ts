import type { LitTpl } from '../../../utils/templates/lit-tpl';
import baseStyles from '../../global-css/base.css.json';
import { lazyStylesheet } from '../../utils/lazy-stylesheet';
import { darkLink, DarkLinkProps } from '../links/dark-link';
import { menuProfile, MenuProfileData } from '../user/menu-profile';
import styles from './header.css.json';

export type HeaderData = {
    navigationLinks: DarkLinkProps[];
    user: MenuProfileData;
};

export const header: LitTpl<HeaderData> = (context, { navigationLinks, user }: HeaderData) => {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/core/header/header.css')}
        <header class="${styles.header}">
            <div class="${baseStyles.container} ${styles.header__container}">
                <a href="/" class="logo">My Own World</a>

                <nav class="${styles.nav} ${styles.primaryNav}">
                    ${linkList(context, navigationLinks)}
                </nav>

                <div class="${styles.nav} ${styles.accountNav}">
                    ${user.profile
                        ? menuProfile(context, user)
                        : linkList(context, [
                              { text: 'Sign in', href: '/login' },
                              { text: 'Sign up', href: '/join' },
                          ])}
                </div>
            </div>
        </header>
    `;
};

const linkList = (context, links) => {
    const { html } = context;

    return html`
        <ul>
            ${links.map(link => html`<li>${darkLink(context, link)}</li>`)}
        </ul>
    `;
};
