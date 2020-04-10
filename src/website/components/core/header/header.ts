import {
    clientContext,
    clientResult,
    serverContext,
    serverResult,
} from '../../../typings/templates';
import { LazyStylesheet } from '../../../utils/lazy-stylesheet';
import { LinkList } from '../links/link-list';
import { Link } from '../links/nav-link';
import { MenuProfile, MenuProfileData } from '../user/menu-profile';

export interface HeaderData {
    navigationLinks: Link[];
    user: MenuProfileData;
}

export function Header(context: clientContext, data: HeaderData): clientResult;
export function Header(context: serverContext, data: HeaderData): serverResult;
export function Header(context, { navigationLinks, user }: HeaderData) {
    const { html } = context;

    return html`
        ${LazyStylesheet(context, '/styles/components/header.css')}
        <header>
            <div class="container">
                <a href="/" class="logo">My Own World</a>

                <nav class="nav primary-nav">
                    ${LinkList(context, navigationLinks)}
                </nav>

                <div class="nav account-nav">
                    ${user.profile ? MenuProfile(context, user) : LinkList(context, user.links)}
                </div>
            </div>
        </header>
    `;
}
