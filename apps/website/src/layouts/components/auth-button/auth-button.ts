import { consume } from '@lit-labs/context';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { paths as userPaths } from '../../../routes/user/config.js';
import { UserData, userContext } from '../with-user/user.js';

@customElement('auth-button')
export class AuthButton extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;
            width: 61px;
            border-right: 1px solid rgb(68, 68, 68);
        }

        @container (min-width: 100px) {
            :host {
                height: 101px;
                width: 100px;
                border-right: 0px none;
                border-top: 1px solid rgb(68, 68, 68);
            }
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

        a:is(:hover, :focus-visible) {
            color: white;
            background-color: var(--special-4);
        }
    `;

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    userData: UserData;

    private renderLoggedIn() {
        return html`
            <mow-action preventdefault eventtrigger="openusermenu">
                <a href="${userPaths.account}" title="settings">Settings</a>
            </mow-action>
        `;
    }

    private renderLoggedOut() {
        return html`
            <mow-action preventdefault eventtrigger="openlogin">
                <a href="${userPaths.login}">Identify</a>
            </mow-action>
        `;
    }

    protected render() {
        const { status } = this.userData || {};
        return status === 'logged-in' ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auth-button': AuthButton;
    }
}
