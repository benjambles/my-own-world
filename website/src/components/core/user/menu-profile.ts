import { clientContext, clientResult } from '../../../utils/templates/client-context';
import { serverContext, serverResult } from '../../../utils/templates/server-context';
import { lazyStylesheet } from '../../utils/lazy-stylesheet';
import { barLink } from '../links/bar-link';
import { link } from '../links/link';

export interface MenuProfileData {
    profile?: {
        image: string;
        name: string;
        username: string;
    };
}

export function menuProfile(context: clientContext, data: MenuProfileData): clientResult;
export function menuProfile(context: serverContext, data: MenuProfileData): serverResult;
export function menuProfile(context, { profile }: MenuProfileData) {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/components/menu-profile.css')}
        <details class="menu-profile">
            <summary aria-haspopup="true" role="button">
                <img src="${profile.image}" alt="${profile.name}" class="profile-image" />
            </summary>
            <div class="menu-profile__dropdown" role="menu">
                <span class="user-label">
                    Signed in as <br />
                    ${link(context, {
                        display: { bold: true },
                        text: profile.name,
                        href: `/profile/${profile.username}`,
                    })}
                </span>
                <hr class="divider" />
                ${barLink(context, {
                    text: 'Your profile',
                    href: `/profile/${profile.username}`,
                })}
                <hr class="divider" />
                ${barLink(context, { text: 'Preferences', href: '/preferences' })}
                ${barLink(context, { text: 'Help', href: '/help' })}
                ${barLink(context, { text: 'Logout', href: '/logout' })}
            </div>
        </details>
    `;
}
