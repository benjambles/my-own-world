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
            --_btnColor: var(--color, var(--shade-1));
            --_btnBgColor: var(--bgColor, #2b792b);
            --_btnBorderColor: var(--borderColor, var(--_btnBgColor));
            --_btnPadding: var(--btnPadding, 20px);
            --_btnFontSize: var(--btnFontSize, 1.6rem);

            padding: var(--_btnPadding);
            font-size: var(--_btnFontSize);
            color: var(--_btnColor) !important;
            border: 0;
            border-radius: 5px;
            cursor: pointer;
            transition:
                background-color 0.3s,
                color 0.3s,
                border-color 0.3s;
            border: 1px solid var(--_btnBorderColor);
            background-color: var(--_btnBgColor);
            text-transform: uppercase;
            display: block;
            text-align: center;
            margin: 25px 0 0;
            font-family: 'Oxanium', monospace;
            font-weight: 500;
            letter-spacing: 0.3ch;
            line-height: 1;
        }

        .button:hover,
        .button:focus {
            --bgColor: #1b4b1b;
        }

        .user-label {
            padding: 0 15px;
            display: block;
        }

        hr {
            margin: 5px 0;
            height: 1px;
            border: none;
            color: #ccc;
            background-color: #ccc;
        }

        a {
            text-decoration: none;
            color: var(--shade-4);
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
        return this.userData?.status === 'logged-in'
            ? html`
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
              `
            : nothing;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'user-form': UserForm;
    }
}