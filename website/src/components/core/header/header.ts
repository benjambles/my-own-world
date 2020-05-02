import type { LitTpl } from '../../../utils/templates/lit-tpl';
import { lazyStylesheet } from '../../utils/lazy-stylesheet';
import { darkLink, DarkLinkProps } from '../links/dark-link';
import { menuProfile, MenuProfileData } from '../user/menu-profile';

export interface HeaderData {
    navigationLinks: DarkLinkProps[];
    user: MenuProfileData;
}

export const header: LitTpl<HeaderData> = (context, { navigationLinks, user }: HeaderData) => {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/components/header.css')}
        <header class="header">
            <div class="container">
                <a href="/" class="logo">My Own World</a>

                <nav class="nav primary-nav">${linkList(context, navigationLinks)}</nav>

                <div class="nav account-nav">
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
