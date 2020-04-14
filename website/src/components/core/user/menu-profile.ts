import { clientContext, clientResult } from '../../../utils/client-context';
import { serverContext, serverResult } from '../../../utils/server-context';
import { LazyStylesheet } from '../../utils/lazy-stylesheet';
import { BarLink } from '../links/bar-link';
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

    return html`
        ${LazyStylesheet(context, '/styles/components/menu-profile.css')}
        <details class="menu-profile">
            <summary aria-haspopup="true" role="button">
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
                ${BarLink(context, {
                    text: 'Your profile',
                    href: `/profile/${profile.username}`,
                })}
                <hr class="divider" />
                ${BarLink(context, { text: 'Preferences', href: '/preferences' })}
                ${BarLink(context, { text: 'Help', href: '/help' })}
                ${BarLink(context, { text: 'Logout', href: '/logout' })}
            </div>
        </details>
    `;
}
