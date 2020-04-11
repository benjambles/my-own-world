import {
    clientContext,
    clientResult,
    serverContext,
    serverResult,
} from '../../../typings/templates';
import { LazyStylesheet } from '../../../utils/lazy-stylesheet';
import { Link, LinkProps } from '../links/link';
import { MenuProfile, MenuProfileData } from '../user/menu-profile';

export interface HeaderData {
    navigationLinks: LinkProps[];
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
                              { text: 'Sign in', href: '/login', display: { light: true } },
                              { text: 'Sign up', href: '/join', display: { light: true } },
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
            ${links.map(link => html`<li>${Link(context, link)}</li>`)}
        </ul>
    `;
}
