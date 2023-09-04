import { consume } from '@lit-labs/context';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { UserData, userContext } from '../contexts/user.js';

@customElement('user-menu')
export class UserMenu extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host div {
            display: flex;
            align-items: center;
            flex-direction: row;
            gap: 10px;
            width: 100%;
            margin: 20px 0;
            color: white;
        }

        .hide {
            display: none;
        }

        a {
            text-decoration: none;
            color: #f15d5c;
            transition: color 0.1s;
        }

        a:hover,
        a:focus {
            color: #0fdee5;
        }
    `;

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    userData: UserData;

    private _getMenuState(status: UserData['status'] = 'logged-out') {
        if (status === 'pending') {
            return html`<span>Checking...</span> `;
        }

        if (status === 'logged-in') {
            return html`<a href="/my-account">${this.userData.user.screenName}</a>`;
        }

        return html`
            <a href="/join">Join Up</a> |
            <mow-action preventdefault eventtrigger="openlogin">
                <a href="/sign-in">Log In</a>
            </mow-action>
        `;
    }

    protected render() {
        return html`<div>${this._getMenuState(this.userData?.status)}</div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'user-menu': UserMenu;
    }
}
