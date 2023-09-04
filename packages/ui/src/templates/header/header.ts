import { html } from 'lit';
import '../../components/menu-profile/menu-profile.js';
import baseStyles from '../../global-css/base.css.js';
import { darkLink, DarkLinkProps } from '../links/dark-link.js';
import { lazyStylesheet } from '../utils/lazy-stylesheet.js';
import styles from './header.css.js';

interface HeaderData {
    navigationLinks: DarkLinkProps[];
    user?: { imageSrc: string; name: string; username: string };
}

export function header({ navigationLinks, user }: HeaderData) {
    return html`
        ${lazyStylesheet('/mow-ui/styles/core/header/header.css')}
        <header class="${styles.header}">
            <div class="${baseStyles.container} ${styles.header__container}">
                <a href="/" class="logo">My Own World</a>

                <nav class="${styles.nav} ${styles.primaryNav}">
                    ${linkList(navigationLinks)}
                </nav>

                <div class="${styles.nav} ${styles.accountNav}">
                    ${user?.username
                        ? html`
                              <menu-profile
                                  imagesrc="${user.imageSrc}"
                                  name="${user.name}"
                                  username="${user.username}"
                              ></menu-profile>
                          `
                        : linkList([
                              { text: 'Sign in', href: '/login' },
                              { text: 'Sign up', href: '/join' },
                          ])}
                </div>
            </div>
        </header>
    `;
}

function linkList(links) {
    return html`
        <ul>
            ${links.map((link) => html`<li>${darkLink(link)}</li>`)}
        </ul>
    `;
}
