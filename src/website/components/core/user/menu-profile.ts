import { clientContext, clientResult } from '../../../utils/client-context';
import { LazyStylesheet } from '../../utils/lazy-stylesheet';
import { serverContext, serverResult } from '../../../utils/server-context';
import { Link } from '../links/link';

export interface MenuProfileData {
    profile?: {
        image: string;
        name: string;
        username: string;
    };
}

export function MenuProfile(context: clientContext, data: MenuProfileData): clientResult;
export function MenuProfile(context: serverContext, data: MenuProfileData): serverResult;
export function MenuProfile(context, { profile }: MenuProfileData) {
    const { html } = context;

    const baseLink = { display: { bar: true } };

    return html`
        ${LazyStylesheet(context, '/styles/components/menu-profile.css')}
        <details class="menu-profile">
            <summary aria-haspopup="menu" role="button">
                <img src="${profile.image}" alt="${profile.name}" class="profile-image" />
            </summary>
            <div class="menu-profile__dropdown" role="menu">
                <span class="user-label">
                    Signed in as <br />
                    ${Link(context, {
                        display: { bold: true },
                        text: profile.name,
                        href: `/profile/${profile.username}`,
                    })}
                </span>
                <hr class="divider" />
                ${Link(context, {
                    ...baseLink,
                    text: 'Your profile',
                    href: `/profile/${profile.username}`,
                })}
                <hr class="divider" />
                ${Link(context, { ...baseLink, text: 'Preferences', href: '/preferences' })}
                ${Link(context, { ...baseLink, text: 'Help', href: '/help' })}
                ${Link(context, { ...baseLink, text: 'Logout', href: '/logout' })}
            </div>
        </details>
    `;
}
