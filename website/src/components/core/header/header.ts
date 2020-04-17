import { clientContext, clientResult } from '../../../utils/templates/client-context';
import { LazyStylesheet } from '../../utils/lazy-stylesheet';
import { serverContext, serverResult } from '../../../utils/templates/server-context';
import { DarkLink, DarkLinkProps } from '../links/dark-link';
import { MenuProfile, MenuProfileData } from '../user/menu-profile';

export interface HeaderData {
    navigationLinks: DarkLinkProps[];
    user: MenuProfileData;
}

export function Header(context: clientContext, data: HeaderData): clientResult;
export function Header(context: serverContext, data: HeaderData): serverResult;
export function Header(context, { navigationLinks, user }: HeaderData) {
    const { html } = context;

    return html`
        ${LazyStylesheet(context, '/styles/components/header.css')}
        <header class="header">
            <div class="container">
                <a href="/" class="logo">My Own World</a>

                <nav class="nav primary-nav">${LinkList(context, navigationLinks)}</nav>

                <div class="nav account-nav">
                    ${user.profile
                        ? MenuProfile(context, user)
                        : LinkList(context, [
                              { text: 'Sign in', href: '/login' },
                              { text: 'Sign up', href: '/join' },
                          ])}
                </div>
            </div>
        </header>
    `;
}

function LinkList(context, links) {
    const { html } = context;

    return html`
        <ul>
            ${links.map(link => html`<li>${DarkLink(context, link)}</li>`)}
        </ul>
    `;
}
