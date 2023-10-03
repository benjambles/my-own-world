import '@benjambles/mow-ui/components/form-elements/glow-button/glow-link.js';
import { composedEvent } from '@benjambles/mow-ui/utils/events.js';
import { consume } from '@lit-labs/context';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { rosterPaths } from '../../routes/resources/roster/config.js';
import { paths as userPaths } from '../../routes/user/config.js';
import { UserData, userContext } from './with-user/user.js';

@customElement('user-menu')
export class UserMenu extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            --highlight: var(--profile-highlight, rgba(255, 0, 0, 0.8));
            display: block;
        }

        .user-label {
            display: block;
            padding: 0 15px 20px;
        }

        hr {
            height: 1px;
            margin: 5px 0;
            border: none;
            background-color: #ccc;
            color: #ccc;
        }

        a {
            color: var(--shade-4);
            text-decoration: none;
            transition: color 0.1s;
        }

        a:is(:hover, :active, :focus, .active) {
            outline: none;
            color: var(--highlight);
        }

        glow-link {
            margin: 30px 0 0;
        }

        .bar-link {
            display: block;
            padding: 5px 15px;
            transition:
                background-color 0.1s,
                color 0.1s;
            flex-grow: 1;
        }

        .bar-link:is(:hover, :active, :focus, .active) {
            background-color: var(--highlight);
            color: var(--shade-0);
        }
    `;

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    userData: UserData;

    protected updated(): void {
        if (this.userData?.status !== 'logged-in') {
            this.dispatchEvent(composedEvent('closeusermenu', true));
        }
    }

    protected render() {
        if (this.userData?.status !== 'logged-in') {
            return nothing;
        }

        return html`
            <span class="user-label">
                Identified as <br />
                <a href="${userPaths.account}">${this.userData.user.screenName}</a>
            </span>
            <hr />
            <a href="${rosterPaths.index}" class="bar-link"> Your squads </a>
            <hr />
            <a href="${userPaths.account}" class="bar-link"> Preferences </a>
            <a href="/help" class="bar-link"> Help </a>

            <mow-action preventdefault eventtrigger="userlogout">
                <glow-link href="${userPaths.logout}">Sign off</glow-link>
            </mow-action>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'user-menu': UserMenu;
    }
}
