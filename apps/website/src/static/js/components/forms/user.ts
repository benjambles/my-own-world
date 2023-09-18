import { consume } from '@lit-labs/context';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { paths as userPaths } from '../../../../routes/account/config.js';
import { paths as rosterPaths } from '../../../../routes/tools/roster/config.js';
import { UserData, userContext } from '../contexts/user.js';

@customElement('user-form')
export class UserForm extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            --highlight: var(--profile-highlight, rgba(255, 0, 0, 0.8));
            display: block;
        }

        .button {
            --_btnBgColor: var(--bgColor, #2b792b);
            --_btnBorderColor: var(--borderColor, var(--_btnBgColor));
            --_btnColor: var(--color, var(--shade-1));
            --_btnFontSize: var(--btnFontSize, 1.6rem);
            --_btnPadding: var(--btnPadding, 20px);

            display: block;
            border: 1px solid var(--_btnBorderColor);
            border-radius: 5px;
            padding: var(--_btnPadding);
            margin: 25px 0 0;
            transition:
                background-color 0.3s,
                color 0.3s,
                border-color 0.3s;
            background-color: var(--_btnBgColor);
            color: var(--_btnColor) !important;
            cursor: pointer;
            font-family: 'Oxanium', monospace;
            font-size: var(--_btnFontSize);
            font-weight: 500;
            letter-spacing: 0.3ch;
            line-height: 1;
            text-align: center;
            text-transform: uppercase;
        }

        .button:hover,
        .button:focus {
            --bgColor: #1b4b1b;
        }

        .user-label {
            display: block;
            padding: 0 15px;
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

        a:hover,
        a:active,
        a:focus,
        a.active {
            outline: none;
            color: var(--highlight);
        }

        .bar-link {
            display: block;
            padding: 5px 15px;
            transition:
                background-color 0.1s,
                color 0.1s;
            flex-grow: 1;
        }

        .bar-link:hover,
        .bar-link:active,
        .bar-link:focus,
        .bar-link.active {
            background-color: var(--highlight);
            color: var(--shade-0);
        }
    `;

    @consume({ context: userContext, subscribe: true })
    @property({ attribute: false })
    userData: UserData;

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
                <a class="button" href="${userPaths.logout}">Sign off</a>
            </mow-action>
        `;
    }
}
