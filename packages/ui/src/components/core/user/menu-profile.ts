import { html } from 'lit';
import { lazyStylesheet } from '../../utils/lazy-stylesheet.js';
import { barLink } from '../links/bar-link.js';
import { link } from '../links/link.js';
import styles from './menu-profile.css.js';

export interface MenuProfileData {
    profile: {
        image: string;
        name: string;
        username: string;
    };
}

export function menuProfile({ profile }: MenuProfileData) {
    return html`
        ${lazyStylesheet('/styles/core/user/menu-profile.css')}
        <details class="${styles.menuProfile}">
            <summary aria-haspopup="true" role="button">
                <img src="${profile.image}" alt="${profile.name}" class="${styles.profileImage}" />
            </summary>
            <div class="${styles.menuProfile__dropdown}" role="menu">
                <span class="${styles.userLabel}">
                    Signed in as <br />
                    ${link({
                        display: { bold: true },
                        text: profile.name,
                        href: `/profile/${profile.username}`,
                    })}
                </span>
                <hr class="${styles.divider}" />
                ${barLink({
                    text: 'Your profile',
                    href: `/profile/${profile.username}`,
                })}
                <hr class="${styles.divider}" />
                ${barLink({
                    text: 'Preferences',
                    href: '/preferences',
                })}
                ${barLink({ text: 'Help', href: '/help' })}
                ${barLink({ text: 'Logout', href: '/logout' })}
            </div>
        </details>
    `;
}
