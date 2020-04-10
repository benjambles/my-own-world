import {
    clientContext,
    clientResult,
    serverContext,
    serverResult,
} from '../../../typings/templates';
import { LazyStylesheet } from '../../../utils/lazy-stylesheet';
import { Link, NavLink } from '../links/nav-link';

export interface MenuProfileData {
    profile?: {
        image: string;
        name: string;
    };
    links: Link[];
}

export function MenuProfile(context: clientContext, data: MenuProfileData): clientResult;
export function MenuProfile(context: serverContext, data: MenuProfileData): serverResult;
export function MenuProfile(context, { profile, links }: MenuProfileData) {
    const { html } = context;

    return html`
        ${LazyStylesheet(context, '/styles/components/menu-profile.css')}
        <details class="menu-profile">
            <summary aria-haspopup="menu" role="button">
                <img src="${profile.image}" alt="${profile.name}" class="profile-image" />
            </summary>
            <div class="menu-profile__dropdown" role="menu">
                ${links.map(link => NavLink(context, link))}
            </div>
        </details>
    `;
}
