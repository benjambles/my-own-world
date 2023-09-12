import '@benjambles/mow-ui/components/menu-profile/menu-profile.js';
import { consume } from '@lit-labs/context';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { UserData, userContext } from '../contexts/user.js';

import { paths as userPaths } from '../../../../routes/account/config.js';

@customElement('user-menu')
export class UserMenu extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;
            width: 60px;
            border-right: 1px solid rgb(68, 68, 68);
        }

        mow-action,
        a {
            flex: 1 0 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: var(--special-4);
            text-decoration: none;
            transition: color 0.1s;
        }

        a:hover,
        a:focus-visible {
            color: white;
            background-color: var(--special-4);
        }

        @media screen and (min-width: 992px) {
            :host {
                height: 101px;
                width: 100px;
                border-right: 0px none;
                border-top: 1px solid rgb(68, 68, 68);
            }
        }
    `;

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    userData: UserData;

    private _renderLoggedIn() {
        return html`
            <mow-action preventdefault eventtrigger="openusermenu">
                <a href="${userPaths.account}" title="settings">Settings</a>
            </mow-action>
        `;
    }

    private _renderLoggedOut() {
        return html`
            <mow-action preventdefault eventtrigger="openlogin">
                <a href="${userPaths.login}">Identify</a>
            </mow-action>
        `;
    }

    protected render() {
        const { status } = this.userData || {};
        return status === 'logged-in' ? this._renderLoggedIn() : this._renderLoggedOut();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'user-menu': UserMenu;
    }
}
