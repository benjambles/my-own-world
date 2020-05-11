import type { LitTpl } from '../../../utils/templates/lit-tpl';
import { lazyStylesheet } from '../../utils/lazy-stylesheet';
import { barLink } from '../links/bar-link';
import { link } from '../links/link';
import styles from './menu-profile.css.json';

export type MenuProfileData = {
    profile?: {
        image: string;
        name: string;
        username: string;
    };
};

export const menuProfile: LitTpl<MenuProfileData> = (context, { profile }: MenuProfileData) => {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/core/user/menu-profile.css')}
        <details class="${styles.menuProfile}">
            <summary aria-haspopup="true" role="button">
                <img src="${profile.image}" alt="${profile.name}" class="${styles.profileImage}" />
            </summary>
            <div class="${styles.menuProfile__dropdown}" role="menu">
                <span class="${styles.userLabel}">
                    Signed in as <br />
                    ${link(context, {
                        display: { bold: true },
                        text: profile.name,
                        href: `/profile/${profile.username}`,
                    })}
                </span>
                <hr class="${styles.divider}" />
                ${barLink(context, {
                    text: 'Your profile',
                    href: `/profile/${profile.username}`,
                })}
                <hr class="${styles.divider}" />
                ${barLink(context, { text: 'Preferences', href: '/preferences' })}
                ${barLink(context, { text: 'Help', href: '/help' })}
                ${barLink(context, { text: 'Logout', href: '/logout' })}
            </div>
        </details>
    `;
};
